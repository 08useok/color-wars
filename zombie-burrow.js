// 좀비 땅굴 이동 (v6.2.0, 원작 위키: "Zombies can burrow past Cat Units' hitboxes").
// 아군이 사거리에 들어오면 좀비가 땅속으로 파고들어(공격도 받지도 않음) 일정 거리를 지나쳐 가서 아군 뒤에서 다시 나타난다.
// 대부분 1번, 일부는 2번, 일부는 못 판다. 거리는 원작 단위(÷55 = 필드 %).
// 구현: 땅속에 있는 동안 그 좀비는 전투 계산 목록에서 잠시 빠지고(타깃·피해 대상이 되지 않음) 이 파일이 직접 움직인다.
const ZOMBIE_BURROW={
 zdog:{d:300,n:1},znache:{d:300,n:1},zguys:{d:350,n:1},zcroco:{d:250,n:1},zpeng:{d:300,n:1},
 zgory:{d:300,n:1},zseal:{d:300,n:1},zpigge:{d:250,n:1},zkangaroo:{d:350,n:1},zbear:{d:300,n:1},
 zbore:{d:1125,n:1},zdagshund:{d:900,n:1},zduche:{d:875,n:1},zthrillerz:{d:500,n:2}
 // 땅굴을 못 파는 좀비: 좀비 까르삔초(Zapy)·제비족(Zollow)·혹부리 낙타(Zamelle)·타조동호회
};
const BURROW_SCALE=55;// 원작 4,600 길이 필드 ≈ 이 게임 76~88%: 원작 55 단위 ≈ 필드 1%
for(const [id,b] of Object.entries(ZOMBIE_BURROW))if(data.units[id])data.units[id].burrow={dist:b.d/BURROW_SCALE,times:b.n};
{
 const st=document.createElement('style');
 st.textContent='.unit.burrowing{opacity:.28;filter:grayscale(.6) brightness(.7);pointer-events:none}.unit.burrowing .bar{opacity:0}';
 document.head.append(st);
}
const _zbUpdate=update;
update=function(dt){
 if(game&&game.units&&!game.ended){
  // 1) 사거리에 아군이 들어온 좀비는 땅굴을 판다
  for(const z of game.units){
   const b=z.ally||z.hp<=0||z.burrowing?null:z.stats?.burrow;
   if(!b||(z.burrowUsed||0)>=b.times||z.emerging||z.kbTime>0)continue;
   const rng=z.stats.engageRange??z.stats.range;
   const near=game.units.some(a=>a.ally&&a.hp>0&&!a.emerging&&a.x>=z.x-1&&a.x-z.x<=rng);
   if(near){z.burrowing=true;z.burrowLeft=b.dist;z.burrowUsed=(z.burrowUsed||0)+1;z.pendingAttack=null;z.el.classList.add('burrowing')}
  }
  // 2) 땅속에 있는 좀비는 이번 프레임 전투 계산에서 빼고 직접 움직인다
  var hidden=game.units.filter(u=>u.burrowing);
  if(hidden.length)game.units=game.units.filter(u=>!u.burrowing);
 }
 _zbUpdate.apply(this,arguments);
 if(typeof hidden!=='undefined'&&hidden.length&&game&&game.units){
  const end=data.bases.ally.frontX??data.bases.ally.x;
  for(const z of hidden){
   if(z.hp<=0){continue}
   const spd=z.stats?.speed||data.units[z.type].speed,step=Math.min(spd*dt,z.burrowLeft,Math.max(0,end-z.x));
   z.x+=step;z.burrowLeft-=step;z.el.style.left=`calc(${z.x}% - 21px)`;
   if(z.burrowLeft<=0.001||z.x>=end){z.burrowing=false;z.burrowLeft=0;z.el.classList.remove('burrowing');z.atkCd=Math.max(z.atkCd||0,.4)}
   if(!game.units.includes(z))game.units.push(z);
  }
 }
};
