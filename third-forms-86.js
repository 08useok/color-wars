// Approved 8.6 forms: evolved HP/ATK x2. Existing cost/range/cooldown retained.
const THIRD86={
 crimson:{name:'브레이커 크림슨',bonus:{area:true,attackClass:'범위',critChance:.25}},
 chartreuse:{name:'세븐버스트 샤르트뢰즈',bonus:{multiHit:7,interval:2}},
 mint:{name:'프로즌 파티시에 민트',bonus:{freezeChance:.65,freezeDuration:2.5}},
 black:{name:'고문서 명필 블랙',bonus:{area:true,attackClass:'범위',massiveVs:['black','ancient'],immune:{curse:true}}}
};
for(const [id,s]of Object.entries(THIRD86)){
 TRUE_NAME[id]=s.name;TRUE_FORM_HP_MULT[id]=2;TRUE_FORM_ATK_MULT[id]=2;TRUE_FORM_BONUS[id]=s.bonus;
 if(typeof THIRD86_ATLASES!=='undefined'&&THIRD86_ATLASES[id]){NEW_ATLASES[id].true=THIRD86_ATLASES[id];PROFILE_ART_TRUE[id]='assets/third-form-86-motion/'+id+'-profile.png?v=1';}
}
{const before=animateAtlas;animateAtlas=function(u){if(!THIRD86[u.type]||!u.stats?.trueForm||!NEW_ATLASES[u.type].true)return before(u);const a=NEW_ATLASES[u.type].true,walk=a.walk,step=a.walkStep,still=u.third86X===u.x;u.third86X=u.x;try{if(u.hurtTime<=0&&u.attackTime<=0&&still){a.walk=a.idle;a.walkStep=1/30;}return before(u);}finally{a.walk=walk;a.walkStep=step;}};}
renderTraining();renderNewButtons();renderDeckButtons();
