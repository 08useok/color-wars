// 우주편 2장 신규 적 4종(울트라 메에메에·마나부 군·게콕·신님 진심)의 능력치·이름·도감 문구·모션 항목을 cosmos2-enemies.js로 만든다.
// 게임에는 연결하지 않는다(html이 불러오지 않음). 모션은 원작 애니메이션 데이터를 스킬 bc-enemy-anim(bake.py)로 구운 결과
// (reference-sheets/cosmos-2/enemy-atlas/<id>.atlas.json + assets/anim_<id>.webp)를 쓴다.
// 수치 변환(우주편 1장 적과 같은 규칙): 사거리·타격 구간 = 원작 ×0.034, 속도 = 원작 ×0.5367, 간격 = TBA/30, windup = 선딜F/30, attackDuration = (선딜+후딜)F/30.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const R=0.034,V=0.5367,round=(v,n=3)=>Math.round(v*10**n)/10**n;
const E=[
 {id:'ultrabaabaa',db:390,name:'울트라 메에메에',fore:14,back:11,tba:43,speed:10,range:110,
  stats:{trait:'alien',starred:true,hp:500,atk:1000,reward:75,knockbacks:3,barrier:266000},
  text:'별 에이리언. 266,000짜리 단단한 바리어를 두르고 있지만 체력은 500뿐이라 바리어만 깨면 쓰러진다. 바리어 브레이커나 한 방이 센 아군이 필요하다. (우주편 2장)'},
 {id:'kidtappa',db:419,name:'마나부 군',fore:44,back:406,tba:450,speed:50,range:100,
  stats:{trait:'alien',starred:true,hp:40000,atk:50,reward:1000,knockbacks:1,area:true,barrier:15000},
  text:'별 에이리언. 엄청나게 빨리 달려와 15초에 한 번 범위 공격을 한다. 바리어가 15,000이고 체력이 40,000이다. (우주편 2장)'},
 {id:'ribbo',db:420,name:'게콕',fore:20,back:21,tba:379,speed:6,range:450,
  stats:{trait:'alien',starred:true,hp:700,atk:100,reward:150,knockbacks:4,area:true,barrier:65000,zone:[400,550],blowChance:1,blowDistance:250},
  text:'별 에이리언. 먼 거리(400~550)에서 범위 공격하며, 맞은 아군은 100% 확률로 250 뒤로 워프(날려버림)한다. 바리어가 65,000이다. (우주편 2장)'},
 {id:'kamisamaserious',db:421,name:'신님(진심)',fore:90,back:101,tba:401,speed:3,range:300,step:6,ss:0.45,// 프레임이 아주 커서 6프레임 간격·렌더 0.45배로 구웠다(기본은 2프레임·0.6배). 화면 크기는 scale로 맞춘다.
  stats:{hp:1499999,atk:999+999+65999,reward:6000,knockbacks:5,area:true,zone:[0,1000],back:1000},// 전방위 원거리(-1000~1000): 앞 0~1000, 뒤 1000까지(backRange)
  // 3연타 999·999·65,999 (90F·150F·300F). 1·2타만 날려버림 100%·둔화 50F가 붙는다(strike-hits.js가 타격별로 적용).
  hitsF:[[90,999,{blowChance:1,blowDistance:14,slowChance:1,slowDuration:50/30}],[150,999,{blowChance:1,blowDistance:14,slowChance:1,slowDuration:50/30}],[300,65999,null]],
  text:'"나 신님인데. 이번엔 진심이야." 우주편 2장 최종 보스. 3연속 공격 중 1·2타(999)는 날려버림 100%·둔화 50프레임이 붙고 3타(65,999)는 한 방이다. 전방위 원거리 공격(-1000~1000). (우주편 2장 빅뱅)'}
];
const out=[`// 우주편 2장 신규 적 4종 등록 (v7.0.0).`,
`// scripts/build-cosmos2-enemies.cjs 로 만든다. 능력치 변환은 우주편 1장 적과 같은 규칙(사거리 ×0.034, 속도 ×0.5367).`,
`// 엔진 보강 완료(strike-hits.js): 신님(진심) 1·2타 날려버림·둔화와 3타 한 방(타격별 능력), 전방위 원거리(backRange). 게콕 워프는 날려버림으로 대신한다. 신님 가면(2장)은 아직 없다.`,''];
const have=[];
for(const e of E){
 const af=path.join(root,'reference-sheets/cosmos-2/enemy-atlas',e.id+'.atlas.json');
 const u={...e.stats,interval:round(e.tba/30),speed:round(e.speed*V,2),range:round(e.range*R,2),attackDuration:round((e.hitsF?e.tba:e.fore+e.back)/30),windup:round(e.fore/30)};
 if(e.hitsF){const total=e.hitsF.reduce((a,h)=>a+h[1],0);u.hits=e.hitsF.map(([f,atk,ab])=>({at:round(f/30),share:round(atk/total,5),...(ab?{abilities:{...ab,slowDuration:ab.slowDuration&&round(ab.slowDuration,2)}}:{})}))}
 if(u.back){u.backRange=round(u.back*R,2);delete u.back}
 if(u.zone){u.zoneMin=round(u.zone[0]*R,2);u.zoneMax=round(u.zone[1]*R,2);delete u.zone}
 if(u.blowDistance)u.blowDistance=round(u.blowDistance*R,2);
 const order=['trait','starred','hp','atk','interval','speed','range','zoneMin','zoneMax','backRange','reward','knockbacks','area','barrier','blowChance','blowDistance','attackDuration','windup','hits'];
 const ordered={};for(const k of order)if(u[k]!==undefined)ordered[k]=u[k];
 out.push(`data.units.${e.id}=${JSON.stringify(ordered)};`);
 out.push(`UNIT_NAMES.${e.id}=${JSON.stringify(e.name)};`);
 out.push(`ENEMY_TEXT.${e.id}=${JSON.stringify(e.text)};`);
 out.push(`ENEMY_ORDER.push('${e.id}');`);
 if(fs.existsSync(af)){
  const a=JSON.parse(fs.readFileSync(af,'utf8')),f=x=>JSON.stringify(x);
  const step=e.step||2,scale=round(0.833*(e.ss?0.6/e.ss:1),4);
  out.push(`NEW_ATLASES.${e.id}={scale:${scale},left:21,sheet:'assets/anim_${e.id}.webp',walkStep:${step}/30,attackStep:${step},walk:${f(a.walk)},attack:${f(a.attack)},hurt:${f(a.hurt)}};`);have.push(e.id);
 }else out.push(`// NEW_ATLASES.${e.id}: 모션 아직 없음`);
 out.push('');
}
fs.writeFileSync(path.join(root,'cosmos2-enemies.js'),out.join('\n'));
console.log('적',E.length,'모션 항목',have.join(', ')||'없음');
