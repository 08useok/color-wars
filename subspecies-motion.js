// Approved raster designs. This module changes presentation only; stage/reward work is independent.
const SUBSPECIES_GENDERS={herbmint:'남성',kendonavy:'여성',alchemypurple:'남성',rhythmpink:'남성'};
for(const id of Object.keys(SUBSPECIES_GENDERS)){
 const base=SUBSPECIES_MOTION_ATLASES[id+'_1'],evolved=SUBSPECIES_MOTION_ATLASES[id+'_2'];
 NEW_ATLASES[id]={...base,evolved};
 PROFILE_ART[id]=[1,2].map(form=>'assets/subspecies-motion/'+id+'_'+form+'-profile.webp?v=1');
 for(const text of [PROFILE_TEXT,PROFILE_TEXT_EVOLVED]){
  // Keep the job/profile written by the ally registry, and preserve an explicit gender setting.
  text[id]=text[id].replace(/^(?:남성|여성)\.\s*/,'');
  text[id]=SUBSPECIES_GENDERS[id]+'. '+text[id];
 }
}
// Recovery from a hit uses the second approved drawing in the latter half of the existing hitback.
const subspeciesAnimateBefore=animateAtlas;
animateAtlas=function(u){
 subspeciesAnimateBefore(u);
 if(!SUBSPECIES_GENDERS[u.type]||!(u.hurtTime>0&&u.hurtTime<=HITBACK_DURATION*.5))return;
 const atlas=NEW_ATLASES[u.type],active=u.stats?.evolved?atlas.evolved:atlas,f=active.hurtRecovery;
 if(!f)return;
 const [x,y,w,h,ox=0,oy=0]=f,s=u.el.querySelector('.dog-sprite'),scale=active.scale;
 Object.assign(s.style,{backgroundPosition:`-${x}px -${y}px`,width:w+'px',height:h+'px',left:(active.left-ox*scale)+'px',bottom:((active.lift||0)+oy)*scale+'px'});
};
renderTraining();
