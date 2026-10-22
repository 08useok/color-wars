// 6.9 draft: fill the 37 missing story outbreaks, retaining all existing maps/saves.
const OUTBREAK_NEW_ENEMIES={
 cadaverbear:{name:'캐더버 베어',art:'bear',hp:120000,atk:5000,interval:19/30,speed:5.36,range:12.24,reward:1000,knockbacks:4,area:true,windup:6/30,attackDuration:9/30,burrow:{dist:1125/55,times:1},reviveDelay:12,reviveHp:1},
 zuche:{name:'치킨랄라',art:'duche',hp:17500,atk:17000,interval:26/30,speed:16.08,range:4.08,reward:200,knockbacks:1,area:true,windup:4/30,attackDuration:26/30,hits:[{at:4/30,share:.5},{at:13/30,share:.5}],burrow:{dist:875/55,times:1},reviveDelay:20,reviveHp:1},
 lilzyclone:{name:'꼬마 언데드 사이클론',art:'whitecyclone',hp:333333,atk:333,interval:5/30,speed:7.5,range:3.4,reward:300,knockbacks:1,area:true,windup:1/30,attackDuration:5/30,burrow:{dist:1250/55,times:1},reviveDelay:4,reviveHp:1},
 zapy:{name:'좀비 까르삔초',art:'capy',hp:390000,atk:38000,interval:33/30,speed:8.04,range:10.2,reward:550,knockbacks:2,windup:14/30,attackDuration:31/30,reviveDelay:200/30,reviveHp:.5,warpChance:.15,warpDistance:1000/55,warpDuration:2,waveImmune:true,surgeImmune:true}
};
for(const [id,spec] of Object.entries(OUTBREAK_NEW_ENEMIES)){
 const {name,art,...stats}=spec;data.units[id]={trait:'zombie',reviveCount:1,...stats};UNIT_NAMES[id]=name;
 const base=NEW_ATLASES[art];if(!base)throw Error('Missing zombie reference atlas: '+art);
 NEW_ATLASES[id]={...ZOMBIE_COMPLETION_ATLASES[id]};if(ENEMY_SIZE[art])ENEMY_SIZE[id]=ENEMY_SIZE[art];
 if(!ENEMY_ORDER.includes(id))ENEMY_ORDER.push(id);
}
ENEMY_TEXT.cadaverbear='길게 땅굴을 파고들어 빠르게 범위 공격하는 좀비 곰. 쓰러진 뒤 12초 후 체력 100%로 한 번 부활한다.';
ENEMY_TEXT.zuche='두 번 연속 공격하는 좀비 닭. 한 번 땅굴을 파며, 쓰러진 뒤 20초 후 체력 100%로 한 번 부활한다.';
ENEMY_TEXT.lilzyclone='땅굴을 파고 전선 뒤로 파고드는 꼬마 좀비 사이클론. 빠른 범위 공격을 하며 4초 후 체력 100%로 한 번 부활한다.';
ENEMY_TEXT.zapy='단일 공격으로 15% 확률로 아군을 2초간 워프시키는 좀비 까르삔초. 파동·열파 피해를 받지 않으며 한 번 부활한다.';
const OUTBREAK_COMPLETION=new Map();
for(const entry of ZOMBIE_COMPLETION_DATA){
 const all=STAGES.map((s,i)=>i).filter(i=>chapterOf(i)===entry.chapter&&isStoryStage(i)),i=all[entry.order-1];
 if(i===undefined||STAGES[i].name!==entry.name)throw Error('Outbreak stage identity mismatch '+entry.name);
 OUTBREAK_COMPLETION.set(i,entry);
}
const outbreakRulesBefore=zombieRulesOf;
zombieRulesOf=function(i){return OUTBREAK_COMPLETION.get(i)?.rules.map(r=>({...r,at:{...r.at},...(r.delay?{delay:[...r.delay]}:{})}))||outbreakRulesBefore(i)};
const outbreakHpBefore=zombieCastleHp;
zombieCastleHp=function(i){return OUTBREAK_COMPLETION.get(i)?.hp??outbreakHpBefore(i)};
const outbreakStartBefore=startOutbreak;
startOutbreak=function(i){
 outbreakStartBefore(i);if(selectedStage!==ZOMBIE_SLOT||STAGES[ZOMBIE_SLOT].zombieOf!==i)return;
 const entry=OUTBREAK_COMPLETION.get(i),slot=STAGES[ZOMBIE_SLOT];
 if(entry){slot.maxEnemies=entry.max;slot.allyLimit=entry.limit;slot.desc=[...new Set(entry.rules.map(r=>UNIT_NAMES[r.type]))].join(' · ');}
 else{delete slot.allyLimit;slot.desc='좀비 침공 스테이지';}
};
const deployFullBeforeOutbreak=allyDeployFull;
allyDeployFull=function(){const limit=STAGES[selectedStage]?.allyLimit;const hidden=(game?.warped||[]).filter(u=>u.ally&&u.hp>0).length;return limit?allyDeployCount()+hidden>=limit:deployFullBeforeOutbreak()||allyDeployCount()+hidden>=ALLY_DEPLOY_LIMIT};
// The legacy area attack path ignores hit shares. Apply them only to the new Zuche.
const outbreakResolveBefore=resolveAttack;
resolveAttack=function(u,t,share=1){if(u.type!=='zuche'||!u.stats?.area||share===1)return outbreakResolveBefore.apply(this,arguments);const atk=u.stats.atk;try{u.stats.atk=atk*share;return outbreakResolveBefore.call(this,u,t,1)}finally{u.stats.atk=atk}};
const outbreakDamageBefore=damage;
damage=function(v,amount,from){
 if(v?.warpLeft>0)return;
 if(v?.type==='zapy'&&((game.inWave&&v.stats.waveImmune)||(game.inSurge&&v.stats.surgeImmune)))return;
 const before=v?.hp,result=outbreakDamageBefore.apply(this,arguments);
 if(from?.type==='zapy'&&v?.ally&&v.hp>0&&v.hp<before&&!v.stats?.immune?.warp&&!v.warpLeft&&Math.random()<from.stats.warpChance){
  v.warpLeft=from.stats.warpDuration;v.warpEnd=Math.min(98,v.x+from.stats.warpDistance);v.attackTime=0;v.pendingAttack=null;v.atkCd=0;
  v.el.style.visibility='hidden';game.units=game.units.filter(u=>u!==v);(game.warped??=[]).push(v);
 }
 return result;
};
const outbreakAttackBefore=attack;
attack=function(u){if(u.warpLeft>0)return;return outbreakAttackBefore.apply(this,arguments)};
const outbreakBadgesBefore=codexTraitBadges;
codexTraitBadges=function(d){const b=outbreakBadgesBefore.apply(this,arguments);if(d.warpChance)b.push(Math.round(d.warpChance*100)+'% 워프 · '+d.warpDuration+'초');return b};
const outbreakUpdateBefore=update;
update=function(dt){
 const moving=game?.running&&!game.paused&&!game.ended,warped=moving?[...(game.warped||[])]:[];
 outbreakUpdateBefore.apply(this,arguments);
 for(const u of warped){u.warpLeft=Math.max(0,u.warpLeft-dt);if(u.warpLeft===0&&u.hp>0){u.x=u.warpEnd;u.el.style.visibility='';u.el.style.left=`calc(${u.x}% - 21px)`;game.warped=game.warped.filter(v=>v!==u);if(!game.units.includes(u))game.units.push(u);}}
};
