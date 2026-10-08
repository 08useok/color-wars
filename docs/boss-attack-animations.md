# 보스 공격 모션 수정 (2026-10-08)

위키의 애니메이션 뷰어에서 Attack을 선택하고 배경을 비운 뒤 원본 프레임을 ZIP으로 내보냈습니다. 팔과 공격 이펙트가 잘리지 않도록 배율과 위치를 조정했습니다.

| 적 | 공격 선딜 | 전체 모션 | 프레임 |
|---|---:|---:|---:|
| 대갈이군 | 34/30초 | 44/30초 | 44 |
| 악의제왕 야옹마 | 104/30초 | 133/30초 | 133 |
| 맴매 선생 | 20/30초 | 31/30초 | 31 |

원본 타격 프레임에 맞춰 피해를 적용하고, 매 1/30초에 원본 프레임을 재생합니다. 공격이 끝나거나 히트백이 발생하면 기존 이동/피격 그림으로 돌아옵니다. 대갈이군의 임의 빔 효과는 제거했습니다. 대갈이군 그림에 포함된 분리된 바닥 그림자는 기존 게임 그림자와 중복되지 않게 제거했습니다. 체력·공격력·사거리·공격 간격은 이번 수정에서 바꾸지 않았습니다.

출처:
- [대갈이군](https://battlecats.miraheze.org/wiki/The_Face#Animations)
- [악의제왕 야옹마](https://battlecats.miraheze.org/wiki/Dark_Emperor_Nyandam#Animations)
- [맴매 선생](https://battlecats.miraheze.org/wiki/Teacher_Bun_Bun#Animations)

원작 이미지: The Battle Cats © PONOS. 위키 참고 자료: CC BY-SA 4.0 (별도 표시된 이미지 권리는 해당 권리자에게 있습니다).

검증: 208프레임의 선택과 시트 복귀, 선딜, 히트백 시 공격 취소, 투명 배경, 다운로드 원본의 화면 경계 잘림, 시트 영역 검사를 통과했습니다. scripts/boss-animation-test.cjs로 재검증할 수 있습니다. 이미지 재패킹은 scripts/pack-boss-animations.py를 사용하며 exports/boss-animation에 위키에서 내려받은 각 적의 투명 PNG 프레임이 필요합니다.
