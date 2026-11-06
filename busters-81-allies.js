// 8.2 신규 울슈레 2명(92 애프리·93 메리): 7.5·8.0 바스터즈와 같은 소유·뽑기 경로(registerBuster75)를 쓴다. 초안은
// docs/기획-시험/신규-울슈레-92-93-초안-2026-11-03.md. 전용 그림(BUSTERS_81_MOTION_ATLASES, 7.5와 같은 형식)이 없으면 등록하지 않아
// 덱·뽑기·도감에 나오지 않는다(그림이 오면 이 파일이 자동으로 연결한다). 반드시 ancient-curse.js(고대종 속성)와 ally-range-80.js 뒤에 불러온다.
//   애프리: 고대종·좀비 범위. 확정 저주 4초(정지 3.5초보다 길어 연속 적중 시 계속 걸려 있음), 저주 무효, 좀비 킬러.
//   메리: 메탈·떠있는 적 초원거리 개체(사거리 표시 900, 원거리 사각지대 25%). 메탈 킬러 75%(25%는 메탈 12마리 시험 맵에서 거의 못 잡아 올림), 크리티컬 20%, 워프 무효.
//   메리 혼자 1열에 있으면 냥콤보 '벌침 한 방'(크리티컬 업 소 +1%, game.js ALLY_COMBOS)이 켜진다.
const BUSTERS81_DRAFT=typeof process!=='undefined'&&process.env?.BUSTERS81_DRAFT==='1';// 시험용: 그림이 없으면 라이트 레인보우 그림을 빌려 수치를 잰다(브라우저에서는 process가 없어 동작하지 않음)
const BUSTERS81_ART=typeof BUSTERS_81_MOTION_ATLASES!=='undefined'?BUSTERS_81_MOTION_ATLASES:(BUSTERS81_DRAFT?Object.fromEntries(['apricot','marigold'].flatMap(id=>[[id+'_1',NEW_ATLASES.lightrainbow],[id+'_2',NEW_ATLASES.lightrainbow.evolved]])):null);
const BUSTERS81={
 apricot:{name:'애프리',color:'#fbceb1',hp:300000,dps:28000,interval:2.5,speed:14,range:24,cost:4000,wait:40,kb:3,traits:['ancient','zombie'],freeze:3.5,windup:.3,recovery:.5,dir:'busters-81-motion',
  extra:{area:true,attackClass:'범위',zoneMin:0,zoneMax:28,curseChance:1,curseDuration:4,zombieKiller:true,immune:{curse:true}},
  profile:'여성, 30세. 과일 잼 공방 사장. 살구 잼이 끓는 김으로 고대종과 좀비를 멈추게 하고 저주를 건다. 스스로는 저주에 걸리지 않으며, 처치한 좀비가 다시 일어나지 못하게 막는다.',evolved:'공방 앞치마를 두른 애프리. 달콤한 김을 넓게 퍼뜨려 고대종과 좀비 무리를 한꺼번에 묶는다.'},
 marigold:{name:'메리',color:'#eaa221',hp:220000,dps:40000,interval:3,speed:14,range:51,cost:4500,wait:45,kb:3,traits:['metal','floating'],freeze:4,windup:.5,recovery:.7,dir:'busters-81-motion',
  role:'초원거리 개체 · 메탈 적·떠있는 적 초데미지·정지',
  extra:{attackClass:'원거리',metalKiller:.75,critChance:.2,critMult:2,immune:{warp:true}},
  profile:'남성, 35세. 양봉가. 금잔화 꽃밭 옆 벌통에서 날려 보낸 벌 떼로 아주 먼 곳의 메탈 적과 떠 있는 적 한 마리를 겨눈다. 메탈의 남은 체력을 깎고 20% 확률로 크리티컬을 내며 워프를 무시하지만, 가까이 붙은 적은 맞히지 못한다.',evolved:'방충 모자와 작업복을 갖춘 메리. 벌 떼를 더 멀리 날려 필드 한가운데의 적까지 정지시킨다.'}
};
if(BUSTERS81_ART&&typeof registerBuster75==='function'){// 7.5 바스터즈 파일이 빠진 시험 엔진에서는 등록하지 않는다
 for(const [id,s]of Object.entries(BUSTERS81)){
  BUSTERS75[id]={...s,atlas:BUSTERS81_ART};registerBuster75(id,BUSTERS75[id]);
  if(s.role)ROLES[id]=s.role;
 }
 renderNewButtons();renderDeckButtons();renderTraining();
}
