// 억제기 전부 + 파동 대응(어부 살몬 3진·아쿠마) 조건에서도 못 깬 스테이지에 대해 '어떤 적 때문인지'를 찾는다.
//  A) 단일 적 제거: 적 한 종류를 빼면 깨는가
//  B) 단일 적 약화: 그 적 배율을 25%로 낮추면 깨는가
//  C) 단독 시험: 그 적(과 보스)만 남기면 지는가
//  D) 파동 대응 덱: 살몬 3진 + 아쿠마를 넣고 3진을 켠 덱으로도 졌는가
// 입력: docs/simulations/chapter-settings-2026-10-13.json  출력: docs/simulations/culprit-2026-10-13.json
const fs=require('fs'),path=require('path');
const {runJobs}=require('./sim-pool.cjs');
const mk=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..');
const POL=['auto','smart','smart2'];
(async()=>{
 const e=mk();
 const chap=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/chapter-settings-2026-10-13.json'),'utf8'));
 const scores=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/tier-scores-2026-10-13.json'),'utf8'));
 const val=t=>scores[t]?.score??0;
 const waveTypes=new Set(Object.entries(e.units).filter(([k,d])=>d.wave&&!e.roster.includes(k)).map(([k])=>k));
 const targets=[];
 for(const r of chap)for(const u of r.unclear)targets.push({set:r,i:u.i,crown:r.crown,name:u.name,progress:u.progress});
 console.log('targets',targets.length);
 const anyWin=async(i,crown,deck,profile,mods)=>{
  const jobs=POL.map(p=>({i,crown,deck,seed:1,policy:p,profile,mods}));
  const res=await runJobs(jobs,{chunk:3});
  const wins=res.filter(r=>r.win);
  return {win:wins.length>0,sec:Math.min(...res.map(r=>r.seconds)),enemy:Math.min(...res.map(r=>r.enemyHp))};
 };
 const out=[];
 for(const t of targets){
  const rules=e.spawnList[t.i]||[];
  const types=[...new Set(rules.map(r=>r.type))];
  const stage=e.stageList[t.i];
  const info=types.map(k=>{const d=e.units[k];const mags=rules.filter(r=>r.type===k).map(r=>r.mag||100);const mag=Math.max(...mags);
   const traits=d.traits||(d.trait?[d.trait]:[]);const dps=d.atk/Math.max(.2,d.interval||1)*(d.multiHit||1)*(d.area?1.5:1);
   return {type:k,name:e.names[k]||k,mag,count:rules.filter(r=>r.type===k).reduce((a,r)=>a+(r.count||1),0),hp:d.hp,atk:d.atk,interval:+(d.interval||0).toFixed(2),speed:d.speed,range:d.range,traits,wave:!!d.wave,dpsPerMag:Math.round(dps*(mag/100)),boss:rules.some(r=>r.type===k&&r.boss)}});
  const isWave=types.some(k=>waveTypes.has(k));
  const allowed=g=>t.crown===4?['ex','rare'].includes(e.gradeOf(g)):true;
  const base=t.set.deck;
  const adv=!!t.set.needs3;
  const prof=adv?{level:30,trueFormsAll:true}:{level:30};
  const profAdv={level:30,trueFormsAll:true};
  // D) 파동 대응 덱
  let waveDeck=null;
  if(isWave&&t.crown<4){
   const add=['salmon','aquamarine'].filter(x=>e.roster.includes(x)&&!base.includes(x));
   const d=[...base];
   const order=d.map((x,k)=>[k,val(x)]).sort((a,b)=>a[1]-b[1]);
   add.forEach((x,k)=>{d[order[k][0]]=x});
   waveDeck=d;
  }
  const row={i:t.i,crown:t.crown,name:t.name,setKey:t.set.key,hp:stage.hp,progress:t.progress,desc:stage.desc,isWave,waveTypes:types.filter(k=>waveTypes.has(k)),enemies:info,deck:base,waveDeck};
  row.baseResult=await anyWin(t.i,t.crown,base,prof,null);
  row.advResult=await anyWin(t.i,t.crown,base,profAdv,null);
  if(waveDeck)row.waveDeckResult=await anyWin(t.i,t.crown,waveDeck,profAdv,null);
  const test=waveDeck||base;
  row.removal=[];row.weaken=[];row.alone=[];
  for(const k of types){
   const rm=await anyWin(t.i,t.crown,test,profAdv,{remove:[k]});
   const wk=await anyWin(t.i,t.crown,test,profAdv,{mag:{[k]:.25}});
   row.removal.push({type:k,win:rm.win,sec:rm.sec});row.weaken.push({type:k,win:wk.win,sec:wk.sec});
   const others=types.filter(x=>x!==k&&!rules.some(r=>r.type===x&&r.boss));
   const al=await anyWin(t.i,t.crown,test,profAdv,{remove:others});
   row.alone.push({type:k,win:al.win,sec:al.sec,enemy:al.enemy});
  }
  // 판정
  const flips=row.removal.filter(x=>x.win).map(x=>x.type);
  const weakFlips=row.weaken.filter(x=>x.win).map(x=>x.type);
  const aloneLose=row.alone.filter(x=>!x.win).map(x=>x.type);
  row.flips=flips;row.weakFlips=weakFlips;row.aloneLose=aloneLose;
  let verdict;
  const solved=row.waveDeckResult?.win||row.advResult.win||row.baseResult.win;
  if(solved)verdict=row.waveDeckResult?.win?'파동 대응 덱(살몬 3진·아쿠마)으로 깸':'3진을 켜면 깸';
  else if(t.crown===4&&isWave)verdict='★4에는 파동 대응이 없음'+(flips.length?' · '+flips.map(x=>e.names[x]||x).join('/')+' 때문':'');
  else if(flips.length===1)verdict='단일 적 때문: '+(e.names[flips[0]]||flips[0]);
  else if(flips.length>1)verdict='여러 적 중 하나만 빼도 깸: '+flips.map(x=>e.names[x]||x).join(' · ');
  else if(weakFlips.length)verdict='배율을 낮추면 깸: '+weakFlips.map(x=>e.names[x]||x).join(' · ');
  else if(aloneLose.length)verdict='단독으로도 못 이김: '+aloneLose.map(x=>e.names[x]||x).join(' · ');
  else verdict='한 종류만 바꿔서는 안 풀림(여러 적의 합 또는 성 체력 대비 시간 부족)';
  row.verdict=verdict;
  out.push(row);
  console.log(`${t.setKey} ${t.name}★${t.crown}: ${verdict}`);
  fs.writeFileSync(path.join(root,'docs/simulations/culprit-2026-10-13.json'),JSON.stringify(out));
 }
 console.log('done');process.exit(0);
})();
