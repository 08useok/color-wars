// 새 티어표(2진 / 3진 따로): 테스트 맵(황제의 야옹이 ★3) 이득 순위 기준. 출력: docs/티어표/티어표-2진-3진-2026-10-19.md
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=rd('docs/simulations/char-analysis-2026-10-19.json'),F=rd('docs/simulations/bench20-final-2026-10-19.json'),F2=rd('docs/simulations/bench20-ref2-2026-10-19.json'),TF=rd('docs/simulations/trueform-map-2026-10-19.json');
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
 const idx=Array.from({length:F.seeds},()=>Math.floor(rnd()*F.seeds));
 const g={};for(const c of allies)g[c]=R1.includes(c)?icpt+slope*mean(idx.map(k=>F2.seedGains[c][MAP][k])):mean(idx.map(k=>F.seedGains[c][MAP][k]));
 allies.slice().sort((a,b)=>g[b]-g[a]).forEach((c,i)=>rk[c].push(i+1));
}
const q=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.round(p*(s.length-1))]};
const rci=Object.fromEntries(allies.map(c=>[c,[q(rk[c],.025),q(rk[c],.975)]]));
// ---- Base score bands stay unchanged. Split each non-OP band into rank thirds.
const {makeLadder}=require('./tier-ladder.cjs');
const LAD=makeLadder(allies.map(c=>A.gain[c]*300),allies.map(c=>A.se[c]*300));
const BANDS=LAD.BANDS,EDGES=LAD.edges;// 구간 폭·시작점은 이번 측정 분포에서 정한다(tier-ladder.cjs)
const bandOfSec=LAD.bandIndex;
const label={},bandMembers=BANDS.map(()=>[]);
for(const c of allies){const b=bandOfSec(gs(c));label[c]=BANDS[b];bandMembers[b].push(c)}
const SIZE=bandMembers.map(m=>m.length);
const baseLabel={...label};
for(let b=1;b<BANDS.length;b++){
 const members=bandMembers[b],cut=Math.floor(members.length/3);
 members.forEach((c,i)=>{label[c]=BANDS[b]+(i<cut?'+':cut&&i>=members.length-cut?'-':'')});
}
const DISPLAY_BANDS=BANDS.flatMap((b,i)=>i===0?[b]:[b+'+',b,b+'-']);
// 경계 근접: 점수가 구간 경계에서 표준오차 이내면 이웃 구간과 구분되지 않는다
const nearEdge=c=>{const g=gs(c),se=Math.max(2,A.se[c]*300);return EDGES.some(ed=>Math.abs(g-ed)<se)};
const labelAt=(g)=>BANDS[bandOfSec(g)];
const rankOf=(g,own)=>allies.filter(c=>c!==own&&gs(c)>g).length+1;
const HAS3=Object.keys(TF.out);
const L=[];
L.push('# 티어표 — 2진 / 3진 따로 (2026-10-19)','');
L.push('이전 티어표(10-17~18)를 대체한다. 10-18의 v6.7.2(적이 적 성 뒤로 넉백되지 않음)로 전투 결과가 바뀌어 **전원(신규 아종 4명·코랄 3진 포함)을 현재 코드로 처음부터 다시 쟀다**(커밋 42c8ac2, 시드 10개). **보물 전부 완성 · 전원 Lv.30**, 테스트 맵 **황제의 야옹이 ★3(레전드 20장)**의 이득 순위 기준이다. 자세한 근거·원인은 [캐릭터-성능-원인-보고서](캐릭터-성능-원인-보고서-2026-10-19.md).','');
L.push('## 읽는 법','');
L.push('- **이득(초)** = 기준 덱(레드·옐로우·블루·퍼플)에 그 캐릭터를 더했을 때 이 맵의 클리어가 **몇 초 빨라지는가**. 기준 덱 멤버 4명은 겹치지 않는 두 번째 기준 덱으로 보정했다(†).');
L.push('- **순위 95% 구간**: 시드를 다시 뽑아 400번 계산한 순위 범위. **구간이 겹치는 이웃 티어와는 사실상 같은 급**이다.');
L.push(`- **기본 구간(이번 측정 분포에 맞게 새로 잡음)**: 한 캐릭터의 측정 오차(표준오차 중앙값 ${LAD.medianSe.toFixed(1)}초)로는 두 캐릭터가 95%로 구분되려면 약 ${(1.96*Math.SQRT2*LAD.medianSe).toFixed(1)}초 차이가 나야 해서 구간 폭을 **${LAD.width}초**로 했다. 가장 높은 구간(OP)은 2위 이득의 내림값(${EDGES[0]}초)부터 시작해 OP에 2명 안팎이 들어가게 했다. ${LAD.summary}.`);
L.push('- **+/− 세분화**: OP를 제외한 각 기본 등급 안에서 순위 상위 1/3은 +, 하위 1/3은 -, 가운데는 무표다. 예: A+ → A → A- → B+ → B → B-. 각 끝에 배정할 인원은 등급 인원÷3의 내림값이며, 남는 인원은 가운데에 둔다. 3명 미만인 등급은 무표로 둔다.');
L.push('- 기존 세모 표시는 없앴다. **+/−는 같은 등급 안의 순서 표시이며 통계적으로 확정된 성능 차이가 아니다.** 측정 불확실성은 상세 표의 순위 95% 구간과 이득 ±표준오차로 확인한다.');
L.push(`- **X(절대적 쓰레기)**: 이 맵에서 더하면 클리어가 **${LAD.rangeText(10)}**인 캐릭터(${bandMembers[10].map(names).join('·')}). ${EDGES[EDGES.length-1]<0?'기준 덱만 쓸 때보다 오히려 느려지는 쪽이다. ':''}"이 맵에서 쓸모없다"이지 모든 상황에서 그렇다는 뜻은 아니다(특화·3진은 아래 참조).`);
L.push('- 이 맵은 **무속성 적 98%**라 좀비·메탈·에이리언·떠 있는 적 특화 능력은 평가되지 않는다. 특화 캐릭터가 낮게 나오면 "특화 맵 시험이 필요"로 읽는다.');
L.push('');
L.push(`## 2진 티어표 (${n}명)`,'');
L.push('|티어|이득 구간|인원|캐릭터|');L.push('|---|---|---:|---|');
const rangeTxt=LAD.rangeText;
DISPLAY_BANDS.forEach(bn=>{const m=allies.filter(c=>label[c]===bn),base=BANDS.indexOf(bn.replace(/[+-]$/,''));if(m.length)L.push(`|**${bn}**|${rangeTxt(base)}${bn.endsWith('+')?' · 상위 1/3':bn.endsWith('-')?' · 하위 1/3':''}|${m.length}|${m.map(names).join(' · ')}|`)});
L.push('');
L.push('### 2진 상세','');
L.push('|티어|순위 (95% 구간)|캐릭터|등급|클리어 단축|');L.push('|---|---:|---|---|---:|');
allies.forEach((c,i)=>{L.push(`|${label[c]}|${i+1} (${rci[c][0]}~${rci[c][1]})|${names(c)}${A.adjusted[c]?' †':''}|${GR[e.gradeOf(c)]}|${sec(A.gain[c])>=0?sec(A.gain[c])+'초':'−'+Math.abs(sec(A.gain[c]))+'초(지연)'}±${Math.round(A.se[c]*300)}|`)});
L.push('','† 기준 덱 멤버(레드·옐로우·블루·퍼플): 두 번째 기준 덱에서 보정한 값이라 순위가 더 불확실하다.','');
L.push(`## 3진 티어표 (전용 3진 그림이 있는 ${HAS3.length}명)`,'');
L.push('3진 그림이 있는 캐릭터만 대상이다. **그 캐릭터만 3진으로, 나머지는 2진 그대로** 둔 상태에서 같은 맵의 이득을 쟀고, 2진 분포(위 표)와 같은 구간에 넣어 티어를 정했다.');
L.push('');
// exit: 2진이 X 티어인데 3진으로 X를 벗어나는(효과가 오차의 2배·3초 이상) 캐릭터
const EXIT='ᵉˣⁱᵗ';// 지수처럼 작게 붙이는 exit 표시
const isExit=r=>/^X/.test(label[r.c])&&!/^X/.test(r.lab)&&Math.abs(TF.out[r.c].delta)*300>2*TF.out[r.c].se*300&&TF.out[r.c].delta*300>=3;
L.push('|3진 티어|3진 순위|캐릭터|등급|2진 티어 → 3진 티어|3진 이득 (2진 이득 + 3진 효과)|3진 정의 상태|');L.push('|---|---:|---|---|---|---:|---|');
const state={lava:'**새 정의**(체력 ×1.5·공격 ×1.4, 간격 3.2초, 사거리 +10%, 검은 적 공격 25% 확률 3.3초 무효)',raspberry:'**새 정의**(체력·공격 ×1.5, 간격 3초, 사거리 39, 에일 초뎀, 베리어 브레이커 25%, 무한 관통·성장 ×1.21·상한 20)',gold:'기존 정의(5연타·처치 돈 ×1.5)',clover:'기존 정의(3연타·크리티컬 25%)',hotpink:'기존 정의(사거리 30 범위)',salmon:'기존 정의(파동 스토퍼 등)',cream:'기존 정의(범위·둔화 65%)',beige:'기존 정의(사거리 14·정지 60%)',coral:'**6.8.0 정의**(범위 2연타 각 50%·공체 150%/140%·350원·재생산 20초)',crystal:'**새 정의**(크리티컬 20%, 에일 엄강, 베리어 브레이커 50%, 관통 4명 유지, 체력·공격 ×1.2)',indigo:'**새 정의**(체력·공격 ×1.4, 정지 55%·2.5초, 공격력 다운 무효)'};
const rows3=HAS3.map(c=>{const g3=gs(c)+TF.out[c].delta*300;return {c,g3,lab:labelAt(g3),rank:rankOf(g3,c)}}).sort((a,b)=>b.g3-a.g3);
// Third forms form their own table and are split into thirds within that table's base bands.
for(const base of BANDS.slice(1)){
 const members=rows3.filter(r=>r.lab===base),cut=Math.floor(members.length/3);
 members.forEach((r,i)=>{r.lab=base+(i<cut?'+':cut&&i>=members.length-cut?'-':'')});
}
for(const r of rows3){const d=TF.out[r.c].delta*300;L.push(`|${r.lab}|${r.rank}|${names(r.c)}|${GR[e.gradeOf(r.c)]}|${label[r.c]} → **${r.lab}**${isExit(r)?' '+EXIT:''}|${Math.round(r.g3)}초 (${Math.round(gs(r.c))}초 ${d>=0?'+':'−'} ${Math.abs(Math.round(d))}초)±${Math.round(TF.out[r.c].se*300)}|${state[r.c]}|`)}
L.push('');
const solid=r=>Math.abs(TF.out[r.c].delta)*300>2*TF.out[r.c].se*300&&TF.out[r.c].delta*300>=3;// 오차의 2배 이상이고 3초 이상 단축될 때만 의미 있는 변화
const up=rows3.filter(r=>solid(r)&&BANDS.indexOf(r.lab.replace(/[+-]$/,''))<BANDS.indexOf(baseLabel[r.c]));
const flat=rows3.filter(r=>!solid(r));
L.push(`- **X 탈출(exit)**: 2진이 X 티어인데 3진으로 X를 벗어나는 캐릭터 — ${rows3.filter(isExit).map(r=>`${names(r.c)}(${label[r.c]}→${r.lab})`).join(', ')||'없음'}. 같은 X 티어의 민트·애저·라벤더는 3진이 없어 그대로다.`);
L.push(`- 3진으로 **티어가 한 칸 이상 오르는 캐릭터**(효과가 오차의 2배·3초 이상인 경우만): ${up.map(r=>`${names(r.c)}(${label[r.c]}→${r.lab})`).join(', ')||'없음'}.`);
if(flat.length)L.push(`- **3진 효과가 오차 안**이라 티어 변화를 인정하지 않는 캐릭터: ${flat.map(r=>`${names(r.c)}(${Math.round(TF.out[r.c].delta*300)}초)`).join(', ')}. 표의 3진 티어는 참고값이다.`);
L.push('- 크리스탈·인디고·라즈베리·코랄은 **새 3진 정의**로 쟀다. 이 맵은 무속성이라 에일 엄강·베리어 브레이커·정지 강화 같은 특화 능력의 몫은 반영되지 않는다(특화 맵 시험 결과는 보고서·커밋 메시지 참조).');
L.push('- 라즈베리의 에일 초뎀·베리어 브레이커는 이 맵(무속성)에서 쓰이지 않는다. **에이리언 맵에서는 2진 1.168 → 3진 1.724**로 훨씬 크게 오른다(라즈베리 3진 시험, 커밋 8d85ffd · docs/simulations/raspberry3-test-2026-10-17.json).');
L.push('');
L.push('## 한계','');
L.push('- 맵 한 곳 기준이다. 후보 맵끼리 순위 일치도가 0.49~0.72라 다른 맵에서는 순위가 바뀐다. **구간(±)이 겹치는 캐릭터는 같은 급**으로 본다.');
L.push('- 출격 방식(야옹컴 / 위기 때 싼 유닛부터) 중 나은 쪽을 골랐다. 실제 야옹컴만 쓰면 비싼 울슈레가 방어 유닛의 돈을 먹어 더 낮게 나온다.');
L.push('- 전원 재측정은 커밋 42c8ac2(v6.8.0) 코드 기준(10-19)이고, 신캐(크리스프·대북 라바 3진)와 사각지대 정리(v6.9.1) 뒤에 v6.9.1 코드로 전원을 다시 쟀다(10-22). 전투 규칙이 바뀌면(예: v6.7.2 넉백 변경) 이전 티어표와 숫자가 달라진다.');
L.push('- **사각지대(원거리) 기준을 바꿔도(v6.9.1: 아군 기본 사거리 24 이상, 클로버·아틀라스 레드 등 15명의 사각지대 제거) 이 맵 결과는 한 명도 달라지지 않았다.** 측정 덱에 앞에서 버티는 아군이 있어 사각지대가 영향을 주지 않는다. 사각지대의 영향은 [1대1 순위 시험](../기획-시험/1대1-순위-2026-10-22.md)에서 크게 보였지만, 그 시험은 혼자 싸울 때의 힘이라 이 티어표와 다른 지표다.');
L.push('');
fs.writeFileSync(path.join(root,'docs/티어표/티어표-2진-3진-2026-10-19.md'),L.join('\n'));
console.log('인원',BANDS.map((b,i)=>b+' '+bandMembers[i].length).join(' · '));
console.log('3진',rows3.map(r=>names(r.c)+' '+label[r.c]+'→'+r.lab+'('+r.rank+'위)').join(', '));
// Rarity views retain the global labels so the same unit never changes tier merely by filtering.
const rarityDoc=['# 등급별 아군 티어리스트 (2026-10-19)','','기본 · EX · 레어 · 슈퍼 레어 · 울슈레별로 기존 티어표를 나눴다. **전원 Lv.30 · 보물 완성 · 황제의 야옹이 ★3** 측정 결과이며, 전원을 현재 코드로 다시 쟀다.','','- 티어와 +/−는 [전체 티어표](티어표-2진-3진-2026-10-19.md)와 동일하다. 레어도마다 티어를 다시 배정하지 않는다.','- 등급 내 순위는 같은 레어도끼리 비교한 순서다. 2진과 3진은 한 표 안에서 함께 보이게 하되 3진은 (3진)으로 구분한다. 2진 평가의 상위권·중위권·하위권·최하위권은 등급 내 순위를 순서대로 약 25%씩 나눈 표현이다.','- 이득은 기준 덱 대비 클리어 단축 시간이다. 오차가 겹치는 순위는 확정적인 우열이 아니다.','- 무속성 중심 맵 한 곳 기준이므로 특화 능력은 충분히 반영되지 않는다. X도 이 맵에서 낮게 측정됐다는 뜻이다.','','## 인원 요약','','|등급|2진|3진|','|---|---:|---:|'];
const rarityOrder=['basic','ex','rare','sr','uber'];
for(const grade of rarityOrder)rarityDoc.push(`|${GR[grade]}|${allies.filter(c=>e.gradeOf(c)===grade).length}|${rows3.filter(r=>e.gradeOf(r.c)===grade).length}|`);
// ── 한눈에 보기: 등급 × 티어 표(2진), 3진 티어별 표
const supOf=l=>l.endsWith('+')?'⁺':l.endsWith('-')?'⁻':'',baseOf=l=>l.replace(/[+-]$/,'');
rarityDoc.push('','## 한눈에 보기','','### 등급 × 티어 (2진 + 3진)','','한 칸 안은 이득이 큰 순서이고, **(3진)**은 그 캐릭터를 3진으로 쟀을 때의 티어다(같은 캐릭터가 2진과 3진 두 곳에 나온다). 표시 ᵉˣⁱᵗ는 2진이 X 티어인데 3진으로 X를 벗어난다는 뜻이다(→ 뒤는 3진 티어). 이름 오른쪽 ⁺는 그 티어의 상위 1/3, ⁻는 하위 1/3이고 표시가 없으면 가운데다. † 기준 덱 멤버는 두 번째 덱에서 보정한 값이다.','',`|티어|${rarityOrder.map(g=>GR[g]).join('|')}|합계|`,`|---|${rarityOrder.map(()=>'---').join('|')}|---:|`);
// 2진 전원 + 3진 11명(3진 이름 표시)을 한 표에 넣는다. 한 칸 안은 이득 순서.
const entries=[...allies.map(c=>({c,tf:false,tier:label[c],v:gs(c)})),...rows3.map(r=>({c:r.c,tf:true,tier:r.lab,v:r.g3}))];
const exitOf=c=>rows3.find(r=>r.c===c&&isExit(r));
const cellName=x=>(x.tf?names(x.c)+'(3진)':names(x.c))+supOf(x.tier)+(!x.tf&&A.adjusted[x.c]?'†':'')+(!x.tf&&exitOf(x.c)?EXIT+'→'+exitOf(x.c).lab:'');
for(const b of BANDS){const inB=entries.filter(x=>baseOf(x.tier)===b).sort((p,q)=>q.v-p.v);if(!inB.length)continue;
 if(b===BANDS[0]){const one=new Set(inB.map(x=>e.gradeOf(x.c))).size===1;rarityDoc.push(`|**${b}**|${one?inB.map(cellName).join(' · ')+' ('+GR[e.gradeOf(inB[0].c)]+')':inB.map(x=>cellName(x)+' ('+GR[e.gradeOf(x.c)]+')').join(' · ')}${rarityOrder.slice(1).map(()=>'|').join('')}|${inB.length}|`);continue}// OP는 등급 칸을 하나로 합쳐 적는다
 rarityDoc.push(`|**${b}**|${rarityOrder.map(g=>{const m=inB.filter(x=>e.gradeOf(x.c)===g);return m.length?m.map(cellName).join(' · '):'·'}).join('|')}|${inB.length}|`)}
rarityDoc.push(`|**합계**|${rarityOrder.map(g=>{const a=allies.filter(c=>e.gradeOf(c)===g).length,t=rows3.filter(r=>e.gradeOf(r.c)===g).length;return t?a+' (+3진 '+t+')':a}).join('|')}|${allies.length} (+3진 ${rows3.length})|`);
rarityDoc.push('',`### 3진 (${rows3.length}명)`,'','3진 그림이 있는 캐릭터만 대상이다. **그 캐릭터만 3진으로, 나머지는 2진 그대로** 둔 상태의 이득이고, 티어 구간은 2진 표와 같다. 괄호는 (등급 · 2진 티어 → 3진 티어)다.','','|3진 티어|인원|캐릭터|','|---|---:|---|');
for(const t of DISPLAY_BANDS){const g=rows3.filter(r=>r.lab===t);if(g.length)rarityDoc.push(`|**${t}**|${g.length}|${g.map(r=>`${names(r.c)} (${GR[e.gradeOf(r.c)]} · ${label[r.c]} → ${r.lab})${isExit(r)?EXIT:''}`).join(' · ')}|`)}
rarityDoc.push('','**3진으로 티어가 오른 폭이 큰 순서**: '+[...rows3].map(r=>({r,up:BANDS.indexOf(baseOf(label[r.c]))-BANDS.indexOf(baseOf(r.lab))})).sort((x,y)=>y.up-x.up||y.r.g3-x.r.g3).slice(0,5).map(({r,up})=>`${names(r.c)} ${label[r.c]}→${r.lab}${up>0?' (▲'+up+')':up<0?' (▼'+(-up)+')':''}`).join(' · ')+'.');
let counted=0,counted3=0;
for(const grade of rarityOrder){
 const members=allies.filter(c=>e.gradeOf(c)===grade),third=rows3.filter(r=>e.gradeOf(r.c)===grade);
 counted+=members.length;counted3+=third.length;
 rarityDoc.push('',`## ${GR[grade]} (${members.length}명)`);
 rarityDoc.push('','### 상세 (2진 · 3진)','','|등급 내 순위|전체 순위|캐릭터|2진 티어|2진 클리어 단축 ±표준오차|3진 티어|3진 클리어 단축|3진 효과 ±표준오차|','|---:|---:|---|---|---:|---|---:|---:|');
 members.forEach((c,i)=>{const r=third.find(x=>x.c===c);rarityDoc.push(`|${i+1}|${allies.indexOf(c)+1}|${names(c)}${A.adjusted[c]?' †':''}|${label[c]}|${gs(c).toFixed(1)} ± ${(A.se[c]*300).toFixed(1)}초|${r?'**'+r.lab+'**'+(isExit(r)?EXIT:''):'–'}|${r?r.g3.toFixed(1)+'초':'–'}|${r?(TF.out[r.c].delta*300).toFixed(1)+' ± '+(TF.out[r.c].se*300).toFixed(1)+'초':'–'}|`)});
}
if(counted!==allies.length||counted3!==rows3.length)throw Error('등급별 인원 누락');
rarityDoc.push('','† 기준 덱 멤버는 두 번째 덱에서 보정한 값이다. 3진 표의 오차는 진화 효과의 표준오차이며 절대 성능 오차와 구분한다.','');
fs.writeFileSync(path.join(root,'docs/티어표/등급별-아군-티어리스트-2026-10-19.md'),rarityDoc.join('\n'));
const extremes={};
for(const grade of rarityOrder){
 for(const form of [2,3]){
  const candidates=form===2?allies.filter(c=>e.gradeOf(c)===grade).map(c=>({c,score:gs(c)})):rows3.filter(r=>e.gradeOf(r.c)===grade).map(r=>({c:r.c,score:r.g3}));
  if(candidates.length<2)continue;
  for(const [position,score]of [['1등',candidates[0].score],['꼴찌',candidates[candidates.length-1].score]])for(const r of candidates.filter(r=>Math.abs(r.score-score)<1e-9)){
   (extremes[r.c]??={})[form]={grade:GR[grade],position,count:candidates.length,seconds:Number(r.score.toFixed(1))};
  }
 }
}
const rarityPositions={};
for(const grade of rarityOrder){
 const members=allies.filter(c=>e.gradeOf(c)===grade);
 members.forEach((c,i)=>{const quartile=Math.min(3,Math.floor(i*4/members.length));rarityPositions[c]=['상위권','중위권','하위권','최하위권'][quartile]+' '+GR[grade]+' 캐릭터'});
}
const rankAddon=`// Generated by scripts/make-tier-v3.cjs from the measured rarity tables.\nconst CODEX_RARITY_EXTREMES=${JSON.stringify(extremes,null,2)};\nconst CODEX_RARITY_POSITIONS=${JSON.stringify(rarityPositions,null,2)};\n(function(){\n const previous=allyReview;\n allyReview=function(type,evolved){\n  const html=previous(type,evolved);\n  if(!evolved||!html.includes('codex-verdict'))return html;\n  const form=codexReviewStats(type,evolved).trueForm?3:2,r=CODEX_RARITY_EXTREMES[type]?.[form];\n  const position=form===2?CODEX_RARITY_POSITIONS[type]:null;\n  if(!r&&!position)return html;\n  const badge=(r?'<span class="codex-rarity-standing">'+r.grade+' 캐릭터 중 '+r.position+'</span> · ':'')+(position?'<span class="codex-rarity-position">'+position+'</span> · ':'');\n  return html.replace(/(<p class="codex-verdict"><b>[^<]*평가:)/,'$1 '+badge);\n };\n})();\n`;
fs.writeFileSync(path.join(root,'codex-rarity-standing.js'),rankAddon);
console.log('등급별 1등·꼴찌',JSON.stringify(extremes));
console.log(`등급별 표: 2진 ${counted}명, 3진 ${counted3}명`);
process.exit(0);
