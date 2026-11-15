const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),make=require('./full-harness.cjs');
const added=['assets/slate-motion/motion-atlases.js','slate.js'];
const deckSource=fs.readFileSync(path.join(__dirname,'../deck.js'),'utf8');
const deckReasons=new Function(deckSource.slice(deckSource.indexOf('function deckCounterReasons'),deckSource.indexOf('const ENDGAME_DECK'))+';return deckCounterReasons;')();
const e=make({fresh:true,extraSetup:`chapterBonusCount=()=>3;gachaOwns=id=>gacha.owned.includes(id);globalThis.__slate={pool:GACHA_RARE,owned:gacha.owned,unlock:allyUnlocked,select:i=>selectedStage=i,atlases:NEW_ATLASES,profiles:PROFILE_ART,resolve:resolveAttack,target,animate:animateAtlas,draw:drawUnit,deadZone};`});
const h=globalThis.__slate;delete globalThis.__slate;
const baseline=make({fresh:true,addons:make.DEFAULT_ADDONS.filter(f=>!added.includes(f)),extraSetup:'chapterBonusCount=()=>3;'});
e.setProfile({level:30});baseline.setProfile({level:30});
assert.equal(e.roster.length,baseline.roster.length+1);assert.deepEqual(e.stageList,baseline.stageList,'no stage changes');
for(const id of baseline.roster)for(const form of [1,2])assert.deepEqual(e.unitStats(id,30,form),baseline.unitStats(id,30,form),id+' existing stats');
assert.equal(e.gradeOf('slate'),'rare');assert(h.pool.some(u=>u.id==='slate'));
assert(!h.unlock('slate'));h.owned.push('slate');assert(h.unlock('slate'));
h.select(48);e.setProfile({level:30});
for(const form of [1,2]){
 const s=e.unitStats('slate',30,form);
 assert.equal(s.cost,450);assert.equal(s.cooldown,8);assert.equal(s.interval,2);assert.equal(s.range,400*.034);
 assert.equal(s.blowChance,1);assert.deepEqual(s.blowVs,['zombie']);assert.equal(s.blindSpot,false);
 assert.deepEqual(deckReasons(s,'zombie'),['날려버리기']);
 for(const trait of ['red','floating','black','metal','angel','alien','traitless'])assert.deepEqual(deckReasons(s,trait),[],trait+' counter filter');
 assert(!s.area&&!s.zombieKiller&&!s.soulAttack&&!s.critChance&&!s.wave&&!s.surge&&!s.massiveVs);
 if(form===2){assert.equal(s.hp,40000);assert.equal(s.atk,100);}
 const a=form===1?h.atlases.slate:h.atlases.slate.evolved;
 for(const [mode,count]of Object.entries({idle:60,walk:18,attack:24,hurt:1}))assert.equal(a[mode].length,count);
 assert(fs.existsSync(path.join(__dirname,'..',a.sheet.split('?')[0])));
 assert(fs.existsSync(path.join(__dirname,'..',h.profiles.slate[form-1].split('?')[0])));
}
h.select(0);assert.equal(e.unitStats('slate').cost,300,'chapter 1 price discount');h.select(48);
function setup(){e.reset();h.select(48);const g=e.getGame();g.running=true;g.tutorial=99;g.spawnRules=[];g.money=1e9;e.addUnit('slate');const u=g.units.at(-1);u.x=60;return {g,u};}
function foe(g,id,x=55){e.addUnit(id);const v=g.units.at(-1);v.x=x;v.emerging=false;v.kbTime=0;v.hp=v.max=1e9;v.stats.knockbacks=1;return v;}
for(const id of ['zoge','pigge','dog','metaldoge','gregory','gabriel','darkdog','mooth']){
 const {g,u}=setup(),v=foe(g,id);e.damage(v,10,u);
 assert.equal(v.hp,1e9-(id==='metaldoge'?1:id==='gregory'?0:10));
 assert.equal(v.kbTime>0,id==='zoge',id+' trait push restriction');
}
{const {g,u}=setup(),v=foe(g,'zoge');v.stats.knockbackImmune=true;e.damage(v,10,u);assert.equal(v.kbTime,0,'respect knockback immunity');}
{const {g,u}=setup(),a=foe(g,'zoge',55),b=foe(g,'zoge',54);h.resolve(u,a);assert(a.kbTime>0);assert.equal(b.hp,1e9,'single target');assert.equal(b.kbTime,0);}
{const {g,u}=setup(),v=foe(g,'zoge',55);v.emerging=true;assert.notEqual(h.target(u),v,'buried zombies excluded');v.emerging=false;v.hp=1;e.damage(v,10,u);assert(v.reviveAt,'no zombie killer: defeated zombie revives');}
// The new optional field must not restrict existing unrestricted pushes.
{const {g,u}=setup(),v=foe(g,'dog');u.stats={...u.stats,blowVs:undefined};e.damage(v,10,u);assert(v.kbTime>0);}
// Exercise real atlas positioning code despite the harness skipping animation.
{const {u}=setup();for(const form of [1,2]){u.stats=e.unitStats('slate',30,form);u.animTime=0;u.attackTime=0;u.hurtTime=0;h.draw(u);h.animate(u);u.attackTime=.5;h.animate(u);u.hurtTime=.5;h.animate(u);}}
console.log('PASS Slate: both forms/stats/ownership/pool/assets, unchanged roster/stages, zombie-only single-target push, immunity, buried exclusion, revival, old pushes, atlas animation');process.exit(0);
