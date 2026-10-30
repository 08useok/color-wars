const assert=require('node:assert/strict'),fs=require('fs'),make=require('./full-harness.cjs');
const src=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(src.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const old=make({addons:addons.filter(f=>!f.includes('allies-ocean-sea')&&!f.includes('ocean-sea-motion'))}),e=make();
assert.equal(e.roster.length,old.roster.length+2);for(const id of old.roster)assert.deepEqual(e.unitStats(id),old.unitStats(id),id);assert.deepEqual(e.spawnList,old.spawnList);assert.equal(e.stageList.length,old.stageList.length);
for(const id of ['ocean','sea'])assert.equal(e.gradeOf(id),'uber');
const o=e.unitStats('ocean'),s=e.unitStats('sea');assert.deepEqual(o.massiveVs,['alien','zombie']);assert(o.zombieKiller);assert.deepEqual(s.resistVs,['alien','floating']);assert.deepEqual(s.statusVs,['alien','floating']);assert.equal(s.slowChance,.3);assert.equal(s.speed,24);
function hit(id,trait){e.reset();e.units.dog.trait=trait;const g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit(id);const u=g.units.find(v=>v.ally);u.x=60;u.emerging=false;u.hp=u.max=1e9;e.addUnit('dog');const v=g.units.at(-1);v.x=55;v.emerging=false;v.hp=v.max=1e9;v.stats={...v.stats,trait,traits:undefined,atk:0,speed:0,knockbacks:1};for(let n=0;n<24;n++)e.update(1/30);return 1e9-v.hp;}
const plain=hit('ocean',undefined),alien=hit('ocean','alien'),zombie=hit('ocean','zombie');console.log({plain,alien,zombie});assert(alien>plain*2.9&&zombie>plain*2.9,'actual trait massive damage');
function received(trait){e.reset();e.units.dog.trait=trait;const g=e.getGame();g.running=true;g.money=1e9;e.addUnit('sea');const v=g.units.find(u=>u.ally);v.hp=v.max=1e9;v.kbTime=0;const from={type:'dog',stats:{},ally:false};e.damage(v,1000,from);return 1e9-v.hp;}
const taken={plain:received(undefined),alien:received('alien'),floating:received('floating')};assert(taken.alien<taken.plain*.26&&taken.floating<taken.plain*.26,'actual resistance reduction');
console.log('PASS ocean/sea registration, old stats/maps preserved, actual massive damage and resistance', {plain,alien,zombie,taken});process.exit(0);
