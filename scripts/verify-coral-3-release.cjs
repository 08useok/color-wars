const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const{Worker,isMainThread,parentPort}=require('worker_threads');
const root=path.resolve(__dirname,'..'),make=require('./full-harness.cjs');
if(!isMainThread){
 const e=make({extraSetup:'const maxIncomeReset=reset;reset=function(){maxIncomeReset();game.level=data.income.length-1}'});
 parentPort.on('message',jobs=>{const out=[];for(const job of jobs){e.setProfile({level:30,trueForms:job.mode==='third'?['coral']:[]});out.push({...job,...e.simulate(job.i,job.crown,job.deck,job.seed,300,job.policy)})}parentPort.postMessage(out)});
}else(async()=>{
 const draft=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/coral-3-draft-2026-10-19.json'),'utf8'));
 const jobs=draft.raw.map(({i,crown,deck,mode,seed,policy,name,kind})=>({i,crown,deck,mode,seed,policy,name,kind}));
 const rows=[];let next=0;
 await Promise.all(Array.from({length:14},()=>new Promise((resolve,reject)=>{
  const w=new Worker(__filename);const send=()=>{if(next>=jobs.length){w.terminate();return resolve()}const batch=jobs.slice(next,next+12);next+=12;w.postMessage(batch)};w.on('error',reject);w.on('message',r=>{rows.push(...r);console.log(rows.length+'/'+jobs.length);send()});send();
 })));
 const key=r=>[r.i,r.crown,r.mode,r.policy,r.seed].join(':'),old=new Map(draft.raw.map(r=>[key(r),r]));
 for(const r of rows){const before=old.get(key(r));assert.equal(r.win,before.win,key(r)+' win');assert(Math.abs(r.seconds-before.seconds)<.05,key(r)+' time');assert(Math.abs(r.enemyHp-before.enemyHp)<.1,key(r)+' enemy HP')}
 fs.writeFileSync(path.join(root,'docs/simulations/coral-3-release-2026-10-19.json'),JSON.stringify({version:'6.8.0',verified:rows.length,conditions:draft.conditions,summary:draft.summary,raw:rows,note:'Actual production third-form ownership and addon, no draft stat/share override. All 360 outcomes match the tested draft.'},null,2));
 console.log('PASS actual release: '+rows.length+' battles match draft.');process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
