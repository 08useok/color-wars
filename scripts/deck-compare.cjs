// 공통 덱 후보를 ★1~★3 전체 조건(스테이지 618 + 레전드 ★2·★3)에서 비교한다. 출력: docs/simulations/deck-compare-2026-10-16.json
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{
 const e=mk();
 const decks={
  '현재 최강덱(달·레전드 공통)':['red','yellow','brick','indigo','ribbonorange','rainbow','cornflower','khaki','silver','fusioncream'],
  '티어 상위 10':['prism','rainbow','carmine','ruby','spring','white','sapphire','night','tangerine','brick'],
  '싼 앞줄 + 울슈레':['red','blue','brick','white','ruby','prism','rainbow','carmine','sapphire','night'],
  '현재 덱 + 신규 울슈레':['red','yellow','brick','ribbonorange','rainbow','prism','carmine','sapphire','night','white']
 };
 for(const [k,d] of Object.entries(decks))for(const t of d)if(!e.roster.includes(t))throw Error(k+': '+t);
 const conds=[];
 e.stageList.forEach((s,i)=>{if(s.legend)for(const c of [1,2,3])conds.push({i,crown:c});else conds.push({i,crown:1})});
 const POL=['auto','smart2'];
 const jobs=[],meta=[];
 for(const [dk,deck] of Object.entries(decks))for(const c of conds)for(const p of POL){jobs.push({i:c.i,crown:c.crown,deck,seed:1,policy:p});meta.push({dk,i:c.i,crown:c.crown,p})}
 console.log('conds',conds.length,'jobs',jobs.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d%2000===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 const by={};
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k];const key=m.dk+'|'+m.i+'|'+m.crown;(by[key]=by[key]||{})[m.p]={win:r.win,sec:r.seconds}});
 const summary={};
 for(const dk of Object.keys(decks)){
  let anyWin=0,autoWin=0,secSum=0,secN=0,legend=0,legendN=0,story=0,storyN=0;
  for(const c of conds){const o=by[dk+'|'+c.i+'|'+c.crown];const a=o.auto.win||o.smart2.win;anyWin+=a?1:0;autoWin+=o.auto.win?1:0;
   const w=[o.auto,o.smart2].filter(x=>x.win).map(x=>x.sec);if(w.length){secSum+=Math.min(...w);secN++}
   const isLegend=!!e.stageList[c.i].legend;if(isLegend){legendN++;legend+=a?1:0}else{storyN++;story+=a?1:0}}
  summary[dk]={deck:decks[dk].map(t=>e.names[t]),anyWin,autoWin,total:conds.length,meanWinSec:+(secSum/secN).toFixed(1),story:story+'/'+storyN,legend:legend+'/'+legendN};
 }
 fs.writeFileSync(path.join(root,'docs/simulations/deck-compare-2026-10-16.json'),JSON.stringify({summary,by}));
 for(const [k,v] of Object.entries(summary))console.log(k,'|',v.anyWin+'/'+v.total,'자동만',v.autoWin,'평균',v.meanWinSec+'초','스토리',v.story,'레전드',v.legend);
 console.log('done');process.exit(0);
})();
