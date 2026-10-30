const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const old=make({addons:addons.filter(f=>!f.includes('third-forms-74')&&!f.includes('third-form-74-motion'))});
const noBuff=make({addons:addons.filter(f=>f!=='second-form-speed-buff.js')});// 2진 속도 상향은 2진만 바꾼다(3진 불변). 3진 공격 간격은 상향 전 2진 값과 같다
const e=make({extraSetup:'globalThis.__third74={setForm,attack,lockEngage,atlases:NEW_ATLASES};'}),hooks=globalThis.__third74;delete globalThis.__third74;
const ids=['lilac','babypink','magenta','fusioncream'],base=Object.fromEntries(ids.map(id=>[id,e.unitStats(id)]));
for(const id of e.roster)assert.deepEqual(e.unitStats(id),old.unitStats(id),'unowned forms unchanged '+id);
e.setProfile({trueForms:ids});for(const id of ids)hooks.setForm(id,3);
const stats=Object.fromEntries(ids.map(id=>[id,e.unitStats(id)]));
for(const id of ids){const s=stats[id],b=base[id];assert(s.trueForm);for(const key of ['hp','atk','cost','cooldown','interval'])assert.equal(s[key],['hp','atk'].includes(key)?Math.round(b[key]*1.5):id==='babypink'&&key==='interval'?3:key==='interval'?noBuff.unitStats(id).interval:b[key],id+' '+key);assert(fs.existsSync(hooks.atlases[id].true.sheet.split('?')[0]));}
assert.equal(stats.lilac.zoneMax,base.lilac.range*1.3);assert.equal(stats.lilac.range,base.lilac.range);assert.equal(stats.lilac.wave.level,1);assert.equal(stats.lilac.wave.chance,1);
assert.equal(stats.babypink.slowDuration,base.babypink.slowDuration+1);assert.deepEqual(stats.babypink.statusVs,['angel','alien']);assert.equal(stats.babypink.windup,0);assert.equal(stats.babypink.attackDuration,0);
assert.equal(stats.magenta.wave.reach,base.magenta.wave.reach+6.8);assert.equal(stats.fusioncream.speed,noBuff.unitStats('fusioncream').speed+10);assert.equal(stats.fusioncream.barrierBreak,.1);
e.reset();const g=e.getGame();g.running=true;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit('babypink');const u=g.units.find(v=>v.ally);assert(u);u.x=60;u.emerging=false;e.addUnit('dog');const enemy=g.units.at(-1);enemy.x=55;enemy.hp=enemy.max=1e9;enemy.kbTime=0;hooks.attack(u,enemy);assert(enemy.hp<1e9,'immediate actual damage');assert.equal(u.attackTime,0);assert(!u.pendingAttack);assert.equal(u.atkCd,u.stats.interval);
hooks.lockEngage(enemy,u.stats.attackDuration||u.stats.interval);hooks.attack(u,enemy);assert(enemy.attackLock.until<=g.elapsed,'zero recovery must not lock out allies for the attack interval');
for(const id of ids){hooks.setForm(id,2);const s=e.unitStats(id);assert(!s.trueForm);assert.deepEqual(s,base[id],'explicit second form unchanged '+id);}
fs.writeFileSync('work/third-form-74-motion/abilities-validation.json',JSON.stringify({checks:['four dedicated third-form atlases','third HP ATK 150%; costs cooldowns unchanged; Baby Pink third interval 3s','expanded hit range but unchanged engage range','wave properties','angel alien slow','immediate attack and zero recovery','speed and barrier break','explicit second form preserved'],base,third:stats},null,2));console.log('PASS third74 abilities, real immediate hit, unchanged second forms');process.exit(0);
