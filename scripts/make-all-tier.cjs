// 기준 맵 5곳 합산 결과 → docs/모든-아군-티어표-2026-10-16.md
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const e=require('./full-harness.cjs')();
const D=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/all-ally-tier-2026-10-16.json'),'utf8'));
for(const c of Object.keys(D.res))if(e.names[c])D.res[c].name=e.names[c];// 이름은 항상 현재 게임 값을 쓴다
const old=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/tier-scores-2026-10-13.json'),'utf8'));
const GR={basic:'기본',rare:'레어',sr:'슈퍼 레어',ex:'EX',uber:'울슈레'};
const NEW=new Set(['amber','bronze','banana','butter','vanilla','lime','emerald','acid','spring','aquamarine','sapphire','royalblue','night','fuchsia','rose','mixedwhite','earphonered','shotguntan']);
// 합산 점수 구간: OP는 2등과 0.11 벌어진 단독 최상위, 나머지는 SSS~D. 각 구간 안에서 순위 기준 위 1/3 = +, 아래 1/3 = -.
const BANDS=[['OP',.90],['SSS',.79],['SS',.72],['S',.60],['A',.50],['B',.40],['C',.30],['D',-1]];
const cut={OP:'0.90 이상',SSS:'0.79 ~ 0.90',SS:'0.72 ~ 0.79',S:'0.60 ~ 0.72',A:'0.50 ~ 0.60',B:'0.40 ~ 0.50',C:'0.30 ~ 0.40',D:'0.30 미만'};
const bandOf=x=>BANDS.find(([n,t])=>x>=t)[0];
const maps=D.maps;
const mapInfo={'498:1':'알래스카 ★1','326:3':'짱뚱어 파크 ★3','442:3':'경계선 탈환 작전 ★3','433:1':'지옥의 숙적 ★1','541:1':'멜토즈 ★1'};
const arr=Object.entries(D.res).sort((a,b)=>b[1].comp-a[1].comp);
const rankOld=Object.entries(old).sort((a,b)=>b[1].score-a[1].score).map(x=>x[0]);
const by={};for(const [n] of BANDS)by[n]=[];
arr.forEach(([c,o],i)=>by[bandOf(o.comp)].push([c,o,i+1]));
const tierLabel={};// 캐릭터 → 'SSS+' 같은 이름
for(const [n] of BANDS){
 const list=by[n],k=list.length,plus=n==='OP'?0:Math.round(k/3),minus=n==='OP'?0:Math.round(k/3);
 list.forEach(([c],idx)=>{tierLabel[c]=n+(idx<plus?'+':idx>=k-minus?'-':'')});
}
const tierOf=x=>bandOf(x);
const L=[];
L.push('# 모든 아군 티어표 (기준 맵 5곳) — 2026-10-16','');
L.push(`아군 ${arr.length}종 전체. 지난 10-13 티어표(조건 약 120개 혼합)를 대체하는 기준 맵 방식이다.`,'');
L.push('## 기준 맵','','한 맵으로는 공정한 비교가 안 되는 것을 확인한 뒤(아래 "왜 맵이 5개인가") 순위가 실제로 갈리는 맵 5개를 골랐다. 후보 38개를 전부 시험해서, 아군 대부분이 결과를 바꾸는 맵만 남겼다.','');
L.push('|맵|위치|적 성 HP|특징|가중치|','|---|---|---:|---|---:|');
const info={'498:1':['미래편 3장','400,000','다람G 1800%(보스)·재키펭 1800%·에이리뭉·스타레오파드 — 에이리언 섞인 중단기전(약 56초)'],'326:3':['레전드 16장','250,000','놈놈놈·하마양·캥거류 2000% 고배율 잡몹 장기전(약 117초)'],'442:3':['레전드 25장','770,000','놈놈놈 1200%·샤이 보어·불칸 보어(보스) 단단한 적 중심(약 100초)'],'433:1':['레전드 24장','900,000','투뿔소 1600%·셰익스피망(보스) 성 체력 큰 장기전(약 130초)'],'541:1':['우주편 1장','300,000','스타 펭·화백·엄마빠옹 동시 15마리 물량전(약 61초)']};
for(const m of maps)L.push(`|${mapInfo[m]}|${info[m][0]}|${info[m][1]}|${info[m][2]}|${D.weight[m].toFixed(2)}|`);
L.push('');
L.push('## 방법','');
L.push('- 기준 덱 9종(가넷·라피스·셀레나이트·토파즈·리본 오렌지·옵시디언·길리먼 블루·카키·레인보우)에 후보 1칸을 더해 같은 맵에서 돌렸다. 후보가 기준 덱 멤버면 그 멤버를 뺀 덱과 비교했다(표에 "기준 덱"으로 표시, 빼면 지는 경우가 있어 상대적으로 높게 나올 수 있다).');
L.push('- Lv.30 · 2진 · 3진 없음 · 경제 강화 최대 · 모든 장 클리어 보너스·억제기 · 냥코 대포 포함 · 300초 제한. 맵마다 시드 6개 × 출격 방식 2가지(야옹컴 / 위기 때 싼 유닛부터) 중 나은 쪽.');
L.push('- 성능 지표: 승리하면 1 + (1 − 걸린 시간/300), 지면 적 성을 깎은 비율(최대 0.95). 후보를 넣었을 때와 뺐을 때의 차이의 시드 평균.');
L.push('- 합산: 맵마다 아군 전체의 백분위(0 = 꼴찌, 1 = 1등, 동점은 평균)로 바꿔 가중 평균했다. 가중치는 1 − (한 값에 몰린 아군의 최대 비율)로, 순위 정보가 적은 맵의 비중을 줄인다. 표준점수 대신 백분위를 쓴 이유는 극단값(기준 덱에서 빼면 지는 멤버, 넣으면 지는 후보)이 눈금을 망가뜨려서다.','');
L.push('## 왜 맵이 5개인가','');
L.push('- 첫 시도에서 1등이던 알데바란 ★1(우주편 1장)은 기준 덱이 100% 이기는 쉬운 맵이라 울슈레 20명이 전부 0점이었다. 후보 38개 중 26개는 아군의 절반 이상이 넣어도 결과가 안 변했다.');
L.push('- 순위가 갈리는 9개 맵끼리도 순위 일치도가 0.1~0.47로 낮았다. 초반 돌진 맵은 싼 탱커가, 장기전 맵은 비싼 울슈레가 유리해서 **한 맵만으로는 강함을 대표할 수 없다.** 그래서 성격이 다른 맵 5개를 합쳤다.','');
L.push('## 한계','');
L.push('- 이 순위는 **중상급 이상 스테이지** 기준이다. 세계편 1~3장·미래편 1~2장 같은 쉬운 맵은 기준 덱이 100% 이겨 순위를 가를 수 없어 뺐다. 그런 구간에서 싼 탱커(레드·옐로우·블루 등)가 하는 일은 이 표에서 과소평가된다.');
L.push('- 5개 중 3개가 레전드 맵이다. 맵 하나 안에서도 시드에 따라 승패가 갈려 점수가 흔들리므로, **백분위 0.1 안팎 차이는 같은 급**으로 봐야 한다. 같은 캐릭터가 맵마다 0.1과 0.9로 갈리는 경우도 있다(맵별 열 참조).');
L.push('- 3진·+레벨·아이템은 반영하지 않았다. 스프링·로즈는 가격 4,500원·재사용 75초/60초로 조정된 값으로 시험했다.','');
L.push('## 티어 한눈에','');
L.push('각 티어 안의 +는 위쪽 1/3, -는 아래쪽 1/3(합산 점수 순), 부호가 없는 것이 가운데다.','');
L.push('|티어|이름|','|---|---|');
for(const [n] of BANDS){
 const labels=n==='OP'?['OP']:[n+'+',n,n+'-'];
 for(const lb of labels){const names=arr.filter(([c])=>tierLabel[c]===lb).map(([c,o])=>o.name);if(names.length)L.push(`|**${lb}**|${names.join(' · ')}|`)}
}
L.push('');
for(const [t] of BANDS){
 if(!by[t].length)continue;
 L.push(`## ${t} (${cut[t]}) — ${by[t].length}명`,'');
 L.push(`|티어|순위|캐릭터|등급|합산|${maps.map(m=>mapInfo[m]).join('|')}|10-13 티어표|비고|`,`|---|---:|---|---|---:|${maps.map(()=>'---:').join('|')}|---:|---|`);
 for(const [c,o,rk] of by[t]){
  const ro=rankOld.indexOf(c)+1;
  const note=[NEW.has(c)?'신규':'',o.core?'기준 덱':''].filter(Boolean).join(' · ');
  L.push(`|${tierLabel[c]}|${rk}|${o.name}|${GR[o.grade]}|${o.comp.toFixed(2)}|${maps.map(m=>o.pct[m].toFixed(2)).join('|')}|${ro||'-'}위|${note}|`);
 }
 L.push('');
}
// 신규 캐릭터
L.push('## 신규 캐릭터 위치','');
L.push('|캐릭터|티어|순위|합산|맵별 백분위(알래스카·짱뚱어·경계선·지옥의 숙적·멜토즈)|역할|','|---|---|---:|---:|---|---|');
for(const c of [...NEW]){const o=D.res[c];if(!o)continue;const rk=arr.findIndex(x=>x[0]===c)+1;L.push(`|${o.name}|${tierLabel[c]}|${rk}|${o.comp.toFixed(2)}|${maps.map(m=>o.pct[m].toFixed(2)).join(' · ')}|${e.roles[c]||''}|`)}
L.push('');
fs.writeFileSync(path.join(root,'docs/모든-아군-티어표-2026-10-16.md'),L.join('\n'));
console.log('written',BANDS.map(([n])=>n+':'+by[n].length).join(' '));
process.exit(0);
