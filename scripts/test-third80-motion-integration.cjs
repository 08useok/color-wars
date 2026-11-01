const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs'),ids=['hacienda','lightcream','moss','ruby'];
const e=make({extraSetup:'globalThis.__tf80={catfruit,evolveTrueForm,canTrueForm,fruitColorOf,trueFormCost,hasTrueForm,trueFormAssetReady,atlases:NEW_ATLASES,profiles:PROFILE_ART_TRUE,setForm,attack,storage:localStorage};'}),h=globalThis.__tf80;delete globalThis.__tf80;
const report=[];
for(const id of ids){
 e.setProfile({level:30,trueForms:[]});const base=e.unitStats(id);assert(!base.trueForm);const a=h.atlases[id].true;assert(h.trueFormAssetReady(id));assert(a.sheet.includes('third-form-80-redesign-motion'));
 for(const file of [a.sheet,h.profiles[id]])assert(fs.existsSync(file.split('?')[0]),file);
 assert.deepEqual(['idle','walk','attack','hurt'].map(k=>a[k].length),[4,4,7,1]);
 const col=h.fruitColorOf(id),cost=h.trueFormCost(id);for(const c of Object.keys(h.catfruit.fruit)){h.catfruit.fruit[c]=50;h.catfruit.seed[c]=50;}h.catfruit.epic=50;e.training.xp=1e6;
 assert(h.canTrueForm(id));assert(h.evolveTrueForm(id));assert(!h.evolveTrueForm(id),'no duplicate deduction');
 assert.equal(h.catfruit.fruit[col],50-cost.fruit);assert.equal(h.catfruit.seed[col],50-cost.seed);assert.equal(e.training.xp,1e6-cost.xp);assert(JSON.parse(h.storage.getItem('red-battle-trueform-v1')).includes(id));
 h.setForm(id,3);const s=e.unitStats(id);assert(s.trueForm);assert.equal(s.hp,Math.round(base.hp*1.5));assert.equal(s.atk,Math.round(base.atk*1.5));for(const k of ['cost','cooldown','interval','speed'])assert.equal(s[k],base[k]);
 assert.equal(a.attackKeys[2][0],s.windup*30);
 e.reset();const g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit(id);e.addUnit('ancientdog');const [u,v]=g.units;assert(u.stats.trueForm);u.emerging=v.emerging=false;u.x=60;v.x=59;v.hp=v.max=1e9;v.stats.speed=0;v.stats.atk=0;v.stats.knockbacks=1;v.stats.curseChance=0;h.attack(u,v);const hp=v.hp;for(let n=0;n<30;n++)e.update(1/30);assert(v.hp<hp,'scheduled hit '+id);
 h.setForm(id,2);assert.deepEqual(e.unitStats(id),base,'second form '+id);h.setForm(id,1);assert(!e.unitStats(id).trueForm,'explicit first form');
 report.push({id,sheet:a.sheet,profile:h.profiles[id],hp:s.hp,atk:s.atk,range:Math.round(s.range/.034),impact:s.windup,cost,scheduledHit:true});
}
fs.mkdirSync('work/third-form-80-redesign-motion',{recursive:true});fs.writeFileSync('work/third-form-80-redesign-motion/integration-validation.json',JSON.stringify({forms:4,report,checks:['real atlas and profile files','paid evolution and no duplicate deduction','ownership saved','third stats and timing','scheduled damage against actual ancient enemy','first second switch preserved']},null,2));
console.log('PASS 4 real third-form atlases, paid evolution, saved ownership, form switching and scheduled battle hits');process.exit(0);
