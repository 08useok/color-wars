// Approved 7.4 abilities; preserve second-form HP, ATK, price and production time.
const THIRD74_NAMES={lilac:'블룸 라일락',babypink:'리듬 베이비 핑크',magenta:'리액터 마젠타',fusioncream:'일루전 퓨전 크림'};
for(const id of Object.keys(THIRD74_NAMES)){TRUE_FORM_HP_MULT[id]=1.5;TRUE_FORM_ATK_MULT[id]=1.5;}
TRUE_FORM_BONUS.lilac={wave:{chance:1,level:1,reach:15.895,mult:1}};
TRUE_FORM_BONUS.babypink={interval:3,windup:0,attackDuration:0,statusVs:['angel','alien']};
TRUE_FORM_BONUS.magenta={};
TRUE_FORM_BONUS.fusioncream={barrierBreak:.1};
{const before=unitStats;
 unitStats=function(type,...args){const s=before(type,...args);if(!s.trueForm||!THIRD74_NAMES[type])return s;
  if(type==='lilac'){s.zoneMax=(s.zoneMax??s.range)*1.3;s.area=true;}
  if(type==='babypink')s.slowDuration+=1;
  if(type==='magenta')s.wave={...s.wave,level:(s.wave.level??Math.round((s.wave.reach-9.095)/6.8))+1,reach:s.wave.reach+6.8};
  if(type==='fusioncream')s.speed+=10;
  return s;
 };
}
for(const [id,name]of Object.entries(THIRD74_NAMES)){
 const a={...THIRD_FORM_74_MOTION_ATLASES[id+'_3']},d=data.units[id];
 const windup=id==='babypink'?0:d.windup||0,duration=id==='babypink'?0:d.attackDuration||.8;
 a.attackKeys=windup?[[0,0],[windup*15,1],[windup*30,2]]:[[0,2]];
 if(duration>0)for(let f=3;f<7;f++)a.attackKeys.push([(windup+(duration-windup)*(f-2)/5)*30,f]);
 NEW_ATLASES[id].true=a;PROFILE_ART_TRUE[id]='assets/third-form-74-motion/'+id+'_3-profile.webp?v=1';TRUE_NAME[id]=name;
}
{const before=animateAtlas;animateAtlas=function(u){
 if(!u.stats?.trueForm||!THIRD74_NAMES[u.type])return before(u);
 const a=NEW_ATLASES[u.type].true,stationary=u.third74X===u.x;u.third74X=u.x;
 const walk=a.walk,step=a.walkStep;
 try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{a.walk=walk;a.walkStep=step;}
};}
renderNewButtons();renderDeckButtons();renderTraining();
// The shared attack routine treats a zero duration as its default duration.
// Clear only this form's recovery after its immediate hit; keep interval intact.
{const before=attack;attack=function(u,t){
 if(u.type==='babypink'&&u.stats?.trueForm){
  // update() uses duration || interval when reserving a target. Zero recovery
  // must not reserve that target for a whole 4.53-second attack cycle.
  const target=t||(u.ally?data.bases.enemy:data.bases.ally),lock=target?.attackLock;
  if(lock&&Math.abs(lock.until-game.elapsed-u.stats.interval)<1e-8)lock.until=game.elapsed;
 }
 const r=before.apply(this,arguments);if(u.type==='babypink'&&u.stats?.trueForm)u.attackTime=0;return r;
};}
