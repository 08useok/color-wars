// 8.0 신규 적 13종 등록 파일 enemies-80.js를 만든다.
//   node scripts/build-enemies-80.cjs
// 입력: reference-sheets/enemies-80-game.json(scripts/build-enemies-80-stats.cjs: 원작 수치 → 게임 수치, 체력·공격 ×1.3),
//       reference-sheets/enemies-80/atlas.json(scripts/pack-80-enemies.py: 구운 모션 시트의 칸 좌표),
//       이름·도감 문구는 아래 TEXT(이름은 나무위키 공식 한글 이름).
// 출력은 data.units / UNIT_NAMES / ENEMY_TEXT / ENEMY_ORDER / NEW_ATLASES. 스테이지는 따로 등록한다(우주편 3장·신레전드 0~12장).
// 엔진: 고대종·저주·앞으로 워프는 ancient-curse.js, 연타 첫 타 능력은 strike-hits.js가 처리한다.
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const game=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80-game.json'),'utf8'));
const atlas=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80/atlas.json'),'utf8'));
const TEXT={
 truebunbun:'고대종. 앞뒤 300을 한꺼번에 1초에 두 번 가까이 때리는 신 레전드의 첫 보스로, 맞은 아군에게 100%로 10초 저주를 건다. 체력 300만에 넉백 5회라 쉽게 밀리지 않는다. 사거리가 짧으니 고기방패를 세우고 먼 거리에서 잡아야 한다. (신 레전드 0장)',
 ancientdog:'고대종 잡몹. 35% 확률로 3.3초 저주를 건다. 잡몹인데도 공격이 12,000이라 아프다. (신 레전드 0장)',
 inglis:'고대종. 단일 공격으로 아주 빠르게 달려와 0.4초마다 때리며 100% 저주를 5초간 건다. 단일 공격이라 고기방패가 잘 통한다. (신 레전드 2장)',
 koraino:'고대종. 체력 240만에 넉백이 1회뿐인 느릿한 탱커로, 0.4초마다 범위 공격하며 10초 저주를 건다. 오래 맞으면 저주가 계속 이어지니 공격력 다운·정지 같은 보조가 필요하다. (신 레전드 1장)',
 supermayor:'떠있는 적+고대종. 앞뒤 440 전방위 범위 공격이 3초에 한 번 나가고 2초간 저주를 건다. 체력 80만에 넉백 1회라 잘 밀리지 않는다. (신 레전드 3장)',
 datemegane:'고대종. 500~800 거리를 공격하는 원거리 딜러로 5초에 한 번 쏘며 5초 저주를 건다. 500 안쪽 사각지대로 파고들면 맞지 않는다. (신 레전드 4장)',
 kogaou:'떠있는 적+고대종. 거의 움직이지 않는 거대한 얼굴로, 사거리 500 안의 아군에게 10초 저주를 건다. 체력 111만에 넉백 1회. (신 레전드 5장)',
 oldree:'고대종. 0.57초마다 때리며 맞은 아군을 100% 멀리 날려 버리고 5초간 느리게 하고 5초 저주까지 건다. 체력 136만에 넉백 10회로 단단하다. (신 레전드 6장)',
 ministercyclone:'별 에이리언. 체력은 4.4만으로 낮지만 0.17초마다 맞은 아군을 100% 앞으로 150 워프시켜 3.3초간 전장에서 빼 버린다. 한 번에 몰아서 잡아야 한다. (우주편 3장)',
 gardeneels:'별 에이리언. 필드 대부분(1700~1950)을 덮는 초원거리 범위 공격으로, 맞은 아군을 100% 앞으로 1375 순간이동시킨다. 체력이 5,200뿐이라 닿기만 하면 약하다. (우주편 3장)',
 looper:'별 에이리언. 베리어 10,000을 두르고 3.7초 뒤 필드 전체를 덮는 Lv10 파동(공격 40,000)을 쏜다. 공격 간격이 266초라 한 번 쏘면 오래 쉰다. 베리어 브레이커와 파동 대책이 필요하다. (우주편 3장)',
 finalgod:'우주편 3장 최종 보스. 3연타 중 첫 타에만 Lv12 파동과 뒤로 1500 워프(3초)가 붙고, 3타째가 공격의 89%를 차지하는 한 방이다. 체력 100만에 14.9초에 한 번 공격한다. (우주편 3장 빅뱅)',
 dogumaru:'고대종. 앞 700·뒤 500을 덮는 전방위 범위 공격으로 20초나 오래 가는 저주를 건다. 2.9초마다 때리고 체력 100만. (신 레전드 11장)'
};
const ORDER=['truebunbun','ancientdog','inglis','koraino','supermayor','datemegane','kogaou','oldree','ministercyclone','gardeneels','looper','finalgod','dogumaru'];
const KEYS=['trait','traits','starred','hp','atk','interval','speed','range','engageRange','zoneMin','zoneMax','backRange','reward','knockbacks','area','barrier','slowChance','slowDuration','blowChance','blowDistance','curseChance','curseDuration','warpChance','warpDistance','warpDuration','wave','attackDuration','windup','hits'];
const flatWarp=(w)=>w?{warpChance:w.chance,warpDistance:w.distance,warpDuration:w.duration}:{};
const out=['// 8.0 신규 적 13종 등록(우주편 3장 4종 + 신 레전드 0~12장 9종). scripts/build-enemies-80.cjs 로 만든다.',
 '// 능력치: 원작 DB 수치를 41~49장과 같은 규칙(사거리·구간 ×0.034, 속도 ×0.5367, 프레임÷30=초)으로 바꾼 값 그대로(체력·공격 ×1.3 규칙은 11-01에 삭제).',
 '// 모션: 원작 애니메이션 데이터를 구운 시트(scripts/bake-80-enemies.cjs · pack-80-enemies.py, 그림자 제외).',''];
for(const id of ORDER){
 const g=game[id].game,a=atlas[id];
 const u={...g,...flatWarp(g.warp)};delete u.warp;
 if(u.hits)u.hits=u.hits.map(h=>{if(!h.abilities)return h;const ab={...h.abilities,...flatWarp(h.abilities.warp)};delete ab.warp;return {...h,abilities:ab}});
 const o={};for(const k of KEYS)if(u[k]!==undefined)o[k]=u[k];
 const at={sheet:a.sheet,scale:a.scale,left:a.left,groundAnchor:true,bodyWidth:a.bodyWidth,walkStep:a.walkStep,attackStep:a.attackStep,walk:a.walk,attack:a.attack,hurt:a.hurt};
 out.push(`data.units.${id}=${JSON.stringify(o)};`,`UNIT_NAMES.${id}=${JSON.stringify(game[id].name)};`,`ENEMY_TEXT.${id}=${JSON.stringify(TEXT[id])};`,`ENEMY_ORDER.push('${id}');`,`NEW_ATLASES.${id}=${JSON.stringify(at)};`,'');
}
fs.writeFileSync(path.join(root,'enemies-80.js'),out.join('\n'));
console.log('enemies-80.js',ORDER.length,'종,',fs.statSync(path.join(root,'enemies-80.js')).size,'B');
