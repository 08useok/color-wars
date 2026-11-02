// Original stats and spawn compositions: battlecats-db 440/379 and stage s01189-01.
const CYCLONE81_BOSSES={
 primevalcyclone:{name:'고대 사이클론',hp:2333333,atk:7777,range:180*.034,speed:18*.5367,knockbacks:1,traits:['ancient'],area:true,interval:6/30,windup:1/30,attackDuration:6/30,curseChance:1,curseDuration:15,strengthen:{at:.5,mult:3},reward:3333},
 supercosmiccyclone:{name:'슈퍼 스페이스 사이클론',hp:666666,atk:555,range:275*.034,speed:6*.5367,knockbacks:3,trait:'alien',starred:true,area:true,interval:5/30,windup:1/30,attackDuration:5/30,warpChance:1,warpDistance:500*.034,warpDuration:1/30,reward:3333}
};
for(const [id,s]of Object.entries(CYCLONE81_BOSSES)){data.units[id]={...s};UNIT_NAMES[id]=s.name;ENEMY_ORDER.push(id);NEW_ATLASES[id]=CYCLONES81_ATLASES[id];}
ENEMY_TEXT.primevalcyclone='고대종. 떠 있는 적이 아니다. 0.2초마다 범위 공격하며 100% 확률로 15초 저주를 건다. 체력 50% 이하에서 공격력이 3배로 증가한다. 저주 무효·고대종 메즈와 고방으로 저지해야 한다.';
ENEMY_TEXT.supercosmiccyclone='스타 에이리언. 떠 있는 적이 아니다. 5프레임마다 범위 공격하며 맞은 아군을 100% 확률로 뒤로 500 워프시킨다. 억제기 완성 수치와 워프 무효 아군으로 대응한다.';
const CYCLONE81_EVENTS=[
 {id:'primeval',name:'태풍 제로',stage:'원시의 소용돌이',boss:'primevalcyclone',reward:'explorermintcyan',chance:.3,chapter:3,hp:1000000,max:10,color:'#6e8157',rules:[
  csp('primevalcyclone',100,1,100,1000,0,0,true),csp('squirrel',4000,6,100,60,90,150),csp('inglis',100,1,100,300),csp('lilbunbun',1000,0,100,2300,2000,2000),csp('gorydark',300,0,100,2800,2000,2000)]},
 {id:'supercosmic',name:'절망 신차원',stage:'진격의 워프홀',boss:'supercosmiccyclone',reward:'anchorgrey',chance:.3,chapter:3,hp:999000,max:10,color:'#4e597f',rules:[
  csp('supercosmiccyclone',100,1,100,0,0,0,true),csp('shibalienelite',200,1,100,400),csp('madampoodle',800,4,100,600,1200,1200),csp('shibalienelite',200,10,100,1800,600,600),csp('starpeng',200,5,100,1800,1000,1000),csp('gregory',200,5,100,5000,400,400),csp('starpeng',200,0,100,6400,800,800)]}
];
for(const ev of CYCLONE81_EVENTS){CYCLONE_EVENTS.push(ev);registerCycloneEvent(ev);STAGES[ev.index].desc=ev.name+' · '+UNIT_NAMES[ev.boss]+' · 레어 '+CYCLONE_ALLIES[ev.reward].name+' 30% · 보스 격파 필요';}
{const before=cycloneStageOpen;cycloneStageOpen=function(ev){if(ev.id==='primeval')return Array.from({length:324},(_,k)=>k).every(k=>legendProgress[1].includes(k));if(ev.id==='supercosmic')return cleared.includes(COSMOS_END-1);return before(ev);};}
try{const saved=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(saved))for(const ev of CYCLONE81_EVENTS)if(saved.includes(ev.id)&&!cycloneClears.includes(ev.id))cycloneClears.push(ev.id);}catch{}
{const before=renderSpecialStages;renderSpecialStages=function(...args){before(...args);for(const ev of CYCLONE81_EVENTS){if(cycloneStageOpen(ev))continue;const note=document.querySelector('.cyclone-event[data-cyclone="'+ev.id+'"] button small');if(note)note.textContent=ev.id==='primeval'?'구레전드 스토리 ★1 전체 클리어 필요':'우주편 1장 빅뱅 클리어 필요';}};}
renderSpecialStages();
