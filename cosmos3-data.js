// 우주편 3장 데이터 (8.0). cosmos3.js가 스테이지 목록 맨 끝에 붙인다. 이 파일은 scripts/build-cosmos3.cjs가 만든다.
// 출처: battlecats-db 宇宙編 第3章 s03008-01~48. 기존 적의 출현 배율은 원작 ×1.3(새 스테이지 난이도), 8.0 신규 13종은 능력치에 이미 ×1.3.
const COSMOS3_DATA=[
 {
  "n": 1,
  "name": "지구",
  "jp": "地球",
  "flag": "🌍",
  "bg": "star",
  "hp": 400000,
  "max": 12,
  "xp": 1000,
  "width": 6000,
  "desc": "보스 미니스타 사이클론 · 최대 195%",
  "source": "battlecats-db s03008-01",
  "rules": [
   {
    "type": "ministercyclone",
    "at": {
     "t": 10
    },
    "count": 1,
    "boss": true
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 23.33
    },
    "mag": 195,
    "count": 1
   }
  ]
 },
 {
  "n": 2,
  "name": "화성",
  "jp": "火星",
  "flag": "🔴",
  "bg": "star",
  "hp": 410000,
  "max": 10,
  "xp": 1300,
  "width": 3600,
  "desc": "최대 3,900%",
  "source": "battlecats-db s03008-02",
  "rules": [
   {
    "type": "redsnache",
    "at": {
     "t": 10
    },
    "mag": 390,
    "count": 10,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0.07
    },
    "mag": 3900,
    "count": 10,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 13.33
    },
    "mag": 390,
    "count": 3,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "krabbe",
    "at": {
     "t": 40
    },
    "mag": 2080,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 26.67
    },
    "mag": 390,
    "count": 4,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "hyppoh",
    "at": {
     "t": 3.33
    },
    "mag": 2080,
    "count": 1
   }
  ]
 },
 {
  "n": 3,
  "name": "목성",
  "jp": "木星",
  "flag": "🟠",
  "bg": "star",
  "hp": 410000,
  "max": 15,
  "xp": 1600,
  "width": 4500,
  "desc": "보스 아거 · 최대 3,900%",
  "source": "battlecats-db s03008-03",
  "rules": [
   {
    "type": "croco",
    "at": {
     "t": 0
    },
    "mag": 3900,
    "count": 10,
    "delay": [
     1.67,
     5
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 33.33
    },
    "mag": 3900,
    "count": 10,
    "delay": [
     3.33,
     10
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 100
    },
    "mag": 3900,
    "delay": [
     5,
     15
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 20
    },
    "mag": 2080,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "baa",
    "at": {
     "hp": 99
    },
    "mag": 3900,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "gregory",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 3,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 5,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 7,
    "delay": [
     3.33,
     10
    ]
   },
   {
    "type": "croco",
    "at": {
     "hp": 99
    },
    "mag": 130,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 4,
  "name": "토성",
  "jp": "土星",
  "flag": "🪐",
  "bg": "star",
  "hp": 420000,
  "max": 15,
  "xp": 1900,
  "width": 3600,
  "desc": "최대 3,900%",
  "source": "battlecats-db s03008-04",
  "rules": [
   {
    "type": "rhino",
    "at": {
     "t": 0.07
    },
    "mag": 3120,
    "count": 5,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 47.33
    },
    "mag": 3120,
    "count": 5,
    "delay": [
     100,
     101.67
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 49
    },
    "mag": 3120,
    "count": 5,
    "delay": [
     100,
     101.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 40
    },
    "mag": 390,
    "count": 5,
    "delay": [
     13.33,
     15
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 56.67
    },
    "mag": 3900,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "pigge",
    "at": {
     "t": 40
    },
    "mag": 3120,
    "count": 5,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "pigge",
    "at": {
     "t": 41.67
    },
    "mag": 3120,
    "count": 5,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "lemurr",
    "at": {
     "t": 10
    },
    "mag": 2080,
    "count": 2,
    "delay": [
     33.33,
     33.33
    ]
   }
  ]
 },
 {
  "n": 5,
  "name": "금성",
  "jp": "金星",
  "flag": "🟡",
  "bg": "star",
  "hp": 440000,
  "max": 12,
  "xp": 2200,
  "width": 5000,
  "desc": "보스 쿠만츄 · 최대 2,080%",
  "source": "battlecats-db s03008-05",
  "rules": [
   {
    "type": "shibalienelite",
    "at": {
     "t": 0
    },
    "mag": 390,
    "count": 5,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 50
    },
    "mag": 390,
    "count": 5,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 133.33
    },
    "mag": 390,
    "count": 5,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "hp": 99
    },
    "mag": 2080,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
    "mag": 195,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 3,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 5,
    "delay": [
     10,
     10
    ]
   },
   {
    "type": "ursamajor",
    "at": {
     "hp": 99
    },
    "mag": 2080,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 6,
  "name": "수성",
  "jp": "水星",
  "flag": "⚪",
  "bg": "star",
  "hp": 430000,
  "max": 15,
  "xp": 2500,
  "width": 4800,
  "desc": "최대 3,900%",
  "source": "battlecats-db s03008-06",
  "rules": [
   {
    "type": "kidtappa",
    "at": {
     "t": 6.67
    },
    "mag": 260,
    "count": 2,
    "delay": [
     33.33,
     33.33
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 8.33
    },
    "mag": 3900,
    "count": 10,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 10
    },
    "mag": 3900,
    "count": 10,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 16.67
    },
    "mag": 3900,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "t": 26.67
    },
    "mag": 780,
    "count": 5,
    "delay": [
     16.67,
     20
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 33.33
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 60
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 66.67
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 16.67
    },
    "mag": 520,
    "delay": [
     33.33,
     50
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 36.67
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 63.33
    },
    "mag": 520,
    "count": 1
   }
  ]
 },
 {
  "n": 7,
  "name": "태양",
  "jp": "太陽",
  "flag": "☀️",
  "bg": "star",
  "hp": 440000,
  "max": 12,
  "xp": 2800,
  "width": 4000,
  "desc": "보스 대머리군 · 최대 3,120%",
  "source": "battlecats-db s03008-07",
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 2080,
    "delay": [
     13.33,
     26.67
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "t": 5
    },
    "mag": 3120,
    "delay": [
     13.33,
     26.67
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "t": 10
    },
    "mag": 3120,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 30
    },
    "mag": 2080,
    "count": 3,
    "delay": [
     60,
     63.33
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 36.67
    },
    "mag": 2080,
    "count": 3,
    "delay": [
     60,
     63.33
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "t": 60
    },
    "mag": 3120,
    "count": 3,
    "delay": [
     60,
     63.33
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "t": 63.33
    },
    "mag": 3120,
    "count": 3,
    "delay": [
     60,
     63.33
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "hp": 99
    },
    "mag": 780,
    "count": 2,
    "delay": [
     30,
     40
    ]
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 520,
    "count": 2,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
    "mag": 260,
    "count": 1
   },
   {
    "type": "phace",
    "at": {
     "hp": 99
    },
    "mag": 1300,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 8,
  "name": "우라노스",
  "jp": "ウラヌス",
  "flag": "🔵",
  "bg": "star",
  "hp": 440000,
  "max": 10,
  "xp": 3100,
  "width": 4400,
  "desc": "보스 불칸 보어 · 최대 2,080%",
  "source": "battlecats-db s03008-08",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 0.07
    },
    "mag": 2080,
    "count": 3,
    "delay": [
     6,
     6.67
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 5.33
    },
    "mag": 2080,
    "count": 3,
    "delay": [
     6,
     6.67
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 46.67
    },
    "mag": 1040,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "t": 66.67
    },
    "mag": 1040,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 99
    },
    "mag": 520,
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "nimoy",
    "at": {
     "hp": 99
    },
    "mag": 1040,
    "firstDelay": 40,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 9,
  "name": "넵튠",
  "jp": "ネプチューン",
  "flag": "🔷",
  "bg": "star",
  "hp": 460000,
  "max": 12,
  "xp": 3400,
  "width": 4400,
  "desc": "최대 2,080%",
  "source": "battlecats-db s03008-09",
  "rules": [
   {
    "type": "ministercyclone",
    "at": {
     "t": 16.67
    },
    "mag": 120,
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "krabbe",
    "at": {
     "t": 0
    },
    "mag": 2080,
    "delay": [
     33.33,
     33.33
    ]
   },
   {
    "type": "mamaleboin",
    "at": {
     "t": 6.67
    },
    "mag": 520,
    "count": 1
   }
  ]
 },
 {
  "n": 10,
  "name": "트리톤",
  "jp": "トリトン",
  "flag": "🧊",
  "bg": "star",
  "hp": 430000,
  "max": 10,
  "xp": 3700,
  "width": 3600,
  "desc": "최대 1,300%",
  "source": "battlecats-db s03008-10",
  "rules": [
   {
    "type": "kidtappa",
    "at": {
     "t": 6.67
    },
    "mag": 260,
    "count": 1
   },
   {
    "type": "cyberx",
    "at": {
     "t": 10
    },
    "mag": 1040,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 30
    },
    "mag": 520,
    "count": 3,
    "delay": [
     16.67,
     20
    ]
   },
   {
    "type": "liz56",
    "at": {
     "t": 20
    },
    "mag": 1300,
    "count": 1
   }
  ]
 },
 {
  "n": 11,
  "name": "플루토",
  "jp": "プルートゥ",
  "flag": "🌑",
  "bg": "star",
  "hp": 450000,
  "max": 10,
  "xp": 4000,
  "width": 4000,
  "desc": "보스 멍뭉이 · 최대 5,200%",
  "source": "battlecats-db s03008-11",
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 4
    },
    "mag": 5200,
    "count": 15,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 2
    },
    "mag": 5200,
    "count": 15,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0.07
    },
    "mag": 5200,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "lemurr",
    "at": {
     "t": 6.67
    },
    "mag": 2080,
    "count": 1
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0.07
    },
    "mag": 2080,
    "count": 15,
    "delay": [
     3.33,
     3.33
    ]
   },
   {
    "type": "gregory",
    "at": {
     "hp": 99
    },
    "mag": 520,
    "firstDelay": 0.07,
    "count": 2,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "lemurr",
    "at": {
     "hp": 99
    },
    "mag": 2080,
    "firstDelay": 6.67,
    "count": 1
   },
   {
    "type": "maawth",
    "at": {
     "hp": 99
    },
    "mag": 2080,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "dog",
    "at": {
     "hp": 99
    },
    "mag": 13,
    "firstDelay": 4,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 12,
  "name": "붉은 직사각형 성운",
  "jp": "赤い長方形星雲",
  "flag": "🟥",
  "bg": "nebula",
  "hp": 460000,
  "max": 10,
  "xp": 4300,
  "width": 6000,
  "desc": "보스 샤이 보어 · 최대 5,200%",
  "source": "battlecats-db s03008-12",
  "rules": [
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 120,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 3.33
    },
    "mag": 2080,
    "count": 10,
    "delay": [
     23.33,
     30
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 1.33
    },
    "mag": 5200,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "rhino",
    "at": {
     "hp": 99
    },
    "mag": 3120,
    "firstDelay": 2.67,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "bore",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 13,
  "name": "에스키모 성운",
  "jp": "エスキモー星雲",
  "flag": "🌀",
  "bg": "nebula",
  "hp": 480000,
  "max": 12,
  "xp": 4600,
  "width": 5000,
  "desc": "최대 2,080%",
  "source": "battlecats-db s03008-13",
  "rules": [
   {
    "type": "mamaleboin",
    "at": {
     "t": 16.67
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 2080,
    "delay": [
     16.67,
     23.33
    ]
   },
   {
    "type": "ursamajor",
    "at": {
     "t": 3.33
    },
    "mag": 2080,
    "count": 1
   },
   {
    "type": "gardeneels",
    "at": {
     "t": 13.33
    },
    "mag": 120,
    "count": 1
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 26.67
    },
    "mag": 1040,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 16.67
    },
    "mag": 2080,
    "count": 8,
    "delay": [
     13.33,
     13.33
    ]
   }
  ]
 },
 {
  "n": 14,
  "name": "고양이눈 성운",
  "jp": "キャッツアイ星雲",
  "flag": "👁️",
  "bg": "nebula",
  "hp": 465000,
  "max": 13,
  "xp": 4900,
  "width": 4000,
  "desc": "최대 2,080%",
  "source": "battlecats-db s03008-14",
  "rules": [
   {
    "type": "starpeng",
    "at": {
     "t": 50
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "maawth",
    "at": {
     "t": 3.33
    },
    "mag": 2080,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 28
    },
    "mag": 390,
    "count": 3,
    "delay": [
     10,
     10
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 33.33
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 36.67
    },
    "mag": 520,
    "count": 1
   },
   {
    "type": "krabbe",
    "at": {
     "t": 40
    },
    "mag": 2080,
    "count": 4,
    "delay": [
     23.33,
     26.67
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 20
    },
    "mag": 2080,
    "delay": [
     10,
     16.67
    ]
   }
  ]
 },
 {
  "n": 15,
  "name": "알 성운",
  "jp": "卵星雲",
  "flag": "🥚",
  "bg": "nebula",
  "hp": 485000,
  "max": 10,
  "xp": 5200,
  "width": 4200,
  "desc": "최대 5,200%",
  "source": "battlecats-db s03008-15",
  "rules": [
   {
    "type": "ursamajor",
    "at": {
     "t": 26.67
    },
    "mag": 2080,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 10
    },
    "mag": 325,
    "count": 5,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 16.67
    },
    "mag": 650,
    "count": 5,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 20
    },
    "mag": 5200,
    "count": 8,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 60
    },
    "mag": 650,
    "count": 3,
    "delay": [
     20,
     20
    ]
   }
  ]
 },
 {
  "n": 16,
  "name": "호리병박 성운",
  "jp": "ひょうたん星雲",
  "flag": "🫙",
  "bg": "nebula",
  "hp": 470000,
  "max": 10,
  "xp": 5500,
  "width": 4500,
  "desc": "최대 2,080%",
  "source": "battlecats-db s03008-16",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 6.67
    },
    "mag": 2080,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "gregory",
    "at": {
     "t": 10
    },
    "mag": 650,
    "count": 2,
    "delay": [
     50,
     50
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 26.67
    },
    "mag": 325,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 63.33
    },
    "mag": 650,
    "count": 1
   }
  ]
 },
 {
  "n": 17,
  "name": "알타이르",
  "jp": "アルタイル",
  "flag": "⭐",
  "bg": "deep",
  "hp": 490000,
  "max": 15,
  "xp": 5800,
  "width": 4500,
  "desc": "최대 650%",
  "source": "battlecats-db s03008-17",
  "rules": [
   {
    "type": "mamaleboin",
    "at": {
     "t": 0
    },
    "mag": 650,
    "count": 1
   },
   {
    "type": "strayguy",
    "at": {
     "t": 0
    },
    "mag": 260,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "strayguy",
    "at": {
     "t": 30
    },
    "mag": 260,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "strayguy",
    "at": {
     "t": 33.33
    },
    "mag": 260,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "t": 66.67
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 6.67
    },
    "mag": 325,
    "count": 3,
    "delay": [
     33.33,
     36.67
    ]
   },
   {
    "type": "gregory",
    "at": {
     "t": 30
    },
    "mag": 650,
    "count": 1
   }
  ]
 },
 {
  "n": 18,
  "name": "시리우스",
  "jp": "シリウス",
  "flag": "⭐",
  "bg": "deep",
  "hp": 515000,
  "max": 10,
  "xp": 6100,
  "width": 5500,
  "desc": "보스 대머리군 · 최대 5,200%",
  "source": "battlecats-db s03008-18",
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 10
    },
    "mag": 2080,
    "count": 7,
    "delay": [
     16.67,
     26.67
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 10
    },
    "mag": 5200,
    "delay": [
     3.33,
     10
    ]
   },
   {
    "type": "phace",
    "at": {
     "t": 10
    },
    "mag": 1300,
    "count": 1,
    "boss": true
   },
   {
    "type": "cyberx",
    "at": {
     "t": 30
    },
    "mag": 1040,
    "count": 1
   },
   {
    "type": "croco",
    "at": {
     "t": 100
    },
    "mag": 5200,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "gardeneels",
    "at": {
     "t": 20
    },
    "mag": 150,
    "count": 1
   }
  ]
 },
 {
  "n": 19,
  "name": "카노푸스",
  "jp": "カノープス",
  "flag": "⭐",
  "bg": "deep",
  "hp": 465000,
  "max": 10,
  "xp": 6400,
  "width": 3800,
  "desc": "최대 650%",
  "source": "battlecats-db s03008-19",
  "rules": [
   {
    "type": "metalhippo",
    "at": {
     "t": 0
    },
    "mag": 390,
    "count": 4,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 36.67
    },
    "mag": 650,
    "count": 3,
    "delay": [
     66.67,
     66.67
    ]
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 10
    },
    "mag": 650,
    "count": 3,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 16.67
    },
    "mag": 650,
    "count": 8,
    "delay": [
     16.67,
     33.33
    ]
   }
  ]
 },
 {
  "n": 20,
  "name": "베가",
  "jp": "ベガ",
  "flag": "⭐",
  "bg": "deep",
  "hp": 490000,
  "max": 15,
  "xp": 6700,
  "width": 4500,
  "desc": "보스 살의의 멍뭉이 · 최대 2,080%",
  "source": "battlecats-db s03008-20",
  "rules": [
   {
    "type": "sael",
    "at": {
     "t": 0.07
    },
    "mag": 2080,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 10
    },
    "mag": 2080,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 16.67
    },
    "mag": 1040,
    "count": 2,
    "delay": [
     30,
     30
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 325,
    "firstDelay": 0.07,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 325,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "scissorman",
    "at": {
     "hp": 99
    },
    "mag": 780,
    "firstDelay": 0.07,
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "hp": 99
    },
    "mag": 325,
    "firstDelay": 0.07,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 13,
    "firstDelay": 16.67,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 21,
  "name": "알데바란",
  "jp": "アルデバラン",
  "flag": "⭐",
  "bg": "deep",
  "hp": 520000,
  "max": 10,
  "xp": 7000,
  "width": 5000,
  "desc": "최대 3,380%",
  "source": "battlecats-db s03008-21",
  "rules": [
   {
    "type": "rabbit",
    "at": {
     "t": 3.33
    },
    "mag": 3380,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 6.67
    },
    "mag": 2340,
    "count": 3,
    "delay": [
     16.67,
     23.33
    ]
   },
   {
    "type": "shyboy",
    "at": {
     "t": 13.33
    },
    "mag": 2080,
    "count": 1
   },
   {
    "type": "gardeneels",
    "at": {
     "t": 16.67
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "spaceborg",
    "at": {
     "t": 18.67
    },
    "mag": 650,
    "count": 1
   }
  ]
 },
 {
  "n": 22,
  "name": "베텔게우스",
  "jp": "ベテルギウス",
  "flag": "⭐",
  "bg": "deep",
  "hp": 500000,
  "max": 10,
  "xp": 7300,
  "width": 3600,
  "desc": "보스 미니스타 사이클론 · 최대 780%",
  "source": "battlecats-db s03008-22",
  "rules": [
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 0.07
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 23.33
    },
    "mag": 390,
    "delay": [
     53.33,
     53.33
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "t": 46.67
    },
    "mag": 260,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 66.67
    },
    "mag": 650,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "t": 33.33
    },
    "mag": 780,
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "firstDelay": 0.07,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "firstDelay": 0.07,
    "count": 3,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "firstDelay": 0.07,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 23,
  "name": "데네브",
  "jp": "デネブ",
  "flag": "⭐",
  "bg": "deep",
  "hp": 540000,
  "max": 20,
  "xp": 7600,
  "width": 4000,
  "desc": "보스 루퍼좀씨 · 최대 2,340%",
  "source": "battlecats-db s03008-23",
  "rules": [
   {
    "type": "looper",
    "at": {
     "t": 3.33
    },
    "mag": 150,
    "count": 1,
    "boss": true
   },
   {
    "type": "shibalien",
    "at": {
     "t": 5
    },
    "mag": 2340,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 26.67
    },
    "mag": 650,
    "count": 4,
    "delay": [
     13.33,
     16.67
    ]
   }
  ]
 },
 {
  "n": 24,
  "name": "과자 행성",
  "jp": "惑星スナック",
  "flag": "🍪",
  "bg": "deep",
  "hp": 515000,
  "max": 10,
  "xp": 7900,
  "width": 3000,
  "desc": "최대 3,380%",
  "source": "battlecats-db s03008-24",
  "rules": [
   {
    "type": "hyppoh",
    "at": {
     "t": 0.07
    },
    "mag": 2340,
    "count": 2,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 3.33
    },
    "mag": 1040,
    "count": 5,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 10
    },
    "mag": 2340,
    "count": 5,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 33.33
    },
    "mag": 390,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 36.67
    },
    "mag": 910,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 40
    },
    "mag": 1040,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 43.33
    },
    "mag": 2340,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 50
    },
    "mag": 1040,
    "delay": [
     3.33,
     3.33
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 50
    },
    "mag": 2340,
    "count": 3,
    "delay": [
     3.33,
     3.33
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 53.33
    },
    "mag": 2340,
    "count": 6,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 53.33
    },
    "mag": 3380,
    "count": 1
   }
  ]
 },
 {
  "n": 25,
  "name": "사이타 별",
  "jp": "サイータ星",
  "flag": "🌟",
  "bg": "alien",
  "hp": 545000,
  "max": 15,
  "xp": 8200,
  "width": 4000,
  "desc": "최대 2,340%",
  "source": "battlecats-db s03008-25",
  "rules": [
   {
    "type": "phace",
    "at": {
     "t": 23.33
    },
    "mag": 1300,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 2340,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 133.33
    },
    "mag": 2340,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 16.67
    },
    "mag": 455,
    "count": 3,
    "delay": [
     46.67,
     56.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 33.33
    },
    "mag": 910,
    "count": 3,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "gregory",
    "at": {
     "t": 66.67
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 93.33
    },
    "mag": 910,
    "count": 4,
    "delay": [
     3.33,
     5
    ]
   },
   {
    "type": "gregory",
    "at": {
     "t": 120
    },
    "mag": 910,
    "count": 2,
    "delay": [
     6.67,
     6.67
    ]
   }
  ]
 },
 {
  "n": 26,
  "name": "괴황성",
  "jp": "魁皇星",
  "flag": "🌟",
  "bg": "alien",
  "hp": 565000,
  "max": 4,
  "xp": 8500,
  "width": 3000,
  "desc": "최대 910%",
  "source": "battlecats-db s03008-26",
  "rules": [
   {
    "type": "mamaleboin",
    "at": {
     "t": 0.07
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "looper",
    "at": {
     "t": 26.67
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "painter",
    "at": {
     "t": 3.33
    },
    "mag": 910,
    "count": 2,
    "delay": [
     20,
     20
    ]
   }
  ]
 },
 {
  "n": 27,
  "name": "대마젤란 성운",
  "jp": "大マゼラン星雲",
  "flag": "🌌",
  "bg": "alien",
  "hp": 540000,
  "max": 10,
  "xp": 8800,
  "width": 5000,
  "desc": "최대 3,380%",
  "source": "battlecats-db s03008-27",
  "rules": [
   {
    "type": "cyberx",
    "at": {
     "t": 5.33
    },
    "mag": 1300,
    "count": 1
   },
   {
    "type": "rhino",
    "at": {
     "t": 12
    },
    "mag": 3380,
    "count": 8,
    "delay": [
     24,
     24
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "t": 0.07
    },
    "mag": 3380,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 0.67
    },
    "mag": 2340,
    "delay": [
     23.33,
     26.67
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 60
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "gardeneels",
    "at": {
     "t": 16.67
    },
    "mag": 250,
    "count": 1
   }
  ]
 },
 {
  "n": 28,
  "name": "부타라 별",
  "jp": "ブータラ星",
  "flag": "🐷",
  "bg": "alien",
  "hp": 560000,
  "max": 12,
  "xp": 9100,
  "width": 5000,
  "desc": "최대 2,340%",
  "source": "battlecats-db s03008-28",
  "rules": [
   {
    "type": "gregory",
    "at": {
     "t": 20
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 43.33
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 63.33
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 80
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 93.33
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 33.33
    },
    "mag": 455,
    "count": 3,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 2340,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 6.67
    },
    "mag": 2340,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "t": 106.67
    },
    "mag": 250,
    "count": 1
   }
  ]
 },
 {
  "n": 29,
  "name": "모스칸다그",
  "jp": "モスカンダグ",
  "flag": "🌟",
  "bg": "alien",
  "hp": 580000,
  "max": 10,
  "xp": 9400,
  "width": 4500,
  "desc": "최대 910%",
  "source": "battlecats-db s03008-29",
  "rules": [
   {
    "type": "captainmogu",
    "at": {
     "t": 13.33
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 40
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 60
    },
    "mag": 910,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 0.07
    },
    "mag": 390,
    "count": 4,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 3.33
    },
    "mag": 390,
    "count": 10,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 6.67
    },
    "mag": 390,
    "count": 15,
    "delay": [
     5,
     10
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 120
    },
    "mag": 390,
    "delay": [
     6.67,
     13.33
    ]
   }
  ]
 },
 {
  "n": 30,
  "name": "콜론 별",
  "jp": "コロン星",
  "flag": "🌟",
  "bg": "alien",
  "hp": 615000,
  "max": 12,
  "xp": 9700,
  "width": 4000,
  "desc": "보스 미니스타 사이클론 · 최대 2,340%",
  "source": "battlecats-db s03008-30",
  "rules": [
   {
    "type": "starpeng",
    "at": {
     "t": 20
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 36.67
    },
    "mag": 910,
    "count": 1
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 2340,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 5
    },
    "mag": 2340,
    "delay": [
     13.33,
     26.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 910,
    "count": 3,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 910,
    "count": 2,
    "delay": [
     63.33,
     66.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 910,
    "delay": [
     63.33,
     66.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 910,
    "count": 2,
    "delay": [
     63.33,
     66.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 910,
    "count": 2,
    "delay": [
     63.33,
     66.67
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 31,
  "name": "야키소판",
  "jp": "ヤキソパーン",
  "flag": "🍜",
  "bg": "alien",
  "hp": 580000,
  "max": 15,
  "xp": 10000,
  "width": 5200,
  "desc": "최대 5,200%",
  "source": "battlecats-db s03008-31",
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 10
    },
    "mag": 2340,
    "count": 10,
    "delay": [
     23.33,
     30
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 13.33
    },
    "mag": 5200,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 0
    },
    "mag": 455,
    "count": 2,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 40
    },
    "mag": 455,
    "count": 3,
    "delay": [
     16.67,
     23.33
    ]
   },
   {
    "type": "gardeneels",
    "at": {
     "t": 13.33
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 10
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 30
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 73.33
    },
    "mag": 2340,
    "count": 1
   }
  ]
 },
 {
  "n": 32,
  "name": "매실 별",
  "jp": "ウメ星",
  "flag": "🍑",
  "bg": "alien",
  "hp": 640000,
  "max": 9,
  "xp": 10300,
  "width": 4800,
  "desc": "보스 샤이 보어 · 최대 3,380%",
  "source": "battlecats-db s03008-32",
  "rules": [
   {
    "type": "pigge",
    "at": {
     "t": 0
    },
    "mag": 3380,
    "count": 5,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 0
    },
    "mag": 3380,
    "count": 3,
    "delay": [
     26.67,
     33.33
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "t": 0
    },
    "mag": 3380,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 20
    },
    "mag": 390,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 15,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "rhino",
    "at": {
     "hp": 99
    },
    "mag": 3380,
    "count": 5,
    "delay": [
     33.33,
     33.33
    ]
   },
   {
    "type": "bore",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 33,
  "name": "다라라라",
  "jp": "ダラララ",
  "flag": "🌟",
  "bg": "alien",
  "hp": 620000,
  "max": 10,
  "xp": 10600,
  "width": 3200,
  "desc": "최대 3,120%",
  "source": "battlecats-db s03008-33",
  "rules": [
   {
    "type": "alpacky",
    "at": {
     "t": 50
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 0.07
    },
    "mag": 1430,
    "count": 9,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "looper",
    "at": {
     "t": 40
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "mooth",
    "at": {
     "t": 13.33
    },
    "mag": 3120,
    "count": 1
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 26.67
    },
    "mag": 1040,
    "count": 3,
    "delay": [
     56.67,
     56.67
    ]
   }
  ]
 },
 {
  "n": 34,
  "name": "마이도무리",
  "jp": "マイドムリ",
  "flag": "🌟",
  "bg": "alien",
  "hp": 590000,
  "max": 10,
  "xp": 10900,
  "width": 4000,
  "desc": "보스 쿠만츄 · 최대 2,340%",
  "source": "battlecats-db s03008-34",
  "rules": [
   {
    "type": "hyppoh",
    "at": {
     "t": 0.07
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 40
    },
    "mag": 1430,
    "delay": [
     26.67,
     36.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 20
    },
    "mag": 1430,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "firstDelay": 0.07,
    "count": 5,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
    "mag": 715,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "ursamajor",
    "at": {
     "hp": 99
    },
    "mag": 2340,
    "firstDelay": 0.07,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 35,
  "name": "멜토즈",
  "jp": "メルトズ",
  "flag": "🌟",
  "bg": "alien",
  "hp": 640000,
  "max": 15,
  "xp": 11200,
  "width": 5500,
  "desc": "보스 파괴생물 쿠오리넨 · 최대 2,340%",
  "source": "battlecats-db s03008-35",
  "rules": [
   {
    "type": "ministercyclone",
    "at": {
     "t": 30
    },
    "mag": 400,
    "count": 3,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "clione",
    "at": {
     "t": 0.67
    },
    "mag": 2080,
    "count": 1,
    "boss": true
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 6.67
    },
    "mag": 1430,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "maawth",
    "at": {
     "t": 13.33
    },
    "mag": 2340,
    "count": 1
   }
  ]
 },
 {
  "n": 36,
  "name": "우랄루",
  "jp": "ウラルー",
  "flag": "🌟",
  "bg": "alien",
  "hp": 665000,
  "max": 10,
  "xp": 11500,
  "width": 4400,
  "desc": "보스 불칸 보어 · 최대 2,340%",
  "source": "battlecats-db s03008-36",
  "rules": [
   {
    "type": "madampoodle",
    "at": {
     "t": 6.67
    },
    "mag": 1040,
    "count": 4,
    "delay": [
     16.67,
     20
    ]
   },
   {
    "type": "nimoy",
    "at": {
     "t": 53.33
    },
    "mag": 1040,
    "count": 1,
    "boss": true
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 2340,
    "count": 3,
    "delay": [
     24,
     26.67
    ]
   }
  ]
 },
 {
  "n": 37,
  "name": "아구하무무",
  "jp": "アグハムム",
  "flag": "🌟",
  "bg": "alien",
  "hp": 690000,
  "max": 10,
  "xp": 11800,
  "width": 4800,
  "desc": "보스 엄마빠옹 · 최대 1,430%",
  "source": "battlecats-db s03008-37",
  "rules": [
   {
    "type": "metaldoge",
    "at": {
     "t": 3.33
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 13.33
    },
    "mag": 1430,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "count": 3,
    "delay": [
     23.33,
     30
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "count": 2,
    "delay": [
     30,
     36.67
    ]
   },
   {
    "type": "mamaleboin",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 38,
  "name": "소모론",
  "jp": "ソモロン",
  "flag": "🌟",
  "bg": "alien",
  "hp": 660000,
  "max": 10,
  "xp": 12100,
  "width": 4200,
  "desc": "보스 캡틴 모구 · 최대 3,900%",
  "source": "battlecats-db s03008-38",
  "rules": [
   {
    "type": "kangaroo",
    "at": {
     "t": 6.67
    },
    "mag": 3900,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "t": 33.33
    },
    "mag": 1040,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "kangaroo",
    "at": {
     "hp": 99
    },
    "mag": 3900,
    "count": 3,
    "delay": [
     33.33,
     40
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "hp": 99
    },
    "mag": 1040,
    "count": 2,
    "delay": [
     36.67,
     43.33
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 39,
  "name": "아바 부아",
  "jp": "アバ・ブア",
  "flag": "🌟",
  "bg": "alien",
  "hp": 700000,
  "max": 20,
  "xp": 12400,
  "width": 5200,
  "desc": "최대 1,040%",
  "source": "battlecats-db s03008-39",
  "rules": [
   {
    "type": "madampoodle",
    "at": {
     "t": 6.67
    },
    "mag": 1040,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "looper",
    "at": {
     "t": 16.67
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "scissorman",
    "at": {
     "t": 33.33
    },
    "mag": 1040,
    "count": 3,
    "delay": [
     23.33,
     25.33
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 30
    },
    "mag": 715,
    "count": 1
   }
  ]
 },
 {
  "n": 40,
  "name": "티탄",
  "jp": "ティターン",
  "flag": "🛰️",
  "bg": "alien",
  "hp": 640000,
  "max": 20,
  "xp": 12700,
  "width": 5500,
  "desc": "보스 미니스타 사이클론 · 최대 3,380%",
  "source": "battlecats-db s03008-40",
  "rules": [
   {
    "type": "gabriel",
    "at": {
     "t": 6.67
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "hyppoh",
    "at": {
     "t": 13.33
    },
    "mag": 2340,
    "count": 3,
    "delay": [
     23.33,
     30
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 13.33
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "pigge",
    "at": {
     "t": 23.33
    },
    "mag": 3380,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 23.33
    },
    "mag": 3380,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 26.67
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 66.67
    },
    "mag": 390,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "hyppoh",
    "at": {
     "hp": 99
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "sael",
    "at": {
     "hp": 99
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "bore",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 41,
  "name": "데스스탄",
  "jp": "デススタン",
  "flag": "💀",
  "bg": "void",
  "hp": 670000,
  "max": 10,
  "xp": 13000,
  "width": 5200,
  "desc": "보스 대머리군 · 최대 2,340%",
  "source": "battlecats-db s03008-41",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 6.67
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 43.33
    },
    "mag": 1430,
    "count": 1
   },
   {
    "type": "maawth",
    "at": {
     "t": 3.33
    },
    "mag": 2340,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "count": 3,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 1430,
    "count": 4,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "phace",
    "at": {
     "hp": 99
    },
    "mag": 1300,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 42,
  "name": "고릴라의 행성",
  "jp": "ゴリラの惑星",
  "flag": "🦍",
  "bg": "void",
  "hp": 740000,
  "max": 10,
  "xp": 13300,
  "width": 4400,
  "desc": "최대 5,200%",
  "source": "battlecats-db s03008-42",
  "rules": [
   {
    "type": "gory",
    "at": {
     "t": 0
    },
    "mag": 5200,
    "delay": [
     30,
     40
    ]
   },
   {
    "type": "gory",
    "at": {
     "t": 10
    },
    "mag": 5200,
    "count": 2,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "t": 20
    },
    "mag": 390,
    "count": 2,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "gory",
    "at": {
     "t": 30
    },
    "mag": 5200,
    "count": 10,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "t": 46.67
    },
    "mag": 390,
    "count": 3,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "t": 66.67
    },
    "mag": 260,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 83.33
    },
    "mag": 2990,
    "count": 2,
    "delay": [
     10,
     10
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 99
    },
    "mag": 2990,
    "count": 1
   }
  ]
 },
 {
  "n": 43,
  "name": "초이바트론 별",
  "jp": "チョイバトロン星",
  "flag": "🤖",
  "bg": "void",
  "hp": 660000,
  "max": 40,
  "xp": 13600,
  "width": 5000,
  "desc": "최대 5,200%",
  "source": "battlecats-db s03008-43",
  "rules": [
   {
    "type": "shibalienelite",
    "at": {
     "t": 0
    },
    "mag": 2990,
    "count": 10,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 5200,
    "delay": [
     0.07,
     4
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 5200,
    "delay": [
     0.07,
     4
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 2340,
    "count": 10,
    "delay": [
     4,
     12
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 5200,
    "delay": [
     0.07,
     4
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 16.67
    },
    "mag": 390,
    "count": 10,
    "delay": [
     4,
     14
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 16.67
    },
    "mag": 1040,
    "count": 10,
    "delay": [
     4,
     14
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "t": 66.67
    },
    "mag": 800,
    "count": 2,
    "delay": [
     66.67,
     33.33
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 0
    },
    "mag": 390,
    "count": 10,
    "delay": [
     6.67,
     16.67
    ]
   }
  ]
 },
 {
  "n": 44,
  "name": "크림슨 별",
  "jp": "クリムゾン星",
  "flag": "❤️",
  "bg": "void",
  "hp": 700000,
  "max": 10,
  "xp": 13900,
  "width": 5200,
  "desc": "최대 3,900%",
  "source": "battlecats-db s03008-44",
  "rules": [
   {
    "type": "pigge",
    "at": {
     "t": 0
    },
    "mag": 3900,
    "delay": [
     16.67,
     36.67
    ]
   },
   {
    "type": "liz56",
    "at": {
     "t": 20
    },
    "mag": 1560,
    "count": 3,
    "delay": [
     23.33,
     26.67
    ]
   },
   {
    "type": "bore",
    "at": {
     "t": 93.33
    },
    "mag": 390,
    "count": 1
   }
  ]
 },
 {
  "n": 45,
  "name": "N77 성운",
  "jp": "N77星雲",
  "flag": "🌌",
  "bg": "void",
  "hp": 690000,
  "max": 20,
  "xp": 13900,
  "width": 4000,
  "desc": "최대 5,200%",
  "source": "battlecats-db s03008-45",
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 1.33
    },
    "mag": 5200,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 3.33
    },
    "mag": 5200,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 5.33
    },
    "mag": 1560,
    "count": 3,
    "delay": [
     26.67,
     36.67
    ]
   },
   {
    "type": "metaldoge",
    "at": {
     "t": 6.67
    },
    "mag": 390,
    "count": 5,
    "delay": [
     26.67,
     40
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 1
    },
    "mag": 390,
    "count": 2,
    "delay": [
     4,
     5.33
    ]
   },
   {
    "type": "painter",
    "at": {
     "t": 46.67
    },
    "mag": 2990,
    "count": 1
   },
   {
    "type": "ribbo",
    "at": {
     "t": 48
    },
    "mag": 1560,
    "count": 3,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 50
    },
    "mag": 2990,
    "count": 3,
    "delay": [
     16.67,
     23.33
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 63.33
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 66.67
    },
    "mag": 390,
    "count": 1
   }
  ]
 },
 {
  "n": 46,
  "name": "안드로메다",
  "jp": "アンドロメダ",
  "flag": "🌌",
  "bg": "void",
  "hp": 740000,
  "max": 10,
  "xp": 13900,
  "width": 5000,
  "desc": "보스 엘리트 에이리뭉 · 최대 2,990%",
  "source": "battlecats-db s03008-46",
  "rules": [
   {
    "type": "darkdog",
    "at": {
     "t": 5
    },
    "mag": 1040,
    "count": 3,
    "delay": [
     2,
     2
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 26.67
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 13.33
    },
    "mag": 2990,
    "count": 2,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 16.67
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "t": 40
    },
    "mag": 1040,
    "count": 3,
    "delay": [
     2,
     2
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 58.33
    },
    "mag": 390,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 1040,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 390,
    "delay": [
     13.33,
     26.67
    ]
   },
   {
    "type": "gardeneels",
    "at": {
     "hp": 99
    },
    "mag": 900,
    "count": 1
   },
   {
    "type": "spaceborg",
    "at": {
     "hp": 99
    },
    "mag": 2990,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 2990,
    "firstDelay": 0.07,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "nimoy",
    "at": {
     "hp": 99
    },
    "mag": 1300,
    "count": 3,
    "delay": [
     36.67,
     36.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 13,
    "firstDelay": 0.07,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 47,
  "name": "블랙홀",
  "jp": "ブラックホール",
  "flag": "⚫",
  "bg": "void",
  "hp": 790000,
  "max": 9,
  "xp": 14200,
  "width": 5000,
  "desc": "보스 엘리트 에이리뭉 · 최대 3,250%",
  "source": "battlecats-db s03008-47",
  "rules": [
   {
    "type": "shibalienelite",
    "at": {
     "t": 10
    },
    "mag": 3250,
    "count": 5,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 33.33
    },
    "mag": 3250,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 40
    },
    "mag": 3250,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 66.67
    },
    "mag": 3250,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 100
    },
    "mag": 3250,
    "count": 4,
    "delay": [
     33.33,
     40
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 900,
    "firstDelay": 3.33,
    "count": 4,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "looper",
    "at": {
     "hp": 99
    },
    "mag": 900,
    "firstDelay": 5.33,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 13,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 48,
  "name": "빅뱅",
  "jp": "ビッグバン",
  "flag": "💥",
  "bg": "void",
  "hp": 1050000,
  "max": 12,
  "xp": 14500,
  "width": 6000,
  "desc": "보스 파이널 기가 그랜드 신 · 최대 3,250%",
  "source": "battlecats-db s03008-48",
  "rules": [
   {
    "type": "finalgod",
    "at": {
     "t": 6.67
    },
    "count": 1,
    "boss": true
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 23.33
    },
    "mag": 1690,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 26.67
    },
    "mag": 3250,
    "count": 4,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 31.67
    },
    "mag": 3250,
    "count": 2,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 53.33
    },
    "mag": 3250,
    "count": 3,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 80
    },
    "mag": 1690,
    "count": 1
   },
   {
    "type": "ministercyclone",
    "at": {
     "t": 93.33
    },
    "mag": 900,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 123.33
    },
    "mag": 3250,
    "count": 5,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "t": 140
    },
    "mag": 900,
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 153.33
    },
    "mag": 1690,
    "count": 2,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "gregory",
    "at": {
     "hp": 90
    },
    "mag": 3250,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 80
    },
    "mag": 3250,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 70
    },
    "mag": 3250,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 60
    },
    "mag": 3250,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 50
    },
    "mag": 3250,
    "firstDelay": 0.07,
    "count": 1
   }
  ]
 }
];
