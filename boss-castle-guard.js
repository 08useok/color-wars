// 7.1.2 보스 스테이지의 성: 성이 받는 피해가 남은 체력보다 커도, 보스가 아직 소환되지 않았다면 체력 1만 남기고 보스를 바로 소환한다.
//   (보스가 나온 뒤에는 성이 평소처럼 무너진다.) 사이클론은 7.1.1부터 한 걸음 더 나아가, 보스를 쓰러뜨릴 때까지 성이 1에서 멈춘다.
// 모든 스테이지 규칙을 건드리지 않도록 적 성 체력(data.bases.enemy.hp)에 쓰기 보호만 건다. 보스 등장 조건(성 체력 비율·시간)은 그대로다.
{
 const base=data.bases.enemy;let hp=base.hp;
 const cycloneBoss=()=>typeof CYCLONE_EVENTS!=='undefined'?CYCLONE_EVENTS.find(e=>e.index===selectedStage)?.boss:undefined;
 Object.defineProperty(base,'hp',{configurable:true,enumerable:true,get(){return hp},set(v){
  hp=v;
  if(hp>=1||!game||game.ended)return;
  const waiting=(game.spawnRules||[]).filter(r=>r.boss&&(r.spawned||0)<1);// 아직 소환되지 않은 보스 규칙
  const cyclone=!!cycloneBoss()&&!game.cyBossDown;
  if(!waiting.length&&!cyclone)return;
  hp=1;
  for(const r of waiting){r.triggered=true;r.clock=0}// 다음 프레임에 바로 소환(등장 지연·간격 무시)
  if(!waiting.length&&!game.cyHint){game.cyHint=true;$('#battleNotice').textContent='사이클론 보스를 쓰러뜨려야 성이 무너져요!';game.noticeTime=3}
 }});
 const guardHitbackBefore=startHitback;
 startHitback=function(u,...rest){if(u&&!u.ally&&u.hp<=0&&game&&u.type===cycloneBoss())game.cyBossDown=u.reviveAt===undefined;return guardHitbackBefore.call(this,u,...rest)};
}
