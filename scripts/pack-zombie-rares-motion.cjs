// Pack generated drawings without redrawing their artwork. The engine owns KB.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {createCanvas,loadImage}=require(process.env.ZOMBIE_RARE_CANVAS_MODULE||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas'));
const root=path.resolve(__dirname,'..'),out=path.join(root,'assets/zombie-rares-motion'),preview=path.join(root,'work/zombie-rares-motion');
const specs={smoke:{name:'스모크',evolved:'현장 조사관 스모크',job:'남성 · 화재 조사관',range:320,cost:600,hp:25000,atk:150,interval:4,duration:1,strike:15,ability:'좀비 범위 50% 정지 · 기본 2초 / 우주편 보물 완성 2.4초'},ash:{name:'애쉬',evolved:'내열 작업반장 애쉬',job:'여성 · 소각시설 운영 기사',range:150,cost:350,hp:60000,atk:50,interval:3,duration:.9,strike:12,ability:'좀비 맷집 · 기본 받는 피해 ¼ / 우주편 보물 완성 ⅕'}};
function crop(source,x,y,w,h){
 const c=createCanvas(w,h),ctx=c.getContext('2d');ctx.drawImage(source,x,y,w,h,0,0,w,h);
 const d=ctx.getImageData(0,0,w,h).data;let l=w,t=h,r=-1,b=-1;
 for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++)if(d[(yy*w+xx)*4+3]>32){l=Math.min(l,xx);t=Math.min(t,yy);r=Math.max(r,xx);b=Math.max(b,yy);}
 if(r<l)throw Error('Empty drawing');
 const result=createCanvas(r-l+1,b-t+1);result.getContext('2d').drawImage(c,l,t,result.width,result.height,0,0,result.width,result.height);result.box=[l,t,r+1,b+1];return result;
}
function normalize(c,height,attack){
 const frame=createCanvas(640,320),ctx=frame.getContext('2d'),w=c.width*height/c.height,x=400-w*(attack?.72:.64);
 if(x<2||x+w>638)throw Error('Drawing does not fit: '+[w,x]);
 ctx.drawImage(c,x,305-height,w,height);return frame;
}
// Generated cells can drift across the nominal grid. Split on transparent
// gutters so a neighbouring helmet/tool never leaks into a cropped frame.
function grid(source,columns){
 const c=createCanvas(source.width,source.height),ctx=c.getContext('2d');ctx.drawImage(source,0,0);
 const data=ctx.getImageData(0,0,c.width,c.height).data;
 function cuts(count,size,occupied){
  const gaps=[];for(let i=0;i<size;){if(occupied(i)){i++;continue;}const from=i;while(i<size&&!occupied(i))i++;if(i-from>=4)gaps.push([from,i]);}
  const result=[0];for(let k=1;k<count;k++){const ideal=size*k/count,near=gaps.filter(([a,b])=>a>result.at(-1)&&b<size&&Math.abs((a+b)/2-ideal)<size/count*.45).sort((a,b)=>Math.abs((a[0]+a[1])/2-ideal)-Math.abs((b[0]+b[1])/2-ideal));if(!near.length)throw Error('No transparent grid gutter at '+ideal);result.push(Math.floor((near[0][0]+near[0][1])/2));}result.push(size);return result;
 }
 const rows=cuts(2,c.height,y=>{for(let x=0;x<c.width;x++)if(data[(y*c.width+x)*4+3]>32)return true;return false;});
 return [0,1].map(row=>{
  const top=rows[row],bottom=rows[row+1],cols=cuts(columns,c.width,x=>{for(let y=top;y<bottom;y++)if(data[(y*c.width+x)*4+3]>32)return true;return false;});
  return Array.from({length:columns},(_,i)=>crop(source,cols[i],top,cols[i+1]-cols[i],bottom-top));
 });
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});fs.mkdirSync(preview,{recursive:true});const atlases={},manifest={fps:30,characters:{}};
 const contact=createCanvas(1120,1000),cc=contact.getContext('2d');cc.fillStyle='#e9edf0';cc.fillRect(0,0,1120,1000);cc.font='17px sans-serif';let row=0;
 for(const [id,s]of Object.entries(specs)){
  const poses=await loadImage(path.join(out,id+'-poses.png')),walk=await loadImage(path.join(out,id+'-walk.png')),poseCells=grid(poses,4),walkCells=grid(walk,6);
  manifest.characters[id]={job:s.job,forms:[1,2],frames:{idle:60,walk:18,attack:Math.round(s.duration*30),hurt:1},walkDrawings:6,strike:s.strike,source:[id+'-poses.png',id+'-walk.png'],hurt:'Single pose, both bounces supplied by combat engine'};
  for(const f of [1,2]){
   const height=f===1?190:250;
   const keys=poseCells[f-1].map((c,i)=>normalize(c,height,i===2));
   const walks=walkCells[f-1].map(c=>normalize(c,height,false));
   const frames={idle:Array.from({length:60},(_,i)=>{const c=createCanvas(640,320);c.getContext('2d').drawImage(keys[0],0,-Math.sin(i/60*Math.PI*2)*1.4);return c;}),walk:Array.from({length:18},(_,i)=>walks[Math.floor(i/3)]),attack:Array.from({length:Math.round(s.duration*30)},(_,i)=>keys[i<s.strike-4?0:i<s.strike?1:i<s.strike+8?2:i<s.strike+11?1:0]),hurt:[keys[3]]};
   const total=Object.values(frames).reduce((n,a)=>n+a.length,0),sheet=createCanvas(5120,Math.ceil(total/8)*320),ctx=sheet.getContext('2d');let n=0;
   const a={sheet:'assets/zombie-rares-motion/'+id+'_'+f+'.png?v=1',scale:.38,left:21,groundAnchor:true,bodyWidth:54,walkStep:1/30,idleStep:1/30,continuousAttack:true,strike:s.strike};
   for(const [mode,list]of Object.entries(frames))a[mode]=list.map(c=>{const cut=crop(c,0,0,640,320),[l,t,r,b]=cut.box,x=n%8*640,y=Math.floor(n++/8)*320;ctx.drawImage(cut,x,y);return [x,y,cut.width,cut.height,400-l,305-b];});
   fs.writeFileSync(path.join(out,id+'_'+f+'.png'),sheet.toBuffer('image/png'));
   fs.writeFileSync(path.join(out,id+'_'+f+'-profile.png'),crop(keys[0],0,0,640,320).toBuffer('image/png'));
   atlases[id+'_'+f]=a;
   for(const [i,mode]of ['idle','walk','attack','hurt'].entries()){
    cc.fillStyle='#202b38';cc.fillText(id+' '+f+' / '+mode,i*280+12,row*250+24);
    const key=mode==='walk'?walks[3]:keys[mode==='attack'?2:mode==='hurt'?3:0],cut=crop(key,0,0,640,320),[l,t,r,b]=cut.box,k=.65,baseline=(row+1)*250-8;
    cc.strokeStyle='#a0aab0';cc.beginPath();cc.moveTo(i*280+4,baseline);cc.lineTo((i+1)*280-4,baseline);cc.stroke();
    cc.drawImage(cut,i*280+175-(400-l)*k,baseline-(305-t)*k,cut.width*k,cut.height*k);
   }
   row++;
  }
 }
 fs.writeFileSync(path.join(out,'motion-atlases.js'),'const ZOMBIE_RARE_MOTION_ATLASES='+JSON.stringify(atlases)+';\n');
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 fs.writeFileSync(path.join(preview,'contact.png'),contact.toBuffer('image/png'));
 const cards=Object.entries(specs).flatMap(([id,s])=>[1,2].map(f=>`<section><h2>${f===1?s.name:s.evolved} · ${f}진</h2><p>${s.job}<br>${s.ability}<br>2진 Lv.30·보물 완성: 체력 ${s.hp.toLocaleString()} / 공격력 ${s.atk}<br>사거리 ${s.range} / ${s.interval}초 / ${s.cost}원</p><canvas width="520" height="350" data-id="${id}" data-form="${f}"></canvas></section>`)).join('');
 const html=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>스모크·애쉬 1·2진 모션</title><style>body{font:16px system-ui;background:#eae8df;color:#202b38;margin:28px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(530px,1fr));gap:20px}section{background:white;padding:20px;border-radius:16px}canvas{background:linear-gradient(#eaf0f4 90%,#d5dbce 90%)}select,button{font:inherit;padding:8px}p{line-height:1.65}</style><h1>스모크 · 애쉬</h1><p>좀비 지원 레어 / 30 FPS / 걷기 6개 그림 / 좀비 킬러·영혼 공격 없음</p><select id="mode"><option value="idle">대기</option><option value="walk">걷기</option><option value="attack">공격</option><option value="hurt">넉백</option></select> <button id="pause">일시정지</button><main>${cards}</main><script src="../../assets/zombie-rares-motion/motion-atlases.js?v=1"></script><script>
const specs=${JSON.stringify(specs)},surfaces=[...document.querySelectorAll('canvas')],images={};let paused=false,start=performance.now(),last=0;
for(const id of Object.keys(specs))for(const f of [1,2]){const key=id+'_'+f;images[key]=new Image();images[key].src='../../'+ZOMBIE_RARE_MOTION_ATLASES[key].sheet;}
document.querySelector('#pause').onclick=()=>{paused=!paused;document.querySelector('#pause').textContent=paused?'재생':'일시정지';};document.querySelector('#mode').onchange=()=>{start=performance.now();};
function loop(now){if(!paused)last=(now-start)/1000;const mode=document.querySelector('#mode').value;
for(const c of surfaces){const key=c.dataset.id+'_'+c.dataset.form,a=ZOMBIE_RARE_MOTION_ATLASES[key],s=specs[c.dataset.id],ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);if(!images[key].complete||!images[key].naturalWidth)continue;let n=0,dx=0,hop=0,t=last;
if(mode==='hurt'){t%=1.6;hop=t<.48?25*Math.sin(t/.48*Math.PI):t<.8?9*Math.sin((t-.48)/.32*Math.PI):0;dx=t<.8?t/.8*30:30*(1-(t-.8)/.8);}
else if(mode==='attack')n=Math.min(a.attack.length-1,Math.floor((t%s.interval)*30));else n=Math.floor(t*30)%a[mode].length;
const [x,y,w,h,ox,oy]=a[mode][n];ctx.drawImage(images[key],x,y,w,h,320-ox+dx,315-oy-h-hop,w,h);}requestAnimationFrame(loop);}requestAnimationFrame(loop);
</script></html>`;
 for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
 fs.writeFileSync(path.join(preview,'preview.html'),html);
 console.log('Packed Smoke + Ash, both forms: idle 60 / walk 18 / attack 30 or 27 / hurt 1; work/zombie-rares-motion/preview.html');
})().catch(e=>{console.error(e);process.exit(1);});
