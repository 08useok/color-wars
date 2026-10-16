// 기준 맵 5곳의 맵별 성능 이득을 '백분위'로 바꿔 합친다. 출력: docs/simulations/all-ally-tier-2026-10-16.json
// - 표준점수는 소수의 극단값(기준 덱에서 빼면 지는 멤버, 넣으면 지는 후보)이 눈금을 망가뜨려 백분위(동점은 평균)로 바꿨다.
// - 한 맵의 가중치 = 1 - (가장 큰 동점 묶음 비율): 대부분이 같은 값이면 그 맵은 순위 정보가 적다.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const B=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/benchmark-tier-2026-10-16.json'),'utf8'));
const maps=B.maps,allies=Object.keys(B.perMap),n=allies.length;
const EPS=0.004;// 이 이하의 차이는 같은 값으로 본다(시드 잡음 수준)
const pct={},weight={},tie={};
for(const m of maps){
 const v=allies.map(c=>({c,g:B.perMap[c][m]})).sort((a,b)=>a.g-b.g);
 // EPS 안에 드는 값끼리 한 묶음으로 보고 평균 순위를 준다
 let i=0;const groups=[];
 while(i<n){let j=i;while(j+1<n&&v[j+1].g-v[i].g<=EPS)j++;groups.push([i,j]);i=j+1}
 let big=0;
 for(const [a,b] of groups){const r=(a+b)/2/(n-1);for(let k=a;k<=b;k++)(pct[v[k].c]=pct[v[k].c]||{})[m]=r;big=Math.max(big,b-a+1)}
 tie[m]=big/n;weight[m]=1-big/n;
}
const wsum=maps.reduce((a,m)=>a+weight[m],0);
const res={};
for(const c of allies){
 const comp=maps.reduce((a,m)=>a+weight[m]*pct[c][m],0)/wsum;
 res[c]={...B.out[c],pct:Object.fromEntries(maps.map(m=>[m,+pct[c][m].toFixed(3)])),raw:Object.fromEntries(maps.map(m=>[m,+B.perMap[c][m].toFixed(4)])),comp:+comp.toFixed(4)};
}
fs.writeFileSync(path.join(root,'docs/simulations/all-ally-tier-2026-10-16.json'),JSON.stringify({maps,seeds:B.seeds,refSummary:B.refSummary,weight,tie,res},null,1));
console.log('맵 가중치',JSON.stringify(Object.fromEntries(maps.map(m=>[m,+weight[m].toFixed(2)]))));
const arr=Object.entries(res).sort((a,b)=>b[1].comp-a[1].comp);
arr.forEach(([c,o],i)=>console.log(String(i+1).padStart(3),String(o.comp).padStart(7),o.grade.padEnd(5),o.name.padEnd(10),maps.map(m=>String(o.pct[m]).padStart(6)).join(' '),o.core?'(기준 덱)':''));
