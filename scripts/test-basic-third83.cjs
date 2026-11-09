const assert=require('node:assert/strict'),fs=require('node:fs'),make=require('./full-harness.cjs');
const ids=['red','green','blue','orange','yellow','purple','pink','cyan'];
const e=make({extraSetup:'globalThis.__b83={atlas:NEW_ATLASES,ready:trueFormAssetReady,deadZone};'}),h=globalThis.__b83;delete globalThis.__b83;
const old=make({addons:make.DEFAULT_ADDONS.filter(f=>f!=='basic-third83.js')});
for(const id of e.roster)for(const form of [1,2]){e.setProfile({level:30,forms:{[id]:form}});old.setProfile({level:30,forms:{[id]:form}});assert.deepEqual(e.unitStats(id),old.unitStats(id),id+' '+form);}
const noArt=make({addons:make.DEFAULT_ADDONS.filter(f=>f!=='assets/basic-third83-motion/motion-atlases.js'),extraSetup:'globalThis.__noArt=trueFormAssetReady;'});
const second={};e.setProfile({level:30});for(const id of ids){assert(h.ready(id),id+' dedicated art');assert(!globalThis.__noArt(id),id+' stays locked when art script is missing');second[id]=e.unitStats(id);const a=h.atlas[id].true;assert.notEqual(a.sheet,h.atlas[id].evolved.sheet);assert(fs.existsSync(a.sheet.split('?')[0]));assert(a.idle.length===60&&a.walk.length===18&&a.hurt.length===20);for(const key of ['idle','walk','attack','hurt'])for(const f of a[key])assert(f[0]>=0&&f[1]>=0&&f[0]+f[2]<=1920&&f[1]+f[3]<=1024,id+' '+key+' frame bounds');}
e.setProfile({level:30,trueForms:ids});
const stats={};for(const id of ids){const s=stats[id]=e.unitStats(id);assert(s.trueForm);assert(Math.abs(s.hp-second[id].hp*2)<=4,id+' hp');assert(Math.abs(s.atk-second[id].atk*2)<=4,id+' atk');assert(s.cooldown>=2);}
assert.equal(stats.red.range,160*.034);assert(stats.green.area&&stats.green.returnMult===1.8&&stats.green.blowChance===.3);
assert.equal(stats.blue.speed,second.blue.speed*1.2);assert(stats.blue.immune.weaken&&stats.blue.survive===.5);
assert.equal(stats.orange.splash,second.orange.splash*1.3);assert.equal(stats.orange.killGold,1.5);
assert(stats.yellow.waveImmune&&stats.yellow.immune.slow);assert(stats.purple.curseChance===.5&&stats.purple.atkDownChance===.5);
assert(stats.pink.freezeChance===.3&&stats.pink.slowDuration===2.5);assert.equal(stats.cyan.interval,2.8);assert.equal(h.deadZone({type:'cyan',ally:true,stats:stats.cyan}),0);
console.log('PASS 8 released basic third forms: dedicated art and frame bounds, 2x second-form HP/ATK, minimum2s, abilities, 1/2 forms unchanged, missing art remains locked');process.exit(0);
