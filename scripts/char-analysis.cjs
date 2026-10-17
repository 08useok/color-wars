// 테스트 맵(황제의 야옹이 ★3) 결과 + 3진 + 능력치 → 캐릭터별 좋고 나쁜 이유 분석. 출력: docs/simulations/char-analysis-2026-10-17.json
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const MAP='405:3';
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const F=rd('docs/simulations/bench20-final-2026-10-17.json'),TF=rd('docs/simulations/trueform-map-2026-10-17.json'),BT=rd('docs/simulations/tier-bootstrap-2026-10-17.json');
const e=mk();e.setProfile({level:30});
const allies=Object.keys(F.perMap);
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length,sd=a=>{const m=mean(a);return Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/Math.max(1,a.length-1))};
const gain={},se={};
for(const c of allies){const sg=F.seedGains[c][MAP];gain[c]=mean(sg);se[c]=sd(sg)/Math.sqrt(sg.length)}
// 기준 덱 멤버(red·yellow·blue·purple)는 '빼면 얼마나 지는가'라 다른 캐릭터와 기준이 다르다.
// 겹치지 않는 두 번째 기준 덱(cyan·pink·orange·green)에서 다시 재서, 두 기준 모두에서 '더한' 캐릭터들로 선형 보정해 첫 기준의 눈금으로 옮긴다.
const R1=F.core9,R2=['cyan','pink','orange','green'];
const F2=rd('docs/simulations/bench20-ref2-2026-10-17.json');
const gain2={};for(const c of allies)gain2[c]=mean(F2.seedGains[c][MAP]);
const bridge=allies.filter(c=>!R1.includes(c)&&!R2.includes(c));
const bx=bridge.map(c=>gain2[c]),by=bridge.map(c=>gain[c]),mx=mean(bx),myb=mean(by);
const slope=bx.reduce((s,v,i)=>s+(v-mx)*(by[i]-myb),0)/bx.reduce((s,v)=>s+(v-mx)**2,0),icpt=myb-slope*mx;
const corr=bx.reduce((s,v,i)=>s+(v-mx)*(by[i]-myb),0)/Math.sqrt(bx.reduce((s,v)=>s+(v-mx)**2,0)*by.reduce((s,v)=>s+(v-myb)**2,0));
const adjusted={};for(const c of R1){adjusted[c]={raw:gain[c],ref2:gain2[c],fitted:icpt+slope*gain2[c]};gain[c]=icpt+slope*gain2[c];se[c]=sd(F2.seedGains[c][MAP])/Math.sqrt(F2.seedGains[c][MAP].length)*Math.abs(slope)}
const order=[...allies].sort((a,b)=>gain[b]-gain[a]);const rank={};order.forEach((c,i)=>rank[c]=i+1);
// ---- 특징량
const feat={};
for(const c of allies){
 const d=e.units[c],s=e.unitStats(c);// Lv.30 · 2진 · 보물 반영
 const multi=d.multiHit||1,areaF=d.area?1.6:1;
 feat[c]={hp:s.hp,atk:s.atk,interval:s.interval||1,range:d.range||0,speed:d.speed||0,cost:d.cost,cd:s.cooldown,
  dps:s.atk*multi/(s.interval||1)*areaF,ehp:s.hp,
  cc:(d.slowChance?1:0)+(d.freezeChance?1:0)+(d.atkDownChance||d.atkDownPct?1:0),
  slow:d.slowChance||0,freeze:d.freezeChance||0,weaken:d.atkDownPct?(d.atkDownChance??1):0,
  area:d.area?1:0,multi,blow:d.blowChance||0,wave:d.wave?1:0,surge:d.surge?1:0,
  waveImmune:d.waveImmune?1:0,dodge:d.dodge?1:0,survive:d.survive?1:0,
  traitSpecial:(d.strongVs||d.massiveVs||d.extremeVs||d.zombieKiller||d.metalKiller||d.barrierBreak||d.castleMult>1)?1:0,
  windup:d.windup||0,knock:d.knockbacks||0};
}
// ---- 회귀(능력치 → 이득): 표준화 릿지
const keys=['dps','ehp','range','speed','cost','cd','cc','area','knock'];
const tf=(k,v)=>['dps','ehp','cost','cd'].includes(k)?Math.log(Math.max(1,v)):v;
const X=allies.map(c=>keys.map(k=>tf(k,feat[c][k])));
const mu=keys.map((_,j)=>mean(X.map(r=>r[j]))),sg=keys.map((_,j)=>sd(X.map(r=>r[j]))||1);
const Z=X.map(r=>r.map((v,j)=>(v-mu[j])/sg[j]));
const y=allies.map(c=>gain[c]),my=mean(y);
function ridge(Z,y,lam){const p=Z[0].length;const A=Array.from({length:p},()=>Array(p).fill(0)),b=Array(p).fill(0);for(let i=0;i<Z.length;i++)for(let a=0;a<p;a++){b[a]+=Z[i][a]*(y[i]-my);for(let c=0;c<p;c++)A[a][c]+=Z[i][a]*Z[i][c]}for(let a=0;a<p;a++)A[a][a]+=lam;
 // 가우스 소거
 for(let i=0;i<p;i++){let piv=i;for(let r=i+1;r<p;r++)if(Math.abs(A[r][i])>Math.abs(A[piv][i]))piv=r;[A[i],A[piv]]=[A[piv],A[i]];[b[i],b[piv]]=[b[piv],b[i]];for(let r=i+1;r<p;r++){const f=A[r][i]/A[i][i];for(let c=i;c<p;c++)A[r][c]-=f*A[i][c];b[r]-=f*b[i]}}
 const w=Array(p).fill(0);for(let i=p-1;i>=0;i--){let s=b[i];for(let c=i+1;c<p;c++)s-=A[i][c]*w[c];w[i]=s/A[i][i]}return w}
const w=ridge(Z,y,3);
const pred=Z.map(r=>my+r.reduce((s,v,j)=>s+v*w[j],0));
const ssr=y.reduce((s,v,i)=>s+(v-pred[i])**2,0),sst=y.reduce((s,v)=>s+(v-my)**2,0);
const r2=1-ssr/sst;
const contrib={};allies.forEach((c,i)=>{contrib[c]=Object.fromEntries(keys.map((k,j)=>[k,Z[i][j]*w[j]]))});
const resid={};allies.forEach((c,i)=>resid[c]=y[i]-pred[i]);
const trueDelta={};for(const c of TF.eligible)trueDelta[c]=TF.out[c];
const hash=crypto.createHash('sha256');for(const f of ['game.js','cannon.js','zombie.js','ubers-turquoise.js'])hash.update(fs.readFileSync(path.join(root,f)));
fs.writeFileSync(path.join(root,'docs/simulations/char-analysis-2026-10-17.json'),JSON.stringify({bridge:{n:bridge.length,slope,icpt,corr},adjusted,map:MAP,codeHash:hash.digest('hex').slice(0,16),r2,coef:Object.fromEntries(keys.map((k,j)=>[k,w[j]])),keys,gain,se,rank,feat,contrib,resid,trueDelta,order}));
console.log('보정: 겹치지 않는 두 기준 덱의 이득 상관',corr.toFixed(2),'기울기',slope.toFixed(2),'| 보정된 기준 덱 멤버',Object.entries(adjusted).map(([c,o])=>e.names[c]+' '+o.raw.toFixed(3)+'→'+o.fitted.toFixed(3)).join(', '));
console.log('R²',r2.toFixed(2),'| 계수',keys.map((k,j)=>k+' '+w[j].toFixed(3)).join(' '));
console.log('상위 10',order.slice(0,10).map(c=>e.names[c]).join(' · '));
console.log('하위 10',order.slice(-10).map(c=>e.names[c]).join(' · '));
process.exit(0);
