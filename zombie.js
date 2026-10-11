// 좀비 발생 (v6.2.0): 좀비 적 7종 + 전용 강림형 스테이지 3개 — 아이언즈(좀비 저격 시리즈)의 사냥터.
// 좀비는 쓰러져도 몇 초 뒤 체력 일부로 되살아난다. 좀비 킬러(아이언·그레이)가 마무리하면 부활하지 못한다(엔진의 기존 부활 규칙).
// 그림은 임시(기본 적 그림 + 초록빛). 새 메인 장은 6.9.x 전까지 금지라서 강림·광란형으로 만든다.
// 원작 좀비 발생(위키): 일반 적이 좀비 짝으로 바뀐다 — Zoge(멍뭉이)·Znache(낼름이)·Zomboe(놈놈놈)·Zigge(돼지새끼)·Zackie Peng(재키펭)·
// Zory(고릴라저씨)·Zir Zeal(바다레오파드)·Zang Roo(캥거류)·Zroco(아거)·Cadaver Bear(곰선생). 원작 좀비는 원래 적보다 훨씬 단단하고
// 넉백이 적으며 한 번 50% 체력으로 부활한다(땅굴 이동은 아직 없음).
const ZOMBIES={
 zdog:{base:'dog',name:'좀비 멍뭉이',hp:490,atk:60,interval:1.6,speed:4.5,range:4,reward:60,knockbacks:2,reviveDelay:3},
 znache:{base:'snache',name:'좀비 낼름이',hp:620,atk:100,interval:1.2,speed:6,range:4,reward:90,knockbacks:2,reviveDelay:3},
 zguys:{base:'guys',name:'좀비 놈놈놈',hp:1100,atk:130,interval:1,speed:4.5,range:4.2,reward:130,knockbacks:1,reviveDelay:3},
 zcroco:{base:'croco',name:'좀비 아거',hp:175,atk:35,interval:.6,speed:7.5,range:3.7,reward:50,knockbacks:1,reviveDelay:2},
 zpeng:{base:'peng',name:'좀비 재키펭',hp:1800,atk:90,interval:.8,speed:6.5,range:5,reward:200,knockbacks:2,reviveDelay:3},
 zgory:{base:'gory',name:'좀비 고릴라저씨',hp:2240,atk:95,interval:.53,speed:7,range:5,reward:300,knockbacks:2,area:true,reviveDelay:3},
 zseal:{base:'seal',name:'좀비 바다레오파드',hp:3500,atk:160,interval:.77,speed:5,range:5.7,reward:500,knockbacks:1,area:true,reviveDelay:3},
 zpigge:{base:'pigge',name:'좀비 돼지새끼',hp:4550,atk:200,interval:2.4,speed:2.5,range:5,reward:600,knockbacks:2,area:true,reviveDelay:3},
 zkangaroo:{base:'kangaroo',name:'좀비 캥거류',hp:6300,atk:280,interval:1.2,speed:9,range:5.5,reward:900,knockbacks:1,reviveDelay:3},
 zbear:{base:'bear',name:'좀비 곰선생',hp:11200,atk:800,interval:3.5,speed:4.5,range:8.5,reward:1800,knockbacks:4,area:true,reviveCount:2,reviveDelay:4,reviveHp:.6}
};
for(const [id,z] of Object.entries(ZOMBIES)){
 const {base,name,...stats}=z;
 data.units[id]={trait:'zombie',reviveCount:1,reviveHp:.5,attackDuration:Math.min(.9,stats.interval),windup:.3,...stats};
 UNIT_NAMES[id]=name;
 if(NEW_ATLASES[base])NEW_ATLASES[id]={...NEW_ATLASES[base]};
 if(ENEMY_SIZE[base])ENEMY_SIZE[id]=ENEMY_SIZE[base];
}
{
 const st=document.createElement('style');
 st.textContent=Object.keys(ZOMBIES).map(id=>`.unit.${id} .dog-sprite{filter:hue-rotate(70deg) saturate(.75) brightness(.82)}`).join('');
 document.head.append(st);
}
// 그레이도 좀비 킬러 (좀비 엄강은 아이언만)
data.units.grey.zombieKiller=true;
ROLES.grey='범위 · 파동 딜러 · 좀비 킬러';
PROFILE_TEXT.grey='커다란 망치로 지면을 내려쳐 파동을 일으키는 전투원. 일어서는 좀비도 파동으로 눌러 다시는 못 일어나게 한다.';
// ---- 스테이지 3개 (상위 단계는 아래 단계를 깨야 열린다)
const ZOMBIE_KEY='red-battle-zombie-v1';
let zombieClears=[];
try{const v=JSON.parse(localStorage.getItem(ZOMBIE_KEY)||'[]');if(Array.isArray(v))zombieClears=v.filter(n=>Number.isInteger(n)&&n>=0&&n<3)}catch{}
const ZOMBIE_TIERS=[
 {name:'좀비 발생: 변두리',hp:80000,max:10,xp:8000,chance:.3,count:1,m:{s:70,m:90,h:110,b:160},bears:1},
 {name:'좀비 발생: 시가지',hp:200000,max:12,xp:16000,chance:.5,count:1,m:{s:200,m:260,h:330,b:450},bears:1},
 {name:'좀비 발생: 감염 중심',hp:400000,max:14,xp:30000,chance:1,count:2,m:{s:500,m:650,h:800,b:1100},bears:2}
];
const ZOMBIE_START=STAGES.length;
ZOMBIE_TIERS.forEach((t,k)=>{
 const i=STAGES.length,m=t.m;
 STAGES.push({name:t.name,flag:'🧟',hp:t.hp,gap:4,wave:0,sky:'#cfd8c0',land:'#6f7f5a',chapter:'special',maxEnemies:t.max,zombie:{k},special:{item:'ticket',itemName:'뽑기권(1회)',count:t.count,chance:t.chance,xp:t.xp},desc:'좀비는 쓰러져도 되살아난다 · 좀비 킬러로 마무리 · 뽑기권(1회) '+Math.round(t.chance*100)+'%'+(t.count>1?' ×'+t.count:'')});
 STAGE_SPAWNS[i]=[
  {type:'zdog',at:{t:0},delay:[3,6],mag:m.s},
  {type:'zcroco',at:{t:5},delay:[2,5],mag:m.s},
  {type:'znache',at:{t:8},delay:[5,10],mag:m.s},
  {type:'zguys',at:{t:14},delay:[8,14],mag:m.m},
  {type:'zgory',at:{t:20},delay:[10,15],mag:m.m},
  {type:'zpeng',at:{t:26},delay:[9,14],mag:m.m},
  {type:'zpigge',at:{t:32},delay:[14,20],mag:m.h},
  {type:'zseal',at:{hp:85},delay:[10,15],mag:m.h},
  {type:'zkangaroo',at:{hp:65},delay:[12,18],mag:m.h},
  {type:'zbear',at:{hp:90},count:t.bears,delay:[8,12],boss:true,mag:m.b}
 ];
});
function zombieTierOpen(k){return k===0?cleared.includes(CHAPTER1_LEN*2-1):zombieClears.includes(k-1)}
// 보상: 뽑기권(1회)
const _zbDrop=specialDropOpen,_zbGive=giveSpecialItem,_zbText=specialItemText;
specialDropOpen=function(sp){return sp.item==='ticket'?true:_zbDrop(sp)};
giveSpecialItem=function(item,n){if(item==='ticket'){gachaGive(n,0);return}_zbGive(item,n)};
specialItemText=function(item,n){return item==='ticket'?`뽑기권(1회) ${n}장 획득!`:_zbText(item,n)};
const _zbFinish=finish;
finish=function(win){
 const fresh=!game.ended,z=STAGES[selectedStage].zombie;
 _zbFinish(win);
 if(fresh&&win&&z&&!zombieClears.includes(z.k)){zombieClears.push(z.k);try{localStorage.setItem(ZOMBIE_KEY,JSON.stringify(zombieClears))}catch{}}
};
const _zbReset=reset;
reset=function(){const z=STAGES[selectedStage].zombie;if(z&&!zombieTierOpen(z.k)){openStages();return}_zbReset()};
const _zbSpecial=renderSpecialStages;
renderSpecialStages=function(){
 _zbSpecial();
 const row=document.createElement('div');row.className='special-row today';
 row.innerHTML='<div class="special-label"><b class="day">매일</b><strong>🧟 좀비 발생</strong><small>아이언즈의 사냥터</small></div>';
 for(let k=0;k<ZOMBIE_TIERS.length;k++){
  const i=ZOMBIE_START+k,open=zombieTierOpen(k),b=document.createElement('button');
  b.className='stage-card ribbon';b.disabled=!open;
  b.innerHTML='<strong>'+['변두리','시가지','감염 중심'][k]+'</strong>'+(typeof starHTML==='function'?starHTML(stageStars(i)):'')+'<small>'+(!open?(k?'앞 단계 클리어 필요':'세계편 2장 클리어 필요'):'뽑기권 '+Math.round(ZOMBIE_TIERS[k].chance*100)+'%'+(ZOMBIE_TIERS[k].count>1?' ×'+ZOMBIE_TIERS[k].count:''))+'</small>';
  b.title=STAGES[i].desc;b.onclick=()=>{selectedStage=i;reset()};row.append(b);
 }
 $('#specialGrid').append(row);
};
renderSpecialStages();
