const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const make=require('./full-harness.cjs'),{runJobs}=require('./sim-pool.cjs');
const engine=make(),maps=engine.stageList.map((s,i)=>({s,i})).filter(x=>x.s.cyclone);
const decks={
 basic:['red','yellow','orange','green','cyan','blue','purple','pink'],
 floating:['yellow','garnet','indigo','crystal','cornflower','cream','ribbonorange','lapis','rainbow'],
 angel:['yellow','garnet','beige','ruby','cornflower','ribbonorange','obsidian','lapis','rainbow'],
 variants:['yellow','garnet','herbmint','kendonavy','alchemypurple','rhythmpink','indigo','beige','rainbow']
};
const jobs=[];for(const {i,s}of maps)for(const [deckName,deck]of Object.entries(decks))for(const policy of ['auto','smart2'])for(let seed=1;seed<=6;seed++)jobs.push({i,crown:1,deck,seed,policy,profile:{level:20},stage:s.cyclone,deckName,limit:300});
// Controlled actual attack loops verify target traits, status application, damage and timing independently of win rates.
const controlled=make({extraSetup:`
 var cycloneChecks=[];
 function check(v,m){if(!v)throw Error(m);cycloneChecks.push(m)}
 selectedStage=STAGES.findIndex(s=>s.cyclone==='red');reset();game.running=true;game.paused=false;game.tutorial=99;game.money=999999;
 Math.random=()=>0;game.spawnRules=[];
 for(const t of ['herbmint','kendonavy','alchemypurple','rhythmpink']){
  game.units=[];game.money=999999;game[cooldownKey(t)]=0;addUnit(t);addUnit('metalhippo');const a=game.units[0],v=game.units[1];a.emerging=v.emerging=false;a.x=60;v.x=55;v.hp=v.max=10000000;v.stats.atk=0;const hp=v.hp;
  for(let n=0;n<32;n++)update(1/30);
  check(v.hp<hp,t+' lands damage through combat loop');
  if(t==='herbmint')check(v.slowUntil>game.elapsed,'mint slows metal');
  if(t==='rhythmpink')check(v.freezeUntil>game.elapsed,'pink freezes metal');
  if(t==='kendonavy'||t==='alchemypurple')check(hp-v.hp>1,t+' critical bypasses metal');
 }
 for(const t of ['redcyclone','blackcyclone','whitecyclone','angelcyclone']){
  game.units=[];game.money=999999;game[cooldownKey('red')]=0;addUnit('red');addUnit(t);const a=game.units[1],v=game.units[0];check(!!a&&!!v,t+' spawn');a.emerging=v.emerging=false;a.x=55;v.x=56;v.hp=v.max=1e10;v.stats.atk=0;a.atkCd=0;game.spawnRules=[];
  if(t==='blackcyclone')a.stats.blowChance=0;const hp=v.hp;for(let n=0;n<30;n++)update(1/30);const hits=(hp-v.hp)/a.stats.atk;
  check(hits>=5&&hits<=6,t+' fast repeated attack ('+hits+')');
 }
 game.units=[];game.money=999999;game[cooldownKey('indigo')]=0;addUnit('indigo');addUnit('angelcyclone');const from=game.units[0],angel=game.units[1];from.stats.statusVs=['floating'];from.stats.freezeChance=1;from.stats.freezeDuration=10;from.stats.atk=1;damage(angel,1,from);check(!angel.freezeUntil||angel.freezeUntil<=game.elapsed,'angel rejects floating freeze');from.stats.statusVs=['angel'];damage(angel,1,from);check(angel.freezeUntil>game.elapsed,'angel accepts angel freeze');
 
 game.units=[];game.money=999999;game[cooldownKey('red')]=0;addUnit('red');addUnit('blackcyclone');const pushTarget=game.units[0],pushFrom=game.units[1];pushTarget.hp=pushTarget.max=1e9;damage(pushTarget,1,pushFrom);check(pushTarget.kbTime>0,'black cyclone actually blows target away');
 for(const t of ['herbmint','rhythmpink']){game.units=[];game.money=999999;game[cooldownKey(t)]=0;addUnit(t);addUnit('dog');const a=game.units[0],v=game.units[1];v.hp=1e9;damage(v,1,a);check(!v.slowUntil&&!v.freezeUntil,t+' does not affect nonmetal');}
 for(const event of CYCLONE_EVENTS){selectedStage=event.index;reset();game.running=true;game.tutorial=99;game.units=[];game.spawnRules=game.spawnRules.filter(r=>r.boss);game.elapsed=0;data.bases.enemy.hp=data.bases.enemy.max;updateStageSpawns(1/30);check(!game.units.length,event.id+' boss not premature');if(event.id==='white')game.elapsed=2000/30;else data.bases.enemy.hp=data.bases.enemy.max*.99;updateStageSpawns(1/30);check(game.units.filter(u=>u.type===event.boss).length===1,event.id+' correct boss trigger');game.elapsed+=100;updateStageSpawns(1/30);check(game.units.filter(u=>u.type===event.boss).length===1,event.id+' exactly one boss');}
 globalThis.__cycloneChecks=cycloneChecks;

`});
(async()=>{const checks=globalThis.__cycloneChecks;delete globalThis.__cycloneChecks;console.log('Controlled:',checks.length,'passed');const results=await runJobs(jobs,{onProgress:(n,total)=>console.log(n+'/'+total)});assert(!results.some(r=>r.error),JSON.stringify(results.filter(r=>r.error)));const summary=[];for(const {s}of maps)for(const deckName of Object.keys(decks))for(const policy of ['auto','smart2']){const rows=results.filter((r,i)=>jobs[i].stage===s.cyclone&&jobs[i].deckName===deckName&&jobs[i].policy===policy);summary.push({stage:s.cyclone,deck:deckName,policy,wins:rows.filter(r=>r.win).length,total:rows.length,seconds:rows.map(r=>r.seconds)})}const out=path.resolve(__dirname,'../work/cyclone');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'combat-results.json'),JSON.stringify({checks,summary,jobs,results},null,2));console.log(JSON.stringify(summary));process.exit(0)})().catch(e=>{console.error(e);process.exit(1)});
