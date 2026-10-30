const assert=require('node:assert/strict'),fs=require('fs'),make=require('./full-harness.cjs');
const e=make({extraSetup:'globalThis.__r731={select:i=>selectedStage=i,spawns:updateStageSpawns,base:data.bases.enemy,relay:BORE73_RELAY};'}),c=globalThis.__r731;delete globalThis.__r731;
c.select(c.relay.index);e.reset();const g=e.getGame();g.running=true;g.tutorial=99;g.elapsed=10;
// Advance normally to the zombie phase; kill prior bosses without altering definitions.
for(let step=0;step<4;step++){c.spawns(1/30);const boss=g.units.find(u=>!u.ally&&u.hp>0);assert(boss);e.damage(boss,1e12);c.spawns(1/30);g.elapsed+=2;}
c.spawns(1/30);const zombie=g.units.find(u=>u.type==='zbore'&&u.hp>0);assert(zombie);
// zombie-burrow.js temporarily removes burrowing units while it calls the battle loop.
zombie.burrowing=true;const units=g.units;g.units=units.filter(u=>u!==zombie);
c.spawns(1/30);assert.equal(g.relay73Phase,4,'burrowing zombie must remain the current boss');assert(!g.relay73Done,'burrowing is not a kill');c.base.hp=0;assert.equal(c.base.hp,1,'castle stays protected while zombie is underground');g.units=units;
zombie.burrowLeft=10;e.update(1/30);assert.equal(g.relay73Phase,4,'real burrow update must not advance relay');assert(!g.relay73Done);assert(g.units.includes(zombie),'burrow wrapper restores living boss');zombie.burrowing=false;
e.damage(zombie,1e12);assert(zombie.reviveAt!==undefined);c.spawns(1/30);assert(!g.relay73Done,'corpse still blocks finish');
g.elapsed=zombie.reviveAt;e.update(1/30);zombie.kbTime=0;zombie.emerging=false;zombie.burrowing=false;e.damage(zombie,1e12,{type:'red',ally:true,stats:{zombieKiller:true}});c.spawns(1/30);assert.equal(g.relay73Done,true);c.base.hp=0;assert.equal(c.base.hp,0);
// The tier reference map is unrelated to this fix; its six baseline outcomes must stay exact.
const tier=JSON.parse(fs.readFileSync('docs/simulations/tier-current-2026-10-29.json','utf8')),baseline=[];
e.setCleared(e.stageList.map((_,i)=>i));e.setProfile({level:30,trueForms:[]});
for(let i=0;i<tier.meta.length;i++){const m=tier.meta[i];if(m.set!=='main'||m.id!==null)continue;const actual=e.simulate(405,3,tier.core,m.seed,300,m.policy),expected=tier.raw[i];for(const key of ['win','timeout','seconds','allyHp','enemyHp'])assert.equal(actual[key],expected[key],key+' reference seed '+m.seed+' '+m.policy);baseline.push({seed:m.seed,policy:m.policy,seconds:actual.seconds});}
assert.equal(baseline.length,6);
fs.writeFileSync('docs/simulations/release-731-2026-10-30.json',JSON.stringify({checks:['burrowing zombie remains current boss','underground castle protection','revival blocks finish','permanent kill releases castle','six tier-reference baseline outcomes unchanged'],baseline},null,2));
console.log('PASS: underground zombie, revival/permanent kill, six unchanged tier reference outcomes');process.exit(0);
