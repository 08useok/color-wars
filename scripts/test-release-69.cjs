const assert=require('assert/strict'),fs=require('fs'),make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__r69={resolveAttack,traitMult,badges:codexTraitBadges,atlas:NEW_ATLASES,pool:GACHA_UBER,series:UBER_SERIES,setStage:i=>selectedStage=i,random:f=>Math.random=f};`});
const t=globalThis.__r69;delete globalThis.__r69;t.setStage(48);
const c=e.unitStats('crisp'),c1=e.unitStats('crisp',30,1);
assert.equal(c.hp,180000);assert.equal(c.atk,12000);assert.equal(c.cost,2400);assert.equal(c1.cost,2400);assert.equal(c.cooldown,28);assert.equal(c.interval,1.6);assert.equal(e.gradeOf('crisp'),'uber');
assert(t.pool.some(x=>x.id==='crisp'));assert.equal(t.series.crisp,'복싱즈');
assert.equal(t.traitMult(c,{trait:'red'})[1],.2);assert.equal(t.traitMult(c,{trait:'black'})[1],1);
function battle(){e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.money=999999;g.spawnRules=[];return g;}
function pair(type,foe='dog'){const g=battle();e.addUnit(type);e.addUnit(foe);const u=g.units.find(u=>u.ally),v=g.units.find(u=>!u.ally);assert(u&&v);u.x=50;v.x=46;v.hp=v.max=1e8;v.stats.hp=1e8;u.hp=u.max=1e8;return {g,u,v};}
{const {u,v}=pair('crisp');t.random(()=>.99);const hp=v.hp;t.resolveAttack(u,v,.5);assert.equal(hp-v.hp,6000);v.kbTime=0;t.random(()=>0);t.resolveAttack(u,v,.5);assert.equal(hp-v.hp,24000);assert.equal(u.stats.atk,12000);}
const l2=e.unitStats('lava');e.setProfile({trueForms:['lava']});const l3=e.unitStats('lava');assert.equal(l3.hp,Math.round(l2.hp*1.5));assert.equal(l3.atk,Math.round(l2.atk*1.4));assert.equal(l3.range,l2.range*1.1);assert.equal(l3.interval,3.2);assert(!l3.waveImmune);assert.equal(l3.cost,l2.cost);assert.equal(l3.cooldown,l2.cooldown);assert(t.badges(l3).some(x=>x.includes('검은 적 피해 무효')));
{const {u,v,g}=pair('lava','twocan');t.random(()=>0);const hp=u.hp;e.damage(u,1000,v);assert.equal(u.hp,hp);assert.equal(u.dodgeUntil,g.elapsed+3.3);v.type='dog';v.stats=e.unitStats('dog');e.damage(u,1000,v);assert.equal(u.hp,hp-1000);assert(u.stats.dodge);}
assert(t.atlas.crisp.evolved.attack.length===6&&t.atlas.lava.true.attack.length===4);
const result={crisp:c,crispFirst:c1,lavaSecond:l2,lavaThird:l3,checks:['two hit shares','independent savage rolls','red-only resist','black-only dodge including active duration','gacha series','true form assets','unchanged price/reproduction']};
fs.writeFileSync('docs/simulations/release-6.9.0-2026-10-22.json',JSON.stringify(result,null,2));console.log('PASS: Crisp and Lava third-form combat, stats, series, assets and ability scope');process.exit(0);
