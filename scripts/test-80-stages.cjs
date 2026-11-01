// 8.0 맵 등록 시험: 우주편 3장 48맵(cosmos3.js) + 신레전드 0~12장 73맵(true-legend.js).
// 기존 스테이지·출현표·적 정의·레전드 키가 그대로인지, 새 맵이 맨 끝에 붙는지, 잠금 순서·억제기·별 배율·보물 3/3·레전드 진행도 복원을 확인한다.
const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const src=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(src.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const LATE=['cosmos3-data.js','cosmos3.js','true-legend.js'];
for(const f of LATE)assert(addons.includes(f),f+' in harness');
assert.deepEqual(addons.filter(f=>f!=='progress-ready.js').slice(-3),LATE,'8.0 맵은 다른 모든 스테이지 모듈 뒤');
const html=fs.readFileSync('red-battle-doge.html','utf8'),order=[...html.matchAll(/<script src="([^"?]+)/g)].map(m=>m[1]);
for(const f of LATE)assert(order.includes(f),f+' in html');
for(const f of ['tier-test-stages.js','enemies-80.js'])assert(order.indexOf(f)<order.indexOf('cosmos3.js'),f+' before cosmos3.js');
assert(order.indexOf('cosmos3.js')<order.indexOf('true-legend.js'));assert(html.includes('id="cosmos3Tab"'));
const prev=make({addons:addons.filter(f=>!LATE.includes(f))});
const setup=`globalThis.__80={S:COSMOS3_START,E:COSMOS3_END,c2e:COSMOS2_END,sup:ALIEN_SUPPRESSORS6,unl:isUnlocked,story:isStoryStage,chain:isChainEnd,mag:alienMagnification,supd:alienSuppressed,tre:cosmosTreasureFinals,tag:chapterTag,codex:codexCatOf,
 prog:legendProgress,open:legendSubOpen,lunl:legendStageUnlocked,crown:legendCrownMult,starR:LEGEND_STAR_RANGES,stars:stageStars,TS:TRUELEGEND_START};`;
const e=make({savedLegend:{1:[323,324,325,396,397,-1],3:[330]},extraSetup:setup}),x=globalThis.__80;delete globalThis.__80;
// 기존 번호·데이터 불변, 맨 끝에 48+73
assert.equal(e.stageList.length,prev.stageList.length+48+73);
assert.deepEqual(e.stageList.slice(0,prev.stageList.length),prev.stageList);
for(const [id,v]of Object.entries(prev.spawnList))assert.deepEqual(e.spawnList[id],v,'spawns '+id);
for(const [id,v]of Object.entries(prev.units))assert.deepEqual(e.units[id],v,'unit '+id);
for(let k=0;k<324;k++)assert.equal(e.legendIdx(k),prev.legendIdx(k),'legend key '+k);
// 우주편 3장
assert.equal(x.S,prev.stageList.length);assert.equal(x.E-x.S,48);assert.equal(x.TS,x.E);
for(let i=x.S;i<x.E;i++){assert.equal(e.stageList[i].chapter,10);assert(x.story(i));assert(e.spawnList[i].length>0);for(const r of e.spawnList[i])assert(e.units[r.type],'enemy '+r.type)}
assert(x.chain(x.E-1));assert.equal(x.tag(x.S),' (우주편 3장)');assert.equal(x.codex(x.S),'c3');
assert.deepEqual(x.sup,[x.S+23,x.E-1]);assert.deepEqual(x.tre(),[x.tre()[0],x.c2e-1,x.E-1]);
// 확정권 보상(gacha.js)은 시험 도구가 불러오지 않아 브라우저에서 확인한다.
e.setCleared([]);assert(!x.unl(x.S));e.setCleared([x.c2e-1]);assert(x.unl(x.S));assert(!x.unl(x.S+1));
assert.equal(x.mag(10,true),16);e.setCleared([x.c2e-1,x.S+23]);assert.equal(x.supd(10),1);assert.equal(x.mag(10,true),15);
e.setCleared([x.c2e-1,x.E-1]);assert.equal(x.supd(10),5);assert.equal(x.mag(10,true),11);
// 신레전드
assert.equal(e.legendSubs.length,49+13);
for(let k=324;k<397;k++){const i=e.legendIdx(k);assert.equal(e.stageList[i].legend.k,k);assert.equal(i,x.TS+k-324);for(const r of e.spawnList[i])assert(e.units[r.type],'enemy '+r.type)}
assert.deepEqual(x.prog[1],[323,324,325,396]);assert.deepEqual(x.prog[3],[330]);// 저장된 신레전드 키 복원, 범위 밖·이상한 값 무시
x.prog[1].length=0;assert(!x.open(49));for(let k=0;k<324;k++)x.prog[1].push(k);assert(x.open(49));assert(x.lunl(324,1));assert(!x.lunl(325,1));assert(!x.open(50));
x.prog[1].push(324);assert(x.open(50));
assert.deepEqual([2,3,4].map(c=>x.crown(c,49)),[1.5,2,1]);assert.deepEqual([2,3,4].map(c=>x.crown(c,59)),[1.4,1.8,1]);
for(let s=49;s<62;s++){const r=x.starR[s];assert(Array.isArray(r)&&r[0]>=1&&r[1]<=12&&r[0]<=r[1],'stars '+s)}
assert(x.stars(e.legendIdx(324))>=6,'신규 적 스테이지 별이 계산됨');
console.log('PASS: 8.0 맵 등록 — 기존 '+prev.stageList.length+'맵·출현표·적·레전드 키 0~323 불변, 우주편 3장 48맵(chapter 10, 2장 빅뱅 다음, 억제기·별 배율·보물 3/3), 신레전드 73맵(키 324~396, 구레전드 ★1 완주 다음, 왕관·별·진행도 복원)');
process.exit(0);
