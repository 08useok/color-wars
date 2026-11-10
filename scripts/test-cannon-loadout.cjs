const assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const e=make({extraSetup:'globalThis.__cannon={equip:equipCannon,kind:()=>equippedCannon,fire:fireCannon,ready:cannonReady,charge:cannonChargeTime,power:cannonPower,tick:updateCannon,saved:()=>localStorage.getItem(CANNON_LOADOUT_KEY)};'}),h=globalThis.__cannon;delete globalThis.__cannon;
e.reset();let g=e.getGame();assert.equal(h.kind(),'basic');
const basicCharge=h.charge();assert(h.equip('thunder'));assert.equal(h.kind(),'thunder');assert.equal(h.saved(),'thunder');assert.equal(h.charge(),Math.max(10,basicCharge+10));assert(!h.equip('unknown'));
g.running=true;g.paused=false;g.tutorial=99;g.money=1e9;g.spawnRules=[];
assert(!h.equip('basic'));g.paused=true;assert(!h.equip('basic'));g.paused=false;
for(const type of ['dog','metaldoge','zoge','pigge','red'])e.addUnit(type);
const dog=g.units.find(v=>v.type==='dog'),metal=g.units.find(v=>v.type==='metaldoge'),zombie=g.units.find(v=>v.type==='zoge'),immune=g.units.find(v=>v.type==='pigge'),ally=g.units.find(v=>v.type==='red');
for(const v of [dog,metal,zombie,immune]){v.x=60;v.emerging=false;v.kbTime=0;v.hp=v.max=1e9;}
metal.hp=1;immune.stats.immune={freeze:true};
const buried={...zombie,type:'zoge',hp:100,emerging:true,freezeUntil:0};g.units.push(buried);
const corpse={...zombie,hp:0,reviveAt:10,freezeUntil:0};g.defeated.push(corpse);
assert(!h.fire());g.cannonCharge=h.charge();assert(h.ready());assert(h.fire());assert.equal(g.cannonCharge,0);assert(!h.fire());
for(const v of [dog,metal,zombie])assert.equal(v.freezeUntil,2);assert.equal(dog.hp,1e9);assert.equal(metal.hp,1);assert.equal(zombie.hp,1e9);assert.equal(dog.x,60);assert(!(immune.freezeUntil>0));assert(!(ally.freezeUntil>0));assert.equal(buried.freezeUntil,0);assert.equal(corpse.freezeUntil,0);
g.ended=true;g.cannonCharge=10;assert(h.equip('basic'));assert.equal(h.charge(),basicCharge);assert.equal(g.cannonCharge,0);
e.reset();g=e.getGame();assert.equal(h.kind(),'basic');g.running=true;g.tutorial=99;g.spawnRules=[];h.ready();g.cannonCharge=h.charge();e.addUnit('dog');const target=g.units.find(v=>v.type==='dog');target.x=70;target.hp=target.max=1e9;target.stats.knockbacks=1;target.emerging=false;
assert(h.fire());for(let i=0;i<30;i++)h.tick(1/30);assert.equal(target.hp,1e9-h.power());assert(target.kbTime>0,'basic cannon still pushes');
function prepare(kind){e.reset();g=e.getGame();g.running=false;assert(h.equip(kind));g.running=true;g.tutorial=99;g.spawnRules=[];h.ready();g.cannonCharge=h.charge();}
function enemy(type,hp=1e9){e.addUnit(type);const v=g.units[g.units.length-1];v.hp=v.max=hp;v.kbTime=0;v.emerging=false;v.x=60;return v;}
prepare('slow');const slowed=enemy('dog'),slowImmune=enemy('pigge'),slowBuried=enemy('zoge');slowImmune.stats.immune={slow:true};slowBuried.emerging=true;slowed.slowUntil=10;assert(h.fire());assert.equal(slowed.slowUntil,10,'preserve longer slow');assert(!(slowImmune.slowUntil>0));assert(!(slowBuried.slowUntil>0));assert.equal(slowed.hp,1e9);
prepare('slow');const freshSlow=enemy('dog');assert(h.fire());assert.equal(freshSlow.slowUntil,4);
prepare('breaker');const barrier=enemy('gregory'),plain=enemy('dog'),hidden=enemy('gregory');hidden.emerging=true;assert(h.fire());assert(barrier.barrierBroken);assert(!hidden.barrierBroken);assert(!plain.barrierBroken);assert.equal(barrier.hp,1e9);assert.equal(barrier.x,60);
prepare('holy');const kill=enemy('zoge',1),hurt=enemy('zoge'),nonZombie=enemy('dog'),underground=enemy('zoge',1);underground.emerging=true;const ghost={...kill,hp:0,reviveAt:99};g.defeated.push(ghost);assert(h.fire());assert.equal(kill.hp,0);assert(!kill.reviveAt,'holy kill prevents revival');assert.equal(hurt.hp,1e9-h.power());assert.equal(nonZombie.hp,1e9);assert.equal(underground.hp,1);assert.equal(ghost.reviveAt,99);assert.equal(h.saved(),'holy');assert(!h.fire());
console.log('PASS all five cannons: selection/save, battle lock, charge, unchanged basic, thunder, slow immunity/duration, barrier break, holy damage/zombie kill and excluded targets');process.exit(0);
