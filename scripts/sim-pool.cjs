// 전투 시험을 여러 작업 스레드에 나눠 돌리는 공용 실행기.
// job: {i, crown, deck, seed, policy, profile}  →  {win,timeout,seconds,allyHp,enemyHp,...}
const {Worker,isMainThread,parentPort,workerData}=require('worker_threads');
const os=require('os');
if(!isMainThread&&workerData?.simPool){
 const engine=require('./full-harness.cjs')();
 let profileKey='';
 parentPort.on('message',batch=>{
  const out=[];
  for(const job of batch.jobs){
   const key=JSON.stringify(job.profile||{});
   if(key!==profileKey){engine.setProfile(job.profile||{});profileKey=key;}
   const saved=[];
   if(job.unitMods)for(const [t,m] of Object.entries(job.unitMods))for(const [k,v] of Object.entries(m)){if(k.startsWith('lv20.')){const f=k.slice(5);saved.push([t,k,engine.lv20[t][f]]);engine.lv20[t][f]=v}else{saved.push([t,k,engine.units[t][k]]);engine.units[t][k]=v}}
   try{
    const r=engine.simulate(job.i,job.crown,job.deck,job.seed??1,job.limit??300,job.policy??'smart2',job.mods||null);
    out.push({id:job.id,win:r.win,timeout:r.timeout,seconds:r.seconds,allyHp:r.allyHp,enemyHp:r.enemyHp});
   }catch(e){out.push({id:job.id,error:String(e.stack||e).split('\n').slice(0,3).join(' | ')})}
   finally{for(const [t,k,v] of saved){if(k.startsWith('lv20.'))engine.lv20[t][k.slice(5)]=v;else engine.units[t][k]=v}}
  }
  parentPort.postMessage({batchId:batch.batchId,results:out});
 });
}
let POOL=null;
function getPool(n){
 if(POOL)return POOL;
 POOL=[];
 for(let k=0;k<n;k++){const w=new Worker(__filename,{workerData:{simPool:true}});w.unref();POOL.push({w,busy:false,resolve:null});
  w.on('message',m=>{const slot=POOL.find(x=>x.w===w);const r=slot.resolve;slot.resolve=null;slot.busy=false;r(m)});
  w.on('error',e=>{throw e});}
 return POOL;
}
// 같은 작업 스레드를 계속 재사용한다(엔진 생성 비용이 크다). close()로 정리.
async function runJobs(jobs,{workers=Math.max(1,Math.min(14,os.cpus().length-2)),chunk=24,onProgress}={}){
 const results=new Array(jobs.length);
 if(!jobs.length)return results;
 const pool=getPool(workers);
 let next=0,done=0;
 const worker=async slot=>{
  while(next<jobs.length){
   const start=next;next+=chunk;
   const batch=jobs.slice(start,start+chunk).map((j,k)=>({...j,id:start+k}));
   const m=await new Promise(res=>{slot.busy=true;slot.resolve=res;slot.w.postMessage({batchId:start,jobs:batch})});
   for(const r of m.results){results[r.id]=r;done++}
   if(onProgress)onProgress(done,jobs.length);
  }
 };
 await Promise.all(pool.slice(0,Math.min(pool.length,Math.ceil(jobs.length/chunk))).map(worker));
 return results;
}
function close(){if(POOL){for(const s of POOL)s.w.terminate();POOL=null}}
module.exports={runJobs,close};
