레전드 스토리 26·27장 — v4.7.0

- 26장 악한 자 / 27장 마음과 몸을 잇는, 각 8개 스테이지.
- 기존 443개 스테이지 뒤에 추가하여 기존 인덱스와 저장 기록을 유지한다. 레전드 저장 번호는 180~195.
- 원본 출현 시점, 성 체력 조건, 적 배율, 마릿수, 출현 간격, 최대 적 수, 성 체력과 XP를 반영했다. 원본 15분 타이머 적은 기존 장과 같이 제외한다.
- 거리 단위는 원본 /20, 새 적 이동 속도는 /2로 환산한다. 이 게임의 전장과 생산 방식이 달라 원본과 난이도가 완전히 같지는 않다.
- 1·2·3성 배율은 1 / 1.2 / 1.4. 4성은 사용자의 요청대로 3성 배율이며 EX·레어만 출전한다.
- 까르삔초, 배틀 코알락교, 제비족, 찡찡어, 알파카, 거장, 에일리언 맴매, 두더더지의 원본 이동·공격·넉백 프레임과 도감을 추가했다.
- 울슈레 3종의 출격 버튼 누락으로 게임 초기화가 중단되던 문제도 수정했다.

검증: 기존 스테이지 번호·저장 기록, 26·27장 해금, 4성 제한, 성 체력 발동 후 지연 출현, 알파카의 1회 생존, 두더더지의 사각지대·밀치기를 확인했다. 고정 덱으로 64개 전투 조건을 300초까지 실행한 결과 22승·42패·시간 초과 0회였다. 이는 모든 스테이지의 공략 가능성을 보장하는 검증은 아니다. 임시 크롬에서 실제 8종 소환, 그림 로딩, 공격 프레임과 스크립트 오류 없음을 확인했다.

출처:
- https://battlecats-db.com/stage/s00025.html
- https://battlecats-db.com/stage/s00026.html
- https://github.com/battlecatsinfo/battlecatsinfo.github.io/tree/master/data
- 원본 그림·모션: https://github.com/battlecatsinfo/img (The Battle Cats © PONOS)
- 프레임 렌더러: https://github.com/battlecatsinfo/battlecats-animation-typescript — MIT, Copyright (c) 2025 ianfun. 원문 라이선스는 reference-sheets/legend-26-27/renderer/LICENSE에 보관했다.

핫 핑크 3진과 함께 v4.7.0에 포함한다.
