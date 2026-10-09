const fs=require('fs'),assert=require('assert/strict');
const harness=fs.readFileSync(require.resolve('./battle-harness.cjs'),'utf8').replace('stageList:STAGES,','enemyOrder:ENEMY_ORDER,badges:codexTraitBadges,setRandom:n=>{Math.random=()=>n},stageList:STAGES,');
const mod={exports:{}};new Function('require','module','__dirname',harness)(require,mod,__dirname);
const e=mod.exports({optimized:false});e.setRandom(0);
const enemies=Object.keys(e.units).filter(t=>!e.roster.includes(t));
assert.deepEqual(enemies.filter(t=>!e.enemyOrder.includes(t)),[]);
assert.equal(new Set(e.enemyOrder).size,e.enemyOrder.length);
for(const r of Object.values(e.spawnList).flat())assert(e.enemyOrder.includes(r.type),r.type);
function pair(type){e.reset();const g=e.getGame();g.money=100000;g.running=true;e.addUnit('red');e.addUnit(type);const v=g.units.find(u=>u.ally),u=g.units.find(u=>u.type===type);v.x=50;u.x=45;v.emerging=u.emerging=false;v.hp=v.max=1000000;v.stats={...v.stats,armor:1,knockbacks:1};return {g,u,v};}
for(const [type,key,value] of [['sael','slowUntil',2],['maawth','freezeUntil',2],['phace','freezeUntil',2],['lemurr','atkDownUntil',10],['clione','atkDownUntil',10]]){
 const {u,v,g}=pair(type);e.damage(v,1,u);assert.equal(v[key],g.elapsed+value,type);assert(e.badges(e.units[type]).some(x=>/둔화|정지|감소/.test(x)),type);
 if(type==='lemurr'||type==='clione')assert(Math.abs(v.atkDownMult-(type==='lemurr'?.2:.1))<1e-9);
}
{const {u,v}=pair('krabbe');e.damage(u,u.hp+1,v);assert.equal(u.hp,1);assert(u.survived);u.kbTime=0;e.damage(u,10,v);assert.equal(u.hp,0);}
{const {u,v}=pair('ursamajor');e.damage(v,100,u);const normal=1000000-v.hp;v.hp=1000000;u.hp=u.max*.5;e.damage(v,100,u);assert.equal(1000000-v.hp,normal*2);}
{const {u,v}=pair('nimoy');e.damage(v,1,u);assert(v.kbTime>0);}
{const {u,v,g}=pair('liz56');v.x=65;e.resolveAttack(u,null);assert(v.hp<1000000,'wave hits beyond direct attack range');assert(g.waveFx.length>0);}
console.log('PASS: 9 enemy abilities activate, codex badges appear, all '+e.enemyOrder.length+' enemy types and all stage spawns are listed.');
