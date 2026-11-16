// 8.6 local content: Saffron, female spice merchant. No release/save migration.
if(typeof SAFFRON_GAME_ATLASES!=='undefined'){
 const spec={name:'사프',color:'#F4C430',hp:120000,dps:9375,interval:3.2,speed:8,range:13.6,cost:4200,wait:60,kb:3,traits:['ancient','angel'],freeze:0,windup:.45,recovery:1.15,atlas:SAFFRON_GAME_ATLASES,dir:'saffron-parts',
  extra:{saffron86:true,area:true,attackClass:'원거리 범위',zoneMin:6.8,zoneMax:18.7,freezeChance:0,freezeDuration:0,slowChance:.65,slowDuration:3,immune:{curse:true}},
  profile:'여성. 향신료 상인. 향신료를 흩뿌려 고대종과 천사에게 초데미지를 주고 65% 확률로 3초간 느리게 한다. 고대의 저주를 무시한다.',
  evolved:'크림색 상인 코트와 향신료 주머니를 갖춘 사프. 긴 숟가락으로 향신료를 멀리 흩뿌린다.'};
 BUSTERS75.saffron=spec;registerBuster75('saffron',spec);
 RARE_STRIKE.saffron=1;
 PROFILE_ART.saffron=[1,2].map(form=>'assets/saffron-parts/saffron_'+form+'-profile.webp?v=6');
 ROLES.saffron='원거리 범위 · 고대종·천사 초데미지·느리게 · 고대의 저주 무효';
 ACQUIRE_TEXT.saffron='고대·천사 바스터즈 전용 뽑기로 획득';
 if(typeof BUSTERS75_BANNERS!=='undefined'){
  for(const name of ['고대 바스터즈','천사 바스터즈']){const ids=BUSTERS75_BANNERS[name]||(BUSTERS75_BANNERS[name]=[]);if(!ids.includes('saffron'))ids.push('saffron');SERIES_MEMBERS[name]=ids.map(id=>({id,name:BUSTERS75[id].name}));}
  if(!GACHA_UBER.some(u=>u.id==='saffron'))GACHA_UBER.push({id:'saffron',name:spec.name});
  if(gachaOpen())renderGacha();
 }
}
// These are final post-8.0 distances, not pre-nerf inputs.
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(id==='saffron'){s.range=400*.034;s.zoneMin=200*.034;s.zoneMax=550*.034;s.blindSpot=true;}return s;};}
{const before=hasBlindSpot;hasBlindSpot=function(d){return d?.saffron86?true:before(d);};}
// Readiness is shared by every unit/codex preview. The atlas stays visible until ready.
let saffronLiveRig=null,saffronRigPromise=null;
function saffronPartImageUrls(roster){
 if(!roster.has('saffron'))return [];
 return Object.values(SAFFRON_PARTS_META.forms).flatMap(parts=>Object.values(parts).map(p=>'assets/saffron-parts/'+p.file));
}
function saffronEnsureRig(){
 if(!saffronRigPromise)saffronRigPromise=SaffronRig.load('assets/saffron-parts/').then(r=>saffronLiveRig=r).catch(e=>{saffronRigPromise=null;console.error('사프 파츠 준비 실패',e);});
 return saffronRigPromise;
}
{const before=animateAtlas;animateAtlas=function(u){
 if(u.type!=='saffron')return before(u);
 const result=before(u);
 if(!saffronLiveRig){saffronEnsureRig();return result;}
 let canvas=u.el.querySelector('.saffron-live-rig');
 if(!canvas){canvas=document.createElement('canvas');canvas.className='saffron-live-rig';canvas.width=600;canvas.height=420;canvas.style.cssText='position:absolute;pointer-events:none;width:228px;height:159.6px;left:-93px;bottom:-20.9px';u.el.append(canvas);}
 const ctx=canvas.getContext('2d');if(!ctx?.clearRect)return before(u);
 const stationary=u.saffronLastX===u.x;u.saffronLastX=u.x;
 const mode=u.hurtTime>0?'hurt':u.attackTime>0?'attack':stationary?'idle':'walk';
 if(mode==='hurt'&&u.saffronLastMode!=='hurt')u.saffronHurtDuration=u.hurtTime;
 const time=mode==='attack'?Math.max(0,(u.stats.attackDuration||1.6)-u.attackTime):mode==='hurt'?Math.max(0,1-u.hurtTime/(u.saffronHurtDuration||1)):(u.animTime||0);
 ctx.clearRect(0,0,600,420);saffronLiveRig.draw(ctx,{form:u.stats.evolved?2:1,mode,time});u.saffronLastMode=mode;
 u.el.querySelector('.dog-sprite').style.visibility='hidden';
};}
if(typeof SAFFRON_GAME_ATLASES!=='undefined'){renderNewButtons();renderDeckButtons();renderTraining();}
