// Quick full-roster measurement: one seed, one policy, existing nine arenas.
const fs=require('fs'),make=require('./full-harness.cjs'),{runJobs}=require('./sim-pool.cjs'),{classify}=require('./detailed-tier-scale.cjs');
const e=make(),scale=require('../docs/simulations/tier-arena-detailed-grades-2026-10-31.json').scale,core=['red','yellow','blue','purple'];
const candidates=[];for(const id of e.roster)for(const form of [1,2,3]){e.setProfile({level:30,trueForms:form===3?[id]:[],forms:form===3?{}:{[id]:form}});const s=e.unitStats(id);if(form===3&&!s.trueForm||form===2&&!s.evolved)continue;candidates.push({id,form,name:e.names[id]+' '+form+'진',grade:e.gradeOf(id),coreMember:core.includes(id),range:Math.round(s.range/.034)});}
const maps=e.stageList.flatMap((s,i)=>s.tierArena?[{i,name:s.name}]:[]),jobs=[],index=new Map(),refs=[];
function add(job){const key=JSON.stringify(job);if(!index.has(key)){index.set(key,jobs.length);jobs.push(job);}return index.get(key);}
for(const map of maps)for(const c of candidates){const base=core.filter(id=>id!==c.id);const job={i:map.i,crown:1,seed:1,policy:'smart2',profile:{level:30,maxIncome:true,trueForms:[],forms:{}}};const baseline=add({...job,deck:base}),candidate=add({...job,deck:[...base,c.id],profile:{...job.profile,trueForms:c.form===3?[c.id]:[],forms:c.form===1?{[c.id]:1}:{}}});refs.push({map:map.i,id:c.id,form:c.form,baseline,candidate});}
(async()=>{console.log('START',candidates.length,'forms',jobs.length,'battles');let last=0;const raw=await runJobs(jobs,{chunk:6,onProgress:(n,total)=>{if(n-last>=240||n===total){console.log(n+'/'+total);last=n;}}});if(raw.some(r=>r.error))throw Error(JSON.stringify(raw.filter(r=>r.error).slice(0,3)));
const resultScore=r=>r.win?2-r.seconds/300:0;
const perMap=refs.map(r=>({...r,gain:resultScore(raw[r.candidate])-resultScore(raw[r.baseline])}));
for(const map of maps){const pool=perMap.filter(r=>r.map===map.i&&!core.includes(r.id));for(const r of perMap.filter(r=>r.map===map.i)){r.pct=(pool.filter(v=>v.gain<r.gain-1e-9).length+pool.filter(v=>Math.abs(v.gain-r.gain)<=1e-9).length/2)/pool.length;}}
const rows=candidates.map(c=>{const rs=perMap.filter(r=>r.id===c.id&&r.form===c.form),score=rs.reduce((n,r)=>n+r.pct,0)/maps.length;return {...c,score,tier:classify(score,scale),wins:rs.filter(r=>raw[r.candidate].win).length};}).sort((a,b)=>b.score-a.score);
let rank=0;for(const r of rows)r.rank=r.coreMember?null:++rank;
const output={date:'2026-11-01',method:'quick range80: Lv30, full treasures, max income; 9 maps, seed1, smart2 only; win 2-seconds/300 else 0; baseline delta percentile; equal map weight',scale,maps,core,rows,perMap,raw};
fs.writeFileSync('docs/simulations/tier-release80-quick-2026-11-01.json',JSON.stringify(output,null,2));
let md='# 사거리 조정 후 간이 티어표 · 2026-11-01\n\n아군 281개 형태의 구간별 사거리 축소를 반영해 다시 측정했다. **Lv.30·보물 완성·수입 MAX, 기존 시험 맵 9개·시드1·smart2만** 사용했다. 반복 시드·출격 방식 비교·별도 특화 시험은 생략한 빠른 참고 평가다. 기존 9맵에는 고대종 전용 시험이 없어 신규3진의 고대종 특화는 이 표만으로 평가할 수 없다. 같은 맵의 기준덱 대비 승리 점수 이득을 백분위로 바꾸고 맵별 동일 비중으로 합산했다. 실패·시간 초과는0점 동점이다. 기존114단계 등급 경계는 유지했다. 기준덱 레드·옐로우·블루·퍼플의1·2진8개는 본인을 뺀 덱과 비교해 † 참고로 분리했다.\n\n**측정 방식도 이전(시드3·auto/smart2 중 유리한 결과)과 달라졌으므로 등급 변화가 전부 사거리 변경 때문이라고 해석하면 안 된다.** 작은 점수 차·인접 등급은 같은 수준으로 보는 것이 좋다.\n\n## 티어 한눈에\n\n|티어|캐릭터|인원|\n|---|---|---:|\n';
for(const t of scale.entries){const rs=rows.filter(r=>!r.coreMember&&r.tier===t.label);if(rs.length)md+=`|**${t.label}**|${rs.map(r=>r.name).join(' · ')}|${rs.length}|\n`;}
md+='\n## 진화별 비교\n\n|캐릭터|1진|2진|3진|\n|---|---|---|---|\n';for(const id of e.roster){const rs=rows.filter(r=>r.id===id);md+=`|${e.names[id]}|${[1,2,3].map(f=>{const r=rs.find(r=>r.form===f);return r?r.tier+(r.coreMember?'†':''):'—';}).join('|')}|\n`;}
md+='\n## 전체 순위\n\n|순위|캐릭터|티어|냥코식 사거리|클리어 맵|점수|\n|---:|---|---|---:|---:|---:|\n';for(const r of rows.filter(r=>!r.coreMember))md+=`|${r.rank}|${r.name}|${r.tier}|${r.range}|${r.wins}/9|${r.score.toFixed(4)}|\n`;
md+='\n## 기준덱 참고\n\n|캐릭터|참고 티어†|점수|\n|---|---|---:|\n';for(const r of rows.filter(r=>r.coreMember))md+=`|${r.name}|${r.tier}†|${r.score.toFixed(4)}|\n`;
fs.writeFileSync('docs/티어표/8.0-출시-간이-티어표-2026-11-01.md',md);
fs.writeFileSync('docs/티어표/README.md','# 아군 티어표\n\n- [사거리 조정 후 최신 간이 티어표](8.0-출시-간이-티어표-2026-11-01.md): 281형태, 9맵·시드1·smart2.\n- [7.5 사거리 조정 전 정식 표](티어표-1진-2진-3진-2026-11-01.md): 이전 시드3·두 출격 방식 측정.\n- [7.5 희귀도별 표](등급별-아군-1진-2진-3진-2026-11-01.md).\n\n최신 표는 간이 측정이다. 이전 표와 측정 방식이 달라 점수·등급을 그대로 대조하지 않는다.\n');
console.log('DONE',rows.length,'forms');console.log(rows.filter(r=>r.form>1&&['heliotrope','wisteria','blossom','almondblossom','verdigris','moss','ruby','raspberry'].includes(r.id)).map(r=>({name:r.name,tier:r.tier,wins:r.wins,score:+r.score.toFixed(4)})));process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
