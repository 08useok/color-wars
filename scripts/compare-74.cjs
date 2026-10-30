const fs=require('fs'),make=require('./full-harness.cjs'),{runJobs}=require('./sim-pool.cjs');
const e=make(),core=['red','yellow','blue','purple'],maps=[{i:405,crown:3,tag:'현재 기준 맵'}];
for(const trait of ['floating','angel','alien','zombie']){
 const choices=[];
 for(let i=424;i<748;i++){
  const rules=e.spawnList[i];if(!Array.isArray(rules)||!rules.length)continue;let all=0,match=0;
  for(const r of rules){const d=e.units[r.type];if(!d)continue;const w=d.hp*d.atk*((r.mag||100)/100)**2;all+=w;if((d.traits||[d.trait]).includes(trait))match+=w;}
  if(all&&match/all>=.5&&!maps.some(m=>m.i===i))choices.push({i,share:match/all});
 }
 choices.sort((a,b)=>a.i-b.i);const c=choices[Math.floor(choices.length/2)];if(c)maps.push({...c,crown:1,tag:trait});
}
const ids=['lilac','babypink','magenta','fusioncream'],jobs=[],meta=[];
for(const m of maps)for(let seed=1;seed<=3;seed++)for(const policy of ['auto','smart2']){
 for(const id of ['baseline',...ids,'ocean','sea'])for(const form of ids.includes(id)?[2,3]:[2]){
  jobs.push({i:m.i,crown:m.crown,deck:id==='baseline'?core:[...core,id],seed,policy,profile:{level:30,maxIncome:true,trueForms:form===3?[id]:[]}});meta.push({map:m.i,tag:m.tag,id,form,seed,policy});
 }
}
(async()=>{console.log('jobs',jobs.length,'maps',maps.map(m=>[m.i,e.stageList[m.i].name,m.tag]));const raw=await runJobs(jobs,{chunk:8,onProgress:(n,total)=>{if(n%48===0||n===total)console.log(n+'/'+total);}});if(raw.some(r=>r.error))throw Error(JSON.stringify(raw.filter(r=>r.error)));
 const score=(r,i)=>r.win?2-r.seconds/300:Math.max(0,Math.min(.95,1-r.enemyHp/e.stageList[i].hp));
 const best=new Map();for(let n=0;n<meta.length;n++){const m=meta[n],key=[m.map,m.id,m.form,m.seed].join('|'),v={...m,...raw[n],score:score(raw[n],m.map)};if(!best.has(key)||best.get(key).score<v.score)best.set(key,v);}
 const rows=[];for(const m of maps)for(const id of [...ids,'ocean','sea']){let gains=[],wins2=0,wins3=0;for(let seed=1;seed<=3;seed++){const a=best.get([m.i,ids.includes(id)?id:'baseline',2,seed].join('|')),b=best.get([m.i,id,ids.includes(id)?3:2,seed].join('|'));gains.push((b.score-a.score)*300);wins2+=a.win?1:0;wins3+=b.win?1:0;}rows.push({map:m.i,name:e.stageList[m.i].name,tag:m.tag,id,comparison:ids.includes(id)?'3진－2진':'추가－기준덱',gain:gains.reduce((a,b)=>a+b,0)/3,winsBefore:wins2,winsAfter:wins3});}
 const out={date:'2026-10-30',core,maps,meta,raw,rows};fs.writeFileSync('docs/simulations/compare-74-2026-10-30.json',JSON.stringify(out,null,2));
 let md='# 7.4 추가 전투 비교\n\nLv.30·수입 최대·보물 완성·시드 3개. 야옹컴/스마트 출격 중 시드별 높은 성능 사용. 기준덱은 레드·옐로우·블루·퍼플에 후보 1칸을 추가한다. 3진은 같은 캐릭터 2진과 비교하고 오션·씨는 후보 없는 기준덱과 비교한다. 승리는 클리어 시간, 패배는 적 성 진행도를 합산한 점수이므로 단축 환산값이 실제 시간 차와 항상 같지는 않다.\n\n특화 맵은 기존 스폰 규칙의 HP×ATK×배율² 합 중 해당 속성이 절반 이상인 맵의 중앙 항목을 선택했다. 등장 횟수·실제 생존 시간은 반영하지 않으므로 대표성에는 한계가 있다. 전체 티어 재측정은 아니다.\n\n|맵|대상|비교|단축 환산|승리 전→후(3회)|\n|---|---|---|---:|---|\n';for(const r of rows)md+=`|${r.name} (${r.tag})|${e.names[r.id]}|${r.comparison}|${r.gain.toFixed(2)}초|${r.winsBefore}→${r.winsAfter}|\n`;md+='\n원본: [시험 데이터](../simulations/compare-74-2026-10-30.json). 오션·씨 기본 수치는 최초 제안이며 임의 자동 조정하지 않았다.\n';fs.writeFileSync('docs/기획-시험/7.4-추가전투-2026-10-30.md',md);console.log('DONE',JSON.stringify(rows));process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
