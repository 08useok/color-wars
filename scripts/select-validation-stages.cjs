const fs=require('fs'),path=require('path');
module.exports=function selectStages(tasks,stages,spawns,root){
 const previous=JSON.parse(fs.readFileSync(path.join(root,'docs/simulations/all-stage-validation-2026-10-08.json'),'utf8'));
 const lookup=new Map(previous.rows.map(r=>[`${r.i}:${r.crown}`,r]));
 const retained=[],removed=[],representatives=new Set(),seenEnemies=new Set();
 for(const task of tasks)for(const rule of spawns[task.i]||[]){const key=`${rule.type}:${task.crown}`;if(!seenEnemies.has(key)){seenEnemies.add(key);representatives.add(`${task.i}:${task.crown}`);}}
 for(const task of tasks){
  const row=lookup.get(`${task.i}:${task.crown}`),stage=stages[task.i],rules=spawns[task.i]||[];
  const representative=representatives.has(`${task.i}:${task.crown}`);
  const protectedStage=rules.some(r=>r.boss)||stage.special||stage.ribbon||stage.chartAdvent||representative;
  const easy=row&&row.win&&!row.timeout&&row.seconds<=60&&row.allyHp>=18000;
  if(easy&&!protectedStage)removed.push({...task,reason:'60초 이내 승리·아군 성 무피해·보스/이벤트 아님'});
  else retained.push({...task,reason:representative?'적 종류별 대표 조건':protectedStage?'보스 또는 이벤트':!row?'신규 조건':!row.win?'패배 또는 시간 초과':row.allyHp<18000?'아군 성 피해':'60초 초과'});
 }
 const result={thresholdSeconds:60,initialBaseHp:18000,original:tasks.length,retained:retained.length,removed:removed.length,conditions:retained,excluded:removed};
 if(retained.length+removed.length!==tasks.length)throw Error('Selection coverage mismatch');
 for(const row of previous.rows.filter(r=>!r.win))if(!retained.some(t=>t.i===row.i&&t.crown===row.crown))throw Error('Failed stage excluded');
 fs.writeFileSync(path.join(root,'docs/simulations/validation-stage-selection-2026-10-08.json'),JSON.stringify(result,null,2));
 let md=`# 반복 검증 스테이지 선정\n\n전체 ${tasks.length}개 조건 중 ${removed.length}개를 제외하고 **${retained.length}개**를 남겼다. 이전 고정 덱 테스트에서 60초 이내 승리하고 아군 성 HP가 18,000으로 유지된 조건을 쉬운 조건으로 분류했다. 적 종류별 대표 조건, 보스·이벤트, 패배·시간 초과, 성 피해, 60초 초과, 신규 조건은 유지했다. 게임 스테이지를 삭제하지 않는다.\n\n이 분류는 Lv.30·2진·경제 강화 최대·기존 고정 덱의 결과에 의존한다. 다른 덱이나 캐릭터가 이 조건에서도 쉽게 이긴다는 뜻은 아니다. 시간 초과 기준은 게임 내 300초(일반 속도 실제 5분, 2배속 실제 2분 30초)다. 전투 규칙·성장·출현을 크게 변경하면 전체 검증을 다시 수행해야 한다.\n\n|ID|스테이지|성|유지 사유|\n|---:|---|---:|---|\n`;
 for(const t of retained)md+=`|${t.i}|${t.name}|${t.crown}|${t.reason}|\n`;
 fs.writeFileSync(path.join(root,'docs/validation-stage-selection-2026-10-08.md'),md);
 return result;
};
