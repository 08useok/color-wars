const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const src=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(src.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const old=make({addons:addons.filter(f=>!f.includes('spintop-rainbow'))});
const e=make({extraSetup:'globalThis.__spin={atlas:NEW_ATLASES.spintoprainbow,event:HURRICANE73_EVENT,variants:CYCLONE_ALLIES};'}),c=globalThis.__spin;delete globalThis.__spin;
assert.equal(e.roster.length,old.roster.length+1);assert.equal(e.gradeOf('spintoprainbow'),'rare');assert.equal(c.event.reward,'spintoprainbow');assert.equal(e.stageList[c.event.index].special.chance,.3);
for(const [id,s]of Object.entries(old.units))assert.deepEqual(e.units[id],s,id+' unchanged');for(const [i,spawns]of Object.entries(old.spawnList))assert.deepEqual(e.spawnList[i],spawns,i+' schedule unchanged');assert.equal(e.stageList.length,old.stageList.length);
for(const a of [c.atlas,c.atlas.evolved]){assert(fs.existsSync(a.sheet.split('?')[0]));assert.deepEqual(['idle','walk','attack','hurt'].map(k=>a[k].length),[4,4,7,1]);}
function attack(crit){e.reset();const g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit('spintoprainbow');const u=g.units.find(x=>x.ally);u.x=60;u.emerging=false;u.hp=u.max=1e9;u.stats.critChance=crit;const targets=[];
 for(const [j,id]of ['dog','metalhippo','metalhippo'].entries()){e.addUnit(id);const v=g.units.at(-1);v.x=55-j*.3;v.emerging=false;v.hp=v.max=1e9;v.stats.atk=0;v.stats.speed=0;targets.push(v);}
 for(let i=0;i<20;i++)e.update(1/30);return {atk:u.stats.atk,deltas:targets.map(v=>1e9-v.hp)};
}
const plain=attack(0);assert(Math.abs(plain.deltas[0]-plain.atk)<.01,'area damage must total one attack across three shares');assert.deepEqual(plain.deltas.slice(1),[3,3],'three noncritical metal hits');
const crit=attack(1);assert(crit.deltas.every(d=>Math.abs(d-crit.atk*2)<.01),'three critical shares total double attack');
const d=e.units.spintoprainbow;assert(!d.metalKiller&&!d.massiveVs,'does not inherit parent special damage');assert.equal(d.hits.length,3);assert.equal(d.interval,.75);assert.equal(d.critChance,.15);
const results=[];const deck=['red','yellow','herbmint','kendonavy','hulasilver','drumscarlet','spintoprainbow','cheerdandelion','garnet','sapphire'];
const metalStage=e.stageList.findIndex(s=>s.cyclone==='metal');assert(metalStage>=0);
for(const i of [c.event.index,metalStage]){const r=e.simulate(i,1,deck,1,300,'smart2');assert(Number.isFinite(r.seconds));results.push({i,name:e.stageList[i].name,...r});}
fs.writeFileSync('docs/simulations/spintop-rainbow-2026-10-30.json',JSON.stringify({checks:['rare variant registration','original units/maps/spawns preserved','dedicated two-form sprites','actual three area-hit shares','critical and noncritical metal damage','no inherited parent massive/metal-killer'],plain,crit,results},null,2));console.log('PASS spin variant combat/atlases, 3 hit shares and metal critical behavior;',results.map(r=>[r.name,r.win,r.seconds]));process.exit(0);
