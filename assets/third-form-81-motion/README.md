# 8.1 아종 4명 3진 모션

팽이 레인보우·훌라 실버·리듬 핑크·군악 스칼렛의 새 외형을 바탕으로 제작했다. 입 수정본과 실버 몸 비율 수정본을 참조했다.

각각 1536×1024 투명 WebP 시트, 384×256 프레임 16개(대기4·걷기4·공격/복귀7·넉백1), 프로필 WebP를 포함한다. `motion-atlases.js`는 `THIRD_FORM_81_MOTION_ATLASES` 메타데이터를 제공한다. 게임 HTML과 `third-forms-81.js`에서 로드하며 연타 시점에 맞춰 공격 키를 설정한다. 실제 브라우저에서 네 동작의3진 시트 선택을 확인했다.

미리보기: `work/third-form-81-motion/preview.html`. 원본: `reference-sheets/third-form-81-motion/`. 검사: `scripts/verify-third-form-81-motion.py`에서 64프레임 범위·투명도·걷기 고유프레임·16개 GIF 검증 통과.
