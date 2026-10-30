from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'red-battle-doge.html';s=p.read_text(encoding='utf-8')
marker='<script src="third-forms-73.js?v=2"></script>'
extra='<script src="assets/third-form-74-motion/motion-atlases.js?v=1"></script><script src="third-forms-74.js?v=1"></script>'
if extra not in s:
    assert marker in s;s=s.replace(marker,marker+extra)
marker='<script src="reviews-73.js?v=1"></script>'
if '<script src="reviews-74.js?v=1"></script>' not in s:
    assert marker in s;s=s.replace(marker,marker+'<script src="reviews-74.js?v=1"></script>')
p.write_text(s,encoding='utf-8')
p=root/'scripts/full-harness.cjs';s=p.read_text(encoding='utf-8')
marker="'third-forms-73.js',"
if "'third-forms-74.js'" not in s:
    assert marker in s;s=s.replace(marker,marker+"'assets/third-form-74-motion/motion-atlases.js','third-forms-74.js',")
p.write_text(s,encoding='utf-8')
p=root/'work/third-form-74-motion/preview.html'
s=(root/'work/ocean-sea-motion/preview.html').read_text(encoding='utf-8')
for a,b in [('ocean_1','lilac_3'),('ocean_2','babypink_3'),('sea_1','magenta_3'),('sea_2','fusioncream_3'),('오션 1진','라일락 3진'),('오션 2진','베이비 핑크 3진'),('씨 1진','마젠타 3진'),('씨 2진','퓨전 크림 3진'),('오션·씨','7.4 3진'),('해양 기상 관측원','꽃잎 메즈 · 리듬 체조'),('스쿠버다이빙 강사','반응 과학자 · 카드 마술사')]:s=s.replace(a,b)
for a,b in [('7.4 3진 1·2진 모션','7.4 네 명의 3진 모션'),('오션 · 씨','7.4 네 명의 3진'),('해양 탐사 캐릭터 1·2진 외형과 모션 초안','라일락 · 베이비 핑크 · 마젠타 · 퓨전 크림'),('오션: 남성·35세·꽃잎 메즈 · 리듬 체조 / 씨: 여성·28세·반응 과학자 · 카드 마술사','꽃잎 · 체조 리본 · 반응 시약 · 마술 카드'),('둥근 몸 · 풍속계와 관측 부이','꽃 부채와 꽃잎 드레스'),('기상 관측 작업복 · 풍속계와 관측 부이','체조 경기복과 긴 리본'),('둥근 몸 · 물안경과 짧은 작살','보호안경과 반응 플라스크'),('잠수복과 산소통 · 짧은 작살','파스텔 모자와 카드 마술'),('에셋 미리보기이며 게임 전투 연결 전입니다.','3진 능력과 전투 에셋 연결 완료 · 실전 승률 측정 전')]:s=s.replace(a,b)
p.write_text(s,encoding='utf-8')
