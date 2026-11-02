// New independent rare variants. Source parent characters remain unchanged.
const CYCLONE81_ALLIES={
 explorermintcyan:{name:'탐사 민트시안',evolved:'유적 수호 민트시안',color:'#87e5d4',hp:8000,atk:280,interval:1.5,range:5,cost:180,cooldown:3,role:'고대종·메탈 맷집 · 저주 무효 고방',extra:{resistVs:['ancient','metal'],immune:{curse:true},survive:.5,knockbacks:1,windup:.2,attackDuration:.7},profile:'여성. 남성인 민트시안의 독립 아종인 유적 탐사원. 붓과 석판을 들고 고대종과 메탈의 공격을 받아낸다. 저주 무효로 맷집을 유지하지만 공격력은 낮고 다른 속성에는 피해 감소가 적용되지 않는다.'},
 anchorgrey:{name:'앵커 그레이',evolved:'심해 앵커 그레이',color:'#939ca9',hp:18000,atk:3200,interval:2.5,range:10,cost:850,cooldown:14,role:'메탈 크리티컬 · 에이리언 느리게 · 워프 무효',extra:{critChance:.2,critMult:2,statusVs:['alien'],slowChance:.5,slowDuration:3,immune:{warp:true},windup:.35,attackDuration:.9},profile:'여성. 남성인 그레이의 독립 아종인 닻 제작공. 닻 망치로 메탈에게 크리티컬을 노리고 에이리언을 느리게 한다. 워프에 밀려나지 않지만 개체 공격과 확률 발동 때문에 잡몹이 섞이면 지원이 필요하다.'}
};
for(const [id,s]of Object.entries(CYCLONE81_ALLIES)){
 CYCLONE_ALLIES[id]=s;for(const f of [1,2])CYCLONE_ATLASES[id+'_'+f]=CYCLONE_ALLIES81_ATLASES[id+'_'+f];
 registerCycloneAlly(id,s);NEW_ATLASES[id]={...CYCLONE_ALLIES81_ATLASES[id+'_1'],evolved:{...CYCLONE_ALLIES81_ATLASES[id+'_2']}};
 PROFILE_ART[id]=[1,2].map(f=>`assets/cyclone-allies-81-motion/${id}_${f}-profile.webp?v=2`);
 for(const a of [NEW_ATLASES[id],NEW_ATLASES[id].evolved])a.attackKeys=[[0,0],[s.extra.windup*30,1],[(s.extra.windup+.15)*30,2],[s.extra.attackDuration*30-2,6]];
 ACQUIRE_TEXT[id]=id==='explorermintcyan'?'태풍 제로 / 원시의 소용돌이 클리어 시 30%':'절망 신차원 / 진격의 워프홀 클리어 시 30%';
}
{const before=animateAtlas;animateAtlas=function(u){if(!CYCLONE81_ALLIES[u.type])return before(u);const a=u.stats.evolved?NEW_ATLASES[u.type].evolved:NEW_ATLASES[u.type],walk=a.walk,step=a.walkStep,still=u.c81X===u.x;u.c81X=u.x;try{if(u.hurtTime<=0&&u.attackTime<=0&&still){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u)}finally{a.walk=walk;a.walkStep=step;}};}
renderNewButtons();renderDeckButtons();renderTraining();
