// 티어 구간(사다리)을 측정 분포에서 정한다. make-tier-v3.cjs와 new-unit-tier.cjs가 같이 쓴다.
// 폭 = 두 캐릭터가 95%로 구분되는 최소 차이 = 1.96 × √2 × (표준오차 중앙값), 정수 초로 반올림.
// 시작점 = 2위 이득의 내림값 → OP는 2명 안팎이 들어간다(옛 표와 같은 모양). 이후 폭만큼 내려가며 SSS … F, 그 아래는 X.
const BANDS=['OP','SSS','SS','S','A','B','C','D','E','F','X'];
function makeLadder(gainSec,seSec){
 const med=a=>{const s=[...a].sort((x,y)=>x-y);return s[s.length>>1]};
 const width=Math.max(1,Math.round(1.96*Math.SQRT2*med(seSec)));
 const second=[...gainSec].sort((a,b)=>b-a)[1];
 const top=Math.floor(second);
 const edges=Array.from({length:BANDS.length-1},(_,k)=>top-k*width);// 이 값 이상이 위 구간
 const bandIndex=g=>{for(let b=0;b<edges.length;b++)if(g>=edges[b])return b;return BANDS.length-1};
 const f=v=>(v<0?'−':'')+Math.abs(v);
 const rangeText=b=>b===0?`${f(edges[0])}초 이상`:b===BANDS.length-1?`${f(edges[edges.length-1])}초 미만`:`${f(edges[b])}~${f(edges[b-1])}초`;
 const summary=BANDS.map((n,b)=>b===0?`${n} ${f(edges[0])}초 이상`:b===BANDS.length-1?`${n} ${f(edges[edges.length-1])}초 미만`:`${n} ${f(edges[b])}~${f(edges[b-1])}`).join(' · ');
 return {BANDS,width,edges,bandIndex,band:g=>BANDS[bandIndex(g)],rangeText,summary,medianSe:med(seSec)};
}
module.exports={makeLadder,BANDS};
