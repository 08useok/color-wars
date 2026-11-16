// Hierarchical cutout renderer. Complete arm pieces pivot at shoulders; props share hand joints.
(function(){
 const TAU=Math.PI*2,ease=t=>t*t*(3-2*t);
 // Eye marks are the midpoint and spacing of the two main eye components,
 // excluding detached brows. Aligning image boxes made brows move the pupils.
 const FACE_MARKS={
  1:{eyeWidth:70,eyeTarget:[-19.9434628975,13.3271028037],mouthTarget:[-19.9434628975,41],mouthWidth:23,mouthMaxHeight:24,eyes:{'eyes-idle':[105.5,55.5,139],'eyes-attack':[105.5,87,140],'eyes-hurt':[104,106.75,135],'eyes-blink':[125.5,31.5,147]}},
  2:{eyeWidth:68,eyeTarget:[-21.4322033898,30.1440677966],mouthTarget:[-21,57],mouthWidth:25,mouthMaxHeight:22,eyes:{'eyes-idle':[116.5,61,146],'eyes-attack':[118.75,81,154.5],'eyes-hurt':[111.25,105.25,137.5]}}
 };
 class SaffronRig{
  constructor(images,meta){this.images=images;this.meta=meta;}
  static async load(base){const images={},meta=globalThis.SAFFRON_PARTS_META;if(!meta)throw Error('Missing Saffron parts metadata');await Promise.all(Object.entries(meta.forms).flatMap(([form,parts])=>Object.entries(parts).map(async([name,p])=>{const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=()=>reject(Error('Missing '+p.file));im.src=base+p.file;});images[form+':'+name]=im;})));return new SaffronRig(images,meta);}
  draw(ctx,{form=2,mode='idle',time=0,x=300,y=365,scale=1,debug=false}={}){
   const im=name=>this.images[form+':'+name],report={form,mode,joints:{},links:[],grips:[]};
   const sprite=(name,cx,cy,w,h,angle=0,px=.5,py=.5)=>{const image=im(name);ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.drawImage(image,-w*px,-h*py,w,h);ctx.restore();};
   const natural=(name,cx,cy,w,angle=0,px=.5,py=.5)=>{const image=im(name);sprite(name,cx,cy,w,w*image.height/image.width,angle,px,py);};
   const face=head=>{const spec=FACE_MARKS[form],base=im('eyes-idle'),eye=im(eyes),[ex,ey,spacing]=spec.eyes[eyes],k=spec.eyeWidth/base.width*spec.eyes['eyes-idle'][2]/spacing,mouthImage=im(mouth),idleMouth=im('mouth-idle'),lipY=spec.mouthTarget[1]-spec.mouthWidth*idleMouth.height/idleMouth.width/2,mouthWidth=Math.min(spec.mouthWidth,spec.mouthMaxHeight*mouthImage.width/mouthImage.height);
    ctx.save();ctx.translate(...head);natural('head',0,0,form===1?166:193);
    ctx.drawImage(eye,spec.eyeTarget[0]-ex*k,spec.eyeTarget[1]-ey*k,eye.width*k,eye.height*k);
    natural(mouth,spec.mouthTarget[0],lipY,mouthWidth,0,.5,0);ctx.restore();
    report.face={eyes:eyes,mouth:mouth,eyeAnchor:[head[0]+spec.eyeTarget[0],head[1]+spec.eyeTarget[1]],mouthAnchor:[head[0]+spec.mouthTarget[0],head[1]+lipY]};
   };
   const bone=(name,a,b,pa,pb,clip=[0,0,1,1],record=true)=>{const image=im(name),ax=pa[0]*image.width,ay=pa[1]*image.height,bx=pb[0]*image.width,by=pb[1]*image.height,k=Math.hypot(b[0]-a[0],b[1]-a[1])/Math.hypot(bx-ax,by-ay),angle=Math.atan2(b[1]-a[1],b[0]-a[0])-Math.atan2(by-ay,bx-ax),[sx,sy,sw,sh]=clip.map((n,i)=>n*(i%2?image.height:image.width));ctx.save();ctx.translate(...a);ctx.rotate(angle);ctx.scale(k,k);ctx.drawImage(image,sx,sy,sw,sh,sx-ax,sy-ay,sw,sh);ctx.restore();if(record)report.links.push({part:name,start:[...a],end:[...b],clip});};
   const phase=(time%1.6)/1.6,attack=mode==='attack'?(phase<.16?-ease(phase/.16)*.15:phase<.34?ease((phase-.16)/.18):phase<.65?1-ease((phase-.34)/.31):0):0,walk=mode==='walk'?Math.sin(time*TAU*1.3):0,hurt=mode==='hurt',bounce=hurt?Math.abs(Math.sin((time%1)*TAU))*14:0;
   const bob=mode==='walk'?-Math.abs(walk)*3:mode==='idle'?-Math.sin(time*TAU/2)*1.5:0;
   ctx.save();ctx.translate(x+(hurt?18*Math.sin(Math.PI*(time%1)):-attack*4),y+bob-bounce);ctx.rotate(hurt?.18:mode==='walk'?walk*.018:0);ctx.scale(scale,scale);
   const eyes=mode==='attack'?'eyes-attack':hurt?'eyes-hurt':form===1&&time%4>3.85?'eyes-blink':'eyes-idle',mouth=mode==='attack'?'mouth-attack':hurt?'mouth-hurt':'mouth-idle';
   if(form===1){
    const ankleL=[-18,-24-Math.max(0,walk)*3],ankleR=[20,-24-Math.max(0,-walk)*3];
    natural('foot-right',...ankleR,34,hurt?.4:-walk*.16,.68,.12);natural('foot-left',...ankleL,34,hurt?-.25:walk*.16,.68,.12);
    const head=[20,-99];face(head);
    const left=[-68-attack*5,-62-attack*9+(mode==='walk'?walk*2:0)],right=[64,-61+(mode==='walk'?-walk*2:0)];
    natural('pouch',...right,47,0,.88,.35);natural('hand-right',...right,30);
    const spoonAngle=-.45-attack*.9;natural('spoon',...left,25,spoonAngle,.28,.85);natural('hand-left',...left,31);
    report.joints={head,ankleL,ankleR,leftHand:left,rightHand:right};report.grips=[{part:'spoon',joint:'leftHand',position:left,anchor:[.28,.85]},{part:'pouch',joint:'rightHand',position:right,anchor:[.88,.35]}];
   }else{
    const hipL=[-23,-65],hipR=[23,-65],legL=hurt?-.3:walk*.19,legR=hurt?.2:-walk*.19,ankleL=[hipL[0]+Math.sin(legL)*57,hipL[1]+Math.cos(legL)*57],ankleR=[hipR[0]+Math.sin(legR)*57,hipR[1]+Math.cos(legR)*57];
    bone('leg-right',hipR,ankleR,[.63,.08],[.44,.91]);bone('leg-left',hipL,ankleL,[.63,.08],[.44,.91]);
    const shoulderL=[-30,-154],shoulderR=[26,-154],angleL=2.05+Math.max(0,attack)*1.05+walk*.035+(hurt?-.16:0),angleR=1.02-walk*.035+(hurt?.10:0),handL=[shoulderL[0]+Math.cos(angleL)*62,shoulderL[1]+Math.sin(angleL)*62],handR=[shoulderR[0]+Math.cos(angleR)*62,shoulderR[1]+Math.sin(angleR)*62];
    // The forearm source is already a complete shoulder-to-hand drawing.
    // Pivot that piece intact instead of stacking a second shoulder/sleeve onto it.
    bone('fore-right',shoulderR,handR,[.25,.13],[.73,.86]);bone('fore-left',shoulderL,handL,[.70,.13],[.24,.86]);
    natural('body',0,-112,127);
    natural('pouch',...handR,48,0,.88,.35);bone('fore-right',shoulderR,handR,[.25,.13],[.73,.86],[0,.78,1,.22],false);
    natural('spoon',...handL,23,-.38-Math.max(0,attack)*1.1,.48,.87);bone('fore-left',shoulderL,handL,[.70,.13],[.24,.86],[0,.78,1,.22],false);
    const head=[22,-231];face(head);
    report.joints={hipL,hipR,ankleL,ankleR,shoulderL,shoulderR,leftHand:handL,rightHand:handR,head};report.grips=[{part:'spoon',joint:'leftHand',position:handL,anchor:[.48,.87]},{part:'pouch',joint:'rightHand',position:handR,anchor:[.88,.35]}];
   }
   if(mode==='attack'&&phase>.25&&phase<.6){const fx=this.images['1:spice-fx'],a=Math.sin((phase-.25)/.35*Math.PI),cy=form===1?-98:-165;ctx.save();ctx.globalAlpha=a;ctx.drawImage(fx,-185-(phase-.25)*75,cy-24,92,56);ctx.restore();}
   if(debug){ctx.save();ctx.lineWidth=1.5;ctx.strokeStyle='#5affce';for(const link of report.links){ctx.beginPath();ctx.moveTo(...link.start);ctx.lineTo(...link.end);ctx.stroke();}for(const [name,p]of Object.entries(report.joints)){ctx.fillStyle='#f65eab';ctx.beginPath();ctx.arc(p[0],p[1],3,0,TAU);ctx.fill();ctx.fillStyle='#eef';ctx.font='9px sans-serif';ctx.fillText(name,p[0]+4,p[1]-3);}ctx.restore();}
   ctx.restore();return report;
  }
 }
 globalThis.SaffronRig=SaffronRig;
})();
