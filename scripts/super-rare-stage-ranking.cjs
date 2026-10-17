const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/simulations/character-stage-comparison-sr'),engine=require('./battle-harness.cjs')();
const tasks=require('../docs/simulations/validation-stage-selection-2026-10-08.json').conditions.filter(t=>t.crown!==4);
const candidates=engine.roster.filter(t=>engine.gradeOf(t)==='sr'),traitNames={red:'빨간 적',floating:'떠다니는 적',black:'검은 적',angel:'천사',alien:'에이리언',metal:'메탈'};
function load(type,seed){const r=JSON.parse(fs.readFileSync(path.join(out,`${type||'empty'}-seed${seed}.json`),'utf8'));if(r.rows.length!==tasks.length)throw Error('Incomplete SR checkpoint');return r;}
const baseline=[1,2,3].flatMap(seed=>load(null,seed).rows.map(r=>({...r,seed}))),baseMap=new Map(baseline.map(r=>[`${r.i}:${r.crown}:${r.seed}`,r]));
const stageTraits=new Map(tasks.map(t=>[t.i,new Set((engine.spawnList[t.i]||[]).flatMap(rule=>engine.units[rule.type].traits||(engine.units[rule.type].trait?[engine.units[rule.type].trait]:[])))]));
function summarize(type){const rows=[1,2,3].flatMap(seed=>load(type,seed).rows.map(r=>({...r,seed})));
 let gained=0,lost=0,timeSaved=0,joint=0;
 for(const r of rows){const b=baseMap.get(`${r.i}:${r.crown}:${r.seed}`);if(!b)throw Error('Missing baseline');if(r.win&&!b.win)gained++;if(!r.win&&b.win)lost++;if(r.win&&b.win){timeSaved+=b.seconds-r.seconds;joint++;}}
 const traits={};for(const trait of Object.keys(traitNames)){const subset=rows.filter(r=>stageTraits.get(r.i).has(trait));let net=0;for(const r of subset){const b=baseMap.get(`${r.i}:${r.crown}:${r.seed}`);net+=(r.win?1:0)-(b.win?1:0);}traits[trait]={count:subset.length,wins:subset.filter(r=>r.win).length,net};}
 return {type,name:engine.names[type],wins:rows.filter(r=>r.win).length,count:rows.length,gained,lost,net:gained-lost,meanJointWinTimeSaved:joint?+(timeSaved/joint).toFixed(2):0,meanCappedTime:+(rows.reduce((s,r)=>s+(r.win?r.seconds:300),0)/rows.length).toFixed(2),traits,deploymentProbe:{trials:rows.length,trialsWithCandidate:rows.filter(r=>(r.deployments[type]||0)>0).length,totalCandidateDeployments:rows.reduce((s,r)=>s+(r.deployments[type]||0),0)}};
}
const rows=candidates.map(summarize).sort((a,b)=>b.wins-a.wins||a.meanCappedTime-b.meanCappedTime);
const result={grade:'sr',conditions:tasks.length,seeds:[1,2,3],candidates:candidates.length,trials:(candidates.length+1)*tasks.length*3,core:['garnet','lapis','selenite','topaz','ribbonorange','obsidian','onyx','ribbonchart','rainbow'],method:'슈퍼 레어를 포함하지 않는 9종의 동일 고정 덱에 슈퍼 레어 1종만 추가. 4성 제외 521조건, 17종 전부 3회. Lv30·2진·+0·경제 최대·모든 장 보너스/억제기·자동 출격·30fps·게임300초 제한. 고정 덱 궁합/자동 정책을 포함한 실험이며 기본·레어와 고정 멤버가 달라 등급 간 직접 순위로 비교하지 않음. 속성별 결과는 해당 적이 출현하는 조건이며 혼합 속성이 중복 집계됨.',rows};
fs.writeFileSync(path.join(root,'docs/simulations/super-rare-stage-ranking-2026-10-08.json'),JSON.stringify(result,null,2));
const best=rows[0],worst=rows.at(-1),bestTies=rows.filter(r=>r.wins===best.wins),worstTies=rows.filter(r=>r.wins===worst.wins);
let md='# 슈퍼 레어 동일 슬롯 비교\n\n'+result.method+`\n\n빈 슬롯 대조군 포함 **${result.trials.toLocaleString('ko-KR')}판**. 모든 17종을 세 난수 조건으로 반복했다. 최상위는 ${bestTies.map(r=>r.name).join('·')}, 최하위는 ${worstTies.map(r=>r.name).join('·')}다. 승리 수 동률은 단독 순위로 확정하지 않는다.\n\n|캐릭터|승리/실행|추가 승리|추가 패배|순증|동시 승리 판 평균 단축(초)|\n|---|---:|---:|---:|---:|---:|\n`;
for(const r of rows)md+=`|${r.name}|${r.wins}/${r.count}|${r.gained}|${r.lost}|${r.net}|${r.meanJointWinTimeSaved}|\n`;
md+='\n## 속성별 빈 슬롯 대비 추가 승리 순증\n\n혼합 속성 조건이 여러 열에 포함된다. 특정 속성에 대한 단독 특화 성능을 분리한 실험은 아니다.\n\n|캐릭터|빨간 적|떠다니는 적|검은 적|천사|에이리언|메탈|\n|---|---:|---:|---:|---:|---:|---:|\n';
for(const r of rows)md+=`|${r.name}|${Object.keys(traitNames).map(t=>r.traits[t].net).join('|')}|\n`;
md+='\n## 실제 출격 확인\n\n|캐릭터|후보가 출격한 판|총 출격 횟수|\n|---|---:|---:|\n';
for(const r of rows)md+=`|${r.name}|${r.deploymentProbe.trialsWithCandidate}/${r.count}|${r.deploymentProbe.totalCandidateDeployments}|\n`;
md+='\n## 해석\n\n범위 정지·파동·서지·초데미지·탱킹을 이미 제공하는 고정 멤버와 역할이 중복될 수 있다. 모든 후보가 같은 조건이지만, 다른 덱·수동 출격·획득 시기·3진·+레벨까지 포함한 보편적인 최고/최악을 증명하지는 않는다. 비싼 울슈레 3종을 포함했던 초기 시험은 후보 영향이 작아 EX 8종과 레인보우로 고정 멤버를 조정했다. 초기 결과는 character-stage-comparison-sr-preflight에 보존했으며 위 실행 수와 순위에 합산하지 않았다.\n';
fs.writeFileSync(path.join(root,'docs/super-rare-stage-ranking-2026-10-08.md'),md);
const dataPath=path.join(root,'character-stage-results.js'),match=fs.readFileSync(dataPath,'utf8').match(/const CHARACTER_STAGE_RESULTS=([\s\S]*);\s*$/);if(!match)throw Error('Missing existing evidence');const evidence=JSON.parse(match[1]);
for(const r of rows){const index=rows.indexOf(r);evidence[r.type]={grade:'sr',label:index===0&&bestTies.length===1?'best':r.wins>=rows[2].wins?'top':r.wins<=rows[rows.length-3].wins?'low':'',wins:r.wins,count:r.count,seeds:3,conditions:tasks.length,gained:r.gained,lost:r.lost,net:r.net};}
fs.writeFileSync(dataPath,'// Generated from matched-deck trials; Lv30 second form only.\nconst CHARACTER_STAGE_RESULTS='+JSON.stringify(evidence,null,2)+';\n');
console.log(JSON.stringify({trials:result.trials,top:rows.slice(0,3),bottom:rows.slice(-3),bestTies:bestTies.map(r=>r.name),worstTies:worstTies.map(r=>r.name)},null,2));
