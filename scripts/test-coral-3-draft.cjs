const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const{Worker,isMainThread,parentPort}=require('worker_threads');
const make=require('./full-harness.cjs'),ROOT=path.resolve(__dirname,'..');
const SETUP=`
let coralDraft=false;
const coralStatsBefore=unitStats;
unitStats=function(type,...args){const s=coralStatsBefore(type,...args);if(type!=='coral'||!coralDraft||!s.evolved)return s;return {...s,hp:Math.round(s.hp*1.5),atk:Math.round(s.atk*1.4),area:true,attackClass:'범위',cost:ch1Cost(350),cooldown:20,hits:[{at:.35,share:.5},{at:.65,share:.5}],attackDuration:.8}};
// Current area branch ignores share. Correct ONLY the isolated draft instance.
const coralResolveBefore=resolveAttack;
resolveAttack=function(u,t,share=1){if(u.type==='coral'&&coralDraft&&u.stats.area){const s=u.stats,atk=s.atk;try{s.atk=atk*share;return coralResolveBefore(u,t,1)}finally{s.atk=atk}}return coralResolveBefore(u,t,share)};
const coralResetBefore=reset;reset=function(){coralResetBefore();game.level=data.income.length-1};
globalThis.coralDraftSwitch=v=>{coralDraft=v};
`;
if(!isMainThread){
 const e=make({extraSetup:SETUP});
 parentPort.on('message',jobs=>{const out=[];for(const job of jobs){e.setProfile({level:30,trueForms:[]});globalThis.coralDraftSwitch(job.mode==='third');out.push({...job,...e.simulate(job.i,job.crown,job.deck,job.seed,300,job.policy)})}parentPort.postMessage(out)});
}else(async()=>{
 const probe=make({extraSetup:SETUP+`
 let coralLog=[];const coralDamageBefore=damage;
 damage=function(v,n,from){const hp=v.hp;coralDamageBefore(v,n,from);if(from?.type==='coral'&&hp>v.hp)coralLog.push({target:v.testId,time:game.elapsed,damage:hp-v.hp})};
 globalThis.coralControlled=(draft,floating,count)=>{
 coralDraft=draft;selectedStage=CHAPTER1_LEN;training.levels.coral=30;training.forms.coral=2;deck=['coral'];reset();game.running=true;game.tutorial=99;game.auto=false;game.spawnRules=[];game.money=1e6;game[cooldownKey('coral')]=0;Math.random=()=>.99;addUnit('coral');const u=game.units[0];u.emerging=false;u.x=60;u.stats.speed=0;
 const previousTraits=data.units.dog.traits,previousTrait=data.units.dog.trait;data.units.dog.traits=floating?['floating']:[];delete data.units.dog.trait;
 try{for(let k=0;k<count;k++){addUnit('dog');const v=game.units.at(-1);v.testId=k;v.emerging=false;v.x=55-k;v.stats.speed=0;v.stats.atk=0;v.hp=v.max=1e9;v.stats.knockbacks=1;v.atkCd=1e9}coralLog=[];for(let f=0;f<30;f++)update(1/30);return {stats:u.stats,log:coralLog}}finally{if(previousTraits===undefined)delete data.units.dog.traits;else data.units.dog.traits=previousTraits;if(previousTrait===undefined)delete data.units.dog.trait;else data.units.dog.trait=previousTrait}
 };
 `});
 const controlled=[];
 for(const draft of [false,true])for(const floating of [false,true])for(const count of [1,3]){
  const r=globalThis.coralControlled(draft,floating,count),expected=draft?count*2:1;
  assert.equal(r.log.length,expected,'hit count');
  const perTarget=r.log.filter(x=>x.target===0).reduce((s,x)=>s+x.damage,0);
  assert(Math.abs(perTarget-r.stats.atk*(floating?4:1))<.01,'cycle damage');
  if(draft){assert.equal(r.stats.cost,350);assert.equal(r.stats.cooldown,20);assert(Math.abs(r.log[count].time-r.log[0].time-.3)<.04,'second hit time')}
  controlled.push({draft,floating,count,...r});
 }
 delete globalThis.coralControlled;
 console.log('PASS controlled: 8 cases, two distinct half-damage hits, area coverage, floating x4, price and cooldown.');
 const core=['red','yellow','blue','purple'];
 const maps=['405:3','498:1','326:3','442:3','433:1','541:1'].map(k=>{const[i,crown]=k.split(':').map(Number);return {i,crown,kind:'general'}});
 const floats=probe.stageList.map((stage,i)=>{
  let all=0,part=0;for(const r of probe.spawnList[i]||[]){const d=probe.units[r.type];if(!d)continue;const w=d.hp*d.atk*((r.mag||100)/100)**2*Math.min(r.count??10,10);all+=w;if((d.traits||[d.trait]).includes('floating'))part+=w}
  return {i,crown:1,kind:'floating',share:part/all,threat:part};
 }).filter(s=>s.i>145&&s.share>=.6&&probe.chapterOf(s.i)===4).sort((a,b)=>b.threat-a.threat);
 const usedNames=new Set();for(const s of floats){const name=probe.stageList[s.i].name;if(usedNames.has(name)||maps.some(m=>m.i===s.i))continue;usedNames.add(name);maps.push(s);if(usedNames.size===4)break}
 const jobs=[];for(const m of maps)for(const mode of ['baseline','second','third'])for(const policy of ['auto','smart2'])for(let seed=1;seed<=6;seed++)jobs.push({...m,name:probe.stageList[m.i].name,mode,policy,seed,deck:mode==='baseline'?core:[...core,'coral']});
 console.log('jobs',jobs.length,'maps',maps.map(m=>m.i+':'+m.crown+' '+probe.stageList[m.i].name).join(', '));
 const raw=[];let next=0;
 await Promise.all(Array.from({length:14},()=>new Promise((resolve,reject)=>{
  const w=new Worker(__filename);const send=()=>{if(next>=jobs.length){w.terminate();return resolve()}const batch=jobs.slice(next,next+12);next+=12;w.postMessage(batch)};
  w.on('error',reject);w.on('message',r=>{raw.push(...r);console.log('progress',raw.length+'/'+jobs.length);send()});send();
 })));
 const mean=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
 const summary=maps.map(m=>{
  const hp=probe.stageList[m.i].hp;
  const perf=r=>r.win?2-r.seconds/300:Math.max(0,Math.min(.95,1-r.enemyHp/hp));
  const result={...m,name:probe.stageList[m.i].name};
  for(const mode of ['baseline','second','third']){
   const rows=raw.filter(r=>r.i===m.i&&r.crown===m.crown&&r.mode===mode),best=Array.from({length:6},(_,k)=>rows.filter(r=>r.seed===k+1).sort((a,b)=>perf(b)-perf(a))[0]);
   result[mode]={wins:rows.filter(r=>r.win).length,total:rows.length,bestWins:best.filter(r=>r.win).length,bestScore:mean(best.map(perf)),meanWinSeconds:best.some(r=>r.win)?mean(best.filter(r=>r.win).map(r=>r.seconds)):null,byPolicy:Object.fromEntries(['auto','smart2'].map(p=>[p,rows.filter(r=>r.policy===p&&r.win).length]))};
  }
  result.deltaSeconds=(result.third.bestScore-result.second.bestScore)*300;return result;
 });
 const output={date:'2026-10-19',draft:{hp:1.5,atk:1.4,area:true,hits:[{at:.35,share:.5},{at:.65,share:.5}],cost:350,cooldown:20,interval:2.4,range:'unchanged',caution:'Area share correction exists only in isolated test harness. No production stats/assets/save rules changed.'},conditions:{level:30,treasures:'all',income:'maximum from start',seeds:6,policies:['auto','smart2'],core,limit:300},controlled,summary,raw};
 fs.writeFileSync(path.join(ROOT,'docs/simulations/coral-3-draft-2026-10-19.json'),JSON.stringify(output,null,2));
 const lines=['# 코랄 3진 초안 전투 시험 — 2026-10-19','','능력치·진화 해금은 실제 게임에 적용하지 않고 격리된 시험에서만 변경했다. 공체 150%·140%, 범위 2연타(각 50%), 가격 350원, 재생산 20초. 2연타 시점은 0.35초·0.65초, 공격 주기 2.4초·사거리 유지.','','## 조건','','Lv.30·보물 완성·시작부터 수입 만렙. 기준 덱: 레드·옐로우·블루·퍼플. 기본 덱 / 코랄 2진 추가 / 3진 초안 추가를 같은 시드 6개·출격 방식 2개로 비교했다. 단축 환산은 각 시드에서 더 좋은 방식의 점수를 쓴다. 패배가 섞이면 실제 클리어 시간 차이가 아니다.','','## 발동 확인','','통제 전투 8조건 통과. 개체 1회→범위 2회, 타당 총공격력의 50%, 떠 있는 적 보물 완성 초데미지 ×4, 0.3초 타격 간격, 가격·재생산 확인.','','## 맵 결과','','|맵|종류|기준 덱 승리|2진 승리|3진 승리|2진→3진 단축 환산|','|---|---|---:|---:|---:|---:|'];
 for(const r of summary)lines.push(`|${r.name} ★${r.crown}|${r.kind==='floating'?'떠 있는 적 중심':'범용'}|${r.baseline.wins}/12|${r.second.wins}/12|${r.third.wins}/12|${r.deltaSeconds.toFixed(2)}초|`);
 lines.push('','## 구현상 발견','','현재 범위 공격 분기는 연타별 피해 비율을 반영하지 않는다. 그대로 두면 50%+50%가 아닌 100%+100%가 되므로, 이번 시험에서는 코랄 초안에만 별도 보정을 넣었다. 정식 연결 때 이 부분을 반영해야 한다. 게임 전역의 공격 계산은 수정하지 않았다.','','시뮬레이션은 화면 없는 실제 전투 루프다. 에셋 모션과 두 타격 판정의 브라우저 연결은 아직 시험하지 않았다. 보물 미완성·다른 덱·다른 배율의 결과를 보장하지 않는다.','');
 fs.writeFileSync(path.join(ROOT,'docs/3진-아종/코랄-3진-초안-전투시험-2026-10-19.md'),lines.join('\n'));
 console.log('DONE',JSON.stringify(summary.map(r=>({map:r.name,crown:r.crown,w2:r.second.wins,w3:r.third.wins,delta:r.deltaSeconds}))));process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
