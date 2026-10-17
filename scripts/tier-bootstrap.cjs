// 발표된 티어표(기준 맵 5곳 합산)의 불확실성: 맵별로 시드를 재추출(부트스트랩)해 합산 점수·순위·티어 소속 확률을 구한다.
const fs=require('fs'),path=require('path');
const {BANDS,bandOf}=require('./tier-bands.cjs');
const root=path.resolve(__dirname,'..');
const B=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/bench5-seedlevel-2026-10-17.json'),'utf8'));
const maps=B.maps,allies=Object.keys(B.seedGains),n=allies.length,EPS=0.004,NB=+(process.env.NB||400);
function composite(gainOf){// gainOf(c,m) → 그 맵의 이득
 const pct={},weight={};
 for(const m of maps){
  const v=allies.map(c=>({c,g:gainOf(c,m)})).sort((a,b)=>a.g-b.g);let i=0,big=0;
  while(i<n){let j=i;while(j+1<n&&v[j+1].g-v[i].g<=EPS)j++;const r=(i+j)/2/(n-1);for(let k=i;k<=j;k++)(pct[v[k].c]=pct[v[k].c]||{})[m]=r;big=Math.max(big,j-i+1);i=j+1}
  weight[m]=1-big/n;
 }
 const ws=maps.reduce((a,m)=>a+weight[m],0);const comp={};for(const c of allies)comp[c]=maps.reduce((a,m)=>a+weight[m]*pct[c][m],0)/ws;return comp;
}
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const base=composite((c,m)=>mean(B.seedGains[c][m]));
let seed=12345;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const draws=Object.fromEntries(allies.map(c=>[c,[]])),ranks=Object.fromEntries(allies.map(c=>[c,[]])),bandCount=Object.fromEntries(allies.map(c=>[c,{}]));
for(let b=0;b<NB;b++){
 const pick={};for(const m of maps)pick[m]=Array.from({length:B.seeds},()=>Math.floor(rnd()*B.seeds));
 const comp=composite((c,m)=>mean(pick[m].map(k=>B.seedGains[c][m][k])));
 const order=Object.entries(comp).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);order.forEach((c,i)=>ranks[c].push(i+1));
 for(const c of allies){draws[c].push(comp[c]);const bd=bandOf(comp[c],c);bandCount[c][bd]=(bandCount[c][bd]||0)+1}
}
const q=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.max(0,Math.round(p*(s.length-1))))]};
const res={};
for(const c of allies){const own=bandOf(base[c],c);res[c]={comp:+base[c].toFixed(4),lo:+q(draws[c],.025).toFixed(4),hi:+q(draws[c],.975).toFixed(4),rankLo:q(ranks[c],.025),rankHi:q(ranks[c],.975),band:own,pBand:+((bandCount[c][own]||0)/NB).toFixed(3),bands:bandCount[c]}}
fs.writeFileSync(path.join(root,'docs/simulations/tier-bootstrap-2026-10-17.json'),JSON.stringify({maps,seeds:B.seeds,NB,res}));
const arr=Object.entries(res).sort((a,b)=>b[1].comp-a[1].comp);
const width=arr.map(([c,o])=>o.hi-o.lo);
console.log('부트스트랩',NB,'회 · 합산 95% 구간 폭 중앙',width.sort((a,b)=>a-b)[Math.floor(width.length/2)].toFixed(3),'최대',Math.max(...width).toFixed(3));
console.log('본 티어에 속할 확률 중앙',[...arr.map(([c,o])=>o.pBand)].sort((a,b)=>a-b)[Math.floor(arr.length/2)],'| 확률 ≥0.9인 캐릭터',arr.filter(([c,o])=>o.pBand>=.9).length,'/',n,'| <0.5인 캐릭터',arr.filter(([c,o])=>o.pBand<.5).length);
process.exit(0);
