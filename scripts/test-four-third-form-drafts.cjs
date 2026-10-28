const assert=require('assert/strict'),fs=require('fs'),make=require('./full-harness.cjs');
const ids=['lavender','azure','aqua','babyblue'];
const api=`globalThis.__third72={ready:trueFormAssetReady,can:canTrueForm,resolve:resolveAttack,cooldown:unitCooldown,setStage:i=>selectedStage=i,rng:f=>Math.random=f};`;
const locked=make({extraSetup:ids.map(id=>`delete NEW_ATLASES.${id}.true;`).join('\n')+api}),l=globalThis.__third72;delete globalThis.__third72;
l.setStage(48);
for(const id of ids){assert(!l.ready(id));assert(!l.can(id));locked.setProfile({trueForms:ids});assert(!locked.unitStats(id).trueForm);}
// Test the actual registered third-form art; the separate engine above removes it to check the gate.
const e=make({extraSetup:api}),t=globalThis.__third72;delete globalThis.__third72;t.setStage(48);
for(const id of ids)assert(t.ready(id),id+' dedicated art');
const rows=[];
for(const id of ids){e.setProfile({trueForms:[]});const second=e.unitStats(id);e.setProfile({trueForms:ids});const third=e.unitStats(id);assert(third.trueForm);
 const hp=id==='azure'?3:1.5,atk=id==='azure'?3:id==='lavender'?1.4:2.5;
 assert.equal(third.hp,Math.round(second.hp*hp));assert.equal(third.atk,Math.round(second.atk*atk));
 if(id!=='babyblue')for(const k of ['cost','cooldown','range'])assert.equal(third[k],second[k],id+' '+k);
 rows.push({id,second,third});
 for(const form of [1,2]){e.setProfile({trueForms:[]});const s=e.unitStats(id,30,form);const r=locked.unitStats(id,30,form);assert.deepEqual(s,r);}
}
const row=id=>rows.find(r=>r.id===id);
assert.equal(row('lavender').third.atkDownChance,1);assert.equal(row('lavender').third.atkDownDuration,7);assert.equal(row('lavender').third.slowDuration,3);assert.equal(row('lavender').third.interval,3);assert.equal(row('lavender').third.windup,undefined);
assert.equal(row('azure').third.wave.chance,.3);assert.equal(row('azure').third.wave.level,10);assert.equal(row('azure').third.wave.reach,77.1);assert.equal(row('azure').third.savageMult,3);
assert.equal(row('aqua').third.slowChance,1);assert.equal(row('aqua').third.slowDuration,8);assert.deepEqual(row('aqua').third.statusVs,['floating','angel']);assert(!row('aqua').third.area);
assert.equal(row('babyblue').third.cooldown,3.8);assert.equal(row('babyblue').third.cost,row('babyblue').second.cost-30);assert.equal(row('babyblue').third.interval,.75);assert.equal(row('babyblue').third.blowChance,.7);assert(!row('babyblue').third.area);
function pair(id,enemy){t.setStage(48);e.setProfile({trueForms:ids});e.reset();const g=e.getGame();g.running=true;g.paused=false;g.tutorial=99;g.money=999999;g.spawnRules=[];e.addUnit(id);e.addUnit(enemy);const u=g.units.find(v=>v.ally),v=g.units.find(v=>!v.ally);assert(u&&v);u.x=60;v.x=55;v.hp=v.max=1e9;v.stats.knockbackImmune=true;return {u,v,g};}
// Low-health strengthening doubles Lavender's damage at the threshold, not above it.
{const {u,v}=pair('lavender','dog');t.rng(()=>.99);u.hp=u.max*.51;const before=v.hp;e.damage(v,100,u);assert.equal(before-v.hp,100);u.hp=u.max*.5;const next=v.hp;e.damage(v,100,u);assert.equal(next-v.hp,200);}
// Slow affects precisely the two agreed traits (duration has normal treasure modifiers).
for(const [enemy,expected]of [['mooth',true],['gabriel',true],['pigge',false]]){const {u,v,g}=pair('aqua',enemy);e.damage(v,100,u);assert.equal((v.slowUntil||0)>g.elapsed,expected,enemy);}
// Both wave chance outcomes execute through actual combat code; no stats are changed.
{let {u,v,g}=pair('azure','dog');t.rng(()=>.99);t.resolve(u,v);assert.equal((g.waveFx||[]).length,0);({u,v,g}=pair('azure','dog'));t.rng(()=>0);t.resolve(u,v);assert((g.waveFx||[]).length>0);}
// Existing cooldown assignment uses the shortened value; push probability honors 70%.
for(const [roll,expected]of [[.69,true],[.71,false]]){const {u,v}=pair('babyblue','dog');delete v.stats.knockbackImmune;t.rng(()=>roll);assert.equal(t.cooldown('babyblue'),3.8);e.damage(v,100,u);assert.equal(v.kbTime>0,expected);}
fs.writeFileSync('docs/simulations/four-third-form-drafts-2026-10-28.json',JSON.stringify({lockedWithoutArt:true,fixturesOnly:false,dedicatedArt:true,rows},null,2));
console.log('PASS: four third forms, real art, missing-art gates, first/second forms unchanged, stats/economy, low-health boost, trait-specific slow and actual wave chance.');process.exit(0);
