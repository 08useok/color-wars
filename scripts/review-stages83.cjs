const fs=require('node:fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs'),{runJobs,close}=require('./sim-pool.cjs');
const e=make({extraSetup:'globalThis.__r83={subs:TRUELEGEND83_SUBS,event:CLIONEL_EVENT,data:TRUELEGEND83_DATA,atlas:NEW_ATLASES};'}),h=globalThis.__r83;delete globalThis.__r83;
assert.equal(h.data.length,18);
const seen=new Set();
for(const [j,row]of h.data.entries()){
 const i=e.legendIdx(415+j),stage=e.stageList[i];assert(!seen.has(i));seen.add(i);
 assert.equal(stage.legend.k,415+j);assert.equal(stage.hp,row.stage.hp);assert.equal(stage.maxEnemies,row.stage.max);
 const sub=e.legendSubOf(415+j);assert.deepEqual([1,2,3,4].map(c=>e.legendCrownMult(c,sub)),[1,1.4,1.8,1]);
 for(const r of e.spawnList[i]){
  assert(e.units[r.type],r.type);assert(h.atlas[r.type]?.sheet,'missing atlas '+r.type);
  assert(fs.existsSync(h.atlas[r.type].sheet.split('?')[0]),r.type+' sheet missing');
  assert(r.mag>0&&Number.isFinite(r.mag));assert(r.at.t>=0||r.at.hp>=0&&r.at.hp<=100);
  if(r.count!==undefined)assert(Number.isInteger(r.count)&&r.count>0);
  if(r.delay)assert(r.delay[0]>=0&&r.delay[1]>=r.delay[0]);
 }
}
const p=e.units.puffington;assert.equal(p.knockbacks,400);assert.equal(p.backRange,350*.034);assert.equal(p.curseChance,1);
const decks={
 balanced:['red','yellow','ivory','blossom','lightcream','drumscarlet','sapphire','raspberry','salmon','ruby'],
 ocean:['red','ivory','blossom','lightcream','drumscarlet','ocean','sapphire','raspberry','salmon','ruby']
};
const cases=[...h.data.map((_,j)=>({i:e.legendIdx(415+j),kind:'truelegend',key:415+j})),{i:h.event.index,kind:'advent',key:'clionel'}];
const jobs=[];
for(const c of cases)for(const [deckName,deck]of Object.entries(decks))for(const policy of ['auto','smart2'])for(const seed of [1,2,3])jobs.push({...c,deckName,deck,crown:1,policy,seed,limit:600,profile:{level:30,trueFormsAll:true,readvents:true,maxIncome:true}});
(async()=>{
 console.log('Static PASS. Simulating',jobs.length,'battles, income max from start, Lv30, released true forms.');
 const results=await runJobs(jobs,{onProgress:(n,t)=>console.log('progress',n+'/'+t)});close();
 const rows=cases.map(c=>{
  const samples=jobs.flatMap((j,i)=>j.i===c.i?[{deck:j.deckName,policy:j.policy,seed:j.seed,...results[i]}]:[]);
  const wins=samples.filter(r=>r.win),best=wins.sort((a,b)=>a.seconds-b.seconds)[0];
  return {...c,name:e.stageList[c.i].name,wins:wins.length,total:samples.length,best:best||null,samples};
 });
 const out={date:'2026-11-09',conditions:'Lv30, released true forms, research/treasure complete, income max from start, seed1/2/3, auto/smart2, limit600s',decks,static:'PASS',rows};
 fs.writeFileSync('docs/simulations/stages83-review-2026-11-09.json',JSON.stringify(out,null,2));
 console.log('RESULT',JSON.stringify(rows.map(({key,name,wins,total,best})=>({key,name,wins,total,best:best&&{deck:best.deck,policy:best.policy,seconds:best.seconds}}))));
 if(results.some(r=>r.error))throw Error('Runtime errors: '+JSON.stringify(results.filter(r=>r.error)));
 process.exit(0);
})().catch(err=>{close();console.error(err);process.exit(1);});
