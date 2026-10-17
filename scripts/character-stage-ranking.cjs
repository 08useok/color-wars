const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/simulations/character-stage-comparison'),engine=require('./battle-harness.cjs')();
const audit=require('../docs/simulations/ally-comparison-2026-10-08.json'),stats=new Map(audit.rows.map(r=>[r.type,r]));
const selection=require('../docs/simulations/validation-stage-selection-2026-10-08.json').conditions;
const candidates=engine.roster.filter(t=>['basic','rare'].includes(engine.gradeOf(t)));
function read(type,seed){const p=path.join(out,`${type||'empty'}-seed${seed}.json`);return fs.existsSync(p)?JSON.parse(fs.readFileSync(p,'utf8')):null;}
function tags(type){const r=stats.get(type),s=r.stats,a=[];if(s.cost<=300&&s.cooldown<=5)a.push('양산 고방');if(s.armor||s.resistVs||s.strongVs||s.redStrong||s.floatStrong)a.push('탱킹');if(s.slowChance||s.freezeChance||s.atkDownPct||s.blowChance||s.pull||s.forceKnockback)a.push('메즈');if(s.killGold)a.push('자금');if(!a.length||r.metrics.maximumDps>=2000)a.push('딜러');return a;}
function summarize(type,seeds){let rows=[],baselines=[];for(const seed of seeds){const c=read(type,seed),b=read(null,seed);if(!c||!b)throw Error('Missing checkpoint '+type+' seed '+seed);const expected=selection.filter(t=>engine.gradeOf(type)!=='basic'||t.crown!==4).length;if(c.rows.length!==expected)throw Error('Incomplete candidate '+type);rows.push(...c.rows.map(r=>({...r,seed})));baselines.push(...b.rows.map(r=>({...r,seed})));}
 const lookup=new Map(baselines.map(r=>[`${r.i}:${r.crown}:${r.seed}`,r]));
 let gained=0,lost=0,timeSaved=0,jointWins=0;
 for(const r of rows){const b=lookup.get(`${r.i}:${r.crown}:${r.seed}`);if(!b)throw Error('Missing paired baseline');if(r.win&&!b.win)gained++;if(!r.win&&b.win)lost++;if(r.win&&b.win){timeSaved+=b.seconds-r.seconds;jointWins++;}}
 const normal=rows.filter(r=>r.crown!==4),four=rows.filter(r=>r.crown===4),probed=rows.filter(r=>r.deployments);
 return {type,name:engine.names[type],grade:engine.gradeOf(type),roles:tags(type),seeds,count:rows.length,wins:rows.filter(r=>r.win).length,losses:rows.filter(r=>!r.win&&!r.timeout).length,timeouts:rows.filter(r=>r.timeout).length,gained,lost,net:gained-lost,normal:{count:normal.length,wins:normal.filter(r=>r.win).length},fourStar:{count:four.length,wins:four.filter(r=>r.win).length},deploymentProbe:{trials:probed.length,trialsWithCandidate:probed.filter(r=>(r.deployments[type]||0)>0).length,totalCandidateDeployments:probed.reduce((s,r)=>s+(r.deployments[type]||0),0)},meanJointWinTimeSaved:jointWins?+(timeSaved/jointWins).toFixed(2):0,meanCappedTime:+(rows.reduce((s,r)=>s+(r.win?r.seconds:300),0)/rows.length).toFixed(2)};
}
const groups=['basic','rare'].map(grade=>({grade,rows:candidates.filter(t=>engine.gradeOf(t)===grade).map(t=>summarize(t,[1])).sort((a,b)=>b.wins-a.wins||a.meanCappedTime-b.meanCappedTime)}));
const repeats=groups.map(g=>({grade:g.grade,rows:g.rows.filter(r=>read(r.type,2)&&read(r.type,3)&&read(null,2)&&read(null,3)).map(r=>summarize(r.type,[1,2,3])).sort((a,b)=>b.wins-a.wins||a.meanCappedTime-b.meanCappedTime)}));
const result={method:'동일 고정 덱의 빈 슬롯에 기본/레어 후보 1종만 추가. 나머지 멤버 동일. 기본은 4성 제외. 일반 고정 멤버 9종, 4성 EX 고정 멤버 8종. 30fps·Lv30 2진/+0·경제 최대·모든 장 보너스·해당 장 억제기·300게임초 제한·실제 야옹컴 정책. 고정 덱 궁합과 자동 정책의 영향을 받는 비교이며 보편적인 캐릭터 순위를 증명하지 않음. 승리 수 우선, 동률은 실패를 300초로 처리한 평균 시간으로 정렬하되 단독 1위로 단정하지 않음.',conditions:selection.length,groups,repeats};
const checkpoints=fs.readdirSync(out).filter(n=>n.endsWith('.json')).map(n=>JSON.parse(fs.readFileSync(path.join(out,n),'utf8')));
result.trials=checkpoints.reduce((sum,r)=>sum+r.count,0);result.checkpoints=checkpoints.length;
fs.writeFileSync(path.join(root,'docs/simulations/character-stage-ranking-2026-10-08.json'),JSON.stringify(result,null,2));
let md='# 기본·레어 캐릭터 동일 슬롯 비교\n\n'+result.method+'\n\n';
md+=`기본 18종·레어 38종 전체를 난수 1개로 1차 비교하고, 각 등급 상위·하위 3종씩 총 12종과 빈 슬롯을 난수 2개로 추가 검증했다. 총 **${result.trials.toLocaleString('ko-KR')}판**을 실행했다. 기본은 출격 불가능한 4성을 제외한 521개 조건, 레어는 4성을 포함한 695개 조건이다.\n\n`;
if(repeats.every(g=>g.rows.length===6))md+='반복 검증에서 기본 최고는 레드(1,532/1,563), 레어 최고는 화이트(1,991/2,085)였다. 옐로우·민트시안이 뒤를 이었다. 기본 하위 후보는 살몬·라즈베리·시안, 레어 하위 후보는 다크 라일락·미드나잇·콘이다. 기본 하위 3종은 8판, 레어 하위 3종은 2판 차이로 가까웠다. 단독 최악을 확정하지 않는다. 특히 콘은 경제 강화 최대이고 고정 멤버에 토파즈가 있어 자금 요원으로서의 가치가 낮게 측정될 수 있다.\n\n';
for(const g of groups){md+=`## ${g.grade==='basic'?'기본':'레어'} 전체 1차 비교\n\n|캐릭터|역할|승리/조건|빈 슬롯 대비 추가 승리|추가 패배|순증|동시 승리 판 평균 단축(초)|\n|---|---|---:|---:|---:|---:|---:|\n`;for(const r of g.rows)md+=`|${r.name}|${r.roles.join('·')}|${r.wins}/${r.count}|${r.gained}|${r.lost}|${r.net}|${r.meanJointWinTimeSaved}|\n`;}
for(const g of repeats)if(g.rows.length){md+=`\n## ${g.grade==='basic'?'기본':'레어'} 후보 반복 검증\n\n|캐릭터|승리/조건×3회|추가 승리|추가 패배|순증|\n|---|---:|---:|---:|---:|\n`;for(const r of g.rows)md+=`|${r.name}|${r.wins}/${r.count}|${r.gained}|${r.lost}|${r.net}|\n`;}
md+='\n## 해석의 한계\n\n고방·탱커·딜러·메즈·자금 요원의 역할을 표시했다. 같은 슬롯의 전체 결과와 속성/역할별 장점은 구분한다. 고정 멤버가 이미 특정 능력을 제공하는 경우 같은 능력의 후보가 낮게 평가될 수 있다. 획득 시기, 수동 출격, 다른 덱, 3진과 +레벨은 검증 범위에 포함하지 않았다. 쉬운 조건 288개는 기존 덱 기준으로 제외했으므로 모든 983개 조건의 결과라고 표현하지 않는다.\n';
fs.writeFileSync(path.join(root,'docs/character-stage-ranking-2026-10-08.md'),md);
// Evidence for codex reviews; ratings apply only to the tested second form.
if(repeats.every(g=>g.rows.length===6)){
 const evidence={};
 const existingPath=path.join(root,'character-stage-results.js');
 if(fs.existsSync(existingPath)){const match=fs.readFileSync(existingPath,'utf8').match(/const CHARACTER_STAGE_RESULTS=([\s\S]*);\s*$/);if(match)for(const [type,row] of Object.entries(JSON.parse(match[1])))if(row.grade==='sr')evidence[type]=row;}
 for(const g of groups){const repeated=repeats.find(r=>r.grade===g.grade),minWins=Math.min(...repeated.rows.map(r=>r.wins));
  for(const screened of g.rows){const r=repeated.rows.find(row=>row.type===screened.type)||screened;let label='';
   if(r.type===repeated.rows[0].type)label='best';
   else if(g.rows.slice(0,3).some(row=>row.type===r.type))label='top';
   else if(r.seeds.length===3&&r.wins-minWins<=10)label='low';
   evidence[r.type]={grade:r.grade,label,wins:r.wins,count:r.count,seeds:r.seeds.length,conditions:r.count/r.seeds.length,gained:r.gained,lost:r.lost,net:r.net};
  }
 }
 fs.writeFileSync(path.join(root,'character-stage-results.js'),'// Generated from matched-deck trials; Lv30 second form only.\nconst CHARACTER_STAGE_RESULTS='+JSON.stringify(evidence,null,2)+';\n');
}
console.log(JSON.stringify({groups:groups.map(g=>({grade:g.grade,top:g.rows.slice(0,3),bottom:g.rows.slice(-3)})),repeats:repeats.map(g=>({grade:g.grade,top:g.rows.slice(0,3),bottom:g.rows.slice(-3)}))},null,2));
