// 우주편 2장 등록 시험: 스테이지 위치(맨 끝)·잠금·억제기·배율·출현표·실제 전투를 확인한다.
const assert=require('assert/strict');
const make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__c2={isUnlocked,isChainEnd,isStoryStage,chapterOf,alienMagnification,alienSuppressed,alienSuppressorsOf,get S(){return COSMOS2_START},get E(){return COSMOS2_END},COSMOS_END,STAGE_SPAWNS,codexCatOf,chapterTag,stageEnemies,stageXP,FUTURE_XP_SCALE,UNIT_NAMES,data,setCleared:l=>{cleared.length=0;cleared.push(...l)},setStage:i=>{selectedStage=i},mask:cosmos2MaskComplete,unitStats};`});
const t=globalThis.__c2;delete globalThis.__c2;
const S=t.S,E=t.E,list=e.stageList;
assert.equal(E-S,48);assert(list.length>=E+2,'우주편 2장 뒤에 스테이지가 더 붙는다(7.1 이후 사이클론·레전드 41~49장 등)');assert.equal(list[E].cyclone,'metal','2장 바로 뒤 첫 스테이지는 7.1 메탈 사이클론');assert.equal(list[E+1].cyclone,'cosmic');
assert(list.slice(S,E).every(s=>s.chapter===9&&s.future),'chapter 9');
// 잠금: 1장 빅뱅을 깨야 열리고, 이후는 차례로
t.setCleared([]);assert(!t.isUnlocked(S));
t.setCleared([t.COSMOS_END-1]);assert(t.isUnlocked(S)&&!t.isUnlocked(S+1));
t.setCleared([t.COSMOS_END-1,S]);assert(t.isUnlocked(S+1));
assert(t.isChainEnd(E-1)&&t.isStoryStage(S)&&t.isStoryStage(E-1)&&!t.isChainEnd(S));
assert.equal(t.codexCatOf(S),'c2');assert(t.chapterTag(S).includes('우주편 2장'));
// 억제기: 24번·48번, 별 에이리언 배율 16 → 15 → 11(둘 다 깨면 −5)
assert.deepEqual(t.alienSuppressorsOf(9),[S+23,E-1]);
t.setCleared([]);assert.equal(t.alienMagnification(9,true),16);
t.setCleared([S+23]);assert.equal(t.alienMagnification(9,true),15);
t.setCleared([S+23,E-1]);assert.equal(t.alienMagnification(9,true),11);
t.setCleared([]);
// 신님 가면(2장): 43·45·47번째를 깨기 전에는 신님(진심)이 11배, 깨면 보통
// 신님 가면(2장): 43·45·47번째를 깨기 전에는 신님(진심)이 11배, 깨면 보통
t.setStage(E-1);t.setCleared([]);assert(!t.mask());assert.equal(t.unitStats('kamisamaserious').atk,67997*11);assert.equal(t.unitStats('kamisamaserious').hp,1499999*11);
t.setCleared([S+42,S+44,S+46]);assert(t.mask());assert.equal(t.unitStats('kamisamaserious').atk,67997);
t.setCleared([S+42,S+44]);assert(!t.mask());t.setCleared([E-1]);assert(t.mask());
t.setStage(0);t.setCleared([]);assert.equal(t.unitStats('kamisamaserious').atk,67997,'우주편 2장 밖에서는 그대로');
t.setCleared([]);
// 출현표·보상
assert(t.STAGE_SPAWNS[S].some(r=>r.type==='ultrabaabaa'&&r.boss),'지구 보스');
assert(t.stageEnemies(E-1).includes('kamisamaserious'),'빅뱅 신님(진심)');
assert.equal(t.stageXP(S),1000*t.FUTURE_XP_SCALE);
for(let i=S;i<E;i++)for(const r of t.STAGE_SPAWNS[i])assert(t.data.units[r.type],'적 id '+r.type+' @'+(i-S+1));
// 실제 전투: 강한 덱으로 몇 곳을 돌려 끝까지 도는지(승패는 인증 아님)
e.setProfile({level:30});e.setCleared(list.map((_,i)=>i).filter(i=>i<S));
const deck=['prism','amber','night','sapphire','aquamarine','rainbow','emerald','spring','red','yellow'];
const out=[];for(const k of [1,10,17,24,48]){const r=e.simulate(S+k-1,1,deck,1,420,'auto');out.push(`${k}번 ${r.win?'승 '+r.seconds+'초':r.timeout?'시간초과(적 성 '+Math.round(r.enemyHp)+')':'패'}`)}
console.log('PASS: 우주편 2장 등록(맨 끝 위치·잠금·억제기·배율·출현표 적 id) 확인 ·',out.join(' · '));
process.exit(0);
