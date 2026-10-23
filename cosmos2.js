// 우주편 2장(chapter 9) 등록: 스테이지 48개와 출현표를 스테이지 목록 맨 끝에 붙인다(저장된 클리어 번호가 밀리지 않도록 다른 모든 스테이지 뒤).
// 데이터는 cosmos2-data.js(scripts/build-cosmos2.cjs), 신규 적 4종은 cosmos2-enemies.js. 잠금·탭·억제기·보상은 game.js·catfruit.js·gacha.js가 chapter 9를 처리한다.
// 맨 끝에 붙이려면 스테이지를 더하는 다른 스크립트(개다래 축제·사이클론·레전드 40장 등)보다 나중에 불러와야 한다.
(function(){
 if(typeof COSMOS2_DATA==='undefined'||COSMOS2_START<1e9)return;
 COSMOS2_START=STAGES.length;
 COSMOS2_DATA.forEach((t,k)=>{
  STAGES.push({name:t.name,flag:t.flag,hp:t.hp,gap:4,wave:0,...COSMOS_BG[t.bg],desc:t.desc,chapter:9,future:true,maxEnemies:t.max,xp:t.xp*FUTURE_XP_SCALE});
  STAGE_SPAWNS[COSMOS2_START+k]=t.rules;
 });
 COSMOS2_END=STAGES.length;
 ALIEN_SUPPRESSORS5.push(COSMOS2_START+23,COSMOS2_END-1);// 과자 행성(24번)·빅뱅(48번), 1장과 같은 위치
 // 저장된 클리어 번호는 game.js가 먼저 읽는데, 그때는 2장 범위(COSMOS2_START/END)를 몰라 2장 클리어를 전부 걸러낸다(새로고침마다 사라지고 다음 저장 때 지워졌다). 범위가 정해진 뒤 2장 번호만 다시 합친다.
 try{const saved=JSON.parse(localStorage.getItem('red-battle-progress-v1')||'[]');if(Array.isArray(saved))for(const x of saved)if(Number.isInteger(x)&&x>=COSMOS2_START&&x<COSMOS2_END&&!cleared.includes(x))cleared.push(x)}catch{}
})();
