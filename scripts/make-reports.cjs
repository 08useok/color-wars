// 시험 결과 JSON → 문서 3종
//  docs/티어표-2026-10-13.md, docs/장별-세팅-2026-10-13.md, docs/신규-레전드-28-36장-클리어-시험-2026-10-13.md
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const e=require('./full-harness.cjs')();
const scores=rd('docs/simulations/tier-scores-2026-10-13.json');
const chap=rd('docs/simulations/chapter-settings-2026-10-13.json');
const sweep=rd('docs/simulations/stage-sweep-2026-10-13.json');
const GR={basic:'기본',rare:'레어',sr:'슈퍼 레어',ex:'EX',uber:'울슈레'};
const NEW=new Set(['amber','bronze','banana','butter','vanilla','lime','emerald','acid','spring','aquamarine','sapphire','royalblue','night','fuchsia','rose','mixedwhite','earphonered','shotguntan']);
const tierOf=s=>s>=10?'S':s>=6?'A':s>=3?'B':s>=1?'C':'D';
const POL={auto:'야옹컴',smart:'위기 때 아끼지 않기',smart2:'위기 때 싼 유닛부터'};
const names=t=>e.names[t]||t;
// ---------- 티어표
{
 const arr=Object.entries(scores).sort((a,b)=>b[1].score-a[1].score);
 const by={S:[],A:[],B:[],C:[],D:[]};
 for(const [t,o] of arr)by[tierOf(o.score)].push([t,o]);
 const L=[];
 L.push('# 캐릭터 티어표 — 2026-10-13','');
 L.push('**조건**: Lv.30 · 2진 · 3진 없음 · 경제 강화 최대 · 모든 장 클리어 보너스·억제기 적용 · 냥코 대포 포함 · 30fps · 300초 제한 · 씨드 1·2. 기준 덱 9종(가넷·라피스·셀레나이트·토파즈·리본 오렌지·옵시디언·길리먼 블루·카키·레인보우)에 후보를 1칸 더한 덱과 더하지 않은 덱을 같은 조건에서 비교했다(후보가 기준 덱 멤버면 그 멤버를 뺀 덱과 비교, 표에 (기준)으로 표시).','');
 L.push('**조건 집합**: 전체 1,365개 전투 조건 중 기준 덱 4종으로도 못 이긴 75개를 뺀 1,290개에서, 가장 어려운 조건과 장 묶음별 어려운 조건 약 120개. 레전드는 ★1~★4 포함, ★4는 EX·레어만 출전 가능하므로 다른 등급은 ★4 조건에서 제외했다.','');
 L.push('**점수** = 승률 상승(%p) + 0.35 × 같이 이긴 판의 시간 단축(%). 출격 방식은 야옹컴과 "위기 때 싼 유닛부터" 중 이긴 쪽(둘 다 지면 패배)을 썼다. 야옹컴만 쓰면 비싼 유닛이 방어 유닛의 돈을 먹어 울슈레 점수가 왜곡되어 방식을 둘로 했다.','');
 L.push('**한계**: 한 기준 덱 안에서의 한계 기여를 잰 것이라 덱 궁합에 영향을 받는다. 점수 차가 2점 이내면 같은 급으로 본다. 3진·+레벨·아이템은 반영하지 않았다.','');
 for(const tier of ['S','A','B','C','D']){
  const cut={S:'10점 이상',A:'6 ~ 10점',B:'3 ~ 6점',C:'1 ~ 3점',D:'1점 미만'}[tier];
  L.push(`## ${tier}티어 (${cut}) — ${by[tier].length}명`,'');
  L.push('|캐릭터|등급|점수|승률 상승(%p)|시간 단축(%)|스토리 구간|레전드 구간|비고|','|---|---|---:|---:|---:|---:|---:|---|');
  for(const [t,o] of by[tier]){
   const note=[NEW.has(t)?'신규':'',o.core?'(기준 덱 멤버)':''].filter(Boolean).join(' ');
   L.push(`|${o.name}|${GR[o.grade]||o.grade}|${o.score}|${o.winGain}|${o.timeGain}|${o.story??'-'}|${o.legend??'-'}|${note}|`);
  }
  L.push('');
 }
 // 신규 캐릭터 평가
 L.push('## 신규 캐릭터 평가','');
 L.push('|캐릭터|티어|점수|역할|메모|','|---|---|---:|---|---|');
 const memo={
  spring:'레전드에서 압도적(+26.9%p). 가격 3,000원(울슈레 중 최저 가격대)·재사용 36초(최단)에 소열파·둔화 — 같은 값대 오키드·바나나·버터보다 한참 강함. 가격·재사용 상향 검토 대상. → 시험 뒤 가격 4,500원·재사용 75초로 조정(시험 재측정 14.3점).',
  rose:'레전드 +23.1%p. 약화 100%·둔화를 3,000원·재사용 36초에 범위로 건다(울슈레 중 최저 가격대·최단 재사용). 체력도 7만대. → 시험 뒤 가격 4,500원·재사용 60초로 조정(시험 재측정 8.7점, A).',
  night:'사거리 34 범위 + 빙결 35%. 프리즘과 맞먹지만 가격은 3,600원·재사용 42초로 프리즘(4,000·50초)보다 낮음.',
  banana:'3연타 범위·처치 시 돈 2배. 상위권. 3,000원이라 야옹컴이 방어 유닛 돈을 먼저 쓰는 경향이 있음.',
  sapphire:'사거리 30 단일 + 회심 + 밀치기. 안정적인 A.',
  amber:'고문실 전용 후보로 만든 돌격형. 검은 적·떠 있는 적 특화라 범용 점수는 중간.',
  lime:'폭발·약화. 중상위.',
  butter:'넉백 무효 탱커. 승률 상승은 크지만 시간은 오히려 늘림(느린 딜).',
  aquamarine:'소파동 무효 + 이속 14. 앞라인 성능은 좋으나 점수는 중간.',
  fuchsia:'좀비 엄강·좀비 킬러. 좀비 없는 스테이지에서는 평범.',
  royalblue:'체력 11만 탱커. 점수는 낮지만 방어 슬롯 용도.',
  acid:'좀비 킬러·영혼 일격·약화. 좀비 침공 전용 성격이라 범용 점수는 낮음.',
  vanilla:'에일리언 엄강·베리어 브레이커. 우주편 별 에일리언에서만 값어치가 큼.',
  bronze:'무속성·성 파괴자(×4). 일반 스테이지 점수는 낮고 적 성을 빠르게 부수는 용도.',
  emerald:'단일 정밀 + 메탈 킬러. 메탈 적이 없으면 효율이 낮음.',
  mixedwhite:'EX. 중상위.',earphonered:'EX. 하위권.',shotguntan:'EX. 중상위.'
 };
 for(const t of NEW){
  const o=scores[t];if(!o)continue;
  L.push(`|${o.name}|${tierOf(o.score)}|${o.score}|${e.roles[t]||''}|${memo[t]||''}|`);
 }
 L.push('');
 fs.writeFileSync(path.join(root,'docs/티어표-2026-10-13.md'),L.join('\n'));
}
// ---------- 장별 세팅
{
 const L=[];
 L.push('# 장별 클리어 세팅 — 2026-10-13','');
 L.push('**조건**: 경제 강화 최대, 모든 장 클리어 보너스·억제기, 냥코 대포 포함, 아이템·성포 없음, 300초 제한, 씨드 1. 덱은 기준 덱 4종에서 시작해 못 깬 스테이지만 모아 칸을 갈아 끼워 찾았다. 스테이지마다 출격 방식 3가지(야옹컴 / 위기 때 아끼지 않기 / 위기 때 싼 유닛부터) 중 하나라도 이기면 "깰 수 있음"이다. 최소 레벨은 모든 아군 레벨을 10·15·20·25·30으로 낮춰 가며 전 스테이지가 그대로 깨지는 가장 낮은 값이다. "3진"이 붙은 장은 3진 없이는 못 깨서 3진을 켠 조건에서 찾은 덱이다.','');
 L.push(chap.length>=151?'**진행**: 151개 묶음(주 장 7 + 레전드 36장 × ★1~★4) 전부 시험했다. 스프링·로즈 조정(4,500원·재사용 60~75초) 뒤에 다시 찾은 덱이다. 못 깬 묶음은 표의 마지막 열을 본다.':`**진행**: ${chap.length} / 151개 묶음까지 시험했다.`,'');
 L.push('|장|스테이지|깬 수|최소 레벨|출격 방식|덱 (10종)|못 깬 스테이지|','|---|---:|---:|---:|---|---|---|');
 for(const r of chap){
  const mode=r.cleared<r.stages?'-':r.autoAll?'야옹컴만으로 가능':'위기 때 직접 출격 필요';
  L.push(`|${r.label}|${r.stages}|${r.cleared}|${r.minLevel?'Lv.'+r.minLevel:'-'}${r.needs3?' + 3진':''}|${mode}|${r.deckNames.join(' · ')}|${r.unclear.map(u=>`${u.name}(성 ${Math.round(u.progress*100)}%)`).join(', ')||'-'}|`);
 }
 L.push('');
 fs.writeFileSync(path.join(root,'docs/장별-세팅-2026-10-13.md'),L.join('\n'));
}
// ---------- 신규 28~36장
{
 const L=[];
 L.push('# 신규 레전드 28~36장 클리어 시험 — 2026-10-13','');
 L.push('범위: 레전드 28~36장(레전드 번호 196~248, 스테이지 53개) × ★1~★4 = 212개 조건. 같은 조건의 장별 세팅 탐색 결과(덱을 바꿔 가며 찾은 최선)를 쓴다. 전체 스윕(기준 덱 4종)에서는 신규 53개 중 ★1 50개 · ★2 46개 · ★3 43개 · ★4 22개가 깨졌다.','');
 const newSets=chap.filter(r=>/^L(2[8-9]|3[0-6])-/.test(r.key));
 L.push('|장|★|깬 수|최소 레벨|출격 방식|못 깬 스테이지|','|---|---:|---:|---:|---|---|');
 for(const r of newSets){
  const mode=r.cleared<r.stages?'-':r.autoAll?'야옹컴':'직접 출격';
  L.push(`|${r.label.replace(/ ★\d/,'')}|${r.crown}|${r.cleared}/${r.stages}|${r.minLevel?'Lv.'+r.minLevel:'-'}${r.needs3?'+3진':''}|${mode}|${r.unclear.map(u=>`${u.name}(${Math.round(u.progress*100)}%)`).join(', ')||'-'}|`);
 }
 L.push('','## 스테이지별 결과','','표기: 이긴 방식 — 야옹컴=A, 아끼지 않기=S, 싼 유닛부터=C. 숫자는 걸린 초. 못 깬 곳은 적 성을 깎은 비율.','');
 for(const c of [1,2,3,4]){
  L.push(`### ★${c}`,'','|스테이지|결과|','|---|---|');
  for(const r of newSets.filter(x=>x.crown===c))for(const s of r.perStage){
   const ok=Object.entries(s.policies).filter(([,v])=>v.win).map(([p,v])=>`${{auto:'A',smart:'S',smart2:'C'}[p]}${Math.round(v.sec)}`);
   const best=Object.values(s.policies).reduce((m,v)=>Math.max(m,v.win?1:0),0);
   L.push(`|${s.name}|${ok.length?ok.join(' '):'못 깸'}|`);
  }
  L.push('');
 }
 fs.writeFileSync(path.join(root,'docs/신규-레전드-28-36장-클리어-시험-2026-10-13.md'),L.join('\n'));
}
console.log('docs written');
process.exit(0);
