// Approved raster art only. Load after the ally registry and third-form ability module.
for(const [id,atlases,gender] of [
 ['hulasilver',HULASILVER_MOTION_ATLASES,'남성'],
 ['drumscarlet',DRUMSCARLET_MOTION_ATLASES,'여성'],
 ['vermilion',VERMILION_MOTION_ATLASES,'여성']
]){
 NEW_ATLASES[id]={...atlases[id+'_1'],evolved:{...atlases[id+'_2']}};
 for(const a of [NEW_ATLASES[id],NEW_ATLASES[id].evolved]){
  // Align the impact to each existing windup; art never adds a second gameplay hit.
  a.attackKeys=[[0,0],[4,1],[data.units[id].windup*30,2],[18,3]];
 }
 PROFILE_ART[id]=[1,2].map(f=>`assets/${id}-motion/${id}_${f}-profile.webp?v=1`);
 for(const text of [PROFILE_TEXT,PROFILE_TEXT_EVOLVED])if(!text[id].startsWith(gender))text[id]=gender+'. '+text[id];
 EVO_BODY_H[id]=90;
}
NEW_ATLASES.ivory.true={...IVORY_THIRD_MOTION_ATLASES.ivory_3,
 // Ivory already hits immediately: show the impact on frame zero rather than adding a new windup.
 attackKeys:[[0,2],[5,3],[11,0]]};
PROFILE_ART_TRUE.ivory='assets/ivory-3-motion/ivory_3-profile.webp?v=1';
(function(){
 const before=animateAtlas;
 animateAtlas=function(u){
  const active=u.type==='ivory'?u.stats?.trueForm:['hulasilver','drumscarlet','vermilion'].includes(u.type);
  if(!active)return before(u);
  const base=NEW_ATLASES[u.type],a=u.stats?.trueForm?base.true:u.stats?.evolved?base.evolved:base;
  const stationary=u.motion71LastX===u.x;u.motion71LastX=u.x;
  const walk=a.walk,step=a.walkStep;
  try{
   if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}
   const result=before(u);
   if(u.hurtTime>0&&u.hurtTime<=HITBACK_DURATION*.5&&a.hurtRecovery){
    const [x,y,w,h,ox=0,oy=0]=a.hurtRecovery,s=u.el.querySelector('.dog-sprite');
    Object.assign(s.style,{backgroundPosition:`-${x}px -${y}px`,width:w+'px',height:h+'px',left:(a.left-ox*a.scale)+'px',bottom:((a.lift||0)+oy)*a.scale+'px'});
   }
   return result;
  }finally{a.walk=walk;a.walkStep=step}
 };
 const preview=renderCodexPreview;
 renderCodexPreview=function(){preview.apply(this,arguments);if(codexTab==='ally'&&codexType==='ivory'&&codexEvolved&&hasTrueForm('ivory')){
  $('#codexDesc').textContent='크림색 베레모와 앞치마를 갖춘 아이보리. 아이스크림 콘에서 크림을 뿌리는 범위 딜러 겸 느리게 지원. 3진은 체력·공격력 140%, 공격 간격 2.5초, 모든 적을 100% 3초 느리게 하고, 크리티컬 40%(2.5배)와 메탈 킬러 12%를 갖춘다.';
 }};
})();
renderNewButtons();renderDeckButtons();renderTraining();

// Dedicated art is already Vermilion-colored; disable the old Flame tint.
{const style=document.createElement('style');style.textContent='.unit.vermilion .dog-sprite{filter:none}';document.head.append(style);}
