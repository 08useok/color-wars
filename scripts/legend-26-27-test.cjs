const fs=require('fs'),assert=require('assert/strict'),create=require('./battle-harness.cjs');
const old=JSON.parse(fs.readFileSync('reference-sheets/legend-26-27/old-stages.json','utf8')),e=create({optimized:false,savedLegend:{1:[179,180,187,188,195,195,196,-1],2:[195]}});
assert.equal(e.stageList.length,old.length+16);for(const s of old){const t=e.stageList[s.i];assert.equal(t.name,s.name);assert.equal(t.hp,s.hp);assert.deepEqual(t.legend,s.legend);assert.equal(t.chapter,s.chapter)}
assert.deepEqual(e.legendProgress[1],[179,180,187,188,195]);assert.deepEqual(e.legendProgress[2],[195]);
assert.equal(e.legendSubs.length,27);for(let k=180;k<196;k++){assert.equal(e.legendIdx(k),443+k-180);assert.equal(e.legendSubOf(k),k<188?25:26);assert(e.spawnList[e.legendIdx(k)].length);for(const r of e.spawnList[e.legendIdx(k)])assert(e.units[r.type])}
for(const t of ['capy','berserkory','brollow','calamary','alpacky','eldersloth','alienbunbun','mrmole'])assert(e.atlases[t]?.attack.length>1);
for(let s=25;s<27;s++)assert.equal(e.legendCrownMult(4,s),e.legendCrownMult(3,s));
e.legendProgress[1]=Array.from({length:180},(_,i)=>i);assert(e.legendSubOpen(25));assert(!e.legendSubOpen(26));e.legendProgress[1].push(...Array.from({length:8},(_,i)=>180+i));assert(e.legendSubOpen(26));
// Castle-triggered delays start at the trigger, independently of battle time.
e.reset();let g=e.getGame();g.units=[];g.elapsed=100;g.spawnRules=[{type:'capy',at:{hp:99},firstDelay:2,count:1,spawned:0,triggered:false,clock:0}];e.bases.enemy.hp=e.bases.enemy.max*.98;e.updateStageSpawns(.5);assert.equal(g.units.length,0);e.updateStageSpawns(1.5);assert.equal(g.units[0].type,'capy');
g.units=[];e.addUnit('alpacky');const alp=g.units[0];e.damage(alp,alp.max+1);assert.equal(alp.hp,1);assert.equal(alp.survived,true);alp.kbTime=0;e.damage(alp,2);assert.equal(alp.hp,0);
// Mole misses its blind spot, hits the back line, and forces knockback.
g.units=[];g.running=true;g.tutorial=6;g.money=99999;e.addUnit('mrmole');const mole=g.units[0];mole.x=20;e.addUnit('red');const close=g.units[1];close.x=30;close.hp=close.max=1e6;e.addUnit('yellow');const far=g.units[2];far.x=50;far.hp=far.max=1e6;assert.equal(e.deadZone(mole),17.5);e.resolveAttack(mole,far);assert.equal(close.hp,1e6);assert(far.hp<1e6);assert(far.kbTime>0);
console.log('PASS: 16 stage registrations, all old indices, saved progress through k195, chapter unlocks, crowns, delayed spawns, one-time survival, mole blind spot and knockback.');
const deck=['red','yellow','peach','maroon','cream','lava','garnet','obsidian','ribbonchart','rainbow'];const fast=create(),results=[];
for(let k=180;k<196;k++)for(let crown=1;crown<=4;crown++){const r=fast.simulate(fast.legendIdx(k),crown,deck,1,300);assert(Number.isFinite(r.seconds)&&Number.isFinite(r.enemyHp)&&Number.isFinite(r.allyHp));results.push({k,crown,...r});}
fs.writeFileSync('reference-sheets/legend-26-27/smoke-results.json',JSON.stringify(results,null,2));console.log('64 battle smoke checks: '+results.filter(r=>r.win).length+' wins, '+results.filter(r=>!r.win&&!r.timeout).length+' losses, '+results.filter(r=>r.timeout).length+' timeouts (300 game seconds).');
