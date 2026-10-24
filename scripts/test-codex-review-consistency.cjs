const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const extra=['ally-comparison.js','codex-review.js','codex-review-consistency.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n');
const setup=`var gachaRoll=()=>({}),grantEx=()=>false;`+fs.readFileSync('progression.js','utf8')+extra+`;
globalThis.__codexCheck={data,stats:codexReviewStats,metrics:codexDirectMetrics,packets:codexDirectPackets,review:allyReview,assets:trueFormAssetReady,open:trueFormOpen,forms:trueForms,progression,resolve:resolveAttack,hit:damage,setStage:i=>selectedStage=i,setClear:all=>{cleared=all?STAGES.map((_,i)=>i):[]},snapshot:()=>JSON.stringify({training,cleared,trueForms,progression,selectedStage}),prepare(){selectedStage=CHAPTER1_LEN;reset();game.running=true;game.tutorial=6;game.spawnRules=[];data.bases.enemy.hp=1e12;},game:()=>game,element:()=>document.createElement('div'),rng:v=>Math.random=()=>v};`;
const engine=make({fresh:true,extraSetup:setup}),p=globalThis.__codexCheck;delete globalThis.__codexCheck;
let forms=0,combatChecks=0;const report=[],profileCounts={};
const enemies={plain:'dog',red:'pigge',floating:'mooth',black:'darkdog',angel:'gabriel',alien:'shibalien',zombie:'zoge',metal:'metaldoge'};
function distance(s){if(s.damageTiers){let from=0,best=null;for(const t of s.damageTiers){const lo=Math.max(from,s.zoneMin||0),hi=Math.min(t.max,s.zoneMax??s.range);if(lo<hi&&(!best||t.dmg>best.dmg))best={dmg:t.dmg,d:(lo+hi)/2};from=t.max;}if(best)return best.d;}return ((s.zoneMin??(s.blindSpot?s.range*.25:0))+(s.zoneMax??s.range))/2;}
function actual(s,type,trait,critical,savage=false){
 p.prepare();const g=p.game(),source={type,ally:true,hp:1e9,max:1e9,x:90,stats:{...s,wave:null,surge:null,savageChance:savage?1:0,critChance:critical?1:0,push:0,pull:false,blowChance:0,forceKnockback:false,bossDamage:0,markChance:0,rage:0,strengthen:null},el:p.element()},victim={type:enemies[trait],ally:false,hp:1e10,max:1e10,x:90-distance(s),kb:0,kbTime:0,guardUntil:0,invulnerableUntil:0,stats:{knockbackImmune:true,knockbacks:1},el:p.element()};
 g.units=[source,victim];const before=victim.hp;
 if(s.boomerang){p.hit(victim,s.atk,source);p.hit(victim,s.atk*(s.returnMult||1),source);}else if(s.projectile){p.hit(victim,s.atk,source);}else for(const h of s.hits?.length?s.hits:[{share:1}]){source.currentHit=h;p.resolve(source,victim,h.share??1);}
 return before-victim.hp;
}
for(const treasure of [false,true]){
 p.setClear(treasure);const startForms=forms;
 for(const type of engine.roster){
  const available=[1,...(!p.data.units[type].noEvolve?[2]:[]),...(p.assets(type)&&p.open(type)?[3]:[])];
  for(const form of available){
   p.forms.length=0;if(form===3)p.forms.push(type);p.progression.plus[type]=0;
   p.setStage(engine.stageList.length-1);const saved=p.snapshot(),s=p.stats(type,form!==1);assert.equal(saved,p.snapshot(),type+' stats changed save');
   p.progression.plus[type]=10;const plus=p.stats(type,form!==1);p.progression.plus[type]=0;
   for(const k of ['hp','atk','range','cost','interval','cooldown']){assert.equal(s[k],plus[k],type+' fixed total level '+k);assert(Number.isFinite(s[k]),type+' finite '+k);}
   assert.equal(s.trueForm===true,form===3,type+' form');
   const html=p.review(type,form!==1);assert(!/NaN|undefined|Infinity/.test(html),type+' invalid displayed value');assert(html.includes('합산 Lv.30')&&!/현재 스테이지에는 좀비 적이 없어|사거리 <b>50|중위권|최하위권|codex-verdict/.test(html),type+' stale review');
   const m=p.metrics(s);for(const trait of Object.keys(enemies)){
    if(s.onlyTraitless&&trait!=='plain'){assert.equal(m.traits[trait].dps,0);continue;}
    if(trait==='metal'&&s.metalKiller){assert.equal(m.traits.metal.dps,null);continue;}
    const normal=actual(s,type,trait,false),critical=actual(s,type,trait,true),chance=s.critChance||0,sc=s.savageChance||0,savage=sc?actual(s,type,trait,false,true):normal,both=sc?actual(s,type,trait,true,true):critical,expected=((normal*(1-chance)+critical*chance)*(1-sc)+(savage*(1-chance)+both*chance)*sc)/s.interval,shown=trait==='plain'?m.expectedDps:m.traits[trait].dps;
    assert(Math.abs(expected-shown)<.005,JSON.stringify({type,form,treasure,trait,normal,critical,expected,shown,stats:s}));combatChecks++;
   }
   if(treasure)report.push({type,form,hp:s.hp,atk:s.atk,range:s.range,dps:m.expectedDps,metal:m.traits.metal.dps});forms++;
  }
 }
 profileCounts[treasure?'complete':'none']=forms-startForms;
}
let metalKillerChecks=0;
for(const type of engine.roster){const s=p.stats(type,false);if(!s.metalKiller)continue;p.prepare();const g=p.game(),from={type,ally:true,hp:1e9,max:1e9,x:50,stats:{...s,critChance:0,savageChance:0,bossDamage:0,pull:false},el:p.element()},v={type:'metaldoge',ally:false,hp:1000000,max:1000000,kbTime:0,guardUntil:0,invulnerableUntil:0,stats:{knockbackImmune:true},el:p.element()};g.units=[from,v];p.hit(v,s.atk,from);assert.equal(1000000-v.hp,1+Math.ceil(1000000*s.metalKiller));metalKillerChecks++;}
fs.writeFileSync('docs/reviews/codex-consistency-verification-2026-10-24.json',JSON.stringify({roster:engine.roster.length,forms:report.length,formProfileCases:forms,profileCounts,treasureProfiles:2,combatChecks,metalKillerChecks,report},null,2));
console.log('PASS',engine.roster.length,'allies',report.length,'available forms,',forms,'form/profile cases, two treasure profiles,',combatChecks,'real resolveAttack/damage comparisons; plus-level invariance, state preservation and stale-text checks.');process.exit(0);
