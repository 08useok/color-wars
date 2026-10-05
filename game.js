const STAGES=[
 {name:'한국',flag:'🇰🇷',hp:500,gap:5,wave:0,desc:'첫 출격 · 5초마다 멍뭉이'},
 {name:'몽골',flag:'🇲🇳',hp:500,gap:4.8,wave:0,desc:'신규 적 낼름이 · 빠른 접근에 주의하세요'},
 {name:'중국',flag:'🇨🇳',hp:500,gap:4.6,wave:24,desc:'멍뭉이가 더 자주 몰려옵니다 · 클리어 보상: 오렌지'},
 {name:'태국',flag:'🇹🇭',hp:500,gap:4.4,wave:22,desc:'신규 적 놈놈놈 · 세 명이 함께 달려옵니다'},
 {name:'캄보디아',flag:'🇰🇭',hp:750,gap:4.2,wave:20,desc:'놈놈놈 합류 · 수입 업그레이드를 활용하세요'},
 {name:'필리핀',flag:'🇵🇭',hp:750,gap:4,wave:18,desc:'멍뭉이 · 낼름이 · 놈놈놈 혼성 · 클리어 보상: 옐로우'},
 {name:'일본',flag:'🇯🇵',hp:2400,gap:3.8,wave:16,desc:'신규 적 하마양 · 적 성 체력 50%에서 보스 출현 · 보상: 그린'},
 {name:'호주',flag:'🇦🇺',hp:1500,gap:3.6,wave:15,desc:'멍뭉이 · 낼름이 · 놈놈놈의 혼성 전투'},
 {name:'싱가포르',flag:'🇸🇬',hp:3000,gap:3.5,wave:15,desc:'몰디브로 향하는 전선'},
 {name:'몰디브',flag:'🇲🇻',hp:2500,gap:3.4,wave:15,desc:'신규 빨간 적 돼지새끼 · 범위 공격에 주의하세요'},
 {name:'인도',flag:'🇮🇳',hp:3500,gap:3.4,wave:16,desc:'하마양 재등장 · 강화한 아군으로 돌파하세요'},
 {name:'네팔',flag:'🇳🇵',hp:4000,gap:3.3,wave:16,desc:'돼지새끼의 범위 공격을 견디세요'},
 {name:'두바이',flag:'🇦🇪',hp:5000,gap:3.2,wave:15,desc:'신규 적 재키펭 · 클리어 보상: 시안'},
 {"name": "사우디아라비아", "flag": "🇸🇦", "hp": 6000, "gap": 4, "wave": 0, "desc": "하마양과 혼성 부대"},
 {"name": "케냐", "flag": "🇰🇪", "hp": 6100, "gap": 4, "wave": 0, "desc": "하마양과 돼지새끼의 협공"},
 {"name": "마다가스카르", "flag": "🇲🇬", "hp": 7000, "gap": 4, "wave": 0, "desc": "신규 적 고릴라저씨 · 클리어 보상: 블루"},
 {"name": "남아프리카", "flag": "🇿🇦", "hp": 7000, "gap": 4, "wave": 0, "desc": "재키펭과 대형 적이 합류합니다"},
 {"name": "가나", "flag": "🇬🇭", "hp": 8000, "gap": 4, "wave": 0, "desc": "빠른 재키펭과 돼지새끼"},
 {"name": "사하라사막", "flag": "🏜️", "hp": 9000, "gap": 4, "wave": 0, "desc": "신규 적 메에메에 · 클리어 보상: 퍼플"},
 {"name": "이집트", "flag": "🇪🇬", "hp": 9000, "gap": 4, "wave": 0, "desc": "고릴라저씨를 중심으로 한 혼성 부대"},
 {"name": "터키", "flag": "🇹🇷", "hp": 10000, "gap": 4, "wave": 0, "desc": "여덟 종류의 적을 상대하세요"},
 {"name": "러시아", "flag": "🇷🇺", "hp": 12000, "gap": 4, "wave": 0, "desc": "재키펭과 고릴라저씨의 빠른 진격"},
 {"name": "그리스", "flag": "🇬🇷", "hp": 15000, "gap": 4, "wave": 0, "desc": "신규 빨간 적 바다레오파드 · 퍼플을 활용하세요"},
 {"name": "이탈리아", "flag": "🇮🇹", "hp": 15000, "gap": 4, "wave": 0, "desc": "대형 적과 고릴라저씨의 전선"},
 {"name": "모나코", "flag": "🇲🇨", "hp": 15000, "gap": 4, "wave": 0, "desc": "재키펭과 메에메에의 혼성 부대"},
 {"name": "스페인", "flag": "🇪🇸", "hp": 15000, "gap": 4, "wave": 0, "desc": "바다레오파드와 아거"},
 {"name": "프랑스", "flag": "🇫🇷", "hp": 15000, "gap": 4, "wave": 0, "desc": "일곱 종류의 혼성 부대"},
 {"name": "독일", "flag": "🇩🇪", "hp": 15000, "gap": 4, "wave": 0, "desc": "아홉 종류의 혼성 부대"},
 {"name": "덴마크", "flag": "🇩🇰", "hp": 18000, "gap": 4, "wave": 0, "desc": "신규 적 빠옹"},
 {"name":"노르웨이","flag":"🇳🇴","hp":15000,"gap":4,"wave":0,"desc":"고릴라저씨·바다레오파드가 뒤섞인 혼성 전선"},
 {"name":"영국","flag":"🇬🇧","hp":8000,"gap":4,"wave":0,"desc":"빠옹이 다시 등장하는 영국 전선"},
 {"name":"그린란드","flag":"🇬🇱","hp":18000,"gap":4,"wave":0,"desc":"신규 적 엘리트래빗"},
 {"name":"캐나다","flag":"🇨🇦","hp":18000,"gap":4,"wave":0,"desc":"고릴라저씨 증원이 늘어난 대규모 혼성 전선"},
 {"name":"뉴욕","flag":"🇺🇸","hp":18000,"gap":4,"wave":0,"desc":"바다레오파드가 반복 출현하는 격전지"},
 {"name":"버뮤다","flag":"🇧🇲","hp":20000,"gap":4,"wave":0,"desc":"신규 적 캥거류"},
 {"name":"자메이카","flag":"🇯🇲","hp":20000,"gap":4,"wave":0,"desc":"빠옹이 최종 보스로 재등장"},
 {"name":"콜롬비아","flag":"🇨🇴","hp":20000,"gap":4,"wave":0,"desc":"캥거류가 보스로 재등장하는 남미 전선"},
 {"name":"브라질","flag":"🇧🇷","hp":20000,"gap":4,"wave":0,"desc":"고릴라저씨 지원군과 함께 나나나난나방이 보스로 등장"},
 {"name":"아르헨티나","flag":"🇦🇷","hp":20000,"gap":4,"wave":0,"desc":"고릴라저씨·바다레오파드·재키펭이 뒤섞인 혼성 전선"},
 {"name":"마추픽추","flag":"🇵🇪","hp":20000,"gap":4,"wave":0,"desc":"캥거류가 재등장하는 혼성 전선"},
 {"name":"이스터섬","flag":"🗿","hp":20000,"gap":4,"wave":0,"desc":"신규 적 투뿔소(One Horn)가 보스로 등장"},
 {"name":"멕시코","flag":"🇲🇽","hp":25000,"gap":4,"wave":0,"desc":"캥거류가 세 번 증원되는 혼성 전선"},
 {"name":"NASA","flag":"🚀","hp":20000,"gap":4,"wave":0,"desc":"투뿔소가 반복 출현하는 전선"},
 {"name":"라스베이거스","flag":"🎰","hp":25000,"gap":4,"wave":0,"desc":"신규 적 곰선생(Teacher Bear)이 보스로 등장"},
 {"name":"할리우드","flag":"🎬","hp":20000,"gap":4,"wave":0,"desc":"하마양·돼지새끼부터 나나나난나방까지 총출동"},
 {"name":"알래스카","flag":"🏔️","hp":20000,"gap":4,"wave":0,"desc":"다람G 물량과 곰선생·나나나난나방의 협공"},
 {"name":"하와이","flag":"🌺","hp":30000,"gap":4,"wave":0,"desc":"강적 총출동 · 달 직전 마지막 관문"},
 {"name":"달","flag":"🌕","hp":99999,"gap":4,"wave":0,"desc":"최종 보스 대갈이군(The Face)"}
];
// Backgrounds follow the original: Empire of Cats uses 4 stage backgrounds (bg000 day · bg001 sunset ·
// bg002 night · bg003 snow; battlecats-db stage data, same in all 3 chapters except the Moon). Colours are
// sampled from the wiki's Bg000-003.png: upper sky and the grass/snow band.
const STAGE_BG={0:{sky:'#8bdbfe',land:'#bde041'},1:{sky:'#fe955b',land:'#dc6517'},2:{sky:'#242d9b',land:'#7f9b42'},3:{sky:'#77d5ff',land:'#f2f2f2'}};
const EOC_BG='000001200210100202010020313300330021002103033301';// chapter-1 stage i -> background id
STAGES.forEach((st,i)=>Object.assign(st,STAGE_BG[EOC_BG[i]]));
// Empire of Cats Chapter 2: same Korea-to-Hawaii roster replayed with the wiki-sourced
// 150% enemy strength magnification. Moon (the chapter-1 finale) is not repeated.
const CHAPTER1_LEN=STAGES.length;
for(let i=0;i<CHAPTER1_LEN-1;i++){const base=STAGES[i];STAGES.push({...base,chapter:2,hp:Math.round(base.hp*1.5),desc:'세계편 2장 재도전 · 모든 적 능력치 150% 강화'});}
// Chapter 2 ends on its own Moon (wiki "Moon (Empire of Cats)", Ch.2): boss 악의제왕 야옹마 (Dark Emperor Nyandam).
STAGES.push({...STAGES[CHAPTER1_LEN-1],...STAGE_BG[2],chapter:2,hp:200000,maxEnemies:12,desc:'세계편 2장 최종 보스 악의제왕 야옹마'});// chapter-2 Moon is the night background
const CH2_HAWAII=CHAPTER1_LEN*2-2;// last pre-Moon chapter-2 stage: keeps the Lv.20 / Tuesday top-tier unlocks where they were
// Empire of Cats Chapter 3: the same Korea-to-Hawaii roster again at 400% (wiki: Ch.3 = x4 enemy magnification).
const CH3_START=STAGES.length;
for(let i=0;i<CHAPTER1_LEN-1;i++){const base=STAGES[i];STAGES.push({...base,chapter:3,hp:Math.round(base.hp*4),desc:'세계편 3장 재도전 · 모든 적 능력치 400% 강화'});}
// Chapter 3 Moon (wiki "Moon (Empire of Cats)", Ch.3): base 900,000 · max 8 · boss 맴매 선생 (Teacher Bun Bun) at 70%.
STAGES.push({...STAGES[CHAPTER1_LEN-1],chapter:3,hp:900000,maxEnemies:8,desc:'세계편 3장 최종 보스 맴매 선생'});
const MAIN_STAGE_COUNT=STAGES.length;// chapters 1-3; everything after this index is a special stage
// Tuesday special stage "광속 전사": pre-15.4 Speed Up source (drop chance 20/50/100/100% (x2 on the hardest)).
const TUESDAY_STAGES=[
 {name:'광속 전사 초급',flag:'⚡',hp:10000,chance:.2,count:1,boss:'hippo',desc:'하마양 · 스피드업 20%'},
 {name:'광속 전사 중급',flag:'⚡',hp:20000,chance:.5,count:1,boss:'rhino',desc:'투뿔소 · 스피드업 50%'},
 {name:'광속 전사 상급',flag:'⚡',hp:30000,chance:1,count:1,boss:'bear',desc:'곰선생 · 스피드업 100%'},
 {name:'광속 전사 초상급',flag:'⚡',hp:50000,chance:1,count:2,boss:'leboin',desc:'빠옹 · 스피드업 2개 100%'}
];
TUESDAY_STAGES.forEach(t=>STAGES.push({name:t.name,flag:t.flag,hp:t.hp,gap:4,wave:0,sky:'#f6e39a',land:'#c9a24e',desc:t.desc,chapter:'special',special:{chance:t.chance,count:t.count},maxEnemies:10}));
// Friday special stage "가시밭길": Nyanko Computer (야옹컴) source (drop chance 30/60/100% (x2 on the hardest), per 나무위키).
const FRIDAY_START=STAGES.length;
const FRIDAY_STAGES=[
 {name:'가시밭길 초급',flag:'🌵',hp:12000,chance:.3,count:1,boss:'pigge',desc:'돼지새끼 · 야옹컴 30%'},
 {name:'가시밭길 중급',flag:'🌵',hp:24000,chance:.6,count:1,boss:'seal',desc:'바다레오파드 · 야옹컴 60%'},
 {name:'가시밭길 초상급',flag:'🌵',hp:60000,chance:1,count:2,boss:'kangaroo',desc:'캥거류 · 야옹컴 2개 100%'}
];
FRIDAY_STAGES.forEach(t=>STAGES.push({name:t.name,flag:t.flag,hp:t.hp,gap:4,wave:0,sky:'#d4e6b2',land:'#7f9b55',desc:t.desc,chapter:'special',special:{chance:t.chance,count:t.count,item:'nyancom'},maxEnemies:10}));
// Legend Story subchapter 1 "전설의 시작" (Stories of Legend: The Legend Begins); Korean stage names per
// 나무위키 '냥코 대전쟁/레전드 스토리', stage data per the
// Battle Cats wiki: 8 stages, base HP / max enemies / XP / drops as listed there (XP x4 to match
// this game's XP scale). Opens after the chapter-1 Moon. Crowns multiply every enemy's
// magnification by 1/1.5/2/3; the enemy base HP is the same on every crown.
const LEGEND_STAGES=[
 {name:'대지를 흔들다',en:'Earthshaker',flag:'🌾',hp:60000,max:7,xp:950,drop:{speed:.01},sky:'#9fd8f0',land:'#8ec85a',desc:'멍뭉이·낼름이·놈놈놈 200% 각 50마리'},
 {name:'그 공포, 또다시',en:'Return of Terror',flag:'🦛',hp:50000,max:4,xp:950,drop:{speed:.01},sky:'#b9c3cf',land:'#8f9aa8',desc:'놈놈놈 400% · 보스 메탈 하마양 (치명타 외 피해 1)'},
 {name:'수고하세트',en:'Sunset Blues',flag:'🌇',hp:70000,max:40,xp:1045,sky:'#f2b27a',land:'#b9864f',desc:'적 성 99%에서 아거 30마리 러시'},
 {name:'멜랑꼴리 습지',en:'Melancholy Damp',flag:'🌧️',hp:80000,max:4,xp:1140,drop:{speed:.01},sky:'#8fa3b1',land:'#5f7560',desc:'메에메에·놈놈놈 · 50%에서 보스 엘리자베스 2세'},
 {name:'탱글탱글 광장',en:'Bouncy Park',flag:'🎡',hp:90000,max:4,xp:1140,sky:'#9fd8ef',land:'#9ccf6a',desc:'40초 후 재키펭 3마리'},
 {name:'애정의 눈빛',en:'Gentle Smile',flag:'🙂',hp:100000,max:4,xp:1140,drop:{speed:.01},sky:'#e8d4b0',land:'#b9a56f',desc:'적 성 90%에서 보스 고릴라저씨 500% 3연속'},
 {name:'목장의 수호자',en:'Guardian of the Ranch',flag:'🐄',hp:110000,max:6,xp:1330,sky:'#a8d8e8',land:'#7fb35c',desc:'적 성 90%에서 보스 빠옹 300%'},
 {name:'잠자는 라이온',en:'Sleeping Lion',flag:'🦁',hp:120000,max:6,xp:1710,drop:{xp:13500,xpChance:.05},sky:'#3b3f66',land:'#7b6f8f',desc:'고릴라저씨·하마양 4연속 · 50%에서 살의의 멍뭉이 4마리와 보스 다람G'}
];
const LEGEND_START=STAGES.length,LEGEND_CROWN_MULT=[1,1.5,2,3],LEGEND_XP_SCALE=4;
LEGEND_STAGES.forEach((t,k)=>STAGES.push({...t,gap:4,wave:0,chapter:4,legend:{k},maxEnemies:t.max}));
// Into the Future Chapter 1 (미래편 1장): 48 stages Japan -> Moon, opened by the chapter-3 Moon like the original.
// Stage data per battlecats-db (未来編 第1章: base HP, max enemies, XP; XP x4 like the Legend Story), spawn rules
// below in FUTURE_SPAWNS. Each rule carries its own magnification (regulars 200~600%, aliens 100% on top of the 700% alien base
// that suppressors lower, see ALIEN_SUPPRESSORS), so the
// chapter itself adds none. Stored in `cleared` with the main story.
const FUTURE_BG={day:{sky:'#9fd3f2',land:'#a9b4c2'},dusk:{sky:'#f3a07a',land:'#8c6f86'},night:{sky:'#1e2a6b',land:'#5a6b8c'},abyss:{sky:'#0d2a4a',land:'#1f5d7a'},sky:{sky:'#bfe6ff',land:'#e9f3f7'},moon:{sky:'#0b0d2a',land:'#bfc3d6'}};
const FUTURE_STAGES=[
 {name:'일본',flag:'🇯🇵',hp:4000,max:5,xp:1000,bg:'day',desc:'보스 에이리뭉 · 기존 적 강화 부대 200%'},
 {name:'한국',flag:'🇰🇷',hp:4000,max:5,xp:1300,bg:'day',desc:'에이리언·신규 적 에이리뭉'},
 {name:'중국',flag:'🇨🇳',hp:6000,max:6,xp:1600,bg:'day',desc:'기존 적 강화 부대 200%'},
 {name:'몽골',flag:'🇲🇳',hp:6000,max:6,xp:1900,bg:'day',desc:'에이리언·신규 적 에이리뭉'},
 {name:'러시아',flag:'🇷🇺',hp:8000,max:7,xp:2200,bg:'day',desc:'보스 바다레오파드 · 기존 적 강화 부대 200%'},
 {name:'노르웨이',flag:'🇳🇴',hp:15000,max:4,xp:2500,bg:'day',desc:'보스 하앜마양 · 기존 적 강화 부대 300%'},
 {name:'영국',flag:'🇬🇧',hp:12000,max:7,xp:2800,bg:'day',desc:'에이리언·신규 적 에이리뭉'},
 {name:'덴마크',flag:'🇩🇰',hp:10000,max:6,xp:3100,bg:'day',desc:'보스 투뿔소 · 기존 적 강화 부대 200%'},
 {name:'독일',flag:'🇩🇪',hp:16000,max:7,xp:3400,bg:'day',desc:'에이리언·신규 적 에이리뭉'},
 {name:'프랑스',flag:'🇫🇷',hp:18000,max:6,xp:3700,bg:'day',desc:'보스 하앜마양 · 기존 적 강화 부대 200%'},
 {name:'스페인',flag:'🇪🇸',hp:22000,max:6,xp:4000,bg:'day',desc:'에이리언·신규 적 에이리뭉'},
 {name:'모나코',flag:'🇲🇨',hp:25000,max:7,xp:4300,bg:'day',desc:'보스 소라게게 · 에이리언·신규 적 에이리뭉'},
 {name:'이탈리아',flag:'🇮🇹',hp:32000,max:10,xp:4600,bg:'day',desc:'기존 적 강화 부대 300%'},
 {name:'그리스',flag:'🇬🇷',hp:35000,max:5,xp:4900,bg:'day',desc:'보스 메탈 하마양 · 에이리언·신규 적 에이리뭉'},
 {name:'터키',flag:'🇹🇷',hp:30000,max:7,xp:5200,bg:'day',desc:'에이리언·신규 적 소라게게·에이리뭉'},
 {name:'두바이',flag:'🇦🇪',hp:40000,max:6,xp:5500,bg:'day',desc:'보스 스타레오파드 · 에이리언·신규 적 에이리뭉'},
 {name:'인도',flag:'🇮🇳',hp:50000,max:6,xp:5800,bg:'day',desc:'기존 적 강화 부대 400%'},
 {name:'네팔',flag:'🇳🇵',hp:45000,max:8,xp:6100,bg:'day',desc:'에이리언·신규 적 하앜마양'},
 {name:'태국',flag:'🇹🇭',hp:54000,max:8,xp:6400,bg:'day',desc:'에이리언·신규 적 에이리뭉'},
 {name:'캄보디아',flag:'🇰🇭',hp:60000,max:8,xp:6700,bg:'day',desc:'보스 날랄라라라방 · 에이리언·신규 적 하앜마양'},
 {name:'필리핀',flag:'🇵🇭',hp:65000,max:8,xp:7000,bg:'day',desc:'에이리언·신규 적 에이리뭉·스타레오파드'},
 {name:'싱가포르',flag:'🇸🇬',hp:80000,max:8,xp:7300,bg:'day',desc:'보스 놈놈놈 · 에이리언·신규 적 홍당무왕'},
 {name:'호주',flag:'🇦🇺',hp:75000,max:7,xp:7600,bg:'day',desc:'에이리언·신규 적 날랄라라라방'},
 {name:'심해의 소용돌이',flag:'🌀',hp:250000,max:10,xp:7900,bg:'abyss',desc:'보스 대머리군 · 에이리언·신규 적 에이리뭉·소라게게·스타레오파드 · 클리어 시 억제기 가동(에이리언 −100%)'},
 {name:'마다가스카르',flag:'🇲🇬',hp:100000,max:10,xp:8200,bg:'dusk',desc:'에이리언·신규 적 에이리뭉·하앜마양'},
 {name:'케냐',flag:'🇰🇪',hp:120000,max:8,xp:8500,bg:'dusk',desc:'보스 아거 · 에이리언·신규 적 블랙 고릴라저씨'},
 {name:'사우디아라비아',flag:'🇸🇦',hp:90000,max:9,xp:8800,bg:'dusk',desc:'에이리언·신규 적 스타레오파드·에이리뭉'},
 {name:'이집트',flag:'🇪🇬',hp:125000,max:10,xp:9100,bg:'dusk',desc:'에이리언·신규 적 날랄라라라방'},
 {name:'사하라사막',flag:'🏜️',hp:150000,max:8,xp:9400,bg:'dusk',desc:'보스 쿠만츄 · 에이리언·신규 적 하앜마양·에이리뭉'},
 {name:'가나',flag:'🇬🇭',hp:135000,max:6,xp:9700,bg:'dusk',desc:'에이리언·신규 적 천사 하마양·하앜마양·스타레오파드'},
 {name:'남아프리카',flag:'🇿🇦',hp:160000,max:7,xp:10000,bg:'dusk',desc:'에이리언·신규 적 에이리뭉·쿠만츄'},
 {name:'아르헨티나',flag:'🇦🇷',hp:150000,max:8,xp:10300,bg:'dusk',desc:'보스 쉐도우 복서 · 에이리언·신규 적 에이리뭉'},
 {name:'이스터섬',flag:'🗿',hp:175000,max:9,xp:10600,bg:'dusk',desc:'보스 대갈이군 · 에이리언·신규 적 홍당무왕·날랄라라라방'},
 {name:'마추픽추',flag:'🇵🇪',hp:160000,max:9,xp:10900,bg:'dusk',desc:'보스 날랄라라라방 · 에이리언·신규 적 아거리언'},
 {name:'콜롬비아',flag:'🇨🇴',hp:165000,max:9,xp:11200,bg:'dusk',desc:'에이리언·신규 적 블랙 고릴라저씨·천사 하마양'},
 {name:'자메이카',flag:'🇯🇲',hp:150000,max:6,xp:11500,bg:'night',desc:'에이리언·신규 적 소라게게·아거리언·스타레오파드'},
 {name:'멕시코',flag:'🇲🇽',hp:175000,max:8,xp:11800,bg:'night',desc:'에이리언·신규 적 에이리뭉·하앜마양·홍당무왕'},
 {name:'할리우드',flag:'🎬',hp:200000,max:8,xp:12100,bg:'night',desc:'보스 빅글래숭이 · 에이리언·신규 적 에이리뭉·아거리언'},
 {name:'라스베가스',flag:'🎰',hp:180000,max:9,xp:12400,bg:'night',desc:'에이리언·신규 적 쉐도우 복서'},
 {name:'알래스카',flag:'🏔️',hp:200000,max:10,xp:12700,bg:'night',desc:'에이리언·신규 적 에이리뭉·스타레오파드'},
 {name:'캐나다',flag:'🇨🇦',hp:195000,max:10,xp:13000,bg:'night',desc:'보스 날랄라라라방 · 에이리언·신규 적 에이리뭉·빅글래숭이'},
 {name:'그린란드',flag:'🇬🇱',hp:220000,max:6,xp:13300,bg:'night',desc:'에이리언·신규 적 쿠만츄'},
 {name:'뉴욕',flag:'🇺🇸',hp:250000,max:8,xp:13600,bg:'night',desc:'보스 엘리자베스 56세 · 에이리언·신규 적 에이리뭉'},
 {name:'NASA',flag:'🚀',hp:255000,max:8,xp:13900,bg:'night',desc:'보스 대머리군 · 에이리언·신규 적 에이리뭉·블랙 고릴라저씨'},
 {name:'버뮤다',flag:'🇧🇲',hp:265000,max:7,xp:13900,bg:'night',desc:'보스 쿠만츄 · 에이리언·신규 적 하앜마양·소라게게'},
 {name:'브라질',flag:'🇧🇷',hp:240000,max:8,xp:13900,bg:'night',desc:'에이리언·신규 적 빅글래숭이·아거리언·에이리뭉'},
 {name:'부유대륙',flag:'☁️',hp:750000,max:9,xp:14200,bg:'sky',desc:'보스 불칸 보어 · 에이리언·신규 적 천사 하마양·날랄라라라방·아거리언'},
 {name:'달',flag:'🌕',hp:300000,max:10,xp:14500,bg:'moon',desc:'보스 파괴생물 쿠오리넨 · 에이리언·신규 적 에이리뭉·하앜마양·아거리언 · 클리어 시 억제기 가동(에이리언 −100%)'}
];
const FUTURE_START=STAGES.length,FUTURE_XP_SCALE=4;
FUTURE_STAGES.forEach(t=>STAGES.push({name:t.name,flag:t.flag,hp:t.hp,gap:4,wave:0,...FUTURE_BG[t.bg],desc:t.desc,chapter:5,future:true,maxEnemies:t.max,xp:t.xp*FUTURE_XP_SCALE}));
const FUTURE_END=STAGES.length;
// Alien suppressors (억제기) stand in for the original Into the Future treasures (Aqua / Plasma Crystal): unstarred
// Aliens start at 700% and each suppressor takes off 100%. Chapter 1's are the Deep Sea Whirlpool (end of the
// Aqua Crystal half) and the Moon (end of the Plasma Crystal half), so a cleared Chapter 1 leaves them at 500%.
const ALIEN_BASE_MAG=7,ALIEN_SUPPRESSORS=[FUTURE_START+FUTURE_STAGES.findIndex(t=>t.name==='심해의 소용돌이'),FUTURE_END-1];
function alienSuppressed(){return ALIEN_SUPPRESSORS.filter(i=>cleared.includes(i)).length}
function alienMagnification(){return ALIEN_BASE_MAG-alienSuppressed()}
// Legend Story subchapters 2-5 (정열의 나라 · 글루코사민 사막 · 헤엄치는 고양이 · 캣츠아이; Korean names per 나무위키,
// stage data per battlecats-db, XP x4 like subchapter 1). Appended after the future chapter so saved stage indices
// stay put; legend stage k (0..37, the number stored in red-battle-legend-v1) maps to STAGES via legendIdx(k).
const LEGEND_STAGES2=[
 // 정열의 나라 · 글루코사민 사막 · 헤엄치는 고양이 · 캣츠아이 (battlecats-db 情熱の国~見つめてキャッツアイ)
 {name:'야옹달루시아',flag:'💃',hp:90000,max:4,xp:1140,sky:'#f7c873',land:'#c98a3f',desc:'메탈 하마양·멍뭉이·낼름이 (최대 400%)',drop:{speed:0.01}},
 {name:'빠에야 초원',flag:'🥘',hp:90000,max:4,xp:1140,sky:'#f7c873',land:'#c98a3f',desc:'고릴라저씨·멍뭉이·낼름이 (최대 400%)',drop:{speed:0.01}},
 {name:'플라멩코 구멍',flag:'⛏️',hp:95000,max:7,xp:1235,sky:'#f7c873',land:'#c98a3f',desc:'보스 나나나난나방 · 살의의 멍뭉이·멍뭉이·낼름이 (최대 400%)',drop:{xp:9750,xpChance:0.05}},
 {name:'샹그리아 강',flag:'🍷',hp:98000,max:6,xp:1330,sky:'#f7c873',land:'#c98a3f',desc:'보스 엘리자베스 2세 · 메에메에·메탈 하마양·멍뭉이 (최대 400%)',drop:{speed:0.01}},
 {name:'가스파초 고원',flag:'🍅',hp:100000,max:4,xp:1330,sky:'#f7c873',land:'#c98a3f',desc:'바다레오파드·돼지새끼·멍뭉이 (최대 400%)',drop:{nyan:0.01}},
 {name:'츄러스 나이트',flag:'🌙',hp:120000,max:4,xp:1330,sky:'#f7c873',land:'#c98a3f',desc:'보스 다람G · 하마양·재키펭·캥거류 (최대 400%)',drop:{speed:0.01}},
 {name:'메마른 정원',flag:'🌵',hp:150000,max:10,xp:1520,sky:'#f7c873',land:'#c98a3f',desc:'살의의 멍뭉이·멍뭉이·낼름이 (최대 400%)',drop:{xp:12000,xpChance:0.05}},
 {name:'타파스 사막',flag:'🏜️',hp:200000,max:10,xp:1900,sky:'#f7c873',land:'#c98a3f',desc:'보스 스승 · 아거·멍뭉이·낼름이 (최대 400%)',drop:{nyan:0.01}},
 {name:'콘드로이틴 사구',flag:'🏝️',hp:90000,max:4,xp:1235,sky:'#f3d9a0',land:'#d8b46a',desc:'하마양·재키펭·돼지새끼 (최대 400%)',drop:{xp:9750,xpChance:0.05}},
 {name:'세사민 유적',flag:'🏛️',hp:90000,max:4,xp:1330,sky:'#f3d9a0',land:'#d8b46a',desc:'엘리자베스 2세·멍뭉이·낼름이 (최대 400%)',drop:{speed:0.01}},
 {name:'이소플라본 동굴',flag:'🕳️',hp:95000,max:4,xp:1425,sky:'#f3d9a0',land:'#d8b46a',desc:'고릴라저씨·메에메에·살의의 멍뭉이 (최대 400%)'},
 {name:'카테킨 구릉',flag:'⛰️',hp:98000,max:7,xp:1425,sky:'#f3d9a0',land:'#d8b46a',desc:'메에메에·돼지새끼·엘리트래빗 (최대 400%)',drop:{speed:0.01}},
 {name:'리코펜의 노을',flag:'🌇',hp:100000,max:4,xp:1520,sky:'#f3d9a0',land:'#d8b46a',desc:'메에메에·빠옹·하마양 (최대 400%)',drop:{nyan:0.01}},
 {name:'프로폴리스 연못',flag:'🏞️',hp:120000,max:6,xp:1520,sky:'#f3d9a0',land:'#d8b46a',desc:'재키펭·된장 푸들·스승 (최대 400%)',drop:{xp:12000,xpChance:0.05}},
 {name:'펩타이드 설원',flag:'❄️',hp:150000,max:5,xp:1710,sky:'#f3d9a0',land:'#d8b46a',desc:'돼지새끼·바다레오파드·메탈 하마양 (최대 400%)'},
 {name:'히알루론산',flag:'🗻',hp:200000,max:50,xp:2280,sky:'#f3d9a0',land:'#d8b46a',desc:'보스 다람G · 살의의 멍뭉이·핫도그',drop:{nyan:0.01}},
 {name:'무모한 진수식',flag:'🚢',hp:95000,max:4,xp:1330,sky:'#7ccbe8',land:'#3f8fb5',desc:'하마양·다람G·스승 (최대 400%)',drop:{speed:0.01}},
 {name:'커다란 대해',flag:'🌊',hp:100000,max:8,xp:1425,sky:'#7ccbe8',land:'#3f8fb5',desc:'아거·된장 푸들·바다레오파드 (최대 400%)',drop:{xp:11250,xpChance:0.05}},
 {name:'인어의 후미',flag:'🧜',hp:110000,max:8,xp:1425,sky:'#7ccbe8',land:'#3f8fb5',desc:'아거·메에메에·고릴라저씨 (최대 400%)'},
 {name:'카오스 라군',flag:'🌀',hp:120000,max:11,xp:1520,sky:'#7ccbe8',land:'#3f8fb5',desc:'보스 엘리자베스 2세 · 아거·오리룰루·메탈 하마양 (최대 400%)',drop:{speed:0.01}},
 {name:'해적놀이',flag:'🏴‍☠️',hp:150000,max:8,xp:1520,sky:'#7ccbe8',land:'#3f8fb5',desc:'보스 다람G · 투뿔소·엘리트래빗·돼지새끼 (최대 400%)',drop:{nyan:0.01}},
 {name:'모순의 어장',flag:'🎣',hp:175000,max:4,xp:1615,sky:'#7ccbe8',land:'#3f8fb5',desc:'고릴라저씨·바다레오파드·핫도그 (최대 400%)',drop:{speed:0.01}},
 {name:'우뭇가사리 섬',flag:'🏝️',hp:180000,max:6,xp:1710,sky:'#7ccbe8',land:'#3f8fb5',desc:'곰선생·엘리트래빗·살의의 멍뭉이 (최대 400%)'},
 {name:'바닷물은 짜다',flag:'🧂',hp:200000,max:4,xp:2280,sky:'#7ccbe8',land:'#3f8fb5',desc:'보스 늘보보 · 된장 푸들·살의의 멍뭉이',drop:{xp:18000,xpChance:0.05}},
 {name:'사랑의 광석',flag:'💎',hp:95000,max:4,xp:1330,sky:'#5a4a6e',land:'#8a6f5a',desc:'아거·고릴라저씨·스승 (최대 400%)',drop:{xp:10500,xpChance:0.05}},
 {name:'섹시 종유동',flag:'🦇',hp:100000,max:10,xp:1425,sky:'#5a4a6e',land:'#8a6f5a',desc:'스승·오리룰루·멍뭉이 (최대 400%)',drop:{speed:0.01}},
 {name:'두근두근 구멍',flag:'💓',hp:150000,max:5,xp:1520,sky:'#5a4a6e',land:'#8a6f5a',desc:'보스 늘보보 · 재키펭·엘리자베스 2세·된장 푸들 (최대 400%)'},
 {name:'바디 라인',flag:'🪨',hp:200000,max:9,xp:1710,sky:'#5a4a6e',land:'#8a6f5a',desc:'오리룰루·핫도그·멍뭉이 (최대 400%)',drop:{speed:0.01}},
 {name:'가슴골',flag:'⛰️',hp:250000,max:8,xp:1805,sky:'#5a4a6e',land:'#8a6f5a',desc:'보스 대갈이군 · 살의의 멍뭉이·다람G·나나나난나방 (최대 400%)',drop:{nyan:0.01}},
 {name:'스릴의 대가',flag:'🎢',hp:500000,max:10,xp:2280,sky:'#5a4a6e',land:'#8a6f5a',desc:'보스 늘보보 · 스승·된장 푸들·두드리 (최대 400%)',drop:{xp:18000,xpChance:0.05}}
];
const BOOST_NAME={doctor:'고양이 박사',rich:'부자 고양이',sniper:'스냥이퍼'};
const UNIT_NAME_FALLBACK={baa:'메에메에',gory:'고릴라저씨',kangaroo:'캥거류',pigge:'돼지새끼',seal:'바다레오파드',leboin:'빠옹',rabbit:'엘리트래빗',squirrel:'다람G',rhino:'투뿔소',bear:'곰선생',face:'대갈이군'};
const LEGEND_SUBS=[{name:'전설의 시작',start:0,len:8},{name:'정열의 나라',start:8,len:8},{name:'글루코사민 사막',start:16,len:8},{name:'헤엄치는 고양이',start:24,len:8},{name:'캣츠아이',start:32,len:6},
 {name:'웨스턴 가도',start:38,len:8},{name:'참치 해역',start:46,len:8},{name:'수수께끼 섬',start:54,len:8},{name:'뿌니뿌니 종유동',start:62,len:8},{name:'볼케이노 화산',start:70,len:6},{name:'천 리 길',start:76,len:8},{name:'생선의 요새',start:84,len:8}];
const LEGEND2_START=STAGES.length;
LEGEND_STAGES2.forEach((t,j)=>STAGES.push({...t,gap:4,wave:0,chapter:4,legend:{k:8+j},maxEnemies:t.max}));
LEGEND_STAGES.push(...LEGEND_STAGES2);
// Weekday stages: 월 고양이 박사의 특강 · 수 부자 고양이의 금고 · 목 저격 훈련장 · 토일 주말 특별전 (화 광속 전사, 금 가시밭길 above).
// Each drops one of the battle boosts modelled on the original's battle items (고양이 박사 / 부자 고양이 / 스냥이퍼);
// the weekend stage drops all three and pays XP. Same 초급·중급·초상급 shape as 가시밭길 (초상급 after chapter 2).
const WEEKDAY_SETS=[
 {days:[1],key:'monday',title:'고양이 박사의 특강',flag:'📚',item:'doctor',sky:'#e6dcf5',land:'#a58fc9',bosses:['baa','gory','kangaroo'],hp:[12000,24000,60000]},
 {days:[3],key:'wednesday',title:'부자 고양이의 금고',flag:'💰',item:'rich',sky:'#fff1b8',land:'#d9b44a',bosses:['pigge','seal','leboin'],hp:[12000,24000,60000]},
 {days:[4],key:'thursday',title:'저격 훈련장',flag:'🎯',item:'sniper',sky:'#cfe8f2',land:'#6f9fb2',bosses:['rabbit','squirrel','rhino'],hp:[12000,24000,60000]},
 {days:[6,0],key:'weekend',title:'주말 특별전',flag:'🎉',item:'all',sky:'#ffd9e6',land:'#d98aa8',bosses:['gory','bear','face'],hp:[20000,40000,90000],xp:[3000,6000,12000]}
];
const WEEKDAY_TIERS=[{n:'초급',chance:.3,count:1},{n:'중급',chance:.6,count:1},{n:'초상급',chance:1,count:2}];
const WEEKDAY_START=STAGES.length;
WEEKDAY_SETS.forEach((set,si)=>WEEKDAY_TIERS.forEach((t,k)=>STAGES.push({name:set.title+' '+t.n,flag:set.flag,hp:set.hp[k],gap:4,wave:0,sky:set.sky,land:set.land,
 desc:`${UNIT_NAME_FALLBACK[set.bosses[k]]||set.bosses[k]} · ${set.item==='all'?'부스트 3종':BOOST_NAME[set.item]} ${Math.round(t.chance*100)}%${t.count>1?' ×'+t.count:''}${set.xp?' · XP '+set.xp[k]:''}`,
 chapter:'special',special:{chance:t.chance,count:t.count,item:set.item,xp:set.xp?.[k]},weekday:{set:si,k},maxEnemies:10})));
// Legend Story subchapters 6-12 (웨스턴 가도 … 생선의 요새; names per 나무위키, data per battlecats-db), legend stage k 38..91.
const LEGEND_STAGES3=[
  {name:'건맨의 석양',flag:'🤠',hp:120000,max:4,xp:1330,sky:'#f2c98a',land:'#b8834a',desc:'재키펭·돼지새끼·된장 푸들 (최대 800%)',drop:{speed:0.01}},
  {name:'카우보이 천국',flag:'🤠',hp:150000,max:4,xp:1425,sky:'#f2c98a',land:'#b8834a',desc:'보스 다람G · 엘리자베스 2세·오리룰루 (최대 200%)',drop:{speed:0.01}},
  {name:'방문객의 밤',flag:'🤠',hp:180000,max:5,xp:1520,sky:'#f2c98a',land:'#b8834a',desc:'보스 다람G · 홍당무왕·살의의 멍뭉이·놈놈놈 (최대 800%)'},
  {name:'마카로니 타운',flag:'🤠',hp:200000,max:4,xp:1520,sky:'#f2c98a',land:'#b8834a',desc:'메에메에·메탈 하마양·고릴라저씨 (최대 800%)',drop:{speed:0.01}},
  {name:'정처없는 휘파람',flag:'🤠',hp:230000,max:6,xp:1615,sky:'#f2c98a',land:'#b8834a',desc:'빠옹·하마양·재키펭 (최대 1600%)',drop:{nyan:0.01}},
  {name:'말라깽이 보디가드',flag:'🤠',hp:280000,max:5,xp:1615,sky:'#f2c98a',land:'#b8834a',desc:'보스 투뿔소 · 스승 (최대 1600%)',drop:{speed:0.01}},
  {name:'카우보이의 산',flag:'🤠',hp:350000,max:5,xp:1710,sky:'#f2c98a',land:'#b8834a',desc:'핫도그·된장 푸들·멍뭉이 (최대 800%)'},
  {name:'로데오 나이트',flag:'🤠',hp:400000,max:6,xp:2280,sky:'#f2c98a',land:'#b8834a',desc:'보스 셰익스피망 · 돼지새끼·투뿔소·놈놈놈 (최대 800%)',drop:{xp:18000,xpChance:0.05}},
  {name:'홍참치 해안',flag:'🐟',hp:200000,max:4,xp:1330,sky:'#8fd0f0',land:'#3f86b0',desc:'보스 악의제왕 야옹마 · 살의의 멍뭉이·멍뭉이·낼름이 (최대 800%)',drop:{speed:0.01}},
  {name:'싱싱 어장',flag:'🐟',hp:220000,max:16,xp:1425,sky:'#8fd0f0',land:'#3f86b0',desc:'하마양·스승·놈놈놈 (최대 800%)',drop:{xp:11250,xpChance:0.05}},
  {name:'블루오션',flag:'🐟',hp:250000,max:6,xp:1520,sky:'#8fd0f0',land:'#3f86b0',desc:'두드리·캥거류 (최대 800%)'},
  {name:'카르파쵸 바다',flag:'🐟',hp:300000,max:5,xp:1520,sky:'#8fd0f0',land:'#3f86b0',desc:'보스 샤이 보어 · 하마양·고릴라저씨·놈놈놈 (최대 800%)',drop:{speed:0.01}},
  {name:'배타적 경제수역',flag:'🐟',hp:350000,max:4,xp:1615,sky:'#8fd0f0',land:'#3f86b0',desc:'메탈 하마양·핫도그',drop:{nyan:0.01}},
  {name:'최종병기 참치',flag:'🐟',hp:400000,max:6,xp:1615,sky:'#8fd0f0',land:'#3f86b0',desc:'재키펭·살의의 멍뭉이·늘보보 (최대 800%)',drop:{speed:0.01}},
  {name:'냉동참치 전선',flag:'🐟',hp:500000,max:7,xp:1710,sky:'#8fd0f0',land:'#3f86b0',desc:'오리룰루·핫도그·된장 푸들 (최대 800%)',drop:{xp:13500,xpChance:0.05}},
  {name:'해체 쇼 동굴',flag:'🐟',hp:600000,max:4,xp:2470,sky:'#8fd0f0',land:'#3f86b0',desc:'보스 맴매 선생 · 돼지새끼·투뿔소·악의제왕 야옹마 (최대 800%)',drop:{nyan:0.01}},
  {name:'따끔따끔 고원',flag:'🎋',hp:250000,max:4,xp:1425,sky:'#bfe6b0',land:'#6fa35a',desc:'보스 샤이 보어 · 하마양·고릴라저씨·놈놈놈 (최대 800%)',drop:{speed:0.01}},
  {name:'죽순 해안',flag:'🎋',hp:260000,max:4,xp:1520,sky:'#bfe6b0',land:'#6fa35a',desc:'보스 투뿔소 · 아거·바다레오파드·스승 (최대 1600%)',drop:{xp:12000,xpChance:0.05}},
  {name:'살인귀 정글',flag:'🎋',hp:280000,max:4,xp:1520,sky:'#bfe6b0',land:'#6fa35a',desc:'두드리·멍뭉이·낼름이 (최대 800%)'},
  {name:'개굴개굴 늪',flag:'🎋',hp:300000,max:4,xp:1615,sky:'#bfe6b0',land:'#6fa35a',desc:'보스 메탈 하마양 · 오리룰루·쉐도우 복서·멍뭉이 (최대 1600%)',drop:{xp:77777,xpChance:0.01}},
  {name:'비죽비죽 갱도',flag:'🎋',hp:350000,max:4,xp:1615,sky:'#bfe6b0',land:'#6fa35a',desc:'고릴라저씨·살의의 멍뭉이·늘보보 (최대 800%)',drop:{nyan:0.01}},
  {name:'별들의 가도',flag:'🎋',hp:400000,max:8,xp:1710,sky:'#bfe6b0',land:'#6fa35a',desc:'보스 샤이 보어 · 된장 푸들·멍뭉이·낼름이 (최대 800%)',drop:{speed:0.01}},
  {name:'버섯 벼랑',flag:'🎋',hp:500000,max:10,xp:1805,sky:'#bfe6b0',land:'#6fa35a',desc:'보스 다람G · 살의의 멍뭉이·핫도그'},
  {name:'새벽 프런티어',flag:'🎋',hp:600000,max:8,xp:2280,sky:'#bfe6b0',land:'#6fa35a',desc:'보스 사순록 · 멍뭉이·낼름이·놈놈놈 (최대 800%)',drop:{xp:18000,xpChance:0.05}},
  {name:'밀키 터널',flag:'🦇',hp:300000,max:4,xp:1425,sky:'#6b6488',land:'#8f7f9e',desc:'살의의 멍뭉이·블랙 고릴라저씨·쉐도우 복서',drop:{xp:11250,xpChance:0.05}},
  {name:'푹신푹신 암흑 병기',flag:'🦇',hp:350000,max:8,xp:1520,sky:'#6b6488',land:'#8f7f9e',desc:'보스 홍당무왕 · 살의의 멍뭉이·멍뭉이 (최대 1200%)',drop:{speed:0.01}},
  {name:'악마의 벽화',flag:'🦇',hp:380000,max:4,xp:1520,sky:'#6b6488',land:'#8f7f9e',desc:'보스 셰익스피망 · 다람G·나나나난나방 (최대 800%)'},
  {name:'바람의 속삭임',flag:'🦇',hp:420000,max:6,xp:1615,sky:'#6b6488',land:'#8f7f9e',desc:'메에메에·부엉이 눈썹·블랙 고릴라저씨 (최대 800%)',drop:{speed:0.01}},
  {name:'아기 암살자',flag:'🦇',hp:450000,max:4,xp:1615,sky:'#6b6488',land:'#8f7f9e',desc:'스승·멍뭉이·낼름이 (최대 800%)',drop:{nyan:0.01}},
  {name:'당황한 바위',flag:'🦇',hp:480000,max:4,xp:1710,sky:'#6b6488',land:'#8f7f9e',desc:'보스 바다레오파드 · 하마양·아거·나나나난나방 (최대 10000%)',drop:{xp:13500,xpChance:0.05}},
  {name:'침수 동굴',flag:'🦇',hp:500000,max:4,xp:2090,sky:'#6b6488',land:'#8f7f9e',desc:'보스 다람G · 살의의 멍뭉이·블랙 고릴라저씨·쉐도우 복서'},
  {name:'뚱보 성선설',flag:'🦇',hp:600000,max:20,xp:2660,sky:'#6b6488',land:'#8f7f9e',desc:'보스 혹부리 낙타 · 다람G·하마양·재키펭 (최대 800%)',drop:{nyan:0.01}},
  {name:'반식욕 바위',flag:'🌋',hp:60000,max:4,xp:1520,sky:'#f29a6b',land:'#7a3b2a',desc:'보스 혹부리 낙타 · 하마양·돼지새끼·재키펭 (최대 800%)'},
  {name:'뜨끈뜨끈 간헐천',flag:'🌋',hp:500000,max:10,xp:1615,sky:'#f29a6b',land:'#7a3b2a',desc:'보스 셰익스피망 · 나나나난나방',drop:{xp:12750,xpChance:0.05}},
  {name:'걸쭉한 마그마',flag:'🌋',hp:400000,max:4,xp:1900,sky:'#f29a6b',land:'#7a3b2a',desc:'부엉이 눈썹·두드리·오리룰루',drop:{nyan:0.01}},
  {name:'불꽃의 우리',flag:'🌋',hp:999999,max:4,xp:1710,sky:'#f29a6b',land:'#7a3b2a',desc:'보스 엘리트래빗 · 재키펭·바다레오파드·샤이 보어 (최대 800%)',drop:{speed:0.01}},
  {name:'화구를 지키는 자',flag:'🌋',hp:200000,max:4,xp:2280,sky:'#f29a6b',land:'#7a3b2a',desc:'보스 맴매 선생 · 홍당무왕 (최대 600%)'},
  {name:'이글이글 칼데라',flag:'🌋',hp:999999,max:5,xp:3800,sky:'#f29a6b',land:'#7a3b2a',desc:'보스 코알락교 · 살의의 멍뭉이·엘리트래빗·멍뭉이 (최대 800%)',drop:{nyan:0.01}},
  {name:'포텐셜 로드',flag:'🛤️',hp:90000,max:4,xp:1520,sky:'#f6e2a8',land:'#c9a36a',desc:'메탈 하마양·멍뭉이·낼름이 (최대 1200%)',drop:{speed:0.01}},
  {name:'근심의 나무',flag:'🛤️',hp:90000,max:4,xp:1520,sky:'#f6e2a8',land:'#c9a36a',desc:'고릴라저씨·멍뭉이·낼름이 (최대 1200%)',drop:{speed:0.01}},
  {name:'산들바람의 노래',flag:'🛤️',hp:95000,max:7,xp:1615,sky:'#f6e2a8',land:'#c9a36a',desc:'보스 나나나난나방 · 살의의 멍뭉이·멍뭉이·낼름이 (최대 1200%)',drop:{xp:9750,xpChance:0.05}},
  {name:'철학의 길',flag:'🛤️',hp:98000,max:6,xp:1710,sky:'#f6e2a8',land:'#c9a36a',desc:'보스 엘리자베스 2세 · 메에메에·메탈 하마양·멍뭉이 (최대 1200%)',drop:{speed:0.01}},
  {name:'경계선의 만종',flag:'🛤️',hp:100000,max:4,xp:1710,sky:'#f6e2a8',land:'#c9a36a',desc:'바다레오파드·돼지새끼·멍뭉이 (최대 1200%)',drop:{nyan:0.01}},
  {name:'흘린 눈물의 강',flag:'🛤️',hp:120000,max:4,xp:1710,sky:'#f6e2a8',land:'#c9a36a',desc:'보스 다람G · 하마양·재키펭·캥거류 (최대 1200%)',drop:{speed:0.01}},
  {name:'빛나는 길',flag:'🛤️',hp:150000,max:10,xp:1900,sky:'#f6e2a8',land:'#c9a36a',desc:'살의의 멍뭉이·멍뭉이·낼름이 (최대 1200%)',drop:{xp:12000,xpChance:0.05}},
  {name:'시련의 협곡',flag:'🛤️',hp:200000,max:10,xp:2280,sky:'#f6e2a8',land:'#c9a36a',desc:'보스 스승 · 아거·멍뭉이·낼름이 (최대 1200%)',drop:{nyan:0.01}},
  {name:'바다의 속삭임',flag:'🏯',hp:90000,max:4,xp:1615,sky:'#9ad6e8',land:'#4f8fa8',desc:'하마양·재키펭·돼지새끼 (최대 1200%)',drop:{xp:9750,xpChance:0.05}},
  {name:'잔물결 아일랜드',flag:'🏯',hp:90000,max:4,xp:1710,sky:'#9ad6e8',land:'#4f8fa8',desc:'엘리자베스 2세·멍뭉이·낼름이 (최대 1200%)',drop:{speed:0.01}},
  {name:'문어의 바다',flag:'🏯',hp:95000,max:4,xp:1805,sky:'#9ad6e8',land:'#4f8fa8',desc:'고릴라저씨·메에메에·살의의 멍뭉이 (최대 1200%)'},
  {name:'포세이돈의 휴식',flag:'🏯',hp:98000,max:7,xp:1805,sky:'#9ad6e8',land:'#4f8fa8',desc:'메에메에·돼지새끼·엘리트래빗 (최대 1200%)',drop:{speed:0.01}},
  {name:'달빛 해변',flag:'🏯',hp:100000,max:4,xp:1900,sky:'#9ad6e8',land:'#4f8fa8',desc:'메에메에·빠옹·하마양 (최대 1200%)',drop:{nyan:0.01}},
  {name:'코랄 산호초',flag:'🏯',hp:120000,max:6,xp:1900,sky:'#9ad6e8',land:'#4f8fa8',desc:'재키펭·된장 푸들·스승 (최대 1200%)',drop:{xp:12000,xpChance:0.05}},
  {name:'달의 돛단배',flag:'🏯',hp:150000,max:5,xp:2090,sky:'#9ad6e8',land:'#4f8fa8',desc:'돼지새끼·바다레오파드·메탈 하마양 (최대 1200%)'},
  {name:'살육병기 멸치',flag:'🏯',hp:200000,max:50,xp:2660,sky:'#9ad6e8',land:'#4f8fa8',desc:'보스 다람G · 살의의 멍뭉이·핫도그 (최대 400%)',drop:{nyan:0.01}}
];
const LEGEND3_START=STAGES.length;
LEGEND_STAGES3.forEach((t,j)=>STAGES.push({...t,gap:4,wave:0,chapter:4,legend:{k:38+j},maxEnemies:t.max}));
LEGEND_STAGES.push(...LEGEND_STAGES3);
// 리본 오렌지 강림: always-open 초급·중급·상급 series (like the original's 강림 stages) that drops the EX 리본 오렌지
// (오렌지 아종). Boss 까치 도둑 (magpie) at 100/200/400%; 상급 after chapter 2; 고난도 after clearing 상급 once
// (first clear: 리본 오렌지 level cap +5). Clears of these stages are kept in red-battle-ribbon-v1.
const RIBBON_TIERS=[{n:'초급',hp:30000,chance:.1,xp:2000,mag:100,bossMag:100},{n:'중급',hp:80000,chance:.25,xp:5000,mag:150,bossMag:200},{n:'상급',hp:200000,chance:.5,xp:10000,mag:200,bossMag:400},
 {n:'고난도',hp:500000,chance:1,xp:20000,mag:300,bossMag:600,hard:true}];
const RIBBON_START=STAGES.length;
RIBBON_TIERS.forEach((t,k)=>STAGES.push({name:'리본 오렌지 강림 '+t.n,flag:'🎀',hp:t.hp,gap:4,wave:0,sky:'#ffe2c2',land:'#e89a4f',
 desc:t.hard?`보스 까치 도둑 ${t.bossMag}% ×3 · 첫 클리어 시 리본 오렌지 레벨 상한 +5 · XP ${t.xp}`:`보스 까치 도둑 ${t.bossMag}% · 리본 오렌지 ${Math.round(t.chance*100)}% · XP ${t.xp}`,
 chapter:'special',special:{chance:t.chance,count:1,item:t.hard?'ribboncap':'ribbonorange',xp:t.xp},ribbon:{k},maxEnemies:t.hard?15:12}));
let ribbonSave={clear:[],cap:false};
try{const v=JSON.parse(localStorage.getItem('red-battle-ribbon-v1')||'{}');if(Array.isArray(v.clear))ribbonSave.clear=v.clear.filter(Number.isInteger);ribbonSave.cap=v.cap===true}catch{}
function saveRibbon(){try{localStorage.setItem('red-battle-ribbon-v1',JSON.stringify(ribbonSave))}catch{}}
function ribbonTierOpen(k){return k<2||(k===2?cleared.includes(CH2_HAWAII):ribbonSave.clear.includes(2))}
function weekdayIdx(si,k){return WEEKDAY_START+si*WEEKDAY_TIERS.length+k}
function isWeekdayOpen(set){try{const q=new URLSearchParams(location.search);return set.days.includes(new Date().getDay())||q.has(set.key)}catch{return false}}
function legendIdx(k){return k<8?LEGEND_START+k:k<38?LEGEND2_START+k-8:LEGEND3_START+k-38}
function legendSubOf(k){return LEGEND_SUBS.findIndex(sc=>k>=sc.start&&k<sc.start+sc.len)}
function legendSubDone(sub,c){const sc=LEGEND_SUBS[sub];for(let k=sc.start;k<sc.start+sc.len;k++)if(!legendProgress[c].includes(k))return false;return true}
function legendSubCount(sub,c){const sc=LEGEND_SUBS[sub];return legendProgress[c].filter(k=>k>=sc.start&&k<sc.start+sc.len).length}
function isStoryStage(i){return i<MAIN_STAGE_COUNT||(i>=FUTURE_START&&i<FUTURE_END)}
function isChainEnd(i){return i===MAIN_STAGE_COUNT-1||i===FUTURE_END-1}
let selectedStage=0,cleared=[];
try{const saved=JSON.parse(localStorage.getItem('red-battle-progress-v1')||'[]');if(Array.isArray(saved))cleared=[...new Set(saved.filter(x=>Number.isInteger(x)&&x>=0&&isStoryStage(x)))]}catch{}
function saveProgress(){try{localStorage.setItem('red-battle-progress-v1',JSON.stringify(cleared))}catch{}}
let legendCrown=1,legendProgress={1:[],2:[],3:[],4:[]};
try{const saved=JSON.parse(localStorage.getItem('red-battle-legend-v1')||'{}');for(const c of [1,2,3,4])if(Array.isArray(saved[c]))legendProgress[c]=[...new Set(saved[c].filter(k=>Number.isInteger(k)&&k>=0&&k<92))]}catch{}
function saveLegend(){try{localStorage.setItem('red-battle-legend-v1',JSON.stringify(legendProgress))}catch{}}
function legendOpen(){return cleared.includes(CHAPTER1_LEN-1)}
function legendCrownUnlocked(c,sub=legendSub-1){return c===1||legendSubDone(Math.max(0,sub),c-1)}
function legendSubOpen(sub){return sub===0?legendOpen():legendSubDone(sub-1,1)}// the next subchapter opens once the previous one is cleared on ★1
function legendStageUnlocked(k,c=legendCrown){const sub=legendSubOf(k);return legendSubOpen(sub)&&legendCrownUnlocked(c,sub)&&(k===LEGEND_SUBS[sub].start||legendProgress[c].includes(k-1)||legendProgress[c].includes(k))}
function stageBaseHp(i){return STAGES[i].hp}
function isUnlocked(i){return i===0||cleared.includes(i===FUTURE_START?MAIN_STAGE_COUNT-1:i-1)||cleared.includes(i)}
function chapterOf(i){return STAGES[i]?.chapter||1}
// Difficulty stars (★1-5) on stage cards (legend subchapter cards show the rounded average of their stages at 👑1): score = log10 of the toughest spawn's sqrt(HP x DPS), both scaled by the stage
// magnification x the chapter / crown multiplier; thresholds put 세계편 1장 at ★1-2 and late legend / 미래편 at ★4-5.
const STAR_STEPS=[2.4,2.9,3.5,4.2];
function stageScore(i,crown=legendCrown){const st=STAGES[i],c=st.chapter,g=c===2?1.5:c===3?4:c===4?LEGEND_CROWN_MULT[crown-1]:1;let best=1;
 for(const r of STAGE_SPAWNS[i]||[]){const d=data.units[r.type];if(!d)continue;const m=(r.mag||100)/100*g;best=Math.max(best,m*Math.sqrt(d.hp*d.atk*(d.multiHit||1)/Math.max(.3,d.interval||1)))}
 return Math.log10(best)}
function stageStars(i,crown){const v=stageScore(i,crown);return 1+STAR_STEPS.filter(x=>v>=x).length}
function starText(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function starHTML(n){return `<span class="stage-stars" title="난이도 ${n} / 5">${starText(n)}</span>`}
function enemyMagnification(){const c=chapterOf(selectedStage);return c===2?1.5:c===3?4:c===4?LEGEND_CROWN_MULT[legendCrown-1]:1}
const RHINO_SHEET='assets/rhino_sheet.png';
const BEAR_SHEET='assets/bear_sheet.png';
const FACE_SHEET='assets/face_sheet.png?v=2';
// Reserved for the Norway expansion: user-supplied Elite Rabbit spritesheet.
const ELITE_RABBIT_SHEET='assets/elite_rabbit_sheet.png';
// Reserved user-supplied enemy sheets for the next Empire of Cats expansion.
const SQUIRREL_G_SHEET='assets/squirrel_g_sheet.png';
const KANG_ROO_SHEET='assets/kang_roo_sheet.png?v=2';
const data={bases:{ally:{hp:2000,max:2000,x:90},enemy:{hp:1000,max:1000,x:10}},units:{cyan:{"hp": 180, "atk": 200, "interval": 3.4, "speed": 4.3, "range": 30, "cost": 260, "cooldown": 9, "knockbacks": 3, "projectile": true, "splash": 0.5, "flight": 0.6, "floatStrong": true},blue:{"hp": 240, "atk": 38, "interval": 0.4, "speed": 13, "range": 4, "cost": 140, "evoCost": 500, "cooldown": 3, "knockbacks": 3, "attackDuration": 0.3},purple:{"hp": 600, "atk": 90, "interval": 1.6, "speed": 5, "range": 6, "cost": 230, "cooldown": 6, "knockbacks": 3, "projectile": true, "splash": 1.5, "redStrong": true},peng:{"hp": 1300, "atk": 80, "interval": 0.8, "speed": 7, "range": 5, "reward": 180, "knockbacks": 3, "attackDuration": 0.55, "windup": 0.26666666666666666},gory:{"hp": 1000, "atk": 80, "interval": 0.5333333333333333, "speed": 8, "range": 5, "reward": 220, "knockbacks": 3, "attackDuration": 0.5, "windup": 0.26666666666666666, "area": true},baa:{"hp": 800, "atk": 50, "interval": 1.1, "speed": 4.5, "range": 3.7, "reward": 100, "knockbacks": 3, "attackDuration": 0.8, "windup": 0.4666666666666667},seal:{"hp": 2500, "atk": 150, "interval": 0.7666666666666667, "speed": 5, "range": 5.7, "reward": 450, "knockbacks": 1, "attackDuration": 0.6, "windup": 0.26666666666666666, "area": true, "trait": "red"},croco:{"hp": 70, "atk": 30, "interval": 0.6, "speed": 7.5, "range": 3.7, "reward": 30, "knockbacks": 1, "attackDuration": 0.5, "windup": 0.26666666666666666},red:{hp:450,atk:15,interval:1.2,speed:6,range:4.5,cost:30,evoCost:75,cooldown:2,knockbacks:3},orange:{hp:220,atk:100,interval:2.4,speed:4.5,range:16,cost:200,cooldown:6.5,knockbacks:3,projectile:true,splash:3.5},yellow:{hp:999,atk:50,interval:1.8,speed:5,range:4,cost:125,cooldown:5,knockbacks:1},green:{hp:280,atk:65,interval:2.8,speed:5.5,range:12,cost:235,cooldown:7,knockbacks:3,boomerang:true},dog:{hp:200,atk:50,interval:1.4,speed:5,range:4,reward:40,knockbacks:3},snache:{hp:220,atk:85,interval:1.1,speed:7,range:4,reward:70,knockbacks:3},guys:{hp:420,atk:120,interval:1,speed:4.8,range:4.2,reward:110,knockbacks:1,attackDuration:.9},pigge:{trait:"red",hp:2400,atk:130,interval:1.8,speed:2.5,range:5,reward:400,knockbacks:2,attackDuration:28/30,windup:14/30,area:true},hippo:{hp:1600,atk:150,interval:2.2,speed:2.8,range:5,reward:200,knockbacks:1,attackDuration:.8,area:true}},income:[{max:1000,rate:20,cost:100},{max:1300,rate:28,cost:150},{max:1700,rate:38,cost:220},{max:2200,rate:50,cost:320},{max:2800,rate:65,cost:450},{max:3600,rate:85,cost:null}]};
data.units.leboin={hp:4000,atk:654,interval:187/30,speed:2.5,range:13.5,reward:650,knockbacks:1,attackDuration:.9,windup:8/30,area:true};
const MOOTH_SHEET='assets/mooth_sheet.png';
data.units.rabbit={trait:"red",hp:320,atk:60,interval:41/30,speed:9,range:4,reward:70,knockbacks:3,attackDuration:16/30,windup:12/30};
data.units.squirrel={hp:300,atk:45,interval:16/30,speed:8.5,range:4.2,reward:85,knockbacks:3,attackDuration:16/30,windup:8/30};
// Kang Roo's 250 is split 213/12/25 over three punches at 2f/8f/16f (share of atk, so Chapter 2's x1.5 still applies).
data.units.kangaroo={hp:4000,atk:250,interval:36/30,speed:10,range:5.5,reward:700,knockbacks:1,attackDuration:.85,windup:2/30,hits:[{at:2/30,share:213/250},{at:8/30,share:12/250},{at:16/30,share:25/250}]};
data.units.mooth={trait:"floating",hp:5000,atk:300,interval:88/30,speed:3.2,range:12,reward:850,knockbacks:1,attackDuration:1.6,windup:34/30,area:true};
data.units.pink={hp:520,atk:125,interval:1.9,speed:6,range:23,engageRange:4.5,cost:260,cooldown:7,knockbacks:3,attackDuration:.7,windup:.3,area:true};
data.units.rhino={hp:5200,atk:420,interval:2.1,speed:5.5,range:5.2,reward:900,knockbacks:2,attackDuration:.9,windup:.45,area:true};
data.units.bear={hp:6500,atk:520,interval:2.4,speed:4.5,range:8.5,reward:1050,knockbacks:10,attackDuration:1,windup:.5,area:true};
data.units.face={trait:"floating",hp:18000,atk:850,interval:3.4,speed:1.8,range:14,reward:2500,knockbacks:3,attackDuration:1.2,windup:.65,area:true};
// Legend Story enemies, drawn from the variant sheets kept alongside the Doge / Snache art.
// Metal Hippoe (wiki): same art/frames as Hippoe; the metal trait takes 1 damage from non-critical hits.
data.units.metalhippo={trait:'metal',hp:128,atk:300,interval:.6,speed:2.8,range:5,reward:200,knockbacks:2,attackDuration:.5,area:true};
// St. Pigge the 2nd / 엘리자베스 2세 (wiki): Pigge's exact art plus a crown part worn on the head.
data.units.stpigge={trait:'red',hp:64000,atk:600,interval:22/30,speed:5.6,range:5,reward:300,knockbacks:4,attackDuration:22/30,windup:14/30,area:true};
// 맴매 선생 / Teacher Bun Bun (wiki: HP 99,999 · atk 2,250 · 31f · range 200 area · speed 23 · 10 KB · floating).
// Art is assembled from the part sheet 024_e.png into bunbun_frames.png (fitted to E_024.png).
data.units.bunbun={trait:'floating',hp:99999,atk:2250,interval:31/30,speed:11.5,range:6.5,reward:3000,knockbacks:10,attackDuration:.8,windup:.4,area:true};
// 악의제왕 야옹마 / Dark Emperor Nyandam (wiki). Art is assembled from the part sheet 023_e.png into nyandam_frames.png.
data.units.nyandam={trait:'red',hp:160000,atk:2700,interval:463/30,speed:1.4,range:15.6,reward:3000,knockbacks:3,attackDuration:1.2,windup:.7,area:true};
// 살의의 멍뭉이 / Doge Dark (wiki): Black enemy, single attack with a long 41-frame foreswing, 8 knockbacks. Range 110/20; speed is a rough rescale of the wiki's 30.
data.units.darkdog={trait:'black',notBoss:true,hp:5000,atk:2000,interval:1.5,speed:12,range:5.5,reward:400,knockbacks:8,attackDuration:1.5,windup:41/30};
data.units.gabriel={trait:'angel',hp:600,atk:70,interval:1.2,speed:12,range:4,reward:130,knockbacks:3};
data.units.ectosnache={hp:1100,atk:150,interval:1.1,speed:8,range:4.5,reward:180,knockbacks:3};
// Into the Future (미래편) enemies. Aliens (에이리언) appear at 100% in Chapter 1 (times the alien base, 700% until
// suppressors lower it) while the regular roster is
// boosted to 200~600%, so their base stats sit at that level. Gory Dark / Shadow Boxer K are black, Shy Boy red,
// Heavenly Hippoe an angel.
data.units.shibalien={trait:'alien',hp:1600,atk:250,interval:1.4,speed:6,range:4,reward:160,knockbacks:3,attackDuration:0.6,windup:0.267};
data.units.kroxo={trait:'alien',hp:2400,atk:220,interval:.8,speed:7,range:3.7,reward:300,knockbacks:3,attackDuration:.5,windup:.27};
data.units.hyppoh={trait:'alien',hp:14000,atk:900,interval:2.2,speed:2.8,range:5,reward:600,knockbacks:2,attackDuration:.8,windup:.4,area:true};
data.units.sael={trait:'alien',hp:30000,atk:1200,interval:1.4,speed:4,range:6,reward:1000,knockbacks:2,attackDuration:.8,windup:.5,area:true};
data.units.maawth={trait:'alien',hp:12000,atk:800,interval:2,speed:8,range:5,reward:700,knockbacks:3,attackDuration:.8,windup:.5};
data.units.lemurr={trait:'alien',hp:20000,atk:1500,interval:1.6,speed:5,range:5,reward:900,knockbacks:3,attackDuration:0.5,windup:0.3,area:true};
data.units.krabbe={trait:'alien',hp:40000,atk:1000,interval:2,speed:2,range:4.5,reward:900,knockbacks:2,attackDuration:0.4,windup:0.2,area:true};
data.units.phace={trait:'alien',hp:300000,atk:6000,interval:4,speed:1.8,range:14,reward:4000,knockbacks:3,attackDuration:1.2,windup:.65,area:true};
data.units.ursamajor={trait:'alien',hp:80000,atk:3000,interval:2.4,speed:4.5,range:8.5,reward:2500,knockbacks:5,attackDuration:0.3,windup:0.133,area:true};
data.units.clione={trait:'alien',hp:600000,atk:8000,interval:4.833,speed:3,range:10,reward:6000,knockbacks:3,attackDuration:4.833,windup:2.367,area:true};
data.units.nimoy={trait:'alien',hp:500000,atk:5000,interval:3,speed:4,range:7,reward:5000,knockbacks:3,attackDuration:0.367,windup:0.267,area:true};
data.units.liz56={trait:'alien',hp:150000,atk:2000,interval:1.5,speed:5.6,range:5,reward:3000,knockbacks:4,attackDuration:.8,windup:.45,area:true};
data.units.shyboy={trait:'red',hp:30000,atk:1500,interval:3.4,speed:1.8,range:14,reward:1500,knockbacks:3,attackDuration:1.2,windup:.65,area:true};
data.units.gorydark={trait:'black',hp:12000,atk:600,interval:16/30,speed:8,range:5,reward:500,knockbacks:3,attackDuration:.5,windup:.27,area:true};
data.units.shadowboxer={trait:'black',hp:40000,atk:1500,interval:1.5,speed:8,range:4,reward:1000,knockbacks:3,attackDuration:.6,windup:.3};
data.units.heavenlyhippoe={trait:'angel',hp:6000,atk:600,interval:2.2,speed:6,range:5,reward:400,knockbacks:1,attackDuration:.8,windup:.4,area:true};
// Legend Story subchapter 2-5 enemies (frames assembled from the game sheets on the Battle Cats Wiki; THE SLOTH from its idle GIF).
// Legend Story subchapter 6-12 enemies: original stats with the game's own ratios (HP/ATK x1, speed x0.536 (capped 40),
// range x0.034, money x0.55). castleMult: damage to the cat base x4 (원작 '성 공격 4배'); wave: Kory's Lv4 surge reach.
data.units.jkbunbun={traits:['red','floating'],hp:400000,atk:9287,interval:1.033,speed:12.33,range:6.8,reward:1100,knockbacks:5,attackDuration:1.033,windup:0.667,area:true};
data.units.bore={trait:'red',hp:400000,atk:4837,interval:0.367,speed:7.5,range:4.4,reward:1155,knockbacks:2,attackDuration:0.367,windup:0.267,area:true};
data.units.raind={hp:90000,atk:4547,interval:1.367,speed:13.4,range:10.2,reward:440,knockbacks:20,attackDuration:1.367,windup:0.667,area:true};
data.units.owlbrow={trait:'floating',hp:10000,atk:3000,interval:3.867,speed:7.5,range:11.6,reward:440,knockbacks:1,attackDuration:3.867,windup:1.467,area:true};
data.units.assassinbear={trait:'black',hp:550,atk:3000,interval:0.267,speed:40,range:27.2,reward:1,knockbacks:1,attackDuration:0.267,windup:0.2,area:true};
data.units.camelle={hp:100000,atk:2637,interval:1.567,speed:4.29,range:18.7,reward:495,knockbacks:2,attackDuration:1.567,windup:0.367,area:true,castleMult:4};
data.units.kory={hp:120000,atk:1400,interval:2,speed:3.75,range:6.8,reward:495,knockbacks:5,attackDuration:1,windup:0.7,area:true,castleMult:4,wave:{chance:1,reach:36.3}};
// 까치 도둑 (오리지널 보스, 리본 오렌지 강림): 보석 보따리를 휘두르는 떠 있는 적 · 범위 · 성에 2배 피해. Base stats at 100%.
data.units.magpie={trait:'floating',hp:20000,atk:800,interval:3.5,speed:4,range:6,reward:1500,knockbacks:3,area:true,castleMult:2,attackDuration:1.3,windup:.6};
data.units.mastera={hp:60000,atk:2500,interval:3,speed:3,range:8,reward:2500,knockbacks:3,attackDuration:0.8,windup:0.033,area:true};
data.units.celeboodle={hp:4000,atk:400,interval:1.5,speed:10,range:4,reward:300,knockbacks:3,attackDuration:1.367,windup:0.567};
data.units.dagshund={hp:15000,atk:1200,interval:3,speed:4,range:6,reward:800,knockbacks:2,attackDuration:1.667,windup:0.433,area:true};
data.units.duche={hp:3000,atk:300,interval:1.2,speed:8,range:5,reward:300,knockbacks:3,attackDuration:1.1,windup:0.4};
data.units.sloth={hp:200000,atk:5000,interval:5,speed:1.5,range:10,reward:5000,knockbacks:3,attackDuration:2.533,windup:0.9,area:true};
data.units.otta={hp:20000,atk:2000,interval:2.5,speed:5,range:4,reward:1000,knockbacks:3,attackDuration:0.767,windup:0.467,area:true};
const CRIMSON_SHEET='assets/unitcrimson_ally-sprite.png';
const CRIMSON_EVOLVED_SHEET='assets/crimson_evolved.webp';
const GOLD_SHEET='assets/unitgold_ally-sprite.webp';
const GOLD_EVOLVED_SHEET='assets/gold_evolved.webp';
const IVORY_SHEET='assets/unitivory_ally-sprite.webp';
const IVORY_EVOLVED_SHEET='assets/ivory_evolved.webp';
const CHARTREUSE_SHEET='assets/unitchartreuse_ally-sprite.png';
const CHARTREUSE_EVOLVED_SHEET='assets/chartreuse_evolved.webp';
const MINT_SHEET='assets/unitmint_ally-sprite.png';
const MINT_EVOLVED_SHEET='assets/mint_evolved.webp';
const AZURE_SHEET='assets/unitazure_ally-sprite.png';
const AZURE_EVOLVED_SHEET='assets/azure_evolved.webp';
const CRYSTAL_SHEET='assets/unitcrystal_ally-sprite.png';
const CRYSTAL_EVOLVED_SHEET='assets/crystal_evolved.webp';
const LAVENDER_SHEET='assets/unitlavender_ally-sprite.png';
const LAVENDER_EVOLVED_SHEET='assets/lavender_evolved.webp';
const SALMON_SHEET='assets/unitsalmon_ally-sprite.png';
const SALMON_EVOLVED_SHEET='assets/salmon_evolved.webp';
const RASPBERRY_SHEET='assets/unitraspberry_ally-sprite.png';
const RASPBERRY_EVOLVED_SHEET='assets/raspberry_evolved.webp';
// 오닉스 (onyx #353839): original character, the chapter-2 Moon reward. Art generated for this game.
const ONYX_SHEET='assets/onyx_sheet.webp',ONYX_EVOLVED_SHEET='assets/onyx_evolved.webp',ONYX_PROFILE='assets/onyx_profile.webp';
data.units.crimson={hp:900,atk:650,interval:2.8,speed:5,range:7,cost:300,cooldown:10,knockbacks:3,forceKnockback:true,critChance:.1,critMult:2};
data.units.gold={hp:718,atk:215,interval:3.6,speed:5,range:21,cost:425,cooldown:15,knockbacks:3,multiHit:3};
data.units.ivory={hp:650,atk:380,interval:3,speed:5,range:20,cost:430,cooldown:13,knockbacks:3,area:true,slowChance:.4,slowDuration:2};
data.units.chartreuse={hp:600,atk:95,interval:2.4,speed:5,range:16,cost:380,cooldown:12,knockbacks:3,multiHit:5};
data.units.mint={hp:650,atk:340,interval:3.4,speed:5,range:17.5,cost:480,cooldown:14,knockbacks:3,area:true,freezeChance:.25,freezeDuration:1.5};
data.units.azure={hp:800,atk:520,interval:3.2,speed:6.5,range:9,cost:400,cooldown:14,knockbacks:2,dash:true};
data.units.crystal={hp:700,atk:460,interval:3.8,speed:5,range:22.5,cost:450,cooldown:16,knockbacks:3,pierce:3,critChance:.15,critMult:2,floatStrong:true};
data.units.lavender={hp:500,atk:260,interval:4,speed:5,range:23.5,cost:450,cooldown:15,knockbacks:3,area:true,atkDownPct:.5,atkDownChance:.4,atkDownDuration:4};
data.units.salmon={hp:585,atk:559,interval:4.2,speed:5,range:26,cost:475,cooldown:17,knockbacks:3,pull:true};
data.units.raspberry={hp:490,atk:552,interval:4.5,speed:3,range:30,cost:500,cooldown:18,knockbacks:3,windup:.8,critChance:.1,critMult:2,damageTiers:[{max:10,dmg:552},{max:17.5,dmg:920},{max:25,dmg:1471},{max:999,dmg:1962}]};
data.units.onyx={hp:2784,atk:1624,interval:3.4,speed:4.5,range:8,cost:900,cooldown:30,knockbacks:3,area:true,bossDamage:1.5,attackDuration:.9,windup:.45};
// 레어 14종 (정식 1): 세계편 3장 스테이지 클리어로 해금. 특성 대응 메즈/엄강/맷집 + 양산형 딜러.
data.units.black={hp:890,atk:245,interval:1.8,speed:5,range:9,cost:350,cooldown:12,knockbacks:3,massiveVs:['black'],attackDuration:.6,windup:.2};
data.units.white={hp:500,atk:60,interval:1,speed:6,range:7,cost:100,cooldown:3,knockbacks:3,attackDuration:.6,windup:.2};
data.units.maroon={hp:530,atk:236,interval:3.4,speed:5,range:22,cost:325,cooldown:12,knockbacks:3,slowChance:.4,slowDuration:2,statusVs:['red'],attackDuration:.6,windup:.2};
data.units.brown={hp:1226,atk:134,interval:1.4,speed:5,range:4,cost:200,cooldown:8,knockbacks:3,resistVs:['angel'],attackDuration:.6,windup:.2};
data.units.tan={hp:550,atk:170,interval:2.8,speed:5,range:10,cost:300,cooldown:11,knockbacks:3,area:true,slowChance:.5,slowDuration:2.5,statusVs:['angel'],attackDuration:.6,windup:.2};
data.units.beige={hp:700,atk:300,interval:3,speed:5,range:6,cost:350,cooldown:13,knockbacks:3,area:true,freezeChance:.25,freezeDuration:1.5,statusVs:['black'],attackDuration:.6,windup:.2};
data.units.cream={hp:794,atk:170,interval:2,speed:5,range:8,cost:300,cooldown:10,knockbacks:3,slowChance:.4,slowDuration:2,statusVs:['black'],attackDuration:.6,windup:.2};
data.units.olive={hp:600,atk:160,interval:2.2,speed:5,range:8,cost:310,cooldown:10,knockbacks:3,area:true,atkDownPct:.5,atkDownChance:.5,atkDownDuration:3,statusVs:['floating'],attackDuration:.6,windup:.2};
data.units.clover={hp:566,atk:248,interval:3.4,speed:5,range:20,cost:325,cooldown:12,knockbacks:3,atkDownPct:.5,atkDownChance:.5,atkDownDuration:3,statusVs:['black'],attackDuration:.6,windup:.2};
data.units.indigo={hp:560,atk:247,interval:3.2,speed:5,range:20,cost:350,cooldown:13,knockbacks:3,freezeChance:.3,freezeDuration:1.5,statusVs:['floating'],attackDuration:.6,windup:.2};
data.units.lilac={hp:550,atk:180,interval:2.8,speed:5,range:14,cost:390,cooldown:11,knockbacks:3,area:true,slowChance:.4,slowDuration:2,statusVs:['floating'],attackDuration:.6,windup:.2};
data.units.hotpink={hp:493,atk:219,interval:3.4,speed:5,range:20,cost:300,cooldown:11,knockbacks:3,atkDownPct:.5,atkDownChance:.5,atkDownDuration:3,statusVs:['red'],attackDuration:.6,windup:.2};
data.units.ruby={hp:600,atk:260,interval:3,speed:5,range:12,cost:425,cooldown:12,knockbacks:3,area:true,freezeChance:.25,freezeDuration:1.5,statusVs:['red'],attackDuration:.6,windup:.2};
// EX 가넷: 레전드 스토리 1장 올클리어 30% 드롭 · 살아남는다 + 검은 적 엄강 · Lv.20 체력 10만 / 공격력 16,000 (3장 빠옹 한 방)
data.units.garnet={hp:3825,atk:1974,interval:3.2,speed:5,range:5,cost:900,cooldown:30,knockbacks:4,strongVs:['black'],survive:.3,attackDuration:1,windup:.45};
// 울슈레 프리즘: 원거리 범위 · 선딜 길고 맞은 적을 밀치기 · 인식 범위 28, 타격 구간 10~40 (처음 설계 400 / 250~550 ÷ 20 = 20 / 12.5~27.5에서 확대)
data.units.prism={hp:1000,atk:3600,interval:5.4,speed:5,range:28,zoneMin:10,zoneMax:40,cost:4000,flatCost:true,cooldown:25,knockbacks:3,area:true,push:7,attackDuration:1,windup:.6};
// 울슈레 레인보우 (시즌 2, 두 번째 울슈레): 모든 속성 적에게 초데미지(×3) · 범위 · 인식 거리 50 / 타격 구간 0~52.5 (원작 1000 / 0~1050 ÷ 20) · 사각지대 없음 · 서포터 능력 없음
data.units.rainbow={hp:1000,atk:1550,interval:4,speed:5,range:50,zoneMin:0,zoneMax:52.5,cost:4000,flatCost:true,cooldown:25,knockbacks:3,area:true,attackClass:'범위',noRangeGrow:true,massiveVs:['red','floating','metal','black','angel','alien'],attackDuration:1,windup:.5};
// SR 12명 (뽑기 전용, 2진 없음): 능력은 하나씩, 확률은 아주 가끔/가끔/자주로 설명
data.units.plum={hp:511,atk:341,interval:4.4,speed:5,range:38,cost:550,cooldown:20,knockbacks:3,atkDownPct:.5,atkDownChance:.5,atkDownDuration:5,statusVs:['angel'],attackDuration:.8,windup:.35};
data.units.forest={hp:1498,atk:649,interval:2.2,speed:5,range:5,cost:450,cooldown:15,knockbacks:3,strongVs:['angel'],attackDuration:.8,windup:.35};
data.units.canary={hp:600,atk:480,interval:3.4,speed:5,range:14,cost:575,cooldown:18,knockbacks:3,area:true,freezeChance:.3,freezeDuration:1.5,statusVs:['angel'],attackDuration:.8,windup:.35};
data.units.cherry={hp:787,atk:731,interval:2,speed:5,range:6,cost:500,cooldown:14,knockbacks:3,extremeVs:['angel'],attackDuration:.8,windup:.35};
data.units.mauve={hp:703,atk:486,interval:3.6,speed:5,range:24,cost:550,cooldown:18,knockbacks:3,freezeChance:.3,freezeDuration:1.5,statusVs:['floating'],attackDuration:.8,windup:.35};
data.units.khaki={hp:420,atk:520,interval:3,speed:5,range:28,cost:500,cooldown:16,knockbacks:3,massiveVs:['floating'],attackDuration:.8,windup:.35};
data.units.tangerine={hp:900,atk:380,interval:3,speed:5,range:12,cost:635,cooldown:17,knockbacks:3,area:true,slowChance:.5,slowDuration:3,statusVs:['red'],attackDuration:.8,windup:.35};
data.units.burgundy={hp:1212,atk:617,interval:2,speed:5,range:5,cost:450,cooldown:15,knockbacks:3,strongVs:['red'],attackDuration:.8,windup:.35};
data.units.mustard={hp:1000,atk:520,interval:3.2,speed:5,range:7,cost:620,cooldown:18,knockbacks:3,area:true,massiveVs:['red'],attackDuration:.8,windup:.35};
data.units.sky={hp:615,atk:492,interval:3.4,speed:5,range:26,cost:525,cooldown:17,knockbacks:3,freezeChance:.3,freezeDuration:1.5,statusVs:['black'],attackDuration:.8,windup:.35};
data.units.denim={hp:990,atk:594,interval:2.4,speed:5,range:8,cost:450,cooldown:14,knockbacks:3,strongVs:['black'],attackDuration:.8,windup:.35};
data.units.charcoal={hp:480,atk:420,interval:3,speed:5,range:22,cost:500,cooldown:16,knockbacks:3,intervalUpChance:.5,intervalUpMult:1.5,intervalUpDuration:4,statusVs:['black'],attackDuration:.8,windup:.35};
// 직업 SR 4명 (뽑기 전용): 우주인=길리먼 블루, 요리사=그레이프프루트 펄프, 해적 선장=아틀라스 레드, 로봇=베르디그리
data.units.cornflower={hp:500,atk:700,interval:3.2,speed:5,range:22,cost:550,cooldown:18,knockbacks:3,freezeChance:.35,freezeDuration:1.5,statusVs:['alien'],massiveVs:['alien'],hiddenAbility:true,attackDuration:.8,windup:.35};
data.units.bittersweet={hp:700,atk:600,interval:2.4,speed:5,range:7,cost:450,cooldown:15,knockbacks:3,critChance:.4,critMult:2,attackDuration:.8,windup:.35};
data.units.claret={hp:450,atk:480,interval:3.4,speed:5,range:22,cost:590,cooldown:17,knockbacks:3,multiHit:3,killGold:.3,attackDuration:.8,windup:.35};
data.units.verdigris={hp:1000,atk:520,interval:2.2,speed:5,range:6,cost:550,cooldown:15,knockbacks:3,blowChance:.3,blowDistance:14,attackDuration:.8,windup:.35};
// EX 라피스·셀레나이트·토파즈: 라피스=화요일 광속 전사 초상급, 셀레나이트=3장 달, 토파즈=레전드 ★2 올클리어 (각 첫 클리어 보상)
data.units.lapis={hp:2088,atk:812,interval:2,speed:9,range:5,cost:800,cooldown:28,knockbacks:3,multiHit:3,critChance:.25,critMult:2,attackDuration:.9,windup:.3};
data.units.selenite={hp:1043,atk:1043,interval:3.6,speed:5,range:20,cost:850,cooldown:28,knockbacks:3,area:true,wave:{chance:.35,reach:28,mult:1},attackDuration:1,windup:.5};
// EX 리본 오렌지 (오렌지 아종, 리본 오렌지 강림 드롭): 중거리 범위 · 리본으로 묶어 정지 30% / 2초.
data.units.ribbonorange={hp:800,atk:650,interval:3,speed:5,range:18,cost:600,cooldown:20,knockbacks:3,area:true,freezeChance:.3,freezeDuration:2,attackDuration:.9,windup:.4};
data.units.topaz={hp:881,atk:755,interval:3,speed:5,range:24,cost:600,cooldown:20,knockbacks:3,killGold:1,attackDuration:.8,windup:.3};
data.units.hacienda={hp:566,atk:204,interval:2.4,speed:5,range:12,cost:300,cooldown:11,knockbacks:3,massiveVs:['angel'],attackDuration:.6,windup:.2};
// 시즌 2 레어 20명 (냥코 원작 같은 능력의 레어·슈퍼 레어 캐릭터 Lv.30 값 = 이 게임 Lv.20, 사거리는 ÷20, 이동 속도는 ÷2):
// 15명은 미래편 스테이지 첫 클리어로 해금, 5명(퓨전 크림·실버·라바·베이비 핑크·마젠타)은 뽑기 전용
data.units.cobalt={hp:490,atk:472,interval:3.03,speed:5.0,range:6.0,cost:150,cooldown:10,knockbacks:3,strongVs:['alien'],attackDuration:0.8,windup:0.35};
data.units.flame={hp:390,atk:208,interval:1.1,speed:5.5,range:7.75,cost:325,cooldown:10,knockbacks:3,massiveVs:['red'],attackDuration:0.8,windup:0.35};
data.units.scarlet={hp:460,atk:170,interval:0.83,speed:5.5,range:7.0,cost:250,cooldown:10,knockbacks:3,strongVs:['red'],attackDuration:0.75,windup:0.29};
data.units.moss={hp:305,atk:128,interval:3.5,speed:3.0,range:18.25,cost:250,cooldown:12,knockbacks:3,slowChance:.5,slowDuration:4,statusVs:['alien'],attackDuration:0.8,windup:0.35};
data.units.coral={hp:182,atk:224,interval:2.4,speed:5.0,range:17.0,cost:375,cooldown:15,knockbacks:3,massiveVs:['floating'],attackDuration:0.8,windup:0.35};
data.units.aqua={hp:309,atk:102,interval:0.97,speed:5.0,range:10.0,cost:250,cooldown:10,knockbacks:3,slowChance:.2,slowDuration:4,statusVs:['floating'],attackDuration:0.8,windup:0.34};
data.units.cooper={hp:410,atk:157,interval:2.5,speed:4.5,range:9.5,cost:200,cooldown:8,knockbacks:3,freezeChance:.2,freezeDuration:4,statusVs:['metal'],attackDuration:0.8,windup:0.35};
data.units.navy={hp:490,atk:604,interval:2.27,speed:4.5,range:8.5,cost:440,cooldown:15,knockbacks:2,area:true,massiveVs:['alien'],attackDuration:0.8,windup:0.35};
data.units.dandelion={hp:430,atk:274,interval:2.7,speed:4.5,range:14.5,cost:200,cooldown:6,knockbacks:3,slowChance:.3,slowDuration:2,statusVs:['black'],attackDuration:0.8,windup:0.35};
data.units.babyblue={hp:210,atk:81,interval:1.5,speed:4.0,range:13.5,cost:295,cooldown:11,knockbacks:3,blowChance:.3,blowDistance:14,attackDuration:0.8,windup:0.35};
data.units.mintcyan={hp:240,atk:142,interval:1.63,speed:5.0,range:7.5,cost:110,cooldown:4,knockbacks:3,survive:.5,attackDuration:0.8,windup:0.35};
data.units.peach={hp:460,atk:102,interval:0.33,speed:4.0,range:6.0,cost:135,cooldown:8,knockbacks:1,resistVs:['angel'],attackDuration:0.3,windup:0.12};
data.units.lightcream={hp:410,atk:157,interval:1.03,speed:6.0,range:7.5,cost:250,cooldown:12,knockbacks:3,critChance:.05,critMult:2,attackDuration:0.8,windup:0.35};
data.units.midnight={hp:129,atk:89,interval:2.7,speed:4.0,range:17.0,cost:300,cooldown:12,knockbacks:3,freezeChance:.2,freezeDuration:2,statusVs:['alien'],attackDuration:0.8,windup:0.35};
data.units.darklilac={hp:280,atk:329,interval:4.03,speed:4.0,range:15.5,cost:250,cooldown:15,knockbacks:3,atkDownPct:.5,atkDownChance:.5,atkDownDuration:6.67,statusVs:['alien'],attackDuration:0.8,windup:0.35};
data.units.fusioncream={hp:610,atk:132,interval:0.3,speed:6.0,range:9.0,cost:400,cooldown:25,knockbacks:1,massiveVs:['alien'],attackDuration:0.27,windup:0.1};
data.units.silver={hp:490,atk:756,interval:15,speed:5.0,range:17.5,cost:470,cooldown:30,knockbacks:3,area:true,attackClass:'범위',backRange:15,critChance:1,critMult:2,attackDuration:0.8,windup:0.35};// 원본 치어리더 캣(20.3초)을 15초로 줄이고 범위 · 전방 사거리 ~ 뒤쪽 -300(15)까지 타격
data.units.lava={hp:940,atk:1351,interval:4.03,speed:3.0,range:11.0,cost:555,cooldown:21,knockbacks:2,area:true,massiveVs:['black'],attackDuration:0.8,windup:0.35};
data.units.babypink={hp:440,atk:756,interval:4.53,speed:5.5,range:16.5,cost:520,cooldown:20,knockbacks:3,area:true,slowChance:.3,slowDuration:3,statusVs:['angel'],attackDuration:0.8,windup:0.35};
data.units.magenta={hp:1090,atk:1360,interval:4.23,speed:4.0,range:12.75,cost:610,cooldown:30,knockbacks:3,area:true,wave:{chance:1,reach:36,mult:1},attackDuration:0.8,windup:0.35};
// 신규 54~59: 메이플·브릭·콘·바이올=레어(미래편 스테이지 해금), 틸=슈퍼 레어(뽑기), 오키드=울슈레(뽑기, 1·2진 같은 가격)
data.units.maple={hp:1011,atk:411,interval:1.8,speed:5,range:7,cost:325,cooldown:10,knockbacks:3,rage:1,attackDuration:0.8,windup:0.35};
data.units.brick={hp:550,atk:472,interval:2.17,speed:5,range:6.25,cost:345,cooldown:12,knockbacks:3,resistVs:['red','floating','metal','black','angel','alien'],attackDuration:0.8,windup:0.35};
data.units.korn={hp:430,atk:367,interval:2.6,speed:5,range:22,cost:350,cooldown:12,knockbacks:3,killGold:.75,attackDuration:0.8,windup:0.35};
data.units.teal={hp:586,atk:555,interval:3,speed:5,range:14,cost:550,cooldown:17,knockbacks:3,atkDownPct:.5,atkDownChance:.5,atkDownDuration:5,statusVs:['red','floating','black','angel','alien'],attackDuration:0.8,windup:0.35};
data.units.violet={hp:430,atk:144,interval:2.8,speed:5,range:12,cost:325,cooldown:11,knockbacks:3,area:true,slowChance:.15,slowDuration:2,statusVs:['red','floating','black','angel','alien'],attackDuration:0.8,windup:0.35};
data.units.orchid={hp:1070,atk:1000,interval:4.5,speed:5,range:24,cost:3000,cooldown:25,knockbacks:3,area:true,attackClass:'범위',flatCost:true,surge:{start:22,end:44,dur:2.4,tick:.6,mult:.5},attackDuration:0.8,windup:0.35};
const EX_TYPES=['garnet','prism','rainbow','orchid','lapis','selenite','topaz','ribbonorange'];
const SR_TYPES=['plum','forest','canary','cherry','mauve','khaki','tangerine','burgundy','mustard','sky','denim','charcoal','cornflower','bittersweet','claret','verdigris','teal'];
const ACQUIRE_TEXT={ribbonorange:'리본 오렌지 강림으로 획득',garnet:'레전드 스토리로 획득',topaz:'레전드 ★2 클리어로 획득',lapis:'광속 전사 초상급으로 획득',selenite:'3장 달 클리어로 획득'};
const RARE_TYPES=['black','white','maroon','brown','tan','beige','cream','olive','clover','indigo','lilac','hotpink','ruby','hacienda','maple','brick','korn','violet','cobalt','flame','scarlet','moss','coral','aqua','cooper','navy','dandelion','babyblue','mintcyan','peach','lightcream','midnight','darklilac','fusioncream','silver','lava','babypink','magenta'];
const ALLIES=['red','orange','yellow','green','cyan','blue','purple','pink','crimson','gold','ivory','chartreuse','mint','azure','crystal','lavender','salmon','raspberry','onyx',...RARE_TYPES,...EX_TYPES,...SR_TYPES];
const NEW_ALLY_TYPES=['crimson','gold','ivory','chartreuse','mint','azure','crystal','lavender','salmon','raspberry','onyx',...RARE_TYPES,...EX_TYPES,...SR_TYPES];
const GENERIC_CD_TYPES=['cyan','blue','purple','pink',...NEW_ALLY_TYPES];
const ALWAYS_UNLOCKED=new Set(['red']);
// Chapter 2 stage indices (CHAPTER1_LEN=48 + chapter-1 index) spread China(2)~Brazil(37):
// 중국50 일본54 인도58 케냐62 사하라사막66 러시아69 스페인73 노르웨이77 뉴욕81 브라질85.
function chapterTag(i){const c=STAGES[i].chapter;return c===5?' (미래편)':c>=2?' '+c+'장':''}
const UNLOCK_AT={red:-1,orange:2,yellow:5,green:6,cyan:12,blue:15,purple:18,pink:37,crimson:50,gold:54,ivory:58,chartreuse:62,mint:66,azure:69,crystal:73,lavender:77,salmon:81,raspberry:85,onyx:CHAPTER1_LEN*2-1,black:CH3_START+1,white:CH3_START+2,maroon:CH3_START+6,brown:CH3_START+10,tan:CH3_START+14,beige:CH3_START+16,cream:CH3_START+19,olive:CH3_START+21,clover:CH3_START+23,indigo:CH3_START+25,lilac:CH3_START+26,hotpink:CH3_START+30,ruby:CH3_START+33,hacienda:CH3_START+41,maple:FUTURE_START+38,brick:FUTURE_START+40,korn:FUTURE_START+42,violet:FUTURE_START+45,cobalt:FUTURE_START+1,flame:FUTURE_START+2,scarlet:FUTURE_START+4,moss:FUTURE_START+6,coral:FUTURE_START+8,aqua:FUTURE_START+10,cooper:FUTURE_START+13,navy:FUTURE_START+16,dandelion:FUTURE_START+18,babyblue:FUTURE_START+20,mintcyan:FUTURE_START+23,peach:FUTURE_START+24,lightcream:FUTURE_START+28,midnight:FUTURE_START+31,darklilac:FUTURE_START+35};
const ROLES={ribbonorange:'중거리 범위 · 정지',red:'기본 근접',orange:'중거리 범위',yellow:'방어형 전기',green:'왕복 부메랑',cyan:'초장거리 저격',blue:'고속 연타',purple:'근접 빨간 적 특화',pink:'근거리 광역',crimson:'근거리 강타',gold:'분열 광역형',ivory:'원거리 둔화형',chartreuse:'중거리 연사형',mint:'중거리 정지형',azure:'돌진 광역형',crystal:'관통 치명타형',lavender:'장거리 약화형',salmon:'초장거리 끌어오기',raspberry:'초장거리 저격형',onyx:'근접 광역 강타 · 보스에 강함',black:'검은 적 초뎀 · 먹물 강타',white:'양산형 딜러',maroon:'원거리 빨간 적 둔화',brown:'천사 맷집 탱커',tan:'천사 둔화',beige:'검은 적 정지',cream:'검은 적 둔화',olive:'공중 적 약화',clover:'원거리 검은 적 약화',indigo:'원거리 공중 적 정지',lilac:'공중 적 둔화',hotpink:'원거리 빨간 적 약화',ruby:'빨간 적 정지',hacienda:'천사 초뎀',garnet:'근접 탱커 · 검은 적 엄강 · 살아남는다',prism:'원거리 범위 · 밀치기',rainbow:'범위 · 모든 속성 적에게 초데미지',plum:'원거리 · 천사 약화',forest:'개체 · 천사 엄강',canary:'범위 · 천사 정지',cherry:'개체 · 천사 극뎀',mauve:'원거리 · 공중 적 정지',khaki:'원거리 · 공중 적 초뎀',tangerine:'범위 · 빨간 적 둔화',burgundy:'개체 · 빨간 적 엄강',mustard:'범위 · 빨간 적 초뎀',sky:'원거리 · 검은 적 정지',denim:'개체 · 검은 적 엄강',charcoal:'원거리 · 검은 적 공격 주기 증가',cornflower:'???',bittersweet:'개체 · 치명타',claret:'원거리 · 3연발 · 약탈',verdigris:'개체 · 날려버린다',lapis:'개체 · 3연속 타격 · 치명타',selenite:'원거리 범위 · 파동 공격',topaz:'원거리 · 돈 두 배',maple:'개체 · 마지막 히트백 시 공격력 +100%',brick:'개체 · 모든 속성 맷집',korn:'원거리 · 처치 시 돈 증가',teal:'개체 · 메탈을 뺀 모든 적 약화',violet:'범위 · 메탈을 뺀 모든 적 둔화',orchid:'범위 · 서지 공격',cobalt:'개체 · 에이리언 엄강',flame:'개체 · 빨간 적 초데미지',scarlet:'개체 · 빨간 적 엄강',moss:'개체 · 에이리언 둔화',coral:'개체 · 떠다니는 적 초데미지',aqua:'개체 · 떠다니는 적 둔화',cooper:'개체 · 메탈 정지',navy:'범위 · 에이리언 초데미지',dandelion:'개체 · 검은 적 둔화',babyblue:'개체 · 날려버린다',mintcyan:'개체 · 살아남는다',peach:'개체 · 천사 맷집',lightcream:'개체 · 치명타',midnight:'개체 · 에이리언 정지',darklilac:'개체 · 에이리언 약화',fusioncream:'개체 · 에이리언 초데미지 · 연타',silver:'범위 · 치명타 · 뒤쪽까지 공격',lava:'범위 · 검은 적 초데미지',babypink:'범위 · 천사 둔화',magenta:'범위 · 파동 공격'};
const STATUS_ICONS={ribbonorange:['freeze','정지'],mint:['freeze','정지'],ivory:['slow','둔화'],lavender:['weaken','약화'],crystal:['crit','치명타'],salmon:['pull','끌어오기'],crimson:['crit','치명타'],raspberry:['crit','치명타'],black:['strong','검은 적에게 초데미지를 준다'],maroon:['slow','둔화'],brown:['strong','천사에게 맷집'],tan:['slow','둔화'],beige:['freeze','정지'],cream:['slow','둔화'],olive:['weaken','약화'],clover:['weaken','약화'],indigo:['freeze','정지'],lilac:['slow','둔화'],hotpink:['weaken','약화'],ruby:['freeze','정지'],hacienda:['strong','천사에게 초데미지를 준다'],garnet:['survive','살아남는다'],plum:['weaken','천사의 공격력을 자주 떨어뜨린다'],forest:['strong','천사에게 엄청 강하다'],canary:['freeze','천사를 가끔 멈춰 세운다'],cherry:['strong','천사에게 극데미지를 준다'],mauve:['freeze','떠다니는 적을 가끔 멈춰 세운다'],khaki:['strong','떠다니는 적에게 초데미지를 준다'],tangerine:['slow','빨간 적을 자주 느리게 만든다'],burgundy:['strong','빨간 적에게 엄청 강하다'],mustard:['strong','빨간 적에게 초데미지를 준다'],sky:['freeze','검은 적을 가끔 멈춰 세운다'],denim:['strong','검은 적에게 엄청 강하다'],charcoal:['slow','검은 적의 공격을 자주 늦춘다'],bittersweet:['crit','치명타가 자주 터진다'],lapis:['crit','치명타가 가끔 터진다'],maple:['strong','\ub9c8\uc9c0\ub9c9 \ud788\ud2b8\ubc31 \uc2dc \uacf5\uaca9\ub825 +100%'],brick:['strong','\ubaa8\ub4e0 \uc18d\uc131\uc5d0\uac8c \ub9f7\uc9d1\uc774 \uc88b\ub2e4'],teal:['weaken','\uba54\ud0c8\uc744 \ube80 \ubaa8\ub4e0 \uc801\uc744 \uc790\uc8fc \uc57d\ud558\uac8c \ub9cc\ub4e0\ub2e4'],violet:['slow','\uba54\ud0c8\uc744 \ube80 \ubaa8\ub4e0 \uc801\uc744 \uac00\ub054 \ub290\ub9ac\uac8c \ud55c\ub2e4'],cobalt:['strong','\uc5d0\uc774\ub9ac\uc5b8\uc5d0\uac8c \uc5c4\uccad \uac15\ud558\ub2e4'],flame:['strong','\ube68\uac04 \uc801\uc5d0\uac8c \ucd08\ub370\ubbf8\uc9c0\ub97c \uc900\ub2e4'],scarlet:['strong','\ube68\uac04 \uc801\uc5d0\uac8c \uc5c4\uccad \uac15\ud558\ub2e4'],moss:['slow','\uc5d0\uc774\ub9ac\uc5b8\uc744 \uc790\uc8fc \ub290\ub9ac\uac8c \ud55c\ub2e4'],coral:['strong','\ub5a0\ub2e4\ub2c8\ub294 \uc801\uc5d0\uac8c \ucd08\ub370\ubbf8\uc9c0\ub97c \uc900\ub2e4'],aqua:['slow','\ub5a0\ub2e4\ub2c8\ub294 \uc801\uc744 \uac00\ub054 \ub290\ub9ac\uac8c \ud55c\ub2e4'],cooper:['freeze','\uba54\ud0c8 \uc801\uc744 \uac00\ub054 \uba48\ucdb0 \uc138\uc6b4\ub2e4'],navy:['strong','\uc5d0\uc774\ub9ac\uc5b8\uc5d0\uac8c \ucd08\ub370\ubbf8\uc9c0\ub97c \uc900\ub2e4'],dandelion:['slow','\uac80\uc740 \uc801\uc744 \uac00\ub054 \ub290\ub9ac\uac8c \ud55c\ub2e4'],mintcyan:['survive','\uc0b4\uc544\ub0a8\ub294\ub2e4'],peach:['strong','\ucc9c\uc0ac\uc5d0\uac8c \ub9f7\uc9d1\uc774 \uc88b\ub2e4'],lightcream:['crit','\uce58\uba85\ud0c0\uac00 \uc544\uc8fc \uac00\ub054 \ud130\uc9c4\ub2e4'],midnight:['freeze','\uc5d0\uc774\ub9ac\uc5b8\uc744 \uac00\ub054 \uba48\ucdb0 \uc138\uc6b4\ub2e4'],darklilac:['weaken','\uc5d0\uc774\ub9ac\uc5b8\uc758 \uacf5\uaca9\ub825\uc744 \uc790\uc8fc \uc57d\ud654\uc2dc\ud0a8\ub2e4'],fusioncream:['strong','\uc5d0\uc774\ub9ac\uc5b8\uc5d0\uac8c \ucd08\ub370\ubbf8\uc9c0\ub97c \uc900\ub2e4'],silver:['crit','\uce58\uba85\ud0c0\uac00 \ud56d\uc0c1 \ud130\uc9c4\ub2e4'],lava:['strong','\uac80\uc740 \uc801\uc5d0\uac8c \ucd08\ub370\ubbf8\uc9c0\ub97c \uc900\ub2e4'],babypink:['slow','\ucc9c\uc0ac\ub97c \uac00\ub054 \ub290\ub9ac\uac8c \ud55c\ub2e4']};
const ABILITY_ICONS={purple:['strong','엄청 강하다'],cyan:['strong','떠 있는 적에게 엄청 강하다'],...STATUS_ICONS};
const COLORS={ribbonorange:'#ff9a3c',red:'#ff7272',orange:'#ffb452',yellow:'#ffe46d',green:'#83e595',cyan:'#53e5ef',blue:'#629aff',purple:'#c893ff',pink:'#ff73b8',crimson:'#dc143c',gold:'#ffd700',ivory:'#fffff0',chartreuse:'#7fff00',mint:'#98ff98',azure:'#007fff',crystal:'#ace5ee',lavender:'#b57edc',salmon:'#fa8072',raspberry:'#e30b5c',onyx:'#9ea3bd',black:'#2b2b30',white:'#f2f2f2',maroon:'#800000',brown:'#8b4513',tan:'#d2b48c',beige:'#f5f5dc',cream:'#fffdd0',olive:'#808000',clover:'#3cb44b',indigo:'#4b0082',lilac:'#c8a2c8',hotpink:'#ff69b4',ruby:'#e0115f',hacienda:'#e8c9a0',garnet:'#9b293f',prism:'#ffd1f0',rainbow:'#ff9ad5',plum:'#a03c88',forest:'#297639',canary:'#fde804',cherry:'#e32951',mauve:'#e0b0ff',khaki:'#c3b091',tangerine:'#fc9601',burgundy:'#800020',mustard:'#ffdb58',sky:'#6dcefc',denim:'#1560bd',charcoal:'#405162',cornflower:'#8499fb',bittersweet:'#fc885c',claret:'#94263f',verdigris:'#1eb2af',lapis:'#26619c',selenite:'#cfc8ee',topaz:'#f9a825',maple:'#b88e72',brick:'#a03623',korn:'#fbec5d',teal:'#008080',violet:'#9e0eea',orchid:'#7a81ff',cobalt:'#0047ab',flame:'#e25822',scarlet:'#ff2400',moss:'#8a9a5b',coral:'#ff7f50',aqua:'#00ffff',cooper:'#b87333',navy:'#000080',dandelion:'#f0e130',babyblue:'#89cff0',mintcyan:'#7fe5d4',peach:'#ffcba4',lightcream:'#fff1c6',midnight:'#191970',darklilac:'#9b59b6',fusioncream:'#ffd6e0',silver:'#c0c0c0',lava:'#cf1020',babypink:'#f4c2c2',magenta:'#ff00ff'};
const domCache=new Map();const $=s=>{let el=domCache.get(s);if(!el){el=document.querySelector(s);domCache.set(s,el)}return el}, unitsEl=$('#units');let game, last=0;
function syncBasePositions(){
 const field=$('#field').getBoundingClientRect();if(!field.width)return;
 for(const name of ['enemy','ally']){const rect=$('#'+name+'Base').getBoundingClientRect();data.bases[name].x=(rect.left+rect.width/2-field.left)/field.width*100;data.bases[name].frontX=((name==='enemy'?rect.left+rect.width:rect.left)-field.left)/field.width*100}
 const spriteScale=Math.min(1.35,Math.max(.65,.65+(field.width-380)/1540*.7));
 document.documentElement.style.setProperty('--sprite-scale',spriteScale);
}
function orangeUnlocked(){return cleared.some(i=>i>=2)}
function yellowUnlocked(){return cleared.some(i=>i>=5)}
function greenUnlocked(){return cleared.some(i=>i>=6)}
function cooldownKey(type){return type==='red'?'spawnCd':type+'Cd'}
function unitCooldown(type){return game[cooldownKey(type)]||0}
function reset(){syncBasePositions();last=0;game={money:0,level:0,units:[],defeated:[],spawnCd:0,orangeCd:0,yellowCd:0,greenCd:0,cyanCd:0,blueCd:0,purpleCd:0,pinkCd:0,boomerangs:[],projectiles:[],shots:[],effects:[],running:false,ended:false,tutorial:0,paused:false,elapsed:0,speedMultiplier:1,speedUnlocked:false,auto:false,autoUnlocked:false};game.spawnRules=(STAGE_SPAWNS[selectedStage]||[]).map(r=>({...r,triggered:false,clock:0,spawned:0}));data.bases.ally.hp=data.bases.ally.max=baseHpFor();data.bases.ally.attackLock=null;data.bases.enemy.hp=data.bases.enemy.max=stageBaseHp(selectedStage);data.bases.enemy.attackLock=null;game.tutorial=selectedStage===0?0:6;$('#field').style.background=`linear-gradient(${STAGES[selectedStage].sky} 0 32%,${STAGES[selectedStage].land} 32% 100%)`;$('#field').setAttribute('aria-label',STAGES[selectedStage].name+' 전장');$('#stageMenu').classList.add('hidden');unitsEl.innerHTML='';$('#result').classList.add('hidden');tutorial();render()}
const ENGAGE_SYNC_WINDOW=.12;// how close (sec) two attackers' swing-starts must be to count as "the same motion" and land together
function canEngage(target){const lock=target.attackLock;return!lock||game.elapsed>=lock.until||game.elapsed<lock.joinBy}
function lockEngage(target,duration){if(!target.attackLock||game.elapsed>=target.attackLock.until)target.attackLock={until:game.elapsed+duration,joinBy:game.elapsed+ENGAGE_SYNC_WINDOW}}
const ALLY_DEPLOY_LIMIT=50;// Battle Cats' default Cat Deploy Limit (special restriction stages there lower or raise it); caps how many allies can be on the field at once so cheap units can't stack infinitely.
function allyDeployCount(){return game.units.filter(u=>u.ally&&u.hp>0).length}
function allyDeployFull(){return allyDeployCount()>=ALLY_DEPLOY_LIMIT}
function addUnit(type,boss=false,mag=1){
 if(game.ended)return;
 const d=data.units[type],ally=ALLIES.includes(type);
 if(ally&&(!(game.running||(type==='red'&&game.tutorial===2))||game.paused||unitCooldown(type)>0||game.money<unitCost(type)||!allyUnlocked(type)||allyDeployFull()))return;
 const stats=unitStats(type);if(!ally&&mag!==1){stats.hp=Math.round(stats.hp*mag);stats.atk=Math.round(stats.atk*mag)}const u={type,ally,boss,stats,hp:stats.hp,max:stats.hp,x:ally?data.bases.ally.x:data.bases.enemy.x,emerging:true,atkCd:0,kb:0,animTime:0,attackTime:0,hurtTime:0,kbTime:0,flashTime:0};
 game.units.push(u);drawUnit(u);u.el.style.left=`calc(${u.x}% - 21px)`;
 if(ally){game.money-=unitCost(type);game[cooldownKey(type)]=stats.cooldown;if(game.tutorial===2){game.tutorial=3;tutorial()}}render();
}
// Display-only size boost for large enemies so they read bigger than 2진 allies (hippo ~76px is the baseline).
const ENEMY_SIZE={sael:1.44,liz56:1.6,phace:1.2,shyboy:1.2,shadowboxer:1.3,bunbun:1.3,pigge:1.27,stpigge:1.6,nyandam:1.5,seal:1.44,rhino:1.94,kangaroo:1.3,leboin:1.2,mooth:1.15,bear:1.26,face:1.2};
// Displayed height (px) of each new 2진 body sprite; the HP bar sits just above it instead of at the default 1진 spot.
const EVO_BODY_H={crimson:76,gold:78,ivory:77,chartreuse:78,mint:80,azure:89,crystal:81,lavender:80,salmon:74,raspberry:89,onyx:105,garnet:98,prism:92,black:77,white:77,maroon:77,brown:77,tan:77,beige:77,cream:77,olive:77,clover:77,indigo:77,lilac:77,hotpink:77,ruby:77,hacienda:77};
Object.assign(EVO_BODY_H,{maple:104,brick:104,korn:104,teal:104,violet:104,orchid:104});
Object.assign(EVO_BODY_H,{cobalt:104,flame:104,scarlet:104,moss:104,coral:104,aqua:104,cooper:104,navy:104,dandelion:104,babyblue:104,mintcyan:104,peach:104,lightcream:104,midnight:104,darklilac:104,fusioncream:104,silver:104,lava:104,babypink:104,magenta:104});
Object.assign(EVO_BODY_H,{lapis:105,selenite:85,topaz:96,ribbonorange:98});
EVO_BODY_H.rainbow=104;
Object.assign(EVO_BODY_H,{cornflower:82,bittersweet:90,claret:76,verdigris:93});
Object.assign(EVO_BODY_H,{plum:95,forest:77,canary:81,cherry:88,mauve:85,khaki:86,tangerine:92,burgundy:83,mustard:80,sky:87,denim:91,charcoal:86});
function drawUnit(u){let e=document.createElement('div'),evolved=u.ally&&u.stats?.evolved,legacyAlly=u.ally&&!NEW_ATLASES[u.type];e.className='unit '+u.type+(u.ally?' ally-art':'')+(evolved?' evolved':'');e.style.setProperty('--unit-color',COLORS?.[u.type]||'#fff');e.innerHTML='<div class="bar"><i style="width:100%"></i></div><span class="status-badges"><span class="freeze-icon st-freeze"></span><span class="slow-icon st-slow"></span><span class="weaken-icon st-weaken"></span><span class="crit-icon st-crit"></span><span class="pull-icon st-pull"></span><span class="survive-icon st-survive"></span></span>'+(legacyAlly?'<span class="ally-shadow"></span><span class="ally-sprite"></span>'+(evolved?'<span class="evolved-sprite"></span>'+(EVOLVED_HELD_ITEM[u.type]?'<span class="evolved-item"></span>':''):'')+(u.type==='pink'&&!evolved?'<span class="pink-ribbon"><i></i></span>':''):'<span class="dog-shadow"></span><span class="dog-sprite"></span>'+(u.type==='leboin'||u.type==='bear'?'<span class="dog-sprite-legs"></span>':'')+(u.type==='leboin'?'<span class="dog-sprite-body"></span>':'')+(u.type==='stpigge'?'<span class="pigge-crown"></span>':''));e.setAttribute('aria-label',UNIT_NAMES[u.type]+(evolved?' 2진':''));u.el=e;if(evolved&&EVO_BODY_H[u.type])e.querySelector('.bar').style.top=(33-EVO_BODY_H[u.type])+'px';if(!u.ally&&ENEMY_SIZE[u.type])e.style.setProperty('--enemy-size',ENEMY_SIZE[u.type]);unitsEl.append(e);const newAtlas=NEW_ATLASES[u.type];const sheet={rabbit:ELITE_RABBIT_SHEET,squirrel:SQUIRREL_G_SHEET,kangaroo:KANG_ROO_SHEET,mooth:MOOTH_SHEET,rhino:RHINO_SHEET,bear:BEAR_SHEET,face:FACE_SHEET}[u.type]||(evolved&&newAtlas?.evolved?newAtlas.evolved.sheet:newAtlas?.sheet);if(sheet)e.querySelector('.dog-sprite').style.backgroundImage=`url(${sheet})`;if(legacyAlly)animateAlly(u);else animateDog(u);fitShadow(u)}
// Ground shadow sized to the body. The base .dog-shadow is the Doge's own 41px sheet shadow, so every atlas character
// without a sheet shadow of its own (SHEET_SHADOW, plus the bosses whose frames already draw one) gets a soft ellipse
// as wide as ~80% of its first walk frame instead.
const SHEET_SHADOW=new Set(['dog','snache','guys','hippo','pigge','metalhippo','stpigge','ectosnache','leboin','nyandam','bunbun']);
function fitShadow(u){
 const sh=u.el.querySelector('.dog-shadow'),base=NEW_ATLASES[u.type];if(!sh||!base||SHEET_SHADOW.has(u.type))return;
 const atlas=(u.stats?.evolved&&base.evolved)?base.evolved:base,f=atlas.walk?.[0];if(!f)return;
 const scale=atlas.scale??base.scale,left=atlas.left??base.left,body=f[2]*scale,w=Math.round(body*.8);
 Object.assign(sh.style,{backgroundImage:'radial-gradient(closest-side,#000a,#0000)',backgroundColor:'transparent',borderRadius:'50%',width:w+'px',height:'8px',left:Math.round(left+(body-w)/2)+'px',bottom:'-3px',opacity:'1',transform:'none'});
}
// 원거리 사각지대: an ally that attacks from far away (attackType '원거리') cannot hit anything closer than
// DEAD_ZONE_RATIO of its range. It still stops for such an enemy, it just has to wait for a target in the window.
const DEAD_ZONE_RATIO=.25;
function deadZone(u){if(!u.ally||attackType(u.type)!=='원거리')return 0;const d=u.stats||data.units[u.type];if(d.engageRange)return 0;// engages up close (핑크): a blind spot would freeze it
 return d.zoneMin??d.range*DEAD_ZONE_RATIO}
function targetValid(u){const dz=deadZone(u);if(!dz)return target(u);const dir=u.ally?-1:1;return game.units.filter(v=>v.hp>0&&v.kbTime<=0&&!v.emerging&&v.ally!==u.ally&&dir*(v.x-u.x)>=-1&&Math.abs(v.x-u.x)>=dz).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0]}
function target(u){let foes=game.units.filter(v=>v.hp>0&&v.kbTime<=0&&!v.emerging&&v.ally!==u.ally);let dir=u.ally?-1:1;return foes.filter(v=>dir*(v.x-u.x)>=-1).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0]}
// Canonical knockback counts include death. Red keeps its original two live hitbacks.
const HITBACK_DURATION=20/30;
// Shorter displacement tuned to this compact battlefield.
const HITBACK_DISTANCE=6;
function animateUnit(u){if(u.ally&&!NEW_ATLASES[u.type])animateAlly(u);else animateDog(u)}
function startHitback(u,dist=HITBACK_DISTANCE){
 u.kbTime=HITBACK_DURATION;u.hurtTime=HITBACK_DURATION;
 u.kbStart=u.x;u.kbEnd=Math.max(0,Math.min(100,u.x+(u.ally?1:-1)*dist));
 u.attackTime=0;u.atkCd=0;u.pendingAttack=null;
 u.el.classList.add('knocked-back');animateUnit(u);
}
function tickHitback(u,dt){
 u.kbTime=Math.max(0,u.kbTime-dt);u.hurtTime=u.kbTime;
 const progress=1-u.kbTime/HITBACK_DURATION;
 u.x=u.kbStart+(u.kbEnd-u.kbStart)*(1-(1-progress)**2);
 u.el.style.left=`calc(${u.x}% - 21px)`;
 u.el.style.translate=`0 ${-Math.sin(progress*Math.PI)*18}px`;
 animateUnit(u);
 if(u.kbTime===0){u.el.classList.remove('knocked-back');u.el.style.translate='0 0'}
}
const BOSS_KNOCKBACK_DURATION=.8;
const BOSS_KNOCKBACK_DISTANCE=2;
function triggerBossShockwave(){
 const field=$('#field');field.classList.remove('boss-shake');void field.offsetWidth;field.classList.add('boss-shake');
 const wave=document.createElement('i');wave.className='boss-wave';field.append(wave);if(typeof setTimeout==='function'){setTimeout(()=>wave.remove(),850);setTimeout(()=>field.classList.remove('boss-shake'),450);}
 for(const u of game.units){if(!u.ally||u.hp<=0)continue;u.bossKbTime=BOSS_KNOCKBACK_DURATION;u.bossKbStart=u.x;u.bossKbEnd=Math.min(data.bases.ally.x-2,u.x+BOSS_KNOCKBACK_DISTANCE);u.attackTime=0;u.pendingAttack=null;u.atkCd=0;u.el.classList.add('boss-knocked');}
}
function tickBossKnockback(u,dt){
 u.bossKbTime=Math.max(0,u.bossKbTime-dt);const progress=1-u.bossKbTime/BOSS_KNOCKBACK_DURATION;
 u.x=u.bossKbStart+(u.bossKbEnd-u.bossKbStart)*(1-(1-progress)**3);u.el.style.left=`calc(${u.x}% - 21px)`;u.el.style.translate=`0 ${-Math.sin(progress*Math.PI)*12}px`;animateUnit(u);
 if(u.bossKbTime===0){u.el.classList.remove('boss-knocked');u.el.style.translate='0 0'}
}
const BOSS_HP_THRESHOLD=2000;
// Battle Cats style trait abilities, declared per unit as arrays of enemy traits:
//   strongVs 엄강 (deal x1.8 / take x0.5), massiveVs 초뎀 (deal x3), resistVs 맷집 (take x0.25), extremeVs 극뎀 (deal x5)
//   statusVs: slow/freeze/weaken only land on enemies with one of these traits.
const TRAIT_MULT={strongVs:[1.8,.5],massiveVs:[3,1],resistVs:[1,.25],extremeVs:[5,1]};
const TRAIT_NAMES={red:'빨간 적',floating:'공중',metal:'메탈',black:'검은 적',angel:'천사',alien:'에이리언'};
const TRAIT_TARGET={red:'빨간 적',floating:'떠다니는 적',metal:'메탈 적',black:'검은 적',angel:'천사',alien:'에이리언'};// how a trait is named inside ability descriptions
const TRAIT_NOTE={strongVs:'엄청 강하다',massiveVs:'초데미지를 준다',resistVs:'맷집이 좋다',extremeVs:'극데미지를 준다'};
function freqWord(p){return p>=1?'항상':p<=.15?'아주 가끔':p<=.35?'가끔':'자주'}// chance -> wording shown in descriptions
function traitsOf(d){return d.traits||(d.trait?[d.trait]:[])}
function hasTrait(d,t){return traitsOf(d).includes(t)}
function traitMult(own,other){// [dealt, taken] multipliers for `own` (stats holding the ability) against an opponent's unit data
 const ts=traitsOf(other);let dealt=1,taken=1;if(!own||!ts.length)return[1,1];
 for(const k in TRAIT_MULT){const list=own[k];if(list&&ts.some(t=>list.includes(t))){dealt*=TRAIT_MULT[k][0];taken*=k==='resistVs'&&own.resistMult?own.resistMult:TRAIT_MULT[k][1]}}
 return[dealt,taken]}
function statusLands(from,v){const list=from?.stats?.statusVs;return !list||traitsOf(data.units[v.type]).some(t=>list.includes(t))}
const SURVIVE_FX_TIME=1.6;// the 살아남는다 badge stays longer than the instant crit/pull ones
const STATUS_FX_TIME=.6;// crit/pull are instant, so their badge lingers briefly
const SLOW_SPEED=.5;// Battle Cats: a slowed enemy's speed drops to 0.5
function baseDamage(n){return Math.round(n)}// castle HP stays an integer: x.5 and above rounds up (.999 -> +1), below rounds down (.001 -> +0)
// Critical hit burst: flash + starburst + ring + sparks + "CRITICAL!" pop, drawn on the field at the
// target (so it survives the target dying), plus a short field shake.
function critBurst(v){
 if(typeof setTimeout!=='function'||!v.el?.isConnected)return;
 const field=$('#field'),fr=field.getBoundingClientRect(),r=v.el.getBoundingClientRect();
 const fx=document.createElement('div');fx.className='crit-fx';
 fx.style.left=(r.left+r.width/2-fr.left)+'px';fx.style.top=(r.top+r.height*.35-fr.top)+'px';
 fx.innerHTML='<i class="crit-flash"></i><i class="crit-star"></i><i class="crit-ring"></i>'+Array.from({length:8},(_,k)=>`<i class="crit-spark" style="--a:${k*45+Math.random()*20-10}deg"></i>`).join('')+'<b class="crit-text">CRITICAL!</b>';
 field.append(fx);setTimeout(()=>fx.remove(),900);
 field.classList.remove('crit-shake');void field.offsetWidth;field.classList.add('crit-shake');setTimeout(()=>field.classList.remove('crit-shake'),200);
}
function damage(v,amount,from){
 if(game.ended||v.hp<=0||v.kbTime>0)return;
 if(from?.stats?.redStrong&&hasTrait(data.units[v.type],'red'))amount*=from.stats.redDamage||1.5;
 if(v.stats?.redStrong&&from&&hasTrait(data.units[from.type],'red'))amount*=v.stats.redResist||.5;
 if(from?.stats?.floatStrong&&hasTrait(data.units[v.type],'floating'))amount*=from.stats.floatDamage||1.5;
 if(v.stats?.floatStrong&&from&&hasTrait(data.units[from.type],'floating'))amount*=v.stats.floatResist||.5;
 if(from){amount*=traitMult(from.stats,data.units[v.type])[0];amount*=traitMult(v.stats,data.units[from.type])[1]}
 if(v.stats?.armor)amount*=v.stats.armor;
 if(from?.atkDownUntil>game.elapsed)amount*=from.atkDownMult;
 if(from?.rageOn&&from.stats?.rage)amount*=1+from.stats.rage;// 분노: after the final live hitback (right before death) attack +rage
 let crit=false;if(from?.stats?.critChance&&Math.random()<from.stats.critChance){crit=true;amount*=from.stats.critMult||2;v.critFxUntil=game.elapsed+STATUS_FX_TIME;critBurst(v)}
 const isBoss=v.boss||(!data.units[v.type].notBoss&&data.units[v.type].hp>=BOSS_HP_THRESHOLD);// base HP, so Chapter 2's x1.5 doesn't change who counts as a boss
 if(from?.stats?.pull&&isBoss)amount*=1.3;
 if(from?.stats?.bossDamage&&isBoss)amount*=from.stats.bossDamage;
 if(hasTrait(data.units[v.type],'metal')&&!crit)amount=1;// metal: every non-critical hit deals exactly 1
 if(v.stats?.survive&&amount>=v.hp&&Math.random()<v.stats.survive){amount=v.hp-1;v.surviveFxUntil=game.elapsed+SURVIVE_FX_TIME}// 살아남는다: a lethal blow (i.e. once every hitback is used up) leaves 1 HP instead
 v.hp=Math.max(0,v.hp-amount);v.flashTime=.1;v.el.classList.add('damage-flash');
 v.el.querySelector('i').style.setProperty('width',Math.max(0,v.hp/v.max)*100+'%');
 if(v.hp===0){
  if(!v.ally)game.money=Math.min(walletMax(),game.money+Math.round(data.units[v.type].reward*enemyMagnification()*accMult()*(from?.ally&&from.stats?.killGold?1+from.stats.killGold:1)));
  game.units.splice(game.units.indexOf(v),1);
  startHitback(v);v.el.classList.add('defeated');game.defeated.push(v);return;
 }
 const lands=statusLands(from,v);
 if(lands&&from?.stats?.slowChance&&Math.random()<from.stats.slowChance)v.slowUntil=game.elapsed+from.stats.slowDuration;
 if(lands&&from?.stats?.freezeChance&&Math.random()<from.stats.freezeChance)v.freezeUntil=Math.max(v.freezeUntil||0,game.elapsed+from.stats.freezeDuration);
 if(lands&&from?.stats?.atkDownPct&&Math.random()<(from.stats.atkDownChance??1)){v.atkDownUntil=game.elapsed+from.stats.atkDownDuration;v.atkDownMult=1-from.stats.atkDownPct}
 if(from?.stats?.pull&&!isBoss){const dir=Math.sign(from.x-v.x)||(from.ally?-1:1);v.x=Math.max(0,Math.min(100,v.x+dir*(from.stats.pullDistance||3)));v.el.style.left=`calc(${v.x}% - 21px)`;v.pullFxUntil=game.elapsed+STATUS_FX_TIME}
 if(lands&&from?.stats?.intervalUpChance&&Math.random()<from.stats.intervalUpChance){v.intervalUntil=game.elapsed+from.stats.intervalUpDuration;v.intervalMult=from.stats.intervalUpMult||1.5}// 공격 주기 증가
 const kbImmune=v.stats?.knockbackImmune||data.units[v.type].knockbackImmune;// 넉백 무효
 if(from?.stats?.push&&!kbImmune)startHitback(v,from.stats.push);// 밀치기: always shoves the target back (bosses too) unless knockback-immune
 else if(from?.stats?.forceKnockback&&!isBoss&&!kbImmune){startHitback(v)}
 else if(!kbImmune&&from?.stats?.blowChance&&Math.random()<from.stats.blowChance){startHitback(v,from.stats.blowDistance||14)}// 날려버린다: a chance to hurl the target far back
 else if(!kbImmune){
  const total=v.stats?.knockbacks??data.units[v.type].knockbacks;
  // Consume every crossed threshold, but play only one hitback for a single blow.
  const crossed=Math.min(total-1,Math.floor((v.max-v.hp)*total/v.max+1e-9));
  if(crossed>v.kb){v.kb=crossed;startHitback(v);if(v.stats?.rage&&crossed>=total-1&&!v.rageOn){v.rageOn=true;v.el.classList.add('raging')}}
 }
}
function launchBoomerang(u){
 const el=document.createElement('span');el.className='boomerang';unitsEl.append(el);
 const b={start:u.x,end:Math.max(0,u.x-u.stats.range),time:0,damage:u.stats.atk,returnMult:u.stats.returnMult||1,source:u,el,hits:[new Set(),new Set()],baseHits:[false,false]};game.boomerangs.push(b);positionBoomerang(b);
}
function boomerangX(b,t){return b.start+(b.end-b.start)*(t<=.6?t/.6:(1.2-t)/.6)}
function positionBoomerang(b){b.el.style.left=boomerangX(b,b.time)+'%';b.el.style.transform=`translate(-50%,-24px) rotate(${b.time*900}deg)`}
function updateBoomerangs(dt){
 for(const b of [...game.boomerangs]){
  const endTime=Math.min(1.2,b.time+dt);
  while(b.time<endTime){
   const leg=b.time<.6?0:1,next=Math.min(endTime,leg===0?.6:1.2),a=boomerangX(b,b.time),z=boomerangX(b,next),lo=Math.min(a,z)-.6,hi=Math.max(a,z)+.6;
   for(const v of [...game.units])if(!v.ally&&v.hp>0&&v.kbTime<=0&&!b.hits[leg].has(v)&&v.x>=lo&&v.x<=hi){b.hits[leg].add(v);damage(v,b.damage*(leg?b.returnMult:1),b.source)}
   const base=data.bases.enemy;
   if(!b.baseHits[leg]&&base.frontX>=lo&&base.frontX<=hi){b.baseHits[leg]=true;base.hp=Math.max(0,base.hp-baseDamage(b.damage*(leg?b.returnMult:1)));if(!base.hp){finish(true);return}}
   b.time=next;
  }
  positionBoomerang(b);if(b.time>=1.2){b.el.remove();game.boomerangs.splice(game.boomerangs.indexOf(b),1)}
 }
}
function renderGreenButton(){
 const b=$('#greenBtn'),d=data.units.green;b.disabled=!greenUnlocked()||!game.running||game.paused||game.ended||game.money<unitCost("green")||game.greenCd>0||allyDeployFull();
 b.querySelector('small').textContent=!greenUnlocked()?'일본 클리어 시 해금':allyDeployFull()?'출격 인원 가득참':'175원';b.querySelector('em').style.display=game.greenCd?'block':'none';b.querySelector('em').style.transform=`scaleY(${game.greenCd/unitStats('green').cooldown})`;
 b.title='체력 280 · 편도당 공격력 65 · 공격 주기 2.8초 · 재출격 7초';
}
// Ranged attackers that used to hit instantly now throw a visible shot first; the hit (resolveAttack) lands when it arrives.
const SHOT_STYLE={gold:{n:3,arc:1},ivory:{n:1,arc:1},chartreuse:{n:5,arc:0},mint:{n:1,arc:1},crystal:{n:1,arc:0},lavender:{n:1,arc:1},salmon:{n:1,arc:0},raspberry:{n:1,arc:0}};
const SHOT_SPEED=80;// field % per second
// 야옹컴 (Nyanko Computer): while it runs, the CPU upgrades the worker cat (income) and keeps deploying the deck, most expensive first.
function autoDeploy(){
 const l=data.income[game.level];if(l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++}
 const order=deck.filter(allyUnlocked).sort((a,b)=>unitCost(b)-unitCost(a)),rate=incomeRate(),full=game.money>=walletMax()*.97;
 for(const type of order){
  if(unitCooldown(type)>0)continue;
  const c=unitCost(type);
  if(game.money>=c)addUnit(type);
  else if(!full&&c<=walletMax()&&c<=game.money+rate*4)break;
 }
}
function fire(u,t,share=1){
 const st=u.ally&&SHOT_STYLE[u.type];
 if(!st){resolveAttack(u,t,share);return}
 const tt=t&&t.hp>0?t:targetValid(u),end=tt?tt.x:data.bases.enemy.frontX,fireX=u.x,dur=Math.max(.14,Math.min(.55,Math.abs(end-fireX)/SHOT_SPEED));
 const group={left:st.n,u,t:tt,share,fireX};
 for(let i=0;i<st.n;i++){const el=document.createElement('span');el.className='shot '+u.type+'-bolt';unitsEl.append(el);const shot={start:fireX,end,time:-i*.06,duration:dur,arc:st.arc,el,group};game.shots.push(shot);placeShot(shot)}
}
function placeShot(p){const k=Math.max(0,p.time)/p.duration;p.el.style.visibility=p.time<0?'hidden':'visible';p.el.style.left=(p.start+(p.end-p.start)*k)+'%';p.el.style.translate=`-50% ${-30-(p.arc?Math.sin(k*Math.PI)*26:0)}px`}
function updateShots(dt){
 for(const p of [...game.shots]){
  p.time+=dt;placeShot(p);if(p.time<p.duration)continue;
  p.el.remove();game.shots.splice(game.shots.indexOf(p),1);
  const g=p.group;if(--g.left>0)continue;
  const keep=g.u.x;g.u.x=g.fireX;resolveAttack(g.u,g.t,g.share);g.u.x=keep;if(game.ended)return;
 }
}
function launchJuice(u,t){
 const end=t?t.x:data.bases.enemy.frontX,el=document.createElement('span');el.className='juice-projectile '+u.type+'-shot';unitsEl.append(el);
 const shot={start:u.x,end,time:0,duration:u.stats.flight||.35,damage:u.stats.atk,radius:u.stats.splash,source:u,type:u.type,target:t,el};
 game.projectiles.push(shot);positionJuice(shot);
}
function positionJuice(p){const progress=p.time/p.duration;p.el.style.left=(p.start+(p.end-p.start)*progress)+'%';p.el.style.translate=`-50% ${-28-Math.sin(progress*Math.PI)*32}px`}
function updateJuice(dt){
 updateSurges(dt);
 for(const e of [...game.effects]){e.time-=dt;e.el.style.opacity=Math.max(0,e.time/.25);if(e.time<=0){e.el.remove();game.effects.splice(game.effects.indexOf(e),1)}}
 for(const p of [...game.projectiles]){
  p.time=Math.min(p.duration,p.time+dt);positionJuice(p);if(p.time<p.duration)continue;
  p.el.remove();game.projectiles.splice(game.projectiles.indexOf(p),1);
  const cx=p.target&&p.target.hp>0&&!p.target.ally?p.target.x:p.end;// land on where the target is now, not where it was
  const effect=document.createElement('span');effect.className='juice-splash '+p.type+'-splash';effect.style.left=cx+'%';effect.style.width=(p.radius*2)+'%';unitsEl.append(effect);game.effects.push({el:effect,time:.25});
  for(const v of [...game.units])if(!v.ally&&Math.abs(v.x-cx)<=p.radius)damage(v,p.damage,p.source);
  const base=data.bases.enemy;if(Math.abs(base.frontX-p.end)<=p.radius){base.hp=Math.max(0,base.hp-baseDamage(p.damage));if(!base.hp){finish(true);return}}
 }
}
function tierDamage(tiers,dist){for(const t of tiers)if(dist<=t.max)return t.dmg;return tiers[tiers.length-1].dmg}
function launchSurge(u,d){
 const sg=d.surge,dir=u.ally?-1:1,a=u.x+dir*sg.start,b=u.x+dir*sg.end,lo=Math.max(0,Math.min(a,b)),hi=Math.min(100,Math.max(a,b));
 const el=document.createElement('span');el.className='juice-splash surge-splash';el.style.left=(lo+hi)/2+'%';el.style.width=(hi-lo)+'%';unitsEl.append(el);
 (game.surges=game.surges||[]).push({el,lo,hi,t:0,next:0,dur:sg.dur,tick:sg.tick,dmg:d.atk*sg.mult,from:u,ally:u.ally});
}
function updateSurges(dt){
 if(!game.surges)return;
 for(const sg of [...game.surges]){
  sg.t+=dt;sg.el.style.opacity=(.55+.25*Math.sin(sg.t*12)).toFixed(2);
  while(sg.next<=sg.t&&sg.next<sg.dur){sg.next+=sg.tick;for(const v of [...game.units])if(v.hp>0&&v.kbTime<=0&&v.ally!==sg.ally&&v.x>=sg.lo&&v.x<=sg.hi)damage(v,sg.dmg,sg.from)}
  if(sg.t>=sg.dur){sg.el.remove();game.surges.splice(game.surges.indexOf(sg),1)}
 }
}
function launchWave(u,d){
 const dir=u.ally?-1:1,far=u.x+dir*d.wave.reach,lo=Math.min(u.x,far),hi=Math.max(u.x,far);
 const el=document.createElement('span');el.className='juice-splash wave-splash';el.style.left=(lo+hi)/2+'%';el.style.width=(hi-lo)+'%';unitsEl.append(el);game.effects.push({el,time:.35});
 for(const v of [...game.units])if(v.hp>0&&v.kbTime<=0&&v.ally!==u.ally&&v.x>=lo&&v.x<=hi)damage(v,d.atk*(d.wave.mult||1),u);
}
// Long-range area beams: the sheet's own swing art only reaches a body length, so the strike also draws a beam out to
// zoneMax (prism leaves its dead zone faint) and a burst on every target it hits.
const BEAM_FX={rainbow:'rainbow-beam',prism:'prism-beam'};
function beamFx(u,d){
 const dir=u.ally?-1:1,near=u.x+dir,far=u.x+dir*(d.zoneMax??d.range),lo=Math.min(near,far),hi=Math.max(near,far);
 const el=document.createElement('span');el.className='beam-fx '+BEAM_FX[u.type]+(u.ally?'':' beam-right');el.style.left=lo+'%';el.style.width=(hi-lo)+'%';
 if(d.zoneMin)el.style.setProperty('--dead',Math.min(100,(d.zoneMin-1)/(hi-lo)*100)+'%');
 unitsEl.append(el);game.effects.push({el,time:.5});
}
function beamHit(x,type){const el=document.createElement('span');el.className='beam-hit '+type+'-hit';el.style.left=x+'%';unitsEl.append(el);game.effects.push({el,time:.4})}
function resolveAttack(u,t,share=1){
 const d=u.stats||data.units[u.type],dir=u.ally?-1:1,dz=deadZone(u);
 if(d.wave&&Math.random()<d.wave.chance)launchWave(u,d);
 if(d.surge)launchSurge(u,d);
 const inRange=v=>v&&v.hp>0&&v.kbTime<=0&&v.ally!==u.ally&&(dir*(v.x-u.x)>=-1?Math.abs(v.x-u.x)<=(d.zoneMax??d.range)&&Math.abs(v.x-u.x)>=dz:!!d.backRange&&-dir*(v.x-u.x)<=d.backRange);// backRange: 뒤쪽(-300)까지 닿는 전방위 타격
 if(d.dash){
  const farX=u.x+dir*d.range,lo=Math.min(u.x,farX),hi=Math.max(u.x,farX);
  for(const v of [...game.units])if(v.hp>0&&v.kbTime<=0&&v.ally!==u.ally&&v.x>=lo&&v.x<=hi)damage(v,d.atk,u);
 }else if(d.pierce){
  const targets=game.units.filter(inRange).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x)).slice(0,d.pierce);
  for(const v of targets)damage(v,d.atk,u);
 }else if(d.area){const fx=BEAM_FX[u.type];if(fx)beamFx(u,d);for(const v of [...game.units])if(inRange(v)){damage(v,d.atk,u);if(fx)beamHit(v.x,u.type)}}
 else if(d.multiHit){
  let remaining=d.multiHit,victim=inRange(t)?t:targetValid(u);
  while(remaining>0&&victim&&inRange(victim)){damage(victim,d.atk,u);remaining--;if(victim.hp<=0&&remaining>0)victim=targetValid(u)}
  if(remaining<d.multiHit)return;
 }else{
  const victim=inRange(t)?t:targetValid(u);
  if(inRange(victim)){
   const distV=Math.abs(victim.x-u.x),atk=(d.damageTiers?tierDamage(d.damageTiers,distV):d.atk)*share;
   damage(victim,atk,u);
   if(d.condPierceDist&&distV>=d.condPierceDist){
    const behind=game.units.filter(v=>v!==victim&&inRange(v)&&Math.abs(v.x-u.x)>distV).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0];
    if(behind)damage(behind,atk,u);
   }
   return;
  }
 }
 const base=u.ally?data.bases.enemy:data.bases.ally;
 if(Math.abs(base.frontX-u.x)<=(d.engageRange??d.range)){if(BEAM_FX[u.type])beamHit(base.frontX,u.type);base.hp=Math.max(0,base.hp-baseDamage((d.damageTiers?tierDamage(d.damageTiers,Math.abs(base.frontX-u.x)):d.atk)*(d.multiHit||1)*(d.castleMult||1)*share));if(!base.hp)finish(u.ally)}
}
function attack(u,t){
 if(game.ended||u.hp<=0||u.kbTime>0)return;
 const d=u.stats||data.units[u.type];u.atkCd=d.interval*(u.intervalUntil>game.elapsed?u.intervalMult:1);
 u.attackTime=d.attackDuration||.56;
 if(u.type==='yellow'){const bolt=document.createElement('span');bolt.className='electric-bolt';bolt.textContent='ϟ';bolt.style.left=((u.x+(t?t.x:data.bases.enemy.frontX))/2)+'%';unitsEl.append(bolt);game.effects.push({el:bolt,time:.25})}if(d.boomerang){launchBoomerang(u);return}if(d.projectile){launchJuice(u,t);return}if(d.hits)u.pendingAttack={remaining:d.hits[0].at,hit:0};else if(d.windup)u.pendingAttack={remaining:d.windup};else fire(u,t);
}
function update(dt){
 tickSniper(dt);
 updateBoomerangs(dt);if(game.ended){render();return}updateJuice(dt);if(game.ended){render();return}updateShots(dt);if(game.ended){render();return}
 for(const v of [...game.defeated]){tickHitback(v,dt);v.el.style.opacity=v.kbTime/HITBACK_DURATION;if(v.kbTime===0){v.el.remove();game.defeated.splice(game.defeated.indexOf(v),1)}}
 game.noticeTime=Math.max(0,(game.noticeTime||0)-dt);game.elapsed+=dt;game.money=Math.min(walletMax(),game.money+incomeRate()*dt);updateStageSpawns(dt);if(game.auto&&game.tutorial>=6)autoDeploy();
game.spawnCd=Math.max(0,game.spawnCd-dt);game.orangeCd=Math.max(0,game.orangeCd-dt);game.yellowCd=Math.max(0,game.yellowCd-dt);game.greenCd=Math.max(0,game.greenCd-dt);for(const t of GENERIC_CD_TYPES)game[cooldownKey(t)]=Math.max(0,unitCooldown(t)-dt);
 for(const u of [...game.units]){
  if(game.ended)break;if(u.hp<=0)continue;
  u.flashTime=Math.max(0,u.flashTime-dt);u.el.classList.toggle('damage-flash',u.flashTime>0);u.el.classList.toggle('frozen',u.freezeUntil>game.elapsed);u.el.classList.toggle('slowed',u.slowUntil>game.elapsed);u.el.classList.toggle('weakened',u.atkDownUntil>game.elapsed);u.el.classList.toggle('crit-hit',u.critFxUntil>game.elapsed);u.el.classList.toggle('pulled',u.pullFxUntil>game.elapsed);u.el.classList.toggle('surviving',u.surviveFxUntil>game.elapsed);u.el.classList.toggle('slow-cycle',u.intervalUntil>game.elapsed);
  if(u.bossKbTime>0){tickBossKnockback(u,dt);continue}
  if(u.kbTime>0){tickHitback(u,dt);continue}
  if(u.freezeUntil>game.elapsed){animateUnit(u);continue}
  if(u.pendingAttack){u.pendingAttack.remaining-=dt;if(u.pendingAttack.remaining<=0){const p=u.pendingAttack,hits=(u.stats||data.units[u.type]).hits,h=hits?.[p.hit];u.pendingAttack=null;fire(u,undefined,h?h.share:1);if(game.ended)break;if(h&&hits[p.hit+1])u.pendingAttack={remaining:hits[p.hit+1].at-h.at+p.remaining,hit:p.hit+1}}}
  u.atkCd-=dt;u.animTime+=dt;u.attackTime=Math.max(0,u.attackTime-dt);u.hurtTime=Math.max(0,u.hurtTime-dt);
  let d=u.stats||data.units[u.type];
  const spd=u.slowUntil>game.elapsed?Math.min(d.speed,SLOW_SPEED):d.speed;
  if(!u.ally&&(u.emerging||u.x<data.bases.enemy.frontX)){u.emerging=true;u.x=Math.min(data.bases.enemy.frontX,u.x+spd*dt);if(u.x>=data.bases.enemy.frontX)u.emerging=false;u.el.style.left=`calc(${u.x}% - 21px)`;animateDog(u);continue}
  if(u.ally&&(u.emerging||u.x>data.bases.ally.frontX)){u.emerging=true;u.x=Math.max(data.bases.ally.frontX,u.x-spd*dt);if(u.x<=data.bases.ally.frontX)u.emerging=false;u.el.style.left=`calc(${u.x}% - 21px)`;animateUnit(u);continue}
  let t=target(u),dist=t?Math.abs(t.x-u.x):Infinity;
  if(t&&dist<=(d.engageRange??d.range)){const tv=deadZone(u)&&dist<deadZone(u)?targetValid(u):t;if(tv&&Math.abs(tv.x-u.x)<=(d.engageRange??d.range)&&u.atkCd<=0&&canEngage(tv)){lockEngage(tv,d.attackDuration||d.interval||.56);attack(u,tv)}}
  else{
   let baseDist=u.ally?u.x-data.bases.enemy.frontX:data.bases.ally.frontX-u.x,base=u.ally?data.bases.enemy:data.bases.ally;
   if(!t&&baseDist<=(d.engageRange??d.range)){if(u.atkCd<=0&&canEngage(base)){lockEngage(base,d.attackDuration||d.interval||.56);attack(u)}}
   else if(u.ally||(!u.attackTime&&!u.hurtTime))u.x+=(u.ally?-1:1)*spd*dt
  }
  u.x=Math.max(0,Math.min(100,u.x));u.el.style.left=`calc(${u.x}% - 21px)`;
  animateUnit(u)
 }
 render()
}
function render(){renderDeckButtons();renderSpeedButton();renderNyancomButton();renderBoostButtons();renderNewButtons();renderGreenButton();renderOrangeButton();renderYellowButton();renderUnitLevels();$('#battleNotice').classList.toggle('hidden',!(game.noticeTime>0));$('#pauseBtn').disabled=!game.running||game.ended;$('#pauseBtn').textContent=game.paused?'계속하기':'일시정지';$('#pauseNotice').classList.toggle('hidden',!game.paused);$('#timer').textContent=`${STAGES[selectedStage].name}${chapterOf(selectedStage)===2||chapterOf(selectedStage)===3?` (${chapterOf(selectedStage)}장)`:chapterOf(selectedStage)===5?' (미래편)':''}${STAGES[selectedStage].legend?' ★'+legendCrown:''} · ${Math.floor(game.elapsed)}초`;let l=data.income[game.level];$('#money').textContent=`${Math.floor(game.money)} / ${walletMax()}원`;$('#enemyHp').textContent=data.bases.enemy.hp;$('#allyHp').textContent=data.bases.ally.hp;for(let [name,b] of Object.entries(data.bases))$(`#${name}Base span`).style.width=(b.hp/b.max*100)+'%';let sb=$('#spawnBtn'),ib=$('#incomeBtn'),canSpawn=!game.ended&&!game.paused&&(game.running||game.tutorial===2),canUpgrade=!game.ended&&!game.paused&&(game.running||game.tutorial===4);sb.disabled=game.money<unitCost('red')||game.spawnCd>0||!canSpawn||allyDeployFull();sb.querySelector('small').textContent=allyDeployFull()?'출격 인원 가득참':unitCost('red')+'원';sb.querySelector('em').style.display=game.spawnCd?'block':'none';sb.querySelector('em').style.transform=`scaleY(${game.spawnCd/unitStats('red').cooldown})`;ib.disabled=!canUpgrade||game.level===5||game.money<(l.cost||0);ib.innerHTML=game.level===5?'수입 Lv.MAX':`수입 업그레이드<br><small>${l.cost}원</small>`}
function renderOrangeButton(){
 const button=$('#orangeBtn'),d=data.units.orange,unlocked=orangeUnlocked();
 button.disabled=!unlocked||!game.running||game.paused||game.ended||game.money<unitCost("orange")||game.orangeCd>0||allyDeployFull();
 button.querySelector('small').textContent=!unlocked?'중국 클리어 시 해금':allyDeployFull()?'출격 인원 가득참':`${unitCost("orange")}원`;
 button.querySelector('em').style.display=game.orangeCd>0?'block':'none';button.querySelector('em').style.transform=`scaleY(${game.orangeCd/unitStats('orange').cooldown})`;
 button.title='체력 220 · 공격력 100 · 공격 주기 2.4초 · 재출격 6.5초';
}
function renderYellowButton(){
 const button=$('#yellowBtn'),d=data.units.yellow;
 button.disabled=!yellowUnlocked()||!game.running||game.paused||game.ended||game.money<unitCost("yellow")||game.yellowCd>0||allyDeployFull();
 button.querySelector('small').textContent=!yellowUnlocked()?'필리핀 클리어 시 해금':allyDeployFull()?'출격 인원 가득참':`${unitCost("yellow")}원`;
 button.querySelector('em').style.display=game.yellowCd>0?'block':'none';button.querySelector('em').style.transform=`scaleY(${game.yellowCd/unitStats('yellow').cooldown})`;
 button.title='체력 900 · 공격력 45 · 공격 주기 1.8초 · 재출격 5초';
}
function loop(t){if(game&&game.running&&!game.ended&&!game.paused&&!game.itemLocksApplied)applyItemLocks();const raw=last?Math.min(.05,(t-last)/1000):0;last=t;const dt=raw*(game.speedMultiplier||1);if(game&&!game.ended&&!game.paused){if(game.running)update(dt);else if(game.tutorial===2||game.tutorial===4){game.money=Math.min(walletMax(),game.money+incomeRate()*dt);render()}}requestAnimationFrame(loop)}
function highlight(sel){document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target'));if(sel)$(sel).classList.add('tutorial-target');$('#game').classList.toggle('guiding',!!sel)}
function tutorial(){let text=$('#tutorialText'),next=$('#nextBtn'),box=$('#tutorial');let steps=[['오른쪽은 아군의 성입니다.','#allyBase'],['왼쪽의 적 성을 파괴하면 승리합니다!','#enemyBase'],['돈을 사용해서 레드를 생성해 보세요!','#spawnBtn'],['돈은 시간이 지나면 자동으로 모입니다. 적을 쓰러뜨려도 돈을 얻습니다!','#money'],['수입을 업그레이드하면 더 많은 돈을 더 빠르게 모을 수 있습니다!','#incomeBtn'],['캐릭터와 적은 자동으로 이동하고 공격합니다. 레드를 계속 생성해 적 성을 파괴하세요!','']];if(game.tutorial>=steps.length){box.classList.add('hidden');highlight();game.running=true;return}box.classList.remove('hidden');text.textContent=steps[game.tutorial][0];highlight(steps[game.tutorial][1]);next.style.display=(game.tutorial===2||game.tutorial===4)?'none':'inline-block'}
$('#nextBtn').onclick=()=>{game.tutorial++;tutorial();render()};$('#spawnBtn').onclick=()=>addUnit('red');$('#orangeBtn').onclick=()=>addUnit('orange');$('#yellowBtn').onclick=()=>addUnit('yellow');$('#greenBtn').onclick=()=>addUnit('green');for(const t of GENERIC_CD_TYPES)$('#'+t+'Btn').onclick=()=>addUnit(t);$('#incomeBtn').onclick=()=>{let l=data.income[game.level];if(!game.ended&&!game.paused&&(game.running||game.tutorial===4)&&l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++;if(game.tutorial===4){game.tutorial++;tutorial()}render()}};function finish(win){if(game.ended)return;if(STAGES[selectedStage].legend){legendFinish(win);return}const sp=STAGES[selectedStage].special,firstClear=win&&!sp&&!cleared.includes(selectedStage),xpReward=win&&!sp?awardXP():0;const speedDropped=win&&!sp&&selectedStage>=18&&Math.random()<0.3;if(win&&STAGES[selectedStage].ribbon){const rk=STAGES[selectedStage].ribbon.k;if(!ribbonSave.clear.includes(rk)){ribbonSave.clear.push(rk);saveRibbon()}}let specialDrop=0;if(win&&sp&&specialDropOpen(sp)&&Math.random()<sp.chance){specialDrop=sp.count;giveSpecialItem(sp.item,specialDrop)}let specialXp=0;if(win&&sp?.xp){specialXp=studyXP(sp.xp)*(boostActive('doctor')?2:1);training.xp+=specialXp;saveTraining()}if(speedDropped){speedTickets++;saveSpeedTickets();renderSpeedButton()}game.ended=true;game.running=false;highlight();$('#result').classList.remove('hidden');$('#resultTitle').textContent=win?STAGES[selectedStage].name+' 정복 완료!':'패배...';if(win&&!sp&&!cleared.includes(selectedStage)){cleared.push(selectedStage);saveProgress();revealHiddenAbilities()}$('#nextStageBtn').classList.toggle('hidden',!win||!!sp||isChainEnd(selectedStage));$('#resultDetail').textContent=win?(sp?'':selectedStage===MAIN_STAGE_COUNT-1?MAIN_STAGE_COUNT+'개 스테이지를 모두 정복했어요! 미래편이 열렸어요!':selectedStage===FUTURE_END-1?'미래편 1장을 모두 정복했어요!':(STAGES[selectedStage+1]||{}).name+' 스테이지가 열렸어요!'):'수입을 올리고 아군을 모아서 다시 도전하세요.';if(win&&selectedStage===2)$('#resultDetail').textContent+=' 오렌지가 해금됐어요!';if(win&&firstClear&&CHAPTER_FINALS.includes(selectedStage))$('#resultDetail').textContent+=` ${CHAPTER_FINALS.indexOf(selectedStage)+1}장 클리어 보너스! 지갑 상한 +${CHAPTER_BONUS.wallet.toLocaleString()} · 돈 생산 속도 +${Math.round(CHAPTER_BONUS.rate*100)}% · 처치 시 받는 돈 +${Math.round(CHAPTER_BONUS.gold*100)}%`;if(win&&selectedStage===5)$('#resultDetail').textContent+=' 옐로우가 해금됐어요!';if(win&&selectedStage===6)$('#resultDetail').textContent+=' 그린이 해금됐어요!';if(win){for(const t of ['cyan','blue','purple',...NEW_ALLY_TYPES])if(selectedStage===UNLOCK_AT[t])$('#resultDetail').textContent+=' '+UNIT_NAMES[t]+' 해금!';$('#resultDetail').textContent+=` 보상 +${xpReward} XP`;if(firstClear&&ALIEN_SUPPRESSORS.includes(selectedStage))$('#resultDetail').textContent+=` 억제기 가동! 에이리언 배율 ${(alienMagnification()+1)*100}% → ${alienMagnification()*100}%`;}if(speedDropped)$('#resultDetail').textContent+=' 2배속권 획득!';if(sp){const itemName=sp.item==='ribboncap'?'레벨 상한 보상':sp.item==='ribbonorange'?'리본 오렌지':sp.item==='nyancom'?'야옹컴':sp.item==='all'?'부스트':BOOSTS[sp.item]?BOOST_NAME[sp.item]:'스피드업';$('#resultDetail').textContent=win?(specialDrop?specialItemText(sp.item,specialDrop):!specialDropOpen(sp)?(sp.item==='ribbonorange'&&!ribbonReady()?'리본 오렌지는 곧 등장해요!':'클리어!'):`이번에는 ${itemName}을(를) 얻지 못했어요. 다시 도전해 보세요!`)+(specialXp?` · 보상 +${specialXp} XP`:''):'전력을 올리고 다시 도전하세요.'}renderNewButtons();renderOrangeButton();renderYellowButton();renderGreenButton()}$('#restartBtn').onclick=reset;
$('#skipBtn').onclick=()=>{game.tutorial=6;tutorial();render()};
$('#pauseBtn').onclick=()=>{if(game.running&&!game.ended){game.paused=!game.paused;render()}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.running&&!game.ended){game.paused=true;render()}});



// Original PNG atlas coordinates: Doge only, not Doge Dark or variants.
const DOG_FRAMES={walk:[[4,50],[57,50],[110,50]],attack:[[4,125],[57,125],[110,125],[164,125]],hurt:[[4,201]]};
function animateDog(u){
 if(u.type==='pigge'||u.type==='stpigge'){animatePigge(u);return}
 if(u.type==='snache'){animateSnache(u);return}
 if(u.type==='leboin'){animateLeboin(u);return}
 if(u.type==='bear'){animateBear(u);return}
 if(NEW_ATLASES[u.type]){animateAtlas(u);return}
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 const frames=DOG_FRAMES[state];
 const index=state==='walk'?Math.floor(u.animTime/.14)%3:state==='attack'?Math.min(3,Math.floor((.56-u.attackTime)/.14)):0;
 const [x,y]=frames[index];
 u.el.dataset.animation=state;
 u.el.querySelector('.dog-sprite').style.backgroundPosition=`-${x}px -${y}px`;
}


// Snache has no dedicated hurt frame; reuse its pose with a hit flash.
const SNACHE_FRAMES={walk:[[6,43,54,52],[63,43,58,52],[124,43,62,52],[189,43,69,52]],attack:[[5,113,52,59],[60,113,52,59],[115,113,74,59],[192,113,74,59]]};
function animateSnache(u){
 const attacking=u.attackTime>0;
 const frame=attacking?Math.min(3,Math.floor((.56-u.attackTime)/.14)):Math.floor(u.animTime/.14)%4;
 const [x,y,w,h]=SNACHE_FRAMES[attacking?'attack':'walk'][frame];
 const sprite=u.el.querySelector('.dog-sprite');
 sprite.style.backgroundPosition=`-${x}px -${y}px`;
 sprite.style.width=w+'px';sprite.style.height=h+'px';
 // Keep the tail anchored while the head reaches forward in the attack.
 sprite.style.left='-10px';
 sprite.style.filter=u.hurtTime>0?'brightness(1.8)':'none';
 u.el.dataset.animation=u.hurtTime>0?'hurt':attacking?'attack':'walk';
}

// Multi-piece rigs (bear, leboin) must lean as one body during a hitback: rotating each
// piece about its own corner (the generic .knocked-back rule) pulls torso and legs apart.
// Rotate every piece about one shared ground pivot instead, easing back upright.
function leanRig(u,pieces,pivotX,scale){
 const p=u.kbTime>0?1-u.kbTime/HITBACK_DURATION:1,deg=-14*Math.sin(Math.PI*p);
 for(const el of pieces){
  const base=`scale(${scale})`;
  if(!deg||el.style.display==='none'){el.style.transform=base;continue}
  const dx=pivotX-parseFloat(el.style.left),dy=parseFloat(el.style.bottom)||0;
  el.style.transform=`translate(${dx}px,${dy}px) rotate(${deg}deg) translate(${-dx}px,${-dy}px) ${base}`;
 }
}
// bear_sheet.png is the same kind of rig: a legless torso (its belly is cut flat at y=110)
// plus separate 4-frame leg pieces whose 40px-wide top fits that gap exactly. The attack
// poses are full-body drawings: [x,y,w,h,ox], ox re-anchoring the body onto the walk spot.
// The hitback pose is one drawing split across two sheet rows (the right column was too
// narrow): its left half sits at (442,131) and continues at (452,0) — column 509 of the lower
// strip equals column 451 of the upper one. Draw both halves side by side, head over the
// walking head (axis 85.3 in the joined drawing vs 41.5 in the walk torso).
const BEAR_HIT=[[442,131,69,125,0,4],[452,0,60,129,68,0]],BEAR_HIT_AXIS=85.3,BEAR_WALK_AXIS=41.5;
const BEAR_TORSO={x:1,y:1,w:88,h:129},BEAR_LEGS=[[105,3],[195,2],[285,1],[375,2]],BEAR_ATTACK=[[91,56,91,199,6],[184,60,100,195,17],[294,74,146,181,42]];
function animateBear(u){
 const scale=.58,left=-22,d=data.units.bear;
 const body=u.el.querySelector('.dog-sprite'),legs=u.el.querySelector('.dog-sprite-legs');
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 body.style.transform=legs.style.transform=`scale(${scale})`;body.style.transformOrigin=legs.style.transformOrigin='left bottom';
 if(state==='hurt'){
  const hx=left+(BEAR_WALK_AXIS-BEAR_HIT_AXIS)*scale;
  [body,legs].forEach((el,i)=>{const [x,y,w,h,cx,b]=BEAR_HIT[i];el.style.display='block';el.style.width=w+'px';el.style.height=h+'px';el.style.left=(hx+cx*scale)+'px';el.style.bottom=(b*scale)+'px';el.style.backgroundPosition=`-${x}px -${y}px`;el.style.filter='none'});
 }else if(state==='attack'){
  const elapsed=d.attackDuration-u.attackTime,[x,y,w,h,ox]=BEAR_ATTACK[elapsed<d.windup?(elapsed<d.windup/2?0:1):2];
  legs.style.display='none';
  body.style.width=w+'px';body.style.height=h+'px';body.style.left=(left-ox*scale)+'px';body.style.bottom='0px';
  body.style.backgroundPosition=`-${x}px -${y}px`;body.style.filter='none';
 }else{
  const [lx,ly]=BEAR_LEGS[Math.floor(u.animTime/.16)%4],lh=39-ly;
  legs.style.display='block';legs.style.width='62px';legs.style.height=lh+'px';
  legs.style.left=(left+15*scale)+'px';legs.style.bottom='0px';legs.style.backgroundPosition=`-${lx}px -${ly}px`;
  body.style.width=BEAR_TORSO.w+'px';body.style.height=BEAR_TORSO.h+'px';body.style.left=left+'px';
  body.style.bottom=((lh-20)*scale)+'px';body.style.backgroundPosition=`-${BEAR_TORSO.x}px -${BEAR_TORSO.y}px`;
  body.style.filter=legs.style.filter='none';
 }
 leanRig(u,[legs,body],left+45*scale,scale);
 u.el.dataset.animation=state;
}
// leboin_dog-sprite.png is a three-piece rig: a body block (with a tail and stubby legs),
// 3 walking leg slices that replace the body's lower 32px (their right end carries the ear
// lobe), and separate heads (trunk up / trunk up windup / trunk-down spray). Offsets are in
// sheet px relative to the body block's top-left, found by matching the pieces' outlines
// and the eye position (so the spray head lands exactly where the walking head was).
const LEBOIN_BODY={x:306,y:150,w:124,h:97,cut:67};
const LEBOIN_LEGS=[[164,153,140],[166,189,138],[167,223,137]];
const LEBOIN_HEADS={walk:[159,1,133,141,79,-58],windup:[294,1,133,144,79,-61],spray:[1,3,156,154,77,-67]};
function animateLeboin(u){
 const scale=.55,L=-65,G=99,d=data.units.leboin;
 const head=u.el.querySelector('.dog-sprite'),legs=u.el.querySelector('.dog-sprite-legs'),body=u.el.querySelector('.dog-sprite-body');
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 const place=(el,x,y,w,h,px,py)=>{el.style.display='block';el.style.width=w+'px';el.style.height=h+'px';el.style.backgroundPosition=`-${x}px -${y}px`;el.style.left=(L+px*scale)+'px';el.style.bottom=((G-py-h)*scale)+'px';el.style.transform=`scale(${scale})`;el.style.transformOrigin='left bottom'};
 const B=LEBOIN_BODY;let h;
 if(state==='attack'){
  place(body,B.x,B.y,B.w,B.h,0,0);legs.style.display='none';
  h=LEBOIN_HEADS[(d.attackDuration-u.attackTime)>=d.windup?'spray':'windup'];
 }else{
  place(body,B.x,B.y,B.w,B.cut,0,0);
  const [lx,ly,lw]=LEBOIN_LEGS[state==='walk'?Math.floor(u.animTime/.16)%3:0];
  place(legs,lx,ly,lw,32,143-lw,B.cut);
  h=LEBOIN_HEADS.walk;
 }
 place(head,h[0],h[1],h[2],h[3],h[4],h[5]);
 body.style.zIndex=1;legs.style.zIndex=1;head.style.zIndex=2;
 head.style.filter=body.style.filter=legs.style.filter=u.hurtTime>0?'brightness(1.8)':'none';
 leanRig(u,[body,legs,head],L+60*scale,scale);
 u.el.dataset.animation=state;
}

const UNIT_NAMES={magpie:'까치 도둑',ribbonorange:'리본 오렌지',jkbunbun:'셰익스피망',bore:'샤이 보어',raind:'사순록',owlbrow:'부엉이 눈썹',assassinbear:'블랙쿠마',camelle:'혹부리 낙타',kory:'코알락교',mastera:'스승',celeboodle:'된장 푸들',dagshund:'핫도그',duche:'오리룰루',sloth:'늘보보',otta:'두드리',shibalien:'에이리뭉',kroxo:'아거리언',hyppoh:'하앜마양',sael:'스타레오파드',maawth:'날랄라라라방',lemurr:'빅글래숭이',krabbe:'소라게게',phace:'대머리군',ursamajor:'쿠만츄',clione:'파괴생물 쿠오리넨',nimoy:'불칸 보어',liz56:'엘리자베스 56세',shyboy:'홍당무왕',gorydark:'블랙 고릴라저씨',shadowboxer:'쉐도우 복서',heavenlyhippoe:'천사 하마양',pink:'핑크',rhino:'투뿔소',bear:'곰선생',face:'대갈이군',cyan:'시안',blue:'블루',purple:'퍼플',peng:'재키펭',gory:'고릴라저씨',baa:'메에메에',seal:'바다레오파드',croco:'아거',leboin:'빠옹',rabbit:'엘리트래빗',squirrel:'다람G',kangaroo:'캥거류',mooth:'나나나난나방',red:'레드',orange:'오렌지',green:'그린',yellow:'옐로우',dog:'멍뭉이',onyx:'오닉스',nyandam:'악의제왕 야옹마',bunbun:'맴매 선생',darkdog:'살의의 멍뭉이',metalhippo:'메탈 하마양',stpigge:'엘리자베스 2세',gabriel:'가브리엘',ectosnache:'엑토 낼름이',snache:'낼름이',guys:'놈놈놈',hippo:'하마양',pigge:'돼지새끼',crimson:'크림슨',gold:'골드',ivory:'아이보리',chartreuse:'샤르트뢰즈',mint:'민트',azure:'애저',crystal:'크리스탈',lavender:'라벤더',salmon:'살몬',raspberry:'라즈베리',black:'블랙',white:'화이트',maroon:'마룬',brown:'브라운',tan:'탄',beige:'베이지',cream:'크림',olive:'올리브',clover:'클로버',indigo:'인디고',lilac:'라일락',hotpink:'핫 핑크',ruby:'루비',hacienda:'하시엔다',garnet:'가넷',prism:'프리즘',rainbow:'레인보우',plum:'플럼',forest:'포레스트',canary:'카나리',cherry:'체리',mauve:'모브',khaki:'카키',tangerine:'탠저린',burgundy:'버건디',mustard:'머스터드',sky:'스카이',denim:'데님',charcoal:'차콜',cornflower:'길리먼 블루',bittersweet:'그레이프프루트 펄프',claret:'아틀라스 레드',verdigris:'베르디그리',lapis:'라피스',selenite:'셀레나이트',topaz:'토파즈',maple:'메이플',brick:'브릭',korn:'콘',teal:'틸',violet:'바이올',orchid:'오키드',cobalt:'코발트',flame:'플레임',scarlet:'스칼렛',moss:'모스',coral:'코랄',aqua:'아쿠아',cooper:'쿠퍼',navy:'네이비',dandelion:'민들레',babyblue:'베이비 블루',mintcyan:'민트시안',peach:'피치',lightcream:'라이트 크림',midnight:'미드나잇',darklilac:'다크 라일락',fusioncream:'퓨전 크림',silver:'실버',lava:'라바',babypink:'베이비 핑크',magenta:'마젠타'};
// Every rule sourced from each stage's wiki Battleground section: {type, at:{t:seconds}|{hp:percent}, delay:[min,max] (omit for a one-shot), count (omit = infinite), boss:true (adds the shockwave+banner, only where the wiki says "spawns as the boss")}.
const STAGE_SPAWNS={
0:[{type:'dog',at:{t:0},count:1},{type:'dog',at:{t:20},delay:[6,10]}],
1:[{type:'dog',at:{t:0},delay:[6,10]},{type:'snache',at:{t:20},delay:[10,26.67]}],
2:[{type:'dog',at:{t:0},delay:[4.67,8]},{type:'snache',at:{t:20},delay:[10,26.67]}],
3:[{type:'dog',at:{t:0},delay:[6,10]},{type:'snache',at:{t:0},delay:[10,26.67]},{type:'guys',at:{t:40},delay:[10,26.67]}],
4:[{type:'dog',at:{t:0},delay:[6,10]},{type:'snache',at:{t:0},delay:[10,26.67]},{type:'guys',at:{t:40},delay:[10,26.67]}],
5:[{type:'dog',at:{t:0},delay:[6,10]},{type:'snache',at:{t:0},delay:[10,26.67]},{type:'guys',at:{t:40},delay:[10,26.67]}],
6:[{type:'dog',at:{t:0},delay:[10.67,18.67]},{type:'snache',at:{t:0},delay:[15,40]},{type:'guys',at:{t:40},delay:[15,40]},{type:'guys',at:{hp:90},count:6,delay:[2,4]},{type:'hippo',at:{hp:90},count:1,boss:true}],
7:[{type:'dog',at:{t:0},delay:[6,10]},{type:'snache',at:{t:10},delay:[10,26.67]},{type:'guys',at:{t:20},delay:[10,26.67]},{type:'guys',at:{hp:90},count:20,delay:[1,2]}],
8:[{type:'dog',at:{t:0},delay:[4,10]},{type:'dog',at:{t:30},delay:[6,30]},{type:'snache',at:{t:60},delay:[10,30]},{type:'guys',at:{t:90},delay:[10,30]},{type:'guys',at:{hp:60},count:20,delay:[0.07,0.13]}],
9:[{type:'dog',at:{t:0},delay:[10.67,18.67]},{type:'snache',at:{t:8},delay:[15,40]},{type:'guys',at:{t:40},delay:[15,40]},{type:'guys',at:{hp:95},count:6,delay:[2,4]},{type:'pigge',at:{hp:90},count:1,boss:true}],
10:[{type:'dog',at:{t:0},delay:[10.67,18.67]},{type:'snache',at:{t:8},delay:[15,40]},{type:'guys',at:{t:40},delay:[10,40]},{type:'guys',at:{hp:90},count:6,delay:[2,4]},{type:'hippo',at:{hp:80},count:1},{type:'hippo',at:{hp:40},count:1}],
11:[{type:'dog',at:{t:0},delay:[10.67,18.67]},{type:'snache',at:{t:8},delay:[15,40]},{type:'guys',at:{t:40},delay:[10,40]},{type:'guys',at:{hp:99},count:6,delay:[2,4]},{type:'pigge',at:{hp:98},count:1},{type:'pigge',at:{hp:78},count:1}],
12:[{type:'dog',at:{t:0},delay:[6.67,13.33]},{type:'snache',at:{t:20},delay:[6.67,13.33]},{type:'guys',at:{t:40},delay:[6.67,13.33]},{type:'guys',at:{hp:90},count:6,delay:[2,4]},{type:'peng',at:{hp:90},count:1},{type:'guys',at:{hp:88},delay:[3.33,13.33]},{type:'peng',at:{hp:88},count:1}],
13:[{type:'dog',at:{t:0},delay:[21.33,37.33]},{type:'snache',at:{t:20},delay:[20,40]},{type:'guys',at:{t:40},delay:[20,40]},{type:'hippo',at:{t:0},count:1},{type:'guys',at:{hp:99},count:6,delay:[2,4]},{type:'hippo',at:{hp:50},count:1}],
14:[{type:'dog',at:{t:0},delay:[1,10]},{type:'snache',at:{t:20},delay:[10,20]},{type:'guys',at:{t:40},delay:[20,40]},{type:'pigge',at:{t:60},count:1},{type:'hippo',at:{t:80},count:1},{type:'pigge',at:{t:120},count:1},{type:'hippo',at:{t:120},count:1},{type:'guys',at:{hp:99},count:8,delay:[0.67,2]}],
15:[{type:'guys',at:{t:0},delay:[1,10]},{type:'dog',at:{t:0},delay:[10,20]},{type:'guys',at:{t:0},delay:[10,20]},{type:'guys',at:{hp:85},count:12,delay:[0.67,2]},{type:'gory',at:{hp:85},count:1},{type:'gory',at:{hp:60},count:1,boss:true}],
16:[{type:'dog',at:{t:0},delay:[1,10]},{type:'snache',at:{t:0},delay:[1,10]},{type:'guys',at:{t:0},delay:[1,10]},{type:'peng',at:{t:100},count:1},{type:'peng',at:{t:102},count:1},{type:'pigge',at:{t:120},delay:[26.67,40]},{type:'hippo',at:{t:120},delay:[26.67,40]},{type:'peng',at:{hp:20},count:2}],
17:[{type:'dog',at:{t:0},delay:[1,10]},{type:'snache',at:{t:0},delay:[1,10]},{type:'guys',at:{t:0},delay:[1,10]},{type:'peng',at:{t:100},count:1},{type:'pigge',at:{t:120},delay:[26.67,40]},{type:'peng',at:{t:120},delay:[26.67,40]},{type:'peng',at:{hp:62},count:1},{type:'peng',at:{hp:61},count:1},{type:'peng',at:{hp:60},count:2}],
18:[{type:'guys',at:{t:0},delay:[1,20]},{type:'guys',at:{t:0},delay:[1,20]},{type:'guys',at:{t:10},delay:[1,10]},{type:'gory',at:{t:100},count:1},{type:'baa',at:{t:60},delay:[1,10]},{type:'gory',at:{t:120},count:2,delay:[0.07,0.07]},{type:'baa',at:{hp:60},count:10,delay:[1,2]}],
19:[{type:'dog',at:{t:0},delay:[1,10]},{type:'snache',at:{t:0},delay:[1,10]},{type:'guys',at:{t:10},delay:[1,10]},{type:'baa',at:{t:60},delay:[1,10]},{type:'pigge',at:{t:60},delay:[20,40]},{type:'hippo',at:{t:80},delay:[20,40]},{type:'gory',at:{t:120},count:4,delay:[20,40]}],
20:[{type:'dog',at:{t:0},delay:[1,10]},{type:'snache',at:{t:0},delay:[1,10]},{type:'guys',at:{t:0},delay:[1,10]},{type:'baa',at:{t:60},delay:[1,10]},{type:'pigge',at:{t:60},delay:[20,40]},{type:'hippo',at:{t:80},delay:[20,40]},{type:'gory',at:{t:120},delay:[20,40]},{type:'peng',at:{t:80},delay:[20,40]}],
21:[{type:'snache',at:{t:0},delay:[1,10]},{type:'snache',at:{t:0},delay:[1,10]},{type:'guys',at:{t:0},delay:[1,10]},{type:'baa',at:{t:0},delay:[1,10]},{type:'peng',at:{t:0},count:1},{type:'gory',at:{hp:80},count:2,delay:[0.07,2]},{type:'gory',at:{hp:70},count:2,delay:[0.07,2]},{type:'gory',at:{hp:60},count:2,delay:[0.07,2]}],
22:[{type:'guys',at:{t:0},delay:[1,4]},{type:'pigge',at:{t:10},count:1},{type:'guys',at:{hp:95},delay:[1,2]},{type:'seal',at:{hp:93},count:1,boss:true}],
23:[{type:'gory',at:{t:120},count:1},{type:'peng',at:{t:120},count:1},{type:'pigge',at:{t:60},count:1},{type:'hippo',at:{t:0},count:1},{type:'hippo',at:{hp:90},delay:[10,40]},{type:'pigge',at:{hp:90},delay:[10,40]},{type:'peng',at:{hp:90},delay:[10,40]},{type:'gory',at:{hp:90},delay:[10,40]}],
24:[{type:'dog',at:{t:0},delay:[1,10]},{type:'snache',at:{t:0},delay:[1,10]},{type:'guys',at:{t:20},delay:[1,2]},{type:'hippo',at:{t:40},count:1},{type:'baa',at:{hp:50},delay:[4.33,8]},{type:'peng',at:{hp:50},delay:[4.33,8]}],
25:[{type:'croco',at:{t:0},count:1},{type:'croco',at:{t:10},delay:[5.33,8]},{type:'croco',at:{t:30},delay:[4,8]},{type:'croco',at:{hp:90},delay:[4,10]},{type:'seal',at:{hp:90},count:1},{type:'croco',at:{hp:70},delay:[3,8]},{type:'croco',at:{hp:70},delay:[3,8]},{type:'croco',at:{hp:70},delay:[0.07,2]}],
26:[{type:'dog',at:{t:0},delay:[3.33,13.33]},{type:'snache',at:{t:10},delay:[6.67,26.67]},{type:'guys',at:{t:20},delay:[10,40]},{type:'croco',at:{t:40},delay:[10,40]},{type:'gory',at:{t:80},delay:[20,40]},{type:'seal',at:{t:120},delay:[20,40]},{type:'baa',at:{hp:50},delay:[10,40]}],
27:[{type:'dog',at:{t:0},delay:[3.33,13.33]},{type:'snache',at:{t:10},delay:[5,6.67]},{type:'guys',at:{t:20},delay:[6.67,10]},{type:'croco',at:{t:40},delay:[10,20]},{type:'gory',at:{t:120},delay:[20,40]},{type:'seal',at:{t:120},delay:[20,40]},{type:'peng',at:{t:80},delay:[20,40]},{type:'hippo',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]}],
28:[{type:'dog',at:{t:0},delay:[3.33,30]},{type:'snache',at:{t:10},delay:[10,20]},{type:'guys',at:{t:20},delay:[10,10]},{type:'croco',at:{t:40},delay:[10,40]},{type:'leboin',at:{hp:90},count:1,boss:true},{type:'guys',at:{hp:90},delay:[0.07,1]},{type:'guys',at:{hp:90},count:20,delay:[0.07,0.07]}],
29:[{type:'snache',at:{t:10},delay:[5,6.67]},{type:'guys',at:{t:20},delay:[6.67,10]},{type:'croco',at:{t:40},delay:[10,20]},{type:'baa',at:{t:60},delay:[10,20]},{type:'gory',at:{t:120},delay:[20,40]},{type:'seal',at:{t:120},delay:[20,40]},{type:'peng',at:{t:80},delay:[20,40]},{type:'hippo',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]}],
30:[{type:'croco',at:{t:0},delay:[3.33,10]},{type:'guys',at:{t:10},delay:[5,10]},{type:'baa',at:{t:20},delay:[6.67,10]},{type:'leboin',at:{t:60},count:1},{type:'pigge',at:{t:120},delay:[20,40]}],
31:[{type:'guys',at:{t:0},delay:[3.33,13.33]},{type:'rabbit',at:{t:20},delay:[2,10]},{type:'seal',at:{t:60},delay:[20,40]},{type:'pigge',at:{t:40},delay:[20,40]},{type:'rabbit',at:{hp:99},delay:[2,10]}],
32:[{type:'snache',at:{t:10},delay:[5,6.67]},{type:'guys',at:{t:20},delay:[6.67,10]},{type:'croco',at:{t:40},delay:[10,20]},{type:'baa',at:{t:60},delay:[10,20]},{type:'gory',at:{t:100},delay:[20,40]},{type:'seal',at:{t:120},delay:[20,40]},{type:'peng',at:{t:80},delay:[20,40]},{type:'hippo',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]},{type:'gory',at:{t:120},delay:[20,40]},{type:'gory',at:{hp:50},count:4,delay:[0.07,0.07]}],
33:[{type:'snache',at:{t:10},delay:[5,6.67]},{type:'guys',at:{t:20},delay:[6.67,10]},{type:'croco',at:{t:40},delay:[10,20]},{type:'baa',at:{t:60},delay:[10,20]},{type:'gory',at:{t:100},delay:[20,40]},{type:'seal',at:{t:120},delay:[20,40]},{type:'peng',at:{t:80},delay:[20,40]},{type:'hippo',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]},{type:'seal',at:{hp:90},count:1},{type:'seal',at:{hp:70},count:1},{type:'seal',at:{hp:50},count:1},{type:'seal',at:{hp:30},count:1}],
34:[{type:'dog',at:{t:0},delay:[4,13.33]},{type:'snache',at:{t:13.33},delay:[4,13.33]},{type:'guys',at:{t:60},delay:[4,13.33]},{type:'croco',at:{t:80},delay:[10,20]},{type:'rabbit',at:{t:100},delay:[10,20]},{type:'kangaroo',at:{hp:99},count:1,boss:true}],
35:[{type:'dog',at:{t:0},delay:[3.33,10]},{type:'snache',at:{t:13.33},delay:[3.33,10]},{type:'guys',at:{t:60},delay:[3.33,10]},{type:'croco',at:{t:80},delay:[3.33,10]},{type:'rabbit',at:{t:100},delay:[3.33,13.33]},{type:'baa',at:{t:100},delay:[3.33,20]},{type:'hippo',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]},{type:'leboin',at:{t:100},count:1},{type:'leboin',at:{t:120},delay:[26.67,40]}],
36:[{type:'dog',at:{t:0},delay:[3.33,10]},{type:'snache',at:{t:13.33},delay:[3.33,10]},{type:'guys',at:{t:6.67},delay:[3.33,10]},{type:'croco',at:{t:80},delay:[3.33,10]},{type:'rabbit',at:{t:100},delay:[3.33,13.33]},{type:'baa',at:{t:100},delay:[3.33,20]},{type:'hippo',at:{t:120},delay:[20,40]},{type:'pigge',at:{t:120},delay:[20,40]},{type:'kangaroo',at:{t:100},count:1},{type:'kangaroo',at:{t:120},count:1}],
37:[{type:'dog',at:{t:0},delay:[10,30]},{type:'guys',at:{t:0},delay:[10,30]},{type:'squirrel',at:{t:30},delay:[10,30]},{type:'gory',at:{hp:99},count:1},{type:'gory',at:{hp:97},count:1},{type:'gory',at:{hp:95},count:1},{type:'guys',at:{hp:95},delay:[1,10]},{type:'gory',at:{hp:93},count:1},{type:'mooth',at:{hp:92},count:1,boss:true},{type:'croco',at:{hp:92},delay:[1,10]},{type:'squirrel',at:{hp:92},delay:[1,10]}],
38:[{type:'dog',at:{t:0},delay:[3,14]},{type:'snache',at:{t:0},delay:[3,14]},{type:'guys',at:{t:40},delay:[6,14]},{type:'squirrel',at:{t:80},delay:[6,14]},{type:'gory',at:{t:66.67},delay:[26.67,40]},{type:'seal',at:{t:86.67},delay:[26.67,40]},{type:'peng',at:{t:106.67},delay:[26.67,40]},{type:'gory',at:{hp:80},count:3,delay:[0.07,0.07]},{type:'peng',at:{hp:60},count:8,delay:[0.07,0.07]},{type:'seal',at:{hp:40},count:4,delay:[0.07,0.07]}],
39:[{type:'dog',at:{t:0},delay:[3,14]},{type:'snache',at:{t:0},delay:[3,14]},{type:'guys',at:{t:40},delay:[6,14]},{type:'squirrel',at:{t:80},delay:[6,14]},{type:'gory',at:{t:66.67},delay:[26.67,40]},{type:'seal',at:{t:86.67},delay:[26.67,40]},{type:'peng',at:{t:40},delay:[20,30]},{type:'gory',at:{t:80},delay:[26.67,40]},{type:'leboin',at:{t:100},delay:[40,40]},{type:'kangaroo',at:{hp:80},count:1},{type:'kangaroo',at:{hp:60},count:1}],
40:[{type:'guys',at:{t:0},delay:[1,10]},{type:'croco',at:{t:20},delay:[10,30]},{type:'squirrel',at:{t:0},delay:[1,16.67]},{type:'rhino',at:{t:0},count:1},{type:'rhino',at:{hp:80},count:1,boss:true}],
41:[{type:'dog',at:{t:0},delay:[3,14]},{type:'snache',at:{t:0},delay:[3,14]},{type:'guys',at:{t:40},delay:[6,14]},{type:'squirrel',at:{t:80},delay:[6,14]},{type:'gory',at:{t:66.67},delay:[26.67,40]},{type:'seal',at:{t:86.67},delay:[26.67,40]},{type:'peng',at:{t:40},delay:[20,30]},{type:'gory',at:{t:80},delay:[10,30]},{type:'leboin',at:{t:100},delay:[40,40]},{type:'kangaroo',at:{t:120},count:1},{type:'kangaroo',at:{hp:50},count:2}],
42:[{type:'dog',at:{t:0},delay:[3,20]},{type:'snache',at:{t:0},delay:[3,20]},{type:'guys',at:{t:40},delay:[3,20]},{type:'croco',at:{t:20},delay:[3,20]},{type:'rabbit',at:{t:20},delay:[3,20]},{type:'pigge',at:{t:30},delay:[20,40]},{type:'seal',at:{t:60},delay:[20,40]},{type:'rabbit',at:{t:90},delay:[20,40]},{type:'rhino',at:{t:20},count:1},{type:'rhino',at:{hp:80},count:1},{type:'rhino',at:{hp:60},count:1}],
43:[{type:'dog',at:{t:0},delay:[3,14]},{type:'snache',at:{t:0},delay:[3,14]},{type:'guys',at:{t:40},delay:[6,14]},{type:'squirrel',at:{t:0},delay:[1,2]},{type:'bear',at:{hp:99},count:1,boss:true}],
44:[{type:'hippo',at:{t:0},delay:[1,2]},{type:'pigge',at:{t:0},delay:[1,2]},{type:'peng',at:{t:40},delay:[10,20]},{type:'gory',at:{t:60},delay:[13.33,30]},{type:'seal',at:{t:80},delay:[30,40]},{type:'leboin',at:{t:100},delay:[25.88,40]},{type:'kangaroo',at:{t:120},delay:[21.66,40]},{type:'mooth',at:{t:120},count:1}],
45:[{type:'squirrel',at:{t:0},count:20,delay:[0.67,1]},{type:'bear',at:{t:100},delay:[30,40]},{type:'bear',at:{hp:99},count:1},{type:'squirrel',at:{t:0},delay:[3.33,10]},{type:'pigge',at:{t:0},delay:[26.67,40]},{type:'rabbit',at:{t:0},delay:[20,40]},{type:'mooth',at:{hp:90},count:1}],
46:[{type:'guys',at:{t:0},delay:[0.07,0.07]},{type:'hippo',at:{t:0},delay:[1,2]},{type:'peng',at:{t:0},delay:[1,2]},{type:'gory',at:{t:60},delay:[13.33,30]},{type:'seal',at:{t:80},delay:[20,40]},{type:'leboin',at:{t:100},delay:[21.33,40]},{type:'kangaroo',at:{t:120},delay:[24,40]},{type:'rhino',at:{t:120},delay:[30.77,40]},{type:'bear',at:{t:120},delay:[20,40]}],
47:[{type:'dog',at:{t:5},delay:[5,6]},{type:'snache',at:{t:12},delay:[12,13]},{type:'guys',at:{t:9},delay:[9,15]},{type:'rhino',at:{t:28},delay:[21.54,40]},{type:'bear',at:{t:32},delay:[22.07,40]},{type:'face',at:{hp:50},count:1,boss:true}]
};
// Mirror the same spawn composition/timing onto the Chapter 2 stage indices; only the
// unitStats() magnification differs at spawn time.
for(let i=0;i<CHAPTER1_LEN-1;i++){STAGE_SPAWNS[CHAPTER1_LEN+i]=STAGE_SPAWNS[i].map(r=>({...r}))}
for(let i=0;i<CHAPTER1_LEN-1;i++){STAGE_SPAWNS[CH3_START+i]=STAGE_SPAWNS[i].map(r=>({...r}))}
STAGE_SPAWNS[CH3_START+CHAPTER1_LEN-1]=[{type:'guys',at:{t:0},delay:[.13,1]},{type:'croco',at:{t:20},delay:[.27,1.33]},{type:'rabbit',at:{t:20},delay:[.27,1.33]},{type:'kangaroo',at:{t:0},delay:[13.33,60]},{type:'seal',at:{t:0},delay:[10,40]},{type:'mooth',at:{t:40},delay:[60,80]},{type:'gory',at:{hp:99},delay:[6.67,20]},{type:'pigge',at:{hp:99},delay:[6.67,20]},{type:'guys',at:{hp:99},delay:[.67,2]},{type:'mooth',at:{hp:99},count:4,delay:[.07,.07]},{type:'kangaroo',at:{hp:99},count:6,delay:[.07,4]},{type:'seal',at:{hp:99},count:6,delay:[4,13.33]},{type:'gory',at:{hp:99},count:10,delay:[.07,1.33]},{type:'bunbun',at:{hp:70},count:1,boss:true}];
STAGE_SPAWNS[CHAPTER1_LEN*2-1]=[{type:'nyandam',at:{t:0},count:1,boss:true},{type:'guys',at:{t:0},delay:[.13,1]},{type:'hippo',at:{t:0},delay:[10,40]},{type:'peng',at:{t:0},delay:[13.33,60]},{type:'rhino',at:{t:40},delay:[66.67,100]},{type:'croco',at:{t:0},delay:[6,33.33]},{type:'croco',at:{t:80},delay:[.27,1.33]},{type:'squirrel',at:{t:0},delay:[6,66.67]},{type:'squirrel',at:{t:120},delay:[.27,1.33]}];
TUESDAY_STAGES.forEach((t,k)=>{const boss=t.boss,rules=[{type:'dog',at:{t:0},delay:[4,8]},{type:'snache',at:{t:5},delay:[8,20]},{type:'guys',at:{t:15},delay:[10,26]},{type:boss,at:{hp:90},count:1,boss:true}];if(k>=1)rules.push({type:boss,at:{hp:50},count:k>=3?2:1,delay:[6,10]});STAGE_SPAWNS[MAIN_STAGE_COUNT+k]=rules});
FRIDAY_STAGES.forEach((t,k)=>{const boss=t.boss,rules=[{type:'dog',at:{t:0},delay:[4,8]},{type:'croco',at:{t:3},delay:[2,5]},{type:'guys',at:{t:12},delay:[8,22]},{type:boss,at:{hp:90},count:1,boss:true}];if(k>=1)rules.push({type:boss,at:{hp:50},count:k>=2?2:1,delay:[6,10]});STAGE_SPAWNS[FRIDAY_START+k]=rules});
[
 [{type:'dog',at:{t:0},delay:[2,6],count:50,mag:200},{type:'snache',at:{t:0},delay:[2,6],count:50,mag:200},{type:'guys',at:{t:0},delay:[2,6],count:50,mag:200}],
 [{type:'guys',at:{t:0},delay:[2,12],mag:400},{type:'metalhippo',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'croco',at:{hp:99},count:30,delay:[.13,.8],mag:400}],
 [{type:'baa',at:{t:0},count:1,mag:400},{type:'baa',at:{t:40},delay:[20,40],mag:400},{type:'guys',at:{t:0},delay:[3,20],mag:400},{type:'stpigge',at:{hp:50},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'peng',at:{t:40},delay:[2,8],count:3,mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'gory',at:{hp:90},count:3,delay:[1,2],boss:true,mag:500}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'leboin',at:{hp:90},count:1,boss:true,mag:300}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'gory',at:{hp:95},count:1,mag:400},{type:'hippo',at:{hp:95},count:1,mag:400},{type:'gory',at:{hp:85},count:1,mag:400},{type:'hippo',at:{hp:85},count:1,mag:400},{type:'gory',at:{hp:75},count:1,mag:400},{type:'hippo',at:{hp:75},count:1,mag:400},{type:'gory',at:{hp:65},count:1,mag:400},{type:'hippo',at:{hp:65},count:1,mag:400},{type:'darkdog',at:{hp:50},count:4,delay:[.07,.13]},{type:'squirrel',at:{hp:50},count:1,boss:true}]
].forEach((rules,k)=>{STAGE_SPAWNS[LEGEND_START+k]=rules});
// Legend subchapters 2-5 spawn tables (battlecats-db; frames /30 -> seconds, Ms. Sign left out).
[
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'metalhippo',at:{t:0},count:1,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'gory',at:{t:0},count:4,delay:[10.67,23.33],mag:400},{type:'gory',at:{hp:80},count:4,delay:[2,6],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'mooth',at:{hp:90},count:1,boss:true,mag:400},{type:'darkdog',at:{hp:90},count:3,delay:[0.33,1.33],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:20},delay:[3,20],mag:400},{type:'guys',at:{hp:99},delay:[3,20],mag:400},{type:'baa',at:{hp:99},delay:[6.67,20],mag:400},{type:'metalhippo',at:{hp:99},count:1,mag:100},{type:'stpigge',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'seal',at:{t:0},count:1,mag:400},{type:'pigge',at:{t:16.67},delay:[20,40],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:20},delay:[20,40],mag:400},{type:'hippo',at:{t:13.33},delay:[20,40],mag:400},{type:'peng',at:{t:26.67},delay:[20,40],mag:400},{type:'peng',at:{hp:99},delay:[20,40],mag:400},{type:'kangaroo',at:{hp:99},count:2,delay:[0.07,0.13],mag:400},{type:'kangaroo',at:{hp:99},count:1,mag:400},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:100},{type:'darkdog',at:{t:20},delay:[33.33,40],mag:100},{type:'darkdog',at:{hp:99},delay:[20,26.67],mag:100},{type:'darkdog',at:{hp:99},count:3,delay:[0.67,2],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'guys',at:{hp:60},delay:[0.67,1.33],mag:400},{type:'croco',at:{hp:60},delay:[0.67,1.33],mag:400},{type:'mastera',at:{hp:60},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'hippo',at:{t:40},delay:[3,20],mag:400},{type:'peng',at:{t:13.33},delay:[3,20],mag:400},{type:'pigge',at:{t:26.67},delay:[3,20],mag:400},{type:'peng',at:{hp:95},count:3,delay:[2,4],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'stpigge',at:{hp:99},count:1,mag:100},{type:'stpigge',at:{hp:99},count:1,mag:100},{type:'stpigge',at:{hp:99},count:1,mag:100}],
 [{type:'guys',at:{t:0},delay:[3,20],mag:400},{type:'gory',at:{t:0},delay:[13.33,26.67],mag:400},{type:'baa',at:{t:40},delay:[6.67,20],mag:400},{type:'darkdog',at:{t:40},delay:[20,33.33],mag:100},{type:'celeboodle',at:{hp:90},delay:[3,20],mag:100},{type:'darkdog',at:{hp:90},count:4,delay:[0.07,0.67],mag:100},{type:'celeboodle',at:{hp:90},count:4,delay:[0.07,0.13],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{hp:99},delay:[3,20],mag:400},{type:'baa',at:{hp:99},delay:[3,20],mag:400},{type:'pigge',at:{hp:99},delay:[3,20],mag:400},{type:'rabbit',at:{hp:99},delay:[3,20],mag:400},{type:'gory',at:{hp:99},delay:[3,20],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'baa',at:{t:40},delay:[3,20],mag:400},{type:'leboin',at:{t:53.33},delay:[40,66.67],mag:400},{type:'hippo',at:{t:40},delay:[3,20],mag:400},{type:'gory',at:{t:40},delay:[3,12],mag:400},{type:'peng',at:{t:40},delay:[3,12],mag:400},{type:'leboin',at:{hp:90},count:1,mag:400}],
 [{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:0},delay:[3,20],mag:400},{type:'peng',at:{t:20},delay:[5.33,20],mag:400},{type:'celeboodle',at:{t:40},delay:[13.33,30.67],mag:100},{type:'mastera',at:{t:26.67},count:1,mag:100}],
 [{type:'guys',at:{t:0},delay:[3,20],mag:400},{type:'pigge',at:{t:0},delay:[3,20],mag:400},{type:'seal',at:{t:40},delay:[6.67,20],mag:400},{type:'seal',at:{hp:80},count:1,mag:400},{type:'seal',at:{hp:60},count:1,mag:400},{type:'metalhippo',at:{t:0},count:2,delay:[3,20],mag:100}],
 [{type:'darkdog',at:{t:23.33},delay:[29.33,29.33],mag:100},{type:'darkdog',at:{t:23},delay:[29.33,29.33],mag:100},{type:'darkdog',at:{t:22.67},delay:[29.33,29.33],mag:100},{type:'dagshund',at:{hp:99},count:1,mag:100},{type:'dagshund',at:{hp:99},count:1,mag:100},{type:'dagshund',at:{hp:99},count:1,mag:100},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'hippo',at:{t:40},delay:[10,20],mag:400},{type:'squirrel',at:{t:20},delay:[3,20],mag:400},{type:'mastera',at:{t:40},count:1,mag:100},{type:'mastera',at:{t:40},count:1,mag:100}],
 [{type:'croco',at:{t:0},delay:[2,10],mag:400},{type:'croco',at:{t:20},delay:[2,10],mag:400},{type:'celeboodle',at:{t:46.67},count:1,mag:100},{type:'seal',at:{t:0},delay:[6.67,20],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'croco',at:{t:0},delay:[3,20],mag:400},{type:'baa',at:{t:20},delay:[3,20],mag:400},{type:'gory',at:{t:40},delay:[20,20],mag:400},{type:'gory',at:{t:40},delay:[20,20],mag:400},{type:'gory',at:{t:40},delay:[20,20],mag:400},{type:'seal',at:{t:40},delay:[3,20],mag:400},{type:'leboin',at:{t:0},count:1,mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'croco',at:{t:40},delay:[3,20],mag:400},{type:'duche',at:{hp:80},delay:[4,8],mag:100},{type:'duche',at:{hp:80},count:1,mag:100},{type:'duche',at:{hp:80},count:1,mag:100},{type:'duche',at:{hp:80},count:1,mag:100},{type:'stpigge',at:{hp:80},count:1,boss:true,mag:100},{type:'metalhippo',at:{hp:80},count:1,mag:100},{type:'darkdog',at:{hp:80},delay:[6,10],mag:100},{type:'darkdog',at:{hp:80},delay:[6,10],mag:100},{type:'darkdog',at:{hp:80},delay:[6,10],mag:100},{type:'darkdog',at:{hp:80},count:2,delay:[0.07,0.13],mag:100},{type:'darkdog',at:{hp:80},count:1,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'rhino',at:{t:0},count:1,mag:400},{type:'rabbit',at:{hp:96},delay:[1,6],mag:400},{type:'pigge',at:{hp:96},delay:[3,8],mag:400},{type:'rhino',at:{hp:96},count:3,delay:[0.07,0.13],mag:400},{type:'rhino',at:{hp:96},count:1,mag:400},{type:'squirrel',at:{hp:96},count:1,boss:true,mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'gory',at:{t:40},delay:[3,20],mag:400},{type:'seal',at:{t:40},delay:[6.67,20],mag:400},{type:'dagshund',at:{t:46.67},delay:[53.33,53.33],mag:100},{type:'mastera',at:{t:33.33},count:1,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'bear',at:{t:0},delay:[40,53.33],mag:400},{type:'rabbit',at:{hp:99},delay:[3,6],mag:400},{type:'darkdog',at:{t:0},delay:[8,12],mag:100},{type:'darkdog',at:{hp:99},delay:[8,12],mag:100},{type:'darkdog',at:{hp:80},delay:[8,12],mag:100},{type:'bear',at:{hp:99},count:1,mag:400}],
 [{type:'sloth',at:{t:0},count:1,boss:true,mag:100},{type:'celeboodle',at:{t:120},delay:[24,30.67],mag:100},{type:'darkdog',at:{t:100.67},delay:[24,30.67],mag:100},{type:'darkdog',at:{t:100.67},delay:[24,30.67],mag:100}],
 [{type:'croco',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'gory',at:{t:40},delay:[3,20],mag:400},{type:'mastera',at:{hp:90},count:1,mag:100},{type:'dagshund',at:{hp:90},count:1,mag:100},{type:'dagshund',at:{hp:90},count:1,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:0},delay:[0.07,4],mag:400},{type:'mastera',at:{t:0},count:1,mag:100},{type:'mastera',at:{t:0},count:1,mag:100},{type:'duche',at:{t:80},delay:[33.33,53.33],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:0},delay:[0.07,6],mag:400},{type:'peng',at:{hp:99},delay:[2,8],mag:100},{type:'stpigge',at:{hp:99},delay:[40,53.33],mag:100},{type:'stpigge',at:{hp:99},delay:[40,53.33],mag:100},{type:'celeboodle',at:{hp:99},count:2,delay:[0.07,0.13],mag:100},{type:'sloth',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'snache',at:{t:0},delay:[3,20],mag:400},{type:'guys',at:{t:40},delay:[3,20],mag:400},{type:'duche',at:{t:40},delay:[53.33,53.33],mag:100},{type:'duche',at:{t:40.33},delay:[53.33,53.33],mag:100},{type:'duche',at:{t:40.67},delay:[53.33,53.33],mag:100},{type:'dagshund',at:{t:42.67},delay:[53.33,53.33],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:400},{type:'darkdog',at:{hp:50},delay:[2.67,6],mag:100},{type:'squirrel',at:{hp:50},delay:[2.67,6],mag:100},{type:'mooth',at:{hp:50},count:1,mag:400},{type:'mooth',at:{hp:50},count:1,mag:400},{type:'shyboy',at:{hp:50},count:1,mag:400},{type:'shyboy',at:{hp:50},count:1,mag:400},{type:'face',at:{hp:50},count:1,boss:true,mag:400}],
 [{type:'guys',at:{t:0},delay:[2,8],mag:400},{type:'mastera',at:{t:0},count:1,mag:100},{type:'celeboodle',at:{hp:99},count:3,delay:[0.27,0.67],mag:100},{type:'otta',at:{hp:99},count:1,mag:100},{type:'otta',at:{hp:99},count:1,mag:100},{type:'otta',at:{hp:99},count:1,mag:100},{type:'otta',at:{hp:99},delay:[14,26.67],mag:100},{type:'sloth',at:{hp:99},count:1,boss:true,mag:100}]
].forEach((rules,j)=>{STAGE_SPAWNS[LEGEND2_START+j]=rules});
// Legend subchapters 6-12 spawn tables (battlecats-db; frames /30 -> seconds, Ms. Sign left out).
[
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'peng',at:{t:13.33},delay:[8,20],mag:800},{type:'pigge',at:{t:26.67},delay:[8,20],mag:800},{type:'celeboodle',at:{t:40},delay:[8,20],mag:100},{type:'celeboodle',at:{hp:99},delay:[8,20],mag:100},{type:'mooth',at:{hp:99},count:3,delay:[0.07,0.07],mag:800}],
 [{type:'stpigge',at:{t:0},count:2,delay:[23.33,29.33],mag:100},{type:'duche',at:{t:40},delay:[3,20],mag:100},{type:'stpigge',at:{hp:99},count:1,mag:100},{type:'stpigge',at:{hp:99},count:1,mag:200},{type:'stpigge',at:{hp:99},count:1,mag:100},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'shyboy',at:{t:0},count:1,mag:100},{type:'darkdog',at:{t:20},delay:[20,33.33],mag:200},{type:'darkdog',at:{t:40},delay:[20,33.33],mag:200},{type:'shyboy',at:{hp:90},count:1,mag:400},{type:'shyboy',at:{hp:90},count:1,mag:400},{type:'squirrel',at:{hp:90},count:1,boss:true,mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'baa',at:{t:13.33},delay:[3,20],mag:800},{type:'metalhippo',at:{t:4},count:1,mag:200},{type:'gory',at:{t:10},delay:[3,10.67],mag:800},{type:'gory',at:{t:53.33},delay:[3,10.67],mag:800}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'leboin',at:{t:20},delay:[40,66.67],mag:1600},{type:'hippo',at:{t:40},delay:[3,20],mag:800},{type:'peng',at:{t:40},delay:[0.67,4],mag:800}],
 [{type:'rhino',at:{hp:99},count:1,boss:true,mag:1600},{type:'mastera',at:{hp:99},count:1,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'dagshund',at:{t:20},delay:[6,18],mag:100},{type:'celeboodle',at:{t:60},delay:[7.33,12.67],mag:100}],
 [{type:'guys',at:{t:0},delay:[20,80],mag:800},{type:'pigge',at:{t:20},delay:[20,66.67],mag:800},{type:'rhino',at:{hp:99},delay:[40,60],mag:800},{type:'jkbunbun',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'darkdog',at:{t:40},delay:[12,22],mag:200},{type:'darkdog',at:{t:40},count:2,delay:[0.07,0.07],mag:200},{type:'nyandam',at:{t:6},count:1,boss:true,mag:400}],
 [{type:'guys',at:{t:0},delay:[3,8],mag:800},{type:'guys',at:{t:10},delay:[0.07,4],mag:800},{type:'guys',at:{t:20},delay:[0.07,4],mag:800},{type:'hippo',at:{t:40},delay:[40,80],mag:800},{type:'mastera',at:{t:0},count:1,mag:200},{type:'mastera',at:{t:0},count:1,mag:200}],
 [{type:'otta',at:{t:0},delay:[16,26.67],mag:100},{type:'otta',at:{hp:99},delay:[26,34.67],mag:100},{type:'otta',at:{hp:99},delay:[26,34.67],mag:100},{type:'otta',at:{hp:99},delay:[26,34.67],mag:100},{type:'otta',at:{hp:99},delay:[26,34.67],mag:100},{type:'otta',at:{hp:99},delay:[26,34.67],mag:100},{type:'kangaroo',at:{t:0},count:1,mag:800},{type:'kangaroo',at:{t:4},count:1,mag:800}],
 [{type:'guys',at:{t:0},delay:[0.67,20],mag:800},{type:'snache',at:{t:0},delay:[0.67,20],mag:800},{type:'hippo',at:{t:0},delay:[2,20],mag:800},{type:'gory',at:{t:0},delay:[2,20],mag:800},{type:'bore',at:{hp:90},count:1,boss:true,mag:100}],
 [{type:'metalhippo',at:{t:0},count:1,mag:100},{type:'metalhippo',at:{t:10},count:1,mag:100},{type:'metalhippo',at:{t:60},delay:[80,120],mag:100},{type:'dagshund',at:{t:40},delay:[80,120],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'peng',at:{t:0},delay:[3,20],mag:800},{type:'darkdog',at:{t:0},delay:[3,20],mag:200},{type:'sloth',at:{t:0},count:1,mag:100},{type:'sloth',at:{t:20},count:1,mag:100}],
 [{type:'guys',at:{t:40},delay:[3,20],mag:800},{type:'duche',at:{t:20},delay:[46.67,66.67],mag:100},{type:'dagshund',at:{t:20},delay:[46.67,66.67],mag:100},{type:'celeboodle',at:{t:20},delay:[46.67,66.67],mag:100},{type:'darkdog',at:{t:20},delay:[46.67,66.67],mag:200},{type:'metalhippo',at:{t:20},count:2,delay:[86.67,106.67],mag:100},{type:'stpigge',at:{t:20},delay:[40,60],mag:200},{type:'mastera',at:{t:30},count:3,delay:[86.67,106.67],mag:200}],
 [{type:'guys',at:{t:0},delay:[40,80],mag:800},{type:'pigge',at:{hp:99},delay:[46.67,66.67],mag:800},{type:'rhino',at:{hp:99},delay:[40,60],mag:800},{type:'bunbun',at:{hp:99},count:1,boss:true,mag:600},{type:'nyandam',at:{hp:99},count:1,mag:600}],
 [{type:'guys',at:{t:0},delay:[0.67,20],mag:800},{type:'snache',at:{t:0},delay:[0.67,20],mag:800},{type:'hippo',at:{t:0},delay:[2,20],mag:800},{type:'gory',at:{t:0},delay:[2,20],mag:800},{type:'bore',at:{hp:90},count:1,boss:true,mag:100}],
 [{type:'croco',at:{t:0},count:10,delay:[8,16],mag:1600},{type:'croco',at:{t:0},count:3,delay:[1,16],mag:1600},{type:'rhino',at:{hp:99},count:1,boss:true,mag:1600},{type:'seal',at:{hp:99},delay:[40,60],mag:1600},{type:'mastera',at:{hp:99},count:1,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'otta',at:{t:10},delay:[3,20],mag:100},{type:'otta',at:{hp:99},count:4,delay:[2,6.67],mag:100},{type:'otta',at:{hp:90},count:4,delay:[2,6.67],mag:100},{type:'otta',at:{hp:80},count:8,delay:[2,6.67],mag:100},{type:'otta',at:{hp:60},count:8,delay:[2,6.67],mag:100},{type:'otta',at:{hp:40},count:8,delay:[2,6.67],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1600},{type:'snache',at:{t:0},delay:[3,20],mag:1600},{type:'guys',at:{t:40},delay:[3,20],mag:1600},{type:'metalhippo',at:{t:0},count:3,delay:[10,40],mag:100},{type:'duche',at:{t:0},delay:[10,40],mag:100},{type:'metalhippo',at:{hp:60},count:1,boss:true,mag:100},{type:'shadowboxer',at:{hp:60},count:3,delay:[0.07,0.13],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'gory',at:{t:0},delay:[3,20],mag:800},{type:'darkdog',at:{t:0},delay:[3,20],mag:200},{type:'sloth',at:{t:0},count:1,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[0.33,6.67],mag:800},{type:'guys',at:{t:0},delay:[0.33,2],mag:800},{type:'celeboodle',at:{hp:50},delay:[8,13.33],mag:100},{type:'celeboodle',at:{hp:50},count:2,delay:[0.07,0.13],mag:100},{type:'bore',at:{hp:50},count:1,boss:true,mag:100}],
 [{type:'darkdog',at:{t:10},delay:[16,16],mag:100},{type:'darkdog',at:{t:9.67},delay:[16,16],mag:100},{type:'darkdog',at:{t:9.33},delay:[16,16],mag:100},{type:'dagshund',at:{hp:99},delay:[20,20],mag:100},{type:'dagshund',at:{hp:99},delay:[20,20],mag:100},{type:'dagshund',at:{hp:99},delay:[20,20],mag:100},{type:'dagshund',at:{hp:99},count:1,mag:100},{type:'dagshund',at:{hp:99},count:1,mag:100},{type:'dagshund',at:{hp:99},count:1,mag:100},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},count:100,delay:[0.07,4],mag:800},{type:'raind',at:{t:0},count:1,boss:true,mag:100},{type:'raind',at:{hp:90},count:1,mag:100},{type:'raind',at:{hp:90},count:1,mag:100},{type:'raind',at:{hp:90},count:1,mag:100},{type:'raind',at:{hp:90},count:1,mag:100},{type:'squirrel',at:{hp:90},count:1,boss:true,mag:100}],
 [{type:'darkdog',at:{t:0},delay:[3,13.33],mag:100},{type:'gorydark',at:{t:20},delay:[10,22],mag:100},{type:'shadowboxer',at:{hp:99},count:2,delay:[2,6],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'darkdog',at:{t:0},delay:[3,20],mag:100},{type:'darkdog',at:{hp:90},delay:[0.07,2],mag:100},{type:'shyboy',at:{hp:90},count:1,boss:true,mag:1200}],
 [{type:'squirrel',at:{t:0},delay:[1,6],mag:800},{type:'mooth',at:{t:0},delay:[1,6],mag:100},{type:'jkbunbun',at:{t:30},count:1,boss:true,mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'baa',at:{t:10},delay:[4,20],mag:800},{type:'owlbrow',at:{t:20},delay:[10,20],mag:100},{type:'gorydark',at:{t:30},delay:[20,26.67],mag:100},{type:'owlbrow',at:{hp:90},count:3,delay:[1,4],mag:100},{type:'owlbrow',at:{hp:80},count:3,delay:[1,4],mag:100},{type:'owlbrow',at:{hp:70},count:3,delay:[1,4],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'mastera',at:{t:20},delay:[10,20],mag:100}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:0},delay:[3,20],mag:800},{type:'hippo',at:{t:0},delay:[3,20],mag:800},{type:'croco',at:{t:0},delay:[3,20],mag:800},{type:'mooth',at:{t:0},count:8,delay:[3,20],mag:800},{type:'mooth',at:{hp:60},delay:[3,20],mag:800},{type:'seal',at:{hp:60},count:1,boss:true,mag:10000}],
 [{type:'darkdog',at:{t:0},delay:[3,13.33],mag:100},{type:'gorydark',at:{t:13.33},delay:[10,22],mag:100},{type:'shadowboxer',at:{t:60},count:6,delay:[26.67,40],mag:100},{type:'shadowboxer',at:{hp:99},count:3,delay:[2,8],mag:100},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'guys',at:{t:20},delay:[2,10],mag:800},{type:'squirrel',at:{t:0},delay:[2,10],mag:800},{type:'squirrel',at:{hp:99},delay:[0.07,1],mag:800},{type:'hippo',at:{hp:99},delay:[8,12],mag:400},{type:'peng',at:{hp:99},delay:[10,14],mag:400},{type:'baa',at:{hp:99},delay:[10,14],mag:400},{type:'otta',at:{hp:99},count:10,delay:[0.07,0.67],mag:100},{type:'metalhippo',at:{hp:99},count:1,mag:100},{type:'camelle',at:{hp:99},count:1,boss:true,mag:100},{type:'assassinbear',at:{t:900},delay:[0.07,4],mag:800},{type:'assassinbear',at:{t:900},count:1,boss:true,mag:800}],
 [{type:'hippo',at:{t:120},delay:[40,40],mag:800},{type:'pigge',at:{t:240},delay:[40,40],mag:800},{type:'peng',at:{t:360},delay:[40,40],mag:800},{type:'camelle',at:{t:0},count:1,boss:true,mag:100}],
 [{type:'mooth',at:{t:0},count:10,delay:[1.67,2],mag:100},{type:'jkbunbun',at:{t:22},count:1,boss:true,mag:100}],
 [{type:'owlbrow',at:{t:0},delay:[3,20],mag:100},{type:'otta',at:{t:10},delay:[3,40],mag:100},{type:'duche',at:{t:30},delay:[10,40],mag:100},{type:'raind',at:{t:53.33},delay:[13.33,40],mag:100}],
 [{type:'peng',at:{t:6.67},delay:[3,20],mag:800},{type:'seal',at:{t:20},delay:[20,30],mag:800},{type:'bore',at:{hp:99},count:2,delay:[24,28],mag:100},{type:'rabbit',at:{hp:99},count:1,boss:true,mag:100}],
 [{type:'shyboy',at:{t:0},count:3,delay:[1.67,2],mag:100},{type:'shyboy',at:{t:22},delay:[40,50],mag:100},{type:'bunbun',at:{t:22},count:1,boss:true,mag:600}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:800},{type:'snache',at:{t:0},delay:[3,20],mag:800},{type:'guys',at:{t:40},delay:[3,20],mag:800},{type:'darkdog',at:{hp:50},delay:[6,30],mag:100},{type:'rabbit',at:{hp:50},delay:[20,40],mag:100},{type:'kory',at:{hp:50},count:1,boss:true,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'metalhippo',at:{t:0},count:1,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'gory',at:{t:0},count:4,delay:[10.67,23.33],mag:1200},{type:'gory',at:{hp:80},count:4,delay:[2,6],mag:1200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'mooth',at:{hp:90},count:1,boss:true,mag:1200},{type:'darkdog',at:{hp:90},count:3,delay:[0.33,1.33],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:20},delay:[3,20],mag:1200},{type:'guys',at:{hp:99},delay:[3,20],mag:1200},{type:'baa',at:{hp:99},delay:[6.67,20],mag:1200},{type:'metalhippo',at:{hp:99},count:1,mag:200},{type:'stpigge',at:{hp:99},count:1,boss:true,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'seal',at:{t:0},count:1,mag:1200},{type:'pigge',at:{t:16.67},delay:[20,40],mag:1200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:20},delay:[20,40],mag:1200},{type:'hippo',at:{t:13.33},delay:[20,40],mag:1200},{type:'peng',at:{t:26.67},delay:[20,40],mag:1200},{type:'peng',at:{hp:99},delay:[20,40],mag:1200},{type:'kangaroo',at:{hp:99},count:2,delay:[0.07,0.13],mag:1200},{type:'kangaroo',at:{hp:99},count:1,mag:1200},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:1200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'darkdog',at:{t:20},delay:[33.33,40],mag:400},{type:'darkdog',at:{hp:99},delay:[20,26.67],mag:400},{type:'darkdog',at:{hp:99},count:3,delay:[0.67,2],mag:400}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'guys',at:{hp:60},delay:[0.67,1.33],mag:1200},{type:'croco',at:{hp:60},delay:[0.67,1.33],mag:1200},{type:'mastera',at:{hp:60},count:1,boss:true,mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'hippo',at:{t:40},delay:[3,20],mag:1200},{type:'peng',at:{t:13.33},delay:[3,20],mag:1200},{type:'pigge',at:{t:26.67},delay:[3,20],mag:1200},{type:'peng',at:{hp:95},count:3,delay:[2,4],mag:1200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'stpigge',at:{hp:99},count:1,mag:200},{type:'stpigge',at:{hp:99},count:1,mag:200},{type:'stpigge',at:{hp:99},count:1,mag:200}],
 [{type:'guys',at:{t:0},delay:[3,20],mag:1200},{type:'gory',at:{t:0},delay:[13.33,26.67],mag:1200},{type:'baa',at:{t:40},delay:[6.67,20],mag:1200},{type:'darkdog',at:{t:40},delay:[20,33.33],mag:400},{type:'celeboodle',at:{hp:90},delay:[3,20],mag:200},{type:'darkdog',at:{hp:90},count:4,delay:[0.07,0.67],mag:400},{type:'celeboodle',at:{hp:90},count:4,delay:[0.07,0.13],mag:200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{hp:99},delay:[3,20],mag:1200},{type:'baa',at:{hp:99},delay:[3,20],mag:1200},{type:'pigge',at:{hp:99},delay:[3,20],mag:1200},{type:'rabbit',at:{hp:99},delay:[3,20],mag:1200},{type:'gory',at:{hp:99},delay:[3,20],mag:1200}],
 [{type:'dog',at:{t:0},delay:[3,20],mag:1200},{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'guys',at:{t:40},delay:[3,20],mag:1200},{type:'baa',at:{t:40},delay:[3,20],mag:1200},{type:'leboin',at:{t:53.33},delay:[40,66.67],mag:1200},{type:'hippo',at:{t:40},delay:[3,20],mag:1200},{type:'gory',at:{t:40},delay:[3,12],mag:1200},{type:'peng',at:{t:40},delay:[3,12],mag:1200},{type:'leboin',at:{hp:90},count:1,mag:1200}],
 [{type:'snache',at:{t:0},delay:[3,20],mag:1200},{type:'guys',at:{t:0},delay:[3,20],mag:1200},{type:'peng',at:{t:20},delay:[5.33,20],mag:1200},{type:'celeboodle',at:{t:40},delay:[13.33,30.67],mag:200},{type:'mastera',at:{t:26.67},count:1,mag:200}],
 [{type:'guys',at:{t:0},delay:[3,20],mag:1200},{type:'pigge',at:{t:0},delay:[3,20],mag:1200},{type:'seal',at:{t:40},delay:[6.67,20],mag:1200},{type:'seal',at:{hp:80},count:1,mag:1200},{type:'seal',at:{hp:60},count:1,mag:1200},{type:'metalhippo',at:{t:0},count:2,delay:[3,20],mag:200}],
 [{type:'darkdog',at:{t:23.33},delay:[29.33,29.33],mag:400},{type:'darkdog',at:{t:23},delay:[29.33,29.33],mag:400},{type:'darkdog',at:{t:22.67},delay:[29.33,29.33],mag:400},{type:'dagshund',at:{hp:99},count:1,mag:200},{type:'dagshund',at:{hp:99},count:1,mag:200},{type:'dagshund',at:{hp:99},count:1,mag:200},{type:'squirrel',at:{hp:99},count:1,boss:true,mag:100}]
].forEach((rules,j)=>{STAGE_SPAWNS[LEGEND3_START+j]=rules});
// 未来編 第1章 spawn tables (battlecats-db: frames /30 -> seconds; Ms. Sign, the 15-minute timer mascot, left out).
const FUTURE_SPAWNS=[
 [{type:'dog',at:{t:0},delay:[6.67,20],mag:200},{type:'snache',at:{t:3.33},delay:[6.67,20],mag:200},{type:'guys',at:{t:10},delay:[10,20],mag:200},{type:'shibalien',at:{hp:99},count:1,boss:true}],
 [{type:'snache',at:{t:10},delay:[5,10],mag:200},{type:'guys',at:{t:16.67},delay:[10,20],mag:200},{type:'hippo',at:{t:40},delay:[40,60],mag:200},{type:'dog',at:{t:50},delay:[5,10],mag:200},{type:'hippo',at:{hp:90},count:1,mag:200},{type:'shibalien',at:{hp:90},count:1}],
 [{type:'guys',at:{t:4},delay:[6.67,16.67],mag:200},{type:'snache',at:{t:12},delay:[5,10],mag:200},{type:'rabbit',at:{t:20},count:3,delay:[13.33,20],mag:200},{type:'pigge',at:{t:33.33},count:3,delay:[26.67,40],mag:200},{type:'peng',at:{t:44},count:3,delay:[26.67,40],mag:200},{type:'rabbit',at:{hp:99},delay:[20,30],mag:200},{type:'guys',at:{hp:90},count:3,delay:[2,6],mag:200},{type:'gory',at:{hp:90},count:1,mag:200}],
 [{type:'baa',at:{t:13.33},count:3,delay:[26.67,26.67],mag:200},{type:'croco',at:{t:26.67},count:5,delay:[5,10],mag:200},{type:'squirrel',at:{t:40},count:5,delay:[6.67,13.33],mag:200},{type:'hippo',at:{t:60},delay:[40,60],mag:200},{type:'shibalien',at:{t:83.33},count:1},{type:'baa',at:{t:93.33},count:3,delay:[40,40],mag:200},{type:'baa',at:{t:98.33},count:3,delay:[40,40],mag:200},{type:'croco',at:{t:100},delay:[8.33,16.67],mag:200},{type:'squirrel',at:{t:106.67},delay:[10,20],mag:200},{type:'shibalien',at:{hp:90},count:1}],
 [{type:'dog',at:{t:6},delay:[6.67,13.33],mag:200},{type:'rabbit',at:{t:13.33},count:3,delay:[20,30],mag:200},{type:'squirrel',at:{t:26},count:3,delay:[20,20],mag:200},{type:'squirrel',at:{t:28},count:3,delay:[20,20],mag:200},{type:'squirrel',at:{t:30},count:3,delay:[20,20],mag:200},{type:'guys',at:{t:40},delay:[6.67,16.67],mag:200},{type:'peng',at:{t:50},delay:[26.67,40],mag:200},{type:'rabbit',at:{t:80},count:5,delay:[26.67,40],mag:200},{type:'squirrel',at:{hp:99},delay:[10,20],mag:200},{type:'seal',at:{hp:99},count:1,boss:true,mag:200}],
 [{type:'guys',at:{t:0},delay:[5,10],mag:300},{type:'hippo',at:{t:10},delay:[20,30],mag:300},{type:'hyppoh',at:{hp:99},count:1,boss:true}],
 [{type:'croco',at:{t:8},delay:[8.33,16.67],mag:200},{type:'snache',at:{t:10},delay:[6.67,13.33],mag:200},{type:'shibalien',at:{t:33.33},count:1},{type:'peng',at:{t:46.67},delay:[26.67,53.33],mag:200},{type:'shibalien',at:{t:66.67},count:1},{type:'shibalien',at:{t:70},count:1},{type:'dog',at:{t:80},delay:[6.67,13.33],mag:200},{type:'shibalien',at:{hp:99},count:1},{type:'shibalien',at:{hp:99},count:1},{type:'shibalien',at:{hp:99},count:1}],
 [{type:'rabbit',at:{t:20},delay:[16.67,33.33],mag:200},{type:'rabbit',at:{t:25},delay:[16.67,33.33],mag:200},{type:'guys',at:{t:26.67},delay:[5,16.67],mag:200},{type:'squirrel',at:{t:40},delay:[10,20],mag:200},{type:'seal',at:{t:60},count:1,mag:200},{type:'seal',at:{t:116.67},count:1,mag:200},{type:'seal',at:{t:170},count:1,mag:200},{type:'rabbit',at:{hp:90},count:5,delay:[5,10],mag:200},{type:'rhino',at:{hp:90},count:1,boss:true,mag:200}],
 [{type:'pigge',at:{t:0},count:1,mag:200},{type:'dog',at:{t:6.67},delay:[5,16.67],mag:200},{type:'guys',at:{t:11.67},delay:[5,16.67],mag:200},{type:'pigge',at:{t:33.33},count:1,mag:200},{type:'mooth',at:{t:51.33},count:3,delay:[10,13.33],mag:200},{type:'shibalien',at:{t:60},delay:[44,66]},{type:'pigge',at:{t:66.67},delay:[33.33,50],mag:200}],
 [{type:'peng',at:{t:10},count:3,delay:[29.33,44],mag:200},{type:'gory',at:{t:20},count:3,delay:[33.33,50],mag:200},{type:'hippo',at:{t:33.33},count:3,delay:[33.33,33.33],mag:200},{type:'hippo',at:{t:38.33},count:3,delay:[33.33,33.33],mag:200},{type:'peng',at:{t:133.33},delay:[36.67,51.33],mag:200},{type:'gory',at:{t:146.67},delay:[40,60],mag:200},{type:'hippo',at:{t:166.67},delay:[50,50],mag:200},{type:'hyppoh',at:{hp:90},count:1,boss:true}],
 [{type:'baa',at:{t:6},count:5,delay:[6.67,13.33],mag:200},{type:'baa',at:{t:10},count:5,delay:[6.67,13.33],mag:200},{type:'kangaroo',at:{t:13.33},count:3,delay:[50,50],mag:200},{type:'bear',at:{t:50},count:3,delay:[50,50],mag:200},{type:'guys',at:{t:53.33},delay:[5,16.67],mag:200},{type:'snache',at:{t:57.33},delay:[5,16.67],mag:200},{type:'dog',at:{t:60},delay:[50,16.67],mag:200},{type:'shibalien',at:{t:66.67},count:5,delay:[26.67,40]},{type:'baa',at:{t:10},count:5,delay:[6.67,13.33],mag:200},{type:'kangaroo',at:{hp:99},count:1,mag:200}],
 [{type:'dog',at:{t:0},count:10,delay:[10,20],mag:300},{type:'dog',at:{t:5.33},count:2,delay:[4,8],mag:300},{type:'snache',at:{t:10.67},count:10,delay:[10,20],mag:300},{type:'guys',at:{t:23.33},count:2,delay:[4,8],mag:300},{type:'peng',at:{t:26.67},delay:[26.67,40],mag:300},{type:'shibalien',at:{t:40},count:5,delay:[33.33,50]},{type:'seal',at:{t:51.33},count:1,mag:300},{type:'guys',at:{hp:99},delay:[8.33,16.67],mag:300},{type:'krabbe',at:{hp:90},count:1,boss:true}],
 [{type:'snache',at:{t:10},delay:[5,16.67],mag:300},{type:'dog',at:{t:15},delay:[5,16.67],mag:300},{type:'rabbit',at:{t:30},delay:[13.33,26.67],mag:300},{type:'rhino',at:{t:40},count:1,mag:300},{type:'squirrel',at:{t:46.67},delay:[10,20],mag:300},{type:'leboin',at:{t:60},count:2,delay:[60,60],mag:300},{type:'rabbit',at:{t:73.33},count:3,delay:[26.67,26.67],mag:300},{type:'rabbit',at:{t:76.67},count:3,delay:[26.67,26.67],mag:300},{type:'rabbit',at:{t:80},count:3,delay:[26.67,26.67],mag:300},{type:'rhino',at:{hp:99},count:1,mag:300}],
 [{type:'metalhippo',at:{t:20},count:1,boss:true},{type:'guys',at:{t:25},delay:[6.67,16.67],mag:300},{type:'croco',at:{t:30},delay:[6.67,16.67],mag:300},{type:'baa',at:{t:33.33},count:3,delay:[13.33,20],mag:300},{type:'bear',at:{t:53.33},count:2,delay:[80,106.67],mag:300},{type:'shibalien',at:{t:80},count:2,delay:[66.67,66.67]},{type:'baa',at:{t:100},delay:[13.33,26.67],mag:300}],
 [{type:'guys',at:{t:4},delay:[6.67,16.67],mag:300},{type:'dog',at:{t:8},delay:[5,13.33],mag:300},{type:'hippo',at:{t:26.67},count:3,delay:[33.33,50],mag:300},{type:'kangaroo',at:{t:33.33},count:1,mag:300},{type:'peng',at:{t:53.33},count:3,delay:[33.33,50],mag:300},{type:'kangaroo',at:{t:63.33},count:1,mag:300},{type:'kangaroo',at:{t:66.67},count:1,mag:300},{type:'krabbe',at:{t:83.33},count:1},{type:'shibalien',at:{t:100},delay:[26.67,40]},{type:'kangaroo',at:{t:116.67},delay:[60,60],mag:300},{type:'kangaroo',at:{t:120},delay:[60,60],mag:300},{type:'krabbe',at:{hp:99},count:1}],
 [{type:'pigge',at:{t:0.07},delay:[36.67,36.67],mag:400},{type:'rabbit',at:{t:13.33},count:3,delay:[16.67,30],mag:400},{type:'squirrel',at:{t:26.67},delay:[10,20],mag:400},{type:'shibalien',at:{t:33.33},delay:[26.67,53.33]},{type:'gory',at:{t:53.33},count:3,delay:[53.33,53.33],mag:400},{type:'gory',at:{t:56},count:3,delay:[53.33,53.33],mag:400},{type:'shibalien',at:{hp:99},count:1},{type:'shibalien',at:{hp:99},count:1},{type:'sael',at:{hp:80},count:1,boss:true}],
 [{type:'leboin',at:{t:10},count:1,mag:400},{type:'leboin',at:{t:13.33},count:1,mag:400},{type:'leboin',at:{t:16.67},count:1,mag:400},{type:'dog',at:{t:23.33},delay:[5,13.33],mag:400},{type:'guys',at:{t:25.33},delay:[6.67,16.67],mag:400},{type:'rabbit',at:{t:30},delay:[13.33,26.67],mag:400},{type:'leboin',at:{t:50},count:1,mag:400},{type:'squirrel',at:{t:66.67},delay:[10,20],mag:400},{type:'leboin',at:{t:83.33},count:1,mag:400},{type:'leboin',at:{t:110},count:1,mag:400}],
 [{type:'dog',at:{t:0},delay:[5,13.33],mag:400},{type:'snache',at:{t:13.33},delay:[5,13.33],mag:400},{type:'gory',at:{t:20},count:3,delay:[53.33,53.33],mag:400},{type:'gory',at:{t:23},count:3,delay:[53.33,53.33],mag:400},{type:'hyppoh',at:{t:36.67},delay:[53.33,80]},{type:'croco',at:{t:40},delay:[6.67,13.33],mag:400},{type:'mooth',at:{t:60},delay:[40,60],mag:400},{type:'hyppoh',at:{hp:99},count:1}],
 [{type:'shibalien',at:{t:13.33},count:1},{type:'snache',at:{t:21},delay:[5,13.33],mag:400},{type:'guys',at:{t:23.33},delay:[6.67,16.67],mag:400},{type:'bear',at:{t:30},count:2,delay:[60,60],mag:400},{type:'dog',at:{t:35},count:1},{type:'shibalien',at:{t:36.67},count:1},{type:'shibalien',at:{t:43.33},count:1},{type:'darkdog',at:{t:46.67},count:1},{type:'shibalien',at:{t:60},delay:[20,30]},{type:'darkdog',at:{t:80},count:1},{type:'darkdog',at:{t:83.33},count:1},{type:'darkdog',at:{t:86.67},count:1},{type:'darkdog',at:{hp:99},delay:[13.33,20]}],
 [{type:'guys',at:{t:6},count:8,delay:[6.67,13.33],mag:400},{type:'hippo',at:{t:13.33},delay:[26.67,53.33],mag:400},{type:'croco',at:{t:26.67},count:4,delay:[4,6],mag:400},{type:'kangaroo',at:{t:40},count:1,mag:400},{type:'croco',at:{t:53.33},count:4,delay:[4,6],mag:400},{type:'squirrel',at:{t:66.67},delay:[10,20],mag:400},{type:'croco',at:{t:80},count:4,delay:[4,6],mag:400},{type:'rabbit',at:{hp:99},delay:[13.33,26.67],mag:400},{type:'hyppoh',at:{hp:90},count:3,delay:[44,44]},{type:'maawth',at:{hp:90},count:1,boss:true}],
 [{type:'snache',at:{t:10},count:10,delay:[5,10],mag:400},{type:'guys',at:{t:13.33},count:10,delay:[5,10],mag:400},{type:'shibalien',at:{t:16.67},delay:[16,24]},{type:'seal',at:{t:33.33},count:1,mag:400},{type:'sael',at:{t:50},count:1},{type:'leboin',at:{t:60},delay:[53.33,80],mag:400},{type:'seal',at:{t:80},count:1,mag:400},{type:'seal',at:{t:83.33},count:1,mag:400},{type:'sael',at:{t:100},count:1},{type:'seal',at:{t:110},delay:[33.33,50],mag:400}],
 [{type:'dog',at:{t:0},count:5,delay:[5,10],mag:400},{type:'rabbit',at:{t:10},count:3,delay:[10,20],mag:400},{type:'pigge',at:{t:16.67},count:3,delay:[26.67,26.67],mag:400},{type:'squirrel',at:{t:40},count:5,delay:[3.33,6.67],mag:400},{type:'snache',at:{t:50},count:5,delay:[5,10],mag:400},{type:'rabbit',at:{t:50},delay:[13.33,26.67],mag:400},{type:'squirrel',at:{t:80},count:5,delay:[3.33,6.67],mag:400},{type:'pigge',at:{t:90},delay:[33.33,50],mag:400},{type:'guys',at:{t:100},delay:[6.67,13.33],mag:400},{type:'squirrel',at:{t:120},count:5,delay:[3.33,6.67],mag:400},{type:'shyboy',at:{hp:90},count:2,delay:[16.67,16.67],mag:300},{type:'guys',at:{hp:90},count:1,boss:true,mag:400}],
 [{type:'kangaroo',at:{t:20},count:3,delay:[40,40],mag:400},{type:'kangaroo',at:{t:22},count:3,delay:[40,40],mag:400},{type:'dog',at:{t:25.33},delay:[8.33,16.67],mag:400},{type:'snache',at:{t:26.67},delay:[8.33,16.67],mag:400},{type:'croco',at:{t:30},delay:[10,20],mag:400},{type:'maawth',at:{t:60},count:1},{type:'kangaroo',at:{t:80},delay:[40,60],mag:400},{type:'kangaroo',at:{hp:99},count:3,delay:[4,8],mag:400}],
 [{type:'shibalien',at:{t:10},delay:[22,29.33]},{type:'snache',at:{t:13.33},count:8,delay:[5,10],mag:500},{type:'guys',at:{t:20},count:8,delay:[6,12],mag:500},{type:'peng',at:{t:30},delay:[26.67,53.33],mag:500},{type:'shibalien',at:{t:46.67},count:1},{type:'shibalien',at:{t:49.33},count:1},{type:'peng',at:{t:60},count:1,mag:500},{type:'snache',at:{t:100},count:8,delay:[10,20],mag:500},{type:'guys',at:{t:106.67},count:8,delay:[12,24],mag:500},{type:'seal',at:{t:130},delay:[53.33,53.33],mag:500},{type:'seal',at:{t:133.33},delay:[53.33,53.33],mag:500},{type:'krabbe',at:{hp:90},count:3,delay:[44,66]},{type:'sael',at:{hp:75},count:3,delay:[50,50]},{type:'phace',at:{hp:75},count:1,boss:true}],
 [{type:'gabriel',at:{t:13.33},delay:[20,40]},{type:'shibalien',at:{t:25},delay:[8.33,16.67]},{type:'darkdog',at:{t:30},delay:[16.67,33.33]},{type:'hyppoh',at:{t:30.67},count:1},{type:'hyppoh',at:{t:33.33},count:1},{type:'gabriel',at:{t:40},count:3,delay:[1.33,2.67]},{type:'metalhippo',at:{t:48},count:1},{type:'metalhippo',at:{t:53.33},count:1},{type:'darkdog',at:{t:66.67},count:3,delay:[1,2]},{type:'hyppoh',at:{t:77.33},count:1},{type:'hyppoh',at:{t:80},count:1},{type:'gabriel',at:{t:93.33},count:5,delay:[1.33,2.67]},{type:'metalhippo',at:{t:101.33},count:1},{type:'metalhippo',at:{t:106.67},count:1},{type:'darkdog',at:{t:120},count:5,delay:[1,2]}],
 [{type:'pigge',at:{t:6.67},count:3,delay:[20,30],mag:500},{type:'seal',at:{t:13.33},count:3,delay:[26.67,40],mag:500},{type:'croco',at:{t:25},delay:[8.33,16.67],mag:500},{type:'snache',at:{t:26.67},delay:[6.67,13.33],mag:500},{type:'croco',at:{t:40},count:5,delay:[3.33,6.67],mag:500},{type:'snache',at:{t:60},count:5,delay:[3.33,6.67],mag:500},{type:'pigge',at:{t:100},delay:[33.33,50],mag:500},{type:'seal',at:{t:133.33},delay:[40,60],mag:500},{type:'gorydark',at:{hp:99},count:5,delay:[3.33,6.67]},{type:'gory',at:{hp:99},count:5,delay:[3.33,6.67],mag:500},{type:'croco',at:{hp:99},count:1,boss:true,mag:500}],
 [{type:'baa',at:{t:4},delay:[13.33,26.67],mag:500},{type:'dog',at:{t:6.67},count:5,delay:[5,20],mag:500},{type:'squirrel',at:{t:20},count:5,delay:[6.67,13.33],mag:500},{type:'sael',at:{t:26.67},count:2,delay:[66.67,66.67]},{type:'rhino',at:{t:36.67},count:2,delay:[66.67,100],mag:500},{type:'bear',at:{t:43.33},count:2,delay:[60,60],mag:500},{type:'shibalien',at:{t:60},delay:[10,20]},{type:'rabbit',at:{t:66.67},delay:[13.33,26.67],mag:500},{type:'sael',at:{t:133.33},count:1}],
 [{type:'guys',at:{t:10},count:5,delay:[2,4],mag:500},{type:'guys',at:{t:12},count:5,delay:[2,4],mag:500},{type:'darkdog',at:{t:33.33},delay:[6.67,13.33]},{type:'mooth',at:{t:40},count:3,delay:[40,40],mag:500},{type:'maawth',at:{t:46.67},count:3,delay:[40,40]},{type:'dog',at:{t:50},delay:[3.33,6.67],mag:500},{type:'snache',at:{t:53.33},delay:[3.33,6.67],mag:500},{type:'guys',at:{t:64.67},count:5,delay:[3,5],mag:500},{type:'guys',at:{t:66.67},count:5,delay:[3,5],mag:500},{type:'guys',at:{t:0.07},delay:[1,2],mag:500},{type:'guys',at:{t:0.07},count:20,delay:[0.33,1],mag:500}],
 [{type:'snache',at:{t:0.07},count:1,mag:500},{type:'snache',at:{t:3.33},delay:[6,12],mag:500},{type:'guys',at:{t:16},delay:[6.67,13.33],mag:500},{type:'pigge',at:{t:20},delay:[44,44],mag:500},{type:'pigge',at:{t:25},count:2,delay:[44,44],mag:500},{type:'pigge',at:{t:30},count:1,mag:500},{type:'hyppoh',at:{t:53.33},count:3,delay:[53.33,80]},{type:'guys',at:{t:66.67},count:10,delay:[4,8],mag:500},{type:'shibalien',at:{hp:90},delay:[13.33,26.67]},{type:'ursamajor',at:{hp:90},count:1,boss:true}],
 [{type:'heavenlyhippoe',at:{t:16.67},count:1},{type:'croco',at:{t:33.33},count:5,delay:[4,8],mag:500},{type:'heavenlyhippoe',at:{t:40},count:1},{type:'heavenlyhippoe',at:{t:45},count:1},{type:'croco',at:{t:53.33},count:5,delay:[4,8],mag:500},{type:'hippo',at:{t:60},count:2,delay:[8.33,16.67],mag:500},{type:'hyppoh',at:{t:63.33},count:2,delay:[8.33,16.67]},{type:'heavenlyhippoe',at:{t:66.67},count:1},{type:'croco',at:{t:70},count:5,delay:[4,8],mag:500},{type:'sael',at:{t:100},count:3,delay:[5,10]},{type:'seal',at:{t:103.33},count:3,delay:[5,10],mag:500},{type:'croco',at:{t:106.67},delay:[5,10],mag:500}],
 [{type:'rabbit',at:{t:6},delay:[12,24],mag:500},{type:'shibalien',at:{t:12},delay:[10,20]},{type:'pigge',at:{t:20},count:3,delay:[20,40],mag:500},{type:'rhino',at:{t:40},count:1,mag:500},{type:'seal',at:{t:50},delay:[33.33,50],mag:500},{type:'ursamajor',at:{t:60},count:1},{type:'rabbit',at:{t:66.67},count:3,delay:[4,6],mag:500},{type:'rhino',at:{t:80},count:1,mag:500},{type:'pigge',at:{t:100},count:3,delay:[20,40],mag:500}],
 [{type:'darkdog',at:{t:20},delay:[30,60]},{type:'darkdog',at:{t:22},delay:[30,60]},{type:'dog',at:{t:33.33},count:5,delay:[3.33,6.67],mag:500},{type:'shibalien',at:{t:33.33},count:5,delay:[3.33,6.67]},{type:'croco',at:{t:36.67},delay:[6.67,16.67],mag:500},{type:'snache',at:{t:38.67},delay:[6.67,16.67],mag:500},{type:'dog',at:{t:100},count:5,delay:[3.33,6.67],mag:500},{type:'shibalien',at:{t:100},count:5,delay:[3.33,6.67]},{type:'shadowboxer',at:{hp:99},count:1,boss:true},{type:'kangaroo',at:{hp:99},count:5,delay:[4,8],mag:500}],
 [{type:'face',at:{t:0},count:1,boss:true,mag:300},{type:'guys',at:{t:10},delay:[5,10],mag:500},{type:'peng',at:{t:13.33},delay:[26.67,53.33],mag:500},{type:'squirrel',at:{t:26.67},delay:[16.67,33.33],mag:500},{type:'shyboy',at:{t:33.33},count:1,mag:300},{type:'peng',at:{t:50},count:3,delay:[6.67,13.33],mag:500},{type:'shyboy',at:{t:66.67},count:1,mag:300},{type:'shyboy',at:{t:68.67},count:1,mag:300},{type:'maawth',at:{t:83.33},count:1},{type:'peng',at:{t:100},count:3,delay:[6.67,13.33],mag:500}],
 [{type:'croco',at:{t:4},delay:[5,10],mag:500},{type:'croco',at:{t:7},delay:[11.67,23.33],mag:500},{type:'peng',at:{t:12},delay:[29.33,44],mag:500},{type:'croco',at:{t:16.67},count:1,mag:500},{type:'croco',at:{t:18.67},count:1,mag:500},{type:'croco',at:{t:20.67},count:1,mag:500},{type:'gory',at:{t:30},delay:[29.33,44],mag:500},{type:'croco',at:{t:36.67},count:1,mag:500},{type:'croco',at:{t:38.67},count:1,mag:500},{type:'mooth',at:{t:83.33},delay:[83.33,83.33],mag:500},{type:'kroxo',at:{hp:90},count:16,delay:[4,8]},{type:'kroxo',at:{hp:90},count:9,delay:[8.33,16.67]},{type:'kroxo',at:{hp:90},delay:[14.67,22]},{type:'maawth',at:{hp:90},count:1,boss:true}],
 [{type:'metalhippo',at:{t:6.67},count:1},{type:'darkdog',at:{t:20},count:5,delay:[3,5]},{type:'metalhippo',at:{t:36.67},count:1},{type:'gorydark',at:{t:50},count:1},{type:'gorydark',at:{t:52},count:1},{type:'gabriel',at:{t:60},count:5,delay:[4,6]},{type:'heavenlyhippoe',at:{t:63.33},count:1},{type:'heavenlyhippoe',at:{t:66.67},count:1},{type:'gorydark',at:{t:77.33},count:1},{type:'gorydark',at:{t:78.67},count:1},{type:'gorydark',at:{t:80},count:1},{type:'metalhippo',at:{t:83.33},count:1},{type:'heavenlyhippoe',at:{t:95.33},count:1},{type:'heavenlyhippoe',at:{t:97.67},count:1},{type:'heavenlyhippoe',at:{t:100},count:1},{type:'metalhippo',at:{t:106.67},delay:[20,30]},{type:'darkdog',at:{t:116.67},delay:[16.67,33.33]},{type:'gabriel',at:{t:120},delay:[20,40]}],
 [{type:'snache',at:{t:0},count:10,delay:[6.67,13.33],mag:500},{type:'dog',at:{t:6.67},count:10,delay:[6.67,13.33],mag:500},{type:'krabbe',at:{t:22},count:1},{type:'peng',at:{t:29.33},count:3,delay:[13.33,20],mag:500},{type:'kroxo',at:{t:50},delay:[29.33,44]},{type:'krabbe',at:{t:66.67},count:1},{type:'krabbe',at:{t:70.67},count:1},{type:'sael',at:{t:80},count:1},{type:'peng',at:{t:100},count:3,delay:[13.33,20]},{type:'krabbe',at:{t:106.67},delay:[29.33,44]},{type:'sael',at:{hp:99},count:1}],
 [{type:'shibalien',at:{t:10},count:5,delay:[8,12]},{type:'hyppoh',at:{t:20},count:3,delay:[16,24]},{type:'dog',at:{t:22},delay:[6.67,13.33],mag:500},{type:'guys',at:{t:23.33},delay:[6.67,13.33],mag:500},{type:'rhino',at:{t:33.33},count:3,delay:[53.33,53.33],mag:500},{type:'rhino',at:{t:40},count:3,delay:[53.33,53.33],mag:500},{type:'shyboy',at:{t:60},count:3,delay:[33.33,33.33],mag:300},{type:'pigge',at:{t:66.67},delay:[29.33,36.67],mag:500}],
 [{type:'lemurr',at:{t:30},count:1,boss:true},{type:'guys',at:{t:36.67},count:3,delay:[16.67,16.67],mag:600},{type:'guys',at:{t:39.33},count:3,delay:[16.67,16.67],mag:600},{type:'guys',at:{t:42.67},count:3,delay:[16.67,16.67],mag:600},{type:'shibalien',at:{t:44},delay:[13.33,20]},{type:'snache',at:{t:46.67},delay:[5,13.33],mag:600},{type:'kroxo',at:{t:60},delay:[20,26.67]},{type:'lemurr',at:{t:66.67},count:1},{type:'guys',at:{t:80},count:3,delay:[16.67,16.67],mag:600},{type:'guys',at:{t:83.33},count:3,delay:[16.67,16.67],mag:600},{type:'guys',at:{t:86.67},count:3,delay:[5.33,16],mag:600},{type:'lemurr',at:{t:103.33},count:2,delay:[30,30]},{type:'lemurr',at:{hp:99},count:2,delay:[3,6]}],
 [{type:'gory',at:{t:12},count:3,delay:[29.33,58.67],mag:600},{type:'dog',at:{t:18},delay:[6.67,13.33],mag:600},{type:'snache',at:{t:20},delay:[6.67,13.33],mag:600},{type:'mooth',at:{t:26.67},count:1,mag:600},{type:'mooth',at:{t:30},count:1,mag:600},{type:'shadowboxer',at:{t:60},count:3,delay:[30,30]},{type:'shadowboxer',at:{t:61.33},count:3,delay:[30,30]},{type:'croco',at:{t:100},count:10,delay:[3.33,6.67],mag:600}],
 [{type:'squirrel',at:{t:0},count:20,delay:[0.67,1],mag:600},{type:'guys',at:{t:20},delay:[5,10],mag:600},{type:'shibalien',at:{t:20},delay:[6.67,13.33]},{type:'peng',at:{t:26.67},delay:[26.67,40],mag:600},{type:'sael',at:{t:33.33},count:5,delay:[16,24]},{type:'seal',at:{t:33.33},count:5,delay:[16,24],mag:600},{type:'squirrel',at:{hp:99},delay:[3.33,10],mag:600}],
 [{type:'guys',at:{t:6},delay:[5,10],mag:600},{type:'hippo',at:{t:12},delay:[26.67,40],mag:600},{type:'shibalien',at:{t:16.67},count:5,delay:[5,10]},{type:'gory',at:{t:20},delay:[26.67,40],mag:600},{type:'shibalien',at:{t:33.33},count:5,delay:[5,10]},{type:'shibalien',at:{t:83.33},count:5,delay:[5,10]},{type:'shibalien',at:{t:133.33},count:5,delay:[5,10]},{type:'lemurr',at:{hp:90},count:1},{type:'lemurr',at:{hp:90},count:1},{type:'lemurr',at:{hp:90},count:1},{type:'maawth',at:{hp:90},count:1,boss:true}],
 [{type:'bear',at:{t:13.33},count:1,mag:600},{type:'darkdog',at:{t:26.67},delay:[13.33,26.67]},{type:'darkdog',at:{t:40},delay:[40,40]},{type:'darkdog',at:{t:42},delay:[40,40]},{type:'darkdog',at:{t:44},delay:[40,40]},{type:'ursamajor',at:{t:50},count:1},{type:'ursamajor',at:{t:110},count:1},{type:'bear',at:{t:120},delay:[60,60],mag:600}],
 [{type:'dog',at:{t:0},delay:[5,20],mag:600},{type:'snache',at:{t:3.33},delay:[5,20],mag:600},{type:'guys',at:{t:30},delay:[5,20],mag:600},{type:'rabbit',at:{t:40},delay:[26.67,40],mag:600},{type:'shibalien',at:{hp:90},delay:[15,30]},{type:'squirrel',at:{hp:90},delay:[10,20],mag:600},{type:'liz56',at:{hp:90},count:1,boss:true}],
 [{type:'shibalien',at:{t:10},delay:[10,30]},{type:'shibalien',at:{t:13.33},delay:[30,60]},{type:'baa',at:{t:23.33},delay:[20,40],mag:600},{type:'gory',at:{t:26.67},delay:[30,60],mag:600},{type:'gorydark',at:{t:40},count:1},{type:'gorydark',at:{t:42},delay:[40,40]},{type:'phace',at:{t:66.67},count:1,boss:true},{type:'darkdog',at:{t:98},count:1},{type:'darkdog',at:{t:100},delay:[16.67,33.33]}],
 [{type:'croco',at:{t:0},count:5,delay:[13.33,26.67],mag:600},{type:'dog',at:{t:6},count:5,delay:[12,24],mag:600},{type:'hippo',at:{t:30},count:1,mag:600},{type:'peng',at:{hp:99},delay:[40,40],mag:600},{type:'croco',at:{hp:99},delay:[6.67,10],mag:600},{type:'hyppoh',at:{hp:99},count:6,delay:[3,6]},{type:'krabbe',at:{hp:99},count:6,delay:[3,6]},{type:'krabbe',at:{hp:99},delay:[33.33,50]},{type:'ursamajor',at:{hp:99},count:1,boss:true}],
 [{type:'metalhippo',at:{t:3.33},count:1},{type:'snache',at:{t:10},count:10,delay:[5,10],mag:600},{type:'guys',at:{t:12},count:10,delay:[5,10],mag:600},{type:'pigge',at:{t:20},delay:[26.67,53.33],mag:600},{type:'rabbit',at:{t:23.33},delay:[33.33,33.33],mag:600},{type:'rabbit',at:{t:25.33},delay:[33.33,33.33],mag:600},{type:'metalhippo',at:{t:36.67},count:3,delay:[33.33,50]},{type:'lemurr',at:{t:43.33},count:4,delay:[20,30]},{type:'kroxo',at:{t:53.33},count:10,delay:[14.67,22]},{type:'shibalien',at:{t:66.67},count:10,delay:[16.67,33.33]},{type:'metalhippo',at:{hp:99},count:1}],
 [{type:'baa',at:{t:16.67},count:3,delay:[4,8],mag:600},{type:'guys',at:{t:18.67},count:20,delay:[5,10],mag:600},{type:'heavenlyhippoe',at:{t:26.67},count:1},{type:'heavenlyhippoe',at:{t:31.67},count:1},{type:'heavenlyhippoe',at:{t:36.67},count:1},{type:'gabriel',at:{t:50},delay:[26.67,53.33]},{type:'baa',at:{t:66.67},count:3,delay:[4,8],mag:600},{type:'heavenlyhippoe',at:{t:133.33},delay:[60,80]},{type:'maawth',at:{t:166.67},count:3,delay:[166.67,166.67]},{type:'kroxo',at:{hp:99},delay:[16.67,33.33]},{type:'sael',at:{hp:90},delay:[60,80]},{type:'nimoy',at:{hp:80},count:1,boss:true}],
 [{type:'shibalien',at:{t:133.33},delay:[106.67,106.67]},{type:'shibalien',at:{t:134},delay:[106.67,106.67]},{type:'shibalien',at:{t:134.67},delay:[106.67,106.67]},{type:'shibalien',at:{t:135.33},delay:[106.67,106.67]},{type:'shibalien',at:{t:0},delay:[20,33.33]},{type:'shibalien',at:{t:0},count:3,delay:[1,2]},{type:'hyppoh',at:{t:0},delay:[30,50]},{type:'kroxo',at:{t:0},delay:[36.67,53.33]},{type:'krabbe',at:{t:30},count:8,delay:[50,70]},{type:'lemurr',at:{t:100},count:4,delay:[60,120]},{type:'ursamajor',at:{t:200},delay:[466.67,466.67]},{type:'maawth',at:{t:133.33},count:1},{type:'maawth',at:{t:135.33},count:1},{type:'liz56',at:{t:400},delay:[400,400]},{type:'clione',at:{t:0},count:1,boss:true}]
];
FUTURE_SPAWNS.forEach((rules,k)=>{STAGE_SPAWNS[FUTURE_START+k]=rules});
WEEKDAY_SETS.forEach((set,si)=>WEEKDAY_TIERS.forEach((t,k)=>{const boss=set.bosses[k],rules=[{type:'dog',at:{t:0},delay:[4,8]},{type:'snache',at:{t:4},delay:[6,14]},{type:'guys',at:{t:12},delay:[8,22]},{type:boss,at:{hp:90},count:1,boss:true}];if(k>=1)rules.push({type:boss,at:{hp:50},count:k>=2?2:1,delay:[6,10]});if(set.item==='all')rules.push({type:'peng',at:{t:20},delay:[10,20]});STAGE_SPAWNS[weekdayIdx(si,k)]=rules}));
RIBBON_TIERS.forEach((t,k)=>{const m=t.mag,b=t.bossMag,rules=[{type:'dog',at:{t:0},delay:[3,7],mag:m},{type:'pigge',at:{t:6},delay:[10,18],mag:m},{type:'snache',at:{t:10},delay:[6,12],mag:m},
 {type:'magpie',at:t.hard?{t:2}:{hp:95},count:1,boss:true,mag:b}];
 if(k>=1)rules.push({type:'seal',at:{hp:70},delay:[14,24],mag:m},{type:'guys',at:{t:20},delay:[8,16],mag:m});
 if(k>=2)rules.push({type:'shyboy',at:{hp:40},count:2,delay:[12,18],mag:m});if(k===2)rules.push({type:'magpie',at:{hp:30},count:1,mag:b});
 if(t.hard)rules.push({type:'magpie',at:{hp:50},count:1,mag:b},{type:'magpie',at:{hp:20},count:1,mag:b},{type:'bore',at:{hp:60},count:1,mag:100});
 STAGE_SPAWNS[RIBBON_START+k]=rules});
// Max enemies alive at once, per Battle Cats wiki (EoC Korea~Moon). Chapter 2 reuses the same caps.
const STAGE_MAX_ENEMIES=[3,4,30,5,6,7,6,5,10,5,6,7,12,3,4,6,10,10,10,10,10,4,5,3,5,20,8,8,10,10,10,8,6,10,10,10,4,8,5,10,10,5,10,4,2,10,3,4];
function maxEnemies(i){return STAGES[i]?.maxEnemies??(i<MAIN_STAGE_COUNT?STAGE_MAX_ENEMIES[i%CHAPTER1_LEN]:undefined)??Infinity}
function stageEnemies(i){return [...new Set((STAGE_SPAWNS[i]||[]).map(r=>r.type))]}
function pickDelay(range){return range[0]+Math.random()*(range[1]-range[0])}
function updateStageSpawns(dt){
 const hpPct=data.bases.enemy.hp/data.bases.enemy.max*100,cap=maxEnemies(selectedStage);
 let alive=game.units.filter(u=>!u.ally&&u.hp>0).length;const ready=[];
 for(const r of game.spawnRules){
  if(r.count!==undefined&&r.spawned>=r.count)continue;
  if(!r.triggered){
   const hit=r.at.t!==undefined?game.elapsed>=r.at.t:hpPct<=r.at.hp;
   if(!hit)continue;
   r.triggered=true;r.clock=0;
  }
  r.clock-=dt;
  if(r.clock<=0)ready.push(r);
 }
 // At the cap, a held rule's clock keeps running negative, so a freed slot goes to whoever
 // has waited longest instead of the first rule in the list (Hollywood: cap 2, Hippoe/Pigge every 1~2s).
 ready.sort((x,y)=>x.clock-y.clock);
 for(const r of ready){
  if(alive>=cap&&!r.boss)continue;
  addUnit(r.type,r.boss,r.mag?r.mag/100:1);r.spawned++;alive++;
  if(r.boss){triggerBossShockwave();$('#battleNotice').textContent='보스 '+UNIT_NAMES[r.type]+' 등장!';game.noticeTime=3}
  r.clock=Math.max(r.clock,-dt)+(r.delay?pickDelay(r.delay):1e9);
 }
}
function renderNewButtons(){for(const type of GENERIC_CD_TYPES){
 const b=$('#'+type+'Btn'),d=data.units[type],unlocked=allyUnlocked(type),cd=unitCooldown(type);
 b.disabled=!unlocked||!game.running||game.paused||game.ended||game.money<unitCost(type)||cd>0||allyDeployFull();
 b.querySelector('small').textContent=!unlocked?(UNLOCK_AT[type]==null?(ACQUIRE_TEXT[type]||'뽑기로 획득'):STAGES[UNLOCK_AT[type]].name+(chapterTag(UNLOCK_AT[type]))+' 클리어 시 해금'):allyDeployFull()?'출격 인원 가득참':`${unitCost(type)}원`;
 b.querySelector('em').style.display=cd?'block':'none';b.querySelector('em').style.transform=`scaleY(${cd/unitStats(type).cooldown})`;
}}

const RARE_STRIKE={ribbonorange:2,maple:2,brick:2,korn:2,teal:2,violet:2,orchid:2,cobalt:2,flame:2,scarlet:2,moss:2,coral:2,aqua:2,cooper:2,navy:2,dandelion:2,babyblue:2,mintcyan:2,peach:2,lightcream:2,midnight:2,darklilac:2,fusioncream:2,silver:2,lava:2,babypink:2,magenta:2,rainbow:2,lapis:2,selenite:2,topaz:2,cornflower:2,bittersweet:2,claret:2,verdigris:2,plum:2,forest:2,canary:2,cherry:2,mauve:2,khaki:2,tangerine:2,burgundy:2,mustard:2,sky:2,denim:2,charcoal:2,garnet:2,prism:2,black:1,white:1,maroon:1,brown:1,tan:1,beige:1,cream:1,olive:1,clover:2,indigo:1,lilac:1,hotpink:1,ruby:1,hacienda:2};// attack-frame index where the hit lands (frames before it are the windup)
const NEW_ATLASES={
magpie:{scale:0.86,left:-85,sheet:'assets/boss_magpie.webp?v=1',walkStep:2/30,attackStep:1,walk:[[4,4,197,174,0,0],[205,4,204,176,3,0],[413,4,211,178,-3,0],[628,4,205,175,5,0],[837,4,205,171,-4,0],[1046,4,201,166,-2,0],[1251,4,201,167,3,0],[1456,4,201,170,-1,0],[1661,4,199,165,-11,0],[1864,4,202,167,-1,0],[2070,4,200,171,-9,0],[2274,4,208,173,7,0],[2486,4,198,174,4,0],[2688,4,210,171,7,0],[2902,4,201,172,3,0],[3107,4,201,167,-2,0],[3312,4,194,168,-5,0],[3510,4,199,170,-3,0],[3713,4,207,170,6,0],[4,186,208,170,6,0],[216,186,188,168,3,0],[408,186,192,167,-5,0],[604,186,191,169,-3,0],[799,186,196,168,0,0],[999,186,198,169,-2,0]],attack:[[1201,186,233,168,37,0],[1438,186,248,142,13,0],[1690,186,242,166,-6,0],[1936,186,272,164,42,0],[2212,186,263,159,33,0],[2479,186,238,194,13,0],[2721,186,244,144,30,0],[2969,186,222,154,-4,0],[3195,186,231,178,21,0],[3430,186,243,196,4,0],[3677,186,237,205,-11,0],[4,395,243,220,-4,0],[251,395,249,151,31,0],[504,395,217,184,-17,0],[725,395,212,205,-20,0],[941,395,247,225,19,0],[1192,395,243,234,7,0],[1439,395,254,220,2,0],[1697,395,290,132,52,0],[1697,395,290,132,52,0],[1697,395,290,132,52,0],[1991,395,261,123,54,0],[2256,395,252,130,47,0],[2512,395,212,151,16,0],[2728,395,233,188,21,0],[2965,395,239,165,23,0],[3208,395,223,148,16,0],[3435,395,264,136,66,0],[3703,395,240,142,47,0],[4,633,234,166,29,0],[242,633,243,175,42,0],[489,633,250,165,44,0],[743,633,246,166,38,0],[993,633,273,197,49,0],[1270,633,240,177,-2,0],[1514,633,238,163,19,0],[1756,633,248,165,39,0],[2008,633,240,161,39,0],[2252,633,245,165,37,0]],hurt:[[2501,633,200,125,2,0]]},
jkbunbun:{scale:0.833,left:21,sheet:'assets/anim_jkbunbun.webp',walkStep:4/30,attackStep:2,walk:[[0,4,223,232,57,4],[225,3,222,233,57,4],[449,3,221,233,56,5],[672,2,221,234,56,5],[895,2,221,234,57,6],[1118,1,219,235,55,7],[1339,1,218,235,55,8],[1559,0,217,236,55,8],[1778,1,218,235,55,8],[1998,2,221,234,57,8],[2221,4,219,232,56,7],[2442,4,220,232,56,6],[2664,5,223,231,59,6],[2889,5,222,231,57,5],[3113,6,223,230,57,4],[3338,6,222,230,57,4],[3562,5,221,231,56,5],[3785,3,221,233,56,6],[0,242,220,234,56,6],[222,240,220,236,57,7],[444,239,218,237,55,8],[664,238,217,238,55,8],[883,238,218,238,55,8],[1103,239,219,237,55,8],[1324,240,221,236,57,7],[1547,241,220,235,56,5],[1769,242,220,234,56,5],[1991,244,224,232,59,4],[2217,246,223,230,57,4],[2442,247,222,229,57,4],[2666,248,221,228,56,5],[2889,247,221,229,56,6],[3112,245,220,231,56,6],[3334,244,218,232,55,8],[3554,243,220,233,57,9]],attack:[[3776,253,217,223,55,4],[0,824,250,222,62,10],[252,835,273,211,68,24],[527,811,263,235,113,18],[792,813,259,233,110,19],[1053,814,256,232,108,22],[1311,814,253,232,106,23],[1566,814,251,232,104,23],[1819,813,250,233,104,25],[2071,813,249,233,100,21],[2322,682,344,364,76,-58],[2668,499,412,547,77,-120],[3082,478,428,568,78,-124],[3512,817,396,229,79,-7],[0,1064,400,226,81,-2],[402,1067,217,223,55,4]],hurt:[[621,1048,275,242,114,13]]},
bore:{scale:0.833,left:21,sheet:'assets/anim_bore.webp',walkStep:2/30,attackStep:2,walk:[[0,46,160,148,72,-2],[162,47,160,147,72,-2],[324,47,160,147,72,-3],[486,47,160,147,72,-2],[648,45,160,149,72,-3],[810,46,160,148,72,-3],[972,47,160,147,72,-3],[1134,48,160,146,72,-1]],attack:[[1296,47,160,147,72,-3],[1458,49,152,145,72,-4],[1612,49,152,145,72,-4],[1766,52,150,142,72,-4],[1918,0,181,194,75,20],[2101,12,149,182,68,-4]],hurt:[[2252,0,150,194,90,-5]]},
raind:{scale:0.833,left:21,sheet:'assets/anim_raind.webp',walkStep:2/30,attackStep:2,walk:[[0,22,145,155,59,-1],[147,24,148,153,64,1],[297,19,148,158,67,-2],[447,14,139,163,61,-3],[588,12,132,165,55,-4],[722,14,132,163,54,-3],[856,16,133,161,54,-3],[991,18,134,159,55,-2],[1127,22,140,155,60,1],[1269,19,143,158,64,0],[1414,15,140,162,62,-2],[1556,12,134,165,57,-3],[1692,14,134,163,55,-3],[1828,19,135,158,54,-2],[1965,20,138,157,54,-2]],attack:[[2105,19,136,158,54,-3],[2243,21,134,156,54,-4],[2379,27,133,150,54,-3],[2514,21,137,156,53,-4],[2653,18,144,159,65,8],[2799,22,153,155,79,-3],[2954,24,156,153,82,-4],[3112,32,168,145,82,-4],[3282,33,165,144,83,-5],[3449,33,165,144,83,-4],[3616,16,193,161,62,-5],[3811,0,189,177,55,-23],[0,192,134,162,55,-3],[136,191,133,163,56,-4],[271,191,134,163,56,-3],[407,191,135,163,57,-3],[544,191,133,163,56,-3],[679,192,133,162,56,-3],[814,194,131,160,55,-3],[947,196,132,158,54,-3],[1081,196,136,158,54,-3]],hurt:[[1219,179,141,175,80,-4]]},
owlbrow:{scale:0.833,left:21,sheet:'assets/anim_owlbrow.webp',walkStep:2/30,attackStep:2,walk:[[0,89,70,87,38,-37],[72,90,70,86,37,-37],[144,90,70,86,36,-38],[216,90,70,86,35,-37],[288,89,70,87,34,-38],[360,90,70,86,34,-37],[432,89,70,87,34,-37],[504,90,70,86,34,-37],[576,90,70,86,35,-38],[648,90,69,86,35,-37],[719,89,70,87,37,-38],[791,90,70,86,37,-37]],attack:[[863,88,104,88,52,-39],[969,88,104,88,52,-39],[1075,43,199,133,100,-37],[1276,44,199,132,100,-37],[1477,0,94,176,47,-37],[1573,1,94,175,47,-37],[1669,44,199,132,100,-37],[1870,91,214,85,107,-37],[2086,90,214,86,107,-31],[2302,88,104,88,52,-27],[2408,43,199,133,100,-11],[2609,10,94,166,47,-6],[2705,26,177,150,77,4],[2884,68,196,108,89,2],[3082,82,114,94,63,-4],[3198,22,177,154,72,12],[3377,16,84,160,29,20],[3463,18,176,158,68,28],[3641,53,191,123,78,30],[3834,74,116,102,64,14],[0,209,169,164,50,32],[171,209,169,164,50,37],[342,178,216,195,42,-40],[560,178,216,195,42,-40],[778,269,202,104,33,-8],[982,258,194,115,33,11],[1178,254,190,119,38,20],[1370,257,192,116,45,30],[1564,259,194,114,54,32],[1760,262,197,111,62,36],[1959,270,112,103,46,22],[2073,222,192,151,64,42],[2267,223,193,150,68,36],[2462,212,104,161,23,32],[2568,227,195,146,76,27],[2765,229,195,144,80,22],[2962,280,209,93,96,18],[3173,280,105,93,55,2],[3280,281,105,92,55,-2],[3387,229,198,144,90,-4],[3587,204,95,169,41,-6],[3684,205,95,168,43,-10],[3781,237,200,136,98,-12],[0,408,199,133,100,-15],[201,455,214,86,107,-18],[417,455,214,86,107,-21],[633,455,104,86,52,-25],[739,455,104,86,52,-28],[845,408,199,133,100,-31],[1046,408,199,133,100,-34],[1247,375,94,166,47,-37],[1343,376,94,165,47,-38],[1439,408,199,133,100,-37],[1640,408,199,133,100,-37],[1841,455,214,86,107,-37],[2057,455,214,86,107,-37],[2273,455,104,86,52,-37],[2379,455,104,86,52,-37]],hurt:[[2485,398,162,143,119,-29]]},
assassinbear:{scale:0.833,left:21,sheet:'assets/anim_assassinbear.webp',walkStep:2/30,attackStep:2,walk:[[0,60,95,154,0,-41],[97,59,95,155,0,-41],[194,58,95,156,0,-41],[291,60,95,154,0,-41],[388,59,95,155,0,-41],[485,58,95,156,0,-41]],attack:[[582,0,97,214,8,-40],[681,4,107,210,18,-40],[790,17,166,197,6,-40],[958,75,137,139,0,-40]],hurt:[[1097,52,150,162,27,-40]]},
camelle:{scale:0.833,left:21,sheet:'assets/anim_camelle.webp',walkStep:4/30,attackStep:2,walk:[[0,16,132,212,70,-5],[134,17,136,211,73,-5],[272,17,140,211,77,-5],[414,18,146,210,80,-5],[562,20,148,208,83,-3],[712,20,156,208,90,-4],[870,21,149,207,85,-3],[1021,21,144,207,80,-3],[1167,18,141,210,78,-4],[1310,18,138,210,76,-4],[1450,17,135,211,73,-4],[1587,18,134,210,71,-4],[1723,18,132,210,68,-4],[1857,19,136,209,72,-4],[1995,20,140,208,75,-3],[2137,20,148,208,82,-4],[2287,21,141,207,76,-3],[2430,20,136,208,72,-4],[2568,17,133,211,69,-5],[2703,16,130,212,67,-6]],attack:[[2835,19,132,209,68,-5],[2969,12,122,216,68,-5],[3093,2,119,226,68,-5],[3214,1,119,227,68,-5],[3335,0,119,228,68,-5],[3456,0,119,228,68,-5],[3577,2,200,226,73,12],[3779,27,166,201,59,7],[0,263,175,196,68,-5],[177,263,175,196,68,-5],[354,263,175,196,68,-5],[531,263,186,196,68,-5],[719,263,188,196,68,-5],[909,250,132,209,68,-5],[1043,250,132,209,68,-5],[1177,250,132,209,68,-5],[1311,250,132,209,68,-5],[1445,250,132,209,68,-5],[1579,250,132,209,68,-5],[1713,250,132,209,68,-5],[1847,250,132,209,68,-5],[1981,250,132,209,68,-5],[2115,250,132,209,68,-5],[2249,250,132,209,68,-5]],hurt:[[2383,230,148,229,100,-5]]},
kory:{scale:0.833,left:21,sheet:'assets/anim_kory.webp',walkStep:2/30,attackStep:2,walk:[[0,22,121,95,59,-67],[123,22,121,95,59,-67],[246,23,121,94,59,-67],[369,23,121,94,59,-67],[492,24,121,93,59,-65],[615,24,121,93,59,-65],[738,23,121,94,59,-65],[861,23,121,94,59,-65],[984,22,121,95,59,-67],[1107,22,121,95,59,-67],[1230,23,121,94,59,-67],[1353,23,121,94,59,-67],[1476,24,121,93,59,-65],[1599,24,121,93,59,-65],[1722,23,121,94,59,-65],[1845,23,121,94,59,-65]],attack:[[1968,22,121,95,59,-68],[2091,24,117,93,59,-66],[2210,23,117,94,62,-66],[2329,18,102,99,56,-67],[2433,18,98,99,53,-67],[2533,17,100,100,55,-67],[2635,19,96,98,54,-67],[2733,18,96,99,55,-67],[2831,18,95,99,54,-67],[2928,17,95,100,54,-68],[3025,17,94,100,53,-67],[3121,5,120,112,29,-67],[3243,0,131,117,29,-70],[3376,3,131,114,29,-70],[3509,7,140,110,29,-70]],hurt:[[3651,13,116,104,73,-62]]},
// Multi-part enemies (shibalien … sloth below) play the game's own model animations, baked frame by frame from the
// Battle Cats Wiki AnimationViewer data: [x,y,w,h,ox,oy] with the model origin (ground point) at `left`. All share one
// scale, so their relative sizes are the game's own (no ENEMY_SIZE needed).
mastera:{scale:0.833,left:21,sheet:'assets/anim_mastera.webp',walkStep:2/30,attackStep:2,walk:[[0,42,93,113,34,-2],[95,42,93,113,34,-2],[190,42,93,113,34,-2],[285,42,94,113,35,-2],[381,42,94,113,35,-1],[477,42,94,113,35,-1],[573,42,95,113,36,-1],[670,42,96,113,37,-1],[768,42,96,113,37,-1],[866,42,97,113,37,-1],[965,42,98,113,38,-1],[1065,42,98,113,39,-1],[1165,41,98,114,39,-2],[1265,41,99,114,39,-2],[1366,41,99,114,40,-2],[1467,42,100,113,40,-2],[1569,42,100,113,40,-2],[1671,42,99,113,40,-2],[1772,42,99,113,39,-2],[1873,42,99,113,39,-1],[1974,42,98,113,39,-1],[2074,42,98,113,38,-1],[2174,42,97,113,37,-1],[2273,42,97,113,37,-1],[2372,42,96,113,37,-1],[2470,42,95,113,36,-1],[2567,42,94,113,35,-1],[2663,42,94,113,35,-1],[2759,42,94,113,35,-1],[2855,42,93,113,34,-1]],attack:[[2950,39,132,116,39,-2],[3084,39,132,116,39,-2],[3218,26,143,129,39,-2],[3363,22,152,133,39,-2],[3517,22,152,133,39,-2],[3671,0,162,155,39,-2],[3835,4,125,151,39,-2],[3962,4,125,151,39,-2],[0,208,126,118,39,-2],[128,218,121,108,39,-2],[251,218,121,108,39,-2],[374,219,118,107,39,-2]],hurt:[[494,157,103,169,40,-3]]},
celeboodle:{scale:0.833,left:21,sheet:'assets/anim_celeboodle.webp',walkStep:2/30,attackStep:2,walk:[[0,19,92,101,51,-2],[94,21,96,99,56,0],[192,20,102,100,62,-1],[296,19,105,101,66,0],[403,18,104,102,66,-1],[509,16,99,104,61,-2],[610,17,94,103,56,-2],[706,17,91,103,52,-2],[799,17,92,103,51,-3],[893,18,98,102,51,-3],[993,19,97,101,51,-2],[1092,19,102,101,58,-2],[1196,17,103,103,62,-2],[1301,18,100,102,62,-1],[1403,17,95,103,57,-1],[1500,16,91,104,53,-3],[1593,17,91,103,52,-2],[1686,18,91,102,51,-2]],attack:[[1779,16,91,104,52,-3],[1872,18,94,102,52,-2],[1968,19,97,101,52,-3],[2067,22,99,98,52,-2],[2168,20,99,100,52,-3],[2269,22,99,98,52,-2],[2370,22,99,98,52,-2],[2471,21,99,99,52,-3],[2572,21,99,99,52,-3],[2673,4,104,116,71,-2],[2779,4,100,116,69,-1],[2881,4,102,116,71,-1],[2985,7,109,113,68,-2],[3096,9,105,111,62,-1],[3203,12,94,108,57,-2],[3299,17,90,103,51,-2],[3391,17,90,103,51,-2],[3483,17,90,103,51,-2],[3575,17,90,103,51,-2],[3667,17,91,103,52,-2],[3760,17,91,103,52,-2]],hurt:[[3853,0,110,120,57,-3]]},
dagshund:{scale:0.833,left:21,sheet:'assets/anim_dagshund.webp',walkStep:2/30,attackStep:2,walk:[[0,14,95,119,47,-18],[97,11,95,122,46,-19],[194,9,95,124,46,-19],[291,11,93,122,44,-19],[386,11,93,122,44,-20],[481,9,93,124,44,-21],[576,8,94,125,45,-20],[672,6,94,127,45,-23],[768,14,94,119,46,-17]],attack:[[864,14,95,119,47,-20],[961,9,90,124,44,-21],[1053,5,77,128,39,-21],[1132,3,77,130,37,-20],[1211,0,77,133,35,-20],[1290,0,77,133,35,-20],[1369,0,77,133,35,-20],[1448,70,144,63,25,-23],[1594,71,142,62,23,-22],[1738,72,143,61,19,-22],[1883,72,133,61,22,-22],[2018,72,133,61,22,-22],[2153,72,131,61,20,-21],[2286,72,131,61,20,-22],[2419,70,133,63,23,-23],[2554,70,133,63,23,-22],[2689,69,132,64,24,-21],[2823,66,133,67,27,-20],[2958,59,139,74,35,-20],[3099,45,138,88,41,-20],[3239,14,92,119,42,-20],[3333,14,89,119,40,-20],[3424,14,91,119,41,-20],[3517,14,93,119,44,-20],[3612,14,96,119,46,-20]],hurt:[[3710,8,99,125,61,-20]]},
duche:{scale:0.833,left:21,sheet:'assets/anim_duche.webp',walkStep:2/30,attackStep:2,walk:[[0,20,100,99,14,-6],[102,20,98,99,14,-6],[202,20,98,99,14,-6],[302,19,97,100,14,-6],[401,19,97,100,14,-6],[500,20,98,99,14,-6],[600,20,98,99,14,-6],[700,20,98,99,14,-6],[800,20,98,99,14,-6],[900,20,99,99,15,-6],[1001,20,97,99,14,-6],[1100,19,97,100,15,-6],[1199,19,97,100,14,-6],[1298,20,98,99,15,-6],[1398,20,98,99,14,-6]],attack:[[1498,20,98,99,15,-6],[1598,20,98,99,15,-6],[1698,19,81,100,15,-6],[1781,19,81,100,15,-6],[1864,19,79,100,15,-6],[1945,19,79,100,15,-6],[2026,7,114,112,15,-6],[2142,7,112,112,13,-6],[2256,19,82,100,15,-6],[2340,19,82,100,15,-6],[2424,19,80,100,15,-6],[2506,19,80,100,15,-6],[2588,7,115,112,15,-6],[2705,7,114,112,14,-6],[2821,18,83,101,11,-6],[2906,19,81,100,15,-6],[2989,20,98,99,15,-6]],hurt:[[3089,0,82,119,28,-6]]},
sloth:{scale:0.833,left:21,sheet:'assets/anim_sloth.webp',walkStep:2/30,attackStep:2,walk:[[0,4,162,66,35,-5],[164,4,162,66,35,-5],[328,4,162,66,35,-5],[492,4,162,66,35,-5],[656,3,162,67,35,-5],[820,3,162,67,35,-5],[984,3,162,67,36,-5],[1148,3,162,67,36,-5],[1312,3,162,67,36,-5],[1476,2,162,68,36,-5],[1640,2,162,68,36,-5],[1804,2,162,68,36,-5],[1968,2,162,68,37,-5],[2132,2,162,68,37,-5],[2296,2,162,68,37,-5],[2460,1,162,69,38,-5],[2624,1,162,69,38,-5],[2788,1,162,69,38,-5],[2952,1,162,69,38,-5],[3116,1,162,69,38,-5],[3280,1,162,69,38,-5],[3444,0,162,70,39,-5],[3608,0,162,70,39,-5],[3772,1,163,69,39,-4],[0,73,162,69,39,-4],[164,73,161,69,39,-4],[327,73,161,69,39,-4],[490,73,162,69,40,-4],[654,73,162,69,40,-5],[818,72,162,70,40,-6],[982,72,162,70,41,-6],[1146,72,162,70,41,-7],[1310,72,162,70,40,-7],[1474,72,162,70,40,-7],[1638,73,162,69,39,-7],[1802,73,162,69,39,-7],[1966,75,163,67,39,-6],[2131,75,163,67,40,-6],[2296,75,165,67,41,-6],[2463,77,165,65,42,-5],[2630,77,166,65,41,-5],[2798,77,167,65,43,-5],[2967,78,167,64,42,-5],[3136,78,169,64,44,-5],[3307,78,169,64,44,-5],[3478,79,171,63,45,-5],[3651,79,171,63,45,-5],[3824,81,172,61,46,-4],[0,212,174,61,47,-4],[176,212,175,61,48,-4]],attack:[[353,202,171,71,44,-6],[526,201,170,72,44,-6],[698,206,171,67,44,-6],[871,206,171,67,44,-6],[1044,207,165,66,44,-6],[1211,208,165,65,44,-6],[1378,144,138,129,44,-6],[1518,147,138,126,44,-6],[1658,148,138,125,44,-6],[1798,148,138,125,44,-6],[1938,147,138,126,44,-6],[2078,147,138,126,44,-6],[2218,145,138,128,44,-6],[2358,145,138,128,44,-6],[2498,144,433,129,138,-14],[2933,200,523,73,183,-17],[3458,198,580,75,211,-19],[0,278,619,76,231,-20],[621,277,649,77,246,-21],[1272,276,671,78,257,-22],[1945,275,688,79,265,-23],[2635,275,697,79,270,-23],[3334,275,702,79,272,-23],[0,409,703,78,273,-22],[705,412,703,75,273,-19],[1410,425,172,62,44,-6],[1584,425,172,62,44,-6],[1758,425,172,62,44,-6],[1932,425,172,62,44,-6],[2106,425,172,62,44,-6],[2280,425,172,62,44,-6],[2454,425,172,62,44,-6],[2628,425,172,62,44,-6],[2802,425,172,62,44,-6],[2976,423,170,64,44,-6],[3148,421,170,66,44,-6],[3320,416,172,71,44,-6],[3494,416,172,71,44,-6]],hurt:[[3668,356,136,131,44,-8]]},
otta:{scale:0.833,left:21,sheet:'assets/anim_otta.webp',walkStep:2/30,attackStep:2,walk:[[0,8,72,99,29,-4],[74,8,72,99,29,-3],[148,8,71,99,29,-2],[221,8,70,99,28,-1],[293,10,65,97,22,1],[360,9,63,98,21,0],[425,10,64,97,22,-1],[491,10,63,97,21,-2],[556,8,62,99,20,-4],[620,8,62,99,21,-4],[684,7,63,100,22,-4],[749,8,62,99,21,-4],[813,11,62,96,20,0],[877,11,63,96,21,1],[942,12,62,95,20,3],[1006,11,63,96,21,3],[1071,10,67,97,24,0],[1140,9,67,98,25,-2],[1209,9,67,98,25,-2],[1278,10,68,97,26,-1]],attack:[[1348,17,76,90,27,-2],[1426,16,73,91,26,-2],[1501,14,70,93,25,-2],[1573,12,68,95,25,-2],[1643,10,67,97,24,-2],[1712,1,66,106,30,-3],[1780,0,64,107,30,-2],[1846,13,95,94,27,-8],[1943,27,95,80,27,-6],[2040,27,94,80,26,-5],[2136,21,82,86,26,-1],[2220,13,67,94,25,-1]],hurt:[[2289,5,87,102,45,-2]]},
// Into the Future enemies: frames baked from the game sheets (Battle Cats Wiki NNN_e.png), multi-part rigs
// assembled from the wiki idle GIFs (Shibalien, Helmut Krabbe, Cli-One, Nimoy Bore) or from their own parts.
shibalien:{scale:0.833,left:21,sheet:'assets/anim_shibalien.webp',walkStep:2/30,attackStep:2,walk:[[0,9,54,64,30,-2],[56,9,55,64,31,-2],[113,9,55,64,31,-2],[170,9,56,64,32,-2],[228,9,56,64,32,-2],[286,9,57,64,33,-2],[345,9,57,64,32,-2],[404,9,56,64,32,-2],[462,9,56,64,31,-2],[520,9,56,64,31,-2],[578,9,56,64,30,-2],[636,9,57,64,31,-2],[695,9,58,64,31,-2],[755,9,58,64,32,-2],[815,9,58,64,32,-2],[875,9,58,64,33,-2],[935,9,57,64,32,-2],[994,9,56,64,32,-2],[1052,9,55,64,31,-2],[1109,9,55,64,31,-2],[1166,9,54,64,30,-2],[1222,9,55,64,31,-2],[1279,9,55,64,31,-2],[1336,9,56,64,32,-2]],attack:[[1394,3,56,70,31,-1],[1452,3,56,70,31,-1],[1510,1,56,72,31,-2],[1568,3,56,70,31,-1],[1626,16,56,57,31,-2],[1684,16,56,57,31,-2],[1742,16,56,57,31,-2],[1800,16,56,57,31,-2],[1858,16,56,57,31,-2]],hurt:[[1916,0,62,73,35,-3]]},
kroxo:{scale:0.72,left:-10,sheet:'assets/itf_kroxo.png',walk:[[0,14,85,53],[87,13,86,54],[175,13,86,54],[263,13,86,54]],attack:[[351,28,85,39],[438,3,85,64],[525,0,84,67],[611,3,85,64]],hurt:[[698,26,84,41]]},
hyppoh:{scale:0.8,left:-20,sheet:'assets/itf_hyppoh.png',walk:[[0,23,106,88],[108,22,106,89],[216,22,105,89]],attack:[[323,3,100,108],[425,0,100,111],[527,41,110,70]],hurt:[[639,41,110,70]]},
sael:{scale:0.78,left:-22,sheet:'assets/itf_sael.png',walk:[[0,39,114,72],[116,32,113,79],[231,40,113,71],[346,35,114,76]],attack:[[462,30,114,81],[578,18,113,93],[693,4,115,107],[810,0,117,111],[929,0,119,111]],hurt:[[1050,30,114,81]]},
maawth:{scale:0.7,left:-28,sheet:'assets/itf_maawth.png',walk:[[0,36,94,127],[96,38,98,125]],attack:[[196,73,120,90],[318,73,122,90],[442,78,119,85],[563,0,133,163]],hurt:[[698,73,120,90]]},
lemurr:{scale:0.833,left:21,sheet:'assets/anim_lemurr.webp',walkStep:2/30,attackStep:2,walk:[[0,106,94,78,59,-3],[96,103,95,81,59,-2],[193,93,95,91,59,9],[290,107,95,77,59,26],[387,102,98,82,59,12],[487,101,95,83,59,5],[584,106,95,78,59,-2]],attack:[[681,106,95,78,59,-2],[778,104,95,80,52,-3],[875,104,95,80,52,-3],[972,0,99,184,58,16],[1073,5,117,179,75,17],[1192,9,121,175,39,1],[1315,97,92,87,47,38],[1409,106,95,78,59,-3]],hurt:[[1506,4,104,180,81,-1]]},
krabbe:{scale:0.833,left:21,sheet:'assets/anim_krabbe.webp',walkStep:2/30,attackStep:2,walk:[[0,26,109,92,47,-3],[111,27,108,91,46,-2],[221,26,107,92,46,-2],[330,24,108,94,47,-3],[440,24,107,94,46,-3],[549,24,108,94,47,-4],[659,25,107,93,45,-3],[768,26,107,92,45,-3],[877,26,108,92,47,-3],[987,25,107,93,46,-3],[1096,23,108,95,47,-4],[1206,22,109,96,47,-5],[1317,23,109,95,47,-5]],attack:[[1428,25,107,93,47,-4],[1537,32,122,86,54,-3],[1661,25,132,93,59,-3],[1795,24,132,94,59,-3],[1929,22,132,96,59,-3],[2063,0,131,118,47,-8]],hurt:[[2196,27,124,91,61,-2]]},
phace:{scale:0.62,left:-25,lift:34,sheet:'assets/itf_phace.png',walk:[[0,37,120,128]],attack:[[122,26,120,139],[244,6,128,159],[374,0,128,165]],hurt:[[504,26,120,139]]},
ursamajor:{scale:0.833,left:21,sheet:'assets/anim_ursamajor.webp',walkStep:2/30,attackStep:2,walk:[[0,61,100,156,56,-3],[102,61,100,156,56,-3],[204,61,100,156,56,-2],[306,60,101,157,57,-2],[409,61,101,156,57,-2],[512,62,100,155,56,-2],[614,61,101,156,57,-2],[717,61,101,156,57,-2],[820,60,101,157,57,-2]],attack:[[923,0,106,217,66,-2],[1031,5,117,212,76,-2],[1150,18,184,199,74,0],[1336,77,159,140,71,-2],[1497,76,141,141,53,-3]],hurt:[[1640,56,152,161,72,-3]]},
clione:{scale:0.833,left:21,sheet:'assets/anim_clione.webp',walkStep:2/30,attackStep:2,walk:[[0,2,136,184,65,56],[138,2,136,184,65,56],[276,2,136,184,65,56],[414,2,137,184,65,56],[553,1,138,185,66,56],[693,2,139,184,68,55],[834,3,140,183,69,55],[976,3,141,183,72,54],[1119,5,146,181,79,54],[1267,6,146,180,81,54],[1415,6,148,180,83,53],[1565,7,148,179,84,53],[1715,7,149,179,85,53],[1866,7,149,179,85,53],[2017,7,149,179,85,53],[2168,7,149,179,86,52],[2319,7,149,179,86,52],[2470,7,149,179,86,52],[2621,7,149,179,86,52],[2772,7,148,179,85,52],[2922,6,148,180,84,52],[3072,6,147,180,82,53],[3221,5,146,181,80,53],[3369,2,141,184,73,53],[3512,2,139,184,70,53],[3653,1,138,185,68,54],[3793,0,138,186,68,54],[3933,1,137,185,67,54],[0,343,137,185,67,54],[139,343,136,185,66,54]],attack:[[277,343,139,185,78,56],[418,343,139,185,78,56],[559,343,139,185,77,56],[700,343,139,185,77,55],[841,343,140,185,76,52],[983,345,142,183,74,48],[1127,346,143,182,72,45],[1272,347,143,181,69,42],[1417,347,143,181,69,41],[1562,347,143,181,69,41],[1707,347,143,181,68,40],[1852,347,143,181,68,40],[1997,346,143,182,68,40],[2142,345,143,183,70,41],[2287,342,141,186,72,44],[2430,337,137,191,78,50],[2569,279,237,249,82,-3],[2808,265,248,263,85,-4],[3058,247,258,281,87,-5],[3318,225,269,303,88,-7],[3589,188,325,340,120,-10],[0,564,309,323,105,-10],[311,573,301,314,96,-10],[614,555,321,332,115,-10],[937,553,334,334,117,-11],[1273,568,331,319,101,-14],[1606,545,354,342,122,-14],[1962,547,351,340,119,-13],[2315,568,331,319,99,-13],[2648,546,354,341,120,-14],[3004,530,371,357,135,-14],[3377,589,287,298,100,-6],[3666,631,239,256,101,37],[0,889,329,360,163,9],[331,975,253,274,101,24],[586,1037,140,212,102,81],[728,928,350,321,102,-26],[1080,919,383,330,102,-35],[1465,916,400,333,104,-38],[1867,912,408,337,104,-38],[2277,900,410,349,104,-37],[2689,895,415,354,104,-33],[3106,891,418,358,104,-34],[3526,892,420,357,104,-32],[0,1251,420,350,103,-25],[422,1251,408,350,104,-25],[832,1256,403,345,104,-20],[1237,1258,402,343,104,-18],[1641,1260,393,341,102,-18],[2036,1261,377,340,98,-18],[2415,1310,391,291,88,-18],[2808,1340,279,261,79,-12],[3089,1415,143,186,73,47],[3234,1414,143,187,72,46],[3379,1414,144,187,71,44],[3525,1413,143,188,69,43],[3670,1413,143,188,70,43],[3815,1413,143,188,70,43],[0,1603,143,187,69,44],[145,1603,142,187,71,46],[289,1605,139,185,72,51],[430,1605,139,185,75,53],[571,1605,138,185,76,55],[711,1605,138,185,76,55],[851,1605,138,185,76,55],[991,1605,139,185,78,56],[1132,1605,139,185,78,56],[1273,1605,139,185,78,56],[1414,1605,139,185,78,56],[1555,1605,139,185,78,56],[1696,1605,139,185,78,56],[1837,1605,139,185,78,56],[1978,1605,139,185,78,56]],hurt:[[2119,1613,118,177,93,63]]},
nimoy:{scale:0.833,left:21,sheet:'assets/anim_nimoy.webp',walkStep:2/30,attackStep:2,walk:[[0,52,160,142,72,-2],[162,53,160,141,72,-2],[324,54,160,140,72,-3],[486,54,160,140,72,-2],[648,51,160,143,72,-3],[810,52,160,142,72,-3],[972,54,160,140,72,-3],[1134,55,160,139,72,-1]],attack:[[1296,54,160,140,72,-3],[1458,55,152,139,72,-4],[1612,55,152,139,72,-4],[1766,57,150,137,72,-4],[1918,0,195,194,89,20],[2115,11,150,183,68,-4]],hurt:[[2267,0,151,194,91,-5]]},
liz56:{scale:0.8,left:-20,sheet:'assets/itf_liz56.png',walk:[[0,31,106,76],[108,35,106,72],[216,31,106,76],[324,39,112,68]],attack:[[438,40,106,67],[546,0,122,107],[670,38,126,69]],hurt:[[798,40,106,67]]},
shyboy:{scale:0.62,left:-25,lift:34,sheet:'assets/itf_shyboy.png',walk:[[0,36,118,127]],attack:[[120,23,119,140],[241,6,125,157],[368,0,126,163]],hurt:[[496,42,150,121]]},
gorydark:{scale:0.7,left:-5,sheet:'assets/itf_gorydark.png',walk:[[0,18,72,83],[74,20,73,81],[149,17,73,84],[224,15,72,86],[298,15,72,86],[372,18,72,83]],attack:[[446,0,71,101],[519,0,70,101],[591,11,97,90],[690,31,91,70],[783,31,90,70]],hurt:[[875,31,90,70]]},
shadowboxer:{scale:0.58,left:-24,sheet:'assets/itf_shadowboxer.png',walk:[[0,43,93,115],[95,46,99,112],[196,29,89,129],[287,37,88,121]],attack:[[377,41,110,117],[489,38,133,120],[624,0,98,158]],hurt:[[724,43,93,115]]},
heavenlyhippoe:{scale:0.8,left:-20,sheet:'assets/itf_heavenlyhippoe.png',walk:[[0,18,106,83],[108,15,105,86],[215,15,105,86],[322,16,105,85]],attack:[[429,3,100,98],[531,0,100,101],[633,15,111,86]],hurt:[[746,18,109,83]]},
bunbun:{scale:.5,left:-49,sheet:'assets/bunbun_frames.png',walk:[[0,0,354,243],[354,0,354,243],[708,0,354,243],[1062,0,354,243]],attack:[[1416,0,354,243],[1770,0,354,243],[2124,0,354,243],[2478,0,354,243]],hurt:[[2832,0,354,243]]},
onyx:{scale:.335,left:-35,sheet:ONYX_SHEET,walk:[[8,88,220,224,0,0],[236,87,236,225,1,-1],[480,90,243,222,6,0]],attack:[[731,4,256,308,-5,1],[995,65,418,247,200,-63],[1421,89,241,223,5,1]],hurt:[[1670,116,252,196,8,-1]],
 evolved:{sheet:ONYX_EVOLVED_SHEET,scale:.265,left:-40,walk:[[8,177,307,396,0,0],[323,177,309,396,2,0],[640,178,296,395,-1,-2]],attack:[[944,4,447,569,20,-2],[1399,208,516,365,161,-12],[1923,186,334,387,10,-1]],hurt:[[2265,201,285,372,-31,32]]}},
nyandam:{scale:.55,left:-70,sheet:'assets/nyandam_frames.png?v=2',walk:[[0,0,368,192],[368,0,368,192],[736,0,368,192],[1104,0,368,192]],attack:[[2576,0,368,192],[2944,0,368,192],[3312,0,368,192],[1840,0,368,192],[2208,0,368,192]]},// attack: 3 windup frames (shadow minions rise out of the ground, arms up), the hand-mass sweep (strike), recovery
// Doge Dark, per the game's own animation (Battle Cats Wiki AnimationViewer 046_e.json, cuts from 046_e.png):
// walk swaps leg drawings 0,1,0,2 every game frame (1/30s); the attack plays its bites in the first 10 frames
// (cut 9 open, 4 open, 9, 5 lunge, 6 lunge) then stands in the walk pose until the hit at frame 41.
darkdog:{scale:1,left:-4,sheet:'assets/darkdog_e.png',walkStep:1/30,walk:[[1,1,50,56],[53,1,50,56],[1,1,50,56],[105,1,50,56]],
 attack:[[157,59,50,56],[1,59,50,56],[53,59,50,56],[105,59,50,56],[1,1,50,56]],attackKeys:[[0,0],[1,1],[3,0],[4,2],[6,3],[10,4]],hurt:[[157,1,50,56]]},
gabriel:{scale:1,left:-10,sheet:'assets/gabriel_sheet.png',walk:[[5,11,62,56],[70,11,62,56],[135,11,62,56]],attack:[[5,87,61,58,-1],[69,88,62,57],[134,94,60,51],[197,94,60,51]],hurt:[[5,165,61,58,-1]]},
ectosnache:{scale:1,left:-10,sheet:'assets/snache_dog-sprite.png',walk:[[299,43,55,63],[357,43,57,63],[417,43,61,63],[481,43,68,63]],attack:[[299,127,52,57],[354,124,51,60],[408,130,73,54],[484,142,73,42]]},
rhino:{scale:.55,left:-27,walk:[[3,1,106,81,0],[111,2,108,80,2],[225,4,104,78,-1],[2,88,107,77,2],[111,84,108,81,2],[224,85,105,80,0],[1,170,108,78,0],[113,171,106,77,1],[223,167,106,81,0]],attack:[[2,88,107,75,8,0,-8],[2,88,107,75,12,0,-14],[331,81,106,78,-10],[331,1,106,78,-18],[331,81,106,78,-8]],hurt:[[2,88,107,77,2]]},
face:{scale:.62,left:-25,lift:34,walk:[[1,1,118,127,0,0]],attack:[[121,1,121,138,2,-11],[244,1,125,157,2,-28],[371,1,126,163,3,-34]],hurt:[[1,134,155,121,9,5]]},
rabbit:{scale:.72,left:-10,walk:[[6,11,56,76,0],[79,26,56,61,-1],[153,28,55,59,-1],[220,5,61,82,2],[293,1,71,71,14],[375,10,60,77,7]],attack:[[1,107,79,64,20],[105,89,74,71,18],[235,96,52,58,-6],[325,102,90,66,33]],hurt:[[13,188,90,56,6]]},
squirrel:{scale:.68,left:-12,walk:[[20,51,54,41,0],[99,52,59,40,3],[177,49,68,43,15],[259,46,75,46,13],[345,45,72,47,16]],attack:[[5,102,69,83,13],[90,98,70,87,15],[181,94,76,91,18],[269,123,70,62,12]],hurt:[[357,145,59,44,4]]},
kangaroo:{scale:.58,left:-24,walk:[[1,1,93,122,0],[96,1,100,112,9],[1,126,90,129,-5],[96,115,89,126,-3]],attack:[[200,1,110,121,-8],[191,131,133,124,7],[333,97,100,158,-11]],hurt:[[96,1,100,112,9]]},
mooth:{scale:.7,left:-28,walk:[[7,1,99,126,0],[111,3,103,125,4],[217,1,106,128,3]],attack:[[1,163,121,85,12],[124,162,120,81,10],[248,131,119,90,19],[378,1,131,164,23]],hurt:[[217,1,106,128,3]]},
peng:{scale:0.72,left:0,walk:[[1,1,58,87,0],[69,1,56,87,0],[138,1,56,87,-1],[208,1,59,88,-1],[273,1,56,86,-2],[340,1,58,87,-2],[408,2,58,86,-2]],attack:[[6,91,57,88,-2],[73,91,56,87,-2],[137,92,57,87,-3],[205,93,54,86,-3],[269,91,58,85,-1],[330,93,59,83,-2],[391,91,112,129,49]],hurt:[[4,181,84,59,11]]},
gory:{scale:0.7,left:-5,walk:[[2,4,72,83,0],[76,5,73,82,1],[152,2,72,85,-1],[227,1,72,86,-1],[303,1,71,86,-2],[377,4,72,83,0]],attack:[[3,90,70,100,-4],[79,89,70,101,-3],[157,89,101,90,9],[260,94,100,72,6],[363,96,90,70,6]],hurt:[[260,169,93,76,6]]},
baa:{scale:0.68,left:-7,walk:[[8,2,82,73,0],[99,2,82,73,0],[190,2,82,73,0],[280,2,82,73,0],[366,2,82,73,1]],attack:[[2,81,83,70,4],[92,81,83,70,3],[183,77,118,77,34],[304,77,83,75,-2]],hurt:[[92,157,83,69,3]]},
seal:{scale:0.78,left:-22,walk:[[2,7,112,72,0],[116,1,111,78,1],[1,88,111,71,1]],attack:[[116,95,112,62,1],[116,160,111,75,1],[232,11,113,99,1],[350,2,115,109,1],[349,113,116,110,3]],hurt:[[116,160,111,75,1]]},
croco:{scale:0.72,left:-10,walk:[[2,29,85,39,0],[89,29,86,39,1],[177,28,86,40,1],[265,28,86,40,1],[354,29,85,39,0]],attack:[[2,98,85,39,0],[90,73,85,64,0],[178,70,84,67,0],[266,73,85,64,0],[354,104,85,33,0]],hurt:[[90,142,85,64,0]]},

 pigge:{scale:.8,left:-20,walk:[[4,1,103,77],[4,79,103,76],[4,157,103,76],[115,5,104,73],[112,80,109,76],[115,158,104,75]],attack:[[225,1,126,104],[225,107,126,67],[225,177,126,67]],hurt:[[355,3,124,65],[368,72,103,65]]},
 crimson:{scale:0.45,left:-30,sheet:CRIMSON_SHEET,walk:[[10,36,136,144,0],[234,36,136,143,0],[462,36,141,145,4]],attack:[[685,36,185,143,10],[900,36,220,143,86],[1186,36,138,143,3]],hurt:[[1401,36,167,150,27]],evolved:{sheet:CRIMSON_EVOLVED_SHEET,scale:0.278,left:-25,walk:[[32,216,187,279,0],[272,216,200,279,3],[522,216,215,279,2]],attack:[[779,216,265,279,3],[1053,216,410,279,168],[1464,216,212,279,-5]],hurt:[[1741,216,234,279,6]]}},
 gold:{scale:0.36,left:-30,sheet:GOLD_SHEET,walk:[[15,267,168,177,0],[278,266,167,176,0],[544,266,172,178,3]],attack:[[798,257,239,187,7],[1054,266,333,175,165],[1457,266,169,178,1]],hurt:[[1706,266,263,187,30]],evolved:{sheet:GOLD_EVOLVED_SHEET,scale:0.269,left:-26,walk:[[30,206,197,313,0],[282,206,192,313,-5],[545,206,180,313,-17]],attack:[[773,206,255,313,30],[1020,206,445,313,215],[1497,206,181,313,-16]],hurt:[[1705,206,282,313,40]]}},
 ivory:{scale:0.36,left:-30,sheet:IVORY_SHEET,walk:[[11,284,171,179,0],[270,284,171,178,-1],[535,284,175,180,2]],attack:[[753,246,248,216,8],[1035,283,354,180,183],[1458,284,171,179,0]],hurt:[[1710,281,265,188,29]],evolved:{sheet:IVORY_EVOLVED_SHEET,scale:0.296,left:-30,walk:[[34,211,206,290,0],[269,211,198,290,1],[506,211,200,290,0]],attack:[[758,211,251,290,32],[1018,211,433,290,241],[1475,211,179,290,2]],hurt:[[1697,211,289,290,47]]}},
 chartreuse:{scale:0.45,left:-30,sheet:CHARTREUSE_SHEET,walk:[[45,35,142,153,0],[260,39,140,146,0],[471,33,148,155,3]],attack:[[681,35,163,153,-3],[859,39,286,150,145],[1202,35,137,151,-4]],hurt:[[1413,37,191,152,7]],evolved:{sheet:CHARTREUSE_EVOLVED_SHEET,scale:0.259,left:-24,walk:[[31,219,187,302,0],[276,219,187,302,-3],[524,219,197,302,-4]],attack:[[773,219,223,302,-4],[1017,219,413,302,167],[1483,219,192,302,-4]],hurt:[[1741,219,250,302,20]]}},
 mint:{scale:0.45,left:-30,sheet:MINT_SHEET,walk:[[51,43,132,142,0],[266,44,131,142,-1],[473,43,137,143,4]],attack:[[668,33,176,153,37],[878,46,266,141,134],[1198,44,129,141,-2]],hurt:[[1407,45,170,143,9]],evolved:{sheet:MINT_EVOLVED_SHEET,scale:0.284,left:-23,walk:[[6,0,169,320,0],[181,0,186,320,18],[373,0,179,320,-10]],attack:[[558,0,239,320,40],[803,0,477,320,249],[1286,0,207,320,8]],hurt:[[1499,0,287,320,-10]]}},
 azure:{scale:0.45,left:-30,sheet:AZURE_SHEET,walk:[[46,47,144,157,0],[252,51,143,151,-1],[452,46,148,158,3]],attack:[[665,5,182,195,17],[861,7,322,210,38],[1226,44,141,157,-3]],hurt:[[1411,46,199,156,11]],evolved:{sheet:AZURE_EVOLVED_SHEET,scale:0.319,left:-29,walk:[[6,0,186,321,0],[198,0,182,321,-11],[386,0,185,321,15]],attack:[[577,0,306,321,71],[889,0,474,321,162],[1369,0,198,321,-23]],hurt:[[1573,0,292,321,16]]}},
 crystal:{scale:0.45,left:-30,sheet:CRYSTAL_SHEET,walk:[[47,35,144,155,0],[256,38,143,151,0],[463,35,146,155,2]],attack:[[678,35,165,154,-1],[857,35,274,154,132],[1186,35,143,155,0]],hurt:[[1399,33,191,157,8]],evolved:{sheet:CRYSTAL_EVOLVED_SHEET,scale:0.277,left:-23,walk:[[6,0,167,297,0],[179,0,168,297,2],[353,0,164,297,-1]],attack:[[523,0,272,297,88],[801,0,515,297,294],[1322,0,194,297,-2]],hurt:[[1522,0,240,297,7,0,0,1]]}},
 lavender:{scale:0.45,left:-30,sheet:LAVENDER_SHEET,walk:[[51,35,140,153,0],[263,37,139,149,0],[470,35,144,153,4]],attack:[[681,35,169,153,0],[872,35,259,152,119],[1190,35,138,152,-1]],hurt:[[1416,35,188,151,5]],evolved:{sheet:LAVENDER_EVOLVED_SHEET,scale:0.293,left:-29,walk:[[6,0,199,274,0],[211,0,193,274,-8],[410,0,192,274,-8]],attack:[[608,0,206,274,-6],[820,0,498,274,291],[1324,0,192,274,32]],hurt:[[1522,0,272,274,-3,0,0,1]]}},
 salmon:{scale:0.45,left:-30,sheet:SALMON_SHEET,walk:[[51,72,131,143,0],[264,72,130,142,-2],[454,72,135,144,3]],attack:[[648,6,176,208,11],[824,74,339,141,207],[1231,71,131,143,-1]],hurt:[[1427,70,185,146,9]],evolved:{sheet:SALMON_EVOLVED_SHEET,scale:0.298,left:-34,walk:[[6,0,229,344,0],[241,0,200,344,-28],[447,0,212,344,-17]],attack:[[665,0,253,344,-14],[924,0,528,344,216],[1458,0,200,344,-36]],hurt:[[1664,0,280,344,-5]]}},
 raspberry:{scale:0.45,left:-30,sheet:RASPBERRY_SHEET,walk:[[37,34,141,152,0],[256,35,136,147,-3],[475,33,144,154,2]],attack:[[663,36,197,151,56],[877,36,279,151,139],[1221,33,140,153,-1]],hurt:[[1453,37,191,150,9]],evolved:{sheet:RASPBERRY_EVOLVED_SHEET,scale:0.328,left:-33,walk:[[6,0,206,279,0],[218,0,209,279,2],[433,0,199,279,-14]],attack:[[638,0,265,279,24],[909,0,483,279,232],[1398,0,210,279,-2]],hurt:[[1614,0,261,279,30]]}},
 black:{scale:0.41,left:-38,sheet:'assets/rare_black.webp?v=2',walk:[[6,30,187,156,0,0],[199,34,183,152,3,-1],[388,33,180,153,-1,0],[574,33,176,153,-4,0]],attack:[[756,6,183,180,-6,0],[945,20,374,166,9,0],[1325,34,204,152,21,0]],hurt:[[1535,21,199,165,-10,0]],evolved:{sheet:'assets/rare_black.webp?v=2',scale:0.328,left:-29,walk:[[6,224,177,235,0,0],[189,224,175,235,3,0],[370,228,176,231,1,0],[552,226,172,233,4,0]],attack:[[730,192,174,267,8,0],[910,197,412,262,32,0],[1328,239,197,220,26,0]],hurt:[[1531,223,180,236,-8,0]]}},
 white:{scale:0.405,left:-31,sheet:'assets/rare_white.webp?v=2',walk:[[6,43,151,158,0,0],[163,43,151,158,-2,0],[320,43,150,158,-1,0],[476,43,153,158,2,0]],attack:[[635,6,217,195,4,0],[858,40,287,161,137,0],[1151,41,155,160,1,0]],hurt:[[1312,24,204,177,-16,0]],evolved:{sheet:'assets/rare_white.webp?v=2',scale:0.33,left:-25,walk:[[6,257,153,233,0,0],[165,255,142,235,-8,0],[313,255,148,235,-5,0],[467,256,147,234,-8,0]],attack:[[620,207,194,283,-3,0],[820,256,318,234,146,0],[1144,253,138,237,-12,0]],hurt:[[1288,260,209,230,-32,0]]}},
 maroon:{scale:0.427,left:-38,sheet:'assets/rare_maroon.webp?v=2',walk:[[6,50,176,150,0,0],[188,53,180,147,-1,0],[374,50,171,150,-3,0],[551,50,176,150,-3,0]],attack:[[733,6,186,194,-12,0],[925,46,477,154,297,0],[1408,49,179,151,-7,0]],hurt:[[1593,45,191,155,-13,0]],evolved:{sheet:'assets/rare_maroon.webp?v=2',scale:0.352,left:-31,walk:[[6,257,178,219,0,0],[190,254,178,222,0,0],[374,254,177,222,1,0],[557,254,179,222,6,0]],attack:[[742,206,204,270,9,0],[952,259,465,217,285,0],[1423,257,145,219,-1,0]],hurt:[[1574,268,209,208,-18,0]]}},
 brown:{scale:0.408,left:-35,sheet:'assets/rare_brown.webp?v=2',walk:[[6,44,172,157,0,0],[184,42,172,159,-2,0],[362,42,171,159,2,0],[539,39,165,162,0,0]],attack:[[710,6,195,195,-11,0],[911,39,269,162,111,0],[1186,42,167,159,-5,0]],hurt:[[1359,40,214,161,-17,0]],evolved:{sheet:'assets/rare_brown.webp?v=2',scale:0.329,left:-26,walk:[[6,238,161,234,0,0],[173,238,165,234,3,0],[344,238,165,234,10,0],[515,239,164,233,9,0]],attack:[[685,207,211,265,15,0],[902,262,312,210,143,0],[1220,237,162,235,16,0]],hurt:[[1388,256,199,216,-4,0]]}},
 tan:{scale:0.408,left:-37,sheet:'assets/rare_tan.webp?v=2',walk:[[6,57,182,157,0,0],[194,52,177,162,-21,0],[377,54,171,160,-17,0],[554,54,173,160,-11,0]],attack:[[733,6,167,208,-12,0],[906,46,350,168,41,0],[1262,68,280,146,68,0]],hurt:[[1548,58,197,156,-4,0]],evolved:{sheet:'assets/rare_tan.webp?v=2',scale:0.338,left:-28,walk:[[6,262,168,228,0,0],[180,262,165,228,-3,0],[351,262,163,228,-2,0],[520,262,154,228,2,0]],attack:[[680,220,193,270,42,0],[879,256,385,234,41,0],[1270,282,265,208,88,0]],hurt:[[1541,291,199,199,-2,0]]}},
 beige:{scale:0.4,left:-38,sheet:'assets/rare_beige.webp?v=2',walk:[[6,49,189,161,0,0],[201,48,191,162,-1,0],[398,46,197,164,9,0],[601,53,190,157,-3,0]],attack:[[797,6,164,204,2,0],[967,55,291,155,108,0],[1264,48,192,162,38,0]],hurt:[[1462,35,174,175,7,0]],evolved:{sheet:'assets/rare_beige.webp?v=2',scale:0.363,left:-34,walk:[[6,274,190,212,0,0],[202,275,185,211,1,0],[393,272,178,214,1,0],[577,270,174,216,-2,0]],attack:[[757,216,158,270,17,0],[921,278,334,208,142,0],[1261,286,260,200,106,0]],hurt:[[1527,263,167,223,51,0]]}},
 cream:{scale:0.41,left:-39,sheet:'assets/rare_cream.webp?v=2',walk:[[6,35,192,156,0,0],[204,36,179,155,-1,0],[389,36,177,155,-2,0],[572,34,177,157,-5,0]],attack:[[755,6,183,185,-8,0],[944,35,298,156,137,0],[1248,33,157,158,5,0]],hurt:[[1411,13,213,178,-19,0]],evolved:{sheet:'assets/rare_cream.webp?v=2',scale:0.356,left:-27,walk:[[6,242,153,216,0,0],[165,240,154,218,1,0],[325,241,152,217,3,0],[483,240,151,218,0,0]],attack:[[640,197,181,261,12,0],[827,245,347,213,202,0],[1180,241,151,217,17,0]],hurt:[[1337,208,222,250,-15,0]]}},
 olive:{scale:0.41,left:-36,sheet:'assets/rare_olive.webp',walk:[[30,159,177,156,0,0],[230,159,161,158,-8,0],[409,159,169,159,-3,0],[589,158,176,160,5,0]],attack:[[778,115,204,203,0,0],[1018,159,453,169,282,0],[1494,158,180,158,2,0]],hurt:[[1684,141,221,178,8,0]],evolved:{sheet:'assets/rare_olive.webp',scale:0.322,left:-26,walk:[[36,408,159,239,0,0],[229,409,160,239,-4,0],[417,410,161,237,0,0],[606,409,159,237,-3,0]],attack:[[789,362,219,286,16,0],[1031,410,458,239,294,0],[1518,410,167,239,3,0]],hurt:[[1707,405,217,244,-16,0]]}},
 clover:{scale:0.438,left:-39,sheet:'assets/rare_clover.webp?v=2',walk:[[6,36,176,146,0,0],[188,34,164,148,0,0],[358,35,166,147,-6,0]],attack:[[530,6,207,176,11,0],[743,34,177,148,5,0],[926,38,281,144,149,0],[1213,35,139,147,-2,0]],hurt:[[1358,17,214,165,-10,0]],evolved:{sheet:'assets/rare_clover.webp?v=2',scale:0.336,left:-27,walk:[[6,209,164,229,1,0],[176,210,162,228,4,0],[344,207,164,231,6,0]],attack:[[514,188,195,250,11,0],[715,209,181,229,3,0],[902,222,335,216,191,0],[1243,205,137,233,5,-1]],hurt:[[1386,193,217,245,8,0]]}},
 indigo:{scale:0.393,left:-35,sheet:'assets/rare_indigo.webp?v=2',walk:[[6,44,177,163,0,0],[189,44,156,163,-5,0],[351,43,165,164,-3,0],[522,43,165,164,-7,0]],attack:[[693,6,210,201,-8,0],[909,43,342,164,187,0],[1257,44,152,163,-4,0]],hurt:[[1415,37,209,170,-10,0]],evolved:{sheet:'assets/rare_indigo.webp?v=2',scale:0.348,left:-27,walk:[[6,251,157,222,0,0],[169,252,152,221,-2,0],[327,253,155,220,1,0],[488,253,162,220,6,0]],attack:[[656,213,195,260,13,0],[857,265,383,208,209,0],[1246,261,142,212,3,0]],hurt:[[1394,249,194,224,-2,0]]}},
 lilac:{scale:0.395,left:-34,sheet:'assets/rare_lilac.webp?v=2',walk:[[6,52,174,162,0,0],[186,54,167,160,-6,0],[359,48,164,166,-7,0],[529,47,171,167,-7,0]],attack:[[706,28,200,186,-17,0],[912,6,328,208,46,0],[1246,53,244,161,77,-1]],hurt:[[1496,25,213,189,-7,0]],evolved:{sheet:'assets/rare_lilac.webp?v=2',scale:0.298,left:-26,walk:[[6,250,173,258,0,0],[185,249,166,259,-3,0],[357,252,170,256,0,0],[533,252,167,256,0,0]],attack:[[706,220,197,288,9,0],[909,268,335,240,42,0],[1250,273,225,235,63,0]],hurt:[[1481,256,191,252,-29,0]]}},
 hotpink:{scale:0.4,left:-38,sheet:'assets/rare_hotpink.webp?v=2',walk:[[6,42,189,160,0,0],[201,41,186,161,-3,0],[393,42,180,160,-8,0],[579,41,169,161,-5,0]],attack:[[754,6,169,196,-13,0],[929,43,463,159,125,0],[1398,42,187,160,-2,0]],hurt:[[1591,8,196,194,-16,0]],evolved:{sheet:'assets/rare_hotpink.webp?v=2',scale:0.329,left:-25,walk:[[6,248,153,234,0,0],[165,249,156,233,1,0],[327,248,158,234,4,0],[491,249,161,233,3,0]],attack:[[658,208,168,274,12,0],[832,271,541,211,169,0],[1379,248,155,234,2,0]],hurt:[[1540,240,193,242,-19,0]]}},
 ruby:{scale:0.432,left:-37,sheet:'assets/rare_ruby.webp?v=2',walk:[[6,35,169,148,0,0],[181,35,157,148,1,0],[344,33,157,150,2,0],[507,32,149,151,-1,-1]],attack:[[662,6,192,177,-3,0],[860,31,373,152,208,0],[1239,34,151,149,-3,0]],hurt:[[1396,21,176,162,26,0]],evolved:{sheet:'assets/rare_ruby.webp?v=2',scale:0.35,left:-26,walk:[[6,237,151,220,1,0],[163,236,146,221,-3,0],[315,238,149,219,1,0],[470,238,150,219,2,0]],attack:[[626,189,184,268,8,0],[816,239,380,218,237,0],[1202,238,139,219,12,0]],hurt:[[1347,255,148,202,52,0]]}},
 hacienda:{scale:0.427,left:-43,sheet:'assets/rare_hacienda.webp?v=2',walk:[[6,69,203,150,0,0],[215,69,188,150,-31,0],[409,63,194,156,-31,0],[609,62,180,157,-45,-1]],attack:[[795,31,177,188,46,0],[978,6,180,213,41,0],[1164,81,353,138,146,0,0,1],[1523,69,182,150,-4,0]],hurt:[[1711,14,228,205,-29,0]],evolved:{sheet:'assets/rare_hacienda.webp?v=2',scale:0.358,left:-35,walk:[[6,299,197,215,0,0],[209,297,182,217,6,0],[397,300,180,214,-5,0],[583,296,172,218,4,0]],attack:[[761,239,151,275,18,0],[918,225,183,289,34,0],[1107,311,366,203,226,-1,0,1],[1479,303,187,211,9,0]],hurt:[[1672,244,218,270,39,0]]}},
 garnet:{scale:0.481,left:-38,sheet:'assets/garnet_1.webp?v=2',walk:[[6,70,158,162,0,0,0,1],[170,69,153,163,-3,0,0,1],[329,70,157,162,-1,0,0,1],[492,70,155,162,0,0,0,1]],attack:[[653,59,144,173,-10,0,0,1],[803,6,167,226,7,0,0,1],[976,77,245,155,86,0,0,1],[1227,72,156,160,9,0,0,1]],hurt:[[1389,47,160,185,-27,0,0,1]],evolved:{sheet:'assets/garnet_2.webp?v=2',scale:0.397,left:-28,walk:[[6,30,141,248,0,-1,0,1],[153,30,153,248,13,0,0,1],[312,34,135,244,3,0,0,1],[453,29,160,249,17,0,0,1]],attack:[[619,52,180,226,23,0,0,1],[805,32,189,246,34,0,0,1],[1000,72,217,206,38,-1,0,1],[1223,69,210,209,21,0,0,1]],hurt:[[1439,6,221,272,16,0,0,1]]}},
 prism:{scale:0.503,left:-36,sheet:'assets/prism_1.webp?v=2',walk:[[6,44,145,144,0,-1,0,1],[157,45,143,143,0,0,0,1],[306,41,141,147,-1,0,0,1],[453,44,143,144,-4,0,0,1]],attack:[[602,9,145,179,-4,0,0,1],[753,31,157,157,9,0,0,1],[916,6,299,182,114,-1,0,1],[1221,22,168,166,13,0,0,1]],hurt:[[1395,11,150,177,-7,0,0,1]],evolved:{sheet:'assets/prism_2.webp?v=2',scale:0.416,left:-29,walk:[[6,27,139,221,0,0,0,1],[151,29,134,219,-1,0,0,1],[291,26,124,222,13,0,0,1],[421,28,136,220,4,0,0,1]],attack:[[563,6,164,242,30,0,0,1],[733,44,143,204,-4,0,0,1],[882,22,329,226,174,0,0,1],[1217,41,165,207,41,0,0,1]],hurt:[[1388,24,230,224,12,0,0,1]]}},
 plum:{scale:0.497,left:-39,sheet:'assets/sr_plum.webp?v=2',walk:[[6,12,156,148,0,0],[168,12,157,148,1,0],[331,12,156,148,1,0],[493,12,156,148,0,0]],attack:[[655,10,150,150,-8,0],[811,20,179,140,36,0],[996,21,217,139,64,0],[1219,12,151,148,0,0]],hurt:[[1376,6,158,154,-13,0]],evolved:{sheet:'assets/sr_plum_2.webp?v=2',scale:0.487,left:-27,walk:[[6,7,118,196,0,0],[130,6,108,197,-2,0],[244,6,110,197,3,0],[360,6,111,197,1,0]],attack:[[477,6,133,197,23,0],[616,10,154,193,29,0],[776,12,205,191,103,0],[987,10,92,193,-3,-1]],hurt:[[1085,11,93,192,-3,0]]}},
 forest:{scale:0.497,left:-31,sheet:'assets/sr_forest.webp?v=2',walk:[[6,58,124,144,0,0],[136,60,120,142,2,0],[262,60,123,142,2,0],[391,59,123,143,-2,0]],attack:[[520,6,167,196,1,0],[693,53,182,149,3,0],[881,47,259,155,83,0],[1146,56,201,146,79,-1]],hurt:[[1353,52,141,150,0,-1]],evolved:{sheet:'assets/sr_forest_2.webp?v=2',scale:0.487,left:-25,walk:[[6,54,101,158,0,0],[113,54,104,158,5,0],[223,53,104,159,4,-1],[333,54,110,158,-2,0]],attack:[[449,28,103,184,-3,0],[558,6,127,206,-15,-1],[691,52,202,160,52,0],[899,59,115,153,19,0]],hurt:[[1020,51,89,161,-9,0]]}},
 canary:{scale:0.497,left:-36,sheet:'assets/sr_canary.webp?v=2',walk:[[6,46,145,134,0,0],[157,43,136,137,-10,0],[299,42,147,138,4,0],[452,41,145,139,2,0]],attack:[[603,46,161,134,17,0],[770,8,150,172,-3,0],[926,6,186,174,22,0],[1118,44,174,136,37,0]],hurt:[[1298,42,150,138,5,0]],evolved:{sheet:'assets/sr_canary_2.webp?v=2',scale:0.487,left:-23,walk:[[6,31,101,166,0,0],[113,32,103,165,6,0],[222,33,101,164,6,0],[329,32,100,165,7,0]],attack:[[435,16,108,181,16,0],[549,6,122,191,17,0],[677,25,321,172,92,0],[1004,38,106,159,13,0]],hurt:[[1116,36,103,161,2,0]]}},
 cherry:{scale:0.497,left:-35,sheet:'assets/sr_cherry.webp?v=2',walk:[[6,28,140,165,0,0],[152,27,144,166,-6,0],[302,27,143,166,-7,0],[451,27,140,166,2,0]],attack:[[597,28,141,165,4,0],[744,6,145,187,9,0],[895,26,199,167,52,0],[1100,27,201,166,50,0]],hurt:[[1307,42,149,151,0,0]],evolved:{sheet:'assets/sr_cherry_2.webp?v=2',scale:0.487,left:-22,walk:[[6,20,112,180,0,0],[124,22,109,178,9,0],[239,22,99,178,4,0],[344,20,100,180,1,0]],attack:[[450,6,104,194,5,0],[560,35,122,165,2,0],[688,21,194,179,81,0],[888,25,178,175,83,0]],hurt:[[1072,30,106,170,12,-1]]}},
 mauve:{scale:0.497,left:-34,sheet:'assets/sr_mauve.webp?v=3',walk:[[6,10,138,146,0,0],[150,10,130,146,-3,0],[286,10,132,146,-4,0],[424,10,131,146,-4,0]],attack:[[561,12,137,144,1,0],[704,10,170,146,35,0],[880,9,256,147,110,0],[1142,6,140,150,-1,0]],hurt:[[1288,12,140,144,5,0]],evolved:{sheet:'assets/sr_mauve_2.webp?v=3',scale:0.487,left:-23,walk:[[6,7,100,174,0,0],[112,7,102,174,0,0],[220,6,99,175,-2,0],[325,6,101,175,-1,0]],attack:[[432,7,117,174,17,0],[555,8,128,173,10,0],[689,11,258,170,143,0],[953,7,119,174,18,0]],hurt:[[1078,23,110,158,12,0]]}},
 khaki:{scale:0.497,left:-34,sheet:'assets/sr_khaki.webp?v=3',walk:[[6,6,138,144,0,0],[150,10,141,140,2,0],[297,8,144,142,1,0],[447,8,140,142,4,0]],attack:[[593,10,143,140,1,0],[742,9,142,141,1,0],[890,9,234,141,94,0],[1130,10,141,140,-2,0]],hurt:[[1277,8,158,142,-19,0]],evolved:{sheet:'assets/sr_khaki_2.webp?v=3',scale:0.487,left:-23,walk:[[6,9,100,177,0,0],[112,9,102,177,6,0],[220,9,93,177,-2,0],[319,9,105,177,6,0]],attack:[[430,10,130,176,34,0],[566,8,132,178,39,0],[704,11,176,175,83,0],[886,10,112,176,18,0]],hurt:[[1004,6,109,180,4,0]]}},
 tangerine:{scale:0.497,left:-32,sheet:'assets/sr_tangerine.webp?v=2',walk:[[6,9,130,157,0,0],[142,9,128,157,-2,0],[276,10,128,156,-4,0],[410,10,129,156,3,0]],attack:[[545,8,136,158,9,0],[687,9,141,157,19,0],[834,10,271,156,140,0],[1111,6,129,160,0,0]],hurt:[[1246,13,150,153,-3,0]],evolved:{sheet:'assets/sr_tangerine_2.webp?v=2',scale:0.487,left:-23,walk:[[6,7,100,189,0,0],[112,6,100,190,3,0],[218,7,97,189,1,0],[321,7,101,189,2,0]],attack:[[428,11,93,185,5,0],[527,12,97,184,-10,0],[630,7,245,189,137,0],[881,7,109,189,8,0]],hurt:[[996,11,94,185,-7,0]]}},
 burgundy:{scale:0.497,left:-31,sheet:'assets/sr_burgundy.webp?v=2',walk:[[6,36,125,154,0,0],[137,37,127,153,0,0],[270,36,123,154,-6,-1],[399,36,121,154,-5,0]],attack:[[526,36,191,154,60,0],[723,6,189,184,45,-1],[918,36,236,154,100,0],[1160,37,122,153,-5,-1]],hurt:[[1288,36,134,154,2,0]],evolved:{sheet:'assets/sr_burgundy_2.webp?v=2',scale:0.487,left:-26,walk:[[6,23,212,170,1,0],[224,25,93,168,-11,0],[323,26,110,167,-6,0],[439,28,118,165,1,0]],attack:[[563,25,110,168,9,0],[679,41,146,152,24,0],[831,28,222,165,57,-1],[1059,36,97,157,-8,0]],hurt:[[1162,6,105,187,3,0]]}},
 mustard:{scale:0.497,left:-34,sheet:'assets/sr_mustard.webp?v=2',walk:[[6,55,137,139,0,0],[149,54,134,140,-1,0],[289,52,131,142,-10,0],[426,55,138,139,-2,0]],attack:[[570,45,136,149,27,0],[712,6,140,188,10,0],[858,37,166,157,19,0],[1030,38,161,156,9,0]],hurt:[[1197,45,146,149,3,0]],evolved:{sheet:'assets/sr_mustard_2.webp?v=2',scale:0.487,left:-24,walk:[[6,58,106,164,0,0],[118,57,101,165,4,0],[225,59,103,163,2,0],[334,60,100,162,7,0]],attack:[[440,6,100,216,9,0],[546,46,125,176,25,0],[677,62,171,160,66,0],[854,60,123,162,16,-1]],hurt:[[983,46,94,176,-4,0]]}},
 sky:{scale:0.497,left:-33,sheet:'assets/sr_sky.webp?v=2',walk:[[6,25,134,140,0,0],[146,25,128,140,-7,0],[280,25,129,140,-7,0],[415,25,135,140,-9,0]],attack:[[556,6,126,159,-15,0],[688,22,157,143,21,0],[851,21,300,144,157,0],[1157,20,132,145,-8,0]],hurt:[[1295,20,163,145,-15,0]],evolved:{sheet:'assets/sr_sky_2.webp?v=2',scale:0.487,left:-26,walk:[[6,6,105,178,0,0],[117,8,104,176,-2,0],[227,8,108,176,-5,0],[341,10,104,174,-2,0]],attack:[[451,12,107,172,4,0],[564,8,134,176,13,0],[704,8,269,176,155,0],[979,8,106,176,0,0]],hurt:[[1091,8,96,176,-3,0]]}},
 denim:{scale:0.497,left:-36,sheet:'assets/sr_denim.webp?v=3',walk:[[6,18,144,166,0,0],[156,18,139,166,-4,0],[301,19,138,165,-6,0],[445,19,142,165,-5,0]],attack:[[593,6,146,178,-3,0],[745,15,141,169,3,0],[892,15,247,169,102,0],[1145,12,145,172,-5,0]],hurt:[[1296,10,167,174,-14,0]],evolved:{sheet:'assets/sr_denim_2.webp?v=3',scale:0.487,left:-23,walk:[[6,13,98,186,0,0],[110,11,95,188,-1,0],[211,11,89,188,-3,0],[306,12,96,187,1,0]],attack:[[408,6,106,193,-2,0],[520,21,127,178,11,-2],[653,24,209,175,108,0],[868,18,121,181,21,0]],hurt:[[995,13,86,186,-2,0]]}},
 charcoal:{scale:0.497,left:-36,sheet:'assets/sr_charcoal.webp?v=3',walk:[[6,14,144,127,0,0],[156,14,142,127,-1,0],[304,17,142,124,1,0],[452,13,146,128,4,0]],attack:[[604,6,146,135,1,0],[756,10,140,131,0,0],[902,15,264,126,120,0],[1172,14,143,127,-2,0]],hurt:[[1321,17,152,124,-1,0]],evolved:{sheet:'assets/sr_charcoal_2.webp?v=3',scale:0.487,left:-24,walk:[[6,15,108,178,0,-1],[120,16,102,177,-1,0],[228,16,98,177,-4,0],[332,16,101,177,-2,0]],attack:[[439,6,107,187,5,0],[552,16,158,177,15,0],[716,16,199,177,89,0],[921,15,113,178,10,0]],hurt:[[1040,11,99,182,-3,0]]}},
 cornflower:{scale:0.457,left:-35,sheet:'assets/prof_cornflower.webp?v=2',walk:[[6,21,155,153,1,0],[167,20,152,154,-1,0],[325,21,152,153,-3,0],[483,20,153,154,2,0]],attack:[[642,7,164,167,14,0],[812,20,158,154,19,0],[976,21,214,153,75,0],[1196,20,150,154,-4,0]],hurt:[[1352,6,161,168,-6,0]],evolved:{sheet:'assets/prof_cornflower_2.webp?v=2',scale:0.485,left:-27,walk:[[6,7,116,170,0,0],[128,6,107,171,-12,0],[241,8,114,169,-7,0],[361,11,116,166,2,0]],attack:[[483,13,106,164,-5,0],[595,14,103,163,-2,0],[704,18,184,159,68,0],[894,11,96,166,-12,0]],hurt:[[996,9,117,168,4,0]]}},
 bittersweet:{scale:0.457,left:-34,sheet:'assets/prof_bittersweet.webp?v=3',walk:[[6,29,150,161,0,0],[162,28,151,162,3,0],[319,27,147,163,6,0],[472,27,154,163,9,0]],attack:[[632,6,145,184,-13,0],[783,31,157,159,18,0],[946,22,261,168,110,0],[1213,30,147,160,-1,0]],hurt:[[1366,41,153,149,3,0]],evolved:{sheet:'assets/prof_bittersweet_2.webp?v=3',scale:0.485,left:-32,walk:[[6,14,131,185,0,0],[143,14,97,185,-30,0],[246,14,97,185,-29,0],[349,14,93,185,-27,0]],attack:[[448,9,116,190,-23,0],[570,9,107,190,-22,0],[683,6,245,193,110,0],[934,19,101,180,-24,0]],hurt:[[1041,31,120,168,-13,-1]]}},
 claret:{scale:0.457,left:-36,sheet:'assets/prof_claret.webp?v=2',walk:[[6,28,162,154,0,0],[174,27,161,155,-4,0],[341,27,162,155,-11,0],[509,27,162,155,-2,0]],attack:[[677,24,145,158,-19,0],[828,6,152,176,-5,0],[986,31,259,151,104,0],[1251,27,130,155,-25,0]],hurt:[[1387,12,143,170,-20,0]],evolved:{sheet:'assets/prof_claret_2.webp?v=2',scale:0.485,left:-29,walk:[[6,37,126,156,0,0],[138,38,101,155,-18,0],[245,39,120,154,4,0],[371,38,118,155,0,0]],attack:[[495,20,103,173,-13,0],[604,6,113,187,-3,0],[723,11,189,182,64,0],[918,45,156,148,36,0]],hurt:[[1080,27,115,166,-11,0]]}},
 verdigris:{scale:0.457,left:-31,sheet:'assets/prof_verdigris.webp?v=2',walk:[[6,25,137,173,0,0],[149,26,144,172,-5,0],[299,27,133,171,-9,0],[438,23,133,175,4,0]],attack:[[577,19,150,179,3,0],[733,24,151,174,-2,0],[890,6,240,192,117,-1],[1136,26,167,172,31,0]],hurt:[[1309,35,134,163,-4,0]],evolved:{sheet:'assets/prof_verdigris_2.webp?v=2',scale:0.485,left:-25,walk:[[6,19,114,192,1,0],[126,21,104,190,-5,0],[236,19,109,192,-1,0],[351,18,111,193,0,-1]],attack:[[468,6,122,205,3,0],[596,28,146,183,10,0],[748,28,177,183,65,0],[931,24,111,187,-1,0]],hurt:[[1048,23,109,188,-5,0]]}},
 lapis:{scale:0.876,left:-38,sheet:'assets/ex_lapis.webp?v=2',walk:[[6,45,89,89,2,0],[101,45,90,89,1,0],[197,45,87,89,-2,0],[290,45,86,89,-2,0]],attack:[[382,30,98,104,-3,0],[486,29,102,105,5,0],[594,49,125,85,18,0],[725,47,120,87,18,0],[851,6,114,128,29,-1]],hurt:[[971,38,123,96,25,0]],evolved:{sheet:'assets/ex_lapis_2.webp?v=2',scale:1.143,left:-36,walk:[[6,41,63,92,0,0],[75,42,62,91,-2,0],[143,41,62,92,-8,0],[211,40,63,93,-2,0]],attack:[[280,29,65,104,-1,0],[351,27,68,106,5,0],[425,46,93,87,27,0],[524,44,91,89,17,0],[621,6,93,127,18,0]],hurt:[[720,42,91,91,7,0]]}},
 selenite:{scale:0.876,left:-41,sheet:'assets/ex_selenite.webp?v=2',walk:[[6,42,94,92,0,0],[106,44,93,90,-4,0],[205,42,93,92,-2,0],[304,43,91,91,-4,0]],attack:[[401,47,99,87,0,0],[506,6,201,128,108,0],[713,31,164,103,60,-1],[883,44,99,90,2,0]],hurt:[[988,30,89,104,-4,0]],evolved:{sheet:'assets/ex_selenite_2.webp?v=2',scale:1.143,left:-37,walk:[[6,33,64,74,0,0],[76,33,61,74,-4,0],[143,33,61,74,-4,0],[210,33,64,74,-2,0]],attack:[[280,11,65,96,3,0],[351,6,75,101,15,0],[432,33,109,74,46,0],[547,26,123,81,54,0],[676,34,62,73,0,0]],hurt:[[744,46,65,61,-5,0]]}},
 ribbonorange:{scale:0.78,left:-30,sheet:'assets/ex_ribbonorange.webp?v=1',walk:[[6,17,77,107,0,0],[89,17,78,107,1,0],[173,18,78,106,1,0],[257,17,79,107,2,0]],attack:[[342,12,96,112,19,0],[444,6,93,118,16,0],[543,18,168,106,91,0],[717,17,79,107,2,0]],hurt:[[802,10,98,114,21,0]],evolved:{sheet:'assets/ex_ribbonorange_2.webp?v=1',scale:0.9,left:-32,walk:[[6,15,71,107,0,0],[83,15,71,107,0,0],[160,15,66,107,-5,0],[232,15,68,107,-3,0]],attack:[[306,16,76,106,5,0],[388,11,74,111,3,0],[468,18,168,104,97,0],[642,15,66,107,-5,0]],hurt:[[714,6,85,116,14,0]]}},
 topaz:{scale:0.876,left:-36,sheet:'assets/ex_topaz.webp?v=2',walk:[[6,6,82,87,0,0],[94,7,78,86,-3,0],[178,6,80,87,-1,0],[264,6,77,87,-4,0]],attack:[[347,6,88,87,11,0],[441,6,99,87,19,0],[546,7,147,86,60,0],[699,6,81,87,0,0]],hurt:[[786,10,83,83,7,0]],evolved:{sheet:'assets/ex_topaz_2.webp?v=2',scale:1.143,left:-34,walk:[[6,8,59,84,0,0],[71,8,57,84,0,0],[134,7,55,85,-3,0],[195,7,56,85,-1,0]],attack:[[257,7,65,85,7,0],[328,6,66,86,9,0],[400,8,101,84,44,0],[507,8,113,84,54,0],[626,6,67,86,11,0]],hurt:[[699,10,61,82,4,0]]}},
 rainbow:{scale:0.677,left:-47,sheet:'assets/s2_rainbow.webp?v=2',walk:[[6,44,139,124,0,0],[151,44,139,124,4,0],[296,44,139,124,1,0],[441,43,140,125,-2,-1]],attack:[[587,29,146,139,-6,0],[739,6,149,162,12,0],[894,23,232,145,94,0],[1132,46,139,122,-1,0]],hurt:[[1277,31,144,137,0,0]],evolved:{sheet:'assets/s2_rainbow_2.webp?v=2',scale:0.743,left:-37,walk:[[6,27,102,140,2,0],[114,25,101,142,4,0],[221,26,104,141,4,0],[331,28,106,139,5,0]],attack:[[443,11,140,156,10,0],[589,6,118,161,12,0],[713,22,242,145,138,0],[961,27,108,140,9,0]],hurt:[[1075,15,107,152,3,0]]}},
 cobalt:{scale:0.618,left:-45,sheet:'assets/s2_cobalt.webp?v=2',walk:[[6,32,146,136,0,0],[158,35,141,133,-8,0],[305,33,142,135,-4,0],[453,34,144,134,4,0]],attack:[[603,9,146,159,1,0],[755,7,190,161,35,0],[951,6,219,162,79,0],[1176,38,146,130,1,0]],hurt:[[1328,16,140,152,-6,0]],evolved:{sheet:'assets/s2_cobalt_2.webp?v=2',scale:0.738,left:-39,walk:[[6,45,106,142,0,0],[118,46,104,141,5,0],[228,46,105,141,0,0],[339,46,102,141,-3,0]],attack:[[447,27,119,160,17,0],[572,6,105,181,2,0],[683,34,181,153,76,0],[870,57,84,130,-16,0]],hurt:[[960,20,113,167,13,0]]}},
 flame:{scale:0.525,left:-40,sheet:'assets/s2_flame.webp?v=2',walk:[[6,35,154,161,0,0],[166,36,147,160,-5,0],[319,36,147,160,-1,0],[472,37,146,159,-4,0]],attack:[[624,8,132,188,-4,0],[762,6,136,190,11,0],[904,46,264,150,131,0],[1174,37,144,159,-9,-1]],hurt:[[1324,44,165,152,3,0]],evolved:{sheet:'assets/s2_flame_2.webp?v=2',scale:0.619,left:-33,walk:[[6,41,112,168,2,0],[124,40,108,169,-1,0],[238,40,111,169,1,0],[355,40,111,169,-2,0]],attack:[[472,6,115,203,2,0],[593,29,142,180,35,0],[741,39,284,170,172,0],[1031,39,115,170,3,0]],hurt:[[1152,55,128,154,16,0]]}},
 scarlet:{scale:0.672,left:-49,sheet:'assets/s2_scarlet.webp?v=2',walk:[[6,47,147,125,0,0],[159,47,145,125,-2,0],[310,47,145,125,-2,0],[461,47,145,125,-2,0]],attack:[[612,7,124,165,-18,0],[742,6,126,166,-16,0],[874,32,232,140,86,0],[1112,47,140,125,-5,0]],hurt:[[1258,23,140,149,-5,0]],evolved:{sheet:'assets/s2_scarlet_2.webp?v=2',scale:0.707,left:-36,walk:[[6,26,103,147,0,0],[115,26,107,147,-1,0],[228,26,101,147,0,0],[335,26,112,147,0,0]],attack:[[453,6,96,167,-12,-1],[555,8,106,165,2,0],[667,22,218,151,100,0],[891,26,116,147,11,0]],hurt:[[1013,14,101,159,2,0]]}},
 moss:{scale:0.575,left:-41,sheet:'assets/s2_moss.webp?v=2',walk:[[6,17,145,146,0,0],[157,16,141,147,-3,0],[304,17,138,146,-5,0],[448,17,140,146,-1,0]],attack:[[594,11,147,152,5,0],[747,14,172,149,26,0],[925,18,245,145,101,0],[1176,17,140,146,-3,0]],hurt:[[1322,6,136,157,-2,0]],evolved:{sheet:'assets/s2_moss_2.webp?v=2',scale:0.684,left:-35,walk:[[6,14,108,152,0,0],[120,16,108,150,-1,0],[234,16,107,150,0,0],[347,13,112,153,2,0]],attack:[[465,6,111,160,2,0],[582,17,114,149,14,0],[702,15,145,151,38,0],[853,14,118,152,11,0]],hurt:[[977,19,111,147,12,0]]}},
 coral:{scale:0.667,left:-47,sheet:'assets/s2_coral.webp?v=2',walk:[[6,30,141,126,0,0],[153,33,143,123,-2,0],[302,30,139,126,-3,0],[447,31,138,125,-1,0]],attack:[[591,12,147,144,10,0],[744,6,151,150,25,0],[901,20,235,136,106,0],[1142,33,157,123,17,0]],hurt:[[1305,7,162,149,7,0]],evolved:{sheet:'assets/s2_coral_2.webp?v=2',scale:0.832,left:-38,walk:[[6,20,92,125,0,0],[104,19,93,126,-2,0],[203,20,92,125,1,0],[301,19,94,126,-1,0]],attack:[[401,18,102,127,16,0],[509,6,93,139,8,0],[608,8,169,137,74,0],[783,20,94,125,1,0]],hurt:[[883,24,145,121,49,0]]}},
 aqua:{scale:0.672,left:-42,sheet:'assets/s2_aqua.webp?v=2',walk:[[6,28,127,125,0,0],[139,28,130,125,3,0],[275,24,131,129,-4,0],[412,28,132,125,6,0]],attack:[[550,10,127,143,13,0],[683,6,139,147,12,0],[828,31,272,122,150,0],[1106,29,130,124,7,0]],hurt:[[1242,13,145,140,16,0]],evolved:{sheet:'assets/s2_aqua_2.webp?v=2',scale:0.689,left:-31,walk:[[6,19,91,151,0,0],[103,20,94,150,1,0],[203,19,89,151,0,0],[298,20,90,150,1,0]],attack:[[394,12,98,158,24,0],[498,6,94,164,12,0],[598,21,213,149,127,0],[817,20,90,150,5,0]],hurt:[[913,11,112,159,22,0]]}},
 cooper:{scale:0.545,left:-43,sheet:'assets/s2_cooper.webp?v=2',walk:[[6,69,157,154,0,0],[169,66,154,157,1,0],[329,67,156,156,-2,0],[491,65,157,158,-13,0]],attack:[[654,31,121,192,2,0],[781,6,133,217,12,0],[920,49,227,174,88,0],[1153,63,119,160,-6,0]],hurt:[[1278,60,165,163,-9,0]],evolved:{sheet:'assets/s2_cooper_2.webp?v=2',scale:0.638,left:-32,walk:[[6,72,103,163,0,0],[115,72,91,163,-3,0],[212,73,93,162,-2,0],[311,73,102,162,1,0]],attack:[[419,26,98,209,11,0],[523,6,93,229,8,0],[622,90,162,145,65,-4],[790,96,104,139,5,0]],hurt:[[900,71,112,164,6,0]]}},
 navy:{scale:0.571,left:-40,sheet:'assets/s2_navy.webp?v=2',walk:[[6,23,139,147,0,0],[151,23,138,147,-6,0],[295,24,133,146,-6,0],[434,23,140,147,-1,0]],attack:[[580,23,152,147,0,0],[738,6,124,164,-22,0],[868,32,230,138,107,0],[1104,31,141,139,8,0]],hurt:[[1251,16,139,154,6,0]],evolved:{sheet:'assets/s2_navy_2.webp?v=2',scale:0.581,left:-33,walk:[[6,33,114,179,0,0],[126,34,113,178,-1,0],[245,30,113,182,-3,0],[364,34,100,178,-16,0]],attack:[[470,6,106,206,-12,0],[582,24,106,188,-11,0],[694,40,227,172,117,0],[927,40,105,172,-7,0]],hurt:[[1038,27,127,185,9,0]]}},
 dandelion:{scale:0.656,left:-51,sheet:'assets/s2_dandelion.webp?v=2',walk:[[6,31,160,128,0,0],[172,31,149,128,-12,0],[327,31,147,128,-14,0],[480,31,144,128,-14,0]],attack:[[630,11,152,148,-9,0],[788,19,162,140,2,0],[956,16,265,143,107,0],[1227,32,171,127,9,0]],hurt:[[1404,6,146,153,-12,0]],evolved:{sheet:'assets/s2_dandelion_2.webp?v=2',scale:0.743,left:-36,walk:[[6,20,99,140,0,0],[111,22,94,138,-3,0],[211,23,99,137,-2,0],[316,23,93,137,-8,0]],attack:[[415,18,100,142,-3,0],[521,26,117,134,15,0],[644,18,277,142,132,0],[927,25,88,135,-10,0]],hurt:[[1021,6,100,154,-9,0]]}},
 babyblue:{scale:0.583,left:-39,sheet:'assets/s2_babyblue.webp?v=2',walk:[[6,15,133,144,0,0],[145,16,135,143,5,0],[286,15,134,144,-1,0],[426,17,132,142,-3,0]],attack:[[564,15,133,144,1,0],[703,13,140,146,3,0],[849,20,269,139,111,-1],[1124,16,174,143,43,0]],hurt:[[1304,6,137,153,6,0]],evolved:{sheet:'assets/s2_babyblue_2.webp?v=2',scale:0.658,left:-32,walk:[[6,22,96,158,0,0],[108,22,95,158,0,0],[209,21,103,159,4,0],[318,20,97,160,4,0]],attack:[[421,19,113,161,17,0],[540,23,106,157,11,0],[652,22,225,158,105,0],[883,22,133,158,44,0]],hurt:[[1022,6,107,174,14,0]]}},
 mintcyan:{scale:0.683,left:-46,sheet:'assets/s2_mintcyan.webp?v=2',walk:[[6,38,136,123,0,0],[148,37,129,124,-7,0],[283,38,128,123,-7,0],[417,37,130,124,-9,0]],attack:[[553,37,129,124,-5,0],[688,6,153,155,18,0],[847,38,257,123,127,0],[1110,27,149,134,14,0]],hurt:[[1265,20,137,141,-3,0]],evolved:{sheet:'assets/s2_mintcyan_2.webp?v=2',scale:0.732,left:-40,walk:[[6,38,110,143,0,0],[122,39,102,142,-1,0],[230,39,97,142,-3,0],[333,38,98,143,-6,0]],attack:[[437,6,92,175,-13,0],[535,7,98,174,-1,0],[639,37,220,144,114,0],[865,26,130,155,24,0]],hurt:[[1001,24,143,157,43,-1]]}},
 peach:{scale:0.694,left:-50,sheet:'assets/s2_peach.webp?v=2',walk:[[6,39,143,123,0,-2],[155,39,141,123,-5,0],[302,41,142,121,-1,0],[450,38,142,124,-3,0]],attack:[[598,6,133,156,2,0],[737,13,126,149,-2,0],[869,30,219,132,94,-1],[1094,36,133,126,-8,0]],hurt:[[1233,22,136,140,-20,0]],evolved:{sheet:'assets/s2_peach_2.webp?v=2',scale:0.788,left:-39,walk:[[6,31,98,132,0,0],[110,32,98,131,3,0],[214,31,99,132,3,0],[319,31,102,132,3,0]],attack:[[427,6,144,157,19,0],[577,19,108,144,25,0],[691,29,213,134,128,0],[910,32,95,131,-4,0]],hurt:[[1011,23,104,140,1,0]]}},
 lightcream:{scale:0.56,left:-41,sheet:'assets/s2_lightcream.webp?v=2',walk:[[6,14,145,150,0,0],[157,14,148,150,-1,0],[311,14,147,150,1,0],[464,14,146,150,1,0]],attack:[[616,6,138,158,0,0],[760,16,150,148,4,0],[916,19,208,145,65,0],[1130,17,153,147,9,0]],hurt:[[1289,11,148,153,2,0]],evolved:{sheet:'assets/s2_lightcream_2.webp?v=2',scale:0.65,left:-33,walk:[[6,8,103,160,0,0],[115,8,104,160,1,0],[225,9,102,159,3,0],[333,8,102,160,-1,0]],attack:[[441,6,101,162,8,0],[548,7,99,161,4,0],[653,13,193,155,94,0],[852,7,112,161,18,0]],hurt:[[970,6,105,162,2,0]]}},
 midnight:{scale:0.596,left:-37,sheet:'assets/s2_midnight.webp?v=2',walk:[[6,41,125,141,1,0],[137,41,123,141,-4,0],[266,38,123,144,2,0],[395,40,123,142,-3,0]],attack:[[524,18,159,164,17,0],[689,7,177,175,25,0],[872,6,233,176,114,0],[1111,43,123,139,1,0]],hurt:[[1240,18,134,164,2,0]],evolved:{sheet:'assets/s2_midnight_2.webp?v=2',scale:0.612,left:-31,walk:[[6,31,100,170,0,0],[112,31,100,170,-1,-1],[218,31,102,170,0,-1],[326,32,94,169,-2,0]],attack:[[426,6,109,195,9,0],[541,22,102,179,3,0],[649,28,209,173,110,0],[864,37,96,164,0,0]],hurt:[[966,21,106,180,4,0]]}},
 darklilac:{scale:0.609,left:-39,sheet:'assets/s2_darklilac.webp?v=2',walk:[[6,33,129,138,0,0],[141,33,134,138,-3,0],[281,33,134,138,-7,0],[421,33,135,138,5,0]],attack:[[562,25,147,146,27,0],[715,6,130,165,15,0],[851,19,219,152,97,-1],[1076,42,136,129,5,0]],hurt:[[1218,20,131,151,5,0]],evolved:{sheet:'assets/s2_darklilac_2.webp?v=2',scale:0.689,left:-31,walk:[[6,19,90,151,0,0],[102,18,87,152,-1,0],[195,19,82,151,-6,0],[283,19,83,151,-3,0]],attack:[[372,13,113,157,16,0],[491,13,159,157,47,0],[656,6,163,164,46,0],[825,25,117,145,40,0]],hurt:[[948,14,92,156,7,0]]}},
 fusioncream:{scale:0.6,left:-41,sheet:'assets/s2_fusioncream.webp?v=2',walk:[[6,25,136,140,0,0],[148,28,137,137,-5,0],[291,25,135,140,-3,0],[432,27,135,138,-1,0]],attack:[[573,9,148,156,7,0],[727,6,161,159,26,0],[894,8,238,157,103,-1],[1138,28,146,137,9,0]],hurt:[[1290,11,141,154,-4,0]],evolved:{sheet:'assets/s2_fusioncream_2.webp?v=2',scale:0.662,left:-33,walk:[[6,31,102,157,0,0],[114,31,98,157,1,0],[218,31,101,157,-10,0],[325,31,98,157,1,0]],attack:[[429,6,105,182,7,-1],[540,20,128,168,23,0],[674,28,189,160,81,0],[869,30,106,158,9,-1]],hurt:[[981,18,104,170,10,0]]}},
 silver:{scale:0.632,left:-53,sheet:'assets/s2_silver.webp?v=2',walk:[[6,45,168,133,0,0],[180,46,161,132,-8,0],[347,46,162,132,-8,0],[515,46,170,132,3,0]],attack:[[691,20,136,158,-34,0],[833,6,165,172,-4,0],[1004,23,274,155,93,0],[1284,45,172,133,2,0]],hurt:[[1462,19,186,159,6,0]],evolved:{sheet:'assets/s2_silver_2.webp?v=2',scale:0.707,left:-39,walk:[[6,46,110,147,0,0],[122,48,102,145,-8,0],[230,47,103,146,-9,0],[339,51,107,142,-5,-1]],attack:[[452,6,93,187,-16,0],[551,25,106,168,-8,0],[663,27,158,166,42,0],[827,47,99,146,-7,0]],hurt:[[932,27,104,166,1,-1]]}},
 lava:{scale:0.613,left:-43,sheet:'assets/s2_lava.webp?v=2',walk:[[6,23,141,137,0,0],[153,24,140,136,0,0],[299,22,139,138,-1,0],[444,28,140,132,4,0]],attack:[[590,7,150,153,9,0],[746,6,129,154,-12,0],[881,20,217,140,85,0],[1104,32,143,128,3,0]],hurt:[[1253,8,148,152,-3,0]],evolved:{sheet:'assets/s2_lava_2.webp?v=2',scale:0.788,left:-44,walk:[[6,31,113,132,1,0],[125,35,109,128,-11,0],[240,33,103,130,-4,0],[349,33,87,130,-26,-1]],attack:[[442,6,92,157,-18,0],[540,27,102,136,-7,0],[648,35,191,128,81,0],[845,36,107,127,-2,0]],hurt:[[958,14,113,149,0,0]]}},
 babypink:{scale:0.667,left:-47,sheet:'assets/s2_babypink.webp?v=2',walk:[[6,38,143,126,1,0],[155,40,141,124,-3,0],[302,38,147,126,1,0],[455,39,143,125,-5,0]],attack:[[604,17,130,147,-4,0],[740,6,155,158,-2,0],[901,33,208,131,85,0],[1115,41,141,123,-5,0]],hurt:[[1262,32,122,132,-21,0]],evolved:{sheet:'assets/s2_babypink_2.webp?v=2',scale:0.77,left:-38,walk:[[6,27,105,135,1,0],[117,27,106,135,7,0],[229,32,100,130,-1,0],[335,27,97,135,0,0]],attack:[[438,18,91,144,0,-1],[535,6,105,156,26,0],[646,13,183,149,90,0],[835,30,134,132,24,0]],hurt:[[975,13,97,149,11,0]]}},
 magenta:{scale:0.627,left:-38,sheet:'assets/s2_magenta.webp?v=2',walk:[[6,25,120,134,0,0],[132,25,123,134,5,0],[261,25,121,134,2,0],[388,24,124,135,3,-1]],attack:[[518,16,139,143,8,0],[663,6,127,153,3,0],[796,28,198,131,88,0],[1000,27,144,132,33,0]],hurt:[[1150,16,132,143,13,0]],evolved:{sheet:'assets/s2_magenta_2.webp?v=2',scale:0.754,left:-35,walk:[[6,24,94,138,0,0],[106,24,90,138,-5,0],[202,24,93,138,-3,0],[301,25,90,137,-5,0]],attack:[[397,6,107,156,16,0],[510,27,142,135,42,0],[658,27,229,135,133,0],[893,26,105,136,10,0]],hurt:[[1004,11,92,151,2,0]]}},
 maple:{scale:0.816,left:-43,sheet:'assets/b3_maple.webp?v=2',walk:[[6,37,106,104,1,-1],[118,36,106,105,0,0],[230,36,104,105,-3,0],[340,36,108,105,3,0]],attack:[[454,6,108,135,-21,0],[568,7,115,134,-20,0],[689,38,152,103,44,0],[847,36,112,105,3,0]],hurt:[[965,36,112,105,6,0]],evolved:{sheet:'assets/b3_maple_2.webp?v=2',scale:0.954,left:-40,walk:[[6,34,83,109,0,0],[95,33,84,110,0,0],[185,34,83,109,0,0],[274,34,84,109,1,0]],attack:[[364,6,91,137,-15,0],[461,14,86,129,-16,0],[553,45,136,98,33,0],[695,34,85,109,4,0]],hurt:[[786,34,84,109,1,0]]}},
 brick:{scale:0.613,left:-42,sheet:'assets/b3_brick.webp?v=2',walk:[[6,23,138,137,0,0],[150,24,138,136,2,0],[294,23,138,137,1,0],[438,21,136,139,3,0]],attack:[[580,31,139,129,3,0],[725,20,154,140,18,0],[885,24,196,136,66,0],[1087,21,138,139,4,0]],hurt:[[1231,6,139,154,6,0]],evolved:{sheet:'assets/b3_brick_2.webp?v=2',scale:0.972,left:-40,walk:[[6,13,83,108,0,0],[95,14,78,107,-4,0],[179,15,79,106,-4,0],[264,15,78,106,-3,0]],attack:[[348,6,89,115,6,0],[443,30,88,91,-1,0],[537,20,122,101,35,0],[665,15,120,106,34,0]],hurt:[[791,6,83,115,2,0]]}},
 korn:{scale:0.56,left:-34,sheet:'assets/b3_korn.webp?v=2',walk:[[6,11,123,150,0,0],[135,14,124,147,-5,0],[265,13,121,148,-10,0],[392,14,123,147,-7,0]],attack:[[521,6,120,155,-2,0],[647,18,121,143,3,0],[774,14,278,147,161,0],[1058,15,118,146,-7,0]],hurt:[[1182,7,130,154,3,0]],evolved:{sheet:'assets/b3_korn_2.webp?v=2',scale:0.839,left:-32,walk:[[6,26,77,124,0,0],[89,28,81,122,2,0],[176,28,77,122,1,-1],[259,29,85,121,6,0]],attack:[[350,6,84,144,6,0],[440,31,102,119,10,0],[548,26,168,124,90,0],[722,26,78,124,2,0]],hurt:[[806,17,85,133,7,0]]}},
 teal:{scale:0.618,left:-43,sheet:'assets/b3_teal.webp?v=2',walk:[[6,38,138,136,0,0],[150,40,132,134,-6,0],[288,38,130,136,-7,0],[424,39,135,135,-3,0]],attack:[[565,38,144,136,6,0],[715,14,152,160,3,0],[873,34,252,140,113,0],[1131,38,135,136,-1,0]],hurt:[[1272,6,138,168,-2,0]],evolved:{sheet:'assets/b3_teal_2.webp?v=2',scale:0.867,left:-42,walk:[[6,38,97,120,0,0],[109,36,92,122,-7,0],[207,35,92,123,0,0],[305,36,94,122,-2,0]],attack:[[405,6,99,152,4,0],[510,34,103,124,7,0],[619,33,160,125,67,0],[785,35,102,123,7,0]],hurt:[[893,17,96,141,6,0]]}},
 violet:{scale:0.683,left:-45,sheet:'assets/b3_violet.webp?v=2',walk:[[6,33,133,123,0,0],[145,33,128,123,-6,0],[279,32,125,124,-10,0],[410,31,128,125,-9,-1]],attack:[[544,6,155,150,-5,0],[705,6,155,150,20,0],[866,24,219,132,84,0],[1091,32,130,124,-5,0]],hurt:[[1227,24,134,132,0,0]],evolved:{sheet:'assets/b3_violet_2.webp?v=2',scale:0.765,left:-40,walk:[[6,40,105,136,1,0],[117,40,104,136,3,0],[227,39,102,137,-2,0],[335,39,104,137,1,0]],attack:[[445,9,112,167,3,0],[563,6,139,170,37,0],[708,18,217,158,111,0],[931,39,99,137,-4,0]],hurt:[[1036,25,111,151,6,0]]}},
 orchid:{scale:0.535,left:-37,sheet:'assets/b3_orchid.webp?v=2',walk:[[6,70,141,157,0,0],[153,70,138,157,4,0],[297,71,138,156,1,0],[441,70,135,157,-1,0]],attack:[[582,33,150,194,7,0],[738,6,159,221,13,0],[903,71,245,156,105,0],[1154,70,138,157,0,0]],hurt:[[1298,77,138,150,5,0]],evolved:{sheet:'assets/b3_orchid_2.webp?v=2',scale:0.881,left:-39,walk:[[6,77,91,118,1,0],[103,77,84,118,-5,0],[193,77,87,118,-5,0],[286,77,89,118,-4,0]],attack:[[381,23,87,172,-8,-1],[474,6,90,189,-5,0],[570,76,215,119,123,0],[791,75,85,120,-7,0]],hurt:[[882,96,92,99,7,0]]}},
 guys:{scale:1,left:0,walk:[[30,40,43,32],[90,40,42,32],[150,40,43,32],[210,40,43,32],[270,40,43,32]],attack:[[30,100,43,32],[90,100,48,32],[150,100,51,32],[210,100,54,32],[270,87,63,45],[30,147,64,45],[100,154,56,38],[160,154,56,38],[220,161,43,31]],hurt:[[33,221,41,31]]},
 hippo:{scale:.9,left:-26,walk:[[1,24,105,78],[113,24,105,78],[226,24,104,78]],attack:[[337,4,99,98],[1,104,99,101],[113,118,110,87],[225,140,109,65],[338,127,104,78]]},
 metalhippo:{sheet:'assets/metal_hippo_sheet.png',scale:.9,left:-26,walk:[[1,24,105,78],[113,24,105,78],[226,24,104,78]],attack:[[337,4,99,98],[1,104,99,101],[113,118,110,87],[225,140,109,65],[338,127,104,78]]}
};
// The first column is locomotion; the second is windup; the third is impact/recovery.
// Keep the body anchored and show impact at the same 14f threshold as damage.
function animatePigge(u){
 let frame,state;
 if(u.hurtTime>0){state='hurt';frame=[368,72,103,65]}
 else if(u.attackTime>0){
  state='attack';const f=(data.units[u.type].attackDuration-u.attackTime)*30;
  frame=f<5?[115,5,104,73]:f<10?[112,80,109,76]:f<14?[115,158,104,75]:f<17?[225,1,126,104]:f<22?[225,107,126,67]:[225,177,126,67];
 }else{
  const rng=data.units[u.type].range,t=target(u),stationary=(t&&Math.abs(t.x-u.x)<=rng)||(!t&&data.bases.ally.frontX-u.x<=rng);
  state=stationary?'idle':'walk';frame=[[4,1,103,77],[4,79,103,76],[4,157,103,76]][stationary?0:Math.floor(u.animTime/.16)%3];
 }
 const [x,y,w,h]=frame,el=u.el.querySelector('.dog-sprite');el.style.backgroundPosition=`-${x}px -${y}px`;el.style.width=w+'px';el.style.height=h+'px';el.style.left='-20px';el.style.transform='scale(.8)';el.style.transformOrigin='left bottom';el.style.filter='none';u.el.dataset.animation=state;
 const crown=u.el.querySelector('.pigge-crown');
 if(crown){const [cx,cy]=PIGGE_CROWN[`${x},${y}`]||[42,-21];crown.style.left=(-20+cx*.8)+'px';crown.style.bottom=((h-cy-37)*.8)+'px';crown.style.transform='scale(.8)'}
}
// Crown top-left (frame px) per Pigge frame: matched to the wiki render (E_048.png) on the idle frame
// (jewel centre over the ears, above the head), then carried to each frame by the snout offset.
const PIGGE_CROWN={'4,1':[42,-21],'4,79':[42,-20],'4,157':[42,-20],'115,5':[42,-22],'112,80':[47,-15],'115,158':[42,-21],'225,1':[54,15],'225,107':[54,-22],'225,177':[54,-21],'368,72':[42,-23]};
// Enemies whose identity is grey armour: brightening would erase it (see also .damage-flash in style.css).
const GLOW_FLASH=new Set(['metalhippo']);
function animateAtlas(u){
 const baseAtlas=NEW_ATLASES[u.type];
 const atlas=(u.stats?.evolved&&baseAtlas.evolved)?baseAtlas.evolved:baseAtlas;
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 // Gory's raised-fists sprite is its actual hitback pose; Peng uses an upright pose.
 const visualState=state==='hurt'&&u.type==='gory'?'attack':state==='hurt'&&(['peng'].includes(u.type)||!atlas.hurt)?'walk':state;
 const frames=atlas[visualState];
 const duration=data.units[u.type].attackDuration||.56;
 let index=visualState==='attack'?Math.min(frames.length-1,Math.max(0,Math.floor((duration-u.attackTime)/duration*frames.length))):visualState==='walk'?Math.floor(u.animTime/(atlas.walkStep??baseAtlas.walkStep??.14))%frames.length:0;
 if(visualState==='attack'&&u.type==='peng'){
  // Play all seven attack drawings across the complete animation. Damage still lands at windup.
  const elapsed=Math.max(0,duration-u.attackTime);
  index=Math.min(frames.length-1,Math.floor(elapsed/duration*frames.length));
 }else if(visualState==='attack'&&data.units[u.type].windup){const elapsed=duration-u.attackTime,windup=data.units[u.type].windup,strike={gory:2,baa:2,seal:4,croco:3,rabbit:3,squirrel:2,mooth:3,rhino:2,nyandam:3,...RARE_STRIKE}[u.type];if(strike!==undefined)index=elapsed<windup?Math.min(strike-1,Math.floor(elapsed/windup*strike)):Math.min(frames.length-1,strike+Math.floor((elapsed-windup)/Math.max(.01,duration-windup)*(frames.length-strike)));}
 if(visualState==='attack'&&data.units[u.type].hits){const elapsed=duration-u.attackTime;index=Math.min(frames.length-1,Math.max(0,data.units[u.type].hits.filter(h=>h.at<=elapsed).length-1))}
 if(state==='hurt'&&u.type==='gory')index=0;
 // Game-timed attack: [frame (1/30s) since the swing began, frame index] keys from the original animation.
 if(visualState==='attack'&&atlas.attackStep)index=Math.min(frames.length-1,Math.floor(((duration-u.attackTime)*30+1e-6)/atlas.attackStep));
 if(visualState==='attack'&&atlas.attackKeys){const f=(duration-u.attackTime)*30+1e-6;for(const [k,fi] of atlas.attackKeys)if(f>=k)index=fi}
 // Optional 5th value: how far (sheet px) the body sits right of the crop's left edge
 // compared to walk frame 0, so wide impact crops don't shove the body backwards.
 const [x,y,w,h,ox=0,oy=0,rot=0,fl=0]=frames[index];const sprite=u.el.querySelector('.dog-sprite');
 const scale=atlas.scale??baseAtlas.scale,left=(atlas.left??baseAtlas.left)-ox*scale;
 sprite.style.backgroundPosition=`-${x}px -${y}px`;
 sprite.style.width=w+'px';sprite.style.height=h+'px';sprite.style.left=left+'px';
 // Optional 6th value / atlas.lift (sheet px): vertical re-anchoring, e.g. the face keeps its
 // skull still while the jaw drops, floating high enough that the open jaw clears the ground.
 sprite.style.bottom=(((atlas.lift??baseAtlas.lift??0)+oy)*scale)+'px';
 // flip: the sheet faces right while allies march left; mirror inside the same box.
 // Optional 7th value: rotation (deg) about the rear-bottom pivot, e.g. the rhino rears its
 // head up before dropping it into a horn thrust (the sheet's own rearing drawings are cropped through the face).
 // Optional 8th value: mirror just this frame (a few generated sheets drew one pose facing the wrong way).
 sprite.style.transform=!atlas.flip!==!fl?`translateX(${w*scale}px) scale(${-scale},${scale})`:`scale(${scale})`+(rot?` rotate(${rot}deg)`:'');sprite.style.transformOrigin='left bottom';
 // Hit flash for enemies without a hurt drawing. Metal plates (grey 200) wash out to
 // white under brightening, so those enemies flash with a white glow around the outline instead.
 sprite.style.filter=state==='hurt'&&!atlas.hurt?(GLOW_FLASH.has(u.type)?'drop-shadow(0 0 3px #fff) drop-shadow(0 0 2px #fff)':'brightness(1.8)'):'none';
 u.el.dataset.animation=state;
}

let stageChapterView=1;
let legendSub=0;// 0 = subchapter list, n = inside LEGEND_SUBS[n-1]
function renderStageMenu(){renderTraining();renderBaseUpgrade();renderSpecialStages();renderSweepBar();
 $('#legendArrow').textContent=stageChapterView==='legend'?'‹':'›';$('#legendArrow').classList.toggle('active',stageChapterView==='legend');
 $('#legendBar').classList.toggle('hidden',stageChapterView!=='legend');
 if(stageChapterView==='legend'){$('#chapter1Tab').classList.remove('active');$('#chapter2Tab').classList.remove('active');$('#chapter3Tab').classList.remove('active');$('#futureTab').classList.remove('active');renderLegend();return}
 $('#stageGrid').innerHTML='';
 const viewStages=STAGES.map((stage,i)=>({stage,i})).filter(o=>chapterOf(o.i)===stageChapterView);
 viewStages.forEach(({stage,i})=>{const button=document.createElement('button');button.className='stage-card'+(cleared.includes(i)?' cleared':'');button.disabled=!isUnlocked(i);button.title=`등장 적: ${stageEnemies(i).map(type=>UNIT_NAMES[type]).join(' · ')} · 적 성 체력 ${stage.hp}`;button.innerHTML=`<strong>${stage.name}</strong>${starHTML(stageStars(i))}${cleared.includes(i)?`<small>${sweepMode?'소탕':'✓'}</small>`:''}`;if(sweepMode)button.disabled=!cleared.includes(i)||nyancom<SWEEP_COST;button.onclick=()=>{if(sweepMode)sweepStage(i);else{selectedStage=i;reset()}};$('#stageGrid').append(button)});
 $('#chapter1Tab').classList.toggle('active',stageChapterView===1);
 $('#chapter2Tab').classList.toggle('active',stageChapterView===2);
 $('#chapter3Tab').classList.toggle('active',stageChapterView===3);
 $('#futureTab').classList.toggle('active',stageChapterView===5);
 $('#chapterNote').textContent=stageChapterView===5?`일본 ~ 달 · 에이리언(외계 생물) 적 등장 · 적마다 강화 배율이 따로 붙어요 · 에이리언 배율 ${alienMagnification()*100}% (억제기 ${alienSuppressed()}/${ALIEN_SUPPRESSORS.length}: 심해의 소용돌이·달을 클리어하면 각각 −100%)`+(cleared.includes(MAIN_STAGE_COUNT-1)?'':' · 세계편 3장 달을 클리어하면 열립니다'):stageChapterView===2?'한국 ~ 달 재도전 · 모든 적 체력·공격력 150% 강화 · 달의 보스는 악의제왕 야옹마':stageChapterView===3?'한국 ~ 달 재도전 · 모든 적 체력·공격력 400% 강화 · 달의 보스는 맴매 선생 · 2장 달을 클리어하면 열립니다':'';
 $('#progressText').textContent=`${viewStages.filter(o=>cleared.includes(o.i)).length} / ${viewStages.length} 스테이지 클리어 · ${stageChapterView===5?'미래편 1장':'세계편 '+stageChapterView+'장'}`;
}
const SPEED_PACK={count:9,xp:1000};// pre-15.4: bought in packs of 9 (50 cat food in the original) - paid in XP here
const NYAN_PACK={count:3,xp:2000};// 야옹컴 is a Friday-stage item in the original; XP shop here, like the speed pack
function isFriday(){try{return new Date().getDay()===5||new URLSearchParams(location.search).has('friday')}catch{return false}}
function buyNyancom(){if(training.xp<NYAN_PACK.xp)return false;training.xp-=NYAN_PACK.xp;nyancom+=NYAN_PACK.count;saveTraining();saveNyancom();renderStageMenu();render();return true}
// 황금 야옹컴 sweep: spend 2 야옹컴 to skip the fight of an already-cleared main-story stage and just collect its repeat-clear rewards.
const SWEEP_COST=2;
let sweepMode=false,sweepNote='';
function sweepStage(i){
 if(!(isStoryStage(i)&&cleared.includes(i))||nyancom<SWEEP_COST)return false;
 nyancom-=SWEEP_COST;saveNyancom();
 const xp=studyXP(Math.floor(stageXP(i)/2));training.xp+=xp;saveTraining();
 let note=`${STAGES[i].name}${chapterOf(i)===2||chapterOf(i)===3?` (${chapterOf(i)}장)`:chapterOf(i)===5?' (미래편)':''} 소탕 완료! +${xp} XP (야옹컴 ${SWEEP_COST}개 사용)`;
 if(i>=18&&Math.random()<.3){speedTickets++;saveSpeedTickets();note+=' · 배속권 1개 획득'}
 sweepNote=note;renderStageMenu();renderSpeedButton();renderNyancomButton();return true;
}
function renderSweepBar(){
 const bar=$('#sweepBar');bar.classList.toggle('hidden',stageChapterView==='legend');
 const t=$('#sweepToggle');t.classList.toggle('active',sweepMode);t.textContent=sweepMode?'황금 야옹컴 소탕 ON':'황금 야옹컴 소탕 OFF';
 $('#sweepNote').textContent=sweepNote||(sweepMode?`클리어한 스테이지를 누르면 야옹컴 ${SWEEP_COST}개로 전투 없이 보상만 받습니다 (보유 ${nyancom}개)`:`야옹컴 ${nyancom}개 보유`);
}
$('#sweepToggle').onclick=()=>{sweepMode=!sweepMode;sweepNote='';renderStageMenu()};
function isTuesday(){try{return new Date().getDay()===2||new URLSearchParams(location.search).has('tuesday')}catch{return false}}
function buySpeedPack(){if(training.xp<SPEED_PACK.xp)return false;training.xp-=SPEED_PACK.xp;speedTickets+=SPEED_PACK.count;saveTraining();saveSpeedTickets();renderStageMenu();render();return true}
function renderSpecialStages(){
 const grid=$('#specialGrid');grid.innerHTML='';
 const open=cleared.includes(CHAPTER1_LEN-1),tue=isTuesday(),fri=isFriday();
 $('#speedText').textContent=`스피드업 ${speedTickets}개 · 야옹컴 ${nyancom}개 · 📚${boosts.doctor} 💰${boosts.rich} 🎯${boosts.sniper}`;
 const todays=[tue&&'광속 전사(스피드업)',fri&&'가시밭길(야옹컴)',...WEEKDAY_SETS.filter(isWeekdayOpen).map(st=>`${st.title}(${st.item==='all'?'부스트 3종 + XP':BOOST_NAME[st.item]})`)].filter(Boolean);
 $('#specialNote').textContent=!open?'세계편 1장 마지막 스테이지(달)를 클리어하면 열립니다.':(todays.length?`오늘 열린 스테이지: ${todays.join(' · ')}.`:'')+' 월 고양이 박사 · 화 광속 전사 · 수 부자 고양이 · 목 저격 훈련장 · 금 가시밭길 · 토일 주말 특별전 · 매일 리본 오렌지 강림. 아이템은 아래에서 XP로 살 수도 있습니다. (초상급은 세계편 2장 클리어 후)';
 TUESDAY_STAGES.forEach((t,k)=>{const i=MAIN_STAGE_COUNT+k,b=document.createElement('button');b.className='stage-card';const locked=!open||!tue||(k===3&&!cleared.includes(CH2_HAWAII));b.disabled=locked;b.title=t.desc+' · 적 성 체력 '+t.hp;b.innerHTML=`<strong>${t.name.replace('광속 전사 ','')}</strong>${starHTML(stageStars(i))}<small>${Math.round(t.chance*100)}%${t.count>1?' ×'+t.count:''}</small>`;b.onclick=()=>{selectedStage=i;reset()};grid.append(b)});
 FRIDAY_STAGES.forEach((t,k)=>{const i=FRIDAY_START+k,b=document.createElement('button');b.className='stage-card friday';if(k===0)b.style.gridColumnStart=1;b.disabled=!open||!fri||(k===2&&!cleared.includes(CH2_HAWAII));b.title=t.desc+' · 적 성 체력 '+t.hp;b.innerHTML=`<strong>${t.name.replace('가시밭길 ','🌵 ')}</strong>${starHTML(stageStars(i))}<small>${Math.round(t.chance*100)}%${t.count>1?' ×'+t.count:''}</small>`;b.onclick=()=>{selectedStage=i;reset()};grid.append(b)});
 WEEKDAY_SETS.forEach((set,si)=>{const today=isWeekdayOpen(set);WEEKDAY_TIERS.forEach((t,k)=>{const i=weekdayIdx(si,k),b=document.createElement('button');b.className='stage-card weekday';if(k===0)b.style.gridColumnStart=1;b.disabled=!open||!today||(k===2&&!cleared.includes(CH2_HAWAII));b.title=STAGES[i].desc+' · 적 성 체력 '+STAGES[i].hp;b.innerHTML=`<strong>${set.flag} ${t.n}</strong>${starHTML(stageStars(i))}<small>${set.title} ${Math.round(t.chance*100)}%${t.count>1?' ×'+t.count:''}</small>`;b.onclick=()=>{selectedStage=i;reset()};grid.append(b)})});
 const ribbonOwned=typeof gachaOwns==='function'&&gachaOwns('ribbonorange');RIBBON_TIERS.forEach((t,k)=>{const i=RIBBON_START+k,b=document.createElement('button');b.className='stage-card ribbon';if(k===0)b.style.gridColumnStart=1;b.disabled=!open||!ribbonTierOpen(k);b.title=STAGES[i].desc+' · 적 성 체력 '+STAGES[i].hp;b.innerHTML=`<strong>🎀 ${t.n}</strong>${starHTML(stageStars(i))}<small>${t.hard?(ribbonSave.cap?'레벨 상한 +5 받음':ribbonTierOpen(k)?'레벨 상한 +5':'상급 클리어 시 열림'):`리본 오렌지 강림 ${!ribbonReady()?'준비 중':ribbonOwned?'획득 완료':Math.round(t.chance*100)+'%'}`}</small>`;b.onclick=()=>{selectedStage=i;reset()};grid.append(b)});
 const buy=document.createElement('button');buy.className='stage-card';buy.disabled=training.xp<SPEED_PACK.xp;buy.innerHTML=`<strong>스피드업 ${SPEED_PACK.count}개 구매</strong><small>${SPEED_PACK.xp} XP</small>`;buy.onclick=buySpeedPack;grid.append(buy);
 for(const k in BOOSTS){const bb=document.createElement('button');bb.className='stage-card';bb.disabled=training.xp<BOOST_PACK.xp;bb.title=BOOSTS[k].desc;bb.innerHTML=`<strong>${BOOSTS[k].icon} ${BOOST_NAME[k]} ${BOOST_PACK.count}개 구매</strong><small>${BOOST_PACK.xp} XP · 보유 ${boosts[k]}개</small>`;bb.onclick=()=>buyBoostPack(k);grid.append(bb)}
 const buy2=document.createElement('button');buy2.className='stage-card';buy2.disabled=training.xp<NYAN_PACK.xp;buy2.innerHTML=`<strong>야옹컴 ${NYAN_PACK.count}개 구매</strong><small>${NYAN_PACK.xp} XP</small>`;buy2.onclick=buyNyancom;grid.append(buy2);
}
function legendXP(k){return LEGEND_STAGES[k].xp*LEGEND_XP_SCALE}
function renderLegend(){
 const grid=$('#stageGrid'),tabs=$('#legendCrowns');grid.innerHTML='';tabs.innerHTML='';
 const open=legendOpen(),sub=legendSub-1,sc=LEGEND_SUBS[sub];
 $('#progressText').textContent=sc?`레전드 스토리 · ${sc.name} ★${legendCrown} · ${legendSubCount(sub,legendCrown)} / ${sc.len}`:'레전드 스토리';
 $('#chapterNote').textContent=!open?'세계편 1장 마지막 스테이지(달)를 클리어하면 열립니다.':legendSub?'':'서브챕터를 선택하세요. 앞 서브챕터를 ★1로 모두 클리어하면 다음 서브챕터가 열립니다.';
 tabs.classList.toggle('hidden',!legendSub);
 $('#legendNote').textContent=legendSub?`왕관 난이도 ★${legendCrown}: 적 능력치 ${Math.round(LEGEND_CROWN_MULT[legendCrown-1]*100)}% · ${sc.len}개 스테이지를 모두 클리어하면 다음 왕관이 열립니다.`:'';
 if(!legendSub){
  LEGEND_SUBS.forEach((it,n)=>{const ok=legendSubOpen(n),b=document.createElement('button');b.className='stage-card legend-sub'+(legendSubDone(n,1)?' cleared':'');b.disabled=!ok;
   const subStars=Math.round(Array.from({length:it.len},(_,j)=>stageStars(legendIdx(it.start+j),1)).reduce((a,b)=>a+b)/it.len);b.innerHTML=`<strong>${it.name}</strong>${starHTML(subStars)}<small>${ok?`👑1 ${legendSubCount(n,1)} / ${it.len}`:'잠김'}</small>`;
   b.onclick=()=>{legendSub=n+1;if(!legendCrownUnlocked(legendCrown,n))legendCrown=1;renderLegend()};grid.append(b)});
  return;
 }
 const back=document.createElement('button');back.className='codex-tab';back.textContent='‹ 서브챕터';back.onclick=()=>{legendSub=0;renderLegend()};tabs.append(back);
 for(const c of [1,2,3,4]){const b=document.createElement('button');b.className='codex-tab'+(c===legendCrown?' active':'');b.textContent='★'.repeat(c);b.disabled=!legendCrownUnlocked(c,sub);b.onclick=()=>{legendCrown=c;renderLegend()};tabs.append(b)}
 const done=legendProgress[legendCrown];
 // only the stages reached so far are shown: the first one, plus one more after each clear
 for(let k=sc.start;k<sc.start+sc.len;k++){const t=LEGEND_STAGES[k];if(!legendStageUnlocked(k))continue;const i=legendIdx(k),cl=done.includes(k),b=document.createElement('button');b.className='stage-card legend-stage'+(cl?' cleared':'');b.title=`${t.en?t.en+' · ':''}${t.desc} · 등장 적: ${stageEnemies(i).map(type=>UNIT_NAMES[type]).join(' · ')} · 적 성 체력 ${t.hp}`;b.innerHTML=`<strong>${t.flag} ${t.name}</strong>${starHTML(stageStars(i,legendCrown))}<small>${cl?'✓ ':''}${legendXP(k)} XP</small>`;b.onclick=()=>{selectedStage=i;reset()};grid.append(b)}
}
function legendFinish(win){
 const k=STAGES[selectedStage].legend.k,c=legendCrown,list=legendProgress[c],first=win&&!list.includes(k),sub=legendSubOf(k),sc=LEGEND_SUBS[sub],last=k===sc.start+sc.len-1;
 let xp=0,tickets=0,bonusXp=0,nyan=0;
 if(win){
  const drop=LEGEND_STAGES[k].drop||{};
  xp=legendXP(k);if(!first)xp=Math.floor(xp/2);if(drop.xpChance&&Math.random()<drop.xpChance)bonusXp=drop.xp*LEGEND_XP_SCALE;xp=studyXP(xp)*(boostActive('doctor')?2:1);bonusXp=studyXP(bonusXp);training.xp+=xp+bonusXp;saveTraining();
  if(drop.speed&&Math.random()<drop.speed)tickets=1;
  if(tickets){speedTickets+=tickets;saveSpeedTickets();renderSpeedButton()}
  if(drop.nyan&&Math.random()<drop.nyan){nyan=1;nyancom++;saveNyancom();renderNyancomButton()}
  if(first){list.push(k);saveLegend()}
 }
 game.ended=true;game.running=false;highlight();$('#result').classList.remove('hidden');
 $('#resultTitle').textContent=win?`${STAGES[selectedStage].name} ★${c} 정복 완료!`:'패배...';
 let detail=win?`보상 +${xp} XP`:'아군을 강화하고 다시 도전하세요.';
 if(win&&first&&!last)detail=`${LEGEND_STAGES[k+1].name} 스테이지가 열렸어요! `+detail;
 if(bonusXp)detail+=` · 보물 발견! 보너스 +${bonusXp} XP`;
 if(tickets)detail+=` · 스피드업 ${tickets}개 획득! (보유 ${speedTickets}개)`;
 if(nyan)detail+=` · 야옹컴 1개 획득! (보유 ${nyancom}개)`;
 if(win&&first&&legendSubDone(sub,c))detail+=(c<4?` · ${sc.name} ★${c+1} 난이도가 열렸어요!`:` · ${sc.name} ★4 완전 정복!`)+(c===1&&LEGEND_SUBS[sub+1]?` · ${LEGEND_SUBS[sub+1].name} 서브챕터가 열렸어요!`:'');
 $('#resultDetail').textContent=detail;
 $('#nextStageBtn').classList.toggle('hidden',!win||last);
 renderNewButtons();renderOrangeButton();renderYellowButton();renderGreenButton();
}
$('#chapter1Tab').onclick=()=>{stageChapterView=1;renderStageMenu()};
$('#legendArrow').onclick=()=>{stageChapterView=stageChapterView==='legend'?1:'legend';if(stageChapterView==='legend')legendSub=0;renderStageMenu()};
$('#chapter2Tab').onclick=()=>{stageChapterView=2;renderStageMenu()};
$('#chapter3Tab').onclick=()=>{stageChapterView=3;renderStageMenu()};
$('#futureTab').onclick=()=>{stageChapterView=5;renderStageMenu()};
function openStages(){if(game.running&&!game.ended)game.paused=true;highlight();render();renderStageMenu();$('#stageMenu').classList.remove('hidden');$('#resumeBtn').textContent=game.ended?'결과로 돌아가기':'전투로 돌아가기'}
$('#stagesBtn').onclick=openStages;
$('#resultStagesBtn').onclick=openStages;
$('#resumeBtn').onclick=()=>{$('#stageMenu').classList.add('hidden');if(!game.ended){game.paused=false;tutorial()}render()};
$('#nextStageBtn').onclick=()=>{const lg=STAGES[selectedStage].legend;if(lg){if(game.ended&&legendSubOf(lg.k+1)===legendSubOf(lg.k)&&legendStageUnlocked(lg.k+1)){selectedStage=legendIdx(lg.k+1);reset()}return}if(game.ended&&isStoryStage(selectedStage)&&!isChainEnd(selectedStage)&&isUnlocked(selectedStage+1)){selectedStage++;reset()}};
window.addEventListener('resize',syncBasePositions);


// evolved_sheet.png: 7x8 cells of 1536/7 x 159. Each cell is the original 128px cell with 16px added above
// and 15px below, so art that used to spill into the neighbouring row (feet, sparkles) has its own room.
const EVOLVED_PAD_TOP=16,EVOLVED_CELL_W=1536/7*.75,EVOLVED_CELL_H=159*.75;
// Windup (col 3) / impact (col 4) crops in source px of the 1774px-wide ally sheets:
// [x0,x1,dx]. The thrown object starts inside col 3, right after the windup body, so
// plain cell crops either cut it or (showing cols 3+4 together) draw the windup body
// and the impact body at once. dx re-anchors the impact body onto the walk position.
// purple reuses orange's row and cyan's own sheet is laid out identically, so both need orange's throw crops
const LEGACY_THROW_CROPS={orange:{3:[665,858],4:[862,1109,66]},purple:{3:[665,858],4:[862,1109,66]},cyan:{3:[665,858],4:[862,1109,66]},yellow:{3:[665,870],4:[871,1109,64]},green:{3:[665,876],4:[876,1109,58]}};
LEGACY_THROW_CROPS.purple=LEGACY_THROW_CROPS.cyan=LEGACY_THROW_CROPS.orange;
// evolved_sheet.png's walk cycle (cols 0-2) only draws the held weapon/item in some
// frames for these three - col 2 drops red's sword entirely, and green/cyan only hold
// their boomerang/orb in col 0. Restrict their walk cycle to the frame(s) that keep it
// visible instead of letting it flicker in and out every stride.
const EVOLVED_WALK_FRAMES={red:[0,1],green:[1,2],cyan:[1,2]};// green/cyan skip col 0 (a stationary pose with the arm out) so the stride is a clean 2-frame run with the item tucked in hand
// evolved_sheet.png only draws green's boomerang / cyan's orb in walk col 0 - the fist is
// tucked to a different spot in cols 1-2 (mid-stride) with nothing in hand. Crop the item
// out of col 0 (native sheet px, cell-relative) and re-anchor that patch to each frame's
// actual fist spot so the full 3-frame walk plays while the item stays visibly held.
const EVOLVED_HELD_ITEM={
 green:{x:134,y:28,w:76,h:78,hand0:[156,88],handOther:[130,73],hands:{1:[132,73],2:[128,74]}},
 cyan:{x:130,y:55,w:58,h:58,hand0:[159,84],handOther:[137,84],hands:{1:[137,85],2:[134,83]}}
};
const EVOLVED_SCALE=.75,EVOLVED_SPRITE_LEFT=-61.3,EVOLVED_SPRITE_BOTTOM=-3,EVOLVED_CELL_W_NATIVE=1536/7,EVOLVED_CELL_H_NATIVE=159;
function animateAlly(u){
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 if(u.stats?.evolved){
  const sprite=u.el.querySelector('.evolved-sprite'),row=ALLIES.indexOf(u.type);
  const duration=data.units[u.type].attackDuration||.56;
  const walkFrames=EVOLVED_WALK_FRAMES[u.type],col=u.hurtTime>0?6:u.attackTime>0?3+Math.min(2,Math.max(0,Math.floor((duration-u.attackTime)/duration*3))):walkFrames?walkFrames[Math.floor(u.animTime/.16)%walkFrames.length]:Math.floor(u.animTime/.16)%3;
  sprite.style.backgroundPosition=`${-col*EVOLVED_CELL_W}px ${-row*EVOLVED_CELL_H}px`;
  const item=EVOLVED_HELD_ITEM[u.type],itemEl=u.el.querySelector('.evolved-item');
  if(item){
   const onFrame0=state==='walk'&&col===0;
   itemEl.style.display=state==='walk'?'block':'none';
   if(state==='walk'){
    const ho=item.hands?.[col]||item.handOther,[hx,hy]=onFrame0?[0,0]:[ho[0]-item.hand0[0],ho[1]-item.hand0[1]];
    itemEl.style.left=(EVOLVED_SPRITE_LEFT+(EVOLVED_CELL_W_NATIVE-(item.x+item.w))*EVOLVED_SCALE-hx*EVOLVED_SCALE)+'px';
    itemEl.style.bottom=(EVOLVED_SPRITE_BOTTOM+96-(item.y+item.h)*EVOLVED_SCALE-hy*EVOLVED_SCALE)+'px';
    itemEl.style.width=(item.w*EVOLVED_SCALE)+'px';itemEl.style.height=(item.h*EVOLVED_SCALE)+'px';
    itemEl.style.backgroundPosition=`${-(item.x*EVOLVED_SCALE)}px ${-(row*EVOLVED_CELL_H+(item.y+EVOLVED_PAD_TOP)*EVOLVED_SCALE)}px`;
   }
  }
  u.el.dataset.animation=state;
  return;
 }
 const sprite=u.el.querySelector('.ally-sprite'),cell=77.6125,k=cell/221.75;
 const ownSheet=u.type==='cyan'||u.type==='blue',row=ownSheet?0:{red:0,orange:1,yellow:2,green:3,purple:1,pink:0}[u.type];
 const duration=data.units[u.type].attackDuration||.56;
 const col=u.hurtTime>0?6:u.attackTime>0?3+Math.min(2,Math.max(0,Math.floor((duration-u.attackTime)/duration*3))):Math.floor(u.animTime/(u.type==='blue'?.075:.16))%3;
 const crop=LEGACY_THROW_CROPS[u.type]?.[col];
 if(crop){const [x0,x1,dx=0]=crop;sprite.style.left=(-18-dx*k)+'px';sprite.style.width=((x1-x0)*k)+'px';sprite.style.backgroundPosition=`${-x0*k}px ${-row*cell}px`}
 else{sprite.style.left='-18px';sprite.style.width=cell+'px';sprite.style.backgroundPosition=`${-col*cell}px ${-row*cell}px`}
 u.el.querySelector('.ally-shadow').style.backgroundPosition=ownSheet?'-543.2875px -77.6125px':`${-7*cell}px ${-row*cell}px`;
 u.el.dataset.animation=state;
}

const PROFILE_SHEET='assets/profile_sheet.webp';
const PROFILE_TEXT={red:'가장 먼저 전선에 뛰어든 기본 전투원. 단순하지만 어떤 전투에서도 믿을 만하다.',orange:'멀리서 과즙을 던져 모여 있는 적을 한꺼번에 공격한다.',yellow:'튼튼한 몸으로 앞줄을 지키며 가까운 적에게 전기를 방출한다.',green:'왕복하는 부메랑으로 같은 적을 두 번 공격할 수 있다.',cyan:'아주 먼 거리에서 넓은 범위를 노리는 장거리 전투원.',blue:'빠른 이동과 연속 공격으로 빈틈을 놓치지 않는 속공 전투원.',purple:'빨간 적을 상대하도록 특별히 훈련된 색상 특화 전투원.',pink:'가까이 접근한 뒤 긴 광역 판정으로 뒤쪽의 적까지 휩쓴다.',crimson:'적 앞까지 달려가 강력한 펀치를 꽂는다. 맞은 적은 짧게 밀려난다. 10% 확률로 급소에 꽂히는 2배 치명타.',gold:'금광석을 던져 비행 중 세 조각으로 퍼뜨린다. 조각들은 적중 시 금괴로 변해 각각 피해를 준다.',ivory:'아이스크림을 던져 범위 피해를 주고, 맞은 적의 이동 속도를 늦춘다.',chartreuse:'주머니를 열어 콩알탄 다섯 발을 빠르게 퍼붓는다.',mint:'민트 아이스크림을 터뜨려 주변을 공격하며, 확률적으로 적을 얼려 움직임을 멈춘다.',azure:'서핑보드를 타고 전방으로 돌진하며 경로의 모든 적을 휩쓴다.',crystal:'날카로운 크리스탈 조각으로 앞줄의 적을 꿰뚫는다. 가끔 강력한 치명타가 터진다.',lavender:'향수 구름을 퍼뜨려 범위 안의 적을 공격하고 공격력을 약화시킨다.',salmon:'낚싯바늘을 멀리 던져 적을 맞히고 아군 쪽으로 끌어당긴다.',raspberry:'아주 먼 거리에서 저격한다. 멀리 있는 적일수록 총알이 가속해 피해가 커진다. 10% 확률로 급소를 꿰뚫는 2배 치명타.',onyx:'흑요석처럼 단단한 몸으로 거대한 망치를 내리찍는 수수께끼의 전사. 이름 말고는 나이도 성별도 고향도 알려진 것이 없고, 악의제왕을 쓰러뜨린 자에게만 모습을 드러낸다. 보스에게 1.5배 피해.'};
const EVOLUTION_TEXT={red:'강타 · 넉백 +1회 · 재사용 대기 -20%',orange:'과즙 범위 확대 · 처치 시 돈 2배',yellow:'추가 체력 · 받는 피해 -15%',green:'귀환 부메랑 강화 · 재사용 대기 -15%',cyan:'광역 범위 확대 · 떠 있는 적에게 1.8배 피해(받는 피해 0.4배)',blue:'공격 속도 증가 · 이동 속도 +25%',purple:'빨간 적 특화 강화 · 보스 피해 +30%',pink:'광역 공격력 증가 · 30% 확률로 1.5초간 느리게',crimson:'강타 위력 증가 · 보스 피해 +30%',gold:'파편 피해 증가 · 처치 시 돈 2배',ivory:'둔화 확률 40%→60% · 재사용 대기 -15%',chartreuse:'연사 피해 증가 · 연사 +1발',mint:'빙결 확률 증가 · 빙결 시간 +0.5초',azure:'돌진 피해 증가 · 20% 확률로 2배 치명타',crystal:'플로팅 특화 강화 · 관통 +1',lavender:'약화 확률 40%→60% · 약화 시간 +2초',salmon:'끌어오기 강화 · 재사용 대기 -15%',raspberry:'사거리 확장 및 관통 · 선딜 -25%',onyx:'보스 피해 2배 · 넉백 +1회'};
const PROFILE_TEXT_EVOLVED={red:'수많은 전투를 거치며 맨몸으로도 강력한 일격을 날릴 수 있게 되었다. 이제는 단순한 몸빵이 아니라 한 방을 노리는 타격형 전투원.',orange:'더 많은 과즙을 담아 던지게 되면서 폭발 범위가 눈에 띄게 넓어졌다.',yellow:'두꺼워진 몸으로 더 오래 버티며 최전선을 든든하게 지킨다.',green:'부메랑을 던지는 손목 힘이 강해져 돌아올 때 더 강력한 일격을 남긴다.',cyan:'조준 실력이 늘어 폭발 범위가 한층 넓어진 저격수로 거듭났다.',blue:'손이 더 빨라져 눈 깜짝할 사이에 연타를 꽂아 넣는다.',purple:'빨간 적의 약점을 완벽히 파악해 압도적인 피해를 입히고, 받는 피해는 최소화한다.',pink:'리본을 휘두르는 힘이 강해져 광역 공격의 위력이 한층 강력해졌다.',crimson:'주먹에 실리는 힘이 늘어나 강타의 위력이 한층 강해졌다.',gold:'더 많은 금맥을 다뤄본 경험으로 파편 하나하나의 피해가 늘어났다.',ivory:'차가운 냉기가 짙어져 적을 더 자주, 더 오래 둔화시킨다.',chartreuse:'손놀림이 빨라져 콩알탄 한 발 한 발의 위력이 늘어났다.',mint:'냉기가 응축되어 적을 얼릴 확률이 크게 늘어났다.',azure:'파도의 기세가 거세져 돌진 한 방의 위력이 늘어났다.',crystal:'결정 순도가 높아져 플로팅 적을 상대로 한층 압도적인 위력을 낸다.',lavender:'향이 짙어져 더 자주, 더 오래 적의 공격력을 떨어뜨린다.',salmon:'손맛이 늘어 적을 더 강하게 끌어당긴다.',raspberry:'조준 실력이 늘어 사거리가 늘고, 먼 거리에서는 뒤쪽 적까지 꿰뚫는다.',onyx:'흑요석 갑옷을 두르고 한층 거대해졌다. 양손 망치의 일격은 어떤 보스의 껍질도 부순다. 갑옷 속 정체는 여전히 아무도 모른다.'};
Object.assign(EVOLUTION_TEXT,{ribbonorange:'정지가 더 자주 · 더 오래',maple:'사거리 +20%',brick:'사거리 +20%',korn:'처치 시 돈 증가 +25%p · 사거리 +20%',teal:'약화가 더 자주 · 더 오래 · 사거리 +20%',violet:'둔화가 더 자주 · 더 오래 · 사거리 +20%',orchid:'서지 범위 확대 · 재사용 대기 -15% · 사거리 +20%',cobalt:'공격력 +20% · 사거리 +20%',flame:'공격력 +20% · 사거리 +20%',scarlet:'공격력 +20% · 사거리 +20%',moss:'둔화가 더 자주 · 더 오래 · 사거리 +20%',coral:'공격력 +20% · 사거리 +20%',aqua:'둔화가 더 자주 · 더 오래 · 사거리 +20%',cooper:'정지가 더 자주 · 사거리 +20%',navy:'공격력 +20% · 사거리 +20%',dandelion:'둔화가 더 자주 · 더 오래 · 사거리 +20%',babyblue:'날려버린다가 더 자주 · 더 멀리 · 사거리 +20%',mintcyan:'살아남는다가 더 자주 · 사거리 +20%',peach:'사거리 +20%',lightcream:'치명타가 더 자주 · 사거리 +20%',midnight:'정지가 더 자주 · 더 오래 · 사거리 +20%',darklilac:'약화가 더 자주 · 더 오래 · 사거리 +20%',fusioncream:'공격력 +20% · 사거리 +20%',silver:'재사용 대기 −15% · 사거리 +20%',lava:'공격력 +20% · 사거리 +20%',babypink:'둔화가 더 자주 · 더 오래 · 사거리 +20%',magenta:'파동이 더 멀리 · 재사용 대기 −15% · 사거리 +20%',rainbow:'공격력 +20% · 재사용 대기 -15% (사거리는 그대로)',lapis:'치명타가 더 자주 · 이동 속도 +20%',selenite:'파동이 더 자주 · 더 멀리',topaz:'보상금 +50%p · 재사용 대기 -15%',cornflower:'능력은 미래편에서 공개',bittersweet:'치명타가 더 자주',claret:'약탈 강화 · 공격력 +20%',verdigris:'날려버린다가 더 자주 · 더 멀리 · 공격력 +20%',plum:'약화가 더 자주 · 더 오래',forest:'공격력 +20%',canary:'정지가 더 자주 · 더 오래',cherry:'공격력 +20%',mauve:'정지가 더 자주 · 더 오래',khaki:'공격력 +20%',tangerine:'둔화가 더 자주 · 더 오래',burgundy:'공격력 +20%',mustard:'공격력 +20%',sky:'정지가 더 자주 · 더 오래',denim:'공격력 +20%',charcoal:'공격 주기 증가가 더 자주 · 더 오래'});
Object.assign(PROFILE_TEXT_EVOLVED,{ribbonorange:'리본이 한층 커지고 작업복을 갖춰 입었다. 과즙에 묶인 적은 더 오래 꼼짝 못 한다.',maple:'망치가 더 커졌다. 벼랑 끝에서의 일격이 더 매섭다.',brick:'벽이 한층 두꺼워졌다.',korn:'통이 더 커졌다. 팁도 더 두둑하다.',teal:'약이 더 독해졌다.',violet:'물감이 더 짙어졌다.',orchid:'조형물이 더 정교해졌다. 서지가 더 멀리 닿는다.',cobalt:'신호봉이 더 길어졌다. 에이리언에게 더 세게 휘두른다.',flame:'기타가 더 뜨겁게 달아올랐다.',scarlet:'목소리가 한층 우렁차졌다.',moss:'덩굴이 더 질기게 자란다.',coral:'호루라기 소리가 더 날카로워졌다.',aqua:'물고기가 더 많이 모여든다.',cooper:'렌치가 더 묵직해졌다.',navy:'닻이 더 크고 무거워졌다.',dandelion:'홀씨가 더 멀리 날아간다.',babyblue:'베이스가 더 깊어졌다.',mintcyan:'배낭이 더 튼튼해졌다.',peach:'앰프를 하나 더 늘렸다.',lightcream:'오븐이 더 뜨거워졌다.',midnight:'화면이 한층 넓어졌다.',darklilac:'발차기가 더 날카로워졌다.',fusioncream:'카드가 더 빠르게 쏟아진다.',silver:'검에 달빛이 깃들었다.',lava:'북채가 더 굵어졌다.',babypink:'리본이 더 길어졌다.',magenta:'시약이 더 강력해졌다.',rainbow:'색이 더욱 선명해졌다. 더 강한 무지개가 더 빨리 번진다.',lapis:'속도가 더 빨라지고 치명타가 더 자주 터진다.',selenite:'파동이 더 자주, 더 멀리 퍼진다.',topaz:'사냥 솜씨가 늘어 보상금을 더 많이 챙기고 재사용 대기가 짧아진다.',cornflower:'우주복이 한층 두꺼워졌다. 능력은 미래편이 열리면 밝혀진다.',bittersweet:'프라이팬이 더 무거워져 치명타가 더 자주 터진다.',claret:'선장 모자에 금장이 더해졌다. 전리품을 더 많이 챙기고 더 세게 벤다.',verdigris:'엔진이 강해져 적을 더 자주, 더 멀리 날려 버린다.',plum:'약이 더 진해져 천사의 공격력을 더 자주, 더 오래 떨어뜨린다.',forest:'부적의 힘이 깊어져 공격이 더 강해졌다. 천사에게 엄청 강하다.',canary:'천둥이 더 커져 천사를 더 자주, 더 오래 멈춰 세운다.',cherry:'일섬이 더 날카로워졌다. 천사에게 극데미지를 준다.',mauve:'거미줄이 더 촘촘해져 떠다니는 적을 더 자주, 더 오래 멈춰 세운다.',khaki:'새총 솜씨가 늘어 더 강한 일격을 날린다. 떠다니는 적에게 초데미지를 준다.',tangerine:'물줄기가 더 세져 빨간 적을 더 자주, 더 오래 느리게 만든다.',burgundy:'망토 솜씨가 한층 능숙해졌다. 빨간 적에게 엄청 강하다.',mustard:'곡괭이가 더 무거워졌다. 빨간 적에게 초데미지를 준다.',sky:'탐조등이 더 환해져 검은 적을 더 자주, 더 오래 멈춰 세운다.',denim:'추리가 날카로워져 한층 강해졌다. 검은 적에게 엄청 강하다.',charcoal:'그림자가 더 짙어져 검은 적의 공격을 더 자주, 더 오래 늦춘다.'});
Object.assign(EVOLUTION_TEXT,{garnet:'살아남는다가 더 자주 · 넉백 +1회',prism:'밀치기 거리 +30% · 타격 구간 확대 · 재사용 대기 -15%',black:'공격력 +20%',white:'재사용 대기 -20%',maroon:'둔화가 더 자주 · 더 오래',brown:'천사 피해 ×0.2 (맷집 강화)',tan:'둔화가 더 자주 · 더 오래',beige:'정지가 더 자주 · 더 오래',cream:'둔화가 더 자주 · 더 오래',olive:'약화가 더 자주 · 더 오래',clover:'약화가 더 자주 · 더 오래',indigo:'정지가 더 자주 · 더 오래',lilac:'둔화가 더 자주 · 더 오래',hotpink:'약화가 더 자주 · 더 오래',ruby:'정지가 더 자주 · 더 오래',hacienda:'공격력 +20%'});
Object.assign(PROFILE_TEXT_EVOLVED,{garnet:'갑옷이 한층 두꺼워졌다. 살아남을 확률이 높아지고 지면을 가르는 주먹에 붉은 결정이 솟는다.',prism:'결정이 날개처럼 돋아 광선이 더 멀리, 더 세게 적을 밀어낸다.',black:'먹물이 더 진해져 검은 적을 한 번에 무너뜨린다.',white:'팔 힘이 붙어 눈덩이가 더 단단해졌다. 재사용 대기가 짧아져 끊임없이 병력을 쏟아낼 수 있다.',maroon:'대포가 커져 맞은 적이 더 자주, 더 오래 느려진다.',brown:'방패가 더 두꺼워져 천사에게 받는 피해가 더욱 줄어든다.',tan:'채찍이 길어져 천사를 더 자주, 더 오래 붙잡아 둔다.',beige:'바게트가 더 단단해져 검은 적을 더 자주, 더 오래 정지시킨다.',cream:'콘이 더 커져 검은 적을 더 자주, 더 오래 늦춘다.',olive:'기름이 더 번져 떠다니는 적의 공격력을 더 오래 떨어뜨린다.',clover:'수리검이 날카로워져 검은 적을 더 자주, 더 오래 약하게 만든다.',indigo:'열매가 더 단단해져 떠다니는 적을 더 자주, 더 오래 정지시킨다.',lilac:'꽃잎이 더 짙어져 떠다니는 적을 더 자주, 더 오래 늦춘다.',hotpink:'풍선이 더 커져 빨간 적을 더 자주, 더 오래 약하게 만든다.',ruby:'보석이 더 맑아져 빨간 적을 더 자주, 더 오래 정지시킨다.',hacienda:'올가미가 길어져 한층 날카롭게 천사를 휘감는다.'});
Object.assign(PROFILE_TEXT,{ribbonorange:'크림색 리본을 단 오렌지 농장의 아가씨. 오렌지를 꽉 짜서 던지면 끈적한 과즙에 묶인 적이 잠시 멈춰 선다.',maple:'망치를 든 목수. 얻어맞아 쓰러지기 직전, 마지막 힘을 짜내면 공격력이 두 배로 치솟는다.',brick:'벽돌을 쌓아 작은 벽을 밀어내는 조적공. 어떤 속성의 공격도 단단히 버텨 낸다.',korn:'팝콘 통을 흔들어 알갱이를 부채꼴로 흩뿌리는 가게 사장. 적을 쓰러뜨릴 때마다 돈을 더 챙긴다.',teal:'장난감 주사기로 약물을 쏘는 의사. 메탈을 뺀 모든 적을 자주 약하게 만든다.',violet:'붓을 휘둘러 물감을 흩뿌리는 화가. 번지는 물감이 메탈을 뺀 모든 적을 가끔 느리게 한다.',orchid:'기하학 조형물을 조립해 던지는 설치미술가. 조형물이 떨어진 자리에는 서지가 남아 적을 계속 아프게 한다.',cobalt:'붉은 신호봉을 든 안전 요원. 에이리언 앞에서도 한 걸음 물러서지 않는다.',flame:'불꽃 머리의 기타리스트. 뜨거운 음파로 빨간 적에게 큰 피해를 준다.',scarlet:'마이크를 쥔 붉은 가수. 빨간 적의 공격에도 끄떡없고 노래 한 소절이 곧 일격이다.',moss:'두꺼운 책을 든 식물학자. 덩굴 기운으로 에이리언의 발을 자주 휘감는다.',coral:'레드카드를 치켜든 심판. 하늘에 떠 있는 반칙 적에게 퇴장 선고를 내린다.',aqua:'병조림을 든 해양 연구원. 헤엄치는 물고기가 떠다니는 적의 날갯짓을 가끔 무겁게 만든다.',cooper:'렌치를 휘두르는 정비공. 내려찍는 충격으로 메탈 적을 가끔 멈춰 세운다.',navy:'커다란 닻을 던지는 선장. 닻이 지나간 자리의 에이리언은 큰 피해를 입는다.',dandelion:'민들레 홀씨를 후 부는 소년. 흩날리는 홀씨가 검은 적의 움직임을 가끔 느리게 한다.',babyblue:'헤드폰을 쓴 DJ. 강한 비트가 가끔 적을 멀리 날려 버린다.',mintcyan:'연필을 쥔 작은 탐험가. 쓰러질 것 같은 순간에도 자주 한 번 더 버틴다.',peach:'묵직한 베이스를 연주하는 연주자. 천사의 공격도 몸으로 받아 낸다.',lightcream:'갓 구운 빵을 던지는 제빵사. 아주 가끔 빵이 급소에 꽂혀 치명타가 터진다.',midnight:'화면을 펼치는 해커. 밤하늘 같은 화면이 에이리언을 가끔 정지시킨다.',darklilac:'보랏빛 발차기의 달인. 날카로운 발끝이 에이리언의 기세를 자주 꺾는다.',fusioncream:'카드를 쏟아 내는 마술사. 쉴 새 없이 날아가는 카드가 에이리언에게 큰 피해를 준다.',silver:'은빛 두건의 검사. 느리게 검을 치켜들었다가 급소를 단 한 번에 벤다.',lava:'머리띠를 두른 북치기. 북소리와 함께 터지는 충격파가 검은 적을 한꺼번에 휩쓴다.',babypink:'붉은 리본을 휘두르는 체조 선수. 리본이 그린 초승달이 천사를 가끔 느리게 한다.',magenta:'플라스크를 흔드는 과학자. 폭발 반응이 일어날 때마다 앞으로 길게 파동이 번진다.',rainbow:'일곱 색을 몸에 품은 존재. 붓을 휘두르면 무지개 빛이 멀리까지 번져 속성을 가리지 않고 모든 적을 크게 베어 낸다.',lapis:'푸른 칼날을 두 손에 쥔 광속 전사. 눈 깜짝할 새 세 번 연달아 베고, 가끔 치명타가 터진다.',selenite:'달빛을 모으는 사제. 지팡이를 휘두르면 가끔 달빛 파동이 앞으로 길게 뻗어 나간다.',topaz:'금빛 장총을 든 보물 사냥꾼. 적을 쓰러뜨리면 보상금을 두 배로 챙긴다.',cornflower:'우주에서 온 대원. 능력은 미래편이 열리면 밝혀진다.',bittersweet:'프라이팬을 휘두르는 요리사. 불꽃 튀는 일격이 자주 치명타로 터진다.',claret:'대포 대신 칼바람으로 포탄을 날리는 해적 선장. 세 번 연달아 베고, 처치한 적에게서 전리품을 더 챙긴다.',verdigris:'스패너를 든 정비 로봇. 가끔 적을 멀리 날려 버린다.',plum:'독약 솥을 끓이는 마녀. 약을 뿌려 천사의 공격력을 자주 떨어뜨린다.',forest:'부적 검을 든 퇴마사. 천사에게 엄청 강하다.',canary:'천둥북을 울리는 천둥신. 천둥으로 천사를 가끔 멈춰 세운다.',cherry:'벚꽃 사이로 일섬을 날리는 사무라이. 천사에게 극데미지를 준다.',mauve:'거미줄로 먹이를 노리는 거미 왕. 떠다니는 적을 가끔 멈춰 세운다.',khaki:'새총으로 하늘을 겨누는 사냥꾼. 떠다니는 적에게 초데미지를 준다.',tangerine:'물줄기를 뿌리는 소방관. 빨간 적을 자주 느리게 만든다.',burgundy:'붉은 망토로 황소를 다루는 투우사. 빨간 적에게 엄청 강하다.',mustard:'곡괭이로 땅을 부수는 드워프 광부. 빨간 적에게 초데미지를 준다.',sky:'탐조등으로 어둠을 비추는 등대지기. 검은 적을 가끔 멈춰 세운다.',denim:'돋보기로 단서를 쫓는 탐정. 검은 적에게 엄청 강하다.',charcoal:'그림자처럼 움직이는 닌자. 검은 적의 공격을 자주 늦춘다.',garnet:'석류석 갑옷을 두른 중장 기사. 치명타를 맞아도 이를 악물고 살아남고, 검은 적에게는 한 방에 무너뜨리는 주먹을 휘두른다.',prism:'무지개를 가르는 지휘자. 오랜 준비 끝에 넓은 구간의 적을 한꺼번에 밀쳐낸다.',black:'붓에 먹물을 묻혀 뿌리는 서예가. 검은 적에게 초데미지를 주는 먹을 먹인다.',white:'눈덩이를 던지는 평범한 전투원. 값싸게 뽑아 전선을 두껍게 채운다.',maroon:'등에 진 대포로 멀리서 포탄을 쏜다. 맞은 빨간 적의 걸음이 느려진다.',brown:'나무 방패로 몸을 감싼 방패병. 천사의 공격을 거의 받아넘긴다.',tan:'채찍을 휘둘러 앞의 적을 쓸어버린다. 천사의 이동을 늦춘다.',beige:'바게트를 휘둘러 검은 적을 얼어붙게 만든다.',cream:'아이스크림을 던져 검은 적의 걸음을 늦춘다.',olive:'올리브유 병을 던져 떠다니는 적을 약하게 만든다.',clover:'수리검을 던지는 닌자. 검은 적의 공격력을 떨어뜨린다.',indigo:'보랏빛 열매를 던져 떠다니는 적을 얼려 버린다.',lilac:'꽃잎을 흩날려 떠다니는 적의 속도를 늦춘다.',hotpink:'풍선껌을 불어 날려 빨간 적을 약하게 만든다.',ruby:'붉은 보석에서 광선을 쏘아 빨간 적을 정지시킨다.',hacienda:'올가미를 던지는 목동. 천사에게 초데미지를 주는 일격을 날린다.'});
// Hidden abilities (hiddenAbility) stay '???' until Into the Future opens (chapter-3 Moon cleared), then show for real.
function futureOpen(){return cleared.includes(MAIN_STAGE_COUNT-1)}
const HIDDEN_REVEAL={cornflower:{role:'원거리 · 에이리언 정지 · 초데미지',evo:'정지가 더 자주 · 더 오래',
 profile:'우주에서 온 대원. 냉각 광선으로 에이리언을 가끔 멈춰 세우고, 에이리언에게 굉장히 아픈 일격을 날린다.',
 profileEvo:'우주복이 한층 두꺼워졌다. 냉각 광선이 강해져 에이리언을 더 자주, 더 오래 멈춰 세운다.'}};
function revealHiddenAbilities(){if(!futureOpen())return;for(const [t,r] of Object.entries(HIDDEN_REVEAL)){ROLES[t]=r.role;EVOLUTION_TEXT[t]=r.evo;PROFILE_TEXT[t]=r.profile;PROFILE_TEXT_EVOLVED[t]=r.profileEvo}}
revealHiddenAbilities();
const PROFILE_CALIB={
 red:{base:{size:629,x:-9,y:-19},evolved:{size:556,x:-8,y:-281}},
 orange:{base:{size:592,x:-165,y:-15},evolved:{size:558,x:-148,y:-283}},
 yellow:{base:{size:585,x:-304,y:-13},evolved:{size:554,x:-284,y:-280}},
 green:{base:{size:581,x:-446,y:-12},evolved:{size:560,x:-427,y:-284}},
 cyan:{base:{size:566,x:-11,y:-148},evolved:{size:554,x:-8,y:-419}},
 blue:{base:{size:622,x:-163,y:-167},evolved:{size:556,x:-145,y:-420}},
 purple:{base:{size:570,x:-296,y:-149},evolved:{size:556,x:-285,y:-420}},
 pink:{base:{size:635,x:-496,y:-167},evolved:{size:552,x:-419,y:-415}}
};
const NEW_PROFILE_SHEET='assets/new_chars_profiles.webp';
const NEW_PROFILE_ORDER=['crimson','gold','ivory','chartreuse','mint','azure','crystal','lavender','salmon','raspberry'];
// The 5x2 grid isn't evenly split across the full square canvas - the artwork sits in a
// band with large blank margins above/below, so a naive 500%/200% percentage crop cuts
// off each portrait. Calibrated per-character like PROFILE_CALIB below instead.
const NEW_PROFILE_CALIB={
 crimson:{size:693,x:-10,y:-179},
 gold:{size:705,x:-151,y:-186},
 ivory:{size:702,x:-288,y:-182},
 chartreuse:{size:699,x:-425,y:-181},
 mint:{size:696,x:-561,y:-180},
 azure:{size:693,x:-10,y:-395},
 crystal:{size:705,x:-151,y:-403},
 lavender:{size:702,x:-288,y:-400},
 salmon:{size:699,x:-425,y:-399},
 raspberry:{size:696,x:-561,y:-397}
};
function profileMarkup(type,evolved){
 const idx=NEW_PROFILE_ORDER.indexOf(type);
 const evoArt=NEW_ATLASES[type]?.evolved;
 if(type==='onyx'&&!evolved)return `<div class="generated-profile" role="img" aria-label="오닉스 프로필" style="background-image:url(${ONYX_PROFILE});background-size:cover;background-position:center"></div>`;
 if((idx>=0||type==='onyx')&&evolved&&evoArt?.walk){// 2진: crop the idle walk pose out of the 2진 body sheet instead of the shared portrait sheet
  const [x,y,w,h]=evoArt.walk[0],k=+(112/Math.max(w,h)).toFixed(4);
  return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]} 2진 프로필" style="position:relative;overflow:hidden"><span style="position:absolute;left:${((126-w*k)/2).toFixed(1)}px;top:${((126-h*k)/2).toFixed(1)}px;width:${w}px;height:${h}px;background:url(${evoArt.sheet}) -${x}px -${y}px no-repeat;transform:scale(${k});transform-origin:0 0"></span></div>`}
 if(RARE_TYPES.includes(type)||EX_TYPES.includes(type)||SR_TYPES.includes(type)){const a=NEW_ATLASES[type],art=evolved&&a.evolved?a.evolved:a,[x,y,w,h]=art.walk[0],k=+(112/Math.max(w,h)).toFixed(4);
  return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]}${evolved?' 2진':''} 프로필" style="position:relative;overflow:hidden"><span style="position:absolute;left:${((126-w*k)/2).toFixed(1)}px;top:${((126-h*k)/2).toFixed(1)}px;width:${w}px;height:${h}px;background:url(${art.sheet}) -${x}px -${y}px no-repeat;transform:scale(${k});transform-origin:0 0"></span></div>`}
 if(idx>=0){const c=NEW_PROFILE_CALIB[type];return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]}${evolved?' 2진':''} 프로필" style="background-image:url(${NEW_PROFILE_SHEET});background-size:${c.size}px ${c.size}px;background-position:${c.x}px ${c.y}px"></div>`}
 const c=PROFILE_CALIB[type][evolved?'evolved':'base'];return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]}${evolved?' 2진':''} 프로필" style="background-image:url(${PROFILE_SHEET});background-size:${c.size}px ${c.size}px;background-position:${c.x}px ${c.y}px"></div>`}
const LV_EVOLVE=10,LV_MAX=20,HP_CURVE=.6,HP_LV10_MULT=1.8*2/1.15;// HP: Lv.11~20 front-loaded; Lv.10 is a jump so the 2진 (+15% HP) has 2x the Lv.9 HP
const LEVEL_HARD_MAX=40;// 랭크 보상으로 늘어날 수 있는 레벨 상한의 절대 한계 (저장값 보호용)
function overMult(level){return 1+.04*Math.max(0,level-LV_MAX)}// Lv.21 이상: 레벨당 체력·공격력 +4%
function levelCapOf(t){const c=levelCap();return c<LV_MAX?c:Math.max(c,typeof rankCapOf==='function'?rankCapOf(gradeOf(t)):c)+(t==='ribbonorange'&&ribbonSave.cap?5:0)}// 등급별 상한: 기본 20 + 랭크 보상(rank.js)
function levelCap(){return cleared.includes(CHAPTER1_LEN*2-1)?LV_MAX:LV_EVOLVE}// Lv.11~20 unlocks after clearing the last chapter-2 stage
const ECON_COST=[1000,2000,4000,8000,16000,32000,43000,58000,78000,105000,142000,192000,259000,350000,473000,639000,863000,1165000,1573000,2124000],WALLET_STEP=400,PROD_STEP=.15,STUDY_STEP=.08,ACC_STEP=.12;// permanent XP upgrades (max Lv.20; costs double up to Lv.6, then grow x1.35 per level; 성 체력 stays Lv.10): wallet cap +400/level, money rate +15%/level, 공부력 (clear XP) +8%/level, 회계력 (money per kill) +12%/level
let training={xp:0,baseLevel:1,levels:Object.fromEntries(ALLIES.map(t=>[t,1])),forms:{},walletLevel:0,prodLevel:0,studyLevel:0,accLevel:0},trainingSaveFailed=false;
function stageXP(i){return STAGES[i]?.future?STAGES[i].xp:(200+i*50)*2}
try{
 const raw=localStorage.getItem('red-battle-training-v1');
 if(raw){const saved=JSON.parse(raw);training.xp=Number.isSafeInteger(saved.xp)&&saved.xp>=0?saved.xp:0;training.baseLevel=Number.isInteger(saved.baseLevel)?Math.max(1,Math.min(10,saved.baseLevel)):1;for(const t of ALLIES){const n=saved.levels?.[t];training.levels[t]=Number.isInteger(n)?Math.max(1,Math.min(LEVEL_HARD_MAX,n)):1;if(saved.forms?.[t]===1)training.forms[t]=1}for(const k of ['walletLevel','prodLevel','studyLevel','accLevel']){const n=saved[k];training[k]=Number.isInteger(n)?Math.max(0,Math.min(ECON_COST.length,n)):0}}
 else{training.xp=cleared.reduce((sum,i)=>sum+stageXP(i),0);saveTraining()}
}catch{trainingSaveFailed=true}
function saveTraining(){try{localStorage.setItem('red-battle-training-v1',JSON.stringify(training));trainingSaveFailed=false}catch{trainingSaveFailed=true}}
// Lv.1~10 keeps the original +10%/level curve; Lv.11~20 grows geometrically toward these Lv.20 values (evolution bonuses apply on top).
const ATK_SLOPE={red:.55};// per-level ATK growth for Lv.1~10 (default .1); red's 15 ATK could not even kill a Doge at Lv.10
const LV20_TARGET={
 red:{hp:9000,atk:800},
 orange:{hp:9600,atk:2200},
 yellow:{hp:27750,atk:1554},
 green:{hp:11300,atk:1800},
 cyan:{hp:8700,atk:3000},
 blue:{hp:10400,atk:450},
 purple:{hp:19100,atk:2100},
 pink:{hp:17400,atk:2400},
 crimson:{hp:26000,atk:4150},
 gold:{hp:22844,atk:1794},
 ivory:{hp:20900,atk:3900},
 chartreuse:{hp:19100,atk:850},
 mint:{hp:20900,atk:3600},
 azure:{hp:23500,atk:4000},
 crystal:{hp:21700,atk:4200},
 lavender:{hp:17400,atk:3200},
 salmon:{hp:20345,atk:5200},
 raspberry:{hp:18145,atk:1471},
 onyx:{hp:44080,atk:7540},
 black:{hp:28493,atk:2226},white:{hp:12000,atk:850},maroon:{hp:16963,atk:2474},brown:{hp:28990,atk:1226},tan:{hp:17600,atk:1800},beige:{hp:22400,atk:3150},cream:{hp:25424,atk:1816},olive:{hp:19200,atk:1700},clover:{hp:18157,atk:2594},indigo:{hp:17936,atk:2578},lilac:{hp:17600,atk:1900},hotpink:{hp:15782,atk:2302},ruby:{hp:19200,atk:2750},hacienda:{hp:18112,atk:2151},
 garnet:{hp:123400,atk:19744},prism:{hp:26000,atk:37600},rainbow:{hp:30000,atk:16000},// 프리즘 Lv.20 공격력 = 레드 2진 DPS(800)의 10배 ÷ 공격 주기 5.4초 ÷ 2진 +15%
 
 plum:{hp:16358,atk:3408},forest:{hp:47424,atk:5242},canary:{hp:19200,atk:3800},cherry:{hp:25178,atk:4496},mauve:{hp:22493,atk:4601},khaki:{hp:13400,atk:5500},tangerine:{hp:28800,atk:3800},burgundy:{hp:38570,atk:5290},mustard:{hp:32000,atk:5200},sky:{hp:19680,atk:4674},denim:{hp:31667,atk:5690},charcoal:{hp:15400,atk:4000},
 cornflower:{hp:16000,atk:5500},bittersweet:{hp:22400,atk:4400},claret:{hp:14800,atk:3200},verdigris:{hp:32000,atk:4200},
 ribbonorange:{hp:22000,atk:4000},lapis:{hp:34800,atk:3712},selenite:{hp:23180,atk:5216},topaz:{hp:20128,atk:4780},maple:{hp:28262,atk:3696},brick:{hp:15300,atk:4250},korn:{hp:12000,atk:3300},teal:{hp:16290,atk:4996},violet:{hp:12000,atk:1300},orchid:{hp:30000,atk:9000},
 cobalt:{hp:13600,atk:4250},flame:{hp:11050,atk:1870},scarlet:{hp:13005,atk:1530},moss:{hp:8460,atk:1154},coral:{hp:4949,atk:2020},aqua:{hp:8550,atk:914},cooper:{hp:11390,atk:1410},navy:{hp:13600,atk:5440},dandelion:{hp:12000,atk:2470},babyblue:{hp:5950,atk:730},mintcyan:{hp:6800,atk:1275},peach:{hp:12750,atk:917},lightcream:{hp:11390,atk:1410},midnight:{hp:3599,atk:800},darklilac:{hp:7799,atk:2965},fusioncream:{hp:17000,atk:1190},silver:{hp:13600,atk:6800},lava:{hp:26350,atk:12155},babypink:{hp:12240,atk:6800},magenta:{hp:30600,atk:12240}
};
function levelMult(base,target,level,curve=1,m10Hp=null,slope=.1){
 const lv=Math.min(level,LV_MAX),m10=m10Hp||1+slope*(LV_EVOLVE-1);
 if(!target||lv<LV_EVOLVE)return 1+slope*(lv-1);
 if(lv===LV_EVOLVE)return m10;
 return m10*Math.pow(Math.max(target/base,m10)/m10,Math.pow((lv-LV_EVOLVE)/(LV_MAX-LV_EVOLVE),curve));
}
// Extra 2진 effects beyond the shared +15% HP/ATK and range: [stat overrides applied on top of the base stats].
const evoMez=(ck,dk)=>d=>({[ck]:Math.min(1,d[ck]+.15),[dk]:d[dk]+.5});// 2진 메즈: chance +15%p, duration +0.5s
const EVO_EXTRA={
 red:d=>({knockbacks:d.knockbacks+1,cooldown:d.cooldown*.8}),
 orange:()=>({killGold:1}),
 yellow:()=>({armor:.85}),
 green:d=>({cooldown:d.cooldown*.85}),
 cyan:()=>({floatDamage:1.8,floatResist:.4}),
 blue:d=>({speed:d.speed*1.25}),
 purple:()=>({bossDamage:1.3}),
 pink:()=>({slowChance:.3,slowDuration:1.5}),
 crimson:()=>({bossDamage:1.3}),
 gold:()=>({killGold:1}),
 ivory:d=>({cooldown:d.cooldown*.85}),
 chartreuse:d=>({multiHit:d.multiHit+1}),
 mint:d=>({freezeDuration:(d.freezeDuration||1.5)+.5}),
 azure:()=>({critChance:.2,critMult:2}),
 crystal:d=>({pierce:(d.pierce||1)+1}),
 lavender:d=>({atkDownDuration:(d.atkDownDuration||4)+2}),
 salmon:d=>({cooldown:d.cooldown*.85}),
 raspberry:d=>({windup:d.windup*.75}),
 onyx:()=>({bossDamage:2,knockbacks:4}),
 indigo:evoMez('freezeChance','freezeDuration'),ruby:evoMez('freezeChance','freezeDuration'),beige:evoMez('freezeChance','freezeDuration'),
 lilac:evoMez('slowChance','slowDuration'),maroon:evoMez('slowChance','slowDuration'),cream:evoMez('slowChance','slowDuration'),tan:evoMez('slowChance','slowDuration'),
 olive:evoMez('atkDownChance','atkDownDuration'),hotpink:evoMez('atkDownChance','atkDownDuration'),clover:evoMez('atkDownChance','atkDownDuration'),
 brown:()=>({resistMult:.2}),white:d=>({cooldown:d.cooldown*.8}),
 garnet:d=>({survive:.45,knockbacks:d.knockbacks+1}),prism:d=>({push:9,zoneMax:d.zoneMax*1.1,cooldown:d.cooldown*.85}),
 plum:evoMez('atkDownChance','atkDownDuration'),canary:evoMez('freezeChance','freezeDuration'),mauve:evoMez('freezeChance','freezeDuration'),sky:evoMez('freezeChance','freezeDuration'),
 tangerine:evoMez('slowChance','slowDuration'),charcoal:evoMez('intervalUpChance','intervalUpDuration'),
 cornflower:evoMez('freezeChance','freezeDuration'),bittersweet:d=>({critChance:Math.min(1,d.critChance+.15)}),
 claret:()=>({killGold:.5}),rainbow:d=>({cooldown:d.cooldown*.85}),
 korn:d=>({killGold:1}),teal:evoMez('atkDownChance','atkDownDuration'),violet:evoMez('slowChance','slowDuration'),orchid:d=>({cooldown:d.cooldown*.85,surge:{...d.surge,end:d.surge.end+6}}),
 moss:evoMez('slowChance','slowDuration'),aqua:evoMez('slowChance','slowDuration'),cooper:d=>({freezeChance:Math.min(1,d.freezeChance+.15)}),dandelion:evoMez('slowChance','slowDuration'),midnight:evoMez('freezeChance','freezeDuration'),darklilac:evoMez('atkDownChance','atkDownDuration'),babypink:evoMez('slowChance','slowDuration'),lightcream:d=>({critChance:Math.min(1,d.critChance+.1)}),silver:d=>({cooldown:d.cooldown*.85}),mintcyan:d=>({survive:Math.min(1,d.survive+.15)}),babyblue:d=>({blowChance:Math.min(1,d.blowChance+.15),blowDistance:d.blowDistance+4}),magenta:d=>({cooldown:d.cooldown*.85,wave:{...d.wave,reach:d.wave.reach+6}}),
 ribbonorange:d=>({freezeChance:Math.min(1,d.freezeChance+.15),freezeDuration:d.freezeDuration+.5}),lapis:d=>({critChance:Math.min(1,d.critChance+.15),speed:d.speed*1.2}),selenite:d=>({wave:{...d.wave,chance:Math.min(1,d.wave.chance+.15),reach:d.wave.reach+6}}),topaz:d=>({killGold:1.5,cooldown:d.cooldown*.85}),verdigris:d=>({blowChance:Math.min(1,d.blowChance+.15),blowDistance:d.blowDistance+4})
};
const EVO_ATK_BONUS={red:1.2,pink:1.15,crimson:1.2,gold:1.2,chartreuse:1.2,azure:1.2,onyx:1.2,black:1.2,hacienda:1.2,forest:1.2,burgundy:1.2,denim:1.2,khaki:1.2,mustard:1.2,cherry:1.2,claret:1.2,verdigris:1.2,rainbow:1.2,cobalt:1.2,flame:1.2,scarlet:1.2,coral:1.2,navy:1.2,lava:1.2,fusioncream:1.2};// 2진 with a dedicated atk bonus; everyone else gets the generic +15% (hp is always +15%, yellow +20%)
function unitCost(t){return ALLIES.includes(t)?unitStats(t).cost:data.units[t].cost}
// 2진 비용 배율: 기본 ×2, 레어 ×1.3, 슈퍼 레어 ×1.4, EX·울슈레 ×1.5 (5원 단위로 반올림)
const EVO_COST_MULT={basic:2,rare:1.3,sr:1.4,ex:1.5,uber:1.5};
// 전체 아군 비용 ×1.3 (레드와 1·2진 같은 가격인 울슈레는 제외): 너무 쉬워서 인상
const COST_SCALE=1.3;
function scaledCost(type,c){const d=data.units[type];return type==='red'||d?.flatCost?c:Math.round(c*COST_SCALE/5)*5}
function evoCost(type,base){const fixed=data.units[type]?.evoCost;if(fixed)return fixed;// evoCost: 2진 가격을 직접 지정 (레드 75, 블루 500)
 if(data.units[type]?.flatCost)return base;return Math.round(base*EVO_COST_MULT[gradeOf(type)]/5)*5}// flatCost: 울슈레는 1·2진 같은 가격
function unitStats(type,level=training.levels[type]||1,form=training.forms?.[type]===1?1:2){const d=data.units[type],T=LV20_TARGET[type],hpM=levelMult(d.hp,T?.hp,level,HP_CURVE,d.noEvolve?null:HP_LV10_MULT)*overMult(level),atkM=levelMult(d.atk,T?.atk,level,1,null,ATK_SLOPE[type])*overMult(level),mag=ALLIES.includes(type)?1:enemyMagnification()*(hasTrait(d,'alien')?alienMagnification():1),stats={...d,hp:Math.round(d.hp*hpM*mag),atk:Math.round(d.atk*atkM*mag)};if(ALLIES.includes(type))stats.cost=scaledCost(type,d.cost);if(d.damageTiers)stats.damageTiers=d.damageTiers.map(t=>({...t,dmg:Math.round(t.dmg*atkM)}));if(level<LV_EVOLVE||form===1||d.noEvolve)return stats;stats.evolved=true;stats.cost=evoCost(type,scaledCost(type,d.cost));stats.hp=Math.round(stats.hp*(type==='yellow'?1.2:1.15));if(!EVO_ATK_BONUS[type]){const k=1.15;stats.atk=Math.round(stats.atk*k);if(stats.damageTiers)stats.damageTiers=stats.damageTiers.map(t=>({...t,dmg:Math.round(t.dmg*k)}))}stats.range=type==='raspberry'?d.range*1.1:d.noRangeGrow?d.range:d.range*1.2;if(d.engageRange)stats.engageRange=d.engageRange*1.2;if(type==='red')stats.atk=Math.round(stats.atk*1.2);if(type==='orange')stats.splash=d.splash*1.35;if(type==='green')stats.returnMult=1.35;if(type==='cyan')stats.splash=d.splash*1.3;if(type==='blue')stats.interval=d.interval*.8;if(type==='purple'){stats.redDamage=1.8;stats.redResist=.4}if(type==='pink')stats.atk=Math.round(stats.atk*1.15);
 if(type==='crimson')stats.atk=Math.round(stats.atk*1.2);
 if(['black','hacienda','forest','burgundy','denim','khaki','mustard','cherry','claret','verdigris','rainbow','cobalt','flame','scarlet','coral','navy','lava','fusioncream'].includes(type))stats.atk=Math.round(stats.atk*1.2);
 if(type==='gold')stats.atk=Math.round(stats.atk*1.2);
 if(type==='ivory'){stats.slowChance=.6;stats.slowDuration=d.slowDuration+.5}
 if(type==='chartreuse')stats.atk=Math.round(stats.atk*1.2);
 if(type==='mint')stats.freezeChance=.4;
 if(type==='azure')stats.atk=Math.round(stats.atk*1.2);
 if(type==='crystal'){stats.floatDamage=1.8;stats.floatResist=.4}
 if(type==='lavender')stats.atkDownChance=.6;
 if(type==='salmon')stats.pullDistance=5;
 if(type==='raspberry'){stats.condPierceDist=25;stats.condPierceCount=1}
 if(EVO_EXTRA[type])Object.assign(stats,EVO_EXTRA[type](d));
 return stats}
function allyUnlocked(t){return ALWAYS_UNLOCKED.has(t)||cleared.some(i=>i>=UNLOCK_AT[t])}
const DECK_SIZE=10;
let deck=['red'];
try{
 const raw=localStorage.getItem('red-battle-deck-v1');
 if(raw){const saved=JSON.parse(raw);if(Array.isArray(saved))deck=[...new Set(saved.filter(t=>ALLIES.includes(t)))].slice(0,DECK_SIZE)}
}catch{}
function saveDeck(){try{localStorage.setItem('red-battle-deck-v1',JSON.stringify(deck))}catch{}}
function toggleDeck(t){
 if(!allyUnlocked(t))return;
 if(deck.includes(t))deck=deck.filter(x=>x!==t);
 else if(deck.length<DECK_SIZE)deck.push(t);
 saveDeck();renderTraining();render();
}
function renderDeckButtons(){const tutorialActive=game&&game.tutorial<6;for(const t of ALLIES)$(t==='red'?'#spawnBtn':'#'+t+'Btn').hidden=!allyUnlocked(t)||!deck.includes(t)&&!(t==='red'&&tutorialActive)}
let speedTickets=0;
try{const raw=localStorage.getItem('red-battle-speed-v1');const n=parseInt(raw,10);if(Number.isInteger(n)&&n>=0)speedTickets=n}catch{}
function saveSpeedTickets(){try{localStorage.setItem('red-battle-speed-v1',String(speedTickets))}catch{}}
let nyancom=0;// 야옹컴 count (Friday stage drops / XP shop); 1 per auto-battle, 2 per 황금 야옹컴 sweep
try{const raw=localStorage.getItem('red-battle-nyancom-v1');const n=parseInt(raw,10);if(Number.isInteger(n)&&n>=0)nyancom=n}catch{}
function saveNyancom(){try{localStorage.setItem('red-battle-nyancom-v1',String(nyancom))}catch{}}
// Item-Lock (original: the padlock at the end of the pre-battle item row keeps chosen items selected for
// every stage). Here: a locked 배속/야옹컴 switches itself on when each battle starts, spending one item as usual.
let itemLock={speed:false,cpu:false};
try{const saved=JSON.parse(localStorage.getItem('red-battle-itemlock-v1')||'{}');itemLock.speed=saved.speed===true;itemLock.cpu=saved.cpu===true}catch{}
function saveItemLock(){try{localStorage.setItem('red-battle-itemlock-v1',JSON.stringify(itemLock))}catch{}}
// Battle boosts (weekday-stage drops, XP shop): each can be switched on once per battle.
//   고양이 박사: this battle's XP x2 · 부자 고양이: +50% of the wallet cap at once · 스냥이퍼: every 4s knocks the front enemy back (not bosses).
const BOOSTS={doctor:{icon:'📚',desc:'이번 전투 XP 2배'},rich:{icon:'💰',desc:'지갑 최대치의 50%를 바로 받음'},sniper:{icon:'🎯',desc:'4초마다 맨 앞 적(보스 제외)을 밀어냄'}};
const BOOST_PACK={count:3,xp:1500};
let boosts={doctor:0,rich:0,sniper:0};
try{const saved=JSON.parse(localStorage.getItem('red-battle-boosts-v1')||'{}');for(const k in boosts)if(Number.isInteger(saved[k])&&saved[k]>=0)boosts[k]=saved[k]}catch{}
function saveBoosts(){try{localStorage.setItem('red-battle-boosts-v1',JSON.stringify(boosts))}catch{}}
function boostActive(k){return !!game.boostUsed?.[k]}
function useBoost(k){if(!BOOSTS[k]||!game.running||game.ended||game.paused||game.tutorial<6||boostActive(k)||boosts[k]<=0)return false;boosts[k]--;saveBoosts();(game.boostUsed||(game.boostUsed={}))[k]=true;
 if(k==='rich')game.money=Math.min(walletMax(),game.money+walletMax()*.5);if(k==='sniper')game.sniperCd=0;renderBoostButtons();render();return true}
const SNIPER_INTERVAL=4;
function tickSniper(dt){if(!boostActive('sniper'))return;game.sniperCd=(game.sniperCd||0)-dt;if(game.sniperCd>0)return;
 const front=game.units.filter(v=>!v.ally&&v.hp>0&&!v.emerging&&!v.boss&&!(v.kbTime>0)).sort((a,b)=>b.x-a.x)[0];
 game.sniperCd=front?SNIPER_INTERVAL:.5;if(front)startHitback(front)}
function renderBoostButtons(){for(const k in BOOSTS){const b=$('#boost-'+k);if(!b)continue;const on=boostActive(k);b.querySelector('small').textContent=on?'사용 중':boosts[k];b.classList.toggle('active',on);b.disabled=on||boosts[k]<=0||game.ended||!game.running||game.tutorial<6;b.title=`${BOOST_NAME[k]}: ${BOOSTS[k].desc}${on?' (사용 중)':` · 보유 ${boosts[k]}개`}`}}
for(const k in BOOSTS){const b=$('#boost-'+k);if(b)b.onclick=()=>useBoost(k)}
function buyBoostPack(k){if(training.xp<BOOST_PACK.xp)return false;training.xp-=BOOST_PACK.xp;boosts[k]+=BOOST_PACK.count;saveTraining();saveBoosts();renderStageMenu();render();return true}
function ribbonReady(){return !!NEW_ATLASES.ribbonorange}
function specialDropOpen(sp){if(sp.item==='ribboncap')return !ribbonSave.cap;return sp.item!=='ribbonorange'||(ribbonReady()&&!(typeof gachaOwns==='function'&&gachaOwns('ribbonorange')))}
function giveSpecialItem(item,n){if(item==='ribbonorange'){grantEx('ribbonorange');return}if(item==='ribboncap'){ribbonSave.cap=true;saveRibbon();return}if(item==='nyancom'){nyancom+=n;saveNyancom()}else if(BOOSTS[item]){boosts[item]+=n;saveBoosts()}else if(item==='all'){for(const k in BOOSTS)boosts[k]+=n;saveBoosts()}else{speedTickets+=n;saveSpeedTickets()}renderSpeedButton();renderNyancomButton();renderBoostButtons()}
function specialItemText(item,n){if(item==='ribbonorange')return 'EX 리본 오렌지 획득!';if(item==='ribboncap')return '리본 오렌지 레벨 상한 +5!';if(item==='all')return `부스트 3종(${Object.keys(BOOSTS).map(k=>BOOST_NAME[k]).join('·')}) 각 ${n}개 획득!`;const name=item==='nyancom'?'야옹컴':BOOSTS[item]?BOOST_NAME[item]:'스피드업',held=item==='nyancom'?nyancom:BOOSTS[item]?boosts[item]:speedTickets;return `${name} ${n}개 획득! (보유 ${held}개)`}
function useSpeedItem(){if(game.speedUnlocked||speedTickets<=0)return false;speedTickets--;saveSpeedTickets();game.speedUnlocked=true;game.speedMultiplier=2;return true}
function useCpuItem(){if(game.autoUnlocked||nyancom<=0||game.tutorial<6)return false;nyancom--;saveNyancom();game.autoUnlocked=true;game.auto=true;return true}
// Runs once per battle, on its first unpaused tick (so the paused battle behind the menu on page load spends nothing).
function applyItemLocks(){game.itemLocksApplied=true;if(itemLock.speed)useSpeedItem();if(itemLock.cpu)useCpuItem();renderSpeedButton();renderNyancomButton()}
function renderItemLocks(){for(const [k,id,name] of [['speed','#speedLock','배속'],['cpu','#nyancomLock','야옹컴']]){const b=$(id);if(!b)continue;b.textContent=itemLock[k]?'🔒':'🔓';b.classList.toggle('active',itemLock[k]);b.title=itemLock[k]?`${name} 잠금 중: 전투가 시작되면 자동으로 켜집니다 (1개 사용)`:`${name} 잠금: 누르면 전투마다 자동으로 켜집니다`;b.setAttribute('aria-pressed',itemLock[k])}}
for(const [k,id] of [['speed','#speedLock'],['cpu','#nyancomLock']])$(id).onclick=()=>{itemLock[k]=!itemLock[k];saveItemLock();
 // locking mid-battle also switches the item on now if this battle hasn't used it yet
 if(itemLock[k]&&game.running&&!game.ended&&game.itemLocksApplied){if(k==='speed')useSpeedItem();else useCpuItem()}
 renderItemLocks();renderSpeedButton();renderNyancomButton()};
renderItemLocks();
function renderNyancomButton(){
 const b=$('#nyancomBtn');if(!b)return;
 b.firstChild.textContent=game.auto?'야옹컴 작동 중':'야옹컴';
 b.querySelector('small').textContent=game.autoUnlocked?'':`${nyancom}개`;
 b.classList.toggle('active',!!game.auto);
 b.disabled=game.ended||!game.running||game.tutorial<6||(!game.autoUnlocked&&nyancom<=0);
}
$('#nyancomBtn').onclick=()=>{
 if(game.ended||!game.running||game.tutorial<6)return;
 if(!game.autoUnlocked){if(!useCpuItem())return}
 else game.auto=!game.auto;
 renderNyancomButton();
};
function renderSpeedButton(){
 const b=$('#speedBtn');
 b.firstChild.textContent=game.speedMultiplier===2?'2배속':'1배속';
 b.querySelector('small').textContent=game.speedUnlocked?'':`배속권 ${speedTickets}개`;
 b.disabled=!game.speedUnlocked&&speedTickets<=0;
}
$('#speedBtn').onclick=()=>{
 if(!game.speedUnlocked){
  if(!useSpeedItem())return;
 }else{
  game.speedMultiplier=game.speedMultiplier===2?1:2;
 }
 renderSpeedButton();
};
function setForm(t,f){if(!ALLIES.includes(t)||training.levels[t]<LV_EVOLVE)return false;if(f===1)training.forms[t]=1;else delete training.forms[t];saveTraining();renderTraining();render();return true}
function upgradeCost(t){return training.levels[t]*100}
function upgradeCharacter(t){if(!ALLIES.includes(t)||!allyUnlocked(t)||training.levels[t]>=levelCapOf(t)||training.xp<upgradeCost(t))return false;training.xp-=upgradeCost(t);training.levels[t]++;saveTraining();renderTraining();renderBaseUpgrade();render();return true}
function studyMult(){return 1+STUDY_STEP*training.studyLevel}
function studyXP(n){return Math.round(n*studyMult())}
// 1·2·3장 클리어 보너스: 각 장의 달을 처음 깨면 영구히 지갑 상한 +1,000 · 돈 생산 속도 +15% · 적 처치 시 받는 돈 +15% (XP 강화와 합산)
const CHAPTER_FINALS=[CHAPTER1_LEN-1,CHAPTER1_LEN*2-1,MAIN_STAGE_COUNT-1],CHAPTER_BONUS={wallet:1000,rate:.15,gold:.15};
function chapterBonusCount(){return CHAPTER_FINALS.filter(i=>cleared.includes(i)).length}
function accMult(){return 1+ACC_STEP*training.accLevel+CHAPTER_BONUS.gold*chapterBonusCount()}
function walletMax(lv=game.level){return data.income[lv].max+WALLET_STEP*training.walletLevel+CHAPTER_BONUS.wallet*chapterBonusCount()}
function incomeRate(lv=game.level){return data.income[lv].rate*(1+PROD_STEP*training.prodLevel+CHAPTER_BONUS.rate*chapterBonusCount())}
function upgradeEcon(k){const l=training[k];if(l>=ECON_COST.length||training.xp<ECON_COST[l])return false;training.xp-=ECON_COST[l];training[k]++;saveTraining();renderBaseUpgrade();renderTraining();if(typeof render==='function')render();return true}
function baseHpFor(level=training.baseLevel){return Math.round(2000*(1+.1*(level-1)))}
function baseHpCost(){return training.baseLevel*150}
function upgradeBase(){if(training.baseLevel>=10||training.xp<baseHpCost())return false;training.xp-=baseHpCost();training.baseLevel++;saveTraining();renderBaseUpgrade();renderTraining();return true}
function renderBaseUpgrade(){
 const grid=$('#baseGrid');grid.innerHTML='';
 const l=training.baseLevel,hp=baseHpFor(l),next=baseHpFor(Math.min(10,l+1)),card=document.createElement('article');card.className='training-card';
 card.innerHTML=`<h3>아군 성 체력 <small>Lv.${l} / 10</small></h3><p>기지 방어력 강화<br>체력 ${hp}${l<10?' → '+next:''}</p>`;
 const b=document.createElement('button');b.textContent=l===10?'최대 레벨':baseHpCost()+' XP · 강화';b.disabled=l>=10||training.xp<baseHpCost();b.onclick=()=>upgradeBase();card.append(b);
 grid.append(card);
 {const n=chapterBonusCount(),c=document.createElement('article');c.className='training-card';c.innerHTML=`<h3>장 클리어 보너스 <small>${n} / 3장</small></h3><p>1·2·3장의 달을 처음 깨면 영구 적용<br>지갑 +${(CHAPTER_BONUS.wallet*n).toLocaleString()}원 · 생산 +${Math.round(CHAPTER_BONUS.rate*n*100)}% · 처치 시 돈 +${Math.round(CHAPTER_BONUS.gold*n*100)}%<br><small>장마다 지갑 +${CHAPTER_BONUS.wallet.toLocaleString()} · 생산 +${Math.round(CHAPTER_BONUS.rate*100)}% · 처치 시 돈 +${Math.round(CHAPTER_BONUS.gold*100)}%</small></p>`;grid.append(c)}
 for(const[k,title,desc,fmt]of[['walletLevel','지갑 상한','전투 중 보유할 수 있는 돈의 상한',n=>'+'+WALLET_STEP*n+'원'],['prodLevel','돈 생산력','시간당 돈이 모이는 속도',n=>'+'+Math.round(PROD_STEP*n*100)+'%'],['studyLevel','공부력','스테이지 클리어 보상 XP 증가',n=>'+'+Math.round(STUDY_STEP*n*100)+'%'],['accLevel','회계력','적을 쓰러뜨릴 때 받는 돈 증가',n=>'+'+Math.round(ACC_STEP*n*100)+'%']]){const lv=training[k],max=ECON_COST.length,c=document.createElement('article');c.className='training-card';c.innerHTML=`<h3>${title} <small>Lv.${lv} / ${max}</small></h3><p>${desc}<br>${fmt(lv)}${lv<max?' → '+fmt(lv+1):''}</p>`;const eb=document.createElement('button');eb.textContent=lv>=max?'최대 레벨':ECON_COST[lv]+' XP · 강화';eb.disabled=lv>=max||training.xp<ECON_COST[lv];eb.onclick=()=>upgradeEcon(k);c.append(eb);grid.append(c)}
}
function awardXP(){const reward=studyXP(cleared.includes(selectedStage)?Math.floor(stageXP(selectedStage)/2):stageXP(selectedStage))*(boostActive('doctor')?2:1);training.xp+=reward;saveTraining();return reward}
function renderUnitLevels(){for(const t of ALLIES){const b=$(t==='red'?'#spawnBtn':'#'+t+'Btn'),d=unitStats(t),e=d.evolved;if(t==='red')b.querySelector('small').textContent=d.cost+'원';b.querySelector('strong').firstChild.nodeValue=UNIT_NAMES[t]+(e?' 2진':'')+' Lv.'+training.levels[t];b.title=`${ROLES[t]} · 체력 ${d.hp} · 공격력 ${d.atk} · 사거리 ${Math.round(d.range)} · 공격 주기 ${d.interval.toFixed(2)}초 · 이동 ${d.speed} · ${d.cost}원${t==='purple'?' · 빨간 적에게 강함':''}${t==='cyan'||t==='crystal'?' · 떠다니는 적에게 강함':''}${RARE_TYPES.includes(t)||EX_TYPES.includes(t)||SR_TYPES.includes(t)?' · '+codexTraitBadges(data.units[t]).slice(1).join(' · '):''}${e?' · 스틱맨 2진':''}`}}
// 등급 필터: 기본(레드~라즈베리 18명) · 레어 · 슈퍼 레어 · 울트라 슈퍼 레어 · EX
const GRADE_LIST=[['all','전체'],['basic','기본'],['rare','레어'],['sr','슈퍼 레어'],['uber','울트라 슈퍼 레어'],['ex','EX']];
const EX_GRADE=['onyx','garnet','lapis','selenite','topaz','ribbonorange'];
function gradeOf(t){return RARE_TYPES.includes(t)?'rare':SR_TYPES.includes(t)?'sr':(t==='prism'||t==='rainbow'||t==='orchid')?'uber':EX_GRADE.includes(t)?'ex':'basic'}
let gradeFilter='all';try{const g=localStorage.getItem('red-battle-grade-v1');if(GRADE_LIST.some(x=>x[0]===g))gradeFilter=g}catch{}
function gradeMatch(t){return gradeFilter==='all'||gradeOf(t)===gradeFilter}
function renderGradeTabs(){
 for(const id of ['#gradeTabs','#codexGradeTabs']){const box=$(id);if(!box)continue;box.innerHTML='';
  for(const [k,label] of GRADE_LIST){
   const all=k==='all'?null:ALLIES.filter(t=>gradeOf(t)===k),b=document.createElement('button');b.type='button';b.className='codex-tab grade-tab'+(gradeFilter===k?' active':'');
   b.textContent=all?`${label} ${all.filter(allyUnlocked).length}/${all.length}`:label;
   b.onclick=()=>{gradeFilter=k;try{localStorage.setItem('red-battle-grade-v1',k)}catch{}renderTraining();
    if(!$('#codexMenu').classList.contains('hidden')){const e=codexEntries();if(codexTab==='ally'&&e.length&&!e.includes(codexType)){codexType=e[0];codexEvolved=false;renderCodexPreview()}renderCodexGrid()}};
   box.append(b)}}
}
function renderTraining(){
 $('#xpText').textContent=training.xp+' XP';$('#trainingGrid').innerHTML='';
 $('#deckText').textContent=`출전 덱 ${deck.length} / ${DECK_SIZE} · 전투에는 덱에 넣은 아군만 나옵니다`;
 for(const t of ALLIES){const cap=levelCapOf(t),l=training.levels[t],d=unitStats(t),next=unitStats(t,Math.min(cap,l+1)),unlocked=allyUnlocked(t),inDeck=deck.includes(t),evolved=l>=LV_EVOLVE&&training.forms[t]!==1&&!d.noEvolve;if(!unlocked||!gradeMatch(t))continue;const card=document.createElement('article');card.className='training-card';card.innerHTML=`${profileMarkup(t,evolved)}<h3 style="color:${COLORS[t]}">${UNIT_NAMES[t]}${evolved?' 2진':''} <small>Lv.${l} / ${cap}</small>${ABILITY_ICONS[t]?`<span class="${ABILITY_ICONS[t][0]}-icon title-icon" aria-label="${ABILITY_ICONS[t][1]}" title="${ABILITY_ICONS[t][1]}"></span>`:''}</h3><p class="profile-copy"><strong>${ROLES[t]}</strong> · ${attackType(t)} 공격<br>${evolved?PROFILE_TEXT_EVOLVED[t]:PROFILE_TEXT[t]}${trainingAbilityLine(t)}</p>`;const b=document.createElement('button');b.textContent=!unlocked?STAGES[UNLOCK_AT[t]].name+(chapterTag(UNLOCK_AT[t]))+' 클리어로 해금':l>=cap?(cap<LV_MAX?'최대 Lv.10 · 2장 클리어 시 Lv.20':'최대 레벨'):upgradeCost(t)+' XP · 강화';b.disabled=!unlocked||l>=cap||training.xp<upgradeCost(t);b.onclick=()=>upgradeCharacter(t);card.append(b);
  if(unlocked){const db=document.createElement('button');db.className='deck-btn';db.textContent=inDeck?'덱에서 제외':deck.length>=DECK_SIZE?'덱 가득참':'덱에 추가';db.disabled=!inDeck&&deck.length>=DECK_SIZE;db.classList.toggle('active',inDeck);db.onclick=()=>toggleDeck(t);card.append(db)}
  if(unlocked&&l>=LV_EVOLVE&&!d.noEvolve){const fb=document.createElement('button');fb.className='form-btn';fb.textContent=evolved?'1진으로 변경 (약함)':'2진으로 변경';fb.onclick=()=>setForm(t,evolved?1:2);card.append(fb)}
  $('#trainingGrid').append(card)}
 const lockedCount=ALLIES.filter(t=>!allyUnlocked(t)).length;$('#lockedNote').textContent=lockedCount?`아직 얻지 못한 캐릭터 ${lockedCount}명 · 스테이지를 클리어하면 합류합니다`:'';
 $('#saveWarning').textContent=trainingSaveFailed?'브라우저 저장을 사용할 수 없습니다. 이번 플레이에서만 유지됩니다.':'';
}

function saveAll(){saveProgress();saveTraining();saveDeck();saveSpeedTickets();saveNyancom()}
addEventListener('pagehide',saveAll);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveAll()});

// Order is rough difficulty progression from Korea to the Moon; used only for codex browsing.
const ENEMY_ORDER=['dog','snache','guys','hippo','pigge','peng','gory','baa','croco','rabbit','squirrel','seal','leboin','kangaroo','mooth','rhino','bear','face','nyandam','bunbun','darkdog','metalhippo','stpigge','duche','celeboodle','dagshund','otta','mastera','sloth','magpie','assassinbear','owlbrow','bore','camelle','kory','raind','jkbunbun','shyboy','gorydark','shadowboxer','heavenlyhippoe','shibalien','kroxo','hyppoh','sael','maawth','lemurr','krabbe','liz56','ursamajor','phace','nimoy','clione'];
const ENEMY_TEXT={
 magpie:'반짝이는 건 뭐든 훔쳐 가는 까치 두목. 보석이 가득 든 보따리를 내리쳐 주변을 한꺼번에 공격하고, 성에는 2배 피해를 준다. 떠 있는 적. (리본 오렌지 강림 보스)',
 assassinbear:'어둠의 세계에서 살아온 암살 곰. 체력은 아주 낮지만 눈 깜짝할 새 달려와 멀리서도 한 방을 꽂는다. 검은 적. (레전드 스토리)',
 owlbrow:'어려 보이지만 78살인 부엉이. 날개를 펼쳐 넓게 공격한다. 떠 있는 적. (레전드 스토리)',
 bore:'자신이 늑대라고 믿다가 멧돼지인 걸 알고 빨개진 멧돼지. 공격이 매우 빠르다. 빨간 적. (레전드 스토리)',
 camelle:'사우나를 좋아하는 낙타. 긴 목으로 멀리서 공격하고, 성에는 4배 피해를 준다. (레전드 스토리)',
 kory:'｢파동｣을 뿜어내는 코알라. 발을 구르면 파동이 멀리까지 번지고, 성에는 4배 피해를 준다. (레전드 스토리)',
 raind:'12월만 되면 우울해지는 순록. 맞아도 계속 뒤로 밀려나지만 그만큼 자주 버틴다. (레전드 스토리)',
 jkbunbun:'맴매 선생의 인생을 바꾼 문호. 빨간 날개로 날아다니며 무거운 펀치를 날린다. 빨간·떠 있는 적. (레전드 스토리 보스)',
 duche:'꽥꽥거리며 다가오는 오리. 목을 쭉 내밀어 쪼아댄다. (레전드 스토리)',
 celeboodle:'진주 목걸이를 건 우아한 푸들. 발걸음이 빨라 순식간에 파고든다. (레전드 스토리)',
 dagshund:'두 발로 선 닥스훈트. 앞발로 땅을 내리쳐 주변을 휩쓴다. (레전드 스토리)',
 otta:'돌을 품고 다니는 수달. 그 돌로 힘껏 내리친다. (레전드 스토리)',
 mastera:'긴 혀를 휘두르는 개미핥기 스승. 사거리가 길고 한 방이 묵직하다. (레전드 스토리 보스)',
 sloth:'엎드린 채 느릿느릿 기어 오는 나무늘보. 느리지만 체력과 공격력이 엄청나다. (레전드 스토리 보스)',
 shibalien:'우주에서 온 에이리언 멍뭉이. 미래편 어디에나 나타나며 멍뭉이보다 훨씬 단단하다. 에이리언. (미래편)',
 kroxo:'눈이 툭 튀어나온 외계 아거. 작지만 빠른 연속 물기로 전선을 갉아먹는다. 에이리언. (미래편)',
 hyppoh:'하마양을 닮은 외계 생물. 큰 입으로 주변을 한꺼번에 물어뜯는다. 에이리언. (미래편)',
 sael:'더듬이를 숨긴 외계 바다레오파드. 입을 쩍 벌려 넓게 할퀸다. 에이리언. (미래편)',
 maawth:'날개를 펄럭이며 돌진하는 외계 나방. 빠르게 날아와 몸통 박치기를 한다. 에이리언. (미래편)',
 lemurr:'커다란 안경을 쓴 외계 원숭이. 펄쩍 뛰어올라 날카로운 손톱으로 할퀸다. 에이리언. (미래편)',
 krabbe:'하얀 소라 껍데기를 뒤집어쓴 외계 집게. 느리지만 매우 단단하다. 에이리언. (미래편)',
 phace:'푸른 피부의 대갈이군. 느리게 떠다니며 먼 거리까지 강력한 범위 공격을 한다. 에이리언 보스. (미래편)',
 ursamajor:'곰선생을 닮은 외계 곰. 긴 팔을 휘둘러 넓은 범위를 휩쓴다. 에이리언. (미래편)',
 clione:'소용돌이 무늬의 몸으로 떠다니는 파괴생물. 미래편 1장 달의 최종 보스. 에이리언. (미래편)',
 nimoy:'단발머리에 거대한 엄니를 가진 외계 멧돼지. 부유 대륙의 보스. 에이리언. (미래편)',
 liz56:'엘리자베스 2세의 먼 후손인 외계 돼지. 넉백이 많고 체력이 매우 높다. 에이리언. (미래편)',
 shyboy:'빨갛게 달아오른 대갈이군. 느리지만 먼 거리까지 범위 공격을 한다. 빨간 적. (미래편)',
 gorydark:'새카만 고릴라저씨. 빠른 주먹질로 몰아친다. 검은 적. (미래편)',
 shadowboxer:'새끼를 품은 검은 캥거류. 원투 펀치와 어퍼컷을 날린다. 검은 적. (미래편)',
 heavenlyhippoe:'천사의 날개를 단 하마양. 하마양보다 훨씬 빠르게 다가온다. 천사. (미래편)',
 dog:'가장 먼저 마주치는 흔한 잡병. 느리지 않은 속도로 꾸준히 밀려온다.',
 snache:'혀를 길게 뻗어 공격하는 정찰병. 멍뭉이보다 빠르게 접근해 온다.',
 metalhippo:'강철 갑옷을 두른 하마양. 치명타가 아니면 어떤 공격도 피해 1밖에 주지 못한다. 크리스탈·크림슨·라즈베리의 치명타가 열쇠. (레전드 스토리)',
 stpigge:'왕관을 쓴 거대한 돼지새끼. 넉백이 많고 공격이 빠르며 체력이 매우 높은 빨간 적. 퍼플을 활용하자. (레전드 스토리)',
 bunbun:'강철 건틀릿을 낀 뿔 달린 거구의 선생. 떠다니며 빠르게 다가와 1초마다 광역 펀치를 날리고, 웬만한 공격에는 끄떡없이 버틴다. (세계편 3장 달)',
 nyandam:'그림자 부하들이 떠받친 옥좌에 앉아 와인잔을 기울이는 악의 제왕. 느리지만 체력이 엄청나고, 그림자 손 떼로 먼 거리까지 휩쓴다. (세계편 2장 달)',
 darkdog:'고수익 암살 알바에 뛰어든 검은 멍뭉이. 체력은 낮지만 한 방이 무겁고, 맞아도 쉽게 물러나지 않는다. 검은 적. (레전드 스토리)',
 ectosnache:'유령이 된 낼름이. 낼름이보다 강한 혀 공격을 쉬지 않고 날린다. (레전드 스토리)',
 gabriel:'천사의 날개를 단 멍뭉이. 체력은 낮지만 눈 깜짝할 사이에 전선까지 돌격한다. (레전드 스토리)',
 guys:'세 마리가 함께 몰려다니며 공격력이 제법 매섭다. 다만 한 방이면 크게 휘청인다.',
 hippo:'두툼한 몸집으로 범위 공격을 가하는 초반 보스급 적. 은근히 단단하다.',
 pigge:'빨간 몸을 가진 범위 공격형 적. 퍼플에게는 약점을 보이지만 그 외엔 위협적이다.',
 peng:'빠른 몸놀림으로 순식간에 파고드는 펭귄. 공격 주기가 짧아 방심하면 계속 얻어맞는다.',
 gory:'주먹을 휘둘러 범위 피해를 주는 근육질 적. 공격 속도가 빨라 지속적으로 압박한다.',
 baa:'평범해 보이지만 묵직한 일격을 날리는 양. 전열에서 은근히 버텨낸다.',
 croco:'체력은 낮지만 빠르게 달려드는 소형 적. 물량으로 전선을 흔든다.',
 rabbit:'빨간 몸을 가진 날쌘 토끼. 속도가 빨라 순식간에 성문 앞까지 도달한다.',
 squirrel:'빠른 발놀림으로 이리저리 움직이는 다람쥐형 적. 공격 빈도가 잦다.',
 seal:'빨간 몸을 가진 바다표범형 적. 범위 공격 한 방이면 대부분의 아군이 넉백된다.',
 leboin:'긴 사거리에서 압도적인 한 방을 날리는 강적. 공격 주기가 길어 그 틈을 노려야 한다.',
 kangaroo:'육중한 몸으로 매우 빠르게 돌진하는 캥거루. 대응이 늦으면 순식간에 성벽까지 밀고 들어온다.',
 mooth:'공중을 떠다니는 나방형 적. 긴 사거리의 범위 공격을 반복해서 퍼붓는다.',
 rhino:'뿔로 넓은 범위를 가격하는 보스급 적. 체력과 공격력 모두 만만치 않다.',
 bear:'느리지만 압도적인 파괴력을 지닌 곰. 사거리도 넓어 미리 대비해야 한다.',
 face:'공중에 떠서 전장을 압도하는 최종 보스. 넓은 범위와 강력한 한 방으로 아군 전열을 무너뜨린다.'
};
// Every character attacks one of three ways: 원거리 (reaches far: range >= LONG_RANGE_MIN),
// 범위 (shorter reach but hits several targets: splash/area/pierce/dash/boomerang) or 개체 (one target at a time).
const LONG_RANGE_MIN=20;
function attackTypeOf(d){if(d.attackClass)return d.attackClass;return d.range>=LONG_RANGE_MIN?'원거리':d.area||d.splash||d.pierce||d.dash||d.boomerang?'범위':'개체'}
function attackType(t){return attackTypeOf(data.units[t])}
// training card: abilities go on their own last line, under the profile text
function trainingAbilityLine(t){const a=[t==='purple'&&'빨간 적에게 강함',(t==='cyan'||t==='crystal')&&'떠다니는 적에게 강함',...(RARE_TYPES.includes(t)||EX_TYPES.includes(t)||SR_TYPES.includes(t)?codexTraitBadges(data.units[t]).slice(1):[])].filter(Boolean);return a.length?'<br>'+a.join(' · '):''}
function codexTraitBadges(d){const b=[attackTypeOf(d)+' 공격'];for(const t of traitsOf(d))if(TRAIT_NAMES[t])b.push(TRAIT_NAMES[t]);
 for(const k in TRAIT_NOTE){const ts=d[k]||[];if(Object.keys(TRAIT_TARGET).every(t=>ts.includes(t))){b.push(`모든 속성에게 ${TRAIT_NOTE[k]}`);continue}for(const t of ts)b.push(`${TRAIT_TARGET[t]}에게 ${TRAIT_NOTE[k]}`)}
 if(d.hiddenAbility&&!futureOpen()){b.length=0;b.push(attackTypeOf(d)+' 공격','???');return b}// 미래편 전용: 미래편이 열리기 전까지 능력을 가림
 if(d.survive)b.push(`살아남는다(${freqWord(d.survive)})`);
 if(d.wave)b.push(`파동 공격(${freqWord(d.wave.chance)})`);
 if(d.backRange)b.push('뒤쪽까지 공격');
 if(d.rage)b.push(`마지막 히트백 시 공격력 +${Math.round(d.rage*100)}%`);
 if(d.surge)b.push('서지 공격');
 if(d.critChance)b.push(`치명타(${freqWord(d.critChance)})`);
 if(d.blowChance)b.push(`날려버린다(${freqWord(d.blowChance)})`);
 if(d.killGold)b.push(`처치 시 돈 +${Math.round(d.killGold*100)}%`);
 if(d.multiHit)b.push(`${d.multiHit}연타`);
 if(d.statusVs){const tg=d.statusVs.length>=5&&!d.statusVs.includes('metal')?'메탈을 뺀 모든 적':d.statusVs.map(t=>TRAIT_TARGET[t]).join('·'),m=[d.slowChance&&`둔화(${freqWord(d.slowChance)})`,d.freezeChance&&`정지(${freqWord(d.freezeChance)})`,d.atkDownPct&&`약화(${freqWord(d.atkDownChance??1)})`,d.intervalUpChance&&`공격 주기 증가(${freqWord(d.intervalUpChance)})`].filter(Boolean).join('·');if(m)b.push(`${tg}에게 ${m}`)}return b}
let codexTab='ally',codexType='red',codexEvolved=false,codexUnit=null,codexRAF=0,codexLast=0,codexAutoPaused=false;
function codexEntries(){return codexTab==='ally'?ALLIES.filter(t=>allyUnlocked(t)&&gradeMatch(t)):ENEMY_ORDER}
const _renderTraining=renderTraining;
renderTraining=function(){_renderTraining();renderGradeTabs();const g=$('#trainingGrid');if(!g.children.length){const p=document.createElement('p');p.className='grade-empty';p.textContent='이 등급에서 얻은 캐릭터가 아직 없어요.';g.append(p)}};
function buildCodexPreviewUnit(type,ally,evolved){
 const stats=ally?unitStats(type,evolved?10:1,2):{...data.units[type]};
 const u={type,ally,stats,x:50,animTime:0,attackTime:0,attackCd:1.4,hurtTime:0,kbTime:0};
 drawUnit(u);
 return u;
}
function fitCodexUnit(){
 const stage=$('#codexPreviewStage'),unit=codexUnit.el,base=2.6;
 unit.style.transform=`translateX(-50%) scale(${base})`;
 const stageRect=stage.getBoundingClientRect();
 // Fit the union of every walk/attack frame, not just the pre-animation box: wide
 // impact frames (thrown objects, waves, raised weapons) otherwise run off the stage.
 const u=codexUnit,box={l:1e9,r:-1e9,t:1e9,b:-1e9},d=data.units[u.type],dur=d.attackDuration||.56;
 const measure=()=>{animateUnit(u);for(const e of unit.querySelectorAll('.evolved-sprite,.ally-sprite,.dog-sprite,.dog-sprite-legs,.dog-sprite-body')){if(getComputedStyle(e).display==='none')continue;const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;box.l=Math.min(box.l,r.left);box.r=Math.max(box.r,r.right);box.t=Math.min(box.t,r.top);box.b=Math.max(box.b,r.bottom)}};
 for(let i=0;i<8;i++){u.attackTime=0;u.animTime=i*.075;measure()}
 for(let i=0;i<24;i++){u.animTime=0;u.attackTime=dur*(1-(i+.5)/24);measure()}
 u.animTime=0;u.attackTime=0;animateUnit(u);
 const spriteRect={left:box.l,top:box.t,width:box.r-box.l,height:box.b-box.t};
 if(!(spriteRect.width>0&&spriteRect.height>0))return;
 const maxH=stageRect.height*.8,maxW=stageRect.width*.85;
 const scale=Math.min(base,base*maxH/spriteRect.height,base*maxW/spriteRect.width);
 const xShiftPerScale=(stageRect.left+stageRect.width/2-(spriteRect.left+spriteRect.width/2))/base;
 unit.style.transform=`translateX(-50%) scale(${scale}) translateX(${xShiftPerScale}px)`;
}
function renderCodexPreview(){
 const ally=codexTab==='ally';
 $('#codexPreviewStage').innerHTML='';
 codexUnit=buildCodexPreviewUnit(codexType,ally,ally&&codexEvolved);
 $('#codexPreviewStage').append(codexUnit.el);
 fitCodexUnit();
 $('#codexEvolveToggle').classList.toggle('hidden',!ally||!!data.units[codexType]?.noEvolve);
 $('#codexEvolveToggle').textContent=codexEvolved?'기본 형태 보기':'2진 진화 보기';
 const d=data.units[codexType],s=ally?unitStats(codexType,codexEvolved?10:1,2):d;
 $('#codexName').textContent=UNIT_NAMES[codexType]+(ally&&codexEvolved?' 2진':'');const codexIcon=ally&&ABILITY_ICONS[codexType];if(codexIcon){const ic=document.createElement('span');ic.className=codexIcon[0]+'-icon title-icon';ic.title=codexIcon[1];ic.setAttribute('aria-label',codexIcon[1]);$('#codexName').append(ic)}
 $('#codexRole').textContent=ally?ROLES[codexType]+' · '+attackType(codexType)+' 공격':codexTraitBadges(d).join(' · ');
 $('#codexDesc').innerHTML=ally?(codexEvolved?PROFILE_TEXT_EVOLVED[codexType]+`<br><strong>2진 효과: ${EVOLUTION_TEXT[codexType]} · 사거리 20% 증가</strong>`:PROFILE_TEXT[codexType]):ENEMY_TEXT[codexType];
 $('#codexStats').innerHTML=`<dt>체력</dt><dd>${s.hp}</dd><dt>공격력</dt><dd>${s.atk}</dd><dt>사거리</dt><dd>${Math.round(s.range)}</dd><dt>공격 주기</dt><dd>${s.interval.toFixed(2)}초</dd><dt>이동 속도</dt><dd>${s.speed}</dd>`+(ally&&attackType(codexType)==='원거리'?`<dt>사각지대</dt><dd>${Math.round(s.range*DEAD_ZONE_RATIO)} 이내</dd>`:'')+(ally?`<dt>비용</dt><dd>${s.cost}원</dd>`:'');
}
function renderCodexGrid(){
 const grid=$('#codexGrid');grid.innerHTML='';
 for(const type of codexEntries()){
  const btn=document.createElement('button');btn.className='codex-card'+(type===codexType?' active':'');btn.textContent=UNIT_NAMES[type];
  btn.onclick=()=>{codexType=type;codexEvolved=false;renderCodexGrid();renderCodexPreview()};
  grid.append(btn);
 }
}
function tickCodexPreview(t){
 codexRAF=requestAnimationFrame(tickCodexPreview);
 if($('#codexMenu').classList.contains('hidden')){cancelAnimationFrame(codexRAF);codexRAF=0;codexLast=0;return}
 const dt=codexLast?Math.min(.05,(t-codexLast)/1000):0;codexLast=t;
 const u=codexUnit;if(!u)return;
 u.animTime+=dt;
 if(u.attackTime>0)u.attackTime=Math.max(0,u.attackTime-dt);
 else{u.attackCd-=dt;if(u.attackCd<=0){const d=data.units[u.type];u.attackTime=d.attackDuration||.56;u.attackCd=(u.stats.interval||d.interval||1.4)+.4}}
 animateUnit(u);
}
function openCodex(tab){
 renderGradeTabs();
 codexTab=tab;codexType=tab==='ally'?'red':'dog';codexEvolved=false;
 $('#codexAllyTab').classList.toggle('active',tab==='ally');
 $('#codexEnemyTab').classList.toggle('active',tab==='enemy');
 if(game&&game.running&&!game.ended&&!game.paused){codexAutoPaused=true;game.paused=true;render()}
 renderCodexGrid();renderCodexPreview();
 $('#codexMenu').classList.remove('hidden');
 codexLast=0;if(!codexRAF)codexRAF=requestAnimationFrame(tickCodexPreview);
}
function closeCodex(){
 $('#codexMenu').classList.add('hidden');
 if(codexAutoPaused&&game&&!game.ended){game.paused=false;codexAutoPaused=false;render()}
}
$('#codexBtn').onclick=()=>openCodex('ally');
$('#codexAllyTab').onclick=()=>openCodex('ally');
$('#codexEnemyTab').onclick=()=>openCodex('enemy');
$('#codexEvolveToggle').onclick=()=>{codexEvolved=!codexEvolved;renderCodexPreview()};
$('#codexCloseBtn').onclick=closeCodex;

reset();openStages();requestAnimationFrame(loop);

