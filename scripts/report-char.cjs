// 캐릭터 성능·원인·3진 보고서 생성: docs/티어표/캐릭터-성능-원인-보고서-2026-10-19.md
const fs=require('fs'),path=require('path');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const A=rd('docs/simulations/char-analysis-2026-10-19.json'),F=rd('docs/simulations/bench20-final-2026-10-19.json'),FOLD=rd('docs/simulations/bench20-final-2026-10-17.json'),F2=rd('docs/simulations/bench20-ref2-2026-10-19.json'),TF=rd('docs/simulations/trueform-map-2026-10-19.json'),BT=rd('docs/simulations/tier-bootstrap-2026-10-17.json'),S=rd('docs/simulations/map-screen20-2026-10-17.json');
const e=mk();e.setProfile({level:30});
const HAS3=[...new Set(fs.readdirSync(path.join(root,'assets')).filter(f=>/^(profile_)?[a-z]+_3\.webp$/.test(f)).map(f=>f.replace(/^profile_/,'').replace('_3.webp','')))].filter(c=>TF.out[c]);// 전용 3진 그림(시트 또는 프로필)이 있는 캐릭터만 3진 분석 대상
const MAP=A.map,allies=Object.keys(A.gain),n=allies.length,names=c=>e.names[c];
const GR={basic:'기본',rare:'레어',sr:'슈퍼 레어',ex:'EX',uber:'울슈레'};
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const sec=g=>Math.round(g*300);// 성능 점수 0.1 = 클리어 30초 단축
const fmtSec=g=>sec(g)>=0?Math.abs(sec(g))+'초 단축':Math.abs(sec(g))+'초 지연';
// ---- 순위 신뢰구간(시드 재추출 400회; 기준 덱 멤버는 보정한 값으로)
const R1=F.core9,slope=A.bridge.slope,icpt=A.bridge.icpt;
let seed=777;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const ranksB=Object.fromEntries(allies.map(c=>[c,[]]));
for(let b=0;b<400;b++){
 const idx=Array.from({length:F.seeds},()=>Math.floor(rnd()*F.seeds));
 const g={};for(const c of allies){g[c]=R1.includes(c)?icpt+slope*mean(idx.map(k=>F2.seedGains[c][MAP][k])):mean(idx.map(k=>F.seedGains[c][MAP][k]))}
 const order=allies.slice().sort((a,b)=>g[b]-g[a]);order.forEach((c,i)=>ranksB[c].push(i+1));
}
const q=(a,p)=>{const s=[...a].sort((x,y)=>x-y);return s[Math.round(p*(s.length-1))]};
const rankCI=Object.fromEntries(allies.map(c=>[c,[q(ranksB[c],.025),q(ranksB[c],.975)]]));
// ---- 특징량 백분위
const pctOf=(k,c)=>allies.filter(x=>A.feat[x][k]<A.feat[c][k]).length/(n-1);
const KO={dps:'초당 피해',ehp:'체력',range:'사거리',speed:'이동 속도',cd:'재사용 대기',cc:'군중 제어(둔화·정지·약화)',area:'범위 공격',knock:'버티는 횟수'};
function cause(c){
 const f=A.feat[c],o=A.contrib[c];
 const items=Object.entries(o).filter(([k])=>k!=='cost').sort((a,b)=>b[1]-a[1]);
 const pos=items.filter(x=>x[1]>0.004).slice(0,2),neg=items.filter(x=>x[1]<-0.004).slice(-2).reverse();
 const rel=(k)=>{const p=Math.round(pctOf(k,c)*100);const top=100-p;return top<=50?`상위 ${Math.max(1,top)}%`:`하위 ${Math.max(1,p)}%`};
 const part=k=>{
  if(k==='cd')return `재사용 ${f.cd}초(${rel('cd').startsWith('하위')?'짧은 편':'긴 편'})`;
  if(k==='cc')return KO.cc;
  if(k==='area')return f.area?'범위 공격':'단일 공격';
  if(k==='knock')return `버티는 횟수 ${f.knock}`;
  if(k==='dps')return `초당 피해 ${Math.round(f.dps).toLocaleString()}(${rel('dps')})`;
  if(k==='ehp')return `체력 ${Math.round(f.hp).toLocaleString()}(${rel('ehp')})`;
  if(k==='range')return `사거리 ${Math.round(f.range*10)/10}(${rel('range')})`;
  if(k==='speed')return `이동 속도 ${f.speed}(${rel('speed')})`;
  return k};
 const text=[];
 if(pos.length)text.push('장점: '+pos.map(x=>part(x[0])).join(' · '));
 if(neg.length)text.push('약점: '+neg.map(x=>part(x[0])).join(' · '));
 const res=A.resid[c],sdres=Math.sqrt(mean(allies.map(x=>A.resid[x]**2)));
 const ab=[];if(f.slow)ab.push('둔화');if(f.freeze)ab.push('정지');if(f.weaken)ab.push('약화');if(f.blow)ab.push('밀치기');if(f.wave)ab.push('파동');if(f.surge)ab.push('열파');if(f.dodge)ab.push('공격 무효');if(f.survive)ab.push('버티기');if(f.waveImmune)ab.push('파동 무효');
 if(res>sdres)text.push('능력치 대비 성과 높음'+(ab.length?`(${ab.join('·')} 기여 추정)`:''));
 else if(res<-sdres)text.push('능력치 대비 성과 낮음'+(f.traitSpecial?'(특성 한정 능력이라 이 맵에서 발동 안 함)':f.windup>.6?'(긴 선딜)':''));
 else if(f.traitSpecial)text.push('특성 한정 능력은 이 맵(무속성 98%)에서 쓰이지 않음');
 return text.join(' / ');
}
// ---- 3진 판정
const sortedGain=allies.map(c=>A.gain[c]).sort((a,b)=>b-a);
const rankOfGain=g=>sortedGain.filter(x=>x>g).length+1;
function trueVerdict(c){
 if(!HAS3.includes(c))return {v:'3진 제외(전용 그림 없음)',d:null};
 const t=TF.out[c];if(!t)return {v:'3진 없음',d:null};
 const g3=A.gain[c]+t.delta,r2=A.rank[c],r3=rankOfGain(g3),sig=Math.abs(t.delta)>2*t.se;
 let v;
 if(!sig)v='차이 없음';
 else if(t.delta<0)v='오히려 하락';
 else if(r2>n/2&&r3<=n/2)v='**해결**(하위 절반 → 상위 절반)';
 else if(r2-r3>=15)v='개선('+r2+'위 → '+r3+'위)';
 else v='미미한 개선';
 return {v,d:t.delta,r3,sig};
}
const L=[];
const R2=A.r2;
L.push('# 캐릭터 성능 · 원인 · 3진 보고서 — 2026-10-19','');
L.push('## 한눈에','');
const top=A.order.slice(0,12),bot=A.order.slice(-12);
const solved=allies.filter(c=>trueVerdict(c).v.startsWith('**해결')),improved=allies.filter(c=>/^개선/.test(trueVerdict(c).v)),noeff=allies.filter(c=>trueVerdict(c).v==='차이 없음'),none=allies.filter(c=>trueVerdict(c).v!=='3진 없음'&&!HAS3.includes(c)).concat(allies.filter(c=>trueVerdict(c).v==='3진 없음'));
L.push('- **조건**: 보물 전부 완성 · 전원 Lv.30 · 2진 · 테스트 맵 **황제의 야옹이 ★3(레전드 20장)**. 레드·옐로우·블루·퍼플 4명에 아군 1명을 더했을 때(그 캐릭터가 기준 덱 멤버면 빼고 보정) 클리어가 얼마나 빨라지는지로 쟀다.');
L.push(`- **좋은 캐릭터**: ${top.slice(0,8).map(names).join(' · ')} … 이 맵에서 기준 덱에 더하면 클리어가 1위 ${fmtSec(A.gain[top[0]])} ~ 8위 ${fmtSec(A.gain[top[7]])}된다.`);
L.push(`- **나쁜 캐릭터**: ${bot.slice(-8).reverse().map(names).join(' · ')} … 더해도 클리어가 거의 안 빨라지거나 오히려 느려진다.`);
L.push(`- **원인**: 초당 피해·사거리·재사용(짧을수록 좋음)·범위 여부 같은 능력치만으로 이득 변동의 **${Math.round(R2*100)}%**가 설명된다. 나머지는 능력 효과와 상성이다.`);
L.push(`- **3진으로 해결되는 캐릭터**: 하위 절반에서 상위 절반으로 올라오는 **${solved.length}명**(${solved.map(names).join('·')||'없음'}), 15계단 이상 개선 **${improved.length}명**(${improved.map(names).join('·')||'없음'}). **3진 전용 그림이 있는 ${HAS3.length}명(${HAS3.map(names).join('·')})만** 분석했다. 그림이 없는 캐릭터는 3진에서 제외했다.`);
L.push('- **중요한 한계**: (1) 맵 한 곳이다. 이 맵의 적은 **무속성 98%**라 좀비 킬러·메탈 킬러·에이리언 엄강 같은 특화 능력은 평가되지 않는다. (2) 시드 흔들림 때문에 순위 ±수 계단은 같은 급이다(아래 "신뢰도"). (3) 이전에 발표한 티어표의 +/− 세분은 측정 오차보다 촘촘하다(부록 A).');
L.push('');
L.push('## 1. 시험 조건','');
L.push(`- **규칙**: 커밋 42c8ac2(v6.8.0) 코드(코드 지문 ${A.codeHash}). 10-18의 v6.7.2(적이 적 성 뒤로 넉백되지 않음)로 전투 결과가 달라져 **전원을 처음부터 다시 쟀다**. 코드가 또 바뀌면 숫자가 달라질 수 있다.`);
L.push(`- **상태**: 보물·억제기 전부, 아군 전원 Lv.30(2진), 경제 강화 최대, 3진은 **한 번에 한 캐릭터만** 켜서 비교. 300초 제한, 시드 ${F.seeds}개 × 출격 방식 2가지(야옹컴 / 위기 때 싼 유닛부터) 중 나은 쪽.`);
L.push('- **측정 방식**: 기준 덱 **레드·옐로우·블루·퍼플**에 후보 1명을 더한 덱의 성능에서 더하지 않은 덱의 성능을 뺀다. 성능은 승리 시 1 + (1 − 걸린 초/300), 패배 시 적 성 진행도. **이득 0.1 = 클리어 약 30초 단축**이다. 참조 덱의 평균 클리어는 '+F.refSummary.meanSec+'초, 승률 '+F.refSummary.winRate+'%.');
L.push('');
L.push('### 왜 이 맵인가 (10-17 선정 기록 — 선정은 그대로 유지)','');
L.push('레전드 1~20장 × ★1~★3(444개 조건) 중에서 골랐다. 아래 표는 선정 당시(10-17 코드) 측정이다.');
L.push('- 보물이 적용되면 **강한 기준 덱(가넷·라피스 등 9종)은 444개 조건을 전부 이기고 최장 68초**라 아군 1명을 더해도 차이가 안 난다. 그래서 약한 4종 덱으로 바꿨다(이 덱이 이 조건들을 50~284초에 이긴다).');
L.push('- 후보 14곳을 아군 106명(당시 전원) 전부로 시험해, 점수 퍼짐·동점 비율·다른 맵과의 순위 일치도를 비교하고 상위 4곳을 시드 6개로 정밀 시험했다.');
L.push('');
L.push('|맵|위치|점수 퍼짐 / 평균 표준오차(SNR)|시드 반분 순위 일치|');L.push('|---|---|---:|---:|');
const rk=o=>{const ks=Object.keys(o).sort((a,b)=>o[b]-o[a]);const r={};ks.forEach((k,i)=>r[k]=i);return r};
for(const m of FOLD.maps){
 const i=+m.split(':')[0];
 const means=allies.filter(c=>FOLD.seedGains[c]).map(c=>mean(FOLD.seedGains[c][m])),mu=mean(means);
 const sdv=Math.sqrt(mean(means.map(x=>(x-mu)**2)));
 const se=mean(allies.filter(c=>FOLD.seedGains[c]).map(c=>{const g=FOLD.seedGains[c][m];const mm=mean(g);return Math.sqrt(g.reduce((s,x)=>s+(x-mm)**2,0)/5)/Math.sqrt(6)}));
 const h1={},h2={};for(const c of allies.filter(c=>FOLD.seedGains[c])){const g=FOLD.seedGains[c][m];h1[c]=(g[0]+g[2]+g[4])/3;h2[c]=(g[1]+g[3]+g[5])/3}
 const ra=rk(h1),rb=rk(h2),n0=Object.keys(h1).length;let ss=0;for(const k of Object.keys(h1))ss+=(ra[k]-rb[k])**2;const split=1-6*ss/(n0*(n0*n0-1));
 L.push(`|${S.names[i]} ★${m.split(':')[1]}${m===MAP?' **(선정)**':''}|레전드 ${S.subOf[i]}장|${sdv.toFixed(3)} / ${se.toFixed(4)} (${(sdv/se).toFixed(1)})|${split.toFixed(2)}|`);
}
L.push('');
L.push('**황제의 야옹이 ★3**를 골랐다. 점수 퍼짐 대비 오차(SNR)가 가장 높고 시드를 반씩 나눠도 순위가 0.95 일치한다. 적 구성은 **놈놈놈 ×1600%, 대디[파동], 쉐도우 복서, 대갈이군 ×1000%(보스)**, 적 성 55만이며 위협의 98%가 무속성이다. 즉 이 맵은 **범용 화력·내구·제어를 재는 맵**이다.');
L.push('');
L.push('### 기준 덱 멤버 보정','');
L.push(`기준 덱의 레드·옐로우·블루·퍼플은 "더한" 값을 잴 수 없고 "뺀" 값만 나온다(블루는 빼면 크게 진다). 그래서 겹치지 않는 두 번째 기준 덱(사이언·핑크·오렌지·그린)에서 이 4명을 "더해서" 잰 뒤, 두 기준 모두에서 더한 ${A.bridge.n}명의 이득 관계(상관 ${A.bridge.corr.toFixed(2)})로 첫 기준 눈금에 옮겼다. 보정 전→후: ${Object.entries(A.adjusted).map(([c,o])=>`${names(c)} ${o.raw.toFixed(3)}→${o.fitted.toFixed(3)}`).join(', ')}. 이 4명의 순위는 다른 캐릭터보다 불확실하다.`);
L.push('');
L.push('## 2. 신뢰도','');
const wRank=allies.map(c=>rankCI[c][1]-rankCI[c][0]).sort((a,b)=>a-b);
L.push(`- 시드를 다시 뽑아 순위를 400번 계산하면 **순위의 95% 구간 폭이 중앙값 ${wRank[Math.floor(n/2)]}계단**이다(최소 ${wRank[0]}, 최대 ${wRank[n-1]}). 따라서 **±10계단 안은 같은 급**으로 봐야 한다.`);
L.push('- 맵이 다르면 순위가 크게 달라진다(후보 4곳끼리 순위 일치도 0.49~0.72). 이 보고서의 "좋다/나쁘다"는 **이 맵에서**의 판정이며, 특화 맵에서는 달라질 수 있다.');
L.push('');
L.push('## 3. 원인: 무엇이 이득을 만드는가','');
L.push(`능력치(초당 피해·체력·사거리·이동 속도·가격·재사용·군중 제어·범위·버티기)를 표준화한 릿지 회귀로 맞춘 결과 **R² = ${R2.toFixed(2)}**(설명력 ${Math.round(R2*100)}%)이다. 표준화 계수(클수록 이득에 기여):`);
L.push('');L.push('|요인|표준화 계수|해석|');L.push('|---|---:|---|');
const interp={dps:'화력이 높을수록 빨라진다',ehp:'체력',range:'사거리',speed:'이동 속도',cost:'가격(비쌀수록 강한 경향, 인과가 아니라 통제 변수)',cd:'재사용이 길수록 느려진다(음수가 정상)',cc:'군중 제어',area:'범위 공격',knock:'버티는 횟수'};
for(const k of A.keys)L.push(`|${KO[k]||'가격'}|${A.coef[k].toFixed(3)}|${interp[k]}|`);
L.push('');
L.push('**읽는 법**: 능력치로는 절반만 설명된다. 나머지 절반은 이 맵의 상성(무속성 적), 출격 순서 효과(비싼 유닛이 방어 유닛의 돈을 먹음), 능력 효과가 만든다.');
L.push('');
L.push('## 4. 좋은 캐릭터 상위 15','');
L.push('|순위(95% 구간)|캐릭터|등급|클리어 단축|근거|');L.push('|---:|---|---|---:|---|');
for(const c of A.order.slice(0,15))L.push(`|${A.rank[c]} (${rankCI[c][0]}~${rankCI[c][1]})|${names(c)}|${GR[e.gradeOf(c)]}|${fmtSec(A.gain[c])}|${cause(c)}|`);
L.push('');
L.push('## 5. 나쁜 캐릭터 하위 20 — 원인과 3진','');
L.push('|순위(95% 구간)|캐릭터|등급|클리어 단축|원인|3진|');L.push('|---:|---|---|---:|---|---|');
for(const c of A.order.slice(-20).reverse()){const tv=trueVerdict(c);L.push(`|${A.rank[c]} (${rankCI[c][0]}~${rankCI[c][1]})|${names(c)}|${GR[e.gradeOf(c)]}|${fmtSec(A.gain[c])}|${cause(c)}|${tv.v}${tv.d!==null?` (Δ${tv.d>=0?'+':''}${tv.d.toFixed(3)}, ${fmtSec(tv.d)})`:''}|`)}
L.push('');
L.push('## 6. 3진 효과 (전용 3진 그림이 있는 캐릭터만)','');
L.push(`전용 3진 그림이 있는 **${HAS3.length}명**만 같은 덱·시드·방식으로 **그 캐릭터만 3진 vs 2진** 비교했다(Δ = 3진이 더한 성능, +0.1 = 30초 단축). 효과가 표준오차의 2배 이내면 "차이 없음". 그림이 없는 나머지 캐릭터는 3진 분석에서 뺐다.`);
L.push('');
L.push('|캐릭터|2진 순위|3진 Δ(오차)|3진 후 순위(2진 분포 기준)|판정|');L.push('|---|---:|---:|---:|---|');
for(const c of HAS3.slice().sort((a,b)=>TF.out[b].delta-TF.out[a].delta)){const tv=trueVerdict(c),t=TF.out[c];L.push(`|${names(c)}|${A.rank[c]}|${t.delta>=0?'+':''}${t.delta.toFixed(3)} ±${t.se.toFixed(3)} (${fmtSec(t.delta)})|${tv.r3}|${tv.v}|`)}
L.push('');
L.push('**3진 정의 상태**: 라즈베리·크리스탈·인디고는 **새 3진 정의**로 쟀다(라즈베리: 체력·공격 ×1.5·간격 3초·사거리 39·에일 초뎀·베리어 브레이커 25%·무한 관통, 크리스탈: 크리티컬 20%·에일 엄강·베리어 브레이커 50%, 인디고: 체력·공격 ×1.4·정지 55%·2.5초·공격력 다운 무효). 나머지 6명은 기존 정의다. 이 맵은 무속성 적이라 에일 엄강·베리어 브레이커·정지 강화의 몫은 거의 보이지 않으며, 에이리언·떠 있는 적 특화 맵 시험은 별도로 했다(라즈베리: 에이리언 2진 1.168 → 3진 1.724, 크리스탈: 에이리언 0.367 → 1.345, 인디고: 떠 있는 적 1.074 → 1.305).');
L.push('');
L.push('## 7. 이 맵에서 낮지만 특화 능력이 있는 캐릭터','');
L.push('이 맵은 무속성 적이 98%라 아래 캐릭터의 능력은 쓰일 곳이 없었다. **낮은 순위는 "나쁘다"가 아니라 "이 맵에서는 평가되지 않았다"**로 읽어야 한다. 특화 맵 시험이 필요하다(이전 점검의 특화 시험은 메탈 1조건·파동 7조건으로 부족했다).');
L.push('');L.push('|캐릭터|순위|특화 능력|필요한 시험 맵|');L.push('|---|---:|---|---|');
const spec=allies.filter(c=>A.feat[c].traitSpecial&&A.rank[c]>n/2).sort((a,b)=>A.rank[a]-A.rank[b]);
for(const c of spec){
 const d=e.units[c];const tag=[];const TK={red:'빨간 적',alien:'에이리언',floating:'떠 있는 적',black:'검은 적',angel:'천사',metal:'메탈',zombie:'좀비'};const kt=list=>list.map(t=>TK[t]||t).join('·');
 if(d.zombieKiller)tag.push('좀비 킬러');
 if(d.strongVs&&d.strongVs.length)tag.push(kt(d.strongVs)+' 엄강');
 if(d.massiveVs&&d.massiveVs.length)tag.push(kt(d.massiveVs)+' 초데미지');
 if(d.metalKiller)tag.push('메탈 킬러');
 if(d.barrierBreak)tag.push('바리어 브레이커');
 if(d.castleMult>1)tag.push('성 파괴자');
 if(d.extremeVs)tag.push('극데미지');
 const joined=tag.join(' ');
 const need=joined.includes('좀비')?'좀비 침공·망자의 땅 계열':joined.includes('메탈')?'메탈 적 맵':(joined.includes('바리어')||joined.includes('alien'))?'에이리언(바리어) 맵':joined.includes('성')?'적 성 위주 맵':(joined.includes('빨간')?'빨간 적이 많은 맵':joined.includes('떠 있는')?'떠 있는 적이 많은 맵':joined.includes('검은')?'검은 적이 많은 맵':joined.includes('천사')?'천사가 많은 맵':'해당 특성 적이 많은 맵');
 L.push(`|${names(c)}|${A.rank[c]}|${tag.join(' · ')}|${need}|`);
}
L.push('');
L.push('## 부록 A. 발표된 티어표(5맵 합산)의 불확실성','');
const w=Object.values(BT.res).map(o=>o.hi-o.lo).sort((a,b)=>a-b);
L.push('발표된 티어표(OP~F, +/−)를 만든 5개 기준 맵 시험을 시드별로 다시 돌려(커밋된 코드 기준) 시드를 400번 재추출했다.');
L.push(`- 합산 점수의 95% 구간 폭이 **중앙값 ${w[Math.floor(w.length/2)].toFixed(3)}**(최소 ${w[0].toFixed(3)}, 최대 ${w[w.length-1].toFixed(3)})로 티어 한 칸의 폭(0.07~0.10)보다 2~3배 넓다.`);
L.push(`- **세분 티어 한 칸 안에 95% 구간이 들어가는 캐릭터: 0 / ${Object.keys(BT.res).length}명**, 굵은 5단계로 묶어도 6명뿐이다.`);
L.push('- 오차가 작은 캐릭터: 카민·프리즘·스프링·로즈·라즈베리. 큰 캐릭터: 라피스·옵시디언·길리먼 블루·토파즈·가넷(기준 덱 멤버라 "빼서 잰" 값이 시드에 크게 흔들림).');
L.push('- **결론**: 티어표의 +/− 세분과 OP~F 구분은 측정이 뒷받침하지 못한다. 상·중상·중·중하·하 정도의 **굵은 5단계**가 안전하다.');
L.push('');
L.push(`## 부록 B. 전체 ${n}명 표`,'');
L.push('|순위(95% 구간)|캐릭터|등급|클리어 단축|±표준오차(초)|초당 피해|체력|사거리|재사용|3진 Δ(초)|');L.push('|---:|---|---|---:|---:|---:|---:|---:|---:|---:|');
for(const c of A.order){const f=A.feat[c],t=TF.out[c];L.push(`|${A.rank[c]} (${rankCI[c][0]}~${rankCI[c][1]})|${names(c)}${A.adjusted[c]?' †':''}|${GR[e.gradeOf(c)]}|${fmtSec(A.gain[c])}|${Math.round(A.se[c]*300)}|${Math.round(f.dps).toLocaleString()}|${Math.round(f.hp).toLocaleString()}|${Math.round(f.range*10)/10}|${f.cd}|${HAS3.includes(c)&&t?fmtSec(t.delta):'-'}|`)}
L.push('','† 기준 덱 멤버(레드·옐로우·블루·퍼플): 두 번째 기준 덱에서 보정한 값.','');
fs.writeFileSync(path.join(root,'docs/티어표/캐릭터-성능-원인-보고서-2026-10-19.md'),L.join('\n'));
console.log('written',L.length,'lines');
process.exit(0);
