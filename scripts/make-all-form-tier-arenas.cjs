const fs=require('fs'),crypto=require('crypto'),assert=require('node:assert/strict'),e=require('./full-harness.cjs')(),data=require('../docs/simulations/tier-arena-all-forms-2026-10-30.json');
const bands=['OP','SSS','SS','S','A','B','C','D','E','F','X'],edges=[.9,.79,.72,.6,.5,.4,.3,.22,.15,.08,0],gradeNames={basic:'기본',rare:'레어',sr:'슈퍼 레어',uber:'울슈레',ex:'EX'};
const old=require('../docs/simulations/tier-arena-benchmark-2026-10-30.json'),byKey=new Map(old.composed.map(r=>[r.id+':'+r.form,r]));
const anchor=require('../docs/simulations/tier-arena-current-2026-10-30.json'),prior=require('../docs/simulations/tier-arena-grades-2026-10-30.json');
for(const r of data.perMap){const refs=anchor.perMap.filter(v=>v.map===r.map);if(r.form===1)r.pct=(refs.filter(v=>v.gain<r.gain-1e-9).length+refs.filter(v=>Math.abs(v.gain-r.gain)<=1e-9).length/2)/refs.length;else r.pct=refs.find(v=>v.id===r.id&&v.form===r.form).pct;}
for(const c of data.composed)c.score=data.perMap.filter(r=>r.id===c.id&&r.form===c.form).reduce((sum,r)=>sum+r.pct/9,0);data.composed.sort((a,b)=>b.score-a.score);
data.firstForms.percentileReference='Fixed 144-form second/third distribution; existing scores and tiers preserved. First forms are inserted individually into each original map distribution.';
fs.writeFileSync('docs/simulations/tier-arena-all-forms-2026-10-30.json',JSON.stringify(data,null,2));
const rows=data.composed.map(r=>({...r,name:e.names[r.id]+' '+(e.units[r.id].noEvolve?'기본형':r.form+'진'),grade:e.gradeOf(r.id),baseTier:bands[Math.max(0,edges.findIndex(x=>r.score>=x))]}));
// A low aggregate score alone does not prove the absence of niche value.
for(const r of rows)if(r.baseTier==='X')r.baseTier='F';
const main=rows.filter(r=>!r.coreMember),reference=rows.filter(r=>r.coreMember);main.forEach((r,i)=>r.rank=i+1);
for(const band of bands){const list=main.filter(r=>r.baseTier===band),n=list.length,third=Math.floor(n/3);for(const r of list){const eq=list.map((v,i)=>[v,i]).filter(([v])=>Math.abs(v.score-r.score)<1e-9).map(([,i])=>i),mid=(eq[0]+eq.at(-1))/2;r.tier=band+(band==='OP'||!third?'':mid<third?'+':mid>=n-third?'-':'');}}
for(const r of reference)r.tier=r.baseTier+'†';
for(const r of rows){const previous=prior.rows.find(v=>v.id===r.id&&v.form===r.form);if(previous){r.tier=previous.tier;assert.equal(r.score,previous.score,'preserved previous score '+r.id+':'+r.form);}else if(!r.coreMember&&r.baseTier!=='OP'){
 const refs=prior.rows.filter(v=>!v.coreMember&&v.baseTier===r.baseTier),plus=refs.filter(v=>v.tier.endsWith('+')),minus=refs.filter(v=>v.tier.endsWith('-'));
 r.tier=r.baseTier+(plus.length&&r.score>=Math.min(...plus.map(v=>v.score))?'+':minus.length&&r.score<=Math.max(...minus.map(v=>v.score))?'-':'');
}}

assert.equal(rows.length,266);assert(main.every(r=>r.tier&&Number.isFinite(r.score)));assert.equal(data.refresh.baselineChecks,54);
const intro='# 아군 티어표 · 1진·2진·3진 · 9개 시험 맵 종합 (2026-10-30)\n\n현재 기준은 범용·빨간 적·검은 적·천사·에이리언·떠 있는 적·메탈·좀비·파동 시험 각 1/9이다. **266개 형태: 비교 가능한 258개 + 기준덱 4명의 1·2진 8개 별도 참고.** 1진 122명을 6,588판 새로 측정하고 기준덱 54판의 재현성도 확인해 합쳤다. 기존 2·3진의 전투 결과·점수·티어·+/−는 유지한다. 새 1진은 기존 144개 형태의 맵별 분포에 각각 넣어 백분위를 구하고, 같은 등급 경계와 기존 부호 경계로 평가했다. 전체 순위 번호는 1진 합류에 따라 달라진다. 라일락·베이비 핑크·마젠타·퓨전 크림 3진은 공체 150%를 반영해 216판 재측정했고, 기준덱 54판이 이전 결과와 정확히 일치함을 확인했다. 나머지는 앞선 전체 7,992판 결과를 재사용했다.\n\nLv.30·보물 완성·시드 3·auto/smart2 중 시드별 높은 결과. 후보를 기준덱(레드·옐로우·블루·퍼플)에 한 칸 추가한 이득의 맵별 백분위를 평균한다. 승리 점수는 `2-초/300`, 패배·시간 초과는 모두 0이다. 실패 사이의 진행도 차이는 반영하지 않는 **1차 종합 티어**이며 전체 맵의 보편적 성능을 뜻하지 않는다.\n\n경계는 기존 백분위 체계(OP .90 / SSS .79 / SS .72 / S .60 / A .50 / B .40 / C .30 / D .22 / E .15 / F .08)를 유지해 새 맵 도입과 임의 구간 재분배를 섞지 않았다. 기존 2·3진의 +/−는 구간 내 상위·하위 1/3로 정한 표기를 유지한다. 새 1진은 그 기존 점수 경계에 따라 부호를 붙인다. X는 낮은 점수만으로 지정하지 않고 특화 가치까지 없는지 별도 확인하므로 이번 자동 판정에서는 보류한다.\n\n기준덱 네 명의 1·2진은 본인을 뺀 덱과 비교해 기준이 다르므로 **† 참고 티어**, 전체 순위와 +/−에서는 제외한다. 순위 차이보다 비슷한 점수와 속성별 결과를 함께 보는 것이 좋다.\n\n';
let md=intro+'## 티어 한눈에\n\n|티어|캐릭터|인원|\n|---|---|---:|\n';for(const b of bands){const tiers=[...new Set(main.filter(r=>r.baseTier===b).map(r=>r.tier))];if(!tiers.length)md+=`|${b}|—|0|\n`;for(const t of tiers){const rs=main.filter(r=>r.tier===t);md+=`|**${t}**|${rs.map(r=>r.name).join(' · ')}|${rs.length}|\n`;}}
md+='\n## 캐릭터별 진화 비교\n\n|캐릭터|1진|2진|3진|\n|---|---|---|---|\n';for(const id of e.roster){const form=f=>{const r=rows.find(v=>v.id===id&&v.form===f);return r?r.tier+' ('+r.score.toFixed(3)+')':'—';};md+=`|${e.names[id]}|${form(1)}|${form(2)}|${form(3)}|\n`;}
md+='\n## 전체 순위\n\n|순위|티어|캐릭터|희귀도|종합 점수|\n|---|---|---|---|---:|\n';for(const r of main)md+=`|${r.rank}|${r.tier}|${r.name}|${gradeNames[r.grade]||r.grade}|${r.score.toFixed(3)}|\n`;
md+='\n## 기준덱 멤버 · 별도 참고\n\n|참고 티어|캐릭터|점수|\n|---|---|---:|\n';for(const r of reference)md+=`|${r.tier}|${r.name}|${r.score.toFixed(3)}|\n`;
md+='\n## 공체 150% 반영 전후\n\n|3진|이전 종합 점수|현재 종합 점수|현재 티어|\n|---|---:|---:|---|\n';for(const r of main.filter(r=>data.refresh.changed.includes(r.id)&&r.form===3))md+=`|${r.name}|${byKey.get(r.id+':3').score.toFixed(3)}|${r.score.toFixed(3)}|${r.tier}|\n`;
md+='\n[측정 원본](../simulations/tier-arena-all-forms-2026-10-30.json) · [등급별 표](등급별-아군-1진-2진-3진-2026-10-30.md) · [이전 단일 맵 표](티어표-2진-3진-2026-10-29.md). 게임 도감의 역할 중심 총평에는 시험 등급을 넣지 않는다.\n';
fs.writeFileSync('docs/티어표/티어표-1진-2진-3진-2026-10-30.md',md);
let rarity='# 등급별 아군 티어리스트 · 9개 시험 맵 (2026-10-30)\n\n[측정 방식·통합표](티어표-1진-2진-3진-2026-10-30.md). 공체 150% 신규 3진 반영. †는 기준덱 멤버의 비대칭 참고 티어이며 등급 내 순위에서도 제외한다.\n\n';
for(const g of [...new Set(rows.map(r=>r.grade))]){rarity+='## '+(gradeNames[g]||g)+'\n\n|등급 내 순위|종합 순위|티어|캐릭터|점수|\n|---|---|---|---|---:|\n';main.filter(r=>r.grade===g).forEach((r,i)=>{rarity+=`|${i+1}|${r.rank}|${r.tier}|${r.name}|${r.score.toFixed(3)}|\n`;});for(const r of reference.filter(r=>r.grade===g))rarity+=`|참고|—|${r.tier}|${r.name}|${r.score.toFixed(3)}|\n`;rarity+='\n';}
fs.writeFileSync('docs/티어표/등급별-아군-1진-2진-3진-2026-10-30.md',rarity);
fs.writeFileSync('docs/티어표/README.md','# 아군 티어표\n\n- [최신 1진·2진·3진 통합표](티어표-1진-2진-3진-2026-10-30.md)\n- [최신 등급별 티어표](등급별-아군-1진-2진-3진-2026-10-30.md)\n- [이전 단일 맵 표](티어표-2진-3진-2026-10-29.md)\n\n2026-10-30: 9개 시험 맵 종합·266개 형태·공체 150% 신규 3진 반영. 기준덱 네 명의 1·2진은 별도 참고. 실패끼리의 진행도 차이를 반영하지 않는 1차 종합 티어다. 이전 날짜 문서는 과거 기록이다.\n');
const hashes=Object.fromEntries(['third-forms-74.js','tier-test-stages.js'].map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')]));fs.writeFileSync('docs/simulations/tier-arena-all-form-grades-2026-10-30.json',JSON.stringify({edges,bands,rows,hashes,refresh:data.refresh},null,2));
console.log(main.filter(r=>data.refresh.changed.includes(r.id)&&r.form===3).map(r=>({name:r.name,tier:r.tier,rank:r.rank,score:r.score})));console.log('PASS 266 tier entries, 258 ranked + 8 reference; README and both tables updated');
