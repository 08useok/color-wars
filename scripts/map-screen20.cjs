// 보물 전부 + Lv.30 상태에서 레전드 1~20장(k 0..147) ★1~★3 조건을 기준 덱 2종으로 한 번씩 돌려 후보 맵을 거른다.
// 출력: docs/simulations/map-screen20-2026-10-17.json
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const e=mk();
 const last=e.legendSubs[19],kmax=last.start+last.len-1;
 const decks={core9:['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow'],weak4:['red','yellow','blue','purple']};
 const conds=[];for(let k=0;k<=kmax;k++)for(const c of [1,2,3])conds.push({k,i:e.legendIdx(k),crown:c});
 const jobs=[],meta=[];
 for(const c of conds)for(const [dk,deck] of Object.entries(decks))for(const p of ['auto','smart2']){jobs.push({i:c.i,crown:c.crown,deck,seed:1,policy:p});meta.push({k:c.k,i:c.i,crown:c.crown,dk,p})}
 console.log('조건',conds.length,'판',jobs.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d%800===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 const rows=res.map((r,k)=>({...meta[k],win:r.win,sec:r.seconds,allyHp:r.allyHp,enemyHp:r.enemyHp,error:r.error}));
 const hash=crypto.createHash('sha256');for(const f of ['game.js','cannon.js','zombie.js','ubers-turquoise.js'])hash.update(fs.readFileSync(path.join(root,f)));
 fs.writeFileSync(path.join(root,'docs/simulations/map-screen20-2026-10-17.json'),JSON.stringify({names:Object.fromEntries(conds.map(c=>[c.i,e.stageList[c.i].name])),subOf:Object.fromEntries(conds.map(c=>[c.i,e.legendSubOf(c.k)+1])),hp:Object.fromEntries(conds.map(c=>[c.i,e.stageList[c.i].hp])),codeHash:hash.digest('hex').slice(0,16),rows}));
 console.log('done',(Date.now()-t0)/1000|0,'s errors',rows.filter(r=>r.error).length);
 process.exit(0);
})();
