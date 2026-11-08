// Shared 30 FPS timeline. Six walk drawings are held for three ticks each.
// The renderer still uses each unit's own windup and recovery for attack impact.
const BASIC_REDESIGN_IDS=['red','green','blue','orange','yellow','purple','pink','cyan'];
for(const id of BASIC_REDESIGN_IDS){
 const original=NEW_ATLASES[id]||{};
 NEW_ATLASES[id]={...BASIC_REDESIGN_ATLASES[id+'_1'],
  evolved:{...BASIC_REDESIGN_ATLASES[id+'_2']},
  ...(original.true?{true:original.true}:{})};
 PROFILE_ART[id]=[1,2].map(form=>'assets/basic-redesign-motion/'+id+'_'+form+'-profile.webp?v=1');
 EVO_BODY_H[id]=90;
}
{
 const before=animateAtlas;
 animateAtlas=function(u){
  if(!BASIC_REDESIGN_IDS.includes(u.type)||u.stats?.trueForm)return before(u);
  const atlas=u.stats?.evolved?NEW_ATLASES[u.type].evolved:NEW_ATLASES[u.type];
  const stationary=u.basicRedesignX===u.x;
  u.basicRedesignX=u.x;
  const frames=atlas.walk,step=atlas.walkStep;
  try{
   if(u.hurtTime<=0&&u.attackTime<=0&&stationary){
    atlas.walk=atlas.idle;
    atlas.walkStep=atlas.idleStep;
   }
   return before(u);
  }finally{
   atlas.walk=frames;
   atlas.walkStep=step;
  }
 };
}
