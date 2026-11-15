// Replace the legacy "ordinary stage with zombie substitutions" schedules.
// Stage indices, original story stages, localStorage keys and clear IDs stay fixed.
const ZOMBIE_OUTBREAK_ORIGINAL=new Map();
for(const entry of ZOMBIE_OUTBREAK_ORIGINAL_DATA){
 const list=STAGES.map((s,i)=>i).filter(i=>chapterOf(i)===entry.chapter&&isStoryStage(i)),i=list[entry.order-1];
 if(list.length!==48||i===undefined||STAGES[i].name!==entry.name)throw Error('Original outbreak identity mismatch '+entry.chapter+':'+entry.order);
 for(const r of entry.rules)if(!data.units[r.type])throw Error('Unknown outbreak enemy '+r.type);
 ZOMBIE_OUTBREAK_ORIGINAL.set(i,entry);
}
{const before=zombieRulesOf;zombieRulesOf=function(i){const s=ZOMBIE_OUTBREAK_ORIGINAL.get(i);return s?s.rules.map(r=>({...r,at:{...r.at},...(r.delay?{delay:[...r.delay]}:{})})):before(i);};}
{const before=zombieCastleHp;zombieCastleHp=function(i){return ZOMBIE_OUTBREAK_ORIGINAL.get(i)?.hp??before(i);};}
{const before=startOutbreak;startOutbreak=function(i){
 before(i);const s=ZOMBIE_OUTBREAK_ORIGINAL.get(i),slot=STAGES[ZOMBIE_SLOT];
 if(!s||selectedStage!==ZOMBIE_SLOT||slot.zombieOf!==i)return;
 slot.maxEnemies=s.max;slot.allyLimit=s.limit;slot.originalWidth=s.width;slot.outbreakSource=s.source;
 slot.desc='원작 좀비 습격 편성 · '+[...new Set(s.rules.map(r=>UNIT_NAMES[r.type]))].join(' · ');
};}
// The old tooltip claimed every enemy was merely a recoloured replacement.
{const before=renderStageMenu;renderStageMenu=function(){
 const result=before.apply(this,arguments);
 const indices=STAGES.map((_,i)=>i).filter(i=>chapterOf(i)===stageChapterView);
 const cards=[...$('#stageGrid').children];if(cards.length!==indices.length)return result;
 cards.forEach((card,k)=>{const i=indices[k],s=ZOMBIE_OUTBREAK_ORIGINAL.get(i),chip=card.querySelector('.zombie-chip');if(!s||!chip)return;
  chip.title=zombieAvailable(i)?'원작 좀비 습격 편성 · 적 상한 '+s.max+' · 출격 상한 '+s.limit+(zombieSave.clear.includes(i)?' · 클리어함':' · 첫 클리어 XP·Z 메달'):'이 장의 일반 최종 스테이지와 나머지 좀비 습격을 먼저 클리어하세요';
 });return result;
};}
// Enemy encyclopedia lookup must use the corrected schedules too.
zombieCodexIndex=null;
renderStageMenu();
