// 새(또는 조정한) 캐릭터 한 명을 테스트 맵(황제의 야옹이 ★3)에서 재서, 현재 티어표(106명) 안의 위치를 구한다.
// 조건은 티어표와 같다: 보물 전부 완성 · 전원 Lv.30 · 기준 덱 레드·옐로우·블루·퍼플 + 후보 1칸 · 출격 방식 auto/smart2 중 높은 쪽.
// 사용: UNIT=turquoise [MODS='{"turquoise":{"cost":3800}}'] [SEEDS=10] [TRUE=1] node scripts/new-unit-tier.cjs
//   MODS = 능력치 수정(unitMods 형식), TRUE=1 = 그 캐릭터를 3진으로 잰다.
// 비교 분포는 docs/simulations/char-analysis-2026-10-19.json(이득, 초 = 이득×300). 기준 덱 멤버 4명은 자기 자신을 못 재니 UNIT으로 쓸 수 없다.
// 주의: 분포는 그 시점 코드로 쟀다. 그 뒤 전투 규칙이 바뀌었으면 기존 캐릭터(ANCHOR, 기본 가넷)를 같이 다시 재서 티어표 값과 맞는지 검증하고, 어긋나면 경고가 뜬다 → 분포부터 다시 재야 한다.
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const rd=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const UNIT=process.env.UNIT,MODS=process.env.MODS?JSON.parse(process.env.MODS):null,SEEDS=+(process.env.SEEDS||10),TRUE=process.env.TRUE==='1';
const BANDS=['OP','SSS','SS','S','A','B','C','D','E','F','X'],EDGES=[70,62,54,46,38,30,22,14,10,6];// 티어표(make-tier-v3.cjs)와 같은 8초 간격
const bandOf=g=>{for(let b=0;b<EDGES.length;b++)if(g>=EDGES[b])return BANDS[b];return 'X'};
(async()=>{
 const A=rd('docs/simulations/char-analysis-2026-10-19.json'),F=rd('docs/simulations/bench20-final-2026-10-19.json');
 const MAP=A.map,[mi,mc]=MAP.split(':').map(Number),core=F.core9,policies=F.policies;
 const e=mk();
 if(!UNIT||!e.roster.includes(UNIT)){console.error('UNIT=<id> 필요. 없는 id:',UNIT);process.exit(1)}
 if(core.includes(UNIT)){console.error('기준 덱 멤버('+core.join(',')+')는 이 방식으로 잴 수 없다(티어표는 두 번째 기준 덱으로 보정).');process.exit(1)}
 const ANCHOR=process.env.ANCHOR||(UNIT==='garnet'?'turquoise':'garnet');// 이미 티어표에 있는 캐릭터를 같은 조건으로 다시 재서 값이 맞는지 확인한다
 const NS=Math.max(SEEDS,F.seeds),hp=e.stageList[mi].hp;
 const jobs=[],meta=[];
 const add=(unit,kind,seeds,extra)=>{for(let seed=1;seed<=seeds;seed++)for(const policy of policies){jobs.push({i:mi,crown:mc,deck:kind==='ref'?core:[...core,unit],seed,policy,profile:kind==='ref'?{level:30}:{level:30,trueForms:extra.tf?[unit]:[]},unitMods:kind==='ref'?undefined:extra.mods});meta.push({unit,kind,seed})}};
 add(null,'ref',NS,{});add(UNIT,'with',SEEDS,{tf:TRUE,mods:MODS||undefined});if(A.gain[ANCHOR]!=null)add(ANCHOR,'with',F.seeds,{});
 const res=await runJobs(jobs,{chunk:8});
 const perf=(r)=>r.win?1+(1-Math.min(300,r.seconds)/300):Math.max(0,Math.min(.95,1-r.enemyHp/hp));
 const best=new Map();// unit|kind|seed → 출격 방식 중 높은 성능
 res.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k],key=m.unit+'|'+m.kind+'|'+m.seed,v=perf(r);if(v>(best.get(key)??-1))best.set(key,v)});
 const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
 const diffs=(unit,seeds)=>Array.from({length:seeds},(_,k)=>best.get(unit+'|with|'+(k+1))-best.get('null|ref|'+(k+1)));
 const d=diffs(UNIT,SEEDS),m=mean(d),sd=Math.sqrt(d.reduce((x,y)=>x+(y-m)**2,0)/Math.max(1,d.length-1)),se=sd/Math.sqrt(d.length);
 const g=m*300,gse=se*300;
 const others=Object.entries(A.gain).filter(([c])=>c!==UNIT).map(([c,v])=>[c,v*300]);
 const rankAt=x=>others.filter(([,v])=>v>x).length+1;
 const nearest=[...others].sort((a,b)=>Math.abs(a[1]-g)-Math.abs(b[1]-g)).slice(0,3).map(([c,v])=>e.names[c]+' '+Math.round(v)+'초');
 const band=x=>bandOf(x),rng=B=>{const i=BANDS.indexOf(B);return i===0?'70초 이상':i===BANDS.length-1?'6초 미만':EDGES[i]+'~'+EDGES[i-1]+'초'};
 const near=EDGES.some(ed=>Math.abs(g-ed)<Math.max(2,gse));// 티어표의 ▲: 구간 경계에서 표준오차 이내
 const mapName=e.stageList[mi].name+' ★'+mc,T=band(g);
 console.log(`${e.names[UNIT]||UNIT}${TRUE?' (3진)':''}${MODS?' [수정 적용]':''} — 티어 ${T}${near?'▲':''} (${rng(T)})`);
 console.log(`클리어 단축 ${Math.round(g)}초±${Math.round(gse)}  (95% 구간 ${(g-1.96*gse).toFixed(0)}~${(g+1.96*gse).toFixed(0)}초 → 티어 ${band(g+1.96*gse)}~${band(g-1.96*gse)})`);
 console.log(`순위 ${rankAt(g)} (95% 구간 ${rankAt(g+1.96*gse)}~${rankAt(g-1.96*gse)}) / ${others.length+1}명`);
 console.log('가까운 기존 캐릭터: '+nearest.join(', '));
 console.log(`
읽는 법 — 이득(초)은 기준 덱(레드·옐로우·블루·퍼플)에 이 캐릭터를 더했을 때 테스트 맵 ${mapName}(보물 전부 완성·전원 Lv.30)의 클리어가 몇 초 빨라지는가다. 시드 ${SEEDS} × 출격 방식 ${policies.length}(야옹컴 / 위기 때 싼 유닛부터 중 나은 쪽)로 쟀다.`);
 console.log('구간은 8초 간격: OP 70초 이상 · SSS 62~70 · SS 54~62 · S 46~54 · A 38~46 · B 30~38 · C 22~30 · D 14~22 · E 10~14 · F 6~10 · X 6 미만. ▲는 점수가 구간 경계에서 표준오차 이내라 이웃 구간과 구분되지 않는다는 표시다. 순위의 95% 구간이 겹치는 이웃 티어와는 사실상 같은 급이다.');
 if(TRUE)console.log('3진은 그 캐릭터만 3진으로, 나머지 덱은 2진 그대로 둔 상태의 이득이다(티어표의 3진 표와 같은 방식). 이 맵은 무속성 적이 98%라 에일·떠 있는 적 등 특화 능력의 몫은 반영되지 않는다.');
 if(A.gain[ANCHOR]!=null){const ga=mean(diffs(ANCHOR,F.seeds))*300,ex=A.gain[ANCHOR]*300;
  console.log(Math.abs(ga-ex)<=1.5?`(검증: 기존 ${e.names[ANCHOR]}(${ANCHOR}) 다시 재니 ${ga.toFixed(1)}초 — 티어표 ${ex.toFixed(1)}초와 일치, 비교 유효)`:`⚠ 검증 실패: 기존 ${e.names[ANCHOR]}(${ANCHOR}) 다시 재니 ${ga.toFixed(1)}초인데 티어표는 ${ex.toFixed(1)}초다. 전투 규칙이 분포를 잰 뒤 바뀐 것 같아 순위·티어가 어긋난다. bench20 분포부터 다시 재야 한다.`)}
 // Role-based assessment; keep the numerical research output above separate.
 const assess=require('./lib/ally-role-assessment.cjs');
 e.setProfile({level:30,trueForms:TRUE?[UNIT]:[]});
 const role=assess(UNIT,e.unitStats(UNIT),e.roles[UNIT]||'');
 const tot=[role.strength,role.caution,role.use];
 tot.push(`이번 시험에서는 기준 덱에 추가했을 때 약 ${Math.round(g)}초의 클리어 단축 효과를 보였다. 한 맵 결과이므로 다른 전선에서도 같은 효과를 보장하지는 않는다.`);
 if(A.gain[UNIT]!=null&&(TRUE||MODS)){const base=A.gain[UNIT]*300,dl=g-base,sig=Math.abs(dl)>2*gse&&Math.abs(dl)>=3;tot.push(`이전 측정 대비 ${dl>=0?'+':'−'}${Math.abs(Math.round(dl))}초이며 ${sig?'측정 오차보다 큰 변화다':'측정 오차 안의 차이다'}.`)}
 console.log(`\n총평 — ${e.names[UNIT]||UNIT}${TRUE?'(3진)':''} · ${role.role}: `+tot.join(' '));
 process.exit(0);
})();
