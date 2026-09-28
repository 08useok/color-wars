const STAGES=[
 {name:'한국',flag:'🇰🇷',hp:500,gap:5,wave:0,sky:'#84cef3',land:'#8fca52',desc:'첫 출격 · 5초마다 멍뭉이'},
 {name:'몽골',flag:'🇲🇳',hp:500,gap:4.8,wave:0,sky:'#a3daf2',land:'#aac66d',desc:'신규 적 낼름이 · 빠른 접근에 주의하세요'},
 {name:'중국',flag:'🇨🇳',hp:500,gap:4.6,wave:24,sky:'#bdd5da',land:'#79ab71',desc:'멍뭉이가 더 자주 몰려옵니다 · 클리어 보상: 오렌지'},
 {name:'태국',flag:'🇹🇭',hp:500,gap:4.4,wave:22,sky:'#9bdfdb',land:'#68b084',desc:'신규 적 놈놈놈 · 세 명이 함께 달려옵니다'},
 {name:'캄보디아',flag:'🇰🇭',hp:750,gap:4.2,wave:20,sky:'#c3d8bd',land:'#76985e',desc:'놈놈놈 합류 · 수입 업그레이드를 활용하세요'},
 {name:'필리핀',flag:'🇵🇭',hp:750,gap:4,wave:18,sky:'#77d9e8',land:'#d5cd8b',desc:'멍뭉이 · 낼름이 · 놈놈놈 혼성 · 클리어 보상: 옐로우'},
 {name:'일본',flag:'🇯🇵',hp:2400,gap:3.8,wave:16,sky:'#f1d8e5',land:'#a0b57a',desc:'신규 적 하마양 · 적 성 체력 50%에서 보스 출현 · 보상: 그린'},
 {name:'호주',flag:'🇦🇺',hp:1500,gap:3.6,wave:15,sky:'#b3ddf2',land:'#d5ae72',desc:'멍뭉이 · 낼름이 · 놈놈놈의 혼성 전투'},
 {name:'싱가포르',flag:'🇸🇬',hp:3000,gap:3.5,wave:15,sky:'#a1dbed',land:'#85b87d',desc:'몰디브로 향하는 전선'},
 {name:'몰디브',flag:'🇲🇻',hp:2500,gap:3.4,wave:15,sky:'#78dae9',land:'#e6d29d',desc:'신규 빨간 적 돼지새끼 · 범위 공격에 주의하세요'},
 {name:'인도',flag:'🇮🇳',hp:3500,gap:3.4,wave:16,sky:'#f3d2a0',land:'#bca364',desc:'하마양 재등장 · 강화한 아군으로 돌파하세요'},
 {name:'네팔',flag:'🇳🇵',hp:4000,gap:3.3,wave:16,sky:'#bedeee',land:'#92a399',desc:'돼지새끼의 범위 공격을 견디세요'},
 {name:'두바이',flag:'🇦🇪',hp:5000,gap:3.2,wave:15,sky:'#ead8b3',land:'#cfa768',desc:'신규 적 재키펭 · 클리어 보상: 시안'},
 {"name": "사우디아라비아", "flag": "🇸🇦", "hp": 6000, "gap": 4, "wave": 0, "sky": "#efd1a1", "land": "#d1aa6e", "desc": "하마양과 혼성 부대"},
 {"name": "케냐", "flag": "🇰🇪", "hp": 6100, "gap": 4, "wave": 0, "sky": "#f0cea0", "land": "#bb9d56", "desc": "하마양과 돼지새끼의 협공"},
 {"name": "마다가스카르", "flag": "🇲🇬", "hp": 7000, "gap": 4, "wave": 0, "sky": "#a4dfed", "land": "#6ba976", "desc": "신규 적 고릴라저씨 · 클리어 보상: 블루"},
 {"name": "남아프리카", "flag": "🇿🇦", "hp": 7000, "gap": 4, "wave": 0, "sky": "#c2deee", "land": "#b9b17d", "desc": "재키펭과 대형 적이 합류합니다"},
 {"name": "가나", "flag": "🇬🇭", "hp": 8000, "gap": 4, "wave": 0, "sky": "#f2dcb7", "land": "#b69a68", "desc": "빠른 재키펭과 돼지새끼"},
 {"name": "사하라사막", "flag": "🏜️", "hp": 9000, "gap": 4, "wave": 0, "sky": "#eec08f", "land": "#d0a567", "desc": "신규 적 메에메에 · 클리어 보상: 퍼플"},
 {"name": "이집트", "flag": "🇪🇬", "hp": 9000, "gap": 4, "wave": 0, "sky": "#e5caab", "land": "#cdb47a", "desc": "고릴라저씨를 중심으로 한 혼성 부대"},
 {"name": "터키", "flag": "🇹🇷", "hp": 10000, "gap": 4, "wave": 0, "sky": "#b7d9e7", "land": "#b09d80", "desc": "여덟 종류의 적을 상대하세요"},
 {"name": "러시아", "flag": "🇷🇺", "hp": 12000, "gap": 4, "wave": 0, "sky": "#d7e8f3", "land": "#b6c8c7", "desc": "재키펭과 고릴라저씨의 빠른 진격"},
 {"name": "그리스", "flag": "🇬🇷", "hp": 15000, "gap": 4, "wave": 0, "sky": "#98d6ef", "land": "#bcbf9a", "desc": "신규 빨간 적 바다레오파드 · 퍼플을 활용하세요"},
 {"name": "이탈리아", "flag": "🇮🇹", "hp": 15000, "gap": 4, "wave": 0, "sky": "#c4dfdf", "land": "#a4b58a", "desc": "대형 적과 고릴라저씨의 전선"},
 {"name": "모나코", "flag": "🇲🇨", "hp": 15000, "gap": 4, "wave": 0, "sky": "#aaddec", "land": "#cfba98", "desc": "재키펭과 메에메에의 혼성 부대"},
 {"name": "스페인", "flag": "🇪🇸", "hp": 15000, "gap": 4, "wave": 0, "sky": "#f0cfb4", "land": "#c6ae6d", "desc": "바다레오파드와 아거"},
 {"name": "프랑스", "flag": "🇫🇷", "hp": 15000, "gap": 4, "wave": 0, "sky": "#b8d9ef", "land": "#93ad75", "desc": "일곱 종류의 혼성 부대"},
 {"name": "독일", "flag": "🇩🇪", "hp": 15000, "gap": 4, "wave": 0, "sky": "#c9d7e2", "land": "#8da06c", "desc": "아홉 종류의 혼성 부대"},
 {"name": "덴마크", "flag": "🇩🇰", "hp": 18000, "gap": 4, "wave": 0, "sky": "#9bd3ec", "land": "#79a77c", "desc": "신규 적 빠옹"},
 {"name":"노르웨이","flag":"🇳🇴","hp":15000,"gap":4,"wave":0,"sky":"#b9dff1","land":"#8ba987","desc":"고릴라저씨·바다레오파드가 뒤섞인 혼성 전선"},
 {"name":"영국","flag":"🇬🇧","hp":8000,"gap":4,"wave":0,"sky":"#c7d9e5","land":"#85956f","desc":"빠옹이 다시 등장하는 영국 전선"},
 {"name":"그린란드","flag":"🇬🇱","hp":18000,"gap":4,"wave":0,"sky":"#bfe8f5","land":"#cfdcce","desc":"신규 적 엘리트래빗"},
 {"name":"캐나다","flag":"🇨🇦","hp":18000,"gap":4,"wave":0,"sky":"#c9e1ed","land":"#91a979","desc":"고릴라저씨 증원이 늘어난 대규모 혼성 전선"},
 {"name":"뉴욕","flag":"🇺🇸","hp":18000,"gap":4,"wave":0,"sky":"#a9cee2","land":"#8f9877","desc":"바다레오파드가 반복 출현하는 격전지"},
 {"name":"버뮤다","flag":"🇧🇲","hp":20000,"gap":4,"wave":0,"sky":"#77d7e7","land":"#ddc58e","desc":"신규 적 캥거류"},
 {"name":"자메이카","flag":"🇯🇲","hp":20000,"gap":4,"wave":0,"sky":"#9edbd0","land":"#8dac68","desc":"빠옹이 최종 보스로 재등장"},
 {"name":"콜롬비아","flag":"🇨🇴","hp":20000,"gap":4,"wave":0,"sky":"#a8dfc4","land":"#7fae5a","desc":"캥거류가 보스로 재등장하는 남미 전선"},
 {"name":"브라질","flag":"🇧🇷","hp":20000,"gap":4,"wave":0,"sky":"#9fd9e0","land":"#6ea85c","desc":"고릴라저씨 지원군과 함께 나나나난나방이 보스로 등장"},
 {"name":"아르헨티나","flag":"🇦🇷","hp":20000,"gap":4,"wave":0,"sky":"#9edcf0","land":"#88b878","desc":"고릴라저씨·바다레오파드·재키펭이 뒤섞인 혼성 전선"},
 {"name":"마추픽추","flag":"🇵🇪","hp":20000,"gap":4,"wave":0,"sky":"#add9e4","land":"#799b69","desc":"캥거류가 재등장하는 혼성 전선"},
 {"name":"이스터섬","flag":"🗿","hp":20000,"gap":4,"wave":0,"sky":"#91d4e5","land":"#9ea26b","desc":"신규 적 투뿔소(One Horn)가 보스로 등장"},
 {"name":"멕시코","flag":"🇲🇽","hp":25000,"gap":4,"wave":0,"sky":"#e4d29d","land":"#b49262","desc":"캥거류가 세 번 증원되는 혼성 전선"},
 {"name":"NASA","flag":"🚀","hp":20000,"gap":4,"wave":0,"sky":"#7188b5","land":"#777a82","desc":"투뿔소가 반복 출현하는 전선"},
 {"name":"라스베이거스","flag":"🎰","hp":25000,"gap":4,"wave":0,"sky":"#d8a5cf","land":"#a47b72","desc":"신규 적 곰선생(Teacher Bear)이 보스로 등장"},
 {"name":"할리우드","flag":"🎬","hp":20000,"gap":4,"wave":0,"sky":"#f0c58e","land":"#977c64","desc":"하마양·돼지새끼부터 나나나난나방까지 총출동"},
 {"name":"알래스카","flag":"🏔️","hp":20000,"gap":4,"wave":0,"sky":"#cce9f3","land":"#c4d4cf","desc":"다람G 물량과 곰선생·나나나난나방의 협공"},
 {"name":"하와이","flag":"🌺","hp":30000,"gap":4,"wave":0,"sky":"#7fd6e0","land":"#4f9e6e","desc":"강적 총출동 · 달 직전 마지막 관문"},
 {"name":"달","flag":"🌕","hp":99999,"gap":4,"wave":0,"sky":"#202743","land":"#8b8d99","desc":"최종 보스 대갈이군(The Face)"}
];
// Empire of Cats Chapter 2: same Korea-to-Hawaii roster replayed with the wiki-sourced
// 150% enemy strength magnification. Moon (the chapter-1 finale) is not repeated.
const CHAPTER1_LEN=STAGES.length;
for(let i=0;i<CHAPTER1_LEN-1;i++){const base=STAGES[i];STAGES.push({...base,chapter:2,hp:Math.round(base.hp*1.5),desc:'세계편 2장 재도전 · 모든 적 능력치 150% 강화'});}
const MAIN_STAGE_COUNT=STAGES.length;// chapter 1 + chapter 2; everything after this index is a special stage
// Tuesday special stage "광속 전사": pre-15.4 Speed Up source (drop chance 20/50/100/100% (x2 on the hardest)).
const TUESDAY_STAGES=[
 {name:'광속 전사 초급',flag:'⚡',hp:10000,chance:.2,count:1,boss:'hippo',desc:'하마양 · 스피드업 20%'},
 {name:'광속 전사 중급',flag:'⚡',hp:20000,chance:.5,count:1,boss:'rhino',desc:'투뿔소 · 스피드업 50%'},
 {name:'광속 전사 상급',flag:'⚡',hp:30000,chance:1,count:1,boss:'bear',desc:'곰선생 · 스피드업 100%'},
 {name:'광속 전사 초상급',flag:'⚡',hp:50000,chance:1,count:2,boss:'leboin',desc:'빠옹 · 스피드업 2개 100%'}
];
TUESDAY_STAGES.forEach(t=>STAGES.push({name:t.name,flag:t.flag,hp:t.hp,gap:4,wave:0,sky:'#f6e39a',land:'#c9a24e',desc:t.desc,chapter:3,special:{chance:t.chance,count:t.count},maxEnemies:10}));
let selectedStage=0,cleared=[];
try{const saved=JSON.parse(localStorage.getItem('red-battle-progress-v1')||'[]');if(Array.isArray(saved))cleared=[...new Set(saved.filter(x=>Number.isInteger(x)&&x>=0&&x<MAIN_STAGE_COUNT))]}catch{}
function saveProgress(){try{localStorage.setItem('red-battle-progress-v1',JSON.stringify(cleared))}catch{}}
function isUnlocked(i){return i===0||cleared.includes(i-1)||cleared.includes(i)}
function chapterOf(i){return STAGES[i]?.chapter||1}
function enemyMagnification(){return chapterOf(selectedStage)===2?1.5:1}
const RHINO_SHEET='assets/rhino_sheet.png';
const BEAR_SHEET='assets/bear_sheet.png';
const FACE_SHEET='assets/face_sheet.png?v=2';
// Reserved for the Norway expansion: user-supplied Elite Rabbit spritesheet.
const ELITE_RABBIT_SHEET='assets/elite_rabbit_sheet.png';
// Reserved user-supplied enemy sheets for the next Empire of Cats expansion.
const SQUIRREL_G_SHEET='assets/squirrel_g_sheet.png';
const KANG_ROO_SHEET='assets/kang_roo_sheet.png?v=2';
const data={bases:{ally:{hp:2000,max:2000,x:90},enemy:{hp:1000,max:1000,x:10}},units:{cyan:{"hp": 180, "atk": 200, "interval": 3.4, "speed": 4.3, "range": 30, "cost": 260, "cooldown": 9, "knockbacks": 3, "projectile": true, "splash": 0.5, "flight": 0.6, "floatStrong": true},blue:{"hp": 240, "atk": 38, "interval": 0.4, "speed": 13, "range": 4, "cost": 140, "cooldown": 3, "knockbacks": 3, "attackDuration": 0.3},purple:{"hp": 600, "atk": 90, "interval": 1.6, "speed": 5, "range": 6, "cost": 180, "cooldown": 6, "knockbacks": 3, "projectile": true, "splash": 1.5, "redStrong": true},peng:{"hp": 1300, "atk": 80, "interval": 0.8, "speed": 7, "range": 5, "reward": 180, "knockbacks": 3, "attackDuration": 0.55, "windup": 0.26666666666666666},gory:{"hp": 1000, "atk": 80, "interval": 0.5333333333333333, "speed": 8, "range": 5, "reward": 220, "knockbacks": 3, "attackDuration": 0.5, "windup": 0.26666666666666666, "area": true},baa:{"hp": 800, "atk": 50, "interval": 1.1, "speed": 4.5, "range": 3.7, "reward": 100, "knockbacks": 3, "attackDuration": 0.8, "windup": 0.4666666666666667},seal:{"hp": 2500, "atk": 150, "interval": 0.7666666666666667, "speed": 5, "range": 5.7, "reward": 450, "knockbacks": 1, "attackDuration": 0.6, "windup": 0.26666666666666666, "area": true, "trait": "red"},croco:{"hp": 70, "atk": 30, "interval": 0.6, "speed": 7.5, "range": 3.7, "reward": 30, "knockbacks": 1, "attackDuration": 0.5, "windup": 0.26666666666666666},red:{hp:450,atk:15,interval:1.2,speed:6,range:4.5,cost:30,cooldown:2,knockbacks:3},orange:{hp:220,atk:100,interval:2.4,speed:4.5,range:16,cost:150,cooldown:6.5,knockbacks:3,projectile:true,splash:3.5},yellow:{hp:900,atk:45,interval:1.8,speed:5,range:4,cost:125,cooldown:5,knockbacks:1},green:{hp:280,atk:65,interval:2.8,speed:5.5,range:12,cost:175,cooldown:7,knockbacks:3,boomerang:true},dog:{hp:200,atk:50,interval:1.4,speed:5,range:4,reward:40,knockbacks:3},snache:{hp:220,atk:85,interval:1.1,speed:7,range:4,reward:70,knockbacks:3},guys:{hp:420,atk:120,interval:1,speed:4.8,range:4.2,reward:110,knockbacks:1,attackDuration:.9},pigge:{trait:"red",hp:2400,atk:130,interval:1.8,speed:2.5,range:5,reward:400,knockbacks:2,attackDuration:28/30,windup:14/30,area:true},hippo:{hp:1600,atk:150,interval:2.2,speed:2.8,range:5,reward:200,knockbacks:1,attackDuration:.8,area:true}},income:[{max:1000,rate:20,cost:100},{max:1300,rate:28,cost:150},{max:1700,rate:38,cost:220},{max:2200,rate:50,cost:320},{max:2800,rate:65,cost:450},{max:3600,rate:85,cost:null}]};
data.units.leboin={hp:4000,atk:654,interval:187/30,speed:2.5,range:13.5,reward:650,knockbacks:1,attackDuration:.9,windup:8/30,area:true};
const MOOTH_SHEET='assets/mooth_sheet.png';
data.units.rabbit={trait:"red",hp:320,atk:60,interval:41/30,speed:9,range:4,reward:70,knockbacks:3,attackDuration:16/30,windup:12/30};
data.units.squirrel={hp:300,atk:45,interval:16/30,speed:8.5,range:4.2,reward:85,knockbacks:3,attackDuration:16/30,windup:8/30};
// Kang Roo's 250 is split 213/12/25 over three punches at 2f/8f/16f (share of atk, so Chapter 2's x1.5 still applies).
data.units.kangaroo={hp:4000,atk:250,interval:36/30,speed:10,range:5.5,reward:700,knockbacks:1,attackDuration:.85,windup:2/30,hits:[{at:2/30,share:213/250},{at:8/30,share:12/250},{at:16/30,share:25/250}]};
data.units.mooth={trait:"floating",hp:5000,atk:300,interval:88/30,speed:3.2,range:12,reward:850,knockbacks:1,attackDuration:1.6,windup:34/30,area:true};
data.units.pink={hp:520,atk:125,interval:1.9,speed:6,range:23,engageRange:4.5,cost:225,cooldown:7,knockbacks:3,attackDuration:.7,windup:.3,area:true};
data.units.rhino={hp:5200,atk:420,interval:2.1,speed:5.5,range:5.2,reward:900,knockbacks:2,attackDuration:.9,windup:.45,area:true};
data.units.bear={hp:6500,atk:520,interval:2.4,speed:4.5,range:8.5,reward:1050,knockbacks:10,attackDuration:1,windup:.5,area:true};
data.units.face={trait:"floating",hp:18000,atk:850,interval:3.4,speed:1.8,range:14,reward:2500,knockbacks:3,attackDuration:1.2,windup:.65,area:true};
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
data.units.crimson={hp:900,atk:650,interval:2.8,speed:5,range:7,cost:300,cooldown:10,knockbacks:3,forceKnockback:true};
data.units.gold={hp:600,atk:180,interval:3.6,speed:5,range:21,cost:425,cooldown:15,knockbacks:3,multiHit:3};
data.units.ivory={hp:650,atk:380,interval:3,speed:5,range:20,cost:350,cooldown:13,knockbacks:3,area:true,slowChance:.4,slowDuration:2};
data.units.chartreuse={hp:600,atk:95,interval:2.4,speed:5,range:16,cost:325,cooldown:12,knockbacks:3,multiHit:5};
data.units.mint={hp:650,atk:340,interval:3.4,speed:5,range:17.5,cost:375,cooldown:14,knockbacks:3,area:true,freezeChance:.25,freezeDuration:1.5};
data.units.azure={hp:800,atk:520,interval:3.2,speed:6.5,range:9,cost:400,cooldown:14,knockbacks:2,dash:true};
data.units.crystal={hp:700,atk:460,interval:3.8,speed:5,range:22.5,cost:450,cooldown:16,knockbacks:3,pierce:3,critChance:.15,critMult:2,floatStrong:true};
data.units.lavender={hp:500,atk:260,interval:4,speed:5,range:23.5,cost:400,cooldown:15,knockbacks:3,area:true,atkDownPct:.5,atkDownChance:.4,atkDownDuration:4};
data.units.salmon={hp:450,atk:430,interval:4.2,speed:5,range:26,cost:475,cooldown:17,knockbacks:3,pull:true};
data.units.raspberry={hp:400,atk:450,interval:4.5,speed:3,range:30,cost:500,cooldown:18,knockbacks:3,windup:.8,damageTiers:[{max:10,dmg:450},{max:17.5,dmg:750},{max:25,dmg:1200},{max:999,dmg:1600}]};
const ALLIES=['red','orange','yellow','green','cyan','blue','purple','pink','crimson','gold','ivory','chartreuse','mint','azure','crystal','lavender','salmon','raspberry'];
const NEW_ALLY_TYPES=['crimson','gold','ivory','chartreuse','mint','azure','crystal','lavender','salmon','raspberry'];
const GENERIC_CD_TYPES=['cyan','blue','purple','pink',...NEW_ALLY_TYPES];
const ALWAYS_UNLOCKED=new Set(['red']);
// Chapter 2 stage indices (CHAPTER1_LEN=48 + chapter-1 index) spread China(2)~Brazil(37):
// 중국50 일본54 인도58 케냐62 사하라사막66 러시아69 스페인73 노르웨이77 뉴욕81 브라질85.
const UNLOCK_AT={red:-1,orange:2,yellow:5,green:6,cyan:12,blue:15,purple:18,pink:37,crimson:50,gold:54,ivory:58,chartreuse:62,mint:66,azure:69,crystal:73,lavender:77,salmon:81,raspberry:85};
const ROLES={red:'기본 근접',orange:'중거리 범위',yellow:'방어형 전기',green:'왕복 부메랑',cyan:'초장거리 저격',blue:'고속 연타',purple:'근접 빨간 적 특화',pink:'근거리 광역',crimson:'근거리 강타',gold:'분열 광역형',ivory:'원거리 둔화형',chartreuse:'중거리 연사형',mint:'중거리 정지형',azure:'돌진 광역형',crystal:'관통 치명타형',lavender:'장거리 약화형',salmon:'초장거리 끌어오기',raspberry:'초장거리 저격형'};
const STATUS_ICONS={mint:['freeze','정지'],ivory:['slow','둔화'],lavender:['weaken','약화'],crystal:['crit','치명타'],salmon:['pull','끌어오기']};
const ABILITY_ICONS={purple:['strong','엄청 강하다'],...STATUS_ICONS};
const COLORS={red:'#ff7272',orange:'#ffb452',yellow:'#ffe46d',green:'#83e595',cyan:'#53e5ef',blue:'#629aff',purple:'#c893ff',pink:'#ff73b8',crimson:'#dc143c',gold:'#ffd700',ivory:'#fffff0',chartreuse:'#7fff00',mint:'#98ff98',azure:'#007fff',crystal:'#ace5ee',lavender:'#b57edc',salmon:'#fa8072',raspberry:'#e30b5c'};
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
function reset(){syncBasePositions();last=0;game={money:0,level:0,units:[],defeated:[],spawnCd:0,orangeCd:0,yellowCd:0,greenCd:0,cyanCd:0,blueCd:0,purpleCd:0,pinkCd:0,boomerangs:[],projectiles:[],effects:[],running:false,ended:false,tutorial:0,paused:false,elapsed:0,speedMultiplier:1,speedUnlocked:false};game.spawnRules=(STAGE_SPAWNS[selectedStage]||[]).map(r=>({...r,triggered:false,clock:0,spawned:0}));data.bases.ally.hp=data.bases.ally.max=baseHpFor();data.bases.ally.attackLock=null;data.bases.enemy.hp=data.bases.enemy.max=STAGES[selectedStage].hp;data.bases.enemy.attackLock=null;game.tutorial=selectedStage===0?0:6;$('#field').style.background=`linear-gradient(${STAGES[selectedStage].sky} 0 32%,${STAGES[selectedStage].land} 32% 100%)`;$('#field').setAttribute('aria-label',STAGES[selectedStage].name+' 전장');$('#stageMenu').classList.add('hidden');unitsEl.innerHTML='';$('#result').classList.add('hidden');tutorial();render()}
const ENGAGE_SYNC_WINDOW=.12;// how close (sec) two attackers' swing-starts must be to count as "the same motion" and land together
function canEngage(target){const lock=target.attackLock;return!lock||game.elapsed>=lock.until||game.elapsed<lock.joinBy}
function lockEngage(target,duration){if(!target.attackLock||game.elapsed>=target.attackLock.until)target.attackLock={until:game.elapsed+duration,joinBy:game.elapsed+ENGAGE_SYNC_WINDOW}}
const ALLY_DEPLOY_LIMIT=50;// Battle Cats' default Cat Deploy Limit (special restriction stages there lower or raise it); caps how many allies can be on the field at once so cheap units can't stack infinitely.
function allyDeployCount(){return game.units.filter(u=>u.ally&&u.hp>0).length}
function allyDeployFull(){return allyDeployCount()>=ALLY_DEPLOY_LIMIT}
function addUnit(type,boss=false){
 if(game.ended)return;
 const d=data.units[type],ally=ALLIES.includes(type);
 if(ally&&(!(game.running||(type==='red'&&game.tutorial===2))||game.paused||unitCooldown(type)>0||game.money<unitCost(type)||!allyUnlocked(type)||allyDeployFull()))return;
 const stats=unitStats(type);const u={type,ally,boss,stats,hp:stats.hp,max:stats.hp,x:ally?data.bases.ally.x:data.bases.enemy.x,emerging:true,atkCd:0,kb:0,animTime:0,attackTime:0,hurtTime:0,kbTime:0,flashTime:0};
 game.units.push(u);drawUnit(u);u.el.style.left=`calc(${u.x}% - 21px)`;
 if(ally){game.money-=unitCost(type);game[cooldownKey(type)]=stats.cooldown;if(game.tutorial===2){game.tutorial=3;tutorial()}}render();
}
// Display-only size boost for large enemies so they read bigger than 2진 allies (hippo ~76px is the baseline).
const ENEMY_SIZE={pigge:1.27,seal:1.44,rhino:1.94,kangaroo:1.3,leboin:1.2,mooth:1.15,bear:1.26,face:1.2};
// Displayed height (px) of each new 2진 body sprite; the HP bar sits just above it instead of at the default 1진 spot.
const EVO_BODY_H={crimson:76,gold:78,ivory:77,chartreuse:78,mint:80,azure:89,crystal:81,lavender:80,salmon:74,raspberry:89};
function drawUnit(u){let e=document.createElement('div'),evolved=u.ally&&u.stats?.evolved,legacyAlly=u.ally&&!NEW_ATLASES[u.type];e.className='unit '+u.type+(u.ally?' ally-art':'')+(evolved?' evolved':'');e.style.setProperty('--unit-color',COLORS?.[u.type]||'#fff');e.innerHTML='<div class="bar"><i style="width:100%"></i></div><span class="status-badges"><span class="freeze-icon st-freeze"></span><span class="slow-icon st-slow"></span><span class="weaken-icon st-weaken"></span><span class="crit-icon st-crit"></span><span class="pull-icon st-pull"></span></span>'+(legacyAlly?'<span class="ally-shadow"></span><span class="ally-sprite"></span>'+(evolved?'<span class="evolved-sprite"></span>':'')+(u.type==='pink'&&!evolved?'<span class="pink-ribbon"><i></i></span>':''):'<span class="dog-shadow"></span><span class="dog-sprite"></span>'+(u.type==='leboin'||u.type==='bear'?'<span class="dog-sprite-legs"></span>':'')+(u.type==='leboin'?'<span class="dog-sprite-body"></span>':''));e.setAttribute('aria-label',UNIT_NAMES[u.type]+(evolved?' 2진':''));u.el=e;if(evolved&&EVO_BODY_H[u.type])e.querySelector('.bar').style.top=(33-EVO_BODY_H[u.type])+'px';if(!u.ally&&ENEMY_SIZE[u.type])e.style.setProperty('--enemy-size',ENEMY_SIZE[u.type]);unitsEl.append(e);const newAtlas=NEW_ATLASES[u.type];const sheet={rabbit:ELITE_RABBIT_SHEET,squirrel:SQUIRREL_G_SHEET,kangaroo:KANG_ROO_SHEET,mooth:MOOTH_SHEET,rhino:RHINO_SHEET,bear:BEAR_SHEET,face:FACE_SHEET}[u.type]||(evolved&&newAtlas?.evolved?newAtlas.evolved.sheet:newAtlas?.sheet);if(sheet)e.querySelector('.dog-sprite').style.backgroundImage=`url(${sheet})`;if(legacyAlly)animateAlly(u);else animateDog(u)}
function target(u){let foes=game.units.filter(v=>v.hp>0&&v.kbTime<=0&&!v.emerging&&v.ally!==u.ally);let dir=u.ally?-1:1;return foes.filter(v=>dir*(v.x-u.x)>=-1).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x))[0]}
// Canonical knockback counts include death. Red keeps its original two live hitbacks.
const HITBACK_DURATION=20/30;
// Shorter displacement tuned to this compact battlefield.
const HITBACK_DISTANCE=6;
function animateUnit(u){if(u.ally&&!NEW_ATLASES[u.type])animateAlly(u);else animateDog(u)}
function startHitback(u){
 u.kbTime=HITBACK_DURATION;u.hurtTime=HITBACK_DURATION;
 u.kbStart=u.x;u.kbEnd=Math.max(0,Math.min(100,u.x+(u.ally?1:-1)*HITBACK_DISTANCE));
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
const STATUS_FX_TIME=.6;// crit/pull are instant, so their badge lingers briefly
const SLOW_SPEED=.5;// Battle Cats: a slowed enemy's speed drops to 0.5
function baseDamage(n){return Math.round(n)}// castle HP stays an integer: x.5 and above rounds up (.999 -> +1), below rounds down (.001 -> +0)
function damage(v,amount,from){
 if(game.ended||v.hp<=0||v.kbTime>0)return;
 if(from?.stats?.redStrong&&data.units[v.type].trait==='red')amount*=from.stats.redDamage||1.5;
 if(v.stats?.redStrong&&from&&data.units[from.type].trait==='red')amount*=v.stats.redResist||.5;
 if(from?.stats?.floatStrong&&data.units[v.type].trait==='floating')amount*=from.stats.floatDamage||1.5;
 if(v.stats?.floatStrong&&from&&data.units[from.type].trait==='floating')amount*=v.stats.floatResist||.5;
 if(v.stats?.armor)amount*=v.stats.armor;
 if(from?.atkDownUntil>game.elapsed)amount*=from.atkDownMult;
 if(from?.stats?.critChance&&Math.random()<from.stats.critChance){amount*=from.stats.critMult||2;v.critFxUntil=game.elapsed+STATUS_FX_TIME}
 const isBoss=v.boss||data.units[v.type].hp>=BOSS_HP_THRESHOLD;// base HP, so Chapter 2's x1.5 doesn't change who counts as a boss
 if(from?.stats?.pull&&isBoss)amount*=1.3;
 if(from?.stats?.bossDamage&&isBoss)amount*=from.stats.bossDamage;
 v.hp=Math.max(0,v.hp-amount);v.flashTime=.1;v.el.classList.add('damage-flash');
 v.el.querySelector('i').style.setProperty('width',Math.max(0,v.hp/v.max)*100+'%');
 if(v.hp===0){
  if(!v.ally)game.money=Math.min(walletMax(),game.money+Math.round(data.units[v.type].reward*enemyMagnification()*(from?.ally&&from.stats?.killGold?1+from.stats.killGold:1)));
  game.units.splice(game.units.indexOf(v),1);
  startHitback(v);v.el.classList.add('defeated');game.defeated.push(v);return;
 }
 if(from?.stats?.slowChance&&Math.random()<from.stats.slowChance)v.slowUntil=game.elapsed+from.stats.slowDuration;
 if(from?.stats?.freezeChance&&Math.random()<from.stats.freezeChance)v.freezeUntil=Math.max(v.freezeUntil||0,game.elapsed+from.stats.freezeDuration);
 if(from?.stats?.atkDownPct&&Math.random()<(from.stats.atkDownChance??1)){v.atkDownUntil=game.elapsed+from.stats.atkDownDuration;v.atkDownMult=1-from.stats.atkDownPct}
 if(from?.stats?.pull&&!isBoss){const dir=Math.sign(from.x-v.x)||(from.ally?-1:1);v.x=Math.max(0,Math.min(100,v.x+dir*(from.stats.pullDistance||3)));v.el.style.left=`calc(${v.x}% - 21px)`;v.pullFxUntil=game.elapsed+STATUS_FX_TIME}
 if(from?.stats?.forceKnockback&&!isBoss){startHitback(v)}
 else{
  const total=v.stats?.knockbacks??data.units[v.type].knockbacks;
  // Consume every crossed threshold, but play only one hitback for a single blow.
  const crossed=Math.min(total-1,Math.floor((v.max-v.hp)*total/v.max+1e-9));
  if(crossed>v.kb){v.kb=crossed;startHitback(v)}
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
function launchJuice(u,t){
 const end=t?t.x:data.bases.enemy.frontX,el=document.createElement('span');el.className='juice-projectile '+u.type+'-shot';unitsEl.append(el);
 const shot={start:u.x,end,time:0,duration:u.stats.flight||.35,damage:u.stats.atk,radius:u.stats.splash,source:u,type:u.type,el};
 game.projectiles.push(shot);positionJuice(shot);
}
function positionJuice(p){const progress=p.time/p.duration;p.el.style.left=(p.start+(p.end-p.start)*progress)+'%';p.el.style.translate=`-50% ${-28-Math.sin(progress*Math.PI)*32}px`}
function updateJuice(dt){
 for(const e of [...game.effects]){e.time-=dt;e.el.style.opacity=Math.max(0,e.time/.25);if(e.time<=0){e.el.remove();game.effects.splice(game.effects.indexOf(e),1)}}
 for(const p of [...game.projectiles]){
  p.time=Math.min(p.duration,p.time+dt);positionJuice(p);if(p.time<p.duration)continue;
  p.el.remove();game.projectiles.splice(game.projectiles.indexOf(p),1);
  const effect=document.createElement('span');effect.className='juice-splash '+p.type+'-splash';effect.style.left=p.end+'%';effect.style.width=(p.radius*2)+'%';unitsEl.append(effect);game.effects.push({el:effect,time:.25});
  for(const v of [...game.units])if(!v.ally&&Math.abs(v.x-p.end)<=p.radius)damage(v,p.damage,p.source);
  const base=data.bases.enemy;if(Math.abs(base.frontX-p.end)<=p.radius){base.hp=Math.max(0,base.hp-baseDamage(p.damage));if(!base.hp){finish(true);return}}
 }
}
function tierDamage(tiers,dist){for(const t of tiers)if(dist<=t.max)return t.dmg;return tiers[tiers.length-1].dmg}
function resolveAttack(u,t,share=1){
 const d=u.stats||data.units[u.type],dir=u.ally?-1:1;
 const inRange=v=>v&&v.hp>0&&v.kbTime<=0&&v.ally!==u.ally&&dir*(v.x-u.x)>=-1&&Math.abs(v.x-u.x)<=d.range;
 if(d.dash){
  const farX=u.x+dir*d.range,lo=Math.min(u.x,farX),hi=Math.max(u.x,farX);
  for(const v of [...game.units])if(v.hp>0&&v.kbTime<=0&&v.ally!==u.ally&&v.x>=lo&&v.x<=hi)damage(v,d.atk,u);
 }else if(d.pierce){
  const targets=game.units.filter(inRange).sort((a,b)=>Math.abs(a.x-u.x)-Math.abs(b.x-u.x)).slice(0,d.pierce);
  for(const v of targets)damage(v,d.atk,u);
 }else if(d.area){for(const v of [...game.units])if(inRange(v))damage(v,d.atk,u)}
 else if(d.multiHit){
  let remaining=d.multiHit,victim=inRange(t)?t:target(u);
  while(remaining>0&&victim&&inRange(victim)){damage(victim,d.atk,u);remaining--;if(victim.hp<=0&&remaining>0)victim=target(u)}
  if(remaining<d.multiHit)return;
 }else{
  const victim=inRange(t)?t:target(u);
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
 if(Math.abs(base.frontX-u.x)<=(d.engageRange??d.range)){base.hp=Math.max(0,base.hp-baseDamage(d.atk*share));if(!base.hp)finish(u.ally)}
}
function attack(u,t){
 if(game.ended||u.hp<=0||u.kbTime>0)return;
 const d=u.stats||data.units[u.type];u.atkCd=d.interval;
 u.attackTime=d.attackDuration||.56;
 if(u.type==='yellow'){const bolt=document.createElement('span');bolt.className='electric-bolt';bolt.textContent='ϟ';bolt.style.left=((u.x+(t?t.x:data.bases.enemy.frontX))/2)+'%';unitsEl.append(bolt);game.effects.push({el:bolt,time:.25})}if(d.boomerang){launchBoomerang(u);return}if(d.projectile){launchJuice(u,t);return}if(d.hits)u.pendingAttack={remaining:d.hits[0].at,hit:0};else if(d.windup)u.pendingAttack={remaining:d.windup};else resolveAttack(u,t);
}
function update(dt){
 updateBoomerangs(dt);if(game.ended){render();return}updateJuice(dt);if(game.ended){render();return}
 for(const v of [...game.defeated]){tickHitback(v,dt);v.el.style.opacity=v.kbTime/HITBACK_DURATION;if(v.kbTime===0){v.el.remove();game.defeated.splice(game.defeated.indexOf(v),1)}}
 game.noticeTime=Math.max(0,(game.noticeTime||0)-dt);game.elapsed+=dt;game.money=Math.min(walletMax(),game.money+incomeRate()*dt);updateStageSpawns(dt);
game.spawnCd=Math.max(0,game.spawnCd-dt);game.orangeCd=Math.max(0,game.orangeCd-dt);game.yellowCd=Math.max(0,game.yellowCd-dt);game.greenCd=Math.max(0,game.greenCd-dt);for(const t of GENERIC_CD_TYPES)game[cooldownKey(t)]=Math.max(0,unitCooldown(t)-dt);
 for(const u of [...game.units]){
  if(game.ended)break;if(u.hp<=0)continue;
  u.flashTime=Math.max(0,u.flashTime-dt);u.el.classList.toggle('damage-flash',u.flashTime>0);u.el.classList.toggle('frozen',u.freezeUntil>game.elapsed);u.el.classList.toggle('slowed',u.slowUntil>game.elapsed);u.el.classList.toggle('weakened',u.atkDownUntil>game.elapsed);u.el.classList.toggle('crit-hit',u.critFxUntil>game.elapsed);u.el.classList.toggle('pulled',u.pullFxUntil>game.elapsed);
  if(u.bossKbTime>0){tickBossKnockback(u,dt);continue}
  if(u.kbTime>0){tickHitback(u,dt);continue}
  if(u.freezeUntil>game.elapsed){animateUnit(u);continue}
  if(u.pendingAttack){u.pendingAttack.remaining-=dt;if(u.pendingAttack.remaining<=0){const p=u.pendingAttack,hits=(u.stats||data.units[u.type]).hits,h=hits?.[p.hit];u.pendingAttack=null;resolveAttack(u,undefined,h?h.share:1);if(game.ended)break;if(h&&hits[p.hit+1])u.pendingAttack={remaining:hits[p.hit+1].at-h.at+p.remaining,hit:p.hit+1}}}
  u.atkCd-=dt;u.animTime+=dt;u.attackTime=Math.max(0,u.attackTime-dt);u.hurtTime=Math.max(0,u.hurtTime-dt);
  let d=u.stats||data.units[u.type];
  const spd=u.slowUntil>game.elapsed?Math.min(d.speed,SLOW_SPEED):d.speed;
  if(!u.ally&&(u.emerging||u.x<data.bases.enemy.frontX)){u.emerging=true;u.x=Math.min(data.bases.enemy.frontX,u.x+spd*dt);if(u.x>=data.bases.enemy.frontX)u.emerging=false;u.el.style.left=`calc(${u.x}% - 21px)`;animateDog(u);continue}
  if(u.ally&&(u.emerging||u.x>data.bases.ally.frontX)){u.emerging=true;u.x=Math.max(data.bases.ally.frontX,u.x-spd*dt);if(u.x<=data.bases.ally.frontX)u.emerging=false;u.el.style.left=`calc(${u.x}% - 21px)`;animateUnit(u);continue}
  let t=target(u),dist=t?Math.abs(t.x-u.x):Infinity;
  if(t&&dist<=(d.engageRange??d.range)){if(u.atkCd<=0&&canEngage(t)){lockEngage(t,d.attackDuration||d.interval||.56);attack(u,t)}}
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
function render(){renderDeckButtons();renderSpeedButton();renderNewButtons();renderGreenButton();renderOrangeButton();renderYellowButton();renderUnitLevels();$('#battleNotice').classList.toggle('hidden',!(game.noticeTime>0));$('#pauseBtn').disabled=!game.running||game.ended;$('#pauseBtn').textContent=game.paused?'계속하기':'일시정지';$('#pauseNotice').classList.toggle('hidden',!game.paused);$('#timer').textContent=`${STAGES[selectedStage].name}${chapterOf(selectedStage)===2?' (2장)':''} · ${Math.floor(game.elapsed)}초`;let l=data.income[game.level];$('#money').textContent=`${Math.floor(game.money)} / ${walletMax()}원`;$('#enemyHp').textContent=data.bases.enemy.hp;$('#allyHp').textContent=data.bases.ally.hp;for(let [name,b] of Object.entries(data.bases))$(`#${name}Base span`).style.width=(b.hp/b.max*100)+'%';let sb=$('#spawnBtn'),ib=$('#incomeBtn'),canSpawn=!game.ended&&!game.paused&&(game.running||game.tutorial===2),canUpgrade=!game.ended&&!game.paused&&(game.running||game.tutorial===4);sb.disabled=game.money<unitCost('red')||game.spawnCd>0||!canSpawn||allyDeployFull();sb.querySelector('small').textContent=allyDeployFull()?'출격 인원 가득참':unitCost('red')+'원';sb.querySelector('em').style.display=game.spawnCd?'block':'none';sb.querySelector('em').style.transform=`scaleY(${game.spawnCd/unitStats('red').cooldown})`;ib.disabled=!canUpgrade||game.level===5||game.money<(l.cost||0);ib.innerHTML=game.level===5?'수입 Lv.MAX':`수입 업그레이드<br><small>${l.cost}원</small>`}
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
function loop(t){const raw=last?Math.min(.05,(t-last)/1000):0;last=t;const dt=raw*(game.speedMultiplier||1);if(game&&!game.ended&&!game.paused){if(game.running)update(dt);else if(game.tutorial===2||game.tutorial===4){game.money=Math.min(walletMax(),game.money+incomeRate()*dt);render()}}requestAnimationFrame(loop)}
function highlight(sel){document.querySelectorAll('.tutorial-target').forEach(e=>e.classList.remove('tutorial-target'));if(sel)$(sel).classList.add('tutorial-target');$('#game').classList.toggle('guiding',!!sel)}
function tutorial(){let text=$('#tutorialText'),next=$('#nextBtn'),box=$('#tutorial');let steps=[['오른쪽은 아군의 성입니다.','#allyBase'],['왼쪽의 적 성을 파괴하면 승리합니다!','#enemyBase'],['돈을 사용해서 레드를 생성해 보세요!','#spawnBtn'],['돈은 시간이 지나면 자동으로 모입니다. 적을 쓰러뜨려도 돈을 얻습니다!','#money'],['수입을 업그레이드하면 더 많은 돈을 더 빠르게 모을 수 있습니다!','#incomeBtn'],['캐릭터와 적은 자동으로 이동하고 공격합니다. 레드를 계속 생성해 적 성을 파괴하세요!','']];if(game.tutorial>=steps.length){box.classList.add('hidden');highlight();game.running=true;return}box.classList.remove('hidden');text.textContent=steps[game.tutorial][0];highlight(steps[game.tutorial][1]);next.style.display=(game.tutorial===2||game.tutorial===4)?'none':'inline-block'}
$('#nextBtn').onclick=()=>{game.tutorial++;tutorial();render()};$('#spawnBtn').onclick=()=>addUnit('red');$('#orangeBtn').onclick=()=>addUnit('orange');$('#yellowBtn').onclick=()=>addUnit('yellow');$('#greenBtn').onclick=()=>addUnit('green');for(const t of GENERIC_CD_TYPES)$('#'+t+'Btn').onclick=()=>addUnit(t);$('#incomeBtn').onclick=()=>{let l=data.income[game.level];if(!game.ended&&!game.paused&&(game.running||game.tutorial===4)&&l.cost!==null&&game.money>=l.cost){game.money-=l.cost;game.level++;if(game.tutorial===4){game.tutorial++;tutorial()}render()}};function finish(win){if(game.ended)return;const sp=STAGES[selectedStage].special,xpReward=win&&!sp?awardXP():0;const speedDropped=win&&!sp&&selectedStage>=18&&Math.random()<0.3;let specialDrop=0;if(win&&sp&&Math.random()<sp.chance){specialDrop=sp.count;speedTickets+=specialDrop;saveSpeedTickets();renderSpeedButton()}if(speedDropped){speedTickets++;saveSpeedTickets();renderSpeedButton()}game.ended=true;game.running=false;highlight();$('#result').classList.remove('hidden');$('#resultTitle').textContent=win?STAGES[selectedStage].name+' 정복 완료!':'패배...';if(win&&!sp&&!cleared.includes(selectedStage)){cleared.push(selectedStage);saveProgress()}$('#nextStageBtn').classList.toggle('hidden',!win||!!sp||selectedStage===MAIN_STAGE_COUNT-1);$('#resultDetail').textContent=win?(sp?'':selectedStage===MAIN_STAGE_COUNT-1?MAIN_STAGE_COUNT+'개 스테이지를 모두 정복했어요!':(STAGES[selectedStage+1]||{}).name+' 스테이지가 열렸어요!'):'수입을 올리고 아군을 모아서 다시 도전하세요.';if(win&&selectedStage===2)$('#resultDetail').textContent+=' 오렌지가 해금됐어요!';if(win&&selectedStage===5)$('#resultDetail').textContent+=' 옐로우가 해금됐어요!';if(win&&selectedStage===6)$('#resultDetail').textContent+=' 그린이 해금됐어요!';if(win){for(const t of ['cyan','blue','purple',...NEW_ALLY_TYPES])if(selectedStage===UNLOCK_AT[t])$('#resultDetail').textContent+=' '+UNIT_NAMES[t]+' 해금!';$('#resultDetail').textContent+=` 보상 +${xpReward} XP`;}if(speedDropped)$('#resultDetail').textContent+=' 2배속권 획득!';if(sp)$('#resultDetail').textContent=win?(specialDrop?`스피드업 ${specialDrop}개 획득! (보유 ${speedTickets}개)`:'이번에는 스피드업을 얻지 못했어요. 다시 도전해 보세요!'):'전력을 올리고 다시 도전하세요.';renderNewButtons();renderOrangeButton();renderYellowButton();renderGreenButton()}$('#restartBtn').onclick=reset;
$('#skipBtn').onclick=()=>{game.tutorial=6;tutorial();render()};
$('#pauseBtn').onclick=()=>{if(game.running&&!game.ended){game.paused=!game.paused;render()}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&game.running&&!game.ended){game.paused=true;render()}});



// Original PNG atlas coordinates: Doge only, not Doge Dark or variants.
const DOG_FRAMES={walk:[[4,50],[57,50],[110,50]],attack:[[4,125],[57,125],[110,125],[164,125]],hurt:[[4,201]]};
function animateDog(u){
 if(u.type==='pigge'){animatePigge(u);return}
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

const UNIT_NAMES={pink:'핑크',rhino:'투뿔소',bear:'곰선생',face:'대갈이군',cyan:'시안',blue:'블루',purple:'퍼플',peng:'재키펭',gory:'고릴라저씨',baa:'메에메에',seal:'바다레오파드',croco:'아거',leboin:'빠옹',rabbit:'엘리트래빗',squirrel:'다람G',kangaroo:'캥거류',mooth:'나나나난나방',red:'레드',orange:'오렌지',green:'그린',yellow:'옐로우',dog:'멍뭉이',snache:'낼름이',guys:'놈놈놈',hippo:'하마양',pigge:'돼지새끼',crimson:'크림슨',gold:'골드',ivory:'아이보리',chartreuse:'샤르트뢰즈',mint:'민트',azure:'애저',crystal:'크리스탈',lavender:'라벤더',salmon:'살몬',raspberry:'라즈베리'};
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
TUESDAY_STAGES.forEach((t,k)=>{const boss=t.boss,rules=[{type:'dog',at:{t:0},delay:[4,8]},{type:'snache',at:{t:5},delay:[8,20]},{type:'guys',at:{t:15},delay:[10,26]},{type:boss,at:{hp:90},count:1,boss:true}];if(k>=1)rules.push({type:boss,at:{hp:50},count:k>=3?2:1,delay:[6,10]});STAGE_SPAWNS[MAIN_STAGE_COUNT+k]=rules});
// Max enemies alive at once, per Battle Cats wiki (EoC Korea~Moon). Chapter 2 reuses the same caps.
const STAGE_MAX_ENEMIES=[3,4,30,5,6,7,6,5,10,5,6,7,12,3,4,6,10,10,10,10,10,4,5,3,5,20,8,8,10,10,10,8,6,10,10,10,4,8,5,10,10,5,10,4,2,10,3,4];
function maxEnemies(i){return STAGES[i]?.maxEnemies??STAGE_MAX_ENEMIES[i<CHAPTER1_LEN?i:i-CHAPTER1_LEN]??Infinity}
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
  addUnit(r.type,r.boss);r.spawned++;alive++;
  if(r.boss){triggerBossShockwave();$('#battleNotice').textContent='보스 '+UNIT_NAMES[r.type]+' 등장!';game.noticeTime=3}
  r.clock=Math.max(r.clock,-dt)+(r.delay?pickDelay(r.delay):1e9);
 }
}
function renderNewButtons(){for(const type of GENERIC_CD_TYPES){
 const b=$('#'+type+'Btn'),d=data.units[type],unlocked=allyUnlocked(type),cd=unitCooldown(type);
 b.disabled=!unlocked||!game.running||game.paused||game.ended||game.money<unitCost(type)||cd>0||allyDeployFull();
 b.querySelector('small').textContent=!unlocked?STAGES[UNLOCK_AT[type]].name+(STAGES[UNLOCK_AT[type]].chapter===2?' 2장':'')+' 클리어 시 해금':allyDeployFull()?'출격 인원 가득참':`${unitCost(type)}원`;
 b.querySelector('em').style.display=cd?'block':'none';b.querySelector('em').style.transform=`scaleY(${cd/unitStats(type).cooldown})`;
}}

const NEW_ATLASES={
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
 ivory:{scale:0.36,left:-30,sheet:IVORY_SHEET,walk:[[11,284,171,179,0],[270,284,171,178,-1],[535,284,175,180,2]],attack:[[753,246,248,216,8],[1035,283,354,180,183],[1458,284,171,179,0]],hurt:[[1710,281,265,188,29]],evolved:{sheet:IVORY_EVOLVED_SHEET,scale:0.296,left:-30,walk:[[34,211,206,290,0],[269,211,198,290,1],[506,211,200,290,0]],attack:[[758,211,251,290,32],[1018,211,433,290,148],[1475,211,179,290,2]],hurt:[[1697,211,289,290,47]]}},
 chartreuse:{scale:0.45,left:-30,sheet:CHARTREUSE_SHEET,walk:[[45,35,142,153,0],[260,39,140,146,0],[471,33,148,155,3]],attack:[[681,35,163,153,-3],[859,39,286,150,145],[1202,35,137,151,-4]],hurt:[[1413,37,191,152,7]],evolved:{sheet:CHARTREUSE_EVOLVED_SHEET,scale:0.259,left:-24,walk:[[31,219,187,302,0],[276,219,187,302,-3],[524,219,197,302,-4]],attack:[[773,219,223,302,-4],[1017,219,413,302,167],[1483,219,192,302,-4]],hurt:[[1741,219,250,302,20]]}},
 mint:{scale:0.45,left:-30,sheet:MINT_SHEET,walk:[[51,43,132,142,0],[266,44,131,142,-1],[473,43,137,143,4]],attack:[[668,33,176,153,37],[878,46,266,141,134],[1198,44,129,141,-2]],hurt:[[1407,45,170,143,9]],evolved:{sheet:MINT_EVOLVED_SHEET,scale:0.284,left:-23,walk:[[6,0,169,320,0],[181,0,186,320,18],[373,0,179,320,-10]],attack:[[558,0,239,320,40],[803,0,477,320,249],[1286,0,207,320,8]],hurt:[[1499,0,287,320,-10]]}},
 azure:{scale:0.45,left:-30,sheet:AZURE_SHEET,walk:[[46,47,144,157,0],[252,51,143,151,-1],[452,46,148,158,3]],attack:[[665,5,182,195,17],[861,7,322,210,38],[1226,44,141,157,-3]],hurt:[[1411,46,199,156,11]],evolved:{sheet:AZURE_EVOLVED_SHEET,scale:0.319,left:-29,walk:[[6,0,186,321,0],[198,0,182,321,-11],[386,0,185,321,15]],attack:[[577,0,306,321,40],[889,0,474,321,162],[1369,0,198,321,-23]],hurt:[[1573,0,292,321,16]]}},
 crystal:{scale:0.45,left:-30,sheet:CRYSTAL_SHEET,walk:[[47,35,144,155,0],[256,38,143,151,0],[463,35,146,155,2]],attack:[[678,35,165,154,-1],[857,35,274,154,132],[1186,35,143,155,0]],hurt:[[1399,33,191,157,8]],evolved:{sheet:CRYSTAL_EVOLVED_SHEET,scale:0.277,left:-23,walk:[[6,0,167,297,0],[179,0,168,297,2],[353,0,164,297,-1]],attack:[[523,0,272,297,88],[801,0,515,297,294],[1322,0,194,297,-2]],hurt:[[1522,0,240,297,66]]}},
 lavender:{scale:0.45,left:-30,sheet:LAVENDER_SHEET,walk:[[51,35,140,153,0],[263,37,139,149,0],[470,35,144,153,4]],attack:[[681,35,169,153,0],[872,35,259,152,119],[1190,35,138,152,-1]],hurt:[[1416,35,188,151,5]],evolved:{sheet:LAVENDER_EVOLVED_SHEET,scale:0.293,left:-29,walk:[[6,0,199,274,0],[211,0,193,274,-8],[410,0,192,274,-8]],attack:[[608,0,206,274,-6],[820,0,498,274,291],[1324,0,192,274,32]],hurt:[[1522,0,272,274,76]]}},
 salmon:{scale:0.45,left:-30,sheet:SALMON_SHEET,walk:[[51,72,131,143,0],[264,72,130,142,-2],[454,72,135,144,3]],attack:[[648,6,176,208,11],[824,74,339,141,207],[1231,71,131,143,-1]],hurt:[[1427,70,185,146,9]],evolved:{sheet:SALMON_EVOLVED_SHEET,scale:0.298,left:-34,walk:[[6,0,229,344,0],[241,0,200,344,-28],[447,0,212,344,-17]],attack:[[665,0,253,344,-14],[924,0,528,344,216],[1458,0,200,344,-36]],hurt:[[1664,0,280,344,-5]]}},
 raspberry:{scale:0.45,left:-30,sheet:RASPBERRY_SHEET,walk:[[37,34,141,152,0],[256,35,136,147,-3],[475,33,144,154,2]],attack:[[663,36,197,151,56],[877,36,279,151,139],[1221,33,140,153,-1]],hurt:[[1453,37,191,150,9]],evolved:{sheet:RASPBERRY_EVOLVED_SHEET,scale:0.328,left:-33,walk:[[6,0,206,279,0],[218,0,209,279,2],[433,0,199,279,-14]],attack:[[638,0,265,279,24],[909,0,483,279,232],[1398,0,210,279,-2]],hurt:[[1614,0,261,279,30]]}},
 guys:{scale:1,left:0,walk:[[30,40,43,32],[90,40,42,32],[150,40,43,32],[210,40,43,32],[270,40,43,32]],attack:[[30,100,43,32],[90,100,48,32],[150,100,51,32],[210,100,54,32],[270,87,63,45],[30,147,64,45],[100,154,56,38],[160,154,56,38],[220,161,43,31]],hurt:[[33,221,41,31]]},
 hippo:{scale:.9,left:-26,walk:[[1,24,105,78],[113,24,105,78],[226,24,104,78]],attack:[[337,4,99,98],[1,104,99,101],[113,118,110,87],[225,140,109,65],[338,127,104,78]]}
};
// The first column is locomotion; the second is windup; the third is impact/recovery.
// Keep the body anchored and show impact at the same 14f threshold as damage.
function animatePigge(u){
 let frame,state;
 if(u.hurtTime>0){state='hurt';frame=[368,72,103,65]}
 else if(u.attackTime>0){
  state='attack';const f=(data.units.pigge.attackDuration-u.attackTime)*30;
  frame=f<5?[115,5,104,73]:f<10?[112,80,109,76]:f<14?[115,158,104,75]:f<17?[225,1,126,104]:f<22?[225,107,126,67]:[225,177,126,67];
 }else{
  const t=target(u),stationary=(t&&Math.abs(t.x-u.x)<=data.units.pigge.range)||(!t&&data.bases.ally.frontX-u.x<=data.units.pigge.range);
  state=stationary?'idle':'walk';frame=[[4,1,103,77],[4,79,103,76],[4,157,103,76]][stationary?0:Math.floor(u.animTime/.16)%3];
 }
 const [x,y,w,h]=frame,el=u.el.querySelector('.dog-sprite');el.style.backgroundPosition=`-${x}px -${y}px`;el.style.width=w+'px';el.style.height=h+'px';el.style.left='-20px';el.style.transform='scale(.8)';el.style.transformOrigin='left bottom';el.style.filter='none';u.el.dataset.animation=state;
}
function animateAtlas(u){
 const baseAtlas=NEW_ATLASES[u.type];
 const atlas=(u.stats?.evolved&&baseAtlas.evolved)?baseAtlas.evolved:baseAtlas;
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 // Gory's raised-fists sprite is its actual hitback pose; Peng uses an upright pose.
 const visualState=state==='hurt'&&u.type==='gory'?'attack':state==='hurt'&&(['peng'].includes(u.type)||!atlas.hurt)?'walk':state;
 const frames=atlas[visualState];
 const duration=data.units[u.type].attackDuration||.56;
 let index=visualState==='attack'?Math.min(frames.length-1,Math.max(0,Math.floor((duration-u.attackTime)/duration*frames.length))):visualState==='walk'?Math.floor(u.animTime/.14)%frames.length:0;
 if(visualState==='attack'&&u.type==='peng'){
  // Play all seven attack drawings across the complete animation. Damage still lands at windup.
  const elapsed=Math.max(0,duration-u.attackTime);
  index=Math.min(frames.length-1,Math.floor(elapsed/duration*frames.length));
 }else if(visualState==='attack'&&data.units[u.type].windup){const elapsed=duration-u.attackTime,windup=data.units[u.type].windup,strike={gory:2,baa:2,seal:4,croco:3,rabbit:3,squirrel:2,mooth:3,rhino:2}[u.type];if(strike!==undefined)index=elapsed<windup?Math.min(strike-1,Math.floor(elapsed/windup*strike)):Math.min(frames.length-1,strike+Math.floor((elapsed-windup)/Math.max(.01,duration-windup)*(frames.length-strike)));}
 if(visualState==='attack'&&data.units[u.type].hits){const elapsed=duration-u.attackTime;index=Math.min(frames.length-1,Math.max(0,data.units[u.type].hits.filter(h=>h.at<=elapsed).length-1))}
 if(state==='hurt'&&u.type==='gory')index=0;
 // Optional 5th value: how far (sheet px) the body sits right of the crop's left edge
 // compared to walk frame 0, so wide impact crops don't shove the body backwards.
 const [x,y,w,h,ox=0,oy=0,rot=0]=frames[index];const sprite=u.el.querySelector('.dog-sprite');
 const scale=atlas.scale??baseAtlas.scale,left=(atlas.left??baseAtlas.left)-ox*scale;
 sprite.style.backgroundPosition=`-${x}px -${y}px`;
 sprite.style.width=w+'px';sprite.style.height=h+'px';sprite.style.left=left+'px';
 // Optional 6th value / atlas.lift (sheet px): vertical re-anchoring, e.g. the face keeps its
 // skull still while the jaw drops, floating high enough that the open jaw clears the ground.
 sprite.style.bottom=(((atlas.lift??baseAtlas.lift??0)+oy)*scale)+'px';
 // flip: the sheet faces right while allies march left; mirror inside the same box.
 // Optional 7th value: rotation (deg) about the rear-bottom pivot, e.g. the rhino rears its
 // head up before dropping it into a horn thrust (the sheet's own rearing drawings are cropped through the face).
 sprite.style.transform=atlas.flip?`translateX(${w*scale}px) scale(${-scale},${scale})`:`scale(${scale})`+(rot?` rotate(${rot}deg)`:'');sprite.style.transformOrigin='left bottom';
 sprite.style.filter=state==='hurt'&&!atlas.hurt?'brightness(1.8)':'none';
 u.el.dataset.animation=state;
}

let stageChapterView=1;
function renderStageMenu(){renderTraining();renderBaseUpgrade();renderSpecialStages();
 $('#stageGrid').innerHTML='';
 const viewStages=STAGES.map((stage,i)=>({stage,i})).filter(o=>chapterOf(o.i)===stageChapterView);
 viewStages.forEach(({stage,i})=>{const button=document.createElement('button');button.className='stage-card'+(cleared.includes(i)?' cleared':'');button.disabled=!isUnlocked(i);button.title=`등장 적: ${stageEnemies(i).map(type=>UNIT_NAMES[type]).join(' · ')} · 적 성 체력 ${stage.hp}`;button.innerHTML=`<strong>${stage.name}</strong>${cleared.includes(i)?'<small>✓</small>':''}`;button.onclick=()=>{selectedStage=i;reset()};$('#stageGrid').append(button)});
 $('#chapter1Tab').classList.toggle('active',stageChapterView===1);
 $('#chapter2Tab').classList.toggle('active',stageChapterView===2);
 $('#chapterNote').textContent=stageChapterView===2?'한국 ~ 하와이 재도전 · 모든 적 체력·공격력 150% 강화':'';
 $('#progressText').textContent=`${viewStages.filter(o=>cleared.includes(o.i)).length} / ${viewStages.length} 스테이지 클리어 · 세계편 ${stageChapterView}장`;
}
const SPEED_PACK={count:9,xp:1000};// pre-15.4: bought in packs of 9 (50 cat food in the original) - paid in XP here
function isTuesday(){try{return new Date().getDay()===2||new URLSearchParams(location.search).has('tuesday')}catch{return false}}
function buySpeedPack(){if(training.xp<SPEED_PACK.xp)return false;training.xp-=SPEED_PACK.xp;speedTickets+=SPEED_PACK.count;saveTraining();saveSpeedTickets();renderStageMenu();render();return true}
function renderSpecialStages(){
 const grid=$('#specialGrid');grid.innerHTML='';
 const open=cleared.includes(CHAPTER1_LEN-1),tue=isTuesday();
 $('#speedText').textContent=`스피드업 ${speedTickets}개`;
 $('#specialNote').textContent=!open?'세계편 1장 마지막 스테이지(달)를 클리어하면 열립니다.':tue?'오늘은 화요일! 스피드업을 얻을 수 있는 스테이지가 열려 있습니다. (초상급은 세계편 2장 클리어 후)':'화요일에만 열립니다. 스피드업은 아래에서 XP로 구매할 수도 있습니다.';
 TUESDAY_STAGES.forEach((t,k)=>{const i=MAIN_STAGE_COUNT+k,b=document.createElement('button');b.className='stage-card';const locked=!open||!tue||(k===3&&!cleared.includes(MAIN_STAGE_COUNT-1));b.disabled=locked;b.title=t.desc+' · 적 성 체력 '+t.hp;b.innerHTML=`<strong>${t.name.replace('광속 전사 ','')}</strong><small>${Math.round(t.chance*100)}%${t.count>1?' ×'+t.count:''}</small>`;b.onclick=()=>{selectedStage=i;reset()};grid.append(b)});
 const buy=document.createElement('button');buy.className='stage-card';buy.disabled=training.xp<SPEED_PACK.xp;buy.innerHTML=`<strong>스피드업 ${SPEED_PACK.count}개 구매</strong><small>${SPEED_PACK.xp} XP</small>`;buy.onclick=buySpeedPack;grid.append(buy);
}
$('#chapter1Tab').onclick=()=>{stageChapterView=1;renderStageMenu()};
$('#chapter2Tab').onclick=()=>{stageChapterView=2;renderStageMenu()};
function openStages(){if(game.running&&!game.ended)game.paused=true;highlight();render();renderStageMenu();$('#stageMenu').classList.remove('hidden');$('#resumeBtn').textContent=game.ended?'결과로 돌아가기':'전투로 돌아가기'}
$('#stagesBtn').onclick=openStages;
$('#resultStagesBtn').onclick=openStages;
$('#resumeBtn').onclick=()=>{$('#stageMenu').classList.add('hidden');if(!game.ended){game.paused=false;tutorial()}render()};
$('#nextStageBtn').onclick=()=>{if(game.ended&&selectedStage<MAIN_STAGE_COUNT-1&&!STAGES[selectedStage].special&&isUnlocked(selectedStage+1)){selectedStage++;reset()}};
window.addEventListener('resize',syncBasePositions);


const EVOLVED_CELL_W=1536/7*.75,EVOLVED_CELL_H=1024/8*.75;
// Windup (col 3) / impact (col 4) crops in source px of the 1774px-wide ally sheets:
// [x0,x1,dx]. The thrown object starts inside col 3, right after the windup body, so
// plain cell crops either cut it or (showing cols 3+4 together) draw the windup body
// and the impact body at once. dx re-anchors the impact body onto the walk position.
const LEGACY_THROW_CROPS={orange:{3:[665,858],4:[862,1109,66]},yellow:{3:[665,870],4:[871,1109,64]},green:{3:[665,876],4:[879,1109,55]}};
LEGACY_THROW_CROPS.purple=LEGACY_THROW_CROPS.cyan=LEGACY_THROW_CROPS.orange;
function animateAlly(u){
 const state=u.hurtTime>0?'hurt':u.attackTime>0?'attack':'walk';
 if(u.stats?.evolved){
  const sprite=u.el.querySelector('.evolved-sprite'),row=ALLIES.indexOf(u.type);
  const duration=data.units[u.type].attackDuration||.56;
  const col=u.hurtTime>0?6:u.attackTime>0?3+Math.min(2,Math.max(0,Math.floor((duration-u.attackTime)/duration*3))):Math.floor(u.animTime/.16)%3;
  sprite.style.backgroundPosition=`${-col*EVOLVED_CELL_W}px ${-row*EVOLVED_CELL_H}px`;
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

const PROFILE_SHEET='assets/profile_sheet.png';
const PROFILE_TEXT={red:'가장 먼저 전선에 뛰어든 기본 전투원. 단순하지만 어떤 전투에서도 믿을 만하다.',orange:'멀리서 과즙을 던져 모여 있는 적을 한꺼번에 공격한다.',yellow:'튼튼한 몸으로 앞줄을 지키며 가까운 적에게 전기를 방출한다.',green:'왕복하는 부메랑으로 같은 적을 두 번 공격할 수 있다.',cyan:'아주 먼 거리에서 넓은 범위를 노리는 장거리 전투원.',blue:'빠른 이동과 연속 공격으로 빈틈을 놓치지 않는 속공 전투원.',purple:'빨간 적을 상대하도록 특별히 훈련된 색상 특화 전투원.',pink:'가까이 접근한 뒤 긴 광역 판정으로 뒤쪽의 적까지 휩쓴다.',crimson:'적 앞까지 달려가 강력한 펀치를 꽂는다. 맞은 적은 짧게 밀려난다.',gold:'금광석을 던져 비행 중 세 조각으로 퍼뜨린다. 조각들은 적중 시 금괴로 변해 각각 피해를 준다.',ivory:'아이스크림을 던져 범위 피해를 주고, 맞은 적의 이동 속도를 늦춘다.',chartreuse:'주머니를 열어 콩알탄 다섯 발을 빠르게 퍼붓는다.',mint:'민트 아이스크림을 터뜨려 주변을 공격하며, 확률적으로 적을 얼려 움직임을 멈춘다.',azure:'서핑보드를 타고 전방으로 돌진하며 경로의 모든 적을 휩쓴다.',crystal:'날카로운 크리스탈 조각으로 앞줄의 적을 꿰뚫는다. 가끔 강력한 치명타가 터진다.',lavender:'향수 구름을 퍼뜨려 범위 안의 적을 공격하고 공격력을 약화시킨다.',salmon:'낚싯바늘을 멀리 던져 적을 맞히고 아군 쪽으로 끌어당긴다.',raspberry:'아주 먼 거리에서 저격한다. 멀리 있는 적일수록 총알이 가속해 피해가 커진다.'};
const EVOLUTION_TEXT={red:'강타 · 넉백 +1회 · 재사용 대기 -20%',orange:'과즙 범위 확대 · 처치 시 돈 2배',yellow:'추가 체력 · 받는 피해 -15%',green:'귀환 부메랑 강화 · 재사용 대기 -15%',cyan:'광역 범위 확대 · 떠 있는 적에게 1.8배 피해(받는 피해 0.4배)',blue:'공격 속도 증가 · 이동 속도 +25%',purple:'빨간 적 특화 강화 · 보스 피해 +30%',pink:'광역 공격력 증가 · 30% 확률로 1.5초간 느리게',crimson:'강타 위력 증가 · 보스 피해 +30%',gold:'파편 피해 증가 · 처치 시 돈 2배',ivory:'둔화 확률 40%→60% · 재사용 대기 -15%',chartreuse:'연사 피해 증가 · 연사 +1발',mint:'빙결 확률 증가 · 빙결 시간 +0.5초',azure:'돌진 피해 증가 · 20% 확률로 2배 치명타',crystal:'플로팅 특화 강화 · 관통 +1',lavender:'약화 확률 40%→60% · 약화 시간 +2초',salmon:'끌어오기 강화 · 재사용 대기 -15%',raspberry:'사거리 확장 및 관통 · 선딜 -25%'};
const PROFILE_TEXT_EVOLVED={red:'수많은 전투를 거치며 맨몸으로도 강력한 일격을 날릴 수 있게 되었다. 이제는 단순한 몸빵이 아니라 한 방을 노리는 타격형 전투원.',orange:'더 많은 과즙을 담아 던지게 되면서 폭발 범위가 눈에 띄게 넓어졌다.',yellow:'두꺼워진 몸으로 더 오래 버티며 최전선을 든든하게 지킨다.',green:'부메랑을 던지는 손목 힘이 강해져 돌아올 때 더 강력한 일격을 남긴다.',cyan:'조준 실력이 늘어 폭발 범위가 한층 넓어진 저격수로 거듭났다.',blue:'손이 더 빨라져 눈 깜짝할 사이에 연타를 꽂아 넣는다.',purple:'빨간 적의 약점을 완벽히 파악해 압도적인 피해를 입히고, 받는 피해는 최소화한다.',pink:'리본을 휘두르는 힘이 강해져 광역 공격의 위력이 한층 강력해졌다.',crimson:'주먹에 실리는 힘이 늘어나 강타의 위력이 한층 강해졌다.',gold:'더 많은 금맥을 다뤄본 경험으로 파편 하나하나의 피해가 늘어났다.',ivory:'차가운 냉기가 짙어져 적을 더 자주, 더 오래 둔화시킨다.',chartreuse:'손놀림이 빨라져 콩알탄 한 발 한 발의 위력이 늘어났다.',mint:'냉기가 응축되어 적을 얼릴 확률이 크게 늘어났다.',azure:'파도의 기세가 거세져 돌진 한 방의 위력이 늘어났다.',crystal:'결정 순도가 높아져 플로팅 적을 상대로 한층 압도적인 위력을 낸다.',lavender:'향이 짙어져 더 자주, 더 오래 적의 공격력을 떨어뜨린다.',salmon:'손맛이 늘어 적을 더 강하게 끌어당긴다.',raspberry:'조준 실력이 늘어 사거리가 늘고, 먼 거리에서는 뒤쪽 적까지 꿰뚫는다.'};
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
const NEW_PROFILE_SHEET='assets/new_chars_profiles.png';
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
 if(idx>=0&&evolved&&evoArt?.walk){// 2진: crop the idle walk pose out of the 2진 body sheet instead of the shared portrait sheet
  const [x,y,w,h]=evoArt.walk[0],k=+(112/Math.max(w,h)).toFixed(4);
  return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]} 2진 프로필" style="position:relative;overflow:hidden"><span style="position:absolute;left:${((126-w*k)/2).toFixed(1)}px;top:${((126-h*k)/2).toFixed(1)}px;width:${w}px;height:${h}px;background:url(${evoArt.sheet}) -${x}px -${y}px no-repeat;transform:scale(${k});transform-origin:0 0"></span></div>`}
 if(idx>=0){const c=NEW_PROFILE_CALIB[type];return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]}${evolved?' 2진':''} 프로필" style="background-image:url(${NEW_PROFILE_SHEET});background-size:${c.size}px ${c.size}px;background-position:${c.x}px ${c.y}px"></div>`}
 const c=PROFILE_CALIB[type][evolved?'evolved':'base'];return `<div class="generated-profile" role="img" aria-label="${UNIT_NAMES[type]}${evolved?' 2진':''} 프로필" style="background-image:url(${PROFILE_SHEET});background-size:${c.size}px ${c.size}px;background-position:${c.x}px ${c.y}px"></div>`}
const LV_EVOLVE=10,LV_MAX=20,HP_CURVE=.6,HP_LV10_MULT=1.8*2/1.15;// HP: Lv.11~20 front-loaded; Lv.10 is a jump so the 2진 (+15% HP) has 2x the Lv.9 HP
function levelCap(){return cleared.includes(MAIN_STAGE_COUNT-1)?LV_MAX:LV_EVOLVE}// Lv.11~20 unlocks after clearing the last chapter-2 stage
const ECON_COST=[1000,2000,4000,8000,16000,32000],WALLET_STEP=400,PROD_STEP=.15;// permanent XP upgrades: wallet cap +400/level, money rate +15%/level
let training={xp:0,baseLevel:1,levels:Object.fromEntries(ALLIES.map(t=>[t,1])),forms:{},walletLevel:0,prodLevel:0},trainingSaveFailed=false;
function stageXP(i){return (200+i*50)*2}
try{
 const raw=localStorage.getItem('red-battle-training-v1');
 if(raw){const saved=JSON.parse(raw);training.xp=Number.isSafeInteger(saved.xp)&&saved.xp>=0?saved.xp:0;training.baseLevel=Number.isInteger(saved.baseLevel)?Math.max(1,Math.min(10,saved.baseLevel)):1;for(const t of ALLIES){const n=saved.levels?.[t];training.levels[t]=Number.isInteger(n)?Math.max(1,Math.min(levelCap(),n)):1;if(saved.forms?.[t]===1)training.forms[t]=1}for(const k of ['walletLevel','prodLevel']){const n=saved[k];training[k]=Number.isInteger(n)?Math.max(0,Math.min(ECON_COST.length,n)):0}}
 else{training.xp=cleared.reduce((sum,i)=>sum+stageXP(i),0);saveTraining()}
}catch{trainingSaveFailed=true}
function saveTraining(){try{localStorage.setItem('red-battle-training-v1',JSON.stringify(training));trainingSaveFailed=false}catch{trainingSaveFailed=true}}
// Lv.1~10 keeps the original +10%/level curve; Lv.11~20 grows geometrically toward these Lv.20 values (evolution bonuses apply on top).
const ATK_SLOPE={red:.55};// per-level ATK growth for Lv.1~10 (default .1); red's 15 ATK could not even kill a Doge at Lv.10
const LV20_TARGET={
 red:{hp:9000,atk:800},
 orange:{hp:9600,atk:2200},
 yellow:{hp:25000,atk:1400},
 green:{hp:11300,atk:1800},
 cyan:{hp:8700,atk:3000},
 blue:{hp:10400,atk:450},
 purple:{hp:19100,atk:2100},
 pink:{hp:17400,atk:2400},
 crimson:{hp:26000,atk:4150},
 gold:{hp:19100,atk:1500},
 ivory:{hp:20900,atk:3900},
 chartreuse:{hp:19100,atk:850},
 mint:{hp:20900,atk:3600},
 azure:{hp:23500,atk:4000},
 crystal:{hp:21700,atk:4200},
 lavender:{hp:17400,atk:3200},
 salmon:{hp:15650,atk:4000},
 raspberry:{hp:14800,atk:1200}
};
function levelMult(base,target,level,curve=1,m10Hp=null,slope=.1){
 const lv=Math.min(level,LV_MAX),m10=m10Hp||1+slope*(LV_EVOLVE-1);
 if(!target||lv<LV_EVOLVE)return 1+slope*(lv-1);
 if(lv===LV_EVOLVE)return m10;
 return m10*Math.pow(Math.max(target/base,m10)/m10,Math.pow((lv-LV_EVOLVE)/(LV_MAX-LV_EVOLVE),curve));
}
// Extra 2진 effects beyond the shared +15% HP/ATK and range: [stat overrides applied on top of the base stats].
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
 raspberry:d=>({windup:d.windup*.75})
};
const EVO_ATK_BONUS={red:1.2,pink:1.15,crimson:1.2,gold:1.2,chartreuse:1.2,azure:1.2};// 2진 with a dedicated atk bonus; everyone else gets the generic +15% (hp is always +15%, yellow +20%)
function unitCost(t){return ALLIES.includes(t)?unitStats(t).cost:data.units[t].cost}
function unitStats(type,level=training.levels[type]||1,form=training.forms?.[type]===1?1:2){const d=data.units[type],T=LV20_TARGET[type],hpM=levelMult(d.hp,T?.hp,level,HP_CURVE,HP_LV10_MULT),atkM=levelMult(d.atk,T?.atk,level,1,null,ATK_SLOPE[type]),mag=ALLIES.includes(type)?1:enemyMagnification(),stats={...d,hp:Math.round(d.hp*hpM*mag),atk:Math.round(d.atk*atkM*mag)};if(d.damageTiers)stats.damageTiers=d.damageTiers.map(t=>({...t,dmg:Math.round(t.dmg*atkM)}));if(level<LV_EVOLVE||form===1)return stats;stats.evolved=true;stats.cost=d.cost*2;stats.hp=Math.round(stats.hp*(type==='yellow'?1.2:1.15));if(!EVO_ATK_BONUS[type]){const k=1.15;stats.atk=Math.round(stats.atk*k);if(stats.damageTiers)stats.damageTiers=stats.damageTiers.map(t=>({...t,dmg:Math.round(t.dmg*k)}))}stats.range=type==='raspberry'?d.range*1.1:d.range*1.2;if(d.engageRange)stats.engageRange=d.engageRange*1.2;if(type==='red')stats.atk=Math.round(stats.atk*1.2);if(type==='orange')stats.splash=d.splash*1.35;if(type==='green')stats.returnMult=1.35;if(type==='cyan')stats.splash=d.splash*1.3;if(type==='blue')stats.interval=d.interval*.8;if(type==='purple'){stats.redDamage=1.8;stats.redResist=.4}if(type==='pink')stats.atk=Math.round(stats.atk*1.15);
 if(type==='crimson')stats.atk=Math.round(stats.atk*1.2);
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
function renderSpeedButton(){
 const b=$('#speedBtn');
 b.firstChild.textContent=game.speedMultiplier===2?'2배속':'1배속';
 b.querySelector('small').textContent=game.speedUnlocked?'':`배속권 ${speedTickets}개`;
 b.disabled=!game.speedUnlocked&&speedTickets<=0;
}
$('#speedBtn').onclick=()=>{
 if(!game.speedUnlocked){
  if(speedTickets<=0)return;
  speedTickets--;saveSpeedTickets();game.speedUnlocked=true;game.speedMultiplier=2;
 }else{
  game.speedMultiplier=game.speedMultiplier===2?1:2;
 }
 renderSpeedButton();
};
function setForm(t,f){if(!ALLIES.includes(t)||training.levels[t]<LV_EVOLVE)return false;if(f===1)training.forms[t]=1;else delete training.forms[t];saveTraining();renderTraining();render();return true}
function upgradeCost(t){return training.levels[t]*100}
function upgradeCharacter(t){if(!ALLIES.includes(t)||!allyUnlocked(t)||training.levels[t]>=levelCap()||training.xp<upgradeCost(t))return false;training.xp-=upgradeCost(t);training.levels[t]++;saveTraining();renderTraining();renderBaseUpgrade();render();return true}
function walletMax(lv=game.level){return data.income[lv].max+WALLET_STEP*training.walletLevel}
function incomeRate(lv=game.level){return data.income[lv].rate*(1+PROD_STEP*training.prodLevel)}
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
 for(const[k,title,desc,fmt]of[['walletLevel','지갑 상한','전투 중 보유할 수 있는 돈의 상한',n=>'+'+WALLET_STEP*n+'원'],['prodLevel','돈 생산력','시간당 돈이 모이는 속도',n=>'+'+Math.round(PROD_STEP*n*100)+'%']]){const lv=training[k],max=ECON_COST.length,c=document.createElement('article');c.className='training-card';c.innerHTML=`<h3>${title} <small>Lv.${lv} / ${max}</small></h3><p>${desc}<br>${fmt(lv)}${lv<max?' → '+fmt(lv+1):''}</p>`;const eb=document.createElement('button');eb.textContent=lv>=max?'최대 레벨':ECON_COST[lv]+' XP · 강화';eb.disabled=lv>=max||training.xp<ECON_COST[lv];eb.onclick=()=>upgradeEcon(k);c.append(eb);grid.append(c)}
}
function awardXP(){const reward=cleared.includes(selectedStage)?Math.floor(stageXP(selectedStage)/2):stageXP(selectedStage);training.xp+=reward;saveTraining();return reward}
function renderUnitLevels(){for(const t of ALLIES){const b=$(t==='red'?'#spawnBtn':'#'+t+'Btn'),d=unitStats(t),e=d.evolved;if(t==='red')b.querySelector('small').textContent=d.cost+'원';b.querySelector('strong').firstChild.nodeValue=UNIT_NAMES[t]+(e?' 2진':'')+' Lv.'+training.levels[t];b.title=`${ROLES[t]} · 체력 ${d.hp} · 공격력 ${d.atk} · 사거리 ${Math.round(d.range)} · 공격 주기 ${d.interval.toFixed(2)}초 · 이동 ${d.speed} · ${d.cost}원${t==='purple'?' · 빨간 적에게 강함':''}${t==='cyan'||t==='crystal'?' · 떠다니는 적에게 강함':''}${e?' · 스틱맨 2진':''}`}}
function renderTraining(){
 $('#xpText').textContent=training.xp+' XP';$('#trainingGrid').innerHTML='';
 $('#deckText').textContent=`출전 덱 ${deck.length} / ${DECK_SIZE} · 전투에는 덱에 넣은 아군만 나옵니다`;
 for(const t of ALLIES){const cap=levelCap(),l=training.levels[t],d=unitStats(t),next=unitStats(t,Math.min(cap,l+1)),unlocked=allyUnlocked(t),inDeck=deck.includes(t),evolved=l>=LV_EVOLVE&&training.forms[t]!==1;if(!unlocked)continue;const card=document.createElement('article');card.className='training-card';card.innerHTML=`${profileMarkup(t,evolved)}<h3 style="color:${COLORS[t]}">${UNIT_NAMES[t]}${evolved?' 2진':''} <small>Lv.${l} / ${LV_MAX}</small>${ABILITY_ICONS[t]?`<span class="${ABILITY_ICONS[t][0]}-icon title-icon" aria-label="${ABILITY_ICONS[t][1]}" title="${ABILITY_ICONS[t][1]}"></span>`:''}</h3><p class="profile-copy"><strong>${ROLES[t]}</strong>${t==='purple'?' · 빨간 적에게 강함':''}${t==='cyan'||t==='crystal'?' · 떠다니는 적에게 강함':''}<br>${evolved?PROFILE_TEXT_EVOLVED[t]:PROFILE_TEXT[t]}${evolved?'<br><strong>2진 효과: '+EVOLUTION_TEXT[t]+' · 사거리 20% 증가</strong>':''}</p><p>체력 ${d.hp}${l<cap?' → '+next.hp:''}<br>공격력 ${d.atk}${l<cap?' → '+next.atk:''}</p>`;const b=document.createElement('button');b.textContent=!unlocked?STAGES[UNLOCK_AT[t]].name+(STAGES[UNLOCK_AT[t]].chapter===2?' 2장':'')+' 클리어로 해금':l>=cap?(cap<LV_MAX?'최대 Lv.10 · 2장 클리어 시 Lv.20':'최대 레벨'):upgradeCost(t)+' XP · 강화';b.disabled=!unlocked||l>=cap||training.xp<upgradeCost(t);b.onclick=()=>upgradeCharacter(t);card.append(b);
  if(unlocked){const db=document.createElement('button');db.className='deck-btn';db.textContent=inDeck?'덱에서 제외':deck.length>=DECK_SIZE?'덱 가득참':'덱에 추가';db.disabled=!inDeck&&deck.length>=DECK_SIZE;db.classList.toggle('active',inDeck);db.onclick=()=>toggleDeck(t);card.append(db)}
  if(unlocked&&l>=LV_EVOLVE){const fb=document.createElement('button');fb.className='form-btn';fb.textContent=evolved?'1진으로 변경 (약함)':'2진으로 변경';fb.onclick=()=>setForm(t,evolved?1:2);card.append(fb)}
  $('#trainingGrid').append(card)}
 const lockedCount=ALLIES.filter(t=>!allyUnlocked(t)).length;$('#lockedNote').textContent=lockedCount?`아직 얻지 못한 캐릭터 ${lockedCount}명 · 스테이지를 클리어하면 합류합니다`:'';
 $('#saveWarning').textContent=trainingSaveFailed?'브라우저 저장을 사용할 수 없습니다. 이번 플레이에서만 유지됩니다.':'';
}

function saveAll(){saveProgress();saveTraining();saveDeck();saveSpeedTickets()}
addEventListener('pagehide',saveAll);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveAll()});

// Order is rough difficulty progression from Korea to the Moon; used only for codex browsing.
const ENEMY_ORDER=['dog','snache','guys','hippo','pigge','peng','gory','baa','croco','rabbit','squirrel','seal','leboin','kangaroo','mooth','rhino','bear','face'];
const ENEMY_TEXT={
 dog:'가장 먼저 마주치는 흔한 잡병. 느리지 않은 속도로 꾸준히 밀려온다.',
 snache:'혀를 길게 뻗어 공격하는 정찰병. 멍뭉이보다 빠르게 접근해 온다.',
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
function codexTraitBadges(d){const b=[];if(d.trait==='red')b.push('빨간 적');if(d.trait==='floating')b.push('공중');if(d.area||d.splash||d.projectile)b.push('범위 공격');return b}
let codexTab='ally',codexType='red',codexEvolved=false,codexUnit=null,codexRAF=0,codexLast=0,codexAutoPaused=false;
function codexEntries(){return codexTab==='ally'?ALLIES.filter(allyUnlocked):ENEMY_ORDER}
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
 $('#codexEvolveToggle').classList.toggle('hidden',!ally);
 $('#codexEvolveToggle').textContent=codexEvolved?'기본 형태 보기':'2진 진화 보기';
 const d=data.units[codexType],s=ally?unitStats(codexType,codexEvolved?10:1,2):d;
 $('#codexName').textContent=UNIT_NAMES[codexType]+(ally&&codexEvolved?' 2진':'');const codexIcon=ally&&ABILITY_ICONS[codexType];if(codexIcon){const ic=document.createElement('span');ic.className=codexIcon[0]+'-icon title-icon';ic.title=codexIcon[1];ic.setAttribute('aria-label',codexIcon[1]);$('#codexName').append(ic)}
 $('#codexRole').textContent=ally?ROLES[codexType]:(codexTraitBadges(d).join(' · ')||'근접형');
 $('#codexDesc').innerHTML=ally?(codexEvolved?PROFILE_TEXT_EVOLVED[codexType]+`<br><strong>2진 효과: ${EVOLUTION_TEXT[codexType]} · 사거리 20% 증가</strong>`:PROFILE_TEXT[codexType]):ENEMY_TEXT[codexType];
 $('#codexStats').innerHTML=`<dt>체력</dt><dd>${s.hp}</dd><dt>공격력</dt><dd>${s.atk}</dd><dt>사거리</dt><dd>${Math.round(s.range)}</dd><dt>공격 주기</dt><dd>${s.interval.toFixed(2)}초</dd><dt>이동 속도</dt><dd>${s.speed}</dd>`+(ally?`<dt>비용</dt><dd>${s.cost}원</dd>`:'');
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

