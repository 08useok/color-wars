const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const noArena=addons.filter(f=>f!=='tier-test-stages.js');// 티어 시험 구역 9맵은 맨 끝에 붙으므로 이 시험의 번호 비교에서 뺀다(test-tier-arenas가 따로 확인)
const prev=make({addons:noArena.filter(f=>!['hurricane-73-atlas.js','stages-73.js'].includes(f)&&!f.includes('spintop-rainbow'))});
const e=make({addons:noArena,extraSetup:'globalThis.__s73={h:HURRICANE73_EVENT,r:BORE73_RELAY,select:i=>selectedStage=i,spawns:updateStageSpawns,base:data.bases.enemy,open:bore73Open,assets:NEW_ATLASES,attack:resolveAttack};'}),c=globalThis.__s73;delete globalThis.__s73;
assert.equal(e.stageList.length,prev.stageList.length+2);assert.deepEqual(e.stageList.slice(0,-2),prev.stageList);for(const [id,d]of Object.entries(prev.units))assert.deepEqual(e.units[id],d);for(const [i,r]of Object.entries(prev.spawnList))assert.deepEqual(e.spawnList[i],r);
assert.equal(c.h.index,748);assert.equal(c.r.index,749);assert.equal(e.units.hurricanecyclone.interval,.2);assert.equal(e.units.hurricanecyclone.zoneMin,8.5);assert.equal(e.units.hurricanecyclone.zoneMax,22.1);assert.equal(e.spawnList[748].length,9);assert.equal(e.spawnList[748].find(r=>r.boss).at.t,30);
for(const mode of ['walk','attack','hurt'])assert(c.assets.hurricanecyclone[mode].length);assert(fs.existsSync(c.assets.hurricanecyclone.sheet.split('?')[0]));
e.setCleared([]);assert(!c.open());e.setCleared([143]);assert(c.open());
c.select(c.r.index);e.reset();let g=e.getGame();g.running=true;g.tutorial=99;g.elapsed=10;g.money=1e9;
e.addUnit('red');const killer=g.units.find(v=>v.ally);killer.stats={...killer.stats,zombieKiller:true};
for(let phase=0;phase<5;phase++){
 c.spawns(1/30);const boss=g.units.find(u=>!u.ally&&u.hp>0&&u.type===c.r.types[phase]);assert(boss,'relay phase '+phase);assert.equal(g.spawnRules.filter(r=>r.spawned).length,phase+1);c.base.hp=0;assert.equal(c.base.hp,1,'no early castle kill');
 if(phase===4){e.damage(boss,1e12);assert(boss.reviveAt!==undefined);c.spawns(1/30);assert(!g.relay73Done);assert.equal(g.relay73Phase,4);c.base.hp=0;assert.equal(c.base.hp,1,'reviving zombie holds castle');g.elapsed=boss.reviveAt;e.update(1/30);assert(boss.hp>0);}
 boss.kbTime=0;boss.emerging=false;boss.burrowing=false;e.damage(boss,1e12,killer);c.spawns(1/30);
 if(phase<4){assert.equal(g.relay73Phase,phase+1);assert.equal(g.spawnRules[phase+1].spawned,0,'2 second intermission');g.elapsed+=2;}
}
assert.equal(g.relay73Done,true);c.base.hp=0;assert.equal(c.base.hp,0,'five permanent kills release castle');
// Hurricane's long-distance zone hits at 10 but cannot hit at 5 game units.
c.select(748);e.reset();g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit('red');e.addUnit('hurricanecyclone',true);const a=g.units.find(u=>u.ally),v=g.units.find(u=>!u.ally);a.hp=a.max=1e8;a.kbTime=v.kbTime=0;v.x=30;a.x=35;c.attack(v,a);assert.equal(a.hp,1e8);a.x=40;c.attack(v,a);assert(a.hp<1e8);
const rows=[];e.setCleared(e.stageList.map((_,i)=>i));e.setProfile({level:30,trueForms:['gold','violet','orchid','lavender','aqua','babyblue']});
const deck=['red','yellow','garnet','sapphire','lavender','aqua','sunflower','fern','jade','orchid'];
for(const i of [748,749])for(const seed of [1,2,3]){const r=e.simulate(i,1,deck,seed,300,'smart2');for(const k of ['seconds','allyHp','enemyHp'])assert(Number.isFinite(r[k]));rows.push({i,seed,...r});}
fs.writeFileSync(process.argv[2]||'docs/simulations/stages-73-2026-10-29.json',JSON.stringify({checks:['append-only indices/stats/spawns','world3 gate','original Hurricane stats/spawn timing','Hurricane blind spot','five sequential bosses','two-second intermission','zombie revival blocks finish','all five kills release castle'],deck,rows},null,2));
console.log('PASS stage rules, gate, relay, zombie revival and Hurricane attack zone;',rows.map(r=>[r.i,r.seed,r.win,r.seconds]));process.exit(0);
