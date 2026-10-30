// Male Rainbow variant: Hurricane reward, short-range rapid area critical attacks.
CYCLONE_ALLIES.spintoprainbow={name:'팽이 레인보우',evolved:'자이로 레인보우',color:'#c38cff',hp:9000,atk:180,interval:.75,range:6,cost:650,cooldown:9,
 role:'근거리 양산 · 범위 3연타 · 크리티컬',
 extra:{area:true,attackClass:'범위',speed:7,critChance:.15,critMult:2,strikes:true,windup:.12,attackDuration:.65,hits:[{at:.12,share:1/3},{at:.30,share:1/3},{at:.48,share:1/3}]},
 profile:'남성. 레인보우의 독립 아종인 팽이 공연가. 무지개 팽이를 굴려 가까운 적 무리를 빠르게 세 번 타격한다. 각 타격은 15% 확률로 크리티컬이 된다. 짧은 사거리 때문에 고방이 필요하고, 크리티컬이 불발하면 메탈에게 큰 피해를 주기 어렵다.'};
registerCycloneAlly('spintoprainbow',CYCLONE_ALLIES.spintoprainbow);
NEW_ATLASES.spintoprainbow={...SPINTOP_RAINBOW_ATLASES.spintoprainbow_1,evolved:{...SPINTOP_RAINBOW_ATLASES.spintoprainbow_2}};
for(const a of [NEW_ATLASES.spintoprainbow,NEW_ATLASES.spintoprainbow.evolved])a.attackKeys=[[0,0],[3.6,1],[9,2],[14.4,3],[16.5,4],[18,5],[19.5,6]];
PROFILE_ART.spintoprainbow=[1,2].map(f=>'assets/spintop-rainbow-motion/spintoprainbow_'+f+'-profile.webp?v=1');
EVOLUTION_TEXT.spintoprainbow='체력·공격력 15% 증가 · 범위 3연타·크리티컬 유지';
PROFILE_TEXT_EVOLVED.spintoprainbow='자이로 레인보우. 짧은 머리와 공연복을 갖춘 남성 팽이 공연가. 체력과 공격력이 15% 늘고, 빠른 범위 3연타와 크리티컬 확률은 유지한다.';
HURRICANE73_EVENT.reward='spintoprainbow';HURRICANE73_EVENT.chance=.3;
const SPINTOP_HURRICANE_STAGE=STAGES[HURRICANE73_EVENT.index];
SPINTOP_HURRICANE_STAGE.special={item:'spintoprainbow',itemName:'팽이 레인보우',count:1,chance:.3,xp:3800};
SPINTOP_HURRICANE_STAGE.desc='긴급 폭풍 경보 · 허리케인 사이클론 · 레어 팽이 레인보우 30% 획득 · 보스를 쓰러뜨려야 클리어';
ACQUIRE_TEXT.spintoprainbow='긴급 폭풍 경보 / 진격의 폭풍 소용돌이 클리어 시 30% 획득';
// Keep the XP-only event's first/replay reward behavior after adding its ally drop.
{const before=finish;finish=function(win){
 const fresh=!game.ended,here=selectedStage===HURRICANE73_EVENT.index,sp=SPINTOP_HURRICANE_STAGE.special,xp=sp.xp;
 try{if(here&&fresh&&win)sp.xp=cleared.includes(HURRICANE73_EVENT.index)?1900:3800;const result=before.apply(this,arguments);
  if(here&&fresh&&win&&game.ended&&!cleared.includes(HURRICANE73_EVENT.index)){cleared.push(HURRICANE73_EVENT.index);saveProgress();}
  return result;
 }finally{sp.xp=xp;}
};}
// Mark even a not-yet-cleared account once: future failed drops must not become free rewards on reload.
const SPINTOP_MIGRATION_KEY='red-battle-spintop-rainbow-migration-v1';
try{if(localStorage.getItem(SPINTOP_MIGRATION_KEY)!=='done'){
 if(cycloneClears.includes('hurricane')&&!gachaOwns('spintoprainbow')){gacha.owned.push('spintoprainbow');saveGacha();}
 localStorage.setItem(SPINTOP_MIGRATION_KEY,'done');
}}catch{}
{const before=animateAtlas;animateAtlas=function(u){
 if(u.type!=='spintoprainbow')return before(u);const a=u.stats?.evolved?NEW_ATLASES.spintoprainbow.evolved:NEW_ATLASES.spintoprainbow,stationary=u.spinLastX===u.x;u.spinLastX=u.x;const walk=a.walk,step=a.walkStep;
 try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u)}finally{a.walk=walk;a.walkStep=step;}
};}
renderNewButtons();renderDeckButtons();renderTraining();renderSpecialStages();
