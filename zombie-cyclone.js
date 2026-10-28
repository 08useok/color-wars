// Original enemy 294 / DB296, Rolling Dead s01122-01. Append-only stage registration.
CYCLONE_BOSSES.zyclone={name:'좀비 사이클론',hp:1222222,atk:44444,range:120,speed:4,knockbacks:4,traits:['zombie'],reviveCount:Infinity,reviveDelay:4,reviveHp:1};
registerCycloneBoss('zyclone',CYCLONE_BOSSES.zyclone);
NEW_ATLASES.zyclone=ZYCLONE_ORIGINAL_ATLAS;
ENEMY_TEXT.zyclone='좀비 사이클론. 떠 있는 적이 아닌 좀비 속성이다. 5프레임마다 범위 공격하며, 쓰러져도 4초 뒤 체력 100%로 무한 부활한다. 땅굴은 파지 않는다. 좀비 킬러로 마지막 타격을 넣어야 부활을 막고 보스를 완전히 처치할 수 있다.';
const ZYCLONE_EVENT={id:'zombie',name:'롤링 데드',stage:'윤회의 소용돌이',boss:'zyclone',reward:null,chapter:3,hp:1000000,max:10,color:'#8b719b',rules:[
 csp('zoge',100,2,100,200,200,600),csp('zyclone',100,1,100,600,0,0,true),
 csp('zoge',100,0,100,800,200,400),csp('zomboe',100,8,100,1600,1200,1400),
 csp('zigge',100,8,100,3200,1000,1200),csp('zory',100,8,100,4800,800,1000),
 csp('zirzeal',100,8,100,6400,600,800),csp('zangroo',100,8,100,8000,400,600)
]};
// Reward character is being designed; do not grant nonexistent ownership or substitute an item.
CYCLONE_EVENTS.push(ZYCLONE_EVENT);registerCycloneEvent(ZYCLONE_EVENT);
try{const saved=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(saved)&&saved.includes('zombie')&&!cycloneClears.includes('zombie'))cycloneClears.push('zombie');}catch{}
renderSpecialStages();
