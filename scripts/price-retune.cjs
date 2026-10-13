// 스프링·로즈 가격·재사용을 올렸을 때 티어 점수가 어떻게 변하는지 같은 조건(티어 시험의 조건·시드·방식)으로 잰다.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const root=path.resolve(__dirname,'..');
const BASE={spring:{hp:36000,atk:12000,surge:{start:3,end:13,dur:1.8,tick:.45,mult:.4}},rose:{hp:45000,atk:9000}};
function resolveMods(c,m){const o={};for(const [k,v] of Object.entries(m)){if(v==='surgeHalf')o.surge={...BASE[c].surge,mult:BASE[c].surge.mult/2};else if(typeof v==='string'&&v[0]==='*')o['lv20.'+k]=Math.round(BASE[c][k]*parseFloat(v.slice(1)));else o[k]=v}return o}
(async()=>{
 const T=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/tier-test-2026-10-13-best.json'),'utf8'));
 const core9=T.core9,cands=(process.env.CANDS||'spring,rose').split(',');
 const VAR=process.env.VARIANTS==='stats';
 const CDV=process.env.VARIANTS==='cd';
 const variants=CDV?[{k:'4500/36',cost:4500,cd:36},{k:'4500/50',cost:4500,cd:50},{k:'4500/60',cost:4500,cd:60},{k:'4500/75',cost:4500,cd:75},{k:'4500/90',cost:4500,cd:90}]:VAR?[
  {k:'공격력×0.7',unit:{spring:{atk:'*.7'},rose:{atk:'*.7'}}},
  {k:'소열파·약화 절반',unit:{spring:{surge:'surgeHalf'},rose:{atkDownPct:.25}}},
  {k:'체력×0.7',unit:{spring:{hp:'*.7'},rose:{hp:'*.7'}}},
  {k:'공격력×0.7+4000/50',unit:{spring:{atk:'*.7',cost:4000,cooldown:50},rose:{atk:'*.7',cost:4000,cooldown:50}}}
 ]:[{k:'현재',cost:3000,cd:36},{k:'3600/42',cost:3600,cd:42},{k:'4000/50',cost:4000,cd:50},{k:'4000/60',cost:4000,cd:60}];
 const conds=T.chosen,seeds=T.seeds,policies=T.policies;
 const jobs=[],meta=[];
 for(const c of cands)for(const v of variants)for(const s of conds)for(const seed of seeds)for(const policy of policies){
  if(s.crown===4&&!['ex','rare'].includes(T.grades[c]))continue;
  jobs.push({i:s.i,crown:s.crown,deck:[...core9,c],seed,policy,unitMods:{[c]:VAR?resolveMods(c,v.unit[c]):{cost:v.cost,cooldown:v.cd}}});
  meta.push({c,v:v.k,i:s.i,crown:s.crown,seed,policy});
 }
 console.log('jobs',jobs.length);
 const t0=Date.now();
 const res=await runJobs(jobs,{chunk:24,onProgress:(d,n)=>{if(d%500===0)console.log(d,'/',n,((Date.now()-t0)/1000|0)+'s')}});
 // 기준(후보 없는 core9) 결과: 티어 시험의 ref 행에서 최선
 const refBest=new Map();
 for(const r of T.rows){if(r.kind!=='ref')continue;const k=[r.i,r.crown,r.seed].join('|');const b=refBest.get(k);const v={win:r.win,sec:r.win?r.sec:300};if(!b||(v.win&&!b.win)||(v.win===b.win&&v.sec<b.sec))refBest.set(k,v)}
 const best=new Map();
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k];const key=[m.c,m.v,m.i,m.crown,m.seed].join('|');const v={win:r.win,sec:r.win?r.seconds:300};const b=best.get(key);if(!b||(v.win&&!b.win)||(v.win===b.win&&v.sec<b.sec))best.set(key,v)});
 const agg={};
 for(const [key,v] of best){const [c,vk,i,crown,seed]=key.split('|');const ref=refBest.get([i,crown,seed].join('|'));if(!ref)continue;
  const a=agg[c+'|'+vk]=agg[c+'|'+vk]||{c,v:vk,pairs:0,net:0,both:0,save:0,refT:0,legend:{p:0,n:0},story:{p:0,n:0}};
  a.pairs++;const d=(v.win?1:0)-(ref.win?1:0);a.net+=d;if(v.win&&ref.win){a.both++;a.save+=ref.sec-v.sec;a.refT+=ref.sec}
  const era=(+i<=143||(+i>=159&&+i<=206)||(+i>=353&&+i<=400)||(+i>=459&&+i<=554))?'story':'legend';a[era].p++;a[era].n+=d}
 const out=[];
 for(const a of Object.values(agg)){const win=a.net/a.pairs*100,time=a.refT?a.save/a.refT*100:0;out.push({unit:T.names[a.c],unitId:a.c,variant:a.v,pairs:a.pairs,winGain:+win.toFixed(2),timeGain:+time.toFixed(2),score:+(win+.35*time).toFixed(2),story:a.story.p?+(a.story.n/a.story.p*100).toFixed(2):null,legend:a.legend.p?+(a.legend.n/a.legend.p*100).toFixed(2):null})}
 fs.writeFileSync(path.join(root,'docs/simulations/price-retune-2026-10-13'+(VAR?'-stats':CDV?'-cd':'')+'.json'),JSON.stringify(out,null,1));
 for(const o of out)console.log(o.unit.padEnd(6),o.variant.padEnd(8),'score',o.score,'win',o.winGain,'time',o.timeGain,'story',o.story,'legend',o.legend);
 console.log('done');process.exit(0);
})();
