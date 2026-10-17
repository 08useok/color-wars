// 새 티어표(2진 / 3진 따로): 테스트 맵(황제의 야옹이 ★3) 이득 순위 기준. 출력: docs/티어표-2진-3진-2026-10-17.md
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=rd('docs/simulations/char-analysis-2026-10-17.json'),F=rd('docs/simulations/bench20-final-2026-10-17.json'),F2=rd('docs/simulations/bench20-ref2-2026-10-17.json'),TF=rd('docs/simulations/trueform-map-final-2026-10-17.json');
const e=mk();e.setProfile({level:30});
const MAP=A.map,allies=A.order,n=allies.length,names=c=>e.names[c];
const GR={basic:'기본',rare:'레어',sr:'슈퍼 레어',ex:'EX',uber:'울슈레'};
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const sec=g=>Math.round(g*300);
const gs=c=>A.gain[c]*300;// 초 단위 이득
// ---- 순위 95% 구간(시드 재추출)
const R1=F.core9,slope=A.bridge.slope,icpt=A.bridge.icpt;
let seed=4242;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const rk={};for(const c of allies)rk[c]=[];
for(let b=0;b<400;b++){
 const idx=Array.from({length:6},()=>Math.floor(rnd()*6));
 const g={};for(const c of allies)g[c]=R1.includes(c)?icpt+slope*mean(idx.map(k=>F2.seedGains[c][MAP][k])):mean(idx.map(k=>F.seedGains[c][MAP][k]));
 allies.slice().sort((a,b)=>g[b]-g[a]).forEach((c,i)=>rk[c].push(i+1));
}
const q=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.round(p*(s.length-1))]};
const rci=Object.fromEntries(allies.map(c=>[c,[q(rk[c],.025),q(rk[c],.975)]]));
// ---- 구간: 측정 오차(95%로 구분되려면 약 8초 차이)에 맞춘 8초 간격. +/− 없음.
const BANDS=['OP','SSS','SS','S','A','B','C','D','E','F','X'];
const EDGES=[70,62,54,46,38,30,22,14,10,6];// 이 값 이상이 위 구간
const bandOfSec=g=>{for(let b=0;b<EDGES.length;b++)if(g>=EDGES[b])return b;return BANDS.length-1};
const label={},bandMembers=BANDS.map(()=>[]);
for(const c of allies){const b=bandOfSec(gs(c));label[c]=BANDS[b];bandMembers[b].push(c)}
const SIZE=bandMembers.map(m=>m.length);
// 경계 근접: 점수가 구간 경계에서 표준오차 이내면 이웃 구간과 구분되지 않는다
const nearEdge=c=>{const g=gs(c),se=Math.max(2,A.se[c]*300);return EDGES.some(ed=>Math.abs(g-ed)<se)};
const labelAt=(g)=>BANDS[bandOfSec(g)];
const rankOf=(g,own)=>allies.filter(c=>c!==own&&gs(c)>g).length+1;
const HAS3=Object.keys(TF.out);
const L=[];
L.push('# 티어표 — 2진 / 3진 따로 (2026-10-17)','');
L.push('이전 티어표(10-16, 기준 맵 5곳 합산)를 대체한다. **보물 전부 완성 · 전원 Lv.30**, 테스트 맵 **황제의 야옹이 ★3(레전드 20장)**의 이득 순위 기준이다. 자세한 근거·원인은 [캐릭터-성능-원인-보고서](캐릭터-성능-원인-보고서-2026-10-17.md).','');
L.push('## 읽는 법','');
L.push('- **이득(초)** = 기준 덱(레드·옐로우·블루·퍼플)에 그 캐릭터를 더했을 때 이 맵의 클리어가 **몇 초 빨라지는가**. 기준 덱 멤버 4명은 겹치지 않는 두 번째 기준 덱으로 보정했다(†).');
L.push('- **순위 95% 구간**: 시드를 다시 뽑아 400번 계산한 순위 범위. **구간이 겹치는 이웃 티어와는 사실상 같은 급**이다.');
L.push('- **구간(8초 간격, +/− 없음)**: 한 캐릭터의 측정 오차(표준오차 중앙값 2.9초)로는 두 캐릭터가 95%로 구분되려면 **약 8초** 차이가 나야 한다. 그래서 이득 70초 이상 OP · 62~70 SSS · 54~62 SS · 46~54 S · 38~46 A · 30~38 B · 22~30 C · 14~22 D · 10~14 E · 6~10 F · 6 미만 X로 나눴다(F는 6~10초로 지정). 이웃 순위끼리의 점수 차 중앙값이 0.36초라 더 잘게 나누면 오차 안이다. 인원이 몰리는 구간(B 등)은 능력이 실제로 비슷한 캐릭터가 많다는 뜻이다.');
L.push(`- **경계 표시(▲)**: 점수가 구간 경계에서 표준오차 이내인 캐릭터는 이웃 구간과 구분되지 않는다. 표에 ▲로 표시했다.`);
L.push(`- **X(절대적 쓰레기)**: 이 맵에서 더해도 클리어가 **6초 미만** 빨라지는 캐릭터(${bandMembers[10].map(names).join('·')}). "이 맵에서 쓸모없다"이지 모든 상황에서 그렇다는 뜻은 아니다(특화·3진은 아래 참조).`);
L.push('- 이 맵은 **무속성 적 98%**라 좀비·메탈·에이리언·떠 있는 적 특화 능력은 평가되지 않는다. 특화 캐릭터가 낮게 나오면 "특화 맵 시험이 필요"로 읽는다.');
L.push('');
L.push('## 2진 티어표 (106명)','');
L.push('|티어|이득 구간|인원|캐릭터|');L.push('|---|---|---:|---|');
const rangeTxt=b=>b===0?'70초 이상':b===BANDS.length-1?'6초 미만':`${EDGES[b]}~${EDGES[b-1]}초`;
BANDS.forEach((bn,b)=>{const m=bandMembers[b];if(m.length)L.push(`|**${bn}**|${rangeTxt(b)}|${m.length}|${m.map(c=>names(c)+(nearEdge(c)?'▲':'')).join(' · ')}|`)});
L.push('');
L.push('### 2진 상세','');
L.push('|티어|순위 (95% 구간)|캐릭터|등급|클리어 단축|');L.push('|---|---:|---|---|---:|');
allies.forEach((c,i)=>{L.push(`|${label[c]}${nearEdge(c)?'▲':''}|${i+1} (${rci[c][0]}~${rci[c][1]})|${names(c)}${A.adjusted[c]?' †':''}|${GR[e.gradeOf(c)]}|${sec(A.gain[c])>=0?sec(A.gain[c])+'초':'−'+Math.abs(sec(A.gain[c]))+'초(지연)'}±${Math.round(A.se[c]*300)}|`)});
L.push('','† 기준 덱 멤버(레드·옐로우·블루·퍼플): 두 번째 기준 덱에서 보정한 값이라 순위가 더 불확실하다.','');
L.push('## 3진 티어표 (전용 3진 그림이 있는 9명)','');
L.push('3진 그림이 있는 캐릭터만 대상이다. **그 캐릭터만 3진으로, 나머지는 2진 그대로** 둔 상태에서 같은 맵의 이득을 쟀고, 2진 분포(위 표)와 같은 8초 구간에 넣어 티어를 정했다.');
L.push('');
L.push('|3진 티어|3진 순위|캐릭터|2진 티어 → 3진 티어|3진 이득 (2진 이득 + 3진 효과)|3진 정의 상태|');L.push('|---|---:|---|---|---:|---|');
const state={raspberry:'**새 정의**(체력·공격 ×1.5, 간격 3초, 사거리 39, 에일 초뎀, 베리어 브레이커 25%, 무한 관통·성장 ×1.21·상한 20)',gold:'기존 정의(5연타·처치 돈 ×1.5)',clover:'기존 정의(3연타·크리티컬 25%)',hotpink:'기존 정의(사거리 30 범위)',salmon:'기존 정의(파동 스토퍼 등)',cream:'기존 정의(범위·둔화 65%)',beige:'기존 정의(사거리 14·정지 60%)',crystal:'**새 정의**(크리티컬 20%, 에일 엄강, 베리어 브레이커 50%, 관통 4명 유지, 체력·공격 ×1.2)',indigo:'**새 정의**(체력·공격 ×1.4, 정지 55%·2.5초, 공격력 다운 무효)'};
const rows3=HAS3.map(c=>{const g3=gs(c)+TF.out[c].delta*300;return {c,g3,lab:labelAt(g3),rank:rankOf(g3,c)}}).sort((a,b)=>b.g3-a.g3);
for(const r of rows3){const d=TF.out[r.c].delta*300;L.push(`|${r.lab}|${r.rank}|${names(r.c)}|${label[r.c]} → **${r.lab}**|${Math.round(r.g3)}초 (${Math.round(gs(r.c))}초 ${d>=0?'+':'−'} ${Math.abs(Math.round(d))}초)±${Math.round(TF.out[r.c].se*300)}|${state[r.c]}|`)}
L.push('');
const solid=r=>Math.abs(TF.out[r.c].delta)*300>2*TF.out[r.c].se*300&&TF.out[r.c].delta*300>=3;// 오차의 2배 이상이고 3초 이상 단축될 때만 의미 있는 변화
const up=rows3.filter(r=>solid(r)&&BANDS.indexOf(r.lab)<BANDS.indexOf(label[r.c]));
const flat=rows3.filter(r=>!solid(r));
L.push(`- 3진으로 **티어가 한 칸 이상 오르는 캐릭터**(효과가 오차의 2배·3초 이상인 경우만): ${up.map(r=>`${names(r.c)}(${label[r.c]}→${r.lab})`).join(', ')||'없음'}.`);
if(flat.length)L.push(`- **3진 효과가 오차 안**이라 티어 변화를 인정하지 않는 캐릭터: ${flat.map(r=>`${names(r.c)}(${Math.round(TF.out[r.c].delta*300)}초)`).join(', ')}. 표의 3진 티어는 참고값이다.`);
L.push('- 크리스탈·인디고·라즈베리는 **새 3진 정의**로 쟀다. 이 맵은 무속성이라 에일 엄강·베리어 브레이커·정지 강화 같은 특화 능력의 몫은 반영되지 않는다(특화 맵 시험 결과는 보고서·커밋 메시지 참조).');
L.push('- 라즈베리의 에일 초뎀·베리어 브레이커는 이 맵(무속성)에서 쓰이지 않는다. **에이리언 맵에서는 2진 1.168 → 3진 1.724**로 훨씬 크게 오른다(라즈베리 3진 시험, 커밋 8d85ffd · docs/simulations/raspberry3-test-2026-10-17.json).');
L.push('');
L.push('## 한계','');
L.push('- 맵 한 곳 기준이다. 후보 맵끼리 순위 일치도가 0.49~0.72라 다른 맵에서는 순위가 바뀐다. **구간(±)이 겹치는 캐릭터는 같은 급**으로 본다.');
L.push('- 출격 방식(야옹컴 / 위기 때 싼 유닛부터) 중 나은 쪽을 골랐다. 실제 야옹컴만 쓰면 비싼 울슈레가 방어 유닛의 돈을 먹어 더 낮게 나온다.');
L.push('- 시험은 보물·3진 미커밋 코드를 포함한 작업 폴더 기준이다(코드 지문은 보고서에 기록).');
L.push('');
fs.writeFileSync(path.join(root,'docs/티어표-2진-3진-2026-10-17.md'),L.join('\n'));
console.log('인원',BANDS.map((b,i)=>b+' '+bandMembers[i].length).join(' · '));
console.log('3진',rows3.map(r=>names(r.c)+' '+label[r.c]+'→'+r.lab+'('+r.rank+'위)').join(', '));
process.exit(0);
