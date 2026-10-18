// 좀비 발생 (v6.2.0, 원작 위키의 침공 스테이지 'Zombie Outbreak'를 따른다).
// - 클리어한 장(세계편 1~3장 · 미래편 1~3장 · 우주편 1장)의 스테이지마다 좀비 침공판이 열린다. 보라색 Z 표시.
// - 일반 적이 좀비 짝으로 바뀌고(멍뭉이→좀비 멍뭉이 …), 원래 속성 적과 보스는 그대로 남는다.
// - 좀비는 쓰러져도 한 번 되살아난다(곰선생은 두 번). 좀비 킬러(아이언·그레이)가 마무리하면 되살아나지 못한다. 땅굴 이동은 zombie-burrow.js.
// - 보상: 처음 깰 때 XP와 Z 메달, 메달 12개마다 확정권, 한 장의 침공을 전부 깨면 확정권 11장. 장의 마지막 스테이지는 나머지를 다 깨야 열린다.
// 그림은 임시(기본 적 그림 + 초록빛).
// 원작 좀비 짝: Zoge(멍뭉이)·Znache(낼름이)·Zomboe(놈놈놈)·Zigge(돼지새끼)·Zackie Peng(재키펭)·Zory(고릴라저씨)·Zir Zeal(바다레오파드)·
// Zang Roo(캥거류)·Zroco(아거)·Cadaver Bear(곰선생). 원작 좀비는 원래 적보다 훨씬 단단하고 넉백이 적다.
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
 zbear:{base:'bear',name:'좀비 곰선생',hp:11200,atk:800,interval:3.5,speed:4.5,range:8.5,reward:1800,knockbacks:4,area:true,reviveCount:2,reviveDelay:4,reviveHp:.6},
 // 위키 좀비 33종 중 이 게임에 짝 적이 있는 것 (수치는 위키 100% 기준, 속도·사거리는 짝 적의 이 게임 값에 맞춤)
 zbore:{base:'bore',name:'좀비 샤이 보어',hp:400000,atk:4500,interval:.367,speed:11,range:4.4,reward:1800,knockbacks:2,area:true,reviveDelay:5},// Dread Bore: 샤이 보어보다 훨씬 빠르다
 zcapy:{base:'capy',name:'좀비 까르삔초',hp:390000,atk:38000,interval:1.1,speed:3.5,range:16.75,reward:550,knockbacks:2,reviveDelay:6.67},// Zapy
 zbrollow:{base:'brollow',name:'좀비 제비족',traits:['zombie','floating'],hp:4500,atk:10000,interval:4.57,speed:49.5,range:7.5,reward:150,knockbacks:1,area:true,reviveHp:1,reviveDelay:6.67},// Zollow: 100% 체력으로 부활
 zcamelle:{base:'camelle',name:'좀비 혹부리 낙타',hp:120000,atk:5937,interval:3,speed:4.29,range:18.7,reward:1500,knockbacks:1,area:true,reviveCount:99,reviveHp:1,reviveDelay:8},// Zamelle: 무한 부활
 zostrich:{base:'ostrich',name:'좀비 타조동호회',hp:1600000,atk:23000,interval:.57,speed:8.58,range:8.8,reward:1080,knockbacks:4,area:true,reviveCount:99,reviveDelay:6},// Oldstrich: 무한 부활
 zdagshund:{base:'dagshund',name:'좀비 핫도그',hp:800000,atk:30000,interval:6.4,speed:4,range:14.7,reward:800,knockbacks:1,area:true,freezeChance:1,freezeDuration:2,reviveHp:1,reviveDelay:8},// Deathshund: 움직임을 멈춘다 100%
 zduche:{base:'duche',name:'좀비 오리룰루',hp:17500,atk:17000,interval:.87,speed:8,range:4,reward:300,knockbacks:1,area:true,reviveHp:1,reviveDelay:20},// Zuche: 20초 뒤 100%로 부활
 zthrillerz:{base:'guys',name:'스릴러즈',hp:10000,atk:6500,interval:1.27,speed:6,range:3.7,reward:110,knockbacks:1,reviveHp:1,reviveDelay:8}// The Thrillerz: 놈놈놈의 좀비(미래편 2·3장)
};
const ZOMBIE_MAP={};
for(const [id,z] of Object.entries(ZOMBIES)){
 const {base,name,...stats}=z;
 data.units[id]={trait:'zombie',reviveCount:1,reviveHp:.5,attackDuration:Math.min(.9,stats.interval),windup:.3,...stats};
 UNIT_NAMES[id]=name;if(!ZOMBIE_MAP[base])ZOMBIE_MAP[base]=id;
 if(NEW_ATLASES[base])NEW_ATLASES[id]={...NEW_ATLASES[base]};
 if(ENEMY_SIZE[base])ENEMY_SIZE[id]=ENEMY_SIZE[base];
}
{
 const st=document.createElement('style');
 st.textContent=Object.keys(ZOMBIES).map(id=>`.unit.${id} .dog-sprite{filter:hue-rotate(70deg) saturate(.75) brightness(.82)}`).join('')+
  '.stage-card.outbreak{position:relative;box-shadow:inset 0 0 0 2px #9b4dff}.zombie-chip{position:absolute;top:3px;right:3px;min-width:22px;height:22px;padding:0 5px;border-radius:11px;background:#7b2fbe;border:1px solid #d3b0ff;color:#fff;font:700 12px/20px system-ui,sans-serif;text-align:center;cursor:pointer;z-index:2}.zombie-chip:hover{background:#9448e0}.zombie-chip.done{background:#3f2a5c;border-color:#8a6fb5;color:#cbb6e8}.zombie-chip.locked{background:#2a2438;border-color:#5b4a78;color:#8d7fa5;cursor:not-allowed}';
 document.head.append(st);
}
// 그레이도 좀비 킬러 (좀비 엄강은 아이언만)
data.units.grey.zombieKiller=true;
ROLES.grey='범위 · 파동 딜러 · 좀비 킬러';
PROFILE_TEXT.grey='커다란 망치로 지면을 내려쳐 파동을 일으키는 전투원. 일어서는 좀비도 파동으로 눌러 다시는 못 일어나게 한다.';
// ---- 침공 스테이지
const ZOMBIE_KEY='red-battle-zombie-v2';
let zombieSave={clear:[],bonus:[],tickets:0};
try{
 const v=JSON.parse(localStorage.getItem(ZOMBIE_KEY)||'{}');
 if(Array.isArray(v.clear))zombieSave.clear=[...new Set(v.clear.filter(n=>Number.isInteger(n)&&n>=0))];
 if(Array.isArray(v.bonus))zombieSave.bonus=v.bonus.filter(n=>Number.isInteger(n));
 if(Number.isInteger(v.tickets)&&v.tickets>=0)zombieSave.tickets=v.tickets;
}catch{}
function saveZombie(){try{localStorage.setItem(ZOMBIE_KEY,JSON.stringify(zombieSave))}catch{}}
// 장 번호(chapterOf)별: 마지막 스테이지, 좀비 세기(원작: 세계편은 약화, 미래편·우주편은 강화). 장 배율은 enemyMagnification이 따로 곱하므로 나눠서 맞춘다.
const ZOMBIE_CHAPTERS={
 1:{final:CHAPTER_FINALS[0],strength:.5,chapMag:1,label:'세계편 1장'},
 2:{final:CHAPTER_FINALS[1],strength:.7,chapMag:1.5,label:'세계편 2장'},
 3:{final:CHAPTER_FINALS[2],strength:1,chapMag:4,label:'세계편 3장'},
 5:{final:FUTURE_END-1,strength:1,chapMag:1,label:'미래편 1장'},
 6:{final:FUTURE2_END-1,strength:1.2,chapMag:1,label:'미래편 2장'},
 7:{final:FUTURE3_END-1,strength:1.5,chapMag:1,label:'미래편 3장'},
 8:{final:COSMOS_END-1,strength:1.6,chapMag:1,label:'우주편 1장'}
};
const ZOMBIE_CHAPTER_OVERRIDE={6:{guys:'zthrillerz'},7:{guys:'zthrillerz'}};// 원작 미래편 2·3장의 놈놈놈 좀비는 The Thrillerz
function zombieRulesOf(i){
 const ch=ZOMBIE_CHAPTERS[chapterOf(i)];if(!ch||!isStoryStage(i))return null;
 const f=ch.strength/ch.chapMag;let any=false;
 const ov=ZOMBIE_CHAPTER_OVERRIDE[chapterOf(i)]||{};
 const rules=(STAGE_SPAWNS[i]||[]).map(r=>{const z=ov[r.type]||ZOMBIE_MAP[r.type];if(!z)return {...r};any=true;return {...r,type:z,mag:Math.max(25,Math.round((r.mag||100)*f))}});
 return any?rules:null;
}
function zombieStagesOf(c){return STAGES.map((s,i)=>i).filter(i=>chapterOf(i)===c&&isStoryStage(i)&&zombieRulesOf(i))}
function zombieAvailable(i){
 const c=chapterOf(i),ch=ZOMBIE_CHAPTERS[c];
 if(!ch||!cleared.includes(ch.final)||!zombieRulesOf(i))return false;
 if(i===ch.final)return zombieStagesOf(c).filter(j=>j!==i).every(j=>zombieSave.clear.includes(j));// 마지막 스테이지는 나머지를 다 깨야 열린다
 return true;
}
const ZOMBIE_SLOT=STAGES.length;
STAGES.push({name:'좀비 침공',flag:'🧟',hp:100000,gap:4,wave:0,sky:'#cfd8c0',land:'#6f7f5a',chapter:'special',maxEnemies:10,zombieOf:-1,special:{item:'zmedal',itemName:'Z 메달',count:0,chance:0},desc:'좀비 침공 스테이지'});
STAGE_SPAWNS[ZOMBIE_SLOT]=[];
function startOutbreak(i){
 if(!zombieAvailable(i))return;
 const b=STAGES[i],z=STAGES[ZOMBIE_SLOT],first=!zombieSave.clear.includes(i);
 z.name=b.name+' 좀비 침공';z.hp=b.hp;z.maxEnemies=b.maxEnemies;z.sky=b.sky;z.land=b.land;z.chapter=chapterOf(i);z.zombieOf=i;
 z.special={item:'zmedal',itemName:'Z 메달',count:0,chance:0,xp:first?Math.round(stageXP(i)*.5):0};
 STAGE_SPAWNS[ZOMBIE_SLOT]=zombieRulesOf(i);
 selectedStage=ZOMBIE_SLOT;reset();
}
function zombieSlotRestore(){const z=STAGES[ZOMBIE_SLOT];z.chapter='special';z.name='좀비 침공'}// 전투 중에만 원래 장 번호를 써서 장 배율·에이리언 배율이 맞게 붙는다
// 보상
const _zbDrop=specialDropOpen;
specialDropOpen=function(sp){return sp.item==='zmedal'?false:_zbDrop(sp)};
const _zbFinish=finish;
finish=function(win){
 const fresh=!game.ended,onSlot=selectedStage===ZOMBIE_SLOT,i=STAGES[ZOMBIE_SLOT].zombieOf;
 const wasClear=onSlot&&zombieSave.clear.includes(i);
 _zbFinish(win);
 if(!(fresh&&win&&onSlot&&i>=0))return;
 const notes=[];
 if(!wasClear){
  zombieSave.clear.push(i);
  notes.push('Z 메달 +1 ('+zombieSave.clear.length+'개)');
  const owedTickets=Math.floor(zombieSave.clear.length/12)-zombieSave.tickets;
  if(owedTickets>0){zombieSave.tickets+=owedTickets;gachaGive(owedTickets,0);notes.push('메달 12개마다 확정권 '+owedTickets+'장!')}
  const c=chapterOf(i),all=zombieStagesOf(c);
  if(!zombieSave.bonus.includes(c)&&all.every(j=>zombieSave.clear.includes(j))){zombieSave.bonus.push(c);gachaGive(0,1);if(typeof gachaGiveG==='function')gachaGiveG('fix',1);notes.push(ZOMBIE_CHAPTERS[c].label+' 침공 전부 클리어! 확정권 11장 (보관함)')}
  saveZombie();
 }else notes.push('이미 깬 침공이라 추가 보상은 없어요');
 const d=$('#resultDetail');d.textContent=(d.textContent?d.textContent+' · ':'')+notes.join(' · ');
};
const _zbOpen=openStages;
openStages=function(){zombieSlotRestore();return _zbOpen.apply(this,arguments)};
// 스테이지 목록: 클리어한 장의 스테이지 카드에 보라색 Z 표시(눌러서 침공판 시작)
const _zbMenu=renderStageMenu;
renderStageMenu=function(){
 if(!game||!game.running||game.ended)zombieSlotRestore();
 _zbMenu.apply(this,arguments);
 const c=stageChapterView,ch=ZOMBIE_CHAPTERS[c];
 if(!ch||typeof c!=='number')return;
 const open=cleared.includes(ch.final),idx=STAGES.map((s,i)=>i).filter(i=>chapterOf(i)===c);
 const cards=[...$('#stageGrid').children];
 if(!open||cards.length!==idx.length)return;
 cards.forEach((card,k)=>{
  const i=idx[k];if(!isStoryStage(i)||!zombieRulesOf(i))return;
  const avail=zombieAvailable(i),done=zombieSave.clear.includes(i);
  card.classList.add('outbreak');
  const chip=document.createElement('span');chip.className='zombie-chip'+(done?' done':'')+(avail?'':' locked');
  chip.textContent=done?'Z✓':'Z';
  chip.title=avail?`좀비 침공판: 일반 적이 좀비로 바뀝니다${done?' (클리어함)':' · 처음 깨면 XP와 Z 메달'}`:'이 장의 다른 침공을 모두 깨면 열립니다';
  chip.onclick=e=>{e.stopPropagation();e.preventDefault();if(!sweepMode&&avail)startOutbreak(i)};
  card.append(chip);
 });
 const note=$('#chapterNote');
 if(note&&!note.textContent.includes('보라색 Z'))note.textContent+=(note.textContent?' · ':'')+`보라색 Z = 좀비 침공(Z 메달 ${zombieSave.clear.length}개)`;
};
renderStageMenu();
