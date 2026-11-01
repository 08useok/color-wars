// 8.0 신규 3진 4명(하시엔다·라이트 크림·모스·루비): 전용 모션과 기존 능력 초안을 연결한다. 전용 그림이 없는 경우에는
// trueFormAssetReady가 거짓이라 게임에서 해금되지 않는다(catfruit.js). 확정 방향은 docs/기획-시험/8.0-신규3진-2026-10-31.md,
// 초안 수치·티어는 docs/기획-시험/8.0-신규3진-초안-2026-10-31.md. 3진 그림은 assets/third-form-80-redesign-motion/motion-atlases.js(THIRD_FORM_80_MOTION_ATLASES, 7.4와 같은 형식)가 오면 아래에서 자동으로 연결한다.
// 공통: 2진 체력·공격 ×1.5, 가격·생산 시간은 2진 그대로, 기존 속성 대응을 유지하고 고대종 대응을 더한다. 반드시 ally-range-80.js보다 먼저 불러 사거리 조정이 마지막에 적용되게 한다.
//   루비(승인): 정지 확률 100%·지속 2→3초·빨간 적+고대종, 사거리 300(ally-range-80.js가 처리). 공격 간격 3초 유지.
//   모스(승인): 사거리 +3, 에이리언·고대종·떠있는 적에게 기존 느리게 + 50%·3.08초 저주(적에게 거는 저주는 ancient-curse.js).
//   하시엔다: 초뎀 목록에 고대종 추가 / 라이트 크림: 크리티컬 15→30% + 고대종 초뎀 (사용자 확정 10-31).
const THIRD80_NAMES={hacienda:'가디언 하시엔다',lightcream:'스파크 라이트 크림',moss:'룬 모스',ruby:'글레이셜 루비'};// 이름·능력 사용자 확정(2026-10-31)
for(const id of Object.keys(THIRD80_NAMES)){TRUE_FORM_HP_MULT[id]=1.5;TRUE_FORM_ATK_MULT[id]=1.5;TRUE_NAME[id]=THIRD80_NAMES[id];}
TRUE_FORM_BONUS.hacienda={massiveVs:['angel','ancient']};
TRUE_FORM_BONUS.lightcream={critChance:.3,massiveVs:['ancient']};
TRUE_FORM_BONUS.moss={statusVs:['alien','ancient','floating'],curseChance:.5,curseDuration:3.08};
TRUE_FORM_BONUS.ruby={statusVs:['red','ancient'],freezeChance:1,freezeDuration:3};
{const before=unitStats;
 unitStats=function(type,...args){const s=before(type,...args);if(!s.trueForm||!THIRD80_NAMES[type])return s;
  if(type==='moss')s.range+=3;// 기존 내부 단위 +3(냥코식 약 +88). 사거리 조정은 이 값 위에 적용된다.
  return s;
 };
}
// 3진 그림 연결(7.4 third-forms-74.js와 같은 방식): THIRD_FORM_80_MOTION_ATLASES가 있으면 그림·프로필·공격 타이밍·서 있을 때 대기 모션을 등록한다. 없으면 건너뛴다(잠김 유지).
if(typeof THIRD_FORM_80_MOTION_ATLASES!=='undefined'){
 for(const id of Object.keys(THIRD80_NAMES)){
  const src=THIRD_FORM_80_MOTION_ATLASES[id+'_3'];if(!src)continue;
  const a={...src},d=data.units[id],windup=d.windup||0,duration=d.attackDuration||.8;
  a.attackKeys=windup?[[0,0],[windup*15,1],[windup*30,2]]:[[0,2]];
  for(let f=3;f<7;f++)a.attackKeys.push([(windup+(duration-windup)*(f-2)/5)*30,f]);
  NEW_ATLASES[id].true=a;PROFILE_ART_TRUE[id]=src.sheet.replace(/\.webp(?=\?|$)/,'-profile.webp');
 }
 {const before=animateAtlas;animateAtlas=function(u){
  if(!u.stats?.trueForm||!THIRD80_NAMES[u.type]||!NEW_ATLASES[u.type]?.true?.idle)return before(u);
  const a=NEW_ATLASES[u.type].true,stationary=u.third80X===u.x;u.third80X=u.x;
  const walk=a.walk,step=a.walkStep;
  try{if(u.hurtTime<=0&&u.attackTime<=0&&stationary){a.walk=a.idle;a.walkStep=a.idleStep;}return before(u);}finally{a.walk=walk;a.walkStep=step;}
 };}
 renderNewButtons();renderDeckButtons();renderTraining();
}
// 시험용 임시 그림: THIRD80_DRAFT=1 일 때만 2진 그림을 3진 그림 자리에 빌려 와 3진 수치를 시뮬레이션으로 잴 수 있게 한다(브라우저에서는 process가 없어 동작하지 않음).
if(typeof process!=='undefined'&&process.env?.THIRD80_DRAFT==='1'){
 for(const id of Object.keys(THIRD80_NAMES)){const a=NEW_ATLASES[id];if(a&&a.evolved&&!a.true)a.true={...a.evolved};}
}
