// 7.1.2 보스 스테이지의 성: 피해가 남은 체력보다 커도 보스가 아직 소환되지 않았으면 체력 1만 남기고 보스를 바로 소환한다. 보스가 나온 뒤에는 성이 평소처럼 무너진다.
const assert=require('assert/strict');
const make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__g={STAGES,SP:STAGE_SPAWNS,base:()=>data.bases.enemy,sel:i=>{selectedStage=i},deck:d=>{deck=d},setCleared:l=>{cleared.length=0;cleared.push(...l)},CY:CYCLONE_EVENTS};`});
const g0=globalThis.__g;delete globalThis.__g;
e.setProfile({level:30});g0.setCleared(g0.STAGES.map((_,i)=>i));
// 보스 규칙이 있는 모든 스테이지: 한 방에 성이 무너질 피해 → 체력 1 + 보스 소환 예약 → 한 프레임 뒤 보스 등장 → 이후 성이 무너질 수 있음
const stages=g0.STAGES.map((s,i)=>i).filter(i=>(g0.SP[i]||[]).some(r=>r.boss)&&!g0.STAGES[i].relay73);// 보어 릴레이(주자 5명이 차례로 나옴)는 test-stages-73이 따로 확인
let checked=0,skipped=[];
for(const i of stages){
 g0.sel(i);g0.deck(['red']);e.reset();const g=e.getGame();
 const rules=g0.SP[i];
 if(!g||g.spawnRules.length!==rules.length||g.spawnRules.some((r,k)=>r.type!==rules[k].type)){skipped.push(i);continue}// 잠긴 스테이지는 reset이 그대로 중단돼 이전 판이 남는다
 g.running=true;g.paused=false;g.tutorial=6;g.money=1e9;
 const bossRules=g.spawnRules.filter(r=>r.boss);
 g0.base().hp=0;
 assert.equal(g0.base().hp,1,`${i} ${g0.STAGES[i].name}: 보스 전에는 체력 1에서 멈춤`);
 assert.equal(g.ended,false);
 assert(bossRules.every(r=>r.triggered&&r.clock<=0),`${i}: 보스 소환 예약`);
 for(let f=0;f<6;f++)e.update(1/30);
 assert(bossRules.every(r=>r.spawned>=1),`${i} ${g0.STAGES[i].name}: 보스가 바로 소환됨`);
 const cy=g0.CY.find(x=>x.index===i);
 g0.base().hp=0;
 if(cy)assert.equal(g0.base().hp,1,`${i}: 사이클론은 보스를 쓰러뜨릴 때까지 1에서 멈춤`);
 else assert.equal(g0.base().hp,0,`${i} ${g0.STAGES[i].name}: 보스가 나온 뒤에는 성이 무너질 수 있음`);
 checked++;
}
assert(checked>=300,'확인한 보스 스테이지 수 '+checked+' 건너뜀 '+skipped.join(','));
// 보스가 없는 스테이지는 그대로
const plain=g0.STAGES.map((s,i)=>i).find(i=>!(g0.SP[i]||[]).some(r=>r.boss)&&i<40);
g0.sel(plain);g0.deck(['red']);e.reset();const gp=e.getGame();gp.running=true;g0.base().hp=0;assert.equal(g0.base().hp,0,'보스 없는 스테이지는 그대로');
console.log('PASS: 보스 스테이지 '+checked+'곳(사이클론 6곳 포함) 모두 한 방에 성이 무너질 피해에도 체력 1 + 보스 즉시 소환, 보스가 나온 뒤 성 파괴 가능(사이클론은 보스 처치 후), 보스 없는 스테이지는 그대로'+(skipped.length?' · 건너뜀 '+skipped.length:''));process.exit(0);
