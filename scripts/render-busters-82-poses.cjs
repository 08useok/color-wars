const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

// Record the approved preview's Canvas draws at exact 30 FPS ticks.
function record(id, mode, frame) {
 let source = fs.readFileSync(path.join('work', id+'-concepts', 'parts-preview.html'), 'utf8').split('<script>')[1].split('</script>')[0];
 if(id==='marigold')source=source.replace('attack:30','attack:36').replace('f<24','f<36').replace('f>=9','f>=15').replace('(f-9)/15','(f-15)/21');
 const calls = [], stack = [];
 const ctx = {
  matrix:[1,0,0,1,0,0], globalAlpha:1,
  save(){stack.push([this.matrix,this.globalAlpha]);},
  restore(){[this.matrix,this.globalAlpha]=stack.pop();},
  transform(a,b,c,d,x,y){
   const [A,B,C,D,X,Y]=this.matrix;
   this.matrix=[A*a+C*b,B*a+D*b,A*c+C*d,B*c+D*d,A*x+C*y+X,B*x+D*y+Y];
  },
  translate(x,y){this.transform(1,0,0,1,x,y);},
  scale(x,y){this.transform(x,0,0,y,0,0);},
  rotate(t){const c=Math.cos(t),s=Math.sin(t);this.transform(c,s,-s,c,0,0);},
  drawImage(img,...rect){calls.push([img.index,this.matrix,this.globalAlpha,rect]);},
  clearRect(){},fillRect(){}
 };
 let index=0;
 class Image {
  constructor(){this.index=index++;}
  set src(value){
   const png=Buffer.from(value.split(',')[1],'base64');
   this.naturalWidth=png.readUInt32BE(16);
   this.naturalHeight=png.readUInt32BE(20);
  }
 }
 const control={value:mode};
 vm.runInNewContext(source+'\nrender('+((frame+.01)*1000/30)+');',{
  Image,performance:{now:()=>0},requestAnimationFrame(){},
  document:{querySelector:s=>s==='#mode'?control:s==='#stage'?{getContext:()=>ctx}:{}}
 });
 return calls;
}
const poses={};
for(const [id,attack] of [['apricot',24],['marigold',36]]){
 poses[id]={};
 for(const [mode,count] of [['idle',60],['walk',18],['attack',attack],['hurt',1]]){
  poses[id][mode]=Array.from({length:count},(_,i)=>record(id,mode,mode==='hurt'?4:i));
 }
}
process.stdout.write(JSON.stringify(poses));

