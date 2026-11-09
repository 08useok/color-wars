// 8.3 basic forms, with dedicated 30 FPS third-form art.
const BASIC_THIRD83={
 red:{name:'스타 챔피언 레드',bonus:{}},
 green:{name:'가든키퍼 그린',bonus:{area:true,returnMult:1.8,blowChance:.3,blowDistance:7}},
 blue:{name:'특급택배 블루',bonus:{immune:{weaken:true},survive:.5,surviveOnce:true}},
 orange:{name:'풍년농부 오렌',bonus:{killGold:1.5,statusVs:['red'],slowChance:.5,slowDuration:2}},
 yellow:{name:'고압전기 옐로',bonus:{waveImmune:true,immune:{slow:true}}},
 purple:{name:'마스터 조향사 퍼플',bonus:{statusVs:['red'],atkDownChance:.5,atkDownPct:.5,atkDownDuration:3,curseChance:.5,curseDuration:3}},
 pink:{name:'라이브스타 핑크',bonus:{slowChance:.6,slowDuration:2.5,windup:.2,freezeChance:.3,freezeDuration:1}},
 cyan:{name:'수석연구원 시안',bonus:{interval:2.8,blindSpot:false,statusVs:['floating'],freezeChance:.5,freezeDuration:2}}
};
for(const [id,s]of Object.entries(BASIC_THIRD83)){
 TRUE_NAME[id]=s.name;TRUE_FORM_HP_MULT[id]=2;TRUE_FORM_ATK_MULT[id]=2;TRUE_FORM_BONUS[id]=s.bonus;
 if(typeof BASIC_THIRD83_ATLASES!=='undefined'&&BASIC_THIRD83_ATLASES[id]){
  NEW_ATLASES[id].true={...BASIC_THIRD83_ATLASES[id]};
  PROFILE_ART_TRUE[id]=NEW_ATLASES[id].true.sheet.replace(/\.webp(?=\?|$)/,'-profile.webp');
 }
}
{const before=unitStats;unitStats=function(id,...args){const s=before(id,...args);if(!s.trueForm||!BASIC_THIRD83[id])return s;
 if(id==='red')s.range=160*.034;
 if(id==='blue')s.speed*=1.2;
 if(id==='orange')s.splash*=1.3;
 s.cooldown=Math.max(2,s.cooldown);return s;
};}
{const before=deadZone;deadZone=function(u){return u.type==='cyan'&&u.stats?.trueForm?0:before(u);};}
{
 const before=animateAtlas;
 animateAtlas=function(u){
  if(!BASIC_THIRD83[u.type]||!u.stats?.trueForm)return before(u);
  const a=NEW_ATLASES[u.type].true;if(!a)return before(u);
  const walk=a.walk,step=a.walkStep,hurt=a.hurt,stationary=u.basic83X===u.x;
  u.basic83X=u.x;
  try{
   if(u.hurtTime>0){
    if(!(u.basic83HurtLast>0)||u.hurtTime>u.basic83HurtLast)u.basic83HurtDuration=u.hurtTime;
    const f=Math.min(hurt.length-1,Math.max(0,Math.floor((1-u.hurtTime/(u.basic83HurtDuration||HITBACK_DURATION))*hurt.length)));
    a.hurt=[hurt[f]];
   }else if(u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=1/30;}
   return before(u);
  }finally{a.walk=walk;a.walkStep=step;a.hurt=hurt;u.basic83HurtLast=u.hurtTime;}
 };
}
renderTraining();renderNewButtons();renderDeckButtons();
