// 엔진 보강 시험: ① 타격별 능력(hits[].abilities) — 신님(진심)의 3연타 중 1·2타에만 날려버림·둔화, 3타는 순수 피해
// ② 전방위 원거리(backRange) — 뒤에 있는 아군도 맞는다 ③ 능력이 없는 hits(기존 캐릭터)는 그대로
const fs=require('fs'),assert=require('assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..');
const make=require('./full-harness.cjs');
const add=fs.readFileSync(path.join(root,'cosmos2-enemies.js'),'utf8');
const hookCode=`
globalThis.__sh={log:[],pushes:[]};
{const d0=damage;damage=function(v,a,f){const r=d0.apply(this,arguments);globalThis.__sh.log.push({t:+game.elapsed.toFixed(2),to:v.type,amount:Math.round(a),from:f&&f.type});return r};
 const h0=startHitback;startHitback=function(v,dist,kind){globalThis.__sh.pushes.push({t:+game.elapsed.toFixed(2),to:v.type,kind});return h0.apply(this,arguments)};}
`;
const e=make({extraSetup:add+hookCode});
const S=globalThis.__sh;
e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=1e9;g.spawnRules=[];
e.addUnit('kamisamaserious');const boss=g.units.find(u=>!u.ally&&u.type==='kamisamaserious');assert(boss,'보스 출격');
boss.stats.speed=0;boss.emerging=false;boss.x=50;
e.addUnit('red');e.addUnit('orange');
const [front,back]=g.units.filter(u=>u.ally);front.type='red';
for(const u of g.units.filter(u=>u.ally)){u.hp=u.max=1e9;u.stats.speed=0;u.emerging=false;u.atkCd=1e9;u.stats.atk=0}
front.x=54;back.x=34;// 앞(사거리 안)·뒤(전방위 34 안)
let slowAfter=[];
const dt=1/30;for(let i=0;i<30*14;i++){e.update(dt);if([3.1,5.1,10.1].some(x=>Math.abs(g.elapsed-x)<dt/2+1e-9))slowAfter.push({t:+g.elapsed.toFixed(1),slow:front.slowUntil>g.elapsed})}
const hits=S.log.filter(x=>x.from==='kamisamaserious'&&(x.to==='red'||x.to==='orange'));
// ① 세 번의 타격: 999 · 999 · 65,998~65,999
const front3=hits.filter(x=>x.to==='red');assert.equal(front3.length,3,'앞 아군 3타 '+JSON.stringify(front3));
assert(front3.every((h,i)=>Math.abs(h.t-[3,5,10][i])<=.1),'타격 시각 3·5·10초');
assert(Math.abs(front3[0].amount-999)<=2&&Math.abs(front3[1].amount-999)<=2&&Math.abs(front3[2].amount-65999)<=3,'타격 피해 '+front3.map(x=>x.amount));
// ① 날려버림·둔화는 1·2타에만
const pushes=S.pushes.filter(x=>x.to==='red'&&x.kind==='push');
assert(pushes.some(p=>Math.abs(p.t-3)<=.1)&&pushes.some(p=>Math.abs(p.t-5)<=.1),'1·2타 날려버림 '+JSON.stringify(S.pushes.filter(x=>x.to==='red')));
assert(!pushes.some(p=>Math.abs(p.t-10)<=.1),'3타에는 날려버림 없음');
assert.deepEqual(slowAfter.map(x=>x.slow),[true,true,false],'둔화는 1·2타 뒤에만 '+JSON.stringify(slowAfter));
// ② 전방위: 뒤 아군도 3번 맞는다
const back3=hits.filter(x=>x.to==='orange');assert.equal(back3.length,3,'뒤 아군 3타 '+back3.length);
// 능력이 타격 뒤에 남지 않는다
assert.equal(boss.stats.blowChance,undefined);assert.equal(boss.stats.slowChance,undefined);assert.equal(boss.stats.atk,67997);
assert(!boss.currentHit,'currentHit 정리');
console.log('PASS: 신님(진심) 3연타 999·999·65,999(3·5·10초), 1·2타만 날려버림, 능력치 복원, 뒤쪽 아군까지 전방위 타격');
process.exit(0);
