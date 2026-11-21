// Whole original arm pieces pivot at their shoulders; props share hand anchors.
const defs=[['aquamarine','아쿠아마린'],['cobalt','코발트'],['brown','브라운'],['brick','브릭']];
const rigs=[];let playing=true,time=0,last=null,accumulator=0,mode='hurt';window.previewErrors=[];
function imageLoad(url){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('이미지를 불러오지 못했습니다: '+url));im.src=url;});}
function paint(rig,t){
 const {ctx,image,parts,id,props}=rig;ctx.clearRect(0,0,500,330);
 const kbTime=((t%1.6)+1.6)%1.6,kbMode=mode==='hurt',hurting=kbMode&&kbTime<.8,recovering=kbMode&&!hurting,u=Math.min(1,kbTime/.8),recover=Math.max(0,(kbTime-.8)/.8),ease=v=>v*v*(3-2*v);
 const kbShift=kbMode?(hurting?32*(1-Math.pow(1-u,3)):32*(1-ease(recover))):0;
 const kbBounce=hurting?(kbTime<.48?18*Math.sin(Math.PI*kbTime/.48):7*Math.sin(Math.PI*(kbTime-.48)/.32)):0,kbLean=hurting?.13*Math.sin(Math.PI*u):0;
 let floorLift=0;if(hurting){for(const index of [6,7]){const crop=id==='aquamarine'?.36:id==='brown'?.35:.40,footW=id==='aquamarine'?30:34,x=index===6?(id==='aquamarine'?-16:-19):(id==='aquamarine'?16:19);for(const p of FOOT87_CONTACT[id][index]){const px=x+p[0]*footW,py=-48+(p[1]-crop)/(1-crop)*48;floorLift=Math.max(floorLift,-60+px*Math.sin(kbLean)+(py+60)*Math.cos(kbLean));}}}
 ctx.fillStyle='#252b3412';ctx.beginPath();ctx.ellipse(250+kbShift,305,83-kbBounce*.35,7,0,0,Math.PI*2);ctx.fill();
 const walking=mode==='walk'||recovering,attacking=mode==='attack',period=.8,phase=(recovering?kbTime-.8:t)/period*Math.PI*2,step=walking?Math.sin(phase):0,bob=walking?-1.2+1.2*Math.cos(phase*2):attacking||hurting?0:-Math.sin(t*Math.PI)*.7;
 const duration={aquamarine:2.08,cobalt:3.03,brown:1,brick:2.17}[id],hit={aquamarine:.4,cobalt:.35,brown:.2,brick:.35}[id],at=((t%duration)+duration)%duration;
 const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
 const attackActive=attacking&&at<hit+.42;
 const sample=(values)=>{const times=[0,hit*.50,hit,hit+.14,hit+.42,duration];for(let i=1;i<times.length;i++)if(at<=times[i]){const q=smooth((at-times[i-1])/(times[i]-times[i-1]));return values[i-1]+(values[i]-values[i-1])*q;}return values.at(-1);};
 const contact=attacking?Math.max(0,1-Math.abs(at-hit)/.14):0;
 ctx.save();ctx.translate(250+kbShift,300+bob-kbBounce-floorLift);ctx.translate(0,-60);ctx.rotate(kbLean);ctx.translate(0,60);
 const draw=(im,s,x,y,w,h,angle=0,ax=.5,ay=.5)=>{ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.drawImage(im,...s,-w*ax,-h*ay,w,h);ctx.restore();};
 const part=(index,x,y,w,h,angle=0,ax=.5,ay=.5)=>draw(image,parts[index],x,y,w,h,angle,ax,ay);
 const prop=(index,x,y,w,h,angle=0,ax=.5,ay=.5)=>draw(props,PROPS87_BOUNDS[index],x,y,w,h,angle,ax,ay);
 const links=[],feet=[];
 const shoulderL=id==='aquamarine'?[-26,-108]:[-31,-119],shoulderR=id==='aquamarine'?[26,-108]:[31,-119],handR=id==='aquamarine'?[43,-63]:[49,-65];
 const baseHandL=id==='aquamarine'?[-52,-67]:id==='cobalt'?[-59,-71]:id==='brick'?[-60,-71]:[-53,-69];
 const attackAngles={aquamarine:[0,.3,-1.4,-1.65,0,0],cobalt:[0,.3,-1.3,-1,0,0],brown:[0,.08,-.2,-.15,0,0],brick:[0,.4,-1.55,-1.2,0,0]};
 const angleL=walking?step*(id==='brown'?.045:.105):attacking?sample(attackAngles[id]):hurting?.25*Math.sin(Math.PI*u):0,angleR=walking?-step*.16:attacking?sample([0,-.06,.14,.10,0,0]):hurting?-.28*Math.sin(Math.PI*u):0;
 const rotate=(p,a)=>[p[0]*Math.cos(a)-p[1]*Math.sin(a),p[0]*Math.sin(a)+p[1]*Math.cos(a)];
 const swung=(shoulder,hand,angle)=>{const d=rotate([hand[0]-shoulder[0],hand[1]-shoulder[1]],angle);return[shoulder[0]+d[0],shoulder[1]+d[1]];};
 const poses={aquamarine:[[-42,-104],[-76,-91],[-69,-70]],cobalt:[[-46,-110],[-80,-103],[-72,-82]],brown:[[-46,-75],[-75,-87],[-68,-77]],brick:[[-42,-120],[-76,-77],[-69,-67]]},p=poses[id];
 const requestedHandL=attacking?[sample([baseHandL[0],p[0][0],p[1][0],p[2][0],baseHandL[0],baseHandL[0]]),sample([baseHandL[1],p[0][1],p[1][1],p[2][1],baseHandL[1],baseHandL[1]])]:swung(shoulderL,baseHandL,angleL),movedHandR=swung(shoulderR,handR,angleR);
 const handL=[...requestedHandL];
 if(attacking){const dx=handL[0]-shoulderL[0],dy=handL[1]-shoulderL[1],len=Math.hypot(dx,dy),baseLen=Math.hypot(baseHandL[0]-shoulderL[0],baseHandL[1]-shoulderL[1]),fixed=Math.max(baseLen*.9,Math.min(baseLen*1.08,len));if(len>0){handL[0]=shoulderL[0]+dx/len*fixed;handL[1]=shoulderL[1]+dy/len*fixed;}}
 const shieldOffset=rotate([7,-4],angleL);
 const arm=(side,handOnly=false)=>{
  const index=side==='L'?4:5,s=parts[index],a=side==='L'?shoulderL:shoulderR,b=side==='L'?handL:movedHandR;
  const p0=side==='L'?[.77,.1]:[.23,.1],p1=side==='L'?[.25,.82]:[.75,.82];
  const ax=p0[0]*s[2],ay=p0[1]*s[3],bx=p1[0]*s[2],by=p1[1]*s[3],k=Math.hypot(b[0]-a[0],b[1]-a[1])/Math.hypot(bx-ax,by-ay),angle=Math.atan2(b[1]-a[1],b[0]-a[0])-Math.atan2(by-ay,bx-ax);
  ctx.save();ctx.translate(...a);ctx.rotate(angle);ctx.scale(k,k);
  if(handOnly){ctx.beginPath();ctx.rect(-ax,s[3]*.69-ay,s[2],s[3]*.31);ctx.clip();}
  ctx.drawImage(image,...s,-ax,-ay,s[2],s[3]);ctx.restore();links.push({side,a,b,completePart:true});
 };
 if(id==='brown')prop(1,28,-88,68,78,-.12);
 // Legs overlap the shorts rather than stacking another visible shorts cuff.
 function leg(index,x,offset){
  const cycle=phase+offset,swing=walking?Math.sin(cycle):0,angle=walking?swing*.24:0,lift=walking?Math.max(0,swing)*7:0;
  const aq=id==='aquamarine',footW=aq?30:34,hipHeight=48,crop=aq?.36:id==='brown'?.35:.40,contour=FOOT87_CONTACT[id][index].map(p=>[p[0],(p[1]-crop)/(1-crop)]),sn=Math.sin(angle),cs=Math.cos(angle),target=hipHeight-lift-bob;
  let h=hipHeight;const bottom=()=>Math.max(...contour.map(p=>p[0]*footW*sn+p[1]*h*cs));
  if(walking)for(let i=0;i<4;i++)h+=(target-bottom())/cs;
  {const q=parts[index],cut=Math.round(q[3]*crop);draw(image,[q[0],q[1]+cut,q[2],q[3]-cut],x,-hipHeight,footW,h,angle,.5,0);}feet.push({side:index===6?'L':'R',x:x-h*sn,groundY:bob-hipHeight+bottom(),lift,stance:!walking||swing<=0});
 }
 leg(7,id==='aquamarine'?16:19,Math.PI);leg(6,id==='aquamarine'?-16:-19,0);
 arm('R');arm('L');
 if(id==='aquamarine'){
  const q=parts[3],cut=Math.round(q[3]*.70);
  draw(image,[q[0],q[1],q[2],cut],0,-123,74,57.4,0,.5,0);
  draw(image,[q[0],q[1]+cut,q[2],q[3]-cut],0,-65.6,74,18.6,0,.5,0);
  }else{
  const q=parts[3],cut=Math.round(q[3]*.70);
  draw(image,[q[0],q[1],q[2],cut],0,-137.5,88,69.3,0,.5,0);
  draw(image,[q[0],q[1]+cut,q[2],q[3]-cut],0,-68.2,88,21.7,0,.5,0);
 }
 if(id==='aquamarine')part(8,...handL,43,162,angleL,.5,.59);
 if(id==='cobalt')part(8,...handL,24,81,-.35+angleL,.5,.88);
 if(id==='brown')prop(0,handL[0]+shieldOffset[0],handL[1]+shieldOffset[1],74,116,-.04+angleL);
 if(id==='brick'){if(!walking&&!kbMode)prop(2,-82,2,99,76,0,.5,1);prop(3,...handL,29,66,-.35+angleL,.5,.88);}
 // Only the gripping hand is in front of the prop; the arm stays behind torso.
 if(id!=='brown')arm('L',true);
 if(contact>0){
  ctx.save();ctx.globalAlpha=contact;ctx.lineCap='round';ctx.lineJoin='round';
  if(id==='aquamarine'){ctx.strokeStyle='#67dfe8';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(-117,-87,43,28,-.4,.55,4.7);ctx.stroke();ctx.strokeStyle='#e1ffff';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(-117,-87,36,22,-.4,.6,4.5);ctx.stroke();for(let n=0;n<3;n++){ctx.fillStyle='#7ce6ee';ctx.beginPath();ctx.ellipse(-139-n*10,-62-n*16,4,7,-.6,0,Math.PI*2);ctx.fill();}}
  else if(id==='brick'){for(let n=0;n<5;n++){ctx.fillStyle=n%2?'#bd8764':'#e2b88e';ctx.fillRect(-110+n*12,-83-Math.sin(n*1.4)*9,5,4);}}
  else{ctx.strokeStyle=id==='cobalt'?'#ffb45d':'#c9b494';ctx.lineWidth=4;const x=id==='cobalt'?-153:-109,y=id==='cobalt'?-99:-83;for(let n=0;n<5;n++){const a=(n/4-.5)*2;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*8,y+Math.sin(a)*8);ctx.lineTo(x+Math.cos(a)*20,y+Math.sin(a)*20);ctx.stroke();}}
  ctx.restore();
 }
 const headIndex=hurting?2:attackActive?1:0,head=parts[headIndex],headW=id==='aquamarine'?142:id==='cobalt'?134:132,headH=headW*head[3]/head[2];
 // Actual eye/mouth centres measured in the source, excluding hat/hair width.
 const faceX={aquamarine:.316,cobalt:.329,brown:.279,brick:.359}[id],headX=-7+(.5-faceX)*headW;
 part(headIndex,headX,(id==='aquamarine'?-116:-127)-headH/2,headW,headH);
 ctx.restore();rig.lastBounds={parts:parts.length,head:[headW,headH],faceCenterX:-7,bodySize:id==='aquamarine'?[74,76]:[88,91],mode,face:headIndex,hitTime:hit,attackTime:at,contact,knockback:kbMode?{active:hurting,recovering,seconds:.8,bounces:2,shift:kbShift,bounce:kbBounce,lean:kbLean,floorLift,lowestFootY:-kbBounce}:null,cycleSeconds:kbMode?1.6:attacking?duration:period,feet,joints:{shoulderL,shoulderR,handL,handR:movedHandR},grip:id==='brown'?null:{hand:handL,propAnchor:handL},links};
}
async function boot(){
 let props;try{props=await imageLoad('props-separated-v2.png?v=2');}catch(e){window.previewErrors.push(e.message);}
 for(const [id,name]of defs){const card=document.createElement('article'),canvas=document.createElement('canvas');canvas.width=500;canvas.height=330;card.append(canvas);const title=document.createElement('h2');title.textContent=name;const small=document.createElement('small');small.textContent='3진';title.append(small);card.append(title);document.querySelector('#cards').append(card);
  try{if(!props)throw Error('소품을 불러오지 못했습니다.');const image=await imageLoad(id+'-parts.png?v=2'),rig={id,image,props,parts:PARTS87_BOUNDS[id],ctx:canvas.getContext('2d')};paint(rig,0);rigs.push(rig);}catch(e){window.previewErrors.push(e.message);const p=document.createElement('p');p.className='error';p.textContent=e.message;card.append(p);}
 }
 window.previewReady=true;requestAnimationFrame(tick);
}
function tick(now){if(last===null)last=now;accumulator+=Math.min((now-last)/1000,.2);last=now;const steps=Math.floor((accumulator+1e-6)*30);if(steps>0){accumulator-=steps/30;if(playing){time+=steps/30;for(const rig of rigs)paint(rig,time);}}requestAnimationFrame(tick);}
for(const b of document.querySelectorAll('[data-mode]'))b.onclick=()=>{mode=b.dataset.mode;time=0;for(const el of document.querySelectorAll('[data-mode]'))el.setAttribute('aria-pressed',String(el===b));for(const rig of rigs)paint(rig,time);};
 window.renderWalkFrame=window.renderMotionFrame=(seconds,choice='hurt')=>{mode=choice;time=seconds;for(const rig of rigs)paint(rig,seconds);return window.getPreviewState();};
 document.querySelector('#play').onclick=()=>{playing=!playing;document.querySelector('#play').textContent=playing?'일시정지':'재생';};
window.getPreviewState=()=>({revision:9,mode,time,fps:30,ready:!!window.previewReady,count:rigs.length,errors:window.previewErrors,rigs:rigs.map(r=>({id:r.id,...r.lastBounds}))});boot();
