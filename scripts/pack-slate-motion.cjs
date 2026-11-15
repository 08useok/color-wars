// Assemble generated drawings into game atlases; never redraw the character.
const fs=require('node:fs'),path=require('node:path');
const canvasPath=process.env.SLATE_CANVAS_MODULE||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const {createCanvas,loadImage}=require(canvasPath);
const root=path.resolve(__dirname,'..'),out=path.join(root,'assets/slate-motion');
function trim(source,x,y,w,h){
 const c=createCanvas(w,h),ctx=c.getContext('2d');ctx.drawImage(source,x,y,w,h,0,0,w,h);
 const data=ctx.getImageData(0,0,w,h).data;let l=w,t=h,r=-1,b=-1;
 for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++)if(data[(yy*w+xx)*4+3]>32){l=Math.min(l,xx);t=Math.min(t,yy);r=Math.max(r,xx);b=Math.max(b,yy);}
 if(r<l)throw Error('Empty source cell');
 const crop=createCanvas(r-l+1,b-t+1);crop.getContext('2d').drawImage(c,l,t,crop.width,crop.height,0,0,crop.width,crop.height);crop.sourceBox=[l,t,r+1,b+1];return crop;
}
function normalized(c,height,attack=false){
 const frame=createCanvas(480,320),ctx=frame.getContext('2d'),k=height/c.height,w=c.width*k;
 // Anchor the head/body rather than the broom's forward reach.
 const pivot=attack?.72:.64;ctx.drawImage(c,240-w*pivot,305-height,w,height);return frame;
}
(async()=>{
 const poses=await loadImage(path.join(out,'source-poses-tiles.png')),walk=await loadImage(path.join(out,'source-walk-tiles.png')),atlases={};
 for(const f of [1,2]){
  const height=f===1?190:250;
  const keys=Array.from({length:4},(_,i)=>normalized(trim(poses,Math.round(i*poses.width/4),Math.round((f-1)*poses.height/2),Math.floor(poses.width/4),Math.floor(poses.height/2)),height,i===2));
  const walks=Array.from({length:6},(_,i)=>normalized(trim(walk,Math.round(i*walk.width/6),Math.round((f-1)*walk.height/2),Math.floor(walk.width/6),Math.floor(walk.height/2)),height));
  const frames={idle:Array.from({length:60},(_,i)=>{const c=createCanvas(480,320);c.getContext('2d').drawImage(keys[0],0,-Math.sin(i/60*Math.PI*2)*1.4);return c;}),
   walk:Array.from({length:18},(_,i)=>walks[Math.floor(i/3)]),
   attack:Array.from({length:24},(_,i)=>keys[i<6?0:i<9?1:i<18?2:i<21?1:0]),hurt:[keys[3]]};
  const count=Object.values(frames).reduce((n,a)=>n+a.length,0),sheet=createCanvas(4800,Math.ceil(count/10)*320),ctx=sheet.getContext('2d');
  const a={sheet:'assets/slate-motion/slate_'+f+'.png?v=2',scale:.38,left:21,groundAnchor:true,bodyWidth:54,walkStep:1/30,idleStep:1/30,continuousAttack:true,strike:9};let n=0;
  for(const [mode,list]of Object.entries(frames)){a[mode]=list.map(c=>{const x=n%10*480,y=Math.floor(n++/10)*320,crop=trim(c,0,0,480,320),[l,t,r,b]=crop.sourceBox;ctx.drawImage(crop,x,y);return [x,y,crop.width,crop.height,240-l,305-b];});}
  fs.writeFileSync(path.join(out,'slate_'+f+'.png'),sheet.toBuffer('image/png'));
  fs.writeFileSync(path.join(out,'slate_'+f+'-profile.png'),trim(keys[0],0,0,480,320).toBuffer('image/png'));
  atlases[f]=a;
 }
 fs.writeFileSync(path.join(out,'motion-atlases.js'),'const SLATE_MOTION_ATLASES='+JSON.stringify(atlases)+';\n');
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({fps:30,forms:[1,2],frames:{idle:60,walk:18,attack:24,hurt:1},walkDrawings:6,attackStrike:9,hurt:'Single drawing; both hitback bounces supplied by combat engine',source:['source-poses-tiles.png','source-walk-tiles.png']},null,2)+'\n');
 const preview=path.join(root,'work/slate-motion');fs.mkdirSync(preview,{recursive:true});
 fs.writeFileSync(path.join(preview,'preview.html'),`<!doctype html><html lang="ko"><meta charset="utf-8"><title>슬레이트 1·2진 모션</title><style>body{font:16px system-ui;background:#ece8dc;color:#252a30;margin:32px}main{display:flex;gap:24px;flex-wrap:wrap}section{background:#fff;border-radius:16px;padding:20px}canvas{background:linear-gradient(#e9f0f6 85%,#d5dbca 85%)}button,select{font:inherit;padding:8px}p{max-width:720px;line-height:1.7}</style><h1>슬레이트 · 타일 장인 슬레이트</h1><p>남성 타일 시공 기사 / 레어 / 좀비 100% 밀치기<br>Lv.30·2진·보물 완성: 체력 40,000 · 공격력 100 · 사거리 400 · 공격 간격 2초<br>1·2진 450원 · 생산 8초(연구력 보물 완성) · 좀비 킬러 없음</p><label>모션 <select id="mode"><option value="idle">대기</option><option value="walk">걷기</option><option value="attack">공격</option><option value="hurt">넉백</option></select></label> <button id="pause">일시정지</button><p>30 FPS 타임라인 · 걷기 6개 그림 · 공격 9프레임(0.3초)에 밀기 · 넉백은 엔진처럼 2회 바운스</p><main><section><h2>1진 슬레이트</h2><canvas width="420" height="360" data-form="1"></canvas></section><section><h2>2진 타일 장인 슬레이트</h2><canvas width="420" height="360" data-form="2"></canvas></section></main><script src="../../assets/slate-motion/motion-atlases.js?v=2"></script><script>
const images={},surfaces=[...document.querySelectorAll('canvas')];let paused=false,start=performance.now(),last=0;
for(const f of [1,2]){images[f]=new Image();images[f].src='../../'+SLATE_MOTION_ATLASES[f].sheet;}
document.querySelector('#pause').onclick=()=>{paused=!paused;document.querySelector('#pause').textContent=paused?'재생':'일시정지';};
document.querySelector('#mode').onchange=()=>{start=performance.now();};
function loop(now){if(!paused)last=(now-start)/1000;const mode=document.querySelector('#mode').value;
for(const c of surfaces){const f=c.dataset.form,a=SLATE_MOTION_ATLASES[f],ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);if(!images[f].complete||!images[f].naturalWidth)continue;let t=last,hop=0,dx=0,n;if(mode==='hurt'){t%=1.6;hop=t<.48?25*Math.sin(t/.48*Math.PI):t<.8?9*Math.sin((t-.48)/.32*Math.PI):0;dx=t<.8?t/.8*30:30*(1-(t-.8)/.8);n=0;}else if(mode==='attack'){n=Math.min(23,Math.floor((t%2)*30));}else n=Math.floor(t*30)%a[mode].length;const [x,y,w,h,ox,oy]=a[mode][n];ctx.drawImage(images[f],x,y,w,h,210-ox+dx,325-oy-h-hop,w,h);}
requestAnimationFrame(loop);}requestAnimationFrame(loop);
</script></html>`);
 console.log('Packed Slate forms 1/2: idle 60 / walk 18 (6 drawings) / attack 24 / hurt 1; preview work/slate-motion/preview.html');
})().catch(e=>{console.error(e);process.exit(1);});
