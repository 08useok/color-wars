const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const old=make({addons:addons.filter(f=>!f.includes('verdigris'))});
const e=make({extraSetup:'globalThis.__vg={setForm,attack,resolveAttack,updateSurges,atlas:NEW_ATLASES.verdigris,trueFormAssetReady};'}),h=globalThis.__vg;delete globalThis.__vg;
for(const id of e.roster)assert.deepEqual(e.unitStats(id),old.unitStats(id),'unowned unchanged '+id);
const b=e.unitStats('verdigris');e.setProfile({trueForms:['verdigris']});h.setForm('verdigris',3);const s=e.unitStats('verdigris');
assert(s.trueForm&&h.trueFormAssetReady('verdigris'));assert.equal(s.hp,Math.round(b.hp*1.5));assert.equal(s.atk,Math.round(b.atk*1.5));assert.equal(s.interval,1.7);
for(const k of ['cost','cooldown','speed','range','knockbacks'])assert.equal(s[k],b[k],k);
assert.deepEqual(s.hits.map(x=>x.abilities.range),[7.2,12,18]);assert.equal(s.hits[2].abilities.blowChance,b.blowChance);
assert.equal(s.hits.reduce((v,x)=>v+x.share,0),1);
function arena(distance){e.reset();const g=e.getGame();g.running=true;g.paused=false;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit('verdigris');e.addUnit('dog');const [u,v]=g.units;assert(u.ally&&!v.ally);u.x=60;u.emerging=false;v.x=60-distance;v.emerging=false;v.hp=v.max=1e9;v.stats.knockbacks=1;v.kbTime=0;u.stats.blowChance=0;u.stats.hits[2].abilities.blowChance=0;return {g,u,v};}
const ranges=[];
for(let i=0;i<3;i++)for(const distance of [6,10,16,20]){
 const {g,u,v}=arena(distance),before=v.hp;u.currentHit=u.stats.hits[i];h.resolveAttack(u,v,1/3);u.currentHit=null;
 const hit=distance<=[7.2,12,18][i];assert.equal(before-v.hp,hit?s.atk/3:0,'range '+i+' '+distance);
 assert.equal((g.surges||[]).length,i===2?1:0,'surge only third');assert.equal(u.stats.range,b.range,'restore range');
 ranges.push({hit:i+1,distance,damage:before-v.hp});
}
const {g,u,v}=arena(10);u.currentHit=u.stats.hits[2];h.resolveAttack(u,v,1/3);u.currentHit=null;const sg=g.surges[0];assert.equal(sg.dmg,s.atk/6);
const before=v.hp;h.updateSurges(.01);h.updateSurges(.5);h.updateSurges(.5);h.updateSurges(.5);h.updateSurges(.5);assert.equal(before-v.hp,s.atk/6*4,'four surge ticks');assert.equal(g.surges.length,0);
// Actual scheduled attack, not just direct resolve calls.
const a=arena(6),hp=a.v.hp;h.attack(a.u,a.v);a.v.stats.speed=0;a.v.stats.atk=0;
let last=hp,events=[];for(let i=0;i<36;i++){e.update(1/30);if(a.v.hp!==last){events.push({t:(i+1)/30,damage:last-a.v.hp});last=a.v.hp;}}
assert.equal(events.length,3,'three scheduled direct hits');assert.equal(hp-a.v.hp,s.atk,'cycle total');assert.equal(a.g.surges.length,1);
h.setForm('verdigris',2);assert.deepEqual(e.unitStats('verdigris'),b,'explicit second preserved');h.setForm('verdigris',1);old.setProfile({forms:{verdigris:1}});assert.deepEqual(e.unitStats('verdigris'),old.unitStats('verdigris'),'first preserved');
for(const frames of ['idle','walk','attack','hurt'])assert(h.atlas.true[frames].length);assert(fs.existsSync(h.atlas.true.sheet.split('?')[0]));
fs.mkdirSync('work/verdigris-3-motion',{recursive:true});fs.writeFileSync('work/verdigris-3-motion/combat-validation.json',JSON.stringify({base:b,third:s,ranges,scheduled:events,surgeTick:s.atk/6,surgeTicks:4,checks:['unowned roster unchanged','first and second unchanged','third atlas gate','cost speed cooldown unchanged','strike ranges and shares','third-only surge, four exact ticks','scheduled three hits']},null,2));
console.log('PASS Verdigris third: ranges, 3 scheduled hits, surge ticks, preserved forms');process.exit(0);
