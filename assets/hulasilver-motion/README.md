# 훌라 실버 1·2진 에셋

- 남성, 은색 몸, 눈 2개. 1진에도 작은 몸통과 연결된 팔다리가 있다.
- 2진은 은색 머리·머리띠·운동복·운동화를 착용한다.
- 각 형태: 걷기 4장, 공격 4장, 대기 2장, 넉백 1장, 복귀 1장. 총 24장.
- 투명 WebP 시트: `hulasilver_1.webp`, `hulasilver_2.webp` (1280×864, 셀 320×288).
- 프로필 2개, 좌표 JSON 및 `HULASILVER_MOTION_ATLASES` 상수 JS 포함.
- 원화: `reference-sheets/hulasilver-motion/`. 내장 이미지 생성으로 제작했다. 프롬프트는 이 폴더에 보관한다.
- 패킹: `scripts/pack-hulasilver-motion.py`. 그림을 다시 그리지 않고 자르기·확대 축소·정렬만 한다.
- 후프의 범위가 바뀌어도 머리 중심이 일정하도록 맞췄다. 발 기준선 264, 그림 원점 x=200.
- 미리보기: `work/hulasilver-motion/preview.html`, 상태별 GIF와 확인용 시트 포함.

`allies-71-motion.js`로 게임 전투·도감에 연결했다. 게임에서 기존 선딜 0.3초에 타격 프레임을 맞췄다. 능력치는 유지하고 임시 그림을 전용 모션으로 교체했다.
