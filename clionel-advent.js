// Original stats and spawn table: battlecats-db.com/enemy/234.html and stage/s01095-01.html.
// Append only: existing stage IDs and chapter clear records stay unchanged.
data.units.clionel={hp:2400000,atk:32000,interval:145/30,speed:4*.67,range:600*.034,
 zoneMin:400*.034,zoneMax:1200*.034,area:true,trait:'angel',knockbacks:4,
 windup:71/30,attackDuration:145/30,slowChance:.3,slowDuration:4,reward:5000};
UNIT_NAMES.clionel='단죄천사 쿠오리넬';ENEMY_ORDER.push('clionel');NEW_ATLASES.clionel=CLIONEL_ATLAS;
ENEMY_TEXT.clionel='단죄천사 쿠오리넬. 천사 속성의 원거리 범위 보스. 사거리 600에서 400~1,200 구간을 공격하고, 30% 확률로 4초간 느리게 한다. 안쪽 사각지대로 빠르게 파고드는 아군과 천사 대응 아군으로 공략하자.';
const CLIONEL_EVENT={id:'clionel',chance:.3,name:'단죄천사 쿠오리넬 강림',stage:'냥코 보완 계획',
 boss:'clionel',reward:'marchyellow',requires:FUTURE_END-1,requireText:'미래편 1장 클리어 필요',
 hp:750000,max:12,color:'#d4bf75',rules:[
 csp('clionel',100,1,100,300,0,0,true),
 csp('strayguy',100,0,100,500,200,400),csp('strayguy',100,30,100,600,100,150),
 csp('sleipnir',100,1,100,1000),
 csp('gonzales',200,5,100,2000,2000),csp('gonzales',200,4,100,4100,2000),csp('gonzales',200,3,100,6200,2000),
 csp('sleipnir',100,1,100,3000),csp('strayguy',100,0,100,5000,300,600),
 csp('sleipnir',100,1,100,6000),csp('sleipnir',100,1,100,10000),
 csp('angelfanboy',100,1,100,12000)]}; // As in other legend imports, omit the 900s signboard timer enemy.
CYCLONE_EVENTS.push(CLIONEL_EVENT);registerCycloneEvent(CLIONEL_EVENT);
STAGES[CLIONEL_EVENT.index].flag='⚖️';
STAGES[CLIONEL_EVENT.index].desc='단죄천사 쿠오리넬 강림 · 천사 원거리 범위 · 슈퍼 레어 행진 옐로 30% 획득 · 보스 처치 필요';
ACQUIRE_TEXT.marchyellow='단죄천사 쿠오리넬 강림 / 냥코 보완 계획 클리어 시 30% 획득';
try{
 const saved=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');
 if(Array.isArray(saved)&&saved.includes('clionel')&&!cycloneClears.includes('clionel'))cycloneClears.push('clionel');
}catch{}
{const before=renderSpecialStages;renderSpecialStages=function(){before();const row=document.querySelector('.cyclone-event[data-cyclone="clionel"]');if(row){const title=row.querySelector('.special-label strong');if(title)title.textContent='⚖️ '+CLIONEL_EVENT.name;const label=row.querySelector('button small');if(label&&!cycloneStageOpen(CLIONEL_EVENT))label.textContent=CLIONEL_EVENT.requireText;}};}
renderSpecialStages();
