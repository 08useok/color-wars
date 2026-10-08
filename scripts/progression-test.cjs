const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'..','progression.js'),'utf8').replace('renderTraining();renderUnitLevels();','');
const store={},grades={red:'basic',cream:'rare',garnet:'ex',plum:'sr',prism:'uber'};
let training={xp:100,levels:{red:35,cream:40,garnet:35,plum:30,prism:30},forms:{}};
function load(){const c={ALLIES:Object.keys(grades),localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=v},training,gradeOf:t=>grades[t],allyUnlocked:()=>true,saveTraining(){},levelCap:()=>20,LV_MAX:20,LV_EVOLVE:10,rankCapOf:()=>30,rankClaimed:[2100],RANK_REWARDS:[{at:2100,eyes:{ex:5,sr:5,uber:5}}],unitStats:(t,l,f)=>({level:l,form:f}),renderUnitLevels(){},renderTraining(){},gachaRoll(){training.xp+=2000;return {dup:true,id:'cream',xp:2000}},grantEx:()=>true,gachaOwns:()=>false,rankGrant(){},gachaAppendDetail(){},UNIT_NAMES:{}};vm.createContext(c);vm.runInContext(source,c);c.renderTraining=()=>{};return c}
let c=load();assert.equal(training.levels.red,30);assert.equal(c.totalLevel('red'),35);assert.equal(c.totalLevel('cream'),40);assert.equal(c.levelCapOf('red'),30);assert.equal(c.levelCapOf('cream'),30);assert.equal(c.levelCapOf('garnet'),35);
assert.equal(vm.runInContext('progression.eyes.ex',c),5);c=load();assert.equal(c.totalLevel('red'),35);assert.equal(vm.runInContext('progression.eyes.ex',c),5);
assert.equal(c.useCatseye('red'),false);assert.equal(c.useCatseye('plum'),true);assert.equal(c.levelCapOf('plum'),31);assert.equal(training.levels.plum,30);assert.equal(vm.runInContext('progression.eyes.sr',c),4);
assert.equal(c.unitStats('red').level,35);assert.equal(c.unitStats('red',31).level,36);
assert.equal(c.addPlusLevel('cream'),false);const capped=c.gachaRoll();assert.equal(capped.xp,2000);assert.equal(training.xp,2100);
vm.runInContext('progression.plus.cream=9',c);const upgraded=c.gachaRoll();assert.equal(upgraded.plus,10);assert.equal(upgraded.xp,0);assert.equal(training.xp,2100);
c.rankGrant({at:2100,eyes:{ex:5,sr:5,uber:5}});assert.equal(vm.runInContext('progression.eyes.ex',c),5);
c.addCatseyes('uber',10);for(let i=0;i<10;i++)assert.equal(c.useCatseye('prism'),true);assert.equal(c.levelCapOf('prism'),40);assert.equal(c.useCatseye('prism'),false);for(let i=0;i<10;i++)assert.equal(c.addPlusLevel('prism'),true);assert.equal(c.addPlusLevel('prism'),false);training.levels.prism=40;assert.equal(c.unitStats('prism').level,50);
c=load();assert.equal(c.levelCapOf('prism'),40);assert.equal(c.totalLevel('prism'),50);assert.equal(vm.runInContext('progression.eyes.ex',c),5);
console.log('PASS: saved levels preserved, basic/rare cap 30, +10 limit and XP fallback, Catseye cap 40 with XP leveling, effective Lv.50, one-time historical rewards and reload persistence.');
