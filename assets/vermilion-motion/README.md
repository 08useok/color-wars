# 버밀리언 1·2진 모션

- 여성·29세·타투이스트. 대표 색 #F4320C. 두 형태 모두 머리카락이 없다.
- 1진은 둥근 머리·작은 손·타원형 발의 기본형, 2진은 검정 앞치마·장갑·작은 별 문신·작업화를 쓴다.
- 각 형태: 걷기 4장·공격 4장·대기 2장·넉백 1장·복귀 1장. 총 24장.
- 투명 WebP 시트 2개 (1280×864, 셀 320×288), 프로필 2개, 좌표 JSON 및 VERMILION_MOTION_ATLASES 상수 JS.
- 원화는 내장 이미지 생성으로 제작했다. 프롬프트는 이 폴더, 원화는 reference-sheets/vermilion-motion/에 보관한다.
- scripts/pack-vermilion-motion.py로 프레임 분리·크기·위치를 맞췄다. 공격 준비 프레임의 옆 장면 조각을 자르기 영역에서 제외한다.
- allies-71-motion.js에서 게임과 도감에 연결했다. 기존 플레임 색 보정은 해제했다.
- 공격 그림은 기존 선딜 0.4초에 맞춘다. 능력치·가격·공격 주기·정지 효과는 변경하지 않았다.
- 미리보기: work/vermilion-motion/preview.html.
- 검증: scripts/test-vermilion.cjs, scripts/allies-71-motion-browser-test.cjs.
