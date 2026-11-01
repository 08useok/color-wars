// 8.1 사이클론 재강림 4개(8맵). 원작 재강림처럼 강림마다 스테이지 2개:
//  ① 기본 강림과 같은 구성 + 출격 제한(레어·EX만, 레전드 ★4와 같은 규칙) + 큰 경험치. 기본 강림을 깨면 열린다.
//  ② 강화판: 출격 제한 없음, 모든 적(보스 포함) 배율 ×1.5. ①을 깨면 열리고, 깨면 그 강림 드랍 아군의 3진 권한이 열린다(드랍 캐릭터 없음).
// 사이클론 규칙(보스를 쓰러뜨려야 클리어, 보스 성 보호)은 CYCLONE_EVENTS에 등록해 그대로 쓴다.
// 저장된 클리어 번호가 밀리지 않도록 다른 모든 스테이지 모듈 뒤(true-legend.js 다음, progress-ready.js 앞)에 붙인다.
const READVENT_THIRD_GATE={};// 아군 키 → ②번째 재강림 스테이지 번호(3진 권한 조건, third-forms 쪽에서 쓴다)
const READVENT_EVENTS=[];
let READVENT_START=1e9,READVENT_END=1e9;
const READVENT_BOOST=1.5,READVENT_XP=19000;// ② 배율, ① 클리어 경험치(기본 강림 3,800의 5배, 원작 100만 XP의 이 게임 환산)
function readventCleared(type){const e=READVENT_EVENTS.find(e=>e.third===type);return !!e&&cycloneClears.includes(e.id)}
(function(){
 if(typeof CYCLONE_EVENTS==='undefined'||typeof registerCycloneEvent!=='function')return;
 const PLAN=[['hurricane','spintoprainbow'],['metal','hulasilver'],['angel','rhythmpink'],['cosmic','drumscarlet']];
 READVENT_START=STAGES.length;
 for(const [baseId,ally] of PLAN){
  const base=CYCLONE_EVENTS.find(e=>e.id===baseId);if(!base)throw Error('readvent base '+baseId);
  const allyName=(typeof CYCLONE_ALLIES!=='undefined'&&CYCLONE_ALLIES[ally]?.name)||UNIT_NAMES[ally]||ally;
  const rules=STAGE_SPAWNS[base.index];
  const copy=f=>rules.map(r=>({...r,at:{...r.at},...(r.delay?{delay:[...r.delay]}:{}),...f(r)}));
  const first={id:'re-'+baseId+'-1',readvent:1,after:baseId,name:base.name+' 재강림',stage:base.stage+' (재강림)',boss:base.boss,reward:null,hp:base.hp,max:base.max,color:base.color,rules:copy(()=>({}))};
  const second={id:'re-'+baseId+'-2',readvent:2,after:first.id,third:ally,name:base.name+' 재강림',stage:base.stage+' (재강림 강화)',boss:base.boss,reward:null,hp:base.hp,max:base.max,color:base.color,rules:copy(r=>({mag:Math.round((r.mag||100)*READVENT_BOOST)}))};
  for(const e of [first,second]){CYCLONE_EVENTS.push(e);registerCycloneEvent(e);READVENT_EVENTS.push(e)}
  STAGES[first.index].special={xp:READVENT_XP};
  STAGES[first.index].desc=first.name+' · '+UNIT_NAMES[base.boss]+' · 레어·EX만 출격 · 클리어 시 경험치 '+READVENT_XP.toLocaleString('en-US')+' · 보스를 쓰러뜨려야 클리어';
  STAGES[second.index].desc=second.name+' 강화판 · '+UNIT_NAMES[base.boss]+' · 모든 적 배율 ×'+READVENT_BOOST+' · 클리어 시 '+allyName+' 3진 권한 · 보스를 쓰러뜨려야 클리어';
  READVENT_THIRD_GATE[ally]=second.index;
 }
 READVENT_END=STAGES.length;
 // cyclone-advents.js가 저장된 강림 기록을 읽을 때는 재강림 id를 몰라 걸러낸다. 등록한 뒤 다시 합친다.
 try{const v=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(v))for(const id of v)if(READVENT_EVENTS.some(e=>e.id===id)&&!cycloneClears.includes(id))cycloneClears.push(id)}catch{}
 // 열림: ①은 기본 강림 클리어, ②는 ① 클리어
 const openBefore=cycloneStageOpen;
 cycloneStageOpen=function(e){return e.readvent?cycloneClears.includes(e.after):openBefore(e)};
 // 출격 제한: ①은 레어·EX만
 const firstIdx=new Set(READVENT_EVENTS.filter(e=>e.readvent===1).map(e=>e.index));
 const allowedBefore=allyStageAllowed;
 allyStageAllowed=function(t,i=selectedStage){return firstIdx.has(i)?['ex','rare'].includes(gradeOf(t)):allowedBefore(t,i)};
 // 스페셜 탭: 강림 목록에 함께 보이고, 버튼 글자만 재강림용으로 바꾼다.
 const specialBefore=renderSpecialStages;
 renderSpecialStages=function(){specialBefore();for(const e of READVENT_EVENTS){
  const s=document.querySelector('.cyclone-event[data-cyclone="'+e.id+'"] button small');if(!s)continue;
  const prev=READVENT_EVENTS.find(x=>x.id===e.after),done=cycloneClears.includes(e.id);
  s.textContent=!cycloneStageOpen(e)?(prev?prev.stage:CYCLONE_EVENTS.find(x=>x.id===e.after)?.stage)+' 클리어 필요':e.readvent===1?(done?'클리어 ✓ · ':'')+'레어·EX만 · 경험치 '+READVENT_XP.toLocaleString('en-US'):(done?'3진 권한 획득 ✓':'적 배율 ×'+READVENT_BOOST+' · 3진 권한');
  const day=s.closest('.cyclone-event')?.querySelector('.day');if(day)day.textContent='재강림';
 }};
 renderSpecialStages();
})();
