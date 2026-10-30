// Append-only 7.3 events. Hurricane: battlecats-db s01096-01 / enemy238, original rig236.
CYCLONE_BOSSES.hurricanecyclone={name:'허리케인 사이클론',hp:750000,atk:3666,range:650,speed:4,knockbacks:3,traits:['floating']};
registerCycloneBoss('hurricanecyclone',CYCLONE_BOSSES.hurricanecyclone);
Object.assign(data.units.hurricanecyclone,{range:650*.034,zoneMin:250*.034,zoneMax:650*.034,interval:6/30,attackDuration:6/30,windup:1/30});
NEW_ATLASES.hurricanecyclone=HURRICANE_73_ATLAS;
ENEMY_TEXT.hurricanecyclone='떠 있는 적. 원작 사거리 650, 타격 구간 250~650의 원거리 범위 공격을 0.2초마다 쏟아낸다. 폭풍 안쪽 250 미만은 사각지대이므로 접근해 파고들 수 있다.';
const HURRICANE73_EVENT={id:'hurricane',name:'긴급 폭풍 경보',stage:'진격의 폭풍 소용돌이',boss:'hurricanecyclone',reward:null,chapter:3,hp:900000,max:10,color:'#869aaa',rules:[
 csp('guys',100,10,100,300,150,300),csp('guys',100,5,100,500,250,500),csp('hurricanecyclone',100,1,100,900,0,0,true),
 csp('guys',100,0,100,1500,400,800),csp('strayguy',100,10,100,2000,300,600),csp('strayguy',100,0,100,3000,800,1600),
 csp('darkdog',400,0,100,4000,2000,6000),csp('strayguy',100,0,100,5000,1200,2400),csp('darkdog',400,0,100,6000,3000,6000)
]};
CYCLONE_EVENTS.push(HURRICANE73_EVENT);registerCycloneEvent(HURRICANE73_EVENT);
STAGES[HURRICANE73_EVENT.index].desc='긴급 폭풍 경보 · 허리케인 사이클론 · 클리어 XP · 보스를 쓰러뜨려야 클리어';
try{const saved=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(saved)&&saved.includes('hurricane')&&!cycloneClears.includes('hurricane'))cycloneClears.push('hurricane');}catch{}
const BORE73_RELAY={index:STAGES.length,name:'보어 5종 릴레이',types:['bore','razorback','boraphim','nimoy','zbore'],magnifications:[200,100,100,150,200]};
STAGES.push({name:BORE73_RELAY.name,flag:'🐗',chapter:'special',hp:1200000,maxEnemies:2,gap:4,wave:0,sky:'#d2c7b9',land:'#b5a488',relay73:true,
 desc:'샤이 보어 → 이노와르 → 천사 멧돼지 → 불칸 보어 → 좀비 보어. 앞 보어를 완전히 처치하면 2초 뒤 다음 보어가 등장한다. 다섯 마리를 모두 쓰러뜨려야 성이 무너진다.'});
STAGE_SPAWNS[BORE73_RELAY.index]=BORE73_RELAY.types.map((type,i)=>({type,mag:BORE73_RELAY.magnifications[i],count:1,boss:true,at:{t:10},relay73:i}));
let bore73Cleared=false;try{bore73Cleared=localStorage.getItem('red-battle-bore-relay-v1')==='1';}catch{}
// Core progress loading only keeps story stages. Restore these two confirmed event
// clears for awardXP's replay calculation without granting rewards or writing saves.
for(const [i,done]of [[HURRICANE73_EVENT.index,cycloneClears.includes('hurricane')],[BORE73_RELAY.index,bore73Cleared]])
 if(done&&!cleared.includes(i))cleared.push(i);
function bore73Open(){return cleared.includes(CHAPTER1_LEN*3-1)}
{const before=updateStageSpawns;
 updateStageSpawns=function(dt){
  if(selectedStage!==BORE73_RELAY.index)return before(dt);
  const rules=game.spawnRules,phase=game.relay73Phase||0,current=rules.find(r=>r.relay73===phase);let next=phase;
  if(current?.spawned){
   // The burrow wrapper temporarily removes underground enemies from game.units.
   // Keep the actual current boss reference, including its revive/death state.
   const tracked=game.relay73Boss?.type===current.type?game.relay73Boss:null;
   const alive=tracked&&(tracked.hp>0||tracked.reviveAt!==undefined)||[...game.units,...game.defeated].some(u=>!u.ally&&u.type===current.type&&(u.hp>0||u.reviveAt!==undefined));
   if(!alive){next=phase+1;game.relay73Phase=next;delete game.relay73Boss;const pending=rules.find(r=>r.relay73===next);if(pending){pending.at={t:game.elapsed+2};$('#battleNotice').textContent='다음 주자: '+UNIT_NAMES[pending.type];game.noticeTime=2;}else game.relay73Done=true;}
  }
  try{game.spawnRules=rules.filter(r=>r.relay73<=next);return before(dt)}finally{
   game.spawnRules=rules;
   const type=rules.find(r=>r.relay73===next)?.type,boss=game.units.find(u=>!u.ally&&u.type===type&&(u.hp>0||u.reviveAt!==undefined));
   if(boss)game.relay73Boss=boss;
  }
 };
}
// Keep the castle intact until all five bosses, including a reviving zombie, are gone.
{const base=data.bases.enemy,prop=Object.getOwnPropertyDescriptor(base,'hp');
 Object.defineProperty(base,'hp',{...prop,set(v){if(selectedStage===BORE73_RELAY.index&&game&&!game.ended&&!game.relay73Done&&v<1)v=1;prop.set.call(base,v);}});
}
{const before=stageXP;stageXP=function(i){return i===HURRICANE73_EVENT.index?3800:i===BORE73_RELAY.index?6000:before(i)};}
{const before=reset;reset=function(){if(selectedStage===BORE73_RELAY.index&&!bore73Open()){openStages();return;}return before.apply(this,arguments)};}
{const before=finish;finish=function(win){const fresh=!game.ended,relay=selectedStage===BORE73_RELAY.index;before(win);if(fresh&&win&&relay){bore73Cleared=true;try{localStorage.setItem('red-battle-bore-relay-v1','1')}catch{}renderSpecialStages();}if(relay||selectedStage===HURRICANE73_EVENT.index)$('#nextStageBtn').classList.add('hidden');};}
{const before=isStageCleared;isStageCleared=function(i){return i===BORE73_RELAY.index?bore73Cleared:before(i)};}
{const before=renderSpecialStages;
 renderSpecialStages=function(){before();
  const row=document.createElement('div');row.className='special-row today';row.dataset.relay73='bore';const label=document.createElement('div');label.className='special-label';label.innerHTML='<b class="day">매일</b><strong>🐗 보어 릴레이 배틀</strong><small>5종을 한 마리씩 연속 처치</small>';row.append(label);
  const b=document.createElement('button');b.className='stage-card';b.disabled=!bore73Open();b.innerHTML='<strong>'+BORE73_RELAY.name+'</strong><small>'+(!bore73Open()?'세계편 3장 클리어 필요':bore73Cleared?'클리어 완료 ✓':'클리어 XP · 부활까지 끝내야 다음 주자')+'</small>';b.onclick=()=>{selectedStage=BORE73_RELAY.index;reset()};row.append(b);$('#specialGrid').append(row);
 };
}
renderSpecialStages();
