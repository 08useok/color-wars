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
// ---- 구간: 인원 목표(종 모양)에 맞추되 경계는 이웃 점수 차가 가장 큰 자리로 옮긴다
const BANDS=['OP','SSS','SS','S','A','B','C','D','E','F','X'];
const SIZE=[1,4,9,11,13,14,14,13,11,8,8];
const vals=allies.map(gs);// 내림차순
const cuts=[];let acc=0;
for(let b=0;b<BANDS.length-1;b++){
 acc+=SIZE[b];let best=acc,gap=-1;
 for(let r=Math.max(1,acc-2);r<=Math.min(n-1,acc+2);r++){const g=vals[r-1]-vals[r];if(g>gap+1e-9){gap=g;best=r}}
 cuts.push(best);acc=best;
}
const bandIdx=[];{let b=0;for(let r=1;r<=n;r++){while(b<cuts.length&&r>cuts[b])b++;bandIdx.push(b)}}
const tierOf={},bandMembers=BANDS.map(()=>[]);
allies.forEach((c,i)=>{bandMembers[bandIdx[i]].push(c)});
const label={};
BANDS.forEach((bn,b)=>{const m=bandMembers[b],k=Math.round(m.length/3);m.forEach((c,i)=>{label[c]=bn+(['OP','X'].includes(bn)?'':(i<k?'+':i>=m.length-k?'-':''))})});
// 3진 캐릭터를 2진 분포에 끼워 넣어 티어 판정
const secMin=b=>bandMembers[b].length?Math.min(...bandMembers[b].map(gs)):null,secMax=b=>bandMembers[b].length?Math.max(...bandMembers[b].map(gs)):null;
function placeAt(g){// g(초)가 들어갈 구간(2진 분포 기준)
 for(let b=0;b<BANDS.length;b++){const mx=secMax(b);if(g>=secMin(b)-1e-9&&(b===0||true)){if(g>=secMin(b))return b}}return BANDS.length-1}
function labelAt(g,own){
 const b=placeAt(g);const m=bandMembers[b].map(gs).filter((_,i)=>bandMembers[b][i]!==own).sort((x,y)=>y-x);
 if(['OP','X'].includes(BANDS[b]))return BANDS[b];
 if(!m.length)return BANDS[b];
 const k=Math.round(bandMembers[b].length/3);const upper=m[Math.min(k-1,m.length-1)],lower=m[Math.max(0,m.length-k)];
 return BANDS[b]+(g>=upper?'+':g<=lower?'-':'');
}
const rankOf=(g,own)=>allies.filter(c=>c!==own&&gs(c)>g).length+1;
const HAS3=Object.keys(TF.out);
const L=[];
L.push('# 티어표 — 2진 / 3진 따로 (2026-10-17)','');
L.push('이전 티어표(10-16, 기준 맵 5곳 합산)를 대체한다. **보물 전부 완성 · 전원 Lv.30**, 테스트 맵 **황제의 야옹이 ★3(레전드 20장)**의 이득 순위 기준이다. 자세한 근거·원인은 [캐릭터-성능-원인-보고서](캐릭터-성능-원인-보고서-2026-10-17.md).','');
L.push('## 읽는 법','');
L.push('- **이득(초)** = 기준 덱(레드·옐로우·블루·퍼플)에 그 캐릭터를 더했을 때 이 맵의 클리어가 **몇 초 빨라지는가**. 기준 덱 멤버 4명은 겹치지 않는 두 번째 기준 덱으로 보정했다(†).');
L.push('- **순위 95% 구간**: 시드를 다시 뽑아 400번 계산한 순위 범위. **구간이 겹치는 이웃 티어와는 사실상 같은 급**이다.');
L.push(`- **구간 경계**: 인원이 한 칸에 몰리지 않도록 종 모양(OP ${SIZE[0]} · SSS ${SIZE[1]} · SS ${SIZE[2]} · S ${SIZE[3]} · A ${SIZE[4]} · B ${SIZE[5]} · C ${SIZE[6]} · D ${SIZE[7]} · E ${SIZE[8]} · F ${SIZE[9]} · X ${SIZE[10]})로 잡고, 경계는 이웃 점수 차가 가장 큰 자리로 ±2계단 옮겼다. OP·X 외에는 구간 안 위 1/3이 +, 아래 1/3이 −.`);
L.push(`- **X(절대적 쓰레기)**: 이 맵에서 더해도 클리어가 **${Math.max(...bandMembers[10].map(gs)).toFixed(0)}초 이하** 빨라지는 캐릭터. "이 맵에서 쓸모없다"이지 모든 상황에서 그렇다는 뜻은 아니다(특화·3진은 아래 참조).`);
L.push('- 이 맵은 **무속성 적 98%**라 좀비·메탈·에이리언·떠 있는 적 특화 능력은 평가되지 않는다. 특화 캐릭터가 낮게 나오면 "특화 맵 시험이 필요"로 읽는다.');
L.push('');
L.push('## 2진 티어표 (106명)','');
L.push('|티어|인원|캐릭터|');L.push('|---|---:|---|');
BANDS.forEach((bn,b)=>{
 const m=bandMembers[b];
 const labels=['OP','X'].includes(bn)?[bn]:[bn+'+',bn,bn+'-'];
 for(const lb of labels){const mm=m.filter(c=>label[c]===lb);if(mm.length)L.push(`|**${lb}**|${mm.length}|${mm.map(names).join(' · ')}|`)}
});
L.push('');
L.push('### 2진 상세','');
L.push('|티어|순위 (95% 구간)|캐릭터|등급|클리어 단축|');L.push('|---|---:|---|---|---:|');
allies.forEach((c,i)=>{L.push(`|${label[c]}|${i+1} (${rci[c][0]}~${rci[c][1]})|${names(c)}${A.adjusted[c]?' †':''}|${GR[e.gradeOf(c)]}|${sec(A.gain[c])>=0?sec(A.gain[c])+'초':'−'+Math.abs(sec(A.gain[c]))+'초(지연)'}±${Math.round(A.se[c]*300)}|`)});
L.push('','† 기준 덱 멤버(레드·옐로우·블루·퍼플): 두 번째 기준 덱에서 보정한 값이라 순위가 더 불확실하다.','');
L.push('## 3진 티어표 (전용 3진 그림이 있는 9명)','');
L.push('3진 그림이 있는 캐릭터만 대상이다. **그 캐릭터만 3진으로, 나머지는 2진 그대로** 둔 상태에서 같은 맵의 이득을 쟀고, 2진 분포(위 표)에 끼워 넣어 티어를 정했다.');
L.push('');
L.push('|3진 티어|3진 순위|캐릭터|2진 티어 → 3진 티어|3진 이득 (2진 이득 + 3진 효과)|3진 정의 상태|');L.push('|---|---:|---|---|---:|---|');
const state={raspberry:'**새 정의**(체력·공격 ×1.5, 간격 3초, 사거리 39, 에일 초뎀, 베리어 브레이커 25%, 무한 관통·성장 ×1.21·상한 20)',gold:'기존 정의(5연타·처치 돈 ×1.5)',clover:'기존 정의(3연타·크리티컬 25%)',hotpink:'기존 정의(사거리 30 범위)',salmon:'기존 정의(파동 스토퍼 등)',cream:'기존 정의(범위·둔화 65%)',beige:'기존 정의(사거리 14·정지 60%)',crystal:'**새 정의**(크리티컬 20%, 에일 엄강, 베리어 브레이커 50%, 관통 4명 유지, 체력·공격 ×1.2)',indigo:'**새 정의**(체력·공격 ×1.4, 정지 55%·2.5초, 공격력 다운 무효)'};
const rows3=HAS3.map(c=>{const g3=gs(c)+TF.out[c].delta*300;return {c,g3,lab:labelAt(g3,c),rank:rankOf(g3,c)}}).sort((a,b)=>b.g3-a.g3);
for(const r of rows3){const d=TF.out[r.c].delta*300;L.push(`|${r.lab}|${r.rank}|${names(r.c)}|${label[r.c]} → **${r.lab}**|${Math.round(r.g3)}초 (${Math.round(gs(r.c))}초 ${d>=0?'+':'−'} ${Math.abs(Math.round(d))}초)±${Math.round(TF.out[r.c].se*300)}|${state[r.c]}|`)}
L.push('');
const solid=r=>Math.abs(TF.out[r.c].delta)*300>2*TF.out[r.c].se*300&&TF.out[r.c].delta*300>=3;// 오차의 2배 이상이고 3초 이상 단축될 때만 의미 있는 변화
const up=rows3.filter(r=>solid(r)&&BANDS.indexOf(r.lab.replace(/[+-]/,''))<BANDS.indexOf(label[r.c].replace(/[+-]/,'')));
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
console.log('구간 경계(순위)',cuts.join(','));
console.log('인원',BANDS.map((b,i)=>b+' '+bandMembers[i].length).join(' · '));
console.log('3진',rows3.map(r=>names(r.c)+' '+label[r.c]+'→'+r.lab+'('+r.rank+'위)').join(', '));
process.exit(0);
