// 모든 아군 티어리스트의 '기준 맵'을 찾는다.
// 1) 스윕 결과에서 덱에 따라 승패가 갈리는(너무 쉽지도 불가능하지도 않은) 조건을 후보로 모은다(★4 제외: 모든 아군이 출전 가능해야 함).
// 2) 후보 맵마다 모든 아군을 기준 덱 9종에 1칸 더해 성능 이득을 잰다(연속 지표: 승리 + 빠르기, 패배 시 적 성 진행도).
// 3) 맵마다 '다른 맵들의 평균 순위'와의 일치도(스피어만)와 점수 퍼짐을 보고 기준 맵을 고른다.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const POLICIES=['auto','smart2'],SEEDS=[1,2];
const NMAPS=+(process.env.NMAPS||48);
(async()=>{
 const e=mk();
 const sweep=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/stage-sweep-2026-10-13.json'),'utf8'));
 const core9=['garnet','lapis','selenite','topaz','ribbonorange','obsidian','cornflower','khaki','rainbow'];
 const by=new Map();
 for(const r of sweep.rows){if(r.crown===4)continue;const k=r.i+':'+r.crown;(by.get(k)||by.set(k,[]).get(k)).push(r)}
 // 후보: 덱·방식 조합 중 이긴 비율이 25~85%이고 이긴 판의 평균 시간이 35~230초
 const grp=i=>{if(i<=47)return 'W1';if(i<=95)return 'W2';if(i<=143)return 'W3';if(i>=159&&i<=206)return 'F1';if(i>=353&&i<=400)return 'F2';if(i>=459&&i<=506)return 'F3';if(i>=507&&i<=554)return 'C1';return e.stageList[i].legend?'L'+(by.get(i+':1')?'':'?'):'S'};
 const cand=[];
 for(const [k,rs] of by){
  const [i,crown]=k.split(':').map(Number);
  const wins=rs.filter(r=>r.win),frac=wins.length/rs.length;
  if(frac<.25||frac>.85)continue;
  const avg=wins.reduce((a,r)=>a+r.sec,0)/wins.length;
  if(avg<35||avg>230)continue;
  if(e.stageList[i].chapter==='special'&&!e.stageList[i].legend)continue;
  cand.push({i,crown,frac,avg,name:sweep.names[i],g:grp(i)});
 }
 // 장 묶음별로 고르게 뽑는다(가장 승패가 반반에 가까운 순)
 const groups={};for(const c of cand)(groups[c.g]=groups[c.g]||[]).push(c);
 for(const g of Object.values(groups))g.sort((a,b)=>Math.abs(a.frac-.55)-Math.abs(b.frac-.55));
 const maps=[];const gk=Object.keys(groups);
 for(let r=0;maps.length<NMAPS&&r<20;r++)for(const g of gk){if(groups[g][r]&&maps.length<NMAPS)maps.push(groups[g][r])}
 console.log('candidates',cand.length,'maps',maps.length,Object.fromEntries(gk.map(g=>[g,groups[g].length])));
 const allies=e.roster;
 const jobs=[],meta=[];
 for(const m of maps)for(const seed of SEEDS)for(const policy of POLICIES){
  jobs.push({i:m.i,crown:m.crown,deck:core9,seed,policy});meta.push({m:m.i+':'+m.crown,c:'__ref',seed,policy});
  for(const c of allies){
   const inCore=core9.includes(c);
   jobs.push({i:m.i,crown:m.crown,deck:inCore?core9.filter(t=>t!==c):[...core9,c],seed,policy});
   meta.push({m:m.i+':'+m.crown,c,seed,policy,kind:inCore?'without':'with'});
  }
 }
 console.log('jobs',jobs.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d%2000===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 // 성능 지표
 const perfOf=(r,stageHp)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/stageHp));
 const raw=new Map();// key m|c|seed → best perf over policies
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const mt=meta[k];const hp=e.stageList[+mt.m.split(':')[0]].hp;const key=[mt.m,mt.c,mt.seed].join('|');const p=perfOf(r,hp);raw.set(key,Math.max(raw.get(key)??-1,p))});
 const G={},noise={};
 for(const m of maps){
  const mk_=m.i+':'+m.crown;G[mk_]={};noise[mk_]={};
  for(const c of allies){
   const inCore=core9.includes(c);const diffs=[];
   for(const seed of SEEDS){const a=raw.get([mk_,c,seed].join('|')),b=raw.get([mk_,'__ref',seed].join('|'));if(a===undefined||b===undefined)continue;diffs.push(inCore?b-a:a-b)}
   const mean=diffs.reduce((x,y)=>x+y,0)/diffs.length;
   G[mk_][c]=mean;noise[mk_][c]=diffs.length>1?Math.abs(diffs[0]-diffs[1]):0;
  }
 }
 // 순위 일치도
 const rank=obj=>{const ks=Object.keys(obj).sort((a,b)=>obj[b]-obj[a]);const r={};ks.forEach((k,i)=>r[k]=i);return r};
 const spearman=(a,b)=>{const ra=rank(a),rb=rank(b),n=Object.keys(ra).length;let s=0;for(const k of Object.keys(ra))s+=(ra[k]-rb[k])**2;return 1-6*s/(n*(n*n-1))};
 const mapKeys=maps.map(m=>m.i+':'+m.crown);
 const report=[];
 for(const mk_ of mapKeys){
  const others={};for(const c of allies)others[c]=mapKeys.filter(x=>x!==mk_).reduce((a,x)=>a+G[x][c],0)/(mapKeys.length-1);
  const vals=allies.map(c=>G[mk_][c]);const mean=vals.reduce((a,b)=>a+b,0)/vals.length;const sd=Math.sqrt(vals.reduce((a,b)=>a+(b-mean)**2,0)/vals.length);
  const nz=allies.reduce((a,c)=>a+noise[mk_][c],0)/allies.length;
  const m=maps.find(x=>x.i+':'+x.crown===mk_);
  report.push({map:mk_,name:m.name,crown:m.crown,group:m.g,winFrac:+m.frac.toFixed(2),avgSec:Math.round(m.avg),agree:+spearman(G[mk_],others).toFixed(3),spread:+sd.toFixed(3),noise:+nz.toFixed(3),snr:+(sd/(nz||1e-6)).toFixed(2)});
 }
 report.sort((a,b)=>b.agree-a.agree);
 fs.writeFileSync(path.join(root,'docs/simulations/benchmark-map-2026-10-13.json'),JSON.stringify({core9,maps,report,G},null,1));
 for(const r of report.slice(0,14))console.log(r.map.padEnd(8),r.name.padEnd(12),'★'+r.crown,r.group,'일치도',r.agree,'퍼짐',r.spread,'잡음',r.noise,'SNR',r.snr,'승률',r.winFrac,'평균초',r.avgSec);
 console.log('done');process.exit(0);
})();
