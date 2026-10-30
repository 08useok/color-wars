// Fast complete-roster refresh. Never changes combat definitions or old raw results.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {runJobs}=require('./sim-pool.cjs'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..'),date='2026-10-29',map=405,crown=3,seeds=3,policies=['auto','smart2'];
const e=make({extraSetup:'globalThis.__tierCurrent={thirds:ALLIES.filter(trueFormAssetReady),trueNames:TRUE_NAME};'}),release=globalThis.__tierCurrent;delete globalThis.__tierCurrent;
if(e.stageList[map].name!=='황제의 야옹이')throw Error('reference map moved');
const core=['red','yellow','blue','purple'],alt=['cyan','pink','orange','green'];
const forms=[...e.roster.map(id=>({id,form:2})),...release.thirds.map(id=>({id,form:3}))];
const jobs=[],meta=[];
function add(set,id,form=2){for(let seed=1;seed<=seeds;seed++)for(const policy of policies){const base=set==='main'?core:alt,deck=id?[...base,id]:[...base];if(new Set(deck).size!==deck.length||deck.length>10)throw Error('illegal deck');meta.push({set,id,form,seed,policy});jobs.push({i:map,crown,deck,seed,policy,profile:{level:30,trueForms:form===3?[id]:[]}});}}
add('main',null);add('alt',null);
for(const r of forms)if(!core.includes(r.id))add('main',r.id,r.form);
for(const id of e.roster)if(!alt.includes(id))add('alt',id);
const avg=a=>a.reduce((s,x)=>s+x,0)/a.length;
const error=a=>{const m=avg(a);return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1)/a.length)};
const bands=['OP','SSS','SS','S','A','B','C','D','E','F','X'],edges=[47,41,35,29,23,17,11,5,-1,-7];
function band(g){const i=edges.findIndex(x=>g>=x);return bands[i<0?10:i]}
function labels(rows){for(const b of bands){const members=rows.filter(r=>r.baseTier===b).sort((a,b)=>b.gain-a.gain||a.id.localeCompare(b.id)),cut=b==='OP'?0:Math.floor(members.length/3);members.forEach((r,i)=>r.tier=b+(i<cut?'+':cut&&i>=members.length-cut?'-':''));}}
const grades={basic:'기본',rare:'레어',sr:'슈퍼 레어',uber:'울슈레',ex:'EX'};
(async()=>{
 console.log('Starting',jobs.length,'battles; forms',forms.length);let last=0;
 const raw=await runJobs(jobs,{workers:14,chunk:12,onProgress:(n,total)=>{if(n-last>=144||n===total){last=n;console.log(n+'/'+total)}}}),best={};
 for(let k=0;k<raw.length;k++){const r=raw[k],m=meta[k];if(r.error)throw Error(r.error);for(const f of ['seconds','allyHp','enemyHp'])if(!Number.isFinite(r[f]))throw Error('nonfinite result '+k);
  const score=r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(.95,1-r.enemyHp/e.stageList[map].hp)),key=[m.set,m.id||'base',m.form,m.seed].join('|');if(!best[key]||score>best[key].score)best[key]={...r,score,policy:m.policy};
 }
 const gains=(set,id,form=2)=>Array.from({length:seeds},(_,j)=>(best[[set,id,form,j+1].join('|')].score-best[[set,'base',2,j+1].join('|')].score)*300);
 const common=e.roster.filter(id=>!core.includes(id)&&!alt.includes(id)),xs=common.map(id=>avg(gains('alt',id))),ys=common.map(id=>avg(gains('main',id))),mx=avg(xs),my=avg(ys),cov=xs.reduce((s,x,i)=>s+(x-mx)*(ys[i]-my),0),vx=xs.reduce((s,x)=>s+(x-mx)**2,0),vy=ys.reduce((s,y)=>s+(y-my)**2,0);
 const bridge={n:common.length,slope:cov/vx,intercept:my-cov/vx*mx,correlation:cov/Math.sqrt(vx*vy)};if(!Number.isFinite(bridge.slope)||vx<=0)throw Error('calibration failed');
 const rows=forms.map(r=>{const calibrated=core.includes(r.id),perSeed=calibrated?gains('alt',r.id).map(g=>bridge.intercept+bridge.slope*g):gains('main',r.id,r.form),gain=avg(perSeed);return {...r,name:e.names[r.id],display:r.form===3?(release.trueNames[r.id]||e.names[r.id]):e.names[r.id],grade:e.gradeOf(r.id),gain,se:error(perSeed),perSeed,calibrated,baseTier:band(gain)};});
 for(const form of [2,3]){const rs=rows.filter(r=>r.form===form).sort((a,b)=>b.gain-a.gain||a.id.localeCompare(b.id));labels(rs);rs.forEach((r,i)=>r.rank=i+1);}
 const harness=fs.readFileSync(path.join(root,'scripts/full-harness.cjs'),'utf8'),addons=JSON.parse(harness.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"')),files=['game.js',...addons],hashes=Object.fromEntries(files.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')]));
 const out={date,map:map+':'+crown,mapName:e.stageList[map].name,seeds,policies,level:30,core,alt,bridge,edges,bands,rows,meta,raw,hashes,notes:['Best deployment policy selected per seed','Core members fitted from an independent reference deck','Standard errors exclude calibration-model uncertainty','Unconnected 7.3 forms excluded']};
 fs.writeFileSync(path.join(root,`docs/simulations/tier-current-${date}.json`),JSON.stringify(out,null,2));
 const conditions=`황제의 야옹이 ★3 · Lv.30 · 보물 완성 · 수입 업그레이드는 기존 측정처럼 시작 자금에서 자동 구매 · 시드 ${seeds}개 · auto/smart2 중 시드별 높은 성능. 기준 덱은 레드·옐로우·블루·퍼플이다.`;
 const intro=[`현재 게임에 연결된 **2진 ${e.roster.length}명·3진 ${release.thirds.length}명, 총 ${rows.length}개 형태**를 전부 다시 측정했다. 이전의 본표와 7.2 추가표를 이번 측정으로 통합한다.`,conditions,`**짧은 재측정판**이다. 시드가 적으므로 인접 순위와 티어 차이를 확정적인 서열로 읽지 않는다. 값은 클리어 단축에 대응하는 점수 차이이며, 패배가 섞이면 실제 시간 차이가 아니다.`,
 `비교를 위해 기존 경계(OP≥47, SSS≥41, SS≥35, S≥29, A≥23, B≥17, C≥11, D≥5, E≥−1, F≥−7, X<−7초)를 유지했다. OP를 제외한 **X를 포함하는 각 등급** 안에서 상·하위 1/3에 +/−를 붙였다. 3명 미만이면 무표다. 2진과 3진은 각 형태의 분포에서 세분화했다.`,
 `기준 덱의 네 캐릭터(†)는 독립 덱 시안·핑크·오렌지·그린으로 측정하고, 공통 ${bridge.n}명의 결과를 회귀 보정했다(상관 ${bridge.correlation.toFixed(3)}). 표준오차는 시드 차이만 나타내며 보정 모형의 불확실성은 포함하지 않는다.`,
 '**X는 이 기준 맵에서 덱 추가 효율이 낮다는 뜻이다.** 특화·다른 맵까지 쓸모없다는 뜻이 아니다. 무속성 중심 기준 맵은 메탈·좀비·천사 등의 특화 성능을 충분히 반영하지 못한다.'];
 const pending=[...['sunflower','fern','jade'].filter(id=>!e.units[id]).map(id=>id+': 미연결'),...['violet','orchid'].filter(id=>!release.thirds.includes(id)).map(id=>id+' 3진: 미연결')];if(!pending.length)pending.push('없음. 7.3 신캐 3명과 바이올렛·오키드 3진을 포함했다.');
 const lines=['# 티어표 — 2진 / 3진 ('+date+')','',...intro.flatMap(s=>[s,''])];
 for(const form of [2,3]){const rs=rows.filter(r=>r.form===form).sort((a,b)=>a.rank-b.rank);lines.push(`## ${form}진 티어표 (${rs.length}명)`,'','|티어|캐릭터|','|---|---|');
  for(const b of bands)for(const suffix of b==='OP'?['']:['+','','-']){const label=b+suffix,a=rs.filter(r=>r.tier===label);if(a.length)lines.push(`|**${label}**|${a.map(r=>r.display).join(' · ')}|`);}
  lines.push('','### 상세','','|순위|티어|캐릭터|등급|단축 점수 ±표준오차|2진 대비|','|---:|---|---|---|---:|---:|');
  for(const r of rs){const base=rows.find(x=>x.id===r.id&&x.form===2);lines.push(`|${r.rank}|${r.tier}|${r.display}${r.calibrated?' †':''}|${grades[r.grade]}|${r.gain.toFixed(1)} ± ${r.se.toFixed(1)}초|${form===3?(r.gain-base.gain>=0?'+':'')+(r.gain-base.gain).toFixed(1)+'초':'–'}|`);}lines.push('');
 }
 lines.push('## 7.3 등재 대기','',...pending.map(s=>'- '+s),'','## 측정 기록','',`- 총 ${jobs.length}판. 각 시드에서 두 출격 방식 중 높은 점수를 사용했다.`,`- 원본: [측정 결과](../simulations/tier-current-${date}.json). 실행 시 읽은 전투 파일의 SHA-256도 저장했다.`,'- 원시 데이터·지난 티어표는 유지했다. 능력치·가격·도감 서열 문구는 변경하지 않았다.','');
 fs.writeFileSync(path.join(root,`docs/티어표/티어표-2진-3진-${date}.md`),lines.join('\n'));
 const byGrade=['# 등급별 아군 티어리스트 ('+date+')','',`[전체 최신 티어표](티어표-2진-3진-${date}.md)와 같은 측정이다. ${conditions}`,'','티어는 전체 공통 경계를 사용하고, 등급별 순위는 각 등급 안의 순서다. 공통 경계의 +/−를 그대로 사용한다.',''];
 for(const form of [2,3])for(const g of ['basic','ex','rare','sr','uber']){const rs=rows.filter(r=>r.form===form&&r.grade===g).sort((a,b)=>a.rank-b.rank);if(!rs.length)continue;byGrade.push(`## ${grades[g]} ${form}진 (${rs.length}명)`,'','|등급 내 순위|전체 순위|티어|캐릭터|단축 점수 ±표준오차|','|---:|---:|---|---|---:|');rs.forEach((r,i)=>byGrade.push(`|${i+1}|${r.rank}|${r.tier}|${r.display}${r.calibrated?' †':''}|${r.gain.toFixed(1)} ± ${r.se.toFixed(1)}초|`));byGrade.push('');}
 byGrade.push('## 등재 대기','',...pending.map(s=>'- '+s),'');fs.writeFileSync(path.join(root,`docs/티어표/등급별-아군-티어리스트-${date}.md`),byGrade.join('\n'));
 fs.writeFileSync(path.join(root,'docs/티어표/README.md'),`# 아군 티어표\n\n- [최신 2진·3진 통합표](티어표-2진-3진-${date}.md)\n- [최신 등급별 티어표](등급별-아군-티어리스트-${date}.md)\n\n${date}: 출시된 ${rows.length}개 형태 전원 재측정·시드 ${seeds}개. 7.3 신캐·3진을 포함했다. 이전 날짜 문서는 과거 기록이다.\n`);
 for(const file of ['티어표-2진-3진-2026-10-19.md','등급별-아군-티어리스트-2026-10-19.md','7.2-신규-티어-추가-2026-10-29.md']){const p=path.join(root,'docs/티어표',file);let s=fs.readFileSync(p,'utf8').replace(/<!-- CURRENT_TIER_LINK -->[\s\S]*?<!-- END_CURRENT_TIER_LINK -->\n*/,''),at=s.indexOf('\n');s=s.slice(0,at+1)+`\n<!-- CURRENT_TIER_LINK -->\n> 최신 측정: [${date} 전체 통합 티어표](티어표-2진-3진-${date}.md). 아래는 이전 측정 기록이다.\n<!-- END_CURRENT_TIER_LINK -->\n`+s.slice(at+1);fs.writeFileSync(p,s);}
 console.log(JSON.stringify({forms:rows.length,battles:jobs.length,bridge,top2:rows.filter(r=>r.form===2).sort((a,b)=>a.rank-b.rank).slice(0,5),thirds:rows.filter(r=>r.form===3).sort((a,b)=>a.rank-b.rank)},null,2));process.exit(0);
})().catch(err=>{console.error(err);process.exit(1)});
