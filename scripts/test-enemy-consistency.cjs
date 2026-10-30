// 적 점검(2026-10-30) 후속 시험: 원작 워프 5종이 실제 워프인지, 좀비 침공 적이 도감에 있는지, 설명과 능력이 맞는지.
// 사용: node scripts/test-enemy-consistency.cjs
const assert=require('assert/strict');
const e=require('./full-harness.cjs')({extraSetup:`globalThis.__t={U:data.units,N:UNIT_NAMES,T:ENEMY_TEXT,O:ENEMY_ORDER,zs:zombieStagesOf,zr:zombieRulesOf,Z:ZOMBIE_CHAPTERS,save:zombieSave,seen:t=>enemySeen(t),setStage:i=>selectedStage=i};`});
const t=globalThis.__t;delete globalThis.__t;
// 1) 워프: 원작 battlecats-db 362·363·366·367·420 (확률, 거리 ×0.034, 사라지는 프레임/30)
const WARP={shibalienelite:[.35,25.5,10/30],starpeng:[1,17,100/30],painter:[.2,17,10/30],captainmogu:[.3,8.5,40/30],ribbo:[1,8.5,1]};
for(const [id,[c,d,s]] of Object.entries(WARP)){const u=t.U[id];assert.equal(u.warpChance,c,id);assert.equal(u.warpDistance,d,id);assert(Math.abs(u.warpDuration-s)<1e-9,id);assert(!u.blowChance,id+' 날려버림이 남음');assert(t.T[id].includes('워프'),id);}
function battle(){t.setStage(0);e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=999999;g.spawnRules=[];return g}
for(const id of Object.keys(WARP)){
 const g=battle();e.addUnit(id);e.addUnit('red');const z=g.units.find(u=>!u.ally),a=g.units.find(u=>u.ally);
 z.stats.warpChance=1;a.x=50;a.hp=a.max=a.stats.hp=1e8;
 e.damage(a,10,z);assert(!g.units.includes(a),id+': 맞은 아군이 사라짐');assert(g.warped.includes(a));
 const dur=t.U[id].warpDuration;e.update(dur*0.9);assert(!g.units.includes(a),id+': 시간 전엔 안 돌아옴');
 e.update(dur*0.2+1/30);assert(g.units.includes(a),id+': 돌아옴');assert(Math.abs(a.x-(50+t.U[id].warpDistance))<1e-6,id+': 뒤로 '+t.U[id].warpDistance);
}
// 아군이 적을 때려도 워프는 걸리지 않는다
{const g=battle();e.addUnit('starpeng');e.addUnit('red');const z=g.units.find(u=>!u.ally),a=g.units.find(u=>u.ally);a.stats.warpChance=1;z.hp=z.max=1e8;e.damage(z,10,a);assert(g.units.includes(z));}
// 2) 좀비 침공에 나오는 적은 모두 도감 목록·설명이 있고, 그 침공판을 깨면 본 적 있음이 된다
const types=new Set();for(const c of Object.keys(t.Z))for(const i of t.zs(+c))for(const r of t.zr(i))types.add(r.type);
for(const id of types){assert(t.O.includes(id),id+' 도감 목록');assert(t.T[id],id+' 설명');assert(t.N[id],id+' 이름');}
for(const id of ['zcamelle','zbore'])assert(t.O.includes(id)&&t.T[id],id);
{t.save.clear=[];assert(!t.seen('zdog'));const i=t.zs(1).find(j=>t.zr(j).some(r=>r.type==='zdog'));t.save.clear=[i];assert(t.seen('zdog'),'침공판을 깨면 좀비 멍뭉이를 본 적 있음');t.save.clear=[];}
// 3) 설명과 능력
const has=(id,k)=>t.T[id].includes(k);
assert(has('sael','느리게')&&t.U.sael.slowChance);assert(has('maawth','멈추')&&t.U.maawth.freezeChance);assert(has('phace','멈추')&&t.U.phace.freezeChance);assert(has('liz56','파동')&&t.U.liz56.wave);
for(const id of t.O)if(t.T[id])assert(!t.T[id].includes('바리어'),id+' 표기는 베리어');
for(const id of types)if(t.U[id].burrow&&/^z/.test(id)&&!['zapy'].includes(id)&&t.T[id].includes('되살아나며'))assert(has(id,'땅굴'),id+' 땅굴 설명');
assert(has('zdog','땅굴')&&has('zthrillerz','2번'));
for(const id of t.O){const u=t.U[id];if(!u)continue;if(u.reviveCount&&(u.trait==='zombie'||(u.traits||[]).includes('zombie'))&&id.startsWith('z')&&/^z(dog|nache|guys|pigge|peng|gory|seal|croco|kangaroo|bear|bore|thrillerz|dagshund|duche|camelle)$/.test(id))assert(has(id,'되살아'),id+' 부활 설명');}
console.log(`PASS: 워프 5종(원작 확률·거리·시간, 사라졌다가 뒤에서 나타남), 좀비 침공 적 ${types.size}종 도감·설명, 침공 클리어로 도감 공개, 설명 4종 능력 반영, 베리어 표기.`);
process.exit(0);
