const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const api=`globalThis.__zy={events:CYCLONE_EVENTS,event:typeof ZYCLONE_EVENT==='undefined'?null:ZYCLONE_EVENT,select:i=>selectedStage=i,base:()=>data.bases.enemy,open:()=>typeof ZYCLONE_EVENT!=='undefined'&&cycloneStageOpen(ZYCLONE_EVENT)};`;
const prev=make({addons:addons.filter(s=>!['zombie-cyclone.js','zyclone-original-atlas.js'].includes(s)&&!s.includes('cheer-dandelion')),extraSetup:api});
const e=make({extraSetup:api}),c=globalThis.__zy;delete globalThis.__zy;
assert.equal(e.stageList.length,prev.stageList.length+1);assert.deepEqual(e.stageList.slice(0,-1),prev.stageList);
for(const [id,s]of Object.entries(prev.units))assert.deepEqual(e.units[id],s,id+' stats');
for(const [id,s]of Object.entries(prev.spawnList))assert.deepEqual(e.spawnList[id],s,id+' spawns');
assert.equal(c.events.length,7);assert.equal(c.event.index,e.stageList.length-1);assert(c.event.rules.every(r=>e.units[r.type]));assert.equal(e.stageList[c.event.index].special.item,'cheerdandelion');
const d=e.units.zyclone;assert.equal(d.hp,1222222);assert.equal(d.atk,44444);assert.equal(d.reviveCount,Infinity);assert.equal(d.reviveDelay,4);assert.equal(d.reviveHp,1);assert(!d.burrow);assert.deepEqual(d.traits,['zombie']);assert.equal(d.range,4.1);assert.equal(d.interval,5/30);
function battle(){c.select(c.event.index);e.reset();const g=e.getGame();g.running=true;g.paused=false;g.tutorial=99;g.spawnRules=[];g.money=1e9;e.addUnit('red');e.addUnit('zyclone',true);const u=g.units.find(v=>v.ally),v=g.units.find(v=>v.type==='zyclone');u.x=80;v.x=30;u.emerging=v.emerging=false;return {g,u,v};}
{const {g,u,v}=battle();e.damage(v,1e10,u);assert.equal(v.hp,0);assert.equal(v.revivesUsed,1);assert.equal(v.reviveAt,4);assert.equal(g.cyBossDown,false);c.base().hp=0;assert.equal(c.base().hp,1,'corpse blocks castle');for(let i=0;i<140;i++)e.update(1/30);assert(g.units.includes(v));assert.equal(v.hp,v.max);assert.equal(v.revivesUsed,1);for(let i=0;i<120&&v.kbTime>0;i++)e.update(1/30);e.damage(v,1e10,u);assert.equal(v.revivesUsed,2);assert(v.reviveAt>g.elapsed);assert.equal(g.cyBossDown,false);}
{const {g,u,v}=battle();u.stats={...u.stats,zombieKiller:true};e.damage(v,1e10,u);assert.equal(v.reviveAt,undefined);assert.equal(g.cyBossDown,true);c.base().hp=0;assert.equal(c.base().hp,0,'permanent kill releases castle');}
e.setCleared([]);assert(!c.open());e.setCleared([143]);assert(c.open());
const rows=[];e.setCleared(e.stageList.map((_,i)=>i));
for(const deck of [['red','yellow','iron','platinum','sapphire','grey','lapis','rainbow','selenite','garnet'],['red','yellow','blue','purple','gold','lavender','aqua','babyblue','azure','coral']])for(const seed of [1,2,3]){e.setProfile({level:30,trueForms:['lavender','azure','aqua','babyblue']});rows.push({deck,seed,result:e.simulate(c.event.index,1,deck,seed,300,'smart2')});}
fs.writeFileSync('docs/simulations/zombie-cyclone-2026-10-28.json',JSON.stringify({index:c.event.index,checks:['append-only map','existing stats/spawns preserved','infinite full-HP revive','corpse blocks castle','zombie-killer permanent kill','chapter gate'],rows},null,2));
console.log('PASS zombie boss/stage, revive and kill gates; battles:',rows.map(r=>[r.seed,r.result.win,r.result.seconds]));process.exit(0);
