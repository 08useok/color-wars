const fs=require('fs'),crypto=require('crypto'),make=require('./full-harness.cjs');
const data=require('../docs/simulations/tier-arena-benchmark-2026-10-30.json'),old=require('../docs/simulations/tier-current-2026-10-29.json'),e=make();
const key=c=>c.id+':'+c.form,names=c=>(e.names[c.id]||c.id)+' '+(e.units[c.id].noEvolve?'기본형':c.form+'진'),oldRows=new Map(old.rows.map(r=>[key(r),r]));
const rows=data.composed.map((r,i)=>({...r,rank:i+1,name:names(r),oldRank:oldRows.get(key(r))?.rank??null,grade:e.gradeOf(r.id)}));
const safeRows=rows.filter(r=>!r.coreMember);safeRows.forEach((r,i)=>r.comparableRank=i+1);
const jobs=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8').match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1];
const files=['game.js',...JSON.parse(jobs.replace(/'/g,'"'))],hashes=Object.fromEntries(files.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')]));
const best=new Map();for(let i=0;i<data.meta.length;i++){const m=data.meta[i],r=data.raw[i];if(!m.present)continue;const k=[m.map,m.id,m.form,m.seed].join('|'),s=r.win?2-r.seconds/300:0;if(!best.has(k)||best.get(k).score<s)best.set(k,{...r,...m,score:s});}
let md='# 티어 시험 구역 전체 아군 1차 측정 · 2026-10-30\n\n';
md+=`**${rows.length}개 형태**, 중복 제외 **${new Set(data.raw.map(r=>r.id)).size.toLocaleString()}판**을 9개 맵·Lv.30·시드 ${data.seeds}개·auto/smart2로 비교했다. 시작부터 수입 MAX, 시작 3,000원·초당 300원·지갑 18,000원·성 체력 300,000으로 고정했다. 기준덱은 레드·옐로우·블루·퍼플이며 다른 캐릭터를 한 칸 추가한 변화량이다. 후보 없는 동일 기준덱 결과는 재사용해 중복 전투를 줄였다.\n\n`;
md+='## 먼저 읽을 결과 한계\n\n이 결과는 새 맵에서의 **시험 순위**이며 정식 OP~X 티어표를 대체하지 않는다. 실패·시간 초과는 현재 모두 0점으로 묶어, 실패끼리의 적 처치량 차이를 반영하지 않는다. 승리는 `2-초/300`점이다. 맵별 후보 추가 이득을 백분위로 변환하고 각 1/9로 평균했다. 최선 출격 방식은 시드별로 선택했다.\n\n레드·옐로우·블루·퍼플은 기준덱에서 뺀 경우와 비교하므로 기준이 다르다. 이 네 명은 아래 비교 가능한 순위에서 제외하고 별도 표에 둔다. 나머지 후보의 백분위 계산 분포에는 이 네 항목이 포함되어 있으므로 점수 절대값에는 작은 영향이 남는다. 기존 단일 맵 순위는 다른 조건의 참고값이다.\n\n';
md+='## 새 캐릭터·3진\n\n|캐릭터|시험 순위(기준덱 4명 제외)|종합 점수|선택 방식 승리/27|\n|---|---:|---:|---:|\n';
for(const r of safeRows.filter(r=>['lilac','babypink','magenta','fusioncream','ocean','sea'].includes(r.id))){const rs=[...best.values()].filter(x=>x.id===r.id&&x.form===r.form);md+=`|${r.name}|${r.comparableRank}/${safeRows.length}|${r.score.toFixed(3)}|${rs.filter(x=>x.win).length}/${rs.length}|\n`;}
md+='\n## 3진 전후 종합 비교\n\n|캐릭터|2진 점수|3진 점수|점수 변화|\n|---|---:|---:|---:|\n';for(const id of ['lilac','babypink','magenta','fusioncream']){const a=rows.find(r=>r.id===id&&r.form===2),b=rows.find(r=>r.id===id&&r.form===3);if(a&&b)md+=`|${e.names[id]}|${a.score.toFixed(3)}|${b.score.toFixed(3)}|${(b.score-a.score).toFixed(3)}|\n`;}
md+='\n## 속성별 상위 후보\n\n';for(const map of data.maps){const selected=[...best.values()].filter(r=>r.map===map.i);md+=`### ${map.name}\n\n선택된 출격 방식 기준 승리 ${selected.filter(r=>r.win).length}/${selected.length}회.\n\n|순위|캐릭터|맵 내 백분위|추가 이득 점수|\n|---|---|---:|---:|\n`;const rs=data.perMap.filter(r=>r.map===map.i&&!data.core.includes(r.id)).sort((a,b)=>b.gain-a.gain);for(const [i,r]of rs.slice(0,8).entries())md+=`|${i+1}|${names(r)}|${r.pct.toFixed(3)}|${r.gain.toFixed(4)}|\n`;}
md+='\n## 전체 시험 순위\n\n|순위|캐릭터|희귀도|종합 점수|이전 단일 맵 순위(참고)|\n|---|---|---|---:|---:|\n';for(const r of safeRows)md+=`|${r.comparableRank}|${r.name}|${r.grade}|${r.score.toFixed(3)}|${r.oldRank??'신규'}|\n`;
md+='\n## 기준덱 멤버: 별도 참고\n\n|캐릭터|비대칭 측정 점수|\n|---|---:|\n';for(const r of rows.filter(r=>r.coreMember))md+=`|${r.name}|${r.score.toFixed(3)}|\n`;
md+='\n데이터: [원본](../simulations/tier-arena-benchmark-2026-10-30.json), [분석 JSON](../simulations/tier-arena-analysis-2026-10-30.json). 기존 전체 티어 문서는 유지했다. 커밋·푸시는 하지 않았다.\n';
fs.writeFileSync('docs/기획-시험/티어-시험구역-전체측정-2026-10-30.md',md);
const highlights=safeRows.filter(r=>['lilac','babypink','magenta','fusioncream','ocean','sea'].includes(r.id));
fs.writeFileSync('docs/simulations/tier-arena-analysis-2026-10-30.json',JSON.stringify({rows,highlights,hashes,uniqueSelectedResults:[...best.values()]},null,2));console.log(JSON.stringify({top:safeRows.slice(0,10),highlights},null,2));
