// 7.1: 사이클론 강림 5·6번째 — 메탈 사이클론("진격의 철부스러기")과 에이리언 코스믹 사이클론("진격의 블랙홀"), 보상 아군 실버 아종·스칼렛 아종.
// scripts/build-cyclone-advents2.cjs 로 만든다. 원작 자료: battlecats-db 메탈사이클론 073·스페이스사이클론 181, miraheze Attack on Titanium (Insane)·Black Hole Rising (Insane).
// cyclone-advents.js의 등록 함수(registerCycloneAlly/Boss/Event)를 쓰고, 저장된 클리어 번호가 밀리지 않도록 스테이지 목록 맨 끝(cosmos2.js 뒤)에 붙인다.
(function(){
 if(typeof registerCycloneEvent!=='function')return;
 // ── 보스 (HP·공격력·간격·넉백은 원작 100%, 사거리 ×0.034, 이동 ×0.67, 공격 간격은 사이클론 공통 5프레임)
 CYCLONE_BOSSES.metalcyclone={name:'메탈 사이클론',hp:777777,atk:77000,range:65,speed:2,knockbacks:10,traits:['metal']};
 CYCLONE_BOSSES.cosmiccyclone={name:'코스믹 사이클론',hp:1499999,atk:9999,range:240,speed:4,knockbacks:3,traits:['alien','floating'],atkDownChance:.1,atkDownPct:.9,atkDownDuration:10,strengthen:{at:.3,mult:2}};
 registerCycloneBoss('metalcyclone',CYCLONE_BOSSES.metalcyclone);registerCycloneBoss('cosmiccyclone',CYCLONE_BOSSES.cosmiccyclone);
 data.units.cosmiccyclone.reward=999;// 원작 처치 수입(메탈 사이클론 3,000, 코스믹 999)
 NEW_ATLASES.metalcyclone={scale:0.68,left:21,sheet:'assets/anim_metalcyclone.webp',walkStep:8/30,attackStep:2,walk:[[0,9,201,192,103,-4],[203,6,214,195,114,-7],[419,4,233,197,136,-8],[654,0,206,201,103,-15],[862,10,225,191,127,-6],[1089,5,197,196,100,-7],[1288,3,212,198,115,-7],[1502,3,235,198,136,-6],[1739,7,197,194,99,-3],[1938,6,227,195,127,-5],[2167,7,202,194,103,-8],[2371,7,215,194,115,-8],[2588,3,232,198,136,-8],[2822,8,196,193,99,-6],[3020,7,226,194,127,-5],[3248,6,206,195,103,-5],[3456,1,221,200,115,-7],[3679,8,236,193,137,-6],[0,206,204,197,102,-8],[206,206,225,197,127,-8],[433,207,197,196,98,-10],[632,208,220,195,121,-9],[854,210,235,193,136,-4],[1091,209,197,194,99,-2],[1290,208,223,195,127,-6],[1515,206,199,197,99,-7],[1716,211,211,192,114,-4],[1929,208,236,195,136,-8],[2167,207,219,196,116,-9],[2388,203,229,200,127,-9],[2619,209,202,194,103,-4],[2823,206,211,197,115,-7],[3036,207,232,196,136,-7],[3270,206,206,197,102,-7],[3478,207,233,196,128,-7],[3713,211,208,192,109,-7],[0,455,214,195,114,-8]],attack:[[216,405,243,245,110,-26]],hurt:[[461,435,220,215,103,-13]]};
 NEW_ATLASES.cosmiccyclone={scale:0.68,left:21,sheet:'assets/anim_cosmiccyclone.webp',walkStep:8/30,attackStep:2,walk:[[0,9,194,193,96,11],[196,7,197,195,98,7],[395,9,194,193,96,9],[591,0,201,202,99,5],[794,9,201,193,98,7],[997,6,201,196,100,7],[1200,4,195,198,97,7],[1397,4,200,198,99,10],[1599,6,199,196,99,9],[1800,4,199,198,95,6],[2001,2,198,200,96,2],[2201,7,196,195,96,6],[2399,5,196,197,99,6],[2597,9,195,193,97,8],[2794,8,197,194,99,12],[2993,4,195,198,96,6],[3190,4,201,198,98,9],[3393,6,198,196,99,7],[3593,5,198,197,97,7],[3793,5,194,197,97,6],[0,262,196,197,97,4],[198,265,200,194,97,9],[400,261,201,198,97,6],[603,265,204,194,99,13],[809,265,197,194,97,10],[1008,262,195,197,95,8],[1205,266,193,193,96,9],[1400,261,197,198,97,4],[1599,257,201,202,96,3],[1802,259,196,200,98,3],[2000,265,199,194,98,10],[2201,262,197,197,101,8],[2400,263,193,196,97,8],[2595,264,197,195,97,8],[2794,260,197,199,96,4],[2993,263,199,196,96,5],[3194,262,197,197,98,6]],attack:[[3393,204,252,255,115,-22]],hurt:[[3647,248,222,211,109,2]]};
 ENEMY_TEXT.metalcyclone='메탈 사이클론. 쉬지 않고 범위 공격을 퍼붓는 메탈 속성이다. 크리티컬이 아니면 피해를 1밖에 받지 않고 체력이 777,777이지만 넉백이 10번이라, 멀리 밀어 놓고 크리티컬로 잡아야 한다.';
 ENEMY_TEXT.cosmiccyclone='코스믹 사이클론. 에이리언·떠 있는 적. 사거리가 사이클론 중 긴 편이고, 10% 확률로 맞은 아군의 공격력을 10초간 10%로 낮추며 체력 30% 이하에서는 공격력이 2배가 된다. 에이리언·떠 있는 적 대응 아군과 멀리서 멈추게 하는 아군이 필요하다.';
 // ── 보상 아군(레어, 기존 사이클론 아군과 같은 형식). 그림은 부모 색 아군(실버·스칼렛)을 색만 바꾼 임시 그림이다.
 CYCLONE_ALLIES.hulasilver={name:'훌라 실버',evolved:'훌라 마스터 실버',color:'#c4cbd6',hp:21000,atk:1500,interval:3,range:8,cost:700,cooldown:12,role:'메탈 정지 지원',extra:{statusVs:['metal'],freezeChance:.6,freezeDuration:1.5},profile:'실버의 독립 아종. 몸에 훌라후프를 돌리다 보면 철부스러기가 따라 돈다고 믿는 운동 마니아. 메탈 적을 후프로 휘감아 잠시 멈추게 한다.'};
 CYCLONE_ALLIES.drumscarlet={name:'군악 스칼렛',evolved:'군악대장 스칼렛',color:'#d6402f',hp:18000,atk:1400,interval:2.8,range:10,cost:650,cooldown:10,role:'메탈 약화 지원',extra:{statusVs:['metal'],atkDownChance:.4,atkDownPct:.5,atkDownDuration:6},profile:'스칼렛의 독립 아종. 박자를 한 치도 틀리지 않는 군악대 북잡이. 힘찬 북소리로 메탈 적의 공격력을 반으로 떨어뜨린다.'};
 for(const [id,parent,tint] of [['hulasilver','silver','saturate(.7) brightness(1.12)'],['drumscarlet','scarlet','hue-rotate(-8deg) saturate(1.25)']]){
  registerCycloneAlly(id,CYCLONE_ALLIES[id]);
  const base=NEW_ATLASES[parent];
  if(base){NEW_ATLASES[id]={...base,tint,...(base.evolved?{evolved:{...base.evolved,tint}}:{})};PROFILE_ART[id]=PROFILE_ART[parent]||PROFILE_ART[id];if(typeof PROFILE_ART_TRUE!=='undefined'&&PROFILE_ART_TRUE[parent])PROFILE_ART_TRUE[id]=PROFILE_ART_TRUE[parent]}
 }
 // ── 강림 스테이지(원작 출현표를 30fps 프레임으로 환산)
 const events=[
  {id:'metal',chance:.3,name:'달콤한 아이러니',stage:'진격의 철부스러기',boss:'metalcyclone',reward:'hulasilver',chapter:3,hp:400000,max:2,color:'#8c96a6',rules:[
   csp('supermetalhippo',100,0,100,7000,2000,2400),csp('metalseal',100,1,100,6000),csp('metalcyborg',100,1,100,5000),csp('supermetalhippo',100,1,100,4000),csp('metalhippo',100,1,100,3000),csp('metalcyclone',100,1,90,0,0,0,true)]},
  {id:'cosmic',chance:.3,name:'절망의 차원',stage:'진격의 블랙홀',boss:'cosmiccyclone',reward:'drumscarlet',requires:FUTURE3_END-1,requireText:'미래편 3장 클리어 필요',hp:999000,max:8,color:'#2a2150',rules:[
   csp('guys',100,0,100,0,160,500),csp('shibalien',200,10,100,3000,120,480),csp('shibalien',400,10,100,4000,120,480),csp('shibalien',600,10,100,5000,120,480),csp('shibalien',800,10,100,6400,120,480),csp('shibalien',1000,10,100,8400,120,480),csp('shibalien',1200,0,100,10800,2,180),csp('cosmiccyclone',100,1,100,1000,0,0,true)]}
 ];
 for(const e of events){CYCLONE_EVENTS.push(e);registerCycloneEvent(e)}
 // ── 해금: chapter = 세계편 N장 클리어, requires = 지정한 스테이지 클리어(미래편 3장 달)
 cycloneStageOpen=function(e){return e.requires!==undefined?cleared.includes(e.requires):cleared.includes(CHAPTER1_LEN*e.chapter-1)};
 const specialBefore=renderSpecialStages;
 renderSpecialStages=function(){specialBefore();for(const e of events){if(!e.requireText)continue;const s=document.querySelector('.cyclone-event[data-cyclone="'+e.id+'"] button small');if(s&&!cycloneStageOpen(e))s.textContent=e.requireText}};
 // 이전 파일이 불러올 때 아직 몰랐던 새 강림의 클리어 기록을 되살린다.
 try{const v=JSON.parse(localStorage.getItem('red-battle-cyclone-v1')||'[]');if(Array.isArray(v))cycloneClears=[...new Set([...cycloneClears,...v.filter(id=>CYCLONE_EVENTS.some(e=>e.id===id))])]}catch{}
 renderNewButtons();renderDeckButtons();renderTraining();renderSpecialStages();
})();
