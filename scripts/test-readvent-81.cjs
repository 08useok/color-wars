// 8.1 사이클론 재강림 시험(readvent-81.js): 기존 898맵 불변, 맨 끝 8맵, ①=기본 구성·레어/EX 제한·경험치, ②=배율 ×1.5·3진 권한 번호,
// 열림 순서(기본 강림 → ① → ②), 사이클론 보스 규칙(CYCLONE_EVENTS 등록), 강한 덱으로 한 번씩 돌려 결과를 적는다(난이도 보고용, 실패해도 통과).
const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const src=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(src.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
assert(addons.includes('readvent-81.js'));
assert.deepEqual(addons.slice(-3),['true-legend.js','readvent-81.js','progress-ready.js'],'재강림은 신레전드 뒤, progress-ready 앞');
const html=fs.readFileSync('red-battle-doge.html','utf8'),order=[...html.matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]);
assert(order.indexOf('true-legend.js')<order.indexOf('readvent-81.js')&&order.indexOf('readvent-81.js')<order.indexOf('progress-ready.js'),'html 순서');
const prev=make({addons:addons.filter(f=>f!=='readvent-81.js')});
const e=make({extraSetup:`globalThis.__r={ev:READVENT_EVENTS,gate:READVENT_THIRD_GATE,S:READVENT_START,E:READVENT_END,open:cycloneStageOpen,allowed:allyStageAllowed,clears:cycloneClears,done:readventCleared,cyc:CYCLONE_EVENTS,grade:gradeOf}`}),x=globalThis.__r;delete globalThis.__r;
const n=prev.stageList.length;
assert.equal(e.stageList.length,n+8);assert.equal(x.S,n);assert.equal(x.E,n+8);
assert.deepEqual(e.stageList.slice(0,n),prev.stageList);
for(let i=0;i<n;i++)assert.deepEqual(e.spawnList[i],prev.spawnList[i],'spawn '+i);
for(const [id,v]of Object.entries(prev.units))assert.deepEqual(e.units[id],v,'unit '+id);
const PLAN=[['hurricane','spintoprainbow'],['metal','hulasilver'],['angel','rhythmpink'],['cosmic','drumscarlet']];
assert.equal(x.ev.length,8);
for(const [k,[baseId,ally]] of PLAN.entries()){
 const base=x.cyc.find(c=>c.id===baseId),a=x.ev[2*k],b=x.ev[2*k+1];
 assert.equal(a.index,n+2*k);assert.equal(b.index,n+2*k+1);assert.equal(x.gate[ally],b.index);
 for(const ev of [a,b]){const s=e.stageList[ev.index];assert.equal(s.cyclone,ev.id);assert.equal(s.chapter,'special');assert.equal(s.hp,base.hp);assert.equal(ev.boss,base.boss);assert(x.cyc.includes(ev),'사이클론 보스 규칙')}
 const baseRules=e.spawnList[base.index];
 assert.deepEqual(e.spawnList[a.index],baseRules,'① 기본 구성');
 assert.deepEqual(e.spawnList[b.index].map(r=>r.mag),baseRules.map(r=>Math.round((r.mag||100)*1.5)),'② ×1.5');
 assert(e.spawnList[b.index].some(r=>r.boss&&r.type===base.boss));
 assert.equal(e.stageList[a.index].special.xp,19000);assert(!e.stageList[b.index].special,'② 드랍·경험치 보너스 없음');
 // 열림
 x.clears.length=0;assert(!x.open(a));assert(!x.open(b));
 x.clears.push(baseId);assert(x.open(a));assert(!x.open(b));
 x.clears.push(a.id);assert(x.open(b));assert(!x.done(ally));x.clears.push(b.id);assert(x.done(ally));
 // 출격 제한
 const rare=e.roster.find(t=>x.grade(t)==='rare'),basic=e.roster.find(t=>x.grade(t)==='basic'||x.grade(t)==='normal')||'red';
 assert(x.allowed(rare,a.index));assert(!x.allowed(basic,a.index));assert(x.allowed(basic,b.index));assert(x.allowed(basic,base.index));
}
x.clears.length=0;
// 난이도 보고(강한 덱, Lv30, 300초). ①은 레어·EX만 나갈 수 있어 엔진이 자동으로 거른다.
e.setProfile({level:30,trueFormsAll:true,maxIncome:true});x.clears.push(...x.cyc.map(c=>c.id));// 잠긴 강림은 reset()이 막으므로 모두 연다
const deck=['red','yellow','blue','purple','heliotrope','wisteria','blossom','almondblossom','lightrainbow','raspberry'];
const rareDeck=e.roster.filter(t=>['rare','ex'].includes(x.grade(t))).slice(0,10);
const rows=x.ev.map(ev=>{const r=e.simulate(ev.index,1,ev.readvent===1?rareDeck:deck,1,300,'smart2');return [e.stageList[ev.index].name,r.win?'승 '+r.seconds+'초':r.timeout?'시간 초과':'패배']});
x.clears.length=0;
for(const r of rows)console.log('  '+r.join(' · '));
console.log('PASS: 8.1 재강림 8맵 — 기존 '+n+'맵 불변, ① 기본 구성·레어/EX·경험치 19,000, ② 배율 ×1.5·3진 권한 번호 '+JSON.stringify(x.gate)+', 열림 순서');
process.exit(0);
