// Dedicated art enables existing generic third-form progression and HP/ATK x1.2.
// 7.3 3진 능력(사용자 요청 '3진 능력 추가', 능력 수치는 제안): 마스터 바이올렛 = 둔화 30%·2.5초 → 65%·3.5초(메탈 제외 유지), 아키텍트 오키드 = 서지 22~50·피해 50% → 20~56·피해 60%(지속 2.4초·간격 0.6초 유지; 3초로 늘리면 OP 48초라 낮춤).
const THIRD73_NAMES={violet:'마스터 바이올렛',orchid:'아키텍트 오키드'};
TRUE_FORM_BONUS.violet={slowChance:.65,slowDuration:3.5};
TRUE_FORM_BONUS.orchid={surge:{start:20,end:56,dur:2.4,tick:.6,mult:.6}};
for(const [id,name]of Object.entries(THIRD73_NAMES)){
 const a={...ALLIES_73_MOTION_ATLASES[id+'_3']},d=data.units[id],windup=d.windup||0,duration=d.attackDuration||.8;
 a.attackKeys=[[0,0],[windup*15,1],[windup*30,2]];
 for(let f=3;f<7;f++)a.attackKeys.push([(windup+(duration-windup)*(f-2)/5)*30,f]);
 NEW_ATLASES[id].true=a;PROFILE_ART_TRUE[id]='assets/allies-73-motion/'+id+'_3-profile.webp?v=1';TRUE_NAME[id]=name;
}
// All five new designs have dedicated idle poses; attack/knockback take precedence.
{const before=animateAtlas;
 animateAtlas=function(u){
  if(!ALLIES73[u.type]&&!(u.stats?.trueForm&&THIRD73_NAMES[u.type]))return before(u);
  const base=NEW_ATLASES[u.type],a=u.stats?.trueForm?base.true:u.stats?.evolved&&base.evolved?base.evolved:base,stationary=u.last73X===u.x;u.last73X=u.x;
  const walk=a.walk,step=a.walkStep;
  try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u)}finally{a.walk=walk;a.walkStep=step;}
 };
}
renderNewButtons();renderDeckButtons();renderTraining();
