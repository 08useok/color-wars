const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const base=fs.readFileSync(path.join(__dirname,'bake-puffington.cjs'),'utf8');
const prefix=base.slice(0,base.indexOf('const specs=')).replaceAll('reference-sheets/puffington','reference-sheets/cannon-effects');
const glow=base.slice(base.indexOf('function glowAware('),base.indexOf('(async()=>'));
const runner=`
const specs={basic:[0,0],slow:[1,1],thunder:[3,0],holy:[5,0],breaker:[6,0],breakerExtra:[6,2]};
(async()=>{for(const [name,[type,mode]]of Object.entries(specs)){
 const stem='nyankoCastle_001_'+String(type).padStart(2,'0'),m=String(mode).padStart(2,'0'),read=s=>fs.readFileSync(path.join(ref,'raw',stem+'_'+s),'utf8');
 const data=[read('00.imgcut'),read(m+'.mamodel'),read(m+'.maanim')],G=name===\'slow\'?{w:4200,h:1400,ox:3300,oy:1000}:{w:1800,h:1400,ox:900,oy:1000},c=canvas.createCanvas(G.w,G.h),g=new Canvas2DGraphics(c),img=await g.buildImg(new Blob([fs.readFileSync(path.join(ref,'raw',stem+'_00.png'))]));
 const drawImage=g.drawImage.bind(g);g.drawImage=(im,x,y,w,h)=>{if(w>=0&&h>=0)return drawImage(im,x,y,w,h);g.ctx.save();g.ctx.translate(x,y);g.ctx.scale(w<0?-1:1,h<0?-1:1);drawImage(im,0,0,Math.abs(w),Math.abs(h));g.ctx.restore();};
 g.translate(G.ox,G.oy);g.scale(.5,.5);const unit=new AnimUnit(g,ImgCut.load(new StrLineStream(data[0])),img,MaModel.load(new StrLineStream(data[1])),[MaAnim.load(new StrLineStream(data[2]))]),draw=glowAware(g,c,G,unit);
 unit.switchMode(0);const dir=path.join(ref,'frames',name);fs.mkdirSync(dir,{recursive:true});const frames=[];for(let i=0;i<Math.min(unit.length(),240);i++){draw(i);const file=String(i).padStart(3,'0')+'.png';fs.writeFileSync(path.join(dir,file),c.toBuffer('image/png'));frames.push(file);}fs.writeFileSync(path.join(dir,'modes.json'),JSON.stringify({frames,origin:[G.ox,G.oy]}));console.log(name,frames.length);
}})().catch(e=>{console.error(e);process.exitCode=1;});
`;
fs.writeFileSync(path.join(__dirname,'bake-cannon-effects.cjs'),(prefix+glow+runner).replace(/\r\n/g,'\n').replace(/[ \t]+$/gm,''));
