const fs=require('fs'),path=require('path'),crypto=require('crypto'),{Worker,isMainThread,parentPort,workerData}=require('worker_threads');
const srSuite=workerData?.suite==='sr'||process.argv.includes('--sr');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/simulations/character-stage-comparison'+(srSuite?'-sr':''));
const selection=require('../docs/simulations/validation-stage-selection-2026-10-08.json').conditions;
const core=srSuite?['garnet','lapis','selenite','topaz','ribbonorange','obsidian','onyx','ribbonchart','rainbow']:['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow'];
const fourCore=['onyx','garnet','lapis','selenite','topaz','ribbonorange','obsidian','ribbonchart'];
const sourceHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'game.js'))).digest('hex');
function taskSignature(candidate,seed){return crypto.createHash('sha256').update(JSON.stringify({sourceHash,candidate,seed,selection,core,fourCore,level:30,limit:300,dt:1/30})).digest('hex');}
if(!isMainThread){
 const engine=require('./battle-harness.cjs')();
 parentPort.on('message',job=>{
  try{
   const tasks=srSuite||job.candidate&&['basic','sr'].includes(engine.gradeOf(job.candidate))?selection.filter(t=>t.crown!==4):selection;
   const chosen=job.pilot?tasks.slice(0,100):tasks,rows=[],start=Date.now();
   for(const t of chosen){const deck=[...(t.crown===4?fourCore:core),...(job.candidate?[job.candidate]:[])];if(new Set(deck).size!==deck.length)throw Error('Duplicate candidate');if(t.crown===4&&deck.some(type=>!['rare','ex'].includes(engine.gradeOf(type))))throw Error('Ineligible 4-star deck');
    const result=engine.simulate(t.i,t.crown,deck,job.seed);rows.push({i:t.i,crown:t.crown,...result});
   }
   const result={candidate:job.candidate,name:job.candidate?engine.names[job.candidate]:'빈 슬롯',grade:job.candidate?engine.gradeOf(job.candidate):'reference',seed:job.seed,signature:taskSignature(job.candidate,job.seed),count:rows.length,wins:rows.filter(r=>r.win).length,losses:rows.filter(r=>!r.win&&!r.timeout).length,timeouts:rows.filter(r=>r.timeout).length,milliseconds:Date.now()-start,rows};
   if(!job.pilot){fs.mkdirSync(out,{recursive:true});const filename=path.join(out,`${job.candidate||'empty'}-seed${job.seed}.json`);fs.writeFileSync(filename+'.tmp',JSON.stringify(result));fs.renameSync(filename+'.tmp',filename);}
   parentPort.postMessage({candidate:job.candidate,seed:job.seed,count:result.count,wins:result.wins,milliseconds:result.milliseconds});
  }catch(error){parentPort.postMessage({error:error.stack,candidate:job.candidate});}
 });
}else{
 const engine=require('./battle-harness.cjs')(),args=process.argv.slice(2),pilot=args.includes('--pilot'),repeat=args.includes('--repeat');
 const candidates=engine.roster.filter(t=>srSuite?engine.gradeOf(t)==='sr':['basic','rare'].includes(engine.gradeOf(t)));
 let jobs=srSuite?[null,...candidates].flatMap(candidate=>[1,2,3].map(seed=>({candidate,seed,pilot}))):[null,...candidates].map(candidate=>({candidate,seed:1,pilot}));
 if(pilot)jobs=[{candidate:null,seed:1,pilot:true}];
 if(repeat){const summary=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/character-stage-ranking-2026-10-08.json'),'utf8'));const nominees=[...new Set(summary.groups.flatMap(g=>[...g.rows.slice(0,3),...g.rows.slice(-3)].map(r=>r.type)))];jobs=[null,...nominees].flatMap(candidate=>[2,3].map(seed=>({candidate,seed,pilot:false})));}
 jobs=jobs.filter(job=>{const filename=path.join(out,`${job.candidate||'empty'}-seed${job.seed}.json`);if(job.pilot||!fs.existsSync(filename))return true;const previous=JSON.parse(fs.readFileSync(filename,'utf8'));return previous.signature!==taskSignature(job.candidate,job.seed);});
 const original=jobs.length;console.log(JSON.stringify({jobs:original,candidates:candidates.length,conditions:srSuite?selection.filter(t=>t.crown!==4).length:selection.length,core,fourCore,pilot,repeat,srSuite}));
 let completed=0,failed=false;
 const workers=[];
 const assign=w=>{const job=jobs.shift();if(job)w.postMessage(job);else w.terminate();};
 for(let i=0;i<Math.min(4,original);i++){const w=new Worker(__filename,{workerData:{suite:srSuite?'sr':'basic-rare'}});workers.push(w);w.on('message',r=>{if(r.error){failed=true;console.error(r.error);for(const worker of workers)worker.terminate();process.exitCode=1;return;}completed++;console.log(JSON.stringify({completed,total:original,...r}));assign(w);});w.on('error',e=>{failed=true;console.error(e);for(const worker of workers)worker.terminate();process.exitCode=1;});assign(w);}
 if(!original)console.log('Matching checkpoints already complete.');
}
