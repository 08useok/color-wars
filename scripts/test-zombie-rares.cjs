const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),make=require('./full-harness.cjs');
const added=['assets/zombie-rares-motion/motion-atlases.js','zombie-rares.js'];
const e=make({fresh:true,extraSetup:`chapterBonusCount=()=>3;gachaOwns=id=>gacha.owned.includes(id);globalThis.__zrare={pool:GACHA_RARE,owned:gacha.owned,unlock:allyUnlocked,select:i=>selectedStage=i,atlases:NEW_ATLASES,profiles:PROFILE_ART,resolve:resolveAttack,target,animate:animateAtlas,draw:drawUnit,random:f=>Math.random=f,treasures:n=>{cosmosTreasureCount=()=>n;},badges:codexTraitBadges};`});
const h=globalThis.__zrare;delete globalThis.__zrare;
const baseline=make({fresh:true,addons:make.DEFAULT_ADDONS.filter(f=>!added.includes(f)),extraSetup:'chapterBonusCount=()=>3;'});
e.setProfile({level:30});baseline.setProfile({level:30});
assert.equal(e.roster.length,baseline.roster.length+2);assert.deepEqual(e.stageList,baseline.stageList,'stage content/IDs unchanged');
for(const id of baseline.roster)for(const form of [1,2])assert.deepEqual(e.unitStats(id,30,form),baseline.unitStats(id,30,form),id+' existing stats');
const deckSource=fs.readFileSync(path.join(__dirname,'../deck.js'),'utf8');
const reasons=new Function(deckSource.slice(deckSource.indexOf('function deckCounterReasons'),deckSource.indexOf('const ENDGAME_DECK'))+';return deckCounterReasons;')();
const expected={smoke:{hp:25000,atk:150,cost:600,cooldown:10,range:320,interval:4,frames:30},ash:{hp:60000,atk:50,cost:350,cooldown:8,range:150,interval:3,frames:27}};
h.select(48);
for(const [id,t]of Object.entries(expected)){
 assert.equal(e.gradeOf(id),'rare');assert(h.pool.some(u=>u.id===id));assert(!h.unlock(id));h.owned.push(id);assert(h.unlock(id));
 for(const form of [1,2]){
  const s=e.unitStats(id,30,form);if(form===2){assert.equal(s.hp,t.hp);assert.equal(s.atk,t.atk);}
  assert.equal(s.cost,t.cost);assert.equal(s.cooldown,t.cooldown);assert.equal(s.range,t.range*.034);assert.equal(s.interval,t.interval);assert.equal(s.blindSpot,false);
  assert(!s.zombieKiller&&!s.soulAttack&&!s.critChance&&!s.wave&&!s.surge&&!s.massiveVs);
  assert(reasons(s,'zombie').length);for(const trait of ['red','floating','black','angel','alien','metal','traitless'])assert.deepEqual(reasons(s,trait),[],id+' / '+trait);
  const a=form===1?h.atlases[id]:h.atlases[id].evolved;
  const file=path.join(__dirname,'..',a.sheet.split('?')[0]),png=fs.readFileSync(file),width=png.readUInt32BE(16),height=png.readUInt32BE(20);
  for(const [mode,count]of Object.entries({idle:60,walk:18,attack:t.frames,hurt:1})){
   assert.equal(a[mode].length,count);for(const [x,y,w,hh]of a[mode])assert(x>=0&&y>=0&&w>0&&hh>0&&x+w<=width&&y+hh<=height,id+' '+mode+' atlas bounds');
  }
  assert(fs.existsSync(path.join(__dirname,'..',h.profiles[id][form-1].split('?')[0])));
 }
}
function setup(id){e.reset();h.select(48);const g=e.getGame();g.running=true;g.tutorial=99;g.spawnRules=[];g.money=1e9;e.addUnit(id);const u=g.units.at(-1);u.x=60;return {g,u};}
function foe(g,id,x=55){e.addUnit(id);const v=g.units.at(-1);v.x=x;v.emerging=false;v.kbTime=0;v.hp=v.max=1e9;v.stats.knockbacks=1;return v;}
// Probabilistic status: exact success/failure branches and non-zombie exclusion.
for(const n of [0,3]){
 h.treasures(n);const {g,u}=setup('smoke'),z=foe(g,'zoge'),plain=foe(g,'dog');h.random(()=>0);e.damage(z,10,u);e.damage(plain,10,u);
 assert.equal(z.freezeUntil,2*(1+.2*(n/3)));assert(!(plain.freezeUntil>0));
 const fail=foe(g,'zoge');h.random(()=>.75);e.damage(fail,10,u);assert(!(fail.freezeUntil>0));
}
// Real range-attack path must reach both front zombies, but not the buried one.
{const {g,u}=setup('smoke'),a=foe(g,'zoge',55),b=foe(g,'zoge',54),buried=foe(g,'zoge',53);buried.burrowing=true;buried.burrowLeft=10;u.pendingAttack={remaining:0};u.attackTime=1;u.atkCd=10;h.random(()=>0);e.update(1/30);assert(a.hp<1e9&&b.hp<1e9);assert(a.freezeUntil>0&&b.freezeUntil>0);assert.equal(buried.hp,1e9);}
// Resistance follows standard fruit treasure rules; HP itself does not inflate.
for(const n of [0,3]){
 h.treasures(n);const {g,u}=setup('ash'),z=foe(g,'zoge'),plain=foe(g,'dog');u.hp=u.max=1e6;u.stats.knockbacks=1;e.damage(u,1000,z);assert.equal(1e6-u.hp,n===0?250:200);
 u.hp=1e6;e.damage(u,1000,plain);assert.equal(1e6-u.hp,1000);
}
// No zombie kill/soul attack, and Ash stays a single-target attacker.
for(const id of ['smoke','ash']){
 const {g,u}=setup(id),z=foe(g,'zoge');z.hp=1;e.damage(z,10,u);assert(z.reviveAt,id+' zombie revives');
 const buried=foe(g,'zoge');buried.emerging=true;assert.notEqual(h.target(u),buried);
 for(const form of [1,2]){u.stats=e.unitStats(id,30,form);u.animTime=0;u.attackTime=0;u.hurtTime=0;h.draw(u);h.animate(u);u.attackTime=.5;h.animate(u);u.hurtTime=.5;h.animate(u);}
}
{const {g,u}=setup('ash'),a=foe(g,'zoge',58),b=foe(g,'zoge',57);h.resolve(u,a);assert(a.hp<1e9);assert.equal(b.hp,1e9,'Ash single target');}
console.log('PASS Smoke + Ash: both forms/stats/assets/pool/ownership/counter filters, zombie-only freeze/area/probability, resistance/fruit treasures, buried exclusion/revival, single-target Ash, unchanged roster/stages');process.exit(0);
