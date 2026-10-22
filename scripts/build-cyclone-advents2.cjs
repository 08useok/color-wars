// 7.1 사이클론 강림 2종(메탈·에이리언)과 보상 아군 2명을 cyclone-advents2.js로 만든다.
// 모션은 원작 애니메이션 데이터를 bc-enemy-anim 스킬(bake.py)로 구운 결과(reference-sheets/cyclone-71/atlas/*.atlas.json + assets/anim_*.webp)를 쓴다.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const atlas=id=>{const a=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/cyclone-71/atlas',id+'.atlas.json'),'utf8')),f=x=>JSON.stringify(x);
 return `{scale:0.68,left:21,sheet:'assets/anim_${id}.webp',walkStep:8/30,attackStep:2,walk:${f(a.walk)},attack:${f(a.attack)},hurt:${f(a.hurt)}}`};
const code=`// 7.1: 사이클론 강림 5·6번째 — 메탈 사이클론("진격의 철부스러기")과 에이리언 코스믹 사이클론("진격의 블랙홀"), 보상 아군 실버 아종·스칼렛 아종.
// scripts/build-cyclone-advents2.cjs 로 만든다. 원작 자료: battlecats-db 메탈사이클론 073·스페이스사이클론 181, miraheze Attack on Titanium (Insane)·Black Hole Rising (Insane).
// cyclone-advents.js의 등록 함수(registerCycloneAlly/Boss/Event)를 쓰고, 저장된 클리어 번호가 밀리지 않도록 스테이지 목록 맨 끝(cosmos2.js 뒤)에 붙인다.
(function(){
 if(typeof registerCycloneEvent!=='function')return;
 // ── 보스 (HP·공격력·간격·넉백은 원작 100%, 사거리 ×0.034, 이동 ×0.67, 공격 간격은 사이클론 공통 5프레임)
 CYCLONE_BOSSES.metalcyclone={name:'메탈 사이클론',hp:777777,atk:77000,range:65,speed:2,knockbacks:10,traits:['metal']};
 CYCLONE_BOSSES.cosmiccyclone={name:'코스믹 사이클론',hp:1499999,atk:9999,range:240,speed:4,knockbacks:3,traits:['alien','floating'],atkDownChance:.1,atkDownPct:.9,atkDownDuration:10,strengthen:{at:.3,mult:2}};
 registerCycloneBoss('metalcyclone',CYCLONE_BOSSES.metalcyclone);registerCycloneBoss('cosmiccyclone',CYCLONE_BOSSES.cosmiccyclone);
 data.units.cosmiccyclone.reward=999;// 원작 처치 수입(메탈 사이클론 3,000, 코스믹 999)
 NEW_ATLASES.metalcyclone=${atlas('metalcyclone')};
 NEW_ATLASES.cosmiccyclone=${atlas('cosmiccyclone')};
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
`;
fs.writeFileSync(path.join(root,'cyclone-advents2.js'),code);
console.log('cyclone-advents2.js',Math.round(code.length/1024)+'KB');
