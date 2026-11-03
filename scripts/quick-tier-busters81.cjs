// 8.2 신규 울슈레(애프리·메리)를 11-01 간이 티어표(tier-release80-quick)와 같은 방식으로 재서 그 표의 분포 안에 놓는다.
// 조건은 같다: Lv.30·보물 완성·수입 MAX, 기존 시험 맵 9개·시드1·smart2, 승리 2-초/300 아니면 0, 기준덱(레드·옐로우·블루·퍼플) 대비 이득의 맵별 백분위 평균.
// 그림이 없으므로 BUSTERS81_DRAFT=1(라이트 레인보우 그림을 빌림)로 돌린다. 라이트 레인보우를 같이 재서 표의 값과 맞는지(규칙이 그 뒤 바뀌지 않았는지) 확인한다.
// 사용: BUSTERS81_DRAFT=1 [MODS='{"marigold":{"hp":1}}'] node scripts/quick-tier-busters81.cjs
process.env.BUSTERS81_DRAFT='1';
const fs=require('fs'),make=require('./full-harness.cjs'),{runJobs}=require('./sim-pool.cjs'),{classify}=require('./detailed-tier-scale.cjs');
const PREV=require('../docs/simulations/tier-release80-quick-2026-11-01.json'),scale=PREV.scale,core=PREV.core,maps=PREV.maps;
const NEW=['apricot','marigold'],REF=(process.env.REF||'lightrainbow,heliotrope,blossom,almondblossom').split(',');
const e=make(),ids=[...NEW,...REF];
const jobs=[],index=new Map(),refs=[];
function add(job){const key=JSON.stringify(job);if(!index.has(key)){index.set(key,jobs.length);jobs.push(job);}return index.get(key);}
for(const m of maps)for(const id of ids){const base=core.filter(x=>x!==id);const job={i:m.i,crown:1,seed:1,policy:'smart2',profile:{level:30,maxIncome:true,trueForms:[],forms:{}}};
 refs.push({map:m.i,id,baseline:add({...job,deck:base}),candidate:add({...job,deck:[...base,id]})});}
(async()=>{console.log('START',ids.length,'units',jobs.length,'battles');const raw=await runJobs(jobs,{chunk:6});if(raw.some(r=>r.error))throw Error(JSON.stringify(raw.filter(r=>r.error).slice(0,3)));
const score=r=>r.win?2-r.seconds/300:0;
const perMap=refs.map(r=>({...r,gain:score(raw[r.candidate])-score(raw[r.baseline]),win:raw[r.candidate].win,seconds:raw[r.candidate].seconds}));
const poolOf=mi=>PREV.perMap.filter(r=>r.map===mi&&!core.includes(r.id)).map(r=>r.gain);
for(const r of perMap){const pool=poolOf(r.map);r.pct=(pool.filter(v=>v<r.gain-1e-9).length+pool.filter(v=>Math.abs(v-r.gain)<=1e-9).length/2)/pool.length;}
const rows=ids.map(id=>{const rs=perMap.filter(r=>r.id===id),s=rs.reduce((n,r)=>n+r.pct,0)/maps.length;return {id,name:e.names[id],score:s,tier:classify(s,scale),wins:rs.filter(r=>r.win).length}}).sort((a,b)=>b.score-a.score);
const prevOf=id=>{const rs=PREV.rows.filter(r=>r.id===id&&r.form===2)[0];return rs?{tier:rs.tier,score:rs.score}:null};
console.log('\n이름 | 티어 | 점수 | 클리어 | (11-01 표)');for(const r of rows){const p=prevOf(r.id);console.log([r.name,r.tier,r.score.toFixed(4),r.wins+'/9',p?p.tier+' '+p.score.toFixed(4):'—'].join(' | '))}
console.log('\n맵별 이득(초 환산 ×300) / 백분위');for(const m of maps){console.log(m.name+': '+ids.map(id=>{const r=perMap.find(x=>x.map===m.i&&x.id===id);return e.names[id]+' '+(r.gain*300).toFixed(0)+'초/'+(r.pct*100).toFixed(0)+'%'+(r.win?'':'(패)')}).join(' · '))}
fs.writeFileSync('docs/simulations/tier-busters81-2026-11-03.json',JSON.stringify({date:'2026-11-03',method:'quick: 11-01 간이 티어표와 같은 조건(9맵·시드1·smart2), 그림 없이 라이트 레인보우 그림을 빌린 초안 수치',maps,core,rows,perMap,raw},null,2));
process.exit(0)})();
