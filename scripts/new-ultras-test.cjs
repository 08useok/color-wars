const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),e=require('./battle-harness.cjs')({optimized:false});
for(const type of ['iron','grey','carmine']){
 assert.equal(e.gradeOf(type),'uber');assert(e.roster.includes(type));
 const one=e.unitStats(type,30,1),two=e.unitStats(type,30,2);
 assert.equal(one.cost,two.cost);assert(two.hp>one.hp);assert(two.atk>one.atk);
 for(const evolved of [false,true]){
  assert(!/undefined|NaN/.test(e.profileMarkup(type,evolved)));
  const a=evolved?e.atlases[type].evolved:e.atlases[type];assert(a.attack.length>=31);
  assert(fs.existsSync(path.join(root,a.sheet.split('?')[0])));
 }
}
assert.equal(e.unitStats('grey',30,2).wave.reach,46);
assert.equal(e.unitStats('carmine',30,2).slowChance,.65);
assert.deepEqual(e.traitMult(e.unitStats('iron',30,2),{trait:'zombie'}),[1.8,.5]);
assert.deepEqual(e.traitMult(e.unitStats('carmine',30,2),{trait:'red'}),[1.8,.5]);
// Verify actual combat deaths, delayed revival and zombie-killer prevention.
e.units.testzombie={trait:'zombie',hp:100,atk:1,interval:100,speed:0,range:1,reward:100,knockbacks:1,reviveDelay:1};
function victim(){e.reset();const g=e.getGame();g.running=true;g.tutorial=6;g.spawnRules=[];e.addUnit('testzombie');return g.units.find(u=>u.type==='testzombie')}
let v=victim();e.damage(v,10000,{type:'red',ally:true,stats:{}});let g=e.getGame();assert.equal(g.money,0);assert.equal(g.units.length,0);assert.equal(g.defeated.length,1);
for(let i=0;i<40;i++)e.update(1/30);assert(g.units.includes(v));assert.equal(v.hp,50);
e.damage(v,10000,{type:'red',ally:true,stats:{}});assert(g.money>0);assert.equal(v.reviveAt,undefined);
v=victim();e.damage(v,10000,{type:'iron',ally:true,stats:e.unitStats('iron',30,2)});g=e.getGame();assert.equal(v.reviveAt,undefined);assert(g.money>0);for(let i=0;i<40;i++)e.update(1/30);assert(!g.units.includes(v));
const source=fs.readFileSync(path.join(root,'gacha.js'),'utf8'),ctx={data:{units:e.units}};vm.createContext(ctx);
vm.runInContext(source.match(/const GACHA_PRISM=.*;/)[0]+source.match(/const GACHA_UBER=.*;/)[0]+source.match(/function gachaUberPool\(\).*$/m)[0]+';this.pool=gachaUberPool();',ctx);
assert.equal(ctx.pool.length,6);for(const t of ['iron','grey','carmine'])assert(ctx.pool.some(u=>u.id===t));
console.log('PASS: all six forms, prices, growth, profiles, atlas files, trait bonuses, upgraded skills, six-unit Uber pool, delayed zombie revival and killer prevention.');
