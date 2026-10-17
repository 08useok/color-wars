// 라즈베리 새 3진(체력·공격 ×1.5, 간격 3초, 사거리 39, 에일 초데미지, 베리어 브레이커 25%, 무한 관통·성장 ×1.21·상한 20) 시험.
// 변형: 2진 / 새 3진 / 에일 초뎀 뺀 3진 / 관통 성장 뺀 3진. 범용 맵 6곳 + 에이리언 위주 맵 8곳, 기준 덱 레드·옐로우·블루·퍼플 + 라즈베리.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const e=mk();
 const base=['red','yellow','blue','purple'];
 // 에이리언 위주 스테이지(위협 비중 ≥60%) 중 기준 덱+라즈베리 2진이 너무 쉽지도 불가능하지도 않은 것
 const share=i=>{const rules=e.spawnList[i]||[];let tot=0,al=0;for(const r of rules){const d=e.units[r.type];if(!d)continue;const w=d.hp*d.atk*((r.mag||100)/100)*(r.count||1);tot+=w;const tr=d.traits||(d.trait?[d.trait]:[]);if(tr.includes('alien'))al+=w}return tot?al/tot:0};
 const cand=[];e.stageList.forEach((s,i)=>{if(s.chapter==='special'&&!s.legend)return;if(share(i)>=.6)cand.push({i,crown:s.legend?3:1,share:share(i)})});
 console.log('에이리언 위주 후보',cand.length);
 const screen=await runJobs(cand.map(c=>({i:c.i,crown:c.crown,deck:[...base,'raspberry'],seed:1,policy:'smart2',profile:{level:30}})),{chunk:8});
 const picks=cand.map((c,k)=>({...c,win:screen[k].win,sec:screen[k].seconds})).filter(c=>!c.win||c.sec>=60).sort((a,b)=>(b.sec||999)-(a.sec||999)).slice(0,8);
 console.log('고른 에이리언 맵',picks.map(p=>e.stageList[p.i].name+'★'+p.crown+'('+(p.win?Math.round(p.sec)+'s':'패')+')').join(', '));
 const general=[[405,3],[327,3],[403,3],[328,3],[339,3],[347,3]];
 const alien=picks.map(p=>[p.i,p.crown]);
 const V=[
  ['2진',{trueForms:[],mods:null}],
  ['새 3진',{trueForms:['raspberry'],mods:{}}],
  ['3진-에일초뎀 뺌',{trueForms:['raspberry'],mods:{'tfb.massiveVs':null}}],
  ['3진-관통성장 뺌',{trueForms:['raspberry'],mods:{'tfb.pierceGrowth':1}}],
  ['(참고) 라즈베리 없음',null]
 ];
 const jobs=[],meta=[];
 for(const grp of ['general','alien'])for(const [i,c] of (grp==='general'?general:alien))for(let vi=0;vi<V.length;vi++)for(let seed=1;seed<=6;seed++)for(const p of ['auto','smart2']){
  const v=V[vi][1];
  jobs.push({i,crown:c,deck:v?[...base,'raspberry']:base,seed,policy:p,profile:{level:30,trueForms:v?v.trueForms:[]},unitMods:v&&v.mods&&Object.keys(v.mods).length?{raspberry:v.mods}:undefined});
  meta.push({grp,i,vi,seed});
 }
 console.log('판',jobs.length);
 const res=await runJobs(jobs,{chunk:12});
 const perf=(r,hp)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/hp));
 const best=new Map(),win=new Map();
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k];const key=[m.grp,m.i,m.vi,m.seed].join('|');const v=perf(r,e.stageList[m.i].hp);if(v>(best.get(key)??-1)){best.set(key,v);win.set(key,r.win)}});
 const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
 const out={};
 for(const grp of ['general','alien']){
  const maps=grp==='general'?general:alien;
  console.log('\n['+(grp==='general'?'범용 6맵':'에이리언 8맵')+'] 변형별 평균 성능(승리=1+(1-초/300)) · 승리 수');
  for(let vi=0;vi<V.length;vi++){
   const vals=maps.flatMap(([i])=>[1,2,3,4,5,6].map(s=>best.get([grp,i,vi,s].join('|'))));
   const wins=maps.flatMap(([i])=>[1,2,3,4,5,6].map(s=>win.get([grp,i,vi,s].join('|')))).filter(Boolean).length;
   (out[grp]=out[grp]||{})[V[vi][0]]={perf:mean(vals),wins,n:vals.length};
   console.log(' ',V[vi][0].padEnd(16),mean(vals).toFixed(3),'승리',wins+'/'+vals.length);
  }
 }
 fs.writeFileSync(path.join(root,'docs/simulations/raspberry3-test-2026-10-17.json'),JSON.stringify({picks:picks.map(p=>({i:p.i,name:e.stageList[p.i].name,crown:p.crown,share:p.share})),general,out}));
 process.exit(0);
})();
