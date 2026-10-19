// v6.8.0: Head Referee Coral. Existing forms and saved ownership are preserved.
NEW_ATLASES.coral.true=CORAL_THIRD_ATLAS;
PROFILE_ART_TRUE.coral='assets/profile_coral_3.webp?v=1';
TRUE_NAME.coral='주심 코랄';
TRUE_FORM_HP_MULT.coral=1.5;
TRUE_FORM_ATK_MULT.coral=1.4;
TRUE_FORM_BONUS.coral={area:true,attackClass:'범위',hits:[{at:.35,share:.5},{at:.65,share:.5}],attackDuration:.8};
(function(){
 const statsBefore=unitStats;
 unitStats=function(type,...args){const s=statsBefore(type,...args);if(type==='coral'&&s.trueForm){s.cost=ch1Cost(350);s.cooldown=20}return s};
 // The legacy area branch doesn't use hit shares. Apply them only to Coral's new combo.
 const resolveBefore=resolveAttack;
 resolveAttack=function(u,t,share=1){
  if(u.type!=='coral'||!u.stats?.trueForm||!u.stats.area)return resolveBefore(u,t,share);
  const s=u.stats,atk=s.atk;
  try{s.atk=atk*share;return resolveBefore(u,t,1)}finally{s.atk=atk}
 };
 const animateBefore=animateAtlas;
 animateAtlas=function(u){
  if(u.type!=='coral'||!u.stats?.trueForm)return animateBefore(u);
  const a=NEW_ATLASES.coral.true,stationary=u.coralLastX===u.x;
  u.coralLastX=u.x;
  if(u.hurtTime>0||u.attackTime>0||!stationary)return animateBefore(u);
  const walk=a.walk,step=a.walkStep;
  try{a.walk=a.idle;a.walkStep=.65;return animateBefore(u)}finally{a.walk=walk;a.walkStep=step}
 };
 const previewBefore=renderCodexPreview;
 renderCodexPreview=function(){previewBefore();if(codexTab==='ally'&&codexType==='coral'&&codexEvolved&&unitStats('coral').trueForm){document.querySelector('#codexRole').textContent='심판 · 범위 2연타 · 떠 있는 적 초데미지';document.querySelector('#codexDesc').textContent='레드카드를 제시하고 휘슬을 불어 두 번의 판정을 내리는 주심. 떠 있는 적 무리를 범위로 타격한다.'}};
})();
