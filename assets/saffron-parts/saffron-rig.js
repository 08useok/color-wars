// Hierarchical cutout renderer. Arms use two-bone IK, props share hand joints.
(function(){
 const TAU=Math.PI*2,lerp=(a,b,t)=>a+(b-a)*t,clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),ease=t=>t*t*(3-2*t);
 function ik(s,h,l1,l2){const dx=h[0]-s[0],dy=h[1]-s[1],d=clamp(Math.hypot(dx,dy),Math.abs(l1-l2)+.01,l1+l2-.01),angle=Math.atan2(dy,dx)-Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));return[s[0]+Math.cos(angle)*l1,s[1]+Math.sin(angle)*l1];}
 class SaffronRig{
  constructor(images,meta){this.images=images;this.meta=meta;}
  static async load(base){const images={},meta=globalThis.SAFFRON_PARTS_META;if(!meta)throw Error('Missing Saffron parts metadata');await Promise.all(Object.entries(meta.forms).flatMap(([form,parts])=>Object.entries(parts).map(async([name,p])=>{const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=()=>reject(Error('Missing '+p.file));im.src=base+p.file;});images[form+':'+name]=im;})));return new SaffronRig(images,meta);}
  draw(ctx,{form=2,mode='idle',time=0,x=300,y=365,scale=1,debug=false}={}){
   const im=name=>this.images[form+':'+name],report={form,mode,joints:{},links:[],grips:[]};
   const sprite=(name,cx,cy,w,h,angle=0,px=.5,py=.5)=>{const image=im(name);ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.drawImage(image,-w*px,-h*py,w,h);ctx.restore();};
   const natural=(name,cx,cy,w,angle=0,px=.5,py=.5)=>{const image=im(name);sprite(name,cx,cy,w,w*image.height/image.width,angle,px,py);};
   const bone=(name,a,b,pa,pb)=>{const image=im(name),ax=pa[0]*image.width,ay=pa[1]*image.height,bx=pb[0]*image.width,by=pb[1]*image.height,k=Math.hypot(b[0]-a[0],b[1]-a[1])/Math.hypot(bx-ax,by-ay),angle=Math.atan2(b[1]-a[1],b[0]-a[0])-Math.atan2(by-ay,bx-ax);ctx.save();ctx.translate(...a);ctx.rotate(angle);ctx.scale(k,k);ctx.drawImage(image,-ax,-ay);ctx.restore();report.links.push({part:name,start:[...a],end:[...b]});};
   const phase=(time%1.6)/1.6,attack=mode==='attack'?(phase<.16?-ease(phase/.16)*.15:phase<.34?ease((phase-.16)/.18):phase<.65?1-ease((phase-.34)/.31):0):0,walk=mode==='walk'?Math.sin(time*TAU*1.3):0,hurt=mode==='hurt',bounce=hurt?Math.abs(Math.sin((time%1)*TAU))*14:0;
   const bob=mode==='walk'?-Math.abs(walk)*3:mode==='idle'?-Math.sin(time*TAU/2)*1.5:0;
   ctx.save();ctx.translate(x+(hurt?18*Math.sin(Math.PI*(time%1)):-attack*4),y+bob-bounce);ctx.rotate(hurt?.18:mode==='walk'?walk*.018:0);ctx.scale(scale,scale);
   const eyes=mode==='attack'?'eyes-attack':hurt?'eyes-hurt':form===1&&time%4>3.85?'eyes-blink':'eyes-idle',mouth=mode==='attack'?'mouth-attack':hurt?'mouth-hurt':'mouth-idle';
   if(form===1){
    natural('foot-right',20,-21,34,hurt?.4:-walk*.2);natural('foot-left',-24,-21-(walk>0?walk*4:0),34,hurt?-.25:walk*.2);
    const head=[-5,-99];natural('head',...head,166);natural(eyes,head[0]-13,head[1]+13,70);natural(mouth,head[0]-14,head[1]+41,23);
    const left=[-68-attack*5,-62-attack*9+(mode==='walk'?walk*2:0)],right=[64,-61+(mode==='walk'?-walk*2:0)];
    natural('pouch',right[0]-12,right[1]-10,47);natural('hand-right',...right,30);
    const spoonAngle=-.45-attack*.9;natural('spoon',...left,25,spoonAngle,.5,.88);natural('hand-left',...left,31);
    report.joints={head,leftHand:left,rightHand:right};report.grips=[{part:'spoon',joint:'leftHand',position:left},{part:'pouch',joint:'rightHand',position:right}];
   }else{
    const hipL=[-23,-67],hipR=[23,-67],ankleL=[-26+walk*12,-8-Math.max(0,walk)*8],ankleR=[25-walk*12,-8-Math.max(0,-walk)*8];
    if(hurt){ankleL[0]-=12;ankleL[1]-=12;ankleR[0]+=7;ankleR[1]-=2;}
    bone('leg-right',hipR,ankleR,[.63,.08],[.44,.91]);bone('leg-left',hipL,ankleL,[.63,.08],[.44,.91]);
    const shoulderL=[-43,-154],shoulderR=[43,-154],handL=[lerp(-70,-113,Math.max(0,attack)),lerp(-137,-159,Math.max(0,attack))+walk*3],handR=[73,-101-walk*3],elbowL=ik(shoulderL,handL,39,36),elbowR=ik(shoulderR,handR,39,36);
    bone('upper-right',shoulderR,elbowR,[.24,.14],[.77,.88]);natural('pouch',handR[0]-11,handR[1]-18,48);bone('fore-right',elbowR,handR,[.25,.13],[.73,.86]);
    bone('upper-left',shoulderL,elbowL,[.70,.14],[.24,.88]);
    natural('body',0,-112,127);
    natural('spoon',...handL,23,-.38-Math.max(0,attack)*1.1,.5,.88);bone('fore-left',elbowL,handL,[.70,.13],[.24,.86]);
    const head=[-7,-231];natural('head',...head,193);natural(eyes,head[0]-21,head[1]+30,68);natural(mouth,head[0]-21,head[1]+57,25);
    report.joints={hipL,hipR,ankleL,ankleR,shoulderL,shoulderR,elbowL,elbowR,leftHand:handL,rightHand:handR,head};report.grips=[{part:'spoon',joint:'leftHand',position:handL},{part:'pouch',joint:'rightHand',position:handR}];
   }
   if(mode==='attack'&&phase>.25&&phase<.6){const fx=this.images['1:spice-fx'],a=Math.sin((phase-.25)/.35*Math.PI),cy=form===1?-98:-165;ctx.save();ctx.globalAlpha=a;ctx.drawImage(fx,-185-(phase-.25)*75,cy-24,92,56);ctx.restore();}
   if(debug){ctx.save();ctx.lineWidth=1.5;ctx.strokeStyle='#5affce';for(const link of report.links){ctx.beginPath();ctx.moveTo(...link.start);ctx.lineTo(...link.end);ctx.stroke();}for(const [name,p]of Object.entries(report.joints)){ctx.fillStyle='#f65eab';ctx.beginPath();ctx.arc(p[0],p[1],3,0,TAU);ctx.fill();ctx.fillStyle='#eef';ctx.font='9px sans-serif';ctx.fillText(name,p[0]+4,p[1]-3);}ctx.restore();}
   ctx.restore();return report;
  }
 }
 globalThis.SaffronRig=SaffronRig;
})();
