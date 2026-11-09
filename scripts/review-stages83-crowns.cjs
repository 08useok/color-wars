const fs=require('node:fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs'),{runJobs,close}=require('./sim-pool.cjs');
const e=make({extraSetup:'globalThis.__c83={select:(i,c)=>{selectedStage=i;legendCrown=c},legal:allyStageAllowed};'}),h=globalThis.__c83;delete globalThis.__c83;
const normal={balanced:['red','yellow','ivory','blossom','lightcream','drumscarlet','sapphire','raspberry','salmon','ruby'],ocean:['red','ivory','blossom','lightcream','drumscarlet','ocean','sapphire','raspberry','salmon','ruby']};
const rare={classic:['white','brown','brick','moss','silver','navy','lava','magenta','ribbonorange','garnet'],modern:['explorermintcyan','lightcream','babyblue','clover','fusioncream','magenta','garnet','lapis','silver','moss']};
const jobs=[];e.setProfile({level:30,trueFormsAll:true,readvents:true});
for(let k=415;k<=432;k++)for(const crown of [2,3,4])for(const [deckName,deck]of Object.entries(crown===4?rare:normal)){
 const i=e.legendIdx(k);h.select(i,crown);for(const id of deck)assert(h.legal(id),'illegal '+id+' crown '+crown);
 for(const policy of ['auto','smart2'])for(const seed of [1,2,3])jobs.push({i,k,crown,name:e.stageList[i].name,deckName,deck,policy,seed,limit:600,profile:{level:30,trueFormsAll:true,readvents:true,maxIncome:true}});
}
(async()=>{
 console.log('START',jobs.length,'battles, crown2/3/4, legal decks');
 const results=await runJobs(jobs,{onProgress:(n,t)=>console.log('progress',n+'/'+t)});close();
 if(results.some(r=>r.error))throw Error(JSON.stringify(results.filter(r=>r.error)));
 const rows=[];for(let k=415;k<=432;k++)for(const crown of [2,3,4]){
  const samples=jobs.flatMap((j,i)=>j.k===k&&j.crown===crown?[{deck:j.deckName,policy:j.policy,seed:j.seed,...results[i]}]:[]),wins=samples.filter(r=>r.win).sort((a,b)=>a.seconds-b.seconds);
  rows.push({k,crown,name:e.stageList[e.legendIdx(k)].name,wins:wins.length,total:samples.length,best:wins[0]||null,samples});
 }
 const out={date:'2026-11-09',scope:'18 maps x crowns2/3/4, 2 legal decks, auto/smart2, seeds1/2/3, Lv30, released true forms, max income, limit600s',normal,rare,rows};
 fs.writeFileSync('docs/simulations/stages83-crowns-2026-11-09.json',JSON.stringify(out,null,2));
 console.log('DONE',JSON.stringify({wins:rows.reduce((n,r)=>n+r.wins,0),total:jobs.length,cleared:rows.filter(r=>r.wins).length,conditions:rows.length,unwon:rows.filter(r=>!r.wins).map(({k,crown,name})=>({k,crown,name}))}));process.exit(0);
})().catch(err=>{close();console.error(err);process.exit(1);});
