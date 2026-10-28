// Load after the approved abilities and their dedicated raster atlases.
const THIRD_FORM_72_NAMES={lavender:'플로럴 라벤더',azure:'빅웨이브 애저',aqua:'마린 아쿠아',babyblue:'클럽 베이비 블루'};
for(const [id,source] of Object.entries(THIRD_FORM_72_MOTION_ATLASES)){
 const a={...source},d=data.units[id],duration=d.attackDuration||.56,windup=d.windup||0;
 // Impact pose follows the existing damage instant; art never changes stats/timing.
 a.attackKeys=windup>0?[[0,0],[windup*15,1],[windup*30,2]]:[[0,2]];
 for(let i=3;i<7;i++)a.attackKeys.push([(windup+(duration-windup)*(i-2)/5)*30,i]);
 NEW_ATLASES[id].true=a;
 PROFILE_ART_TRUE[id]=`assets/${id}-3-motion/${id}_3-profile.webp?v=1`;
 TRUE_NAME[id]=THIRD_FORM_72_NAMES[id];
}
(function(){
 const before=animateAtlas;
 animateAtlas=function(u){
  if(!u.stats?.trueForm||!THIRD_FORM_72_MOTION_ATLASES[u.type])return before(u);
  const a=NEW_ATLASES[u.type].true,stationary=u.third72LastX===u.x;u.third72LastX=u.x;
  const walk=a.walk,step=a.walkStep;
  try{
   if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}
   return before(u);
  }finally{a.walk=walk;a.walkStep=step;}
 };
})();
renderNewButtons();renderDeckButtons();renderTraining();
