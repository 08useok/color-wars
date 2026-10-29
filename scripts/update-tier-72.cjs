// Small release supplement: do not rerun or overwrite the historical full roster.
const fs=require('fs'),{runJobs}=require('./sim-pool.cjs'),make=require('./full-harness.cjs');
const A=require('../docs/simulations/char-analysis-2026-10-19.json'),F=require('../docs/simulations/bench20-final-2026-10-19.json');
const e=make(),[i,crown]=A.map.split(':').map(Number),core=F.core9,seeds=3,policies=F.policies;
if(!e.stageList[i].name.includes('황제'))throw Error('reference map changed');
const cases=[{key:'base',id:null,form:2},...['lavender','azure','aqua','babyblue'].flatMap(id=>[2,3].map(form=>({key:id+form,id,form}))),{key:'cheerdandelion2',id:'cheerdandelion',form:2},{key:'garnet2',id:'garnet',form:2}];
const jobs=[],meta=[];
for(const c of cases)for(let seed=1;seed<=seeds;seed++)for(const policy of policies){meta.push({key:c.key,seed,policy});jobs.push({i,crown,seed,policy,deck:c.id?[...core,c.id]:core,profile:{level:30,trueForms:c.form===3?[c.id]:[]}});}
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length,band=g=>['OP','SSS','SS','S','A','B','C','D','E','F','X'][[47,41,35,29,23,17,11,5,-1,-7].findIndex(x=>g>=x)<0?10:[47,41,35,29,23,17,11,5,-1,-7].findIndex(x=>g>=x)];
(async()=>{
 const raw=await runJobs(jobs,{workers:8,chunk:6}),best={};raw.forEach((r,k)=>{if(r.error)throw Error(r.error);const m=meta[k],score=r.win?2-Math.min(300,r.seconds)/300:Math.max(0,Math.min(.95,1-r.enemyHp/e.stageList[i].hp)),key=m.key+'|'+m.seed;if(!best[key]||score>best[key].score)best[key]={...r,score,policy:m.policy};});
 const summarize=key=>{const perSeed=Array.from({length:seeds},(_,k)=>(best[key+'|'+(k+1)].score-best['base|'+(k+1)].score)*300),gain=mean(perSeed),se=Math.sqrt(perSeed.reduce((s,x)=>s+(x-gain)**2,0)/(seeds-1)/seeds);return {gain,se,perSeed,tier:band(gain)};};
 const anchor=summarize('garnet2'),historical=mean(F.seedGains.garnet[A.map].slice(0,seeds))*300;
 const rows=cases.filter(c=>c.id&&c.id!=='garnet').map(c=>({...c,name:e.names[c.id],grade:e.gradeOf(c.id),...summarize(c.key)}));
 const out={date:'2026-10-29',map:A.map,name:e.stageList[i].name,seeds,policies,core,anchor:{...anchor,historicalMatchedSeeds:historical,drift:anchor.gain-historical},rows,meta,raw};
 fs.writeFileSync('docs/simulations/tier-72-supplement-2026-10-29.json',JSON.stringify(out,null,2));
 const target=rows.filter(r=>r.form===3||r.id==='cheerdandelion'),grade={basic:'기본',rare:'레어',sr:'슈퍼 레어',uber:'울슈레',ex:'EX'},notes={lavender:'범위 공따·느리게, 체력 절반 이하 강화. 보호가 필요한 후방 메즈.',azure:'높은 공체의 근접 돌진 딜탱. 크리티컬·혼신·파동은 확률.',aqua:'떠 있는 적·천사 확정 느리게. 개체 공격·짧은 사거리가 약점.',babyblue:'빠르게 쌓는 개체 밀치기 지원. 밀치기로 아군 타격을 비울 수 있음.',cheerdandelion:'메탈 우선·확정 크리티컬·메탈 한 마리 처치. 무속성 기준 맵에서는 주력 특화가 평가되지 않음.'};
 const lines=['## 7.2 신규 추가 · 2026-10-29','','**등재 대상: 2진 116명 · 출시 3진 16명.** 아래 5개 형태를 추가했다. 기존 본표는 이전 측정 기록이며, 전원 재측정하거나 기존 순위를 바꾸지 않았다.','','황제의 야옹이 ★3 · Lv.30 · 보물 완성 · 레드/옐로우/블루/퍼플+후보 · 시드 3개 · auto/smart2 중 높은 성능. 신규 3진의 2진도 같은 조건으로 비교했다. 빠른 추가 측정이므로 **티어는 잠정**이며, 전체 구간 인원을 재측정하지 않아 신규 항목의 +/−와 전체 순위는 부여하지 않는다.','',`구간은 기존 표와 같은 OP≥47, SSS≥41, SS≥35, S≥29, A≥23, B≥17, C≥11, D≥5, E≥−1, F≥−7, X<−7초를 사용했다. 비교용 가넷은 현재 ${anchor.gain.toFixed(1)}초, 같은 세 시드의 과거 값 ${historical.toFixed(1)}초로 차이 ${(anchor.gain-historical).toFixed(1)}초다. ${Math.abs(anchor.gain-historical)>1.5?'비교 기준의 차이가 확인되어 기존 순위와 직접 합치면 안 된다.':'이 비교용 캐릭터만으로 모든 기존 순위의 유효성을 보장하지 않는다.'}`,'','|잠정 티어|캐릭터|형태|등급|클리어 단축 ±표준오차|같은 조건의 2진 → 3진 변화|','|---|---|---|---|---:|---:|'];
 for(const r of [...target].sort((a,b)=>b.gain-a.gain)){const base=rows.find(x=>x.id===r.id&&x.form===2);lines.push(`|${r.tier}|${r.name}|${r.form}진|${grade[r.grade]}|${r.gain.toFixed(1)} ± ${r.se.toFixed(1)}초|${r.form===3?(r.gain-base.gain>=0?'+':'')+(r.gain-base.gain).toFixed(1)+'초':'–'}|`);}
 lines.push('','### 역할과 특화','',...target.map(r=>'- **'+r.name+' '+r.form+'진**: '+notes[r.id]),'','이 맵은 무속성 중심이므로 메탈 처치·천사/떠 있는 적 제어는 별도로 봐야 한다. X도 이 맵의 덱 추가 효율을 뜻하며 모든 상황의 무용함을 뜻하지 않는다. 기존 표의 전체 순위·신뢰구간·상하위권 문구는 이번 추가 측정으로 갱신하지 않았다.','','측정 원본: `docs/simulations/tier-72-supplement-2026-10-29.json`. 능력치와 도감의 서열 문구는 변경하지 않았다.','');
 const supplement=lines.join('\n');fs.writeFileSync('docs/티어표/7.2-신규-티어-추가-2026-10-29.md','# 7.2 신규 캐릭터·3진 티어 추가\n\n'+supplement);
 for(const file of ['docs/티어표/티어표-2진-3진-2026-10-19.md','docs/티어표/등급별-아군-티어리스트-2026-10-19.md']){let s=fs.readFileSync(file,'utf8');s=s.replace(/<!-- TIER72_START -->[\s\S]*?<!-- TIER72_END -->\s*/,'');const at=s.indexOf('\n',s.indexOf('# '));s=s.slice(0,at+1)+'\n<!-- TIER72_START -->\n'+supplement+'<!-- TIER72_END -->\n'+s.slice(at+1);fs.writeFileSync(file,s);}
 console.log(JSON.stringify({anchor:out.anchor,added:target.map(r=>({name:r.name,form:r.form,tier:r.tier,gain:r.gain,se:r.se}))},null,2));process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
