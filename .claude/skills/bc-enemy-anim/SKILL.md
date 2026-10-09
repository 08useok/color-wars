---
name: bc-enemy-anim
description: |
  원작 냥코대전쟁(Battle Cats) 적 캐릭터의 걷기·공격·피격 모션을 위키의 원작 애니메이션 데이터(AnimationViewer JSON + NNN_e.png)로 다시 구워
  게임 시트(assets/anim_<이름>.webp)와 NEW_ATLASES 항목으로 교체한다. 화면 크기·위치는 그대로 두고, 원작 선딜(Foreswing)·후딜(Backswing)을
  공격 타이밍에 반영하고, 브라우저로 확인한 뒤 내 변경만 커밋한다.
  사용자가 적 캐릭터 모션/스프라이트가 이상하다고 할 때 꼭 이 스킬을 쓴다: "○○ 걷기 모션에 뭐가 빠짐", "○○ 공격 모션 이상함",
  "○○ 더듬이/팔/무기가 없음", "○○ 원작처럼 움직이게", "○○ 위키랑 다름", "○○ 애니 구워", "적 스프라이트 원작대로" 등.
  아군(레드·크림 같은 우리 캐릭터) 그림이나 3진 그림 작업에는 쓰지 않는다.
---

# 원작 적 애니메이션 굽기

이 게임의 적 중 일부는 원작 부품 시트(NNN_e.png)에서 **포즈 그림만 통째로 잘라** 쓴다. 원작은 몸통 위에 더듬이·팔·무기 같은
부품을 따로 얹어 움직이기 때문에, 잘라 쓴 그림에는 그 부품이 빠지고 동작도 뚝뚝 끊긴다(예: 스타레오파드 걷기에 더듬이가 없던 것).
해결은 위키의 원작 애니메이션 데이터를 그대로 재생해 프레임을 굽는 것이다. 지금은 보스 3명(대갈이군 018·악의제왕 야옹마 023·맴매 선생 024, 다른 세션이 만든 전용 공격 모션 — 사용자가 빼기로 함)과 우리 오리지널 적(붉은 콩 다람쥐·철갑 멧돼지)을 뺀 원작 적이 모두 이 방식이다. 새 적이 들어오면 같은 절차를 쓴다.

스크립트는 모두 `.claude/skills/bc-enemy-anim/scripts/`에 있고, **프로젝트 루트에서** 실행한다. 작업 폴더(WORK)는 스크래치패드에 새로 만든다.

## 1. 대상 확인

- 적 이름 → 코드 키: `grep -o "[a-z0-9]*:'<한글이름>'" game.js` (UNIT_NAMES). 예: 스타레오파드 → `sael`.
- 현재 항목: `grep -n "^ *<키>:{\|NEW_ATLASES\.<키>=" game.js`. 시트가 `itf_*.png` 같은 잘라 쓴 그림이면 이 스킬 대상이다.
  이미 `anim_*.webp`면 굽기는 끝난 것이니 다른 원인(위치·그림자·체력바)을 먼저 본다.
- 원작 번호(NNN): 다른 세션 스크래치패드의 `build.py`/`gen_*.py`에 `bx('170', ...)`처럼 남아 있는 경우가 많다
  (`grep -rn "<키>" <scratchpad들>/*.py`). 없으면 위키에서 영어 이름으로 찾는다. 파일 번호는 E_NNN.png ↔ NNN_e.png로 대응한다.
- 무엇이 빠졌는지 먼저 눈으로 본다: 현재 시트와 원본 NNN_e.png를 초록 배경에 깔아 Read로 열어 보면 따로 떨어진 부품이 보인다.

## 2. 원작 데이터 받기

```bash
python -X utf8 .claude/skills/bc-enemy-anim/scripts/wiki.py NNN "$WORK"
```

애니메이션 JSON을 저장하고, 적 문서의 Foreswing/Backswing/공격 간격과 NNN_e.png 주소·크기를 출력한다.

- NNN_e.png는 **사용자 승인을 받은 뒤에만** 받는다(파일 이름·출처·크기를 말하고 물어본다). 승인 후 같은 명령에 `--png`.
- 이미 로컬에 있으면 받지 않고 복사한다: 다른 세션 스크래치패드의 `e/NNN_e.png`, 내 `bake/e/`.

## 3. 굽기

```bash
python -X utf8 .claude/skills/bc-enemy-anim/scripts/bake.py <키> "$WORK" NNN
```

`anim_<키>.png`, `<키>.atlas.json`, `<키>.preview.png`가 생긴다. **preview를 Read로 열어** 확인한다:
걷기에 빠졌던 부품이 들어왔는지, 공격 순서가 자연스러운지, 바닥에 검은 타원(그림자)이 남지 않았는지.
그림자는 "이름에 影/かげ가 있고 **납작한**(높이 ≤ max(8, 폭/4)) 조각"으로 뺀다. 이름만 보면 안 된다: 몸통에 `影`이 붙은 모델(169 하앜마양)이나
`6の影なしパターン`(그림자 없는 버전 = 몸통 그림) 같은 조각이 있어서, 이름만으로 빼면 걷기가 통째로 빈 그림(1×1)이 되거나 몸통이 빠진다.
`atlas.json` 프레임 크기에 `[1, 1]`이 보이면 이 문제부터 의심한다.
옛 시트(000~048)는 그림자를 **포즈 그림 안에** 그려 넣었다. bake.py가 그 줄도 지운다(몸 채움이 있는 가장 아래 줄을 기준으로, 그 아래의
어두운 픽셀 중 기준 줄 폭 밖이거나 반투명인 것, 그리고 빈 줄로 떨어진 점프 그림자). 몸이 온통 검은 적(살의의 멍뭉이)이나
불투명한 배 그림자(바다레오파드)는 구별이 안 돼 남는다 — 예전 잘라 쓴 그림에도 있던 것이라 그대로 둔다.

## 4. 게임에 넣기

```bash
python -X utf8 .claude/skills/bc-enemy-anim/scripts/apply.py <키> "$WORK" --fore F --back B          # 먼저 dry run
python -X utf8 .claude/skills/bc-enemy-anim/scripts/apply.py <키> "$WORK" --fore F --back B --write
```

- 화면 크기·위치 유지가 기본이다. 사용자는 "모션"을 고쳐 달라고 한 것이지 크기를 바꾸라고 한 게 아니고, 적 크기는 사거리 느낌과 직결된다.
  dry run이 출력하는 `today`(지금 상자)와 `new`(새 상자)가 거의 같아야 한다.
- 크기 맞추는 기준(`--match`): 기본 `width`. 잘라 쓴 원작 그림이면 `part`도 거의 같은 값이 나와야 정상이다.
  `height`는 새 부품(더듬이 등)이 키를 늘리면 틀리게 작아지므로 거의 쓰지 않는다. 새 그림에 날개·고리처럼 **가로로** 늘어난 부품이 생기면
  `width`가 몸을 작게 만들므로 `part`를 쓴다(날랄라라라방·천사 하마양). 후보가 크게 다르면 preview를 보고 고른다.
- `--fore/--back`은 위키 값(프레임 수). windup = F/30, attackDuration = (F+B)/30이 되어, 새 그림이 원작 속도로 할퀴는 순간에 피해가 들어간다.
  이걸 빼면 그림과 피해 시점이 어긋난다(예: 할퀴는 그림 0.2초, 피해 0.5초). 체력·사거리는 이 게임 수치이니 건드리지 않는다.
- 공격 간격(interval)이 원작 Time Between Attacks와 다르면 표로 보여 주고 사용자에게 묻는다. 지금까지 사용자 선택은 늘
  "원작 간격, 초당 피해 유지": interval = TBA/30, atk = round(atk × (TBA/30) / 예전 interval). 원작이 다단히트면
  `hits:[{at:F/30,share:피해/총피해},...]`도 넣는다(위키 Ability의 Multi-Hit 값). 모션(F+B)이 간격보다 길면 반드시 간격을 늘려야 한다(안 그러면 모션이 잘림).
- 적 공속이 이상하다는 말에는 같은 대상을 여럿이 때릴 때의 차례 규칙(canEngage/lockEngage)도 의심한다. 지금은 아군에만 걸려 있다(6f08482).
  확인은 브라우저에서 `update(1/60)`를 직접 돌리며 `attack`을 감싸 시각을 기록하면 된다(혼자 / 같이 둘 다).
- `NOTE old keys not carried over`가 나오면 그 키(dash, strike 등)가 새 시트에도 필요한지 보고 손으로 다시 넣는다.
- ENEMY_SIZE는 그대로 둔다. 손으로 맞춘 체력바·그림자(CSS_BAR, SHEET_SHADOW 목록)에 그 적이 있으면 목록에서 빼서 fitBar/fitShadow가 새 프레임에 자동으로 맞추게 한다.
- **자기 그리기 코드가 있는 적**(animateDog의 type별 분기, drawUnit의 다리·몸·왕관 조각, drawUnit의 `const sheet={...}` 시트 덮어쓰기)은
  atlas만 바꾸면 안 보인다: 분기·조각·덮어쓰기를 지우고, 쓰지 않게 된 함수·상수도 정리한다. 이런 적은 atlas가 없거나 있어도 안 쓰이므로
  브라우저에서 지금 걷기 상자를 재서 `--box L,W,B`로 넘긴다(unit 기준 px, ENEMY_SIZE로 나눈 값; 보이는 .dog-sprite·다리·몸 조각을 합친 상자).
  atlas 줄이 여러 줄에 걸친 항목(옛 darkdog)은 스크립트가 새 줄을 덧붙이므로, 옛 항목을 지우고 그 자리에 넣는다.
- 초기 적 수치는 `const data={...units:{...}}` 한 줄 안에 있어 `--fore/--back`이 못 고친다. 그 줄의 `<키>:{...}`를 직접 고친다.

## 5. 브라우저 확인

포트 8756은 다른 세션 것이라 쓰지 않는다. `.claude/launch.json`을 스크래치패드에 백업하고 `verify-8795`
(`python -m http.server 8795`)를 덧붙여 `preview_start`로 연 뒤, 끝나면 백업으로 되돌린다(launch.json은 추적 파일).

```js
// red-battle-doge.html?r=<새 값> 으로 열고 업데이트 공지를 닫은 뒤
await new Promise(r=>setTimeout(r,1500)); reset(); game.running=true; game.paused=false; game.assetsLoading=false;
addUnit('<키>');                       // 첫 전투 가이드가 뜨면 '건너뛰기'
// 공격 장면 고정: game.paused=true; u.attackTime=dur-k/30; animateAtlas(u)
```

- 걷기: 빠졌던 부품이 보이는지, 발이 땅에 붙어 있는지, 체력바가 머리 위에 있는지.
- 공격·피격: `attackTime`/`hurtTime`을 바꿔 가며 장면을 본다.
- 스크린샷이 확대되거나 예전 화면이 나오면 `resize_window`로 폭을 1px 바꿔 다시 찍는다. 끝나면 `preset: desktop`으로 되돌리고 서버를 끈다.
- 끝까지 확인 못 한 장면이 있으면 보고에 그대로 적는다.

## 6. 출처와 커밋

- `red-battle-doge.html` 출처 목록(다람G·대머리군 항목 옆)에 `<a href="https://battlecats.miraheze.org/wiki/File:NNN_e.png" ...>File:NNN e.png</a>(원작 애니메이션 데이터로 프레임 생성)`이 없으면 추가한다.
- 다른 세션이 같은 파일을 동시에 고치고 있으므로 **내 줄만** 올린다:

```bash
python -X utf8 .claude/skills/bc-enemy-anim/scripts/stage_only.py game.js "data\.units\.<키>=" " ?<키>:\{scale"   # 또는 "NEW_ATLASES\.<키>="
python -X utf8 .claude/skills/bc-enemy-anim/scripts/stage_only.py --bump-game-js
git add assets/anim_<키>.webp
git diff --cached --stat     # 내 파일·줄만 있는지 확인
```

출처 줄도 바꿨다면 html은 `stage_only.py red-battle-doge.html <그 줄 패턴>`을 쓴 뒤 `--bump-game-js`를 다시 실행한다(둘 다 같은 줄이라 마지막 상태가 들어간다).

- 출처의 이름은 반드시 게임의 `UNIT_NAMES`(한글 이름)로 쓴다. 원작 영어 이름을 짐작해 옮기면 틀린다(Kroxo = 아거리언, Shy Boy = 홍당무왕).
- 시트가 500KB를 넘으면(빛 효과가 많은 적) `quality=88` 손실 webp로 다시 저장한다.
- 커밋 메시지: `fix: <한글이름> <무엇이 빠졌는지> — 원작 애니메이션 데이터(NNN_e)로 걷기·공격·피격을 다시 구워 anim_<키>.webp로 교체(화면 크기·위치는 그대로), 공격 타이밍도 원작대로 선딜 Ff·모션 (F+B)f`
- **푸시는 하지 않는다.** 사용자가 "푸시"라고 할 때만 origin/master를 먼저 합친 뒤 올린다.

## 보고

사용자는 짧은 한국어로 묻는다. 무엇이 빠져 있었는지 한 줄, 고친 내용, 공격 타이밍처럼 **게임 수치가 바뀐 것**은 전후 값으로,
확인 못 한 부분, 커밋 해시와 "푸시 안 함"을 짧게 알린다. 다른 세션 변경을 커밋에서 뺐다면 그것도 한 줄로 말한다.
