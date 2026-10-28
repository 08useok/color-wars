// Zombie-cyclone reward: an independent female Dandelion variant.
CYCLONE_ALLIES.cheerdandelion={grade:'sr',name:'응원단 민들레',evolved:'치어리더 민들레',color:'#f0e130',hp:5714,atk:7143,interval:8,range:32,cost:1350,cooldown:33,role:'메탈 우선 · 확정 크리티컬 딜러',extra:{critChance:1,critMult:2,metalKiller:1,metalPriority:true,knockbacks:4,windup:1.6,attackDuration:2.2,attackClass:'개체',flatCost:true},profile:'여성. 민들레의 독립 아종. 하얀 홀씨 폼폼을 흔드는 응원단원. 사거리 안의 메탈 적을 먼저 겨냥해 한 마리씩 확실히 처치한다. 긴 준비 동작 동안 앞줄의 보호가 필요하다.'};
registerCycloneAlly('cheerdandelion',CYCLONE_ALLIES.cheerdandelion);
NEW_ATLASES.cheerdandelion={...CHEER_DANDELION_ATLASES[1],evolved:{...CHEER_DANDELION_ATLASES[2]}};
PROFILE_ART.cheerdandelion=[1,2].map(f=>`assets/cheer-dandelion-motion/cheerdandelion_${f}-profile.webp?v=1`);
EVOLUTION_TEXT.cheerdandelion='체력·공격력 15% 증가 · 사거리·확정 크리티컬·메탈 우선 유지';
EVO_BODY_H.cheerdandelion=90;
// Prefer an eligible metal only inside the current range. Otherwise keep normal targeting.
function metalPriorityTarget(u){
 if(!u.ally||!u.stats?.metalPriority)return null;
 const dir=-1,range=u.stats.zoneMax??u.stats.range;
 return game.units.filter(v=>!v.ally&&v.hp>0&&v.kbTime<=0&&!v.emerging&&hasTrait(v.stats||data.units[v.type],'metal')&&dir*(v.x-u.x)>=-1&&Math.abs(v.x-u.x)<=range).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0]||null;
}
{const before=target;target=function(u){return metalPriorityTarget(u)||before(u);};}
{const before=animateAtlas;animateAtlas=function(u){
 if(u.type!=='cheerdandelion')return before(u);
 const a=u.stats?.evolved?NEW_ATLASES.cheerdandelion.evolved:NEW_ATLASES.cheerdandelion,stationary=u.cheerLastX===u.x;u.cheerLastX=u.x;const walk=a.walk,step=a.walkStep;
 try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{a.walk=walk;a.walkStep=step;}
};}
ZYCLONE_EVENT.reward='cheerdandelion';ZYCLONE_EVENT.chance=.3;
const cheerStage=STAGES[ZYCLONE_EVENT.index];
cheerStage.special={item:'cheerdandelion',itemName:'응원단 민들레',count:1,chance:.3,xp:3800};
cheerStage.desc='롤링 데드 · 좀비 사이클론 · 슈퍼 레어 응원단 민들레 30% 획득 · 보스를 쓰러뜨려야 클리어';
ACQUIRE_TEXT.cheerdandelion='롤링 데드 / 윤회의 소용돌이 클리어 시 30% 획득';
{const before=specialItemText;specialItemText=function(item,n){return item==='cheerdandelion'?'슈퍼 레어 응원단 민들레 획득!':before(item,n);};}
// Early clears had XP only; recover the new reward once without resetting progress.
if(localStorage.getItem('red-battle-cheer-reward-migration-v1')!=='done'){
 if(cycloneClears.includes('zombie')&&!gachaOwns('cheerdandelion')){gacha.owned.push('cheerdandelion');saveGacha();}
 localStorage.setItem('red-battle-cheer-reward-migration-v1','done');
}
renderNewButtons();renderDeckButtons();renderTraining();renderSpecialStages();
