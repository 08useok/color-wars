// Append-only, reward-free arenas. No progression, account, or existing stage edits.
const TIER_ARENA_VERSION=1;
const TIER_ARENA_GROUPS=[
 {id:'general',name:'범용',types:['kangaroo','bear','leboin'],mags:[1800,900,350]},
 {id:'red',name:'빨간 적',types:['stpigge','shyboy','bore'],mags:[250,350,110]},
 {id:'black',name:'검은 적',types:['gorydark','shadowboxer','bunbunblack'],mags:[700,350,65]},
 {id:'angel',name:'천사',types:['mrangel','gonzales','sleipnir'],mags:[700,130,150]},
 {id:'alien',name:'에이리언',types:['sael','ursamajor','nimoy'],mags:[400,160,120]},
 {id:'floating',name:'떠 있는 적',types:['magpie','bunbun','face'],mags:[220,180,1000]},
 {id:'metal',name:'메탈',types:['metalhippo','supermetalhippo','metalseal'],mags:[150,70,75]},
 {id:'zombie',name:'좀비',types:['zomboe','zory','zbore'],mags:[250,200,110]},
 {id:'wave',name:'파동',types:['kangaroo','koala','berserkory'],mags:[1300,150,60]}
];
// Koala's internal id differs between source versions; use the actual wave enemy.
for(const g of TIER_ARENA_GROUPS)if(g.id==='wave'&&!data.units.koala?.wave)g.types[1]='kory';
for(const g of TIER_ARENA_GROUPS){
 for(const type of g.types)if(!data.units[type])throw Error('Tier arena enemy missing: '+type);
 g.index=STAGES.length;STAGES.push({name:'티어 시험 · '+g.name,flag:'🧪',chapter:'special',hp:3000000,maxEnemies:12,gap:4,wave:0,sky:'#c9dce9',land:'#859aaa',tierArena:g.id,
  desc:'보상 없는 비교 전투 · 수입 MAX · 초당 300원 · 시작 3,000원 · 모든 예약 적과 좀비 부활을 끝내야 적 성 파괴 가능'});
 const rule=(slot,t,count,repeat)=>({type:g.types[slot],mag:Math.round(g.mags[slot]*(g.id==='metal'?1.5:3)),at:{t},count,...(repeat?{delay:[repeat,repeat]}:{})});
 STAGE_SPAWNS[g.index]=[rule(0,5,12,5),rule(1,15,5,12),rule(2,25,2,40)];
}
function isTierArena(i=selectedStage){return !!STAGES[i]?.tierArena;}
function tierArenaResolved(){return game.spawnRules.every(r=>r.spawned>=r.count)&&!(game.tierArenaEnemies||[]).some(u=>u.hp>0||u.reviveAt!==undefined);}
{const before=addUnit;addUnit=function(type){const n=game.units.length,r=before.apply(this,arguments);if(isTierArena()&&game.units.length>n){const u=game.units.at(-1);if(!u.ally)(game.tierArenaEnemies||(game.tierArenaEnemies=[])).push(u);}return r;};}
{const before=reset;reset=function(){const r=before.apply(this,arguments);if(isTierArena()){game.level=data.income.length-1;game.money=3000;data.bases.ally.hp=data.bases.ally.max=300000;game.tierArenaFinal=false;}return r;};}
{const before=incomeRate;incomeRate=function(){return isTierArena()?300:before.apply(this,arguments);};}
{const before=walletMax;walletMax=function(){return isTierArena()?18000:before.apply(this,arguments);};}
// Suppressors are fully collected for both normal and starred alien test enemies.
{const before=alienMagnification;alienMagnification=function(){return isTierArena()?1:before.apply(this,arguments);};}
{const before=updateStageSpawns;updateStageSpawns=function(dt){const r=before.apply(this,arguments);if(isTierArena())game.tierArenaFinal=tierArenaResolved();return r;};}
{const base=data.bases.enemy,prop=Object.getOwnPropertyDescriptor(base,'hp');
 Object.defineProperty(base,'hp',{...prop,set(v){if(isTierArena()&&game&&!game.ended&&!game.tierArenaFinal&&v<1)v=1;prop.set.call(base,v);}});
}
{const before=stageXP;stageXP=function(i){return isTierArena(i)?0:before(i);};}
// Deliberately bypass reward/progression finish wrappers for these arenas only.
{const before=finish;finish=function(win){if(!isTierArena())return before.apply(this,arguments);if(game.ended)return;
 game.ended=true;game.running=false;game.won=!!win;highlight();$('#result').classList.remove('hidden');$('#resultTitle').textContent=win?'티어 시험 완료':'티어 시험 패배';$('#resultDetail').textContent=STAGES[selectedStage].name+' · '+game.elapsed.toFixed(2)+'초 · 보상 및 클리어 기록 없음';$('#nextStageBtn').classList.add('hidden');
};}
{const before=renderSpecialStages;renderSpecialStages=function(){before();
 const row=document.createElement('div');row.className='special-row today';const label=document.createElement('div');label.className='special-label';label.innerHTML='<strong>🧪 티어 시험 구역</strong><small>9개 비교 맵 · 보상 없음 · 현재 보유 덱으로 연습</small>';row.append(label);
 for(const g of TIER_ARENA_GROUPS){const b=document.createElement('button');b.className='stage-card';b.innerHTML='<strong>'+g.name+' 시험</strong><small>수입 MAX · 초당 300원 · 보상 없음</small>';b.onclick=()=>{selectedStage=g.index;reset();};row.append(b);}$('#specialGrid').append(row);
};}
renderSpecialStages();
