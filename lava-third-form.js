// v6.9.0 · 대북 라바. Existing first/second forms and their costs stay intact.
NEW_ATLASES.lava.true={...LAVA_THIRD_MOTION_ATLASES.lava_3,attackKeys:[[0,0],[6,1],[10.5,2],[18,3]]};
PROFILE_ART_TRUE.lava='assets/lava-3-motion/lava_3-profile.webp';TRUE_NAME.lava='대북 라바';
TRUE_FORM_HP_MULT.lava=1.5;TRUE_FORM_ATK_MULT.lava=1.4;
TRUE_FORM_BONUS.lava={interval:3.2,range:data.units.lava.range*1.2*1.1,dodge:{chance:.25,duration:3.3,vs:['black']}};
(function(){
 const animate=animateAtlas;
 animateAtlas=function(u){
  if(u.type!=='lava'||!u.stats?.trueForm)return animate(u);
  const a=NEW_ATLASES.lava.true,stationary=u.lavaLastX===u.x;u.lavaLastX=u.x;
  if(u.hurtTime>0||u.attackTime>0||!stationary)return animate(u);
  const walk=a.walk,step=a.walkStep;
  try{a.walk=a.idle;a.walkStep=.65;return animate(u)}finally{a.walk=walk;a.walkStep=step}
 };
 const before=damage;
 damage=function(v,amount,from){
  if(v?.type!=='lava'||!v.ally||!v.stats?.trueForm)return before(v,amount,from);
  const black=from&&!from.ally&&hasTrait(from.stats||data.units[from.type],'black');
  if(black)return before(v,amount,from);
  // Turquoise's generic dodge handles all attacks; Lava's dodge applies only to black enemies.
  const s=v.stats,dodge=s.dodge,until=v.dodgeUntil;
  try{delete s.dodge;v.dodgeUntil=0;return before(v,amount,from)}finally{s.dodge=dodge;v.dodgeUntil=until}
 };
})();

(function(){const before=codexTraitBadges;codexTraitBadges=function(d){const out=before(d);return d.dodge?.vs?.includes('black')?out.map(t=>t.replace('초간 모든 피해 무효','초간 검은 적 피해 무효')):out};})();
