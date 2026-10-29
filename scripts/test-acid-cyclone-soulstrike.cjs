const assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const e=make({extraSetup:`globalThis.__soul={event:ZYCLONE_EVENT,select:i=>selectedStage=i,resolve:resolveAttack,base:()=>data.bases.enemy};`}),p=globalThis.__soul;delete globalThis.__soul;
for(const form of [1,2]){
 e.training.forms.acid=form;p.select(p.event.index);e.reset();const g=e.getGame();g.running=true;g.paused=false;g.auto=false;g.tutorial=99;g.spawnRules=[];g.money=1e9;
 e.addUnit('red');e.addUnit('acid');e.addUnit('zyclone',true);const red=g.units.find(u=>u.type==='red'),acid=g.units.find(u=>u.type==='acid'),boss=g.units.find(u=>u.type==='zyclone');
 red.emerging=acid.emerging=boss.emerging=false;red.x=acid.x=60;boss.x=55;
 e.damage(boss,1e10,red);assert(boss.reviveAt!==undefined);assert.equal(g.cyBossDown,false);p.base().hp=0;assert.equal(p.base().hp,1);
 // An out-of-range soul must not be removed and cannot unlock the castle.
 acid.x=95;p.resolve(acid,boss);assert(boss.reviveAt!==undefined);assert.equal(g.cyBossDown,false);
 acid.x=60;p.resolve(acid,boss);assert.equal(boss.reviveAt,undefined);assert.equal(g.cyBossDown,true);const money=g.money;p.resolve(acid,boss);assert.equal(g.money,money,'no duplicate reward');
 p.base().hp=0;assert.equal(p.base().hp,0,'soulstrike permits castle destruction');
}
console.log('PASS: Acid first/second forms, waiting boss blocks castle, out-of-range soul preserved, soulstrike cancels revival and releases castle, reward once.');process.exit(0);
