// 8.6 append-only original re-advent. Sources: battlecats-db s01247-01/02.
const PRIMEVAL86_ID='explorermintcyan';
const PRIMEVAL86_EVENTS=[
 {id:'re-primeval-1',readvent:1,after:'primeval',name:'속편 • 제0호 태풍',stage:'시조의 오래된 소용돌이',boss:'primevalcyclone',reward:null,hp:1000000,max:10,color:'#6e8157',rules:[
  csp('primevalcyclone',100,1,100,1000,0,0,true),csp('squirrel',4000,6,100,60,90,150),csp('inglis',100,1,100,300),csp('lilbunbun',1000,0,100,2300,2000),csp('gorydark',300,0,100,2800,2000)]},
 {id:'re-primeval-2',readvent:2,after:'re-primeval-1',third:PRIMEVAL86_ID,name:'속편 • 제0호 태풍',stage:'절멸의 오래된 소용돌이',boss:'primevalcyclone',reward:null,hp:1250000,max:12,color:'#738a67',rules:[
  csp('squirrel',4000,0,100,500,150,300),csp('gabriel',500,10,100,500,150,300),csp('ancientdog',100,5,100,1000,150,300),csp('starpeng',2500,3,100,1500,200,300),csp('hiyokoel',250,5,99,0,900),csp('captainmogu',2500,3,99,0,1000,1200),csp('sleipnir',250,1,99,0),csp('primevalcyclone',100,1,99,0,0,0,true)]}
];
for(const [n,e]of PRIMEVAL86_EVENTS.entries()){
 CYCLONE_EVENTS.push(e);registerCycloneEvent(e);READVENT_EVENTS.push(e);
 const s=STAGES[e.index];s.special={xp:n?3800:0};s.originalSchedule=true;s.source='https://battlecats-db.com/stage/s01247-0'+(n+1)+'.html';s.originalWidth=n?5000:6000;
 s.desc=e.name+' · '+e.stage+' · 고대 사이클론 1배율 · '+(n?'클리어 시 탐사 민트시안 3진 해금':'생산 비용 900원 이하 · 첫 클리어 경험치 '+READVENT_XP.toLocaleString('en-US'))+' · 보스 격파 필요';
}
READVENT_THIRD_GATE[PRIMEVAL86_ID]=PRIMEVAL86_EVENTS[1].index;
try{const saved=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(saved))for(const e of PRIMEVAL86_EVENTS)if(saved.includes(e.id)&&!cycloneClears.includes(e.id))cycloneClears.push(e.id);}catch{}
// Check canonical chapter-2/3 price, even when called from another chapter.
function primeval86Cost(id){const s=unitStats(id);return s.cost*(chapterOf(selectedStage)===1&&!data.units[id].flatCost?1.5:1);}
{const before=allyStageAllowed;allyStageAllowed=function(id,i=selectedStage){return i===PRIMEVAL86_EVENTS[0].index?before(id,i)&&primeval86Cost(id)<=900:before(id,i);};}
{const before=finish;finish=function(win){const fresh=!game.ended,e=PRIMEVAL86_EVENTS.find(e=>e.index===selectedStage),first=e&&!cycloneClears.includes(e.id);before.apply(this,arguments);if(!fresh||!win||!e)return;
 if(e.readvent===1){if(first){const xp=studyXP(READVENT_XP)*(boostActive('doctor')?2:1);training.xp+=xp;saveTraining();$('#resultDetail').textContent='첫 클리어 보상 +'+xp.toLocaleString('en-US')+' XP · 절멸의 오래된 소용돌이가 열렸어요!';}else $('#resultDetail').textContent='클리어! 첫 클리어 경험치 보상은 이미 받았어요.';}
 if(e.readvent===2){$('#resultDetail').textContent='탐사 민트시안 3진 해금! 강화 화면에서 진화할 수 있어요. · 보상 +'+(studyXP(3800)*(boostActive('doctor')?2:1)).toLocaleString('en-US')+' XP';renderTraining();}
};}
{const before=renderSpecialStages;renderSpecialStages=function(){const r=before.apply(this,arguments);for(const e of PRIMEVAL86_EVENTS){const small=document.querySelector('.cyclone-event[data-cyclone="'+e.id+'"] button small');if(!small)continue;small.textContent=!cycloneStageOpen(e)?(e.readvent===1?'원시의 소용돌이':'시조의 오래된 소용돌이')+' 클리어 필요':e.readvent===1?(cycloneClears.includes(e.id)?'클리어 ✓ · ':'')+'900원 이하 · 첫 클리어 XP '+READVENT_XP.toLocaleString('en-US'):(cycloneClears.includes(e.id)?'3진 해금 완료 ✓':'고대·천사·스타 에이리언 · 탐사 민트시안 3진');}return r;};}
// Approved third form: exactly 2x evolved HP/ATK, guaranteed one-time survive.
TRUE_NAME[PRIMEVAL86_ID]='고대 유적 수호 민트시안';TRUE_FORM_HP_MULT[PRIMEVAL86_ID]=2;TRUE_FORM_ATK_MULT[PRIMEVAL86_ID]=2;TRUE_FORM_BONUS[PRIMEVAL86_ID]={survive:1,surviveOnce:true};
if(typeof EXPLORER_MINT86_ATLAS!=='undefined'){NEW_ATLASES[PRIMEVAL86_ID].true=EXPLORER_MINT86_ATLAS;PROFILE_ART_TRUE[PRIMEVAL86_ID]='assets/explorermintcyan-3-motion/profile.png?v=1';}
try{const saved=JSON.parse(localStorage.getItem('red-battle-trueform-v1')||'[]');if(Array.isArray(saved)&&saved.includes(PRIMEVAL86_ID)&&!trueForms.includes(PRIMEVAL86_ID))trueForms.push(PRIMEVAL86_ID);}catch{}
{const before=trueFormOpen;trueFormOpen=function(id){return id===PRIMEVAL86_ID?readventCleared(id):before(id);};}
{const before=costText;costText=function(id){return id===PRIMEVAL86_ID&&!trueFormOpen(id)?'절멸의 오래된 소용돌이 클리어 필요':before(id);};}
{const before=unitDisplayName;unitDisplayName=function(id,third,evolved){return id===PRIMEVAL86_ID&&third?TRUE_NAME[id]:before(id,third,evolved);};}
{const before=animateAtlas;animateAtlas=function(u){if(u.type!==PRIMEVAL86_ID||!u.stats?.trueForm||!NEW_ATLASES[u.type].true)return before(u);const a=NEW_ATLASES[u.type],old=a.evolved;try{a.evolved=a.true;return before(u);}finally{a.evolved=old;}};}
renderSpecialStages();renderTraining();renderNewButtons();renderDeckButtons();
