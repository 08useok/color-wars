// 7.1 사이클론 강림 2종 시험: 스테이지 위치(맨 끝)·해금·출현표·보스·보상 아군·실제 전투
const assert=require('assert/strict');
const make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__c={EV:CYCLONE_EVENTS,open:e=>cycloneStageOpen(e),S:()=>COSMOS2_END,STAGE_SPAWNS,data,UNIT_NAMES,ALLIES,ENEMY_TEXT,NEW_ATLASES,CA:CYCLONE_ALLIES,allyUnlocked,gachaOwns,give:giveSpecialItem,drop:specialDropOpen,setCleared:l=>{cleared.length=0;cleared.push(...l)},MAIN:MAIN_STAGE_COUNT,F3:FUTURE3_END,acq:ACQUIRE_TEXT,traitsOf,gacha};`});
const c=globalThis.__c;delete globalThis.__c;
const list=e.stageList;
const metal=c.EV.find(x=>x.id==='metal'),cosmic=c.EV.find(x=>x.id==='cosmic');
assert(metal&&cosmic,'이벤트');assert.equal(c.EV.length,6);
assert(metal.index>=c.S()&&cosmic.index===metal.index+1&&list.length===cosmic.index+1,'강림은 스테이지 목록 맨 끝, 우주편 2장 뒤');
assert.equal(list[metal.index].hp,400000);assert.equal(list[metal.index].maxEnemies,2);assert.equal(list[cosmic.index].hp,999000);assert.equal(list[cosmic.index].maxEnemies,8);
// 해금: 메탈 = 세계편 3장 달, 에이리언 = 미래편 3장 달
c.setCleared([]);assert(!c.open(metal)&&!c.open(cosmic));
c.setCleared([c.MAIN-1]);assert(c.open(metal)&&!c.open(cosmic));
c.setCleared([c.F3-1]);assert(!c.open(metal)&&c.open(cosmic));
// 보스
const m=c.data.units.metalcyclone,k=c.data.units.cosmiccyclone;
assert.equal(m.hp,777777);assert.equal(m.atk,77000);assert.deepEqual(m.traits,['metal']);assert.equal(m.knockbacks,10);assert.equal(m.reward,3000);
assert.equal(k.hp,1499999);assert.equal(k.atk,9999);assert.deepEqual(k.traits,['alien','floating']);assert.equal(k.reward,999);
assert.equal(k.atkDownChance,.1);assert.equal(k.atkDownPct,.9);assert.deepEqual(k.strengthen,{at:.3,mult:2});
assert(c.UNIT_NAMES.metalcyclone&&c.UNIT_NAMES.cosmiccyclone&&c.ENEMY_TEXT.metalcyclone&&c.NEW_ATLASES.metalcyclone.walk.length&&c.NEW_ATLASES.cosmiccyclone.walk.length,'이름·문구·모션');
// 출현표
for(const ev of [metal,cosmic]){const r=c.STAGE_SPAWNS[ev.index];assert(r.length>=6);for(const x of r)assert(c.data.units[x.type],'적 id '+x.type);assert.equal(r.filter(x=>x.boss).length,1)}
assert(c.STAGE_SPAWNS[metal.index].some(x=>x.type==='metalcyclone'&&x.boss&&x.at.hp===90));
assert(c.STAGE_SPAWNS[cosmic.index].some(x=>x.type==='cosmiccyclone'&&x.boss&&Math.abs(x.at.t-33.33)<.01));
// 보상 아군 등록(실제 획득·해금은 시험 도구에 뽑기 코드가 없어 브라우저 시험에서 본다)
for(const id of ['hulasilver','drumscarlet']){assert(c.data.units[id]&&c.UNIT_NAMES[id]&&c.ALLIES.includes(id)&&c.acq[id],id);assert(c.CA[id].evolved&&c.CA[id].role)}
assert.deepEqual(c.data.units.hulasilver.statusVs,['metal']);assert.equal(c.data.units.hulasilver.freezeChance,.6);
assert.equal(c.data.units.drumscarlet.atkDownPct,.5);
// 실제 전투
e.setProfile({level:30});e.setCleared(list.map((_,i)=>i).filter(i=>i<c.S()));
const deck=['prism','amber','night','sapphire','aquamarine','rainbow','emerald','spring','red','yellow'];
const out=[];for(const ev of [metal,cosmic]){const r=e.simulate(ev.index,1,deck,1,420,'auto');out.push(`${ev.stage} ${r.win?'승 '+r.seconds+'초':r.timeout?'시간초과':'패'}`)}
console.log('PASS: 7.1 사이클론 2종(맨 끝 위치·해금·보스·출현표·보상 아군) ·',out.join(' · '));
process.exit(0);
