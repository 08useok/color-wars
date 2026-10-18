// 새 티어표(2진 / 3진 따로): 테스트 맵(황제의 야옹이 ★3) 이득 순위 기준. 출력: docs/티어표-2진-3진-2026-10-17.md
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=rd('docs/simulations/char-analysis-2026-10-17.json'),F=rd('docs/simulations/bench20-final-2026-10-17.json'),F2=rd('docs/simulations/bench20-ref2-2026-10-17.json'),TF=rd('docs/simulations/trueform-map-final-2026-10-17.json');
const rangeFile=path.join(root,'docs/simulations/range-tier-refresh-2026-10-18.json');
const rangeRefresh=fs.existsSync(rangeFile)?JSON.parse(fs.readFileSync(rangeFile,'utf8')):null;
if(rangeRefresh){
 const calibration=rd('docs/simulations/range-tier-calibration-2026-10-18.json');
 if(rangeRefresh.map!==A.map||!rangeRefresh.anchor.valid||rangeRefresh.seeds!==F.seeds||calibration.map!==A.map)throw Error('사거리 재측정 비교 검증 실패');
 for(const r of rangeRefresh.rows){A.gain[r.type]=r.gain/300;A.se[r.type]=r.se/300;F.seedGains[r.type]={[A.map]:r.perSeed.map(x=>x/300)}}
 A.bridge=calibration.bridge;
 for(const r of calibration.rows){A.gain[r.type]=r.gain/300;A.se[r.type]=r.se/300;F2.seedGains[r.type]={[A.map]:calibration.seedGains[r.type]}}
 const s=rangeRefresh.salmonTrue;TF.out.salmon={...TF.out.salmon,delta:s.delta,se:s.deltaSe,perSeed:s.deltaPerSeed};
 A.order.sort((a,b)=>A.gain[b]-A.gain[a]);
}
// Append measured newcomers without rerunning or overwriting the original 106-character data.
const extraFile=path.join(root,'docs/simulations/subspecies-tier-2026-10-18.json');
const extra=fs.existsSync(extraFile)?JSON.parse(fs.readFileSync(extraFile,'utf8')):null;
if(extra){
 if(extra.map!==A.map||!extra.anchor.valid||extra.seeds!==F.seeds)throw Error('신규 아종 측정의 맵·기준 캐릭터·시드 검증 실패');
 for(const r of extra.rows){A.gain[r.type]=r.gain/300;A.se[r.type]=r.se/300;A.adjusted[r.type]=false;F.seedGains[r.type]={[A.map]:r.perSeed.map(v=>v/300)}}
 A.order=[...new Set([...A.order,...extra.rows.map(r=>r.type)])].sort((a,b)=>A.gain[b]-A.gain[a]);
}
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
// ---- Base score bands stay unchanged. Split each non-OP/X band into rank thirds.
const BANDS=['OP','SSS','SS','S','A','B','C','D','E','F','X'];
const EDGES=[70,62,54,46,38,30,22,14,10,6];// 이 값 이상이 위 구간
const bandOfSec=g=>{for(let b=0;b<EDGES.length;b++)if(g>=EDGES[b])return b;return BANDS.length-1};
const label={},bandMembers=BANDS.map(()=>[]);
for(const c of allies){const b=bandOfSec(gs(c));label[c]=BANDS[b];bandMembers[b].push(c)}
const SIZE=bandMembers.map(m=>m.length);
const baseLabel={...label};
for(let b=1;b<BANDS.length-1;b++){
 const members=bandMembers[b],cut=Math.floor(members.length/3);
 members.forEach((c,i)=>{label[c]=BANDS[b]+(i<cut?'+':cut&&i>=members.length-cut?'-':'')});
}
const DISPLAY_BANDS=BANDS.flatMap((b,i)=>i===0||i===BANDS.length-1?[b]:[b+'+',b,b+'-']);
// 경계 근접: 점수가 구간 경계에서 표준오차 이내면 이웃 구간과 구분되지 않는다
const nearEdge=c=>{const g=gs(c),se=Math.max(2,A.se[c]*300);return EDGES.some(ed=>Math.abs(g-ed)<se)};
const labelAt=(g)=>BANDS[bandOfSec(g)];
const rankOf=(g,own)=>allies.filter(c=>c!==own&&gs(c)>g).length+1;
const HAS3=Object.keys(TF.out);
const L=[];
L.push(rangeRefresh?'# 티어표 — 2진 / 3진 따로 (2026-10-18 재측정)':'# 티어표 — 2진 / 3진 따로 (2026-10-17)','');
L.push('이전 티어표(10-16, 기준 맵 5곳 합산)를 대체한다. **보물 전부 완성 · 전원 Lv.30**, 테스트 맵 **황제의 야옹이 ★3(레전드 20장)**의 이득 순위 기준이다. 자세한 근거·원인은 [캐릭터-성능-원인-보고서](캐릭터-성능-원인-보고서-2026-10-17.md).','');
L.push('## 읽는 법','');
L.push('- **이득(초)** = 기준 덱(레드·옐로우·블루·퍼플)에 그 캐릭터를 더했을 때 이 맵의 클리어가 **몇 초 빨라지는가**. 기준 덱 멤버 4명은 겹치지 않는 두 번째 기준 덱으로 보정했다(†).');
L.push('- **순위 95% 구간**: 시드를 다시 뽑아 400번 계산한 순위 범위. **구간이 겹치는 이웃 티어와는 사실상 같은 급**이다.');
L.push('- **기본 구간**: 이득 70초 이상 OP · 62~70 SSS · 54~62 SS · 46~54 S · 38~46 A · 30~38 B · 22~30 C · 14~22 D · 10~14 E · 6~10 F · 6 미만 X. 기존 경계와 측정값은 유지한다.');
L.push('- **+/− 세분화**: OP·X를 제외한 각 기본 등급 안에서 순위 상위 1/3은 +, 하위 1/3은 -, 가운데는 무표다. 예: A+ → A → A- → B+ → B → B-. 각 끝에 배정할 인원은 등급 인원÷3의 내림값이며, 남는 인원은 가운데에 둔다. 3명 미만인 등급은 무표로 둔다.');
L.push('- 기존 세모 표시는 없앴다. **+/−는 같은 등급 안의 순서 표시이며 통계적으로 확정된 성능 차이가 아니다.** 측정 불확실성은 상세 표의 순위 95% 구간과 이득 ±표준오차로 확인한다.');
L.push(`- **X(절대적 쓰레기)**: 이 맵에서 더해도 클리어가 **6초 미만** 빨라지는 캐릭터(${bandMembers[10].map(names).join('·')}). "이 맵에서 쓸모없다"이지 모든 상황에서 그렇다는 뜻은 아니다(특화·3진은 아래 참조).`);
L.push('- 이 맵은 **무속성 적 98%**라 좀비·메탈·에이리언·떠 있는 적 특화 능력은 평가되지 않는다. 특화 캐릭터가 낮게 나오면 "특화 맵 시험이 필요"로 읽는다.');
L.push('');
if(extra)L.push('**2026-10-18 추가:** 허브 민트·검도 네이비·연금 퍼플·리듬 핑크 4명만 같은 조건으로 측정해 합쳤다. 추가 당시에는 기존 106명의 이득을 유지했다. 이후의 사거리 재측정 반영 여부는 아래 갱신 기록을 따른다. 가넷을 재측정한 이득 45.325초가 기존 값과 일치해 비교 기준을 검증했다. 메탈전 한정 잠정 등급과 이 표의 범용 기준 등급은 다르다. 새 4명의 특화 성능은 [신규 아종 전투 테스트](신규-아종-전투-테스트-2026-10-18.md)를 참고한다.','');
if(rangeRefresh){
 L.push('**2026-10-18 사거리 조정 반영:** 사거리가 변경된 기존 9명의 2진을 다시 측정했다. 위 추가 기록 이후 이 9명과 살몬 3진 효과를 갱신했으며, 시안이 보정용 두 번째 기준 덱에 포함돼 그 덱도 재측정하여 기준 멤버 4명의 보정값을 갱신했다. 다른 캐릭터의 이득과 새 아종 4명의 값은 유지했다. 3진 살몬의 절대 성능은 유지되지만 2진이 바뀌어 진화 효과가 달라진다.','');
 L.push('### 사거리 조정 전후','', '|캐릭터|정의 사거리 조정|이전 → 현재 티어|클리어 단축 변화|','|---|---:|---|---:|');
 for(const r of rangeRefresh.rows)L.push(`|${names(r.type)}|${r.rangeBefore} → ${r.rangeNow}|${r.oldTier} → **${label[r.type]}**|${r.oldGain.toFixed(1)} → ${r.gain.toFixed(1)}초|`);
 L.push('','정의 사거리는 진화 배율 적용 전 유닛 정의값이다. 티어는 현재 2진 실전 수치로 측정했다. 등급 경계를 넘은 변화도 오차가 겹칠 수 있어 확정적인 우열로 보지 않는다. 원자료: `docs/simulations/range-tier-refresh-2026-10-18.json`, `range-tier-calibration-2026-10-18.json`.','');
}
L.push(`## 2진 티어표 (${n}명)`,'');
L.push('|티어|이득 구간|인원|캐릭터|');L.push('|---|---|---:|---|');
const rangeTxt=b=>b===0?'70초 이상':b===BANDS.length-1?'6초 미만':`${EDGES[b]}~${EDGES[b-1]}초`;
DISPLAY_BANDS.forEach(bn=>{const m=allies.filter(c=>label[c]===bn),base=BANDS.indexOf(bn.replace(/[+-]$/,''));if(m.length)L.push(`|**${bn}**|${rangeTxt(base)}${bn.endsWith('+')?' · 상위 1/3':bn.endsWith('-')?' · 하위 1/3':''}|${m.length}|${m.map(names).join(' · ')}|`)});
L.push('');
L.push('### 2진 상세','');
L.push('|티어|순위 (95% 구간)|캐릭터|등급|클리어 단축|');L.push('|---|---:|---|---|---:|');
allies.forEach((c,i)=>{L.push(`|${label[c]}|${i+1} (${rci[c][0]}~${rci[c][1]})|${names(c)}${A.adjusted[c]?' †':''}|${GR[e.gradeOf(c)]}|${sec(A.gain[c])>=0?sec(A.gain[c])+'초':'−'+Math.abs(sec(A.gain[c]))+'초(지연)'}±${Math.round(A.se[c]*300)}|`)});
L.push('','† 기준 덱 멤버(레드·옐로우·블루·퍼플): 두 번째 기준 덱에서 보정한 값이라 순위가 더 불확실하다.','');
L.push('## 3진 티어표 (전용 3진 그림이 있는 9명)','');
L.push('3진 그림이 있는 캐릭터만 대상이다. **그 캐릭터만 3진으로, 나머지는 2진 그대로** 둔 상태에서 같은 맵의 이득을 쟀고, 2진 분포(위 표)와 같은 8초 구간에 넣어 티어를 정했다.');
L.push('');
L.push('|3진 티어|3진 순위|캐릭터|2진 티어 → 3진 티어|3진 이득 (2진 이득 + 3진 효과)|3진 정의 상태|');L.push('|---|---:|---|---|---:|---|');
const state={raspberry:'**새 정의**(체력·공격 ×1.5, 간격 3초, 사거리 39, 에일 초뎀, 베리어 브레이커 25%, 무한 관통·성장 ×1.21·상한 20)',gold:'기존 정의(5연타·처치 돈 ×1.5)',clover:'기존 정의(3연타·크리티컬 25%)',hotpink:'기존 정의(사거리 30 범위)',salmon:'기존 정의(파동 스토퍼 등)',cream:'기존 정의(범위·둔화 65%)',beige:'기존 정의(사거리 14·정지 60%)',crystal:'**새 정의**(크리티컬 20%, 에일 엄강, 베리어 브레이커 50%, 관통 4명 유지, 체력·공격 ×1.2)',indigo:'**새 정의**(체력·공격 ×1.4, 정지 55%·2.5초, 공격력 다운 무효)'};
const rows3=HAS3.map(c=>{const g3=gs(c)+TF.out[c].delta*300;return {c,g3,lab:labelAt(g3),rank:rankOf(g3,c)}}).sort((a,b)=>b.g3-a.g3);
// Third forms form their own table and are split into thirds within that table's base bands.
for(const base of BANDS.slice(1,-1)){
 const members=rows3.filter(r=>r.lab===base),cut=Math.floor(members.length/3);
 members.forEach((r,i)=>{r.lab=base+(i<cut?'+':cut&&i>=members.length-cut?'-':'')});
}
for(const r of rows3){const d=TF.out[r.c].delta*300;L.push(`|${r.lab}|${r.rank}|${names(r.c)}|${label[r.c]} → **${r.lab}**|${Math.round(r.g3)}초 (${Math.round(gs(r.c))}초 ${d>=0?'+':'−'} ${Math.abs(Math.round(d))}초)±${Math.round(TF.out[r.c].se*300)}|${state[r.c]}|`)}
L.push('');
const solid=r=>Math.abs(TF.out[r.c].delta)*300>2*TF.out[r.c].se*300&&TF.out[r.c].delta*300>=3;// 오차의 2배 이상이고 3초 이상 단축될 때만 의미 있는 변화
const up=rows3.filter(r=>solid(r)&&BANDS.indexOf(r.lab.replace(/[+-]$/,''))<BANDS.indexOf(baseLabel[r.c]));
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
// Rarity views retain the global labels so the same unit never changes tier merely by filtering.
const rarityDoc=['# 등급별 아군 티어리스트 (2026-10-18)','','기본 · EX · 레어 · 슈퍼 레어 · 울슈레별로 기존 티어표를 나눴다. **전원 Lv.30 · 보물 완성 · 황제의 야옹이 ★3** 측정 결과이며, 추가 전투 없이 기존 최신 사거리·아종 측정값을 사용했다.','','- 티어와 +/−는 [전체 티어표](티어표-2진-3진-2026-10-17.md)와 동일하다. 레어도마다 티어를 다시 배정하지 않는다.','- 등급 내 순위는 같은 레어도끼리 비교한 순서다. 2진과 3진은 따로 표시한다.','- 이득은 기준 덱 대비 클리어 단축 시간이다. 오차가 겹치는 순위는 확정적인 우열이 아니다.','- 무속성 중심 맵 한 곳 기준이므로 특화 능력은 충분히 반영되지 않는다. X도 이 맵에서 낮게 측정됐다는 뜻이다.','','## 인원 요약','','|등급|2진|3진|','|---|---:|---:|'];
const rarityOrder=['basic','ex','rare','sr','uber'];
for(const grade of rarityOrder)rarityDoc.push(`|${GR[grade]}|${allies.filter(c=>e.gradeOf(c)===grade).length}|${rows3.filter(r=>e.gradeOf(r.c)===grade).length}|`);
let counted=0,counted3=0;
for(const grade of rarityOrder){
 const members=allies.filter(c=>e.gradeOf(c)===grade),third=rows3.filter(r=>e.gradeOf(r.c)===grade);
 counted+=members.length;counted3+=third.length;
 rarityDoc.push('',`## ${GR[grade]} (${members.length}명)`,'','### 2진 한눈에','','|티어|인원|캐릭터|','|---|---:|---|');
 for(const tier of DISPLAY_BANDS){const group=members.filter(c=>label[c]===tier);if(group.length)rarityDoc.push(`|${tier}|${group.length}|${group.map(names).join(' · ')}|`)}
 rarityDoc.push('','### 2진 상세','','|등급 내 순위|전체 순위|캐릭터|티어|클리어 단축 ±표준오차|','|---:|---:|---|---|---:|');
 members.forEach((c,i)=>rarityDoc.push(`|${i+1}|${allies.indexOf(c)+1}|${names(c)}${A.adjusted[c]?' †':''}|${label[c]}|${gs(c).toFixed(1)} ± ${(A.se[c]*300).toFixed(1)}초|`));
 rarityDoc.push('','### 3진','');
 if(!third.length)rarityDoc.push('측정된 전용 3진 없음.');
 else{
  rarityDoc.push('|등급 내 순위|캐릭터|2진 → 3진 티어|3진 클리어 단축|3진 효과 ±표준오차|','|---:|---|---|---:|---:|');
  third.forEach((r,i)=>rarityDoc.push(`|${i+1}|${names(r.c)}|${label[r.c]} → ${r.lab}|${r.g3.toFixed(1)}초|${(TF.out[r.c].delta*300).toFixed(1)} ± ${(TF.out[r.c].se*300).toFixed(1)}초|`));
 }
}
if(counted!==allies.length||counted3!==rows3.length)throw Error('등급별 인원 누락');
rarityDoc.push('','† 기준 덱 멤버는 두 번째 덱에서 보정한 값이다. 3진 표의 오차는 진화 효과의 표준오차이며 절대 성능 오차와 구분한다.','');
fs.writeFileSync(path.join(root,'docs/등급별-아군-티어리스트-2026-10-18.md'),rarityDoc.join('\n'));
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
const rankAddon=`// Generated by scripts/make-tier-v3.cjs from the measured rarity tables.\nconst CODEX_RARITY_EXTREMES=${JSON.stringify(extremes,null,2)};\n(function(){\n const previous=allyReview;\n allyReview=function(type,evolved){\n  const html=previous(type,evolved);\n  if(!evolved||!html.includes('codex-verdict'))return html;\n  const form=codexReviewStats(type,evolved).trueForm?3:2,r=CODEX_RARITY_EXTREMES[type]?.[form];\n  if(!r)return html;\n  const text=r.grade+' '+form+'진 '+r.count+'명 중 '+r.position+'. 황제의 야옹이 ★3 · Lv.30 · 보물 완성 기준, 클리어 단축 '+r.seconds+'초. 다른 맵과 특화 성능에서는 순위가 달라질 수 있다.';\n  return html.replace(/(<p class="codex-verdict"><b>[^<]*평가:)/,'$1 <span class="codex-rarity-standing">'+r.grade+' 캐릭터 중 '+r.position+'</span> ·').replace(/<\\/section>\\s*$/,'<p class="codex-rarity-context">'+text+'</p></section>');\n };\n})();\n`;
fs.writeFileSync(path.join(root,'codex-rarity-standing.js'),rankAddon);
console.log('등급별 1등·꼴찌',JSON.stringify(extremes));
console.log(`등급별 표: 2진 ${counted}명, 3진 ${counted3}명`);
process.exit(0);
