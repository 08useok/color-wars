// 7.5: third form only. Each strike gets 1/3 of the cycle's direct damage.
TRUE_NAME.verdigris='터빈 베르디그리';
TRUE_FORM_HP_MULT.verdigris=1.5;
TRUE_FORM_ATK_MULT.verdigris=1.5;
TRUE_FORM_BONUS.verdigris={interval:1.7,attackDuration:1.2,windup:.35,strikes:true,
 surge:{start:8,end:30,dur:2,tick:.5,mult:1/6}};
{const before=unitStats;unitStats=function(type,...args){
 const s=before(type,...args);if(type!=='verdigris'||!s.trueForm)return s;
 const shove=s.blowChance,dist=s.blowDistance;
 s.hits=[
  {at:.35,share:1/3,abilities:{range:7.2,blowChance:0,surge:null}},
  {at:.65,share:1/3,abilities:{range:12,blowChance:0,surge:null}},
  {at:.95,share:1/3,abilities:{range:18,blowChance:shove,blowDistance:dist,surge:{start:8,end:30,dur:2,tick:.5,mult:1/6}}}
 ];
 return s;
};}
NEW_ATLASES.verdigris.true={...VERDIGRIS_THIRD_MOTION_ATLASES.verdigris_3,
 attackKeys:[[0,0],[10.5,1],[15,2],[19.5,3],[24,4],[28.5,5],[33,6]]};
PROFILE_ART_TRUE.verdigris='assets/verdigris-3-motion-v2/verdigris_3-profile.webp?v=1';
{const before=animateAtlas;animateAtlas=function(u){
 if(u.type!=='verdigris'||!u.stats?.trueForm)return before(u);
 const a=NEW_ATLASES.verdigris.true,stationary=u.verdigrisLastX===u.x;u.verdigrisLastX=u.x;
 const walk=a.walk,step=a.walkStep;
 try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}
 finally{a.walk=walk;a.walkStep=step;}
};}
renderNewButtons();renderDeckButtons();renderTraining();
