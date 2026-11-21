// 8.7 local third forms. Existing 1st/2nd forms and save keys are preserved.
const THIRD87={
 aquamarine:{name:'급류 구조대 아쿠아마린',hp:2,atk:1,role:'범위 · 파동·독 무효 · 밀치기 60%',text:'체력 200% · 공격 간격 20% 단축. 무속성을 포함한 기존 밀치기 대상을 유지한다.'},
 cobalt:{name:'안전대장 코발트',hp:2,atk:2,role:'개체 · 에이리언 엄강 · 공격력 다운 무효',text:'체력·공격력 각각 200% · 가격 10% 인하.'},
 brown:{name:'쌍방패 브라운',hp:1,atk:1.5,role:'전방위 · 천사·떠 있는 적 맷집',text:'공격력 150% · 공격 간격 1초 · 앞 100~뒤 -100 전방위 공격. 체력은 그대로다.'},
 brick:{name:'고대 성벽 브릭',hp:1,atk:2,role:'개체 · 7속성 맷집 · 고대의 저주 무효',text:'공격력 200% · 기존 6속성 맷집에 고대종 추가. 체력은 그대로다.'}
};
for(const [id,s]of Object.entries(THIRD87)){
 TRUE_NAME[id]=s.name;TRUE_FORM_HP_MULT[id]=s.hp;TRUE_FORM_ATK_MULT[id]=s.atk;TRUE_FORM_BONUS[id]={};
 if(typeof THIRD87_ATLASES!=='undefined'&&THIRD87_ATLASES[id]){NEW_ATLASES[id].true=THIRD87_ATLASES[id];PROFILE_ART_TRUE[id]='assets/third-form-87-motion/'+id+'-profile.png?v=1';}
}
// Aquamarine is registered after catfruit.js, which filters saved ownership.
try{const saved=JSON.parse(localStorage.getItem('red-battle-trueform-v1')||'[]');if(Array.isArray(saved))for(const id of saved)if(THIRD87[id]&&!trueForms.includes(id))trueForms.push(id);}catch{}
// The old blue-uber wrapper blocked all true forms. Allow only these released forms.
{const before=hasTrueForm;hasTrueForm=function(id){if(!THIRD87[id])return before(id);return (typeof ALLY_FORM_CHOICE==='undefined'||ALLY_FORM_CHOICE[id]!==2)&&trueFormAssetReady(id)&&trueFormOpen(id)&&trueForms.includes(id);};}
{const before=canTrueForm;canTrueForm=function(id){
 if(!THIRD87[id])return before(id);
 if(!trueFormAssetReady(id)||!trueFormOpen(id)||trueForms.includes(id)||!allyUnlocked(id)||data.units[id].noEvolve||(training.levels[id]||1)<LV_MAX)return false;
 const c=trueFormCost(id),col=fruitColorOf(id);return (catfruit.fruit[col]||0)>=c.fruit&&(catfruit.seed[col]||0)>=c.seed&&catfruit.epic>=c.epic&&training.xp>=c.xp;
};}
{const before=unitStats;unitStats=function(id,...args){
 const s=before(id,...args);if(!s.trueForm||!THIRD87[id])return s;s.third87=id;
 if(id==='aquamarine'){
  s.immune={...s.immune,poison:true};s.blowChance=.6;s.interval*=.8;
  // Existing push already includes traitless enemies; do not restrict other traits.
 }
 if(id==='cobalt'){s.cost=Math.round(s.cost*.9);s.immune={...s.immune,weaken:true};}
 if(id==='brown'){
  s.interval=1;s.area=true;s.attackClass='전방위';s.blindSpot=false;
  // Explicit post-balance distances: Battle Cats -100 through +100.
  s.range=100*.034;s.engageRange=s.range;s.zoneMin=0;s.zoneMax=s.range;s.backRange=s.range;
  s.resistVs=[...new Set([...(s.resistVs||[]),'floating'])];
 }
 if(id==='brick'){s.immune={...s.immune,curse:true};s.resistVs=[...new Set([...(s.resistVs||[]),'ancient'])];}
 return s;
};}
// The engine owns displacement and bounce physics. Only reaction poses are sampled.
{const before=animateAtlas;animateAtlas=function(u){
 if(!THIRD87[u.type]||!u.stats?.trueForm||!NEW_ATLASES[u.type]?.true)return before(u);
 const base=NEW_ATLASES[u.type],a=base.true,walk=a.walk,step=a.walkStep,hurt=a.hurt,old=base.evolved,stationary=u.third87X===u.x;
 u.third87X=u.x;
 try{
  base.evolved=a;
  if(u.hurtTime>0){if(u.third87Mode!=='hurt')u.third87HurtDuration=u.hurtTime;const progress=Math.max(0,Math.min(.999,1-u.hurtTime/(u.third87HurtDuration||.8)));a.hurt=[hurt[Math.min(hurt.length-1,Math.floor(progress*hurt.length))]];u.third87Mode='hurt';}
  else{u.third87Mode=u.attackTime>0?'attack':stationary?'idle':'walk';if(u.third87Mode==='idle'){a.walk=a.idle;a.walkStep=a.idleStep;}}
  return before(u);
 }finally{base.evolved=old;a.walk=walk;a.walkStep=step;a.hurt=hurt;}
};}
{const before=codexTraitBadges;codexTraitBadges=function(s,...args){const b=before(s,...args);if(s.third87&&s.immune?.poison&&!b.some(x=>x.includes('독 무효')))b.push('독 무효');if(s.third87&&s.immune?.curse&&!b.some(x=>x.includes('저주 무효')))b.push('고대의 저주 무효');return b;};}
{const before=renderTraining;renderTraining=function(){
 before.apply(this,arguments);
 for(const card of $('#trainingGrid').children){
  const id=card.dataset.type,spec=THIRD87[id];if(!spec)continue;
  if((!trueForms.includes(id)||!trueFormAssetReady(id))&&!card.querySelector('.true-btn')){
   const button=document.createElement('button');button.className='true-btn';button.disabled=!canTrueForm(id);button.title=costText(id);
   button.textContent=!trueFormAssetReady(id)?'3진 · 곧 출시 예정':!trueFormOpen(id)?'3진: 세계편 3장 달 클리어 필요':(training.levels[id]||1)<LV_MAX?'3진: Lv.'+LV_MAX+' 필요':'3진 진화 · '+costText(id);button.onclick=()=>evolveTrueForm(id);card.append(button);
  }
  const stats=unitStats(id);if(!stats.trueForm)continue;const p=card.querySelector('.profile-copy');if(p)p.innerHTML='<strong>'+spec.role+'</strong><br>'+spec.text+'<br>'+codexTraitBadges(stats,true).join(' · ');
 }
};}
renderTraining();renderNewButtons();renderDeckButtons();
