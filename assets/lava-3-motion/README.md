# 라바 3진 모션 초안

확정 외형: `../lava-3-concepts/lava-3-idle-v4.png`.
내장 이미지 생성으로 원화를 만들고, 넉백 장면의 여분 팔을 이미지 생성 편집으로 제거했다.
원본: `reference-sheets/lava-3-motion/lava-3-source.png` (프로젝트 루트 기준).

- 걷기 4장, 공격 4장 (들기 → 내리치기 → 타격 → 마무리)
- 대기 2장, 넉백 1장, 복귀 1장
- `lava_3.webp`: 1024×768, 셀 256×256, 투명 배경
- `lava-motion-atlases.js`: 게임 형식의 좌표 데이터. 6.9.0에 게임 연결.
- 생성/재패킹: `scripts/pack-lava-3-motion.py`
- GIF 미리보기: `work/lava-3-motion/preview.html`

공격 GIF는 동작 확인용. 게임에서는 선딜 0.35초·공격 주기 3.2초를 적용한다.
