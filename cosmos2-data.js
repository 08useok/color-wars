// 우주편 2장 데이터 초안 (v7.0.0 준비). 게임에는 아직 연결하지 않았다 — html이 불러오지 않는다.
// 출처: battlecats-db 宇宙編 第2章 s03007-01~48 (15번 알 성운은 miraheze 위키). 시간은 초(30fps 프레임÷30), 배율은 %.
// 신규 적 4종(ultrabaabaa·kidtappa·ribbo·kamisamaserious)은 임시 id라 스탯 등록 때 확정한다.
const COSMOS2_DATA=[
 {
  "n": 1,
  "name": "지구",
  "jp": "地球",
  "flag": "🌍",
  "bg": "star",
  "hp": 300000,
  "max": 10,
  "xp": 1000,
  "width": 4000,
  "desc": "보스 울트라 메에메에 · 최대 200%",
  "source": "battlecats-db s03007-01",
  "rules": [
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 20
    },
    "count": 1,
    "boss": true
   },
   {
    "type": "dagshund",
    "at": {
     "t": 0.67
    },
    "mag": 200,
    "count": 4,
    "delay": [
     6.67,
     8.67
    ]
   }
  ]
 },
 {
  "n": 2,
  "name": "화성",
  "jp": "火星",
  "flag": "🔴",
  "bg": "star",
  "hp": 310000,
  "max": 10,
  "xp": 1300,
  "width": 3600,
  "desc": "최대 2,000%",
  "source": "battlecats-db s03007-02",
  "rules": [
   {
    "type": "snache",
    "at": {
     "t": 10
    },
    "mag": 2000,
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
    "mag": 2000,
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
    "mag": 150,
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
    "mag": 1200,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 26.67
    },
    "mag": 150,
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
    "mag": 1200,
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
  "hp": 310000,
  "max": 15,
  "xp": 1600,
  "width": 4500,
  "desc": "보스 아거 · 최대 2,000%",
  "source": "battlecats-db s03007-03",
  "rules": [
   {
    "type": "croco",
    "at": {
     "t": 0
    },
    "mag": 2000,
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
    "mag": 2000,
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
    "mag": 2000,
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
    "mag": 1200,
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
    "mag": 2000,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 3,
    "delay": [
     16.67,
     23.33
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 150,
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
    "mag": 150,
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
  "hp": 320000,
  "max": 15,
  "xp": 1900,
  "width": 3600,
  "desc": "최대 2,000%",
  "source": "battlecats-db s03007-04",
  "rules": [
   {
    "type": "rhino",
    "at": {
     "t": 0.07
    },
    "mag": 2000,
    "count": 5,
    "delay": [
     3.33,
     3.33
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 47.33
    },
    "mag": 2000,
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
    "mag": 2000,
    "count": 5,
    "delay": [
     100,
     101.67
    ]
   },
   {
    "type": "hyppoh",
    "at": {
     "t": 40
    },
    "mag": 1200,
    "count": 5,
    "delay": [
     100,
     101.67
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 56.67
    },
    "mag": 2000,
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
    "mag": 2000,
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
    "mag": 2000,
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
    "mag": 1000,
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
  "hp": 340000,
  "max": 12,
  "xp": 2200,
  "width": 5000,
  "desc": "보스 스타 펭 · 최대 2,000%",
  "source": "battlecats-db s03007-05",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 1200,
    "count": 5,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 50
    },
    "mag": 1200,
    "count": 5,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 133.33
    },
    "mag": 1200,
    "count": 5,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 16.67
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 20
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "snache",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 2000,
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
    "mag": 150,
    "count": 5,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 150,
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
  "hp": 330000,
  "max": 15,
  "xp": 2500,
  "width": 4800,
  "desc": "최대 2,000%",
  "source": "battlecats-db s03007-06",
  "rules": [
   {
    "type": "kangaroo",
    "at": {
     "t": 6.67
    },
    "mag": 2000,
    "count": 5,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 8.33
    },
    "mag": 2000,
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
    "mag": 2000,
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
    "mag": 2000,
    "delay": [
     6.67,
     10
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 26.67
    },
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
    "mag": 150,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 60
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 66.67
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 16.67
    },
    "mag": 150,
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
    "mag": 150,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 63.33
    },
    "mag": 150,
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
  "hp": 340000,
  "max": 12,
  "xp": 2800,
  "width": 4000,
  "desc": "보스 대머리군 · 최대 2,000%",
  "source": "battlecats-db s03007-07",
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 1200,
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
    "mag": 2000,
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
    "mag": 2000,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 30
    },
    "mag": 1200,
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
    "mag": 1200,
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
    "mag": 2000,
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
    "mag": 2000,
    "count": 3,
    "delay": [
     60,
     63.33
    ]
   },
   {
    "type": "seal",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 6,
    "delay": [
     30,
     40
    ]
   },
   {
    "type": "sael",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 6,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "phace",
    "at": {
     "hp": 99
    },
    "mag": 700,
    "count": 1,
    "boss": true
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 2,
    "delay": [
     6.67,
     6.67
    ]
   }
  ]
 },
 {
  "n": 8,
  "name": "우라노스",
  "jp": "ウラヌス",
  "flag": "🔵",
  "bg": "star",
  "hp": 340000,
  "max": 10,
  "xp": 3100,
  "width": 4400,
  "desc": "보스 불칸 보어 · 최대 1,200%",
  "source": "battlecats-db s03007-08",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 0.07
    },
    "mag": 1200,
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
    "mag": 1200,
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
    "mag": 800,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "t": 66.67
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 3,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "nimoy",
    "at": {
     "hp": 99
    },
    "mag": 750,
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
  "hp": 360000,
  "max": 12,
  "xp": 3400,
  "width": 5800,
  "desc": "보스 그레고리 장군 · 최대 150%",
  "source": "battlecats-db s03007-09",
  "rules": [
   {
    "type": "gregory",
    "at": {
     "t": 16.67
    },
    "mag": 150,
    "count": 1,
    "boss": true
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 2
    },
    "count": 2,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 33.33
    },
    "count": 3,
    "delay": [
     20,
     20
    ]
   }
  ]
 },
 {
  "n": 10,
  "name": "트리톤",
  "jp": "トリトン",
  "flag": "🧊",
  "bg": "star",
  "hp": 330000,
  "max": 10,
  "xp": 3700,
  "width": 3600,
  "desc": "보스 마나부 군 · 최대 1,200%",
  "source": "battlecats-db s03007-10",
  "rules": [
   {
    "type": "kidtappa",
    "at": {
     "t": 6.67
    },
    "count": 1,
    "boss": true
   },
   {
    "type": "hyppoh",
    "at": {
     "t": 10
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 30
    },
    "mag": 200,
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
    "mag": 600,
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
  "hp": 350000,
  "max": 10,
  "xp": 4000,
  "width": 4000,
  "desc": "보스 멍뭉이 · 최대 3,000%",
  "source": "battlecats-db s03007-11",
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 4
    },
    "mag": 3000,
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
    "mag": 3000,
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
    "mag": 3000,
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
    "mag": 1000,
    "count": 1
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0.07
    },
    "mag": 1200,
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
    "mag": 200,
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
    "mag": 1000,
    "firstDelay": 6.67,
    "count": 1
   },
   {
    "type": "maawth",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "dog",
    "at": {
     "hp": 99
    },
    "mag": 10,
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
  "hp": 360000,
  "max": 13,
  "xp": 4300,
  "width": 4200,
  "desc": "최대 2,000%",
  "source": "battlecats-db s03007-12",
  "rules": [
   {
    "type": "rabbit",
    "at": {
     "t": 6.67
    },
    "mag": 2000,
    "count": 2,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 0.07
    },
    "mag": 200,
    "delay": [
     23.33,
     23.33
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 3.33
    },
    "mag": 200,
    "count": 2,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 36.67
    },
    "mag": 200,
    "count": 3,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "pigge",
    "at": {
     "t": 26.67
    },
    "mag": 2000,
    "count": 2,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "rhino",
    "at": {
     "t": 30
    },
    "mag": 2000,
    "count": 1
   },
   {
    "type": "redsnache",
    "at": {
     "t": 35.33
    },
    "mag": 200,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 33.33
    },
    "mag": 200,
    "count": 10,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 73.33
    },
    "mag": 1200,
    "count": 2,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "t": 73.33
    },
    "mag": 250,
    "count": 1
   }
  ]
 },
 {
  "n": 13,
  "name": "에스키모 성운",
  "jp": "エスキモー星雲",
  "flag": "🌀",
  "bg": "nebula",
  "hp": 380000,
  "max": 12,
  "xp": 4600,
  "width": 4000,
  "desc": "보스 엄마빠옹 · 최대 3,000%",
  "source": "battlecats-db s03007-13",
  "rules": [
   {
    "type": "peng",
    "at": {
     "t": 0
    },
    "mag": 3000,
    "delay": [
     26.67,
     40
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 6.67
    },
    "mag": 3000,
    "delay": [
     30,
     60
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 13.33
    },
    "mag": 3000,
    "count": 3,
    "delay": [
     53.33,
     55
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 15
    },
    "mag": 3000,
    "count": 3,
    "delay": [
     53.33,
     55
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 30
    },
    "delay": [
     60,
     120
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 40
    },
    "mag": 3000,
    "count": 3,
    "delay": [
     53.33,
     55
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 40.67
    },
    "mag": 3000,
    "count": 3,
    "delay": [
     53.33,
     55
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 41.33
    },
    "mag": 3000,
    "count": 3,
    "delay": [
     53.33,
     55
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 42
    },
    "mag": 3000,
    "count": 3,
    "delay": [
     53.33,
     55
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 3000,
    "count": 15,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "hp": 99
    },
    "count": 2,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 3,
    "delay": [
     20,
     26.67
    ]
   },
   {
    "type": "mamaleboin",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 14,
  "name": "고양이눈 성운",
  "jp": "キャッツアイ星雲",
  "flag": "👁️",
  "bg": "nebula",
  "hp": 365000,
  "max": 13,
  "xp": 4900,
  "width": 4000,
  "desc": "최대 1,200%",
  "source": "battlecats-db s03007-14",
  "rules": [
   {
    "type": "starpeng",
    "at": {
     "t": 56.67
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "maawth",
    "at": {
     "t": 3.33
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 28
    },
    "mag": 200,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 33.33
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "gonzales",
    "at": {
     "t": 36.67
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "krabbe",
    "at": {
     "t": 40
    },
    "mag": 1200,
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
    "mag": 1200,
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
  "jp": "",
  "flag": "🥚",
  "bg": "nebula",
  "hp": 385000,
  "max": 10,
  "xp": 5200,
  "width": 4200,
  "desc": "보스 쿠만츄 · 최대 3,000%",
  "source": "miraheze Egg Nebula (Cats of the Cosmos) Chapter 2",
  "rules": [
   {
    "type": "ursamajor",
    "at": {
     "t": 26.67
    },
    "mag": 800,
    "boss": true
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 10
    },
    "count": 5,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 16.67
    },
    "mag": 1200,
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
    "mag": 3000,
    "count": 8,
    "delay": [
     13.33,
     16.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 80
    },
    "mag": 200
   }
  ]
 },
 {
  "n": 16,
  "name": "호리병박 성운",
  "jp": "ひょうたん星雲",
  "flag": "🫙",
  "bg": "nebula",
  "hp": 370000,
  "max": 10,
  "xp": 5500,
  "width": 4500,
  "desc": "최대 400%",
  "source": "battlecats-db s03007-16",
  "rules": [
   {
    "type": "darkdog",
    "at": {
     "t": 6.67
    },
    "mag": 400,
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
    "mag": 200,
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
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 63.33
    },
    "mag": 200,
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
  "hp": 390000,
  "max": 15,
  "xp": 5800,
  "width": 4500,
  "desc": "최대 3,000%",
  "source": "battlecats-db s03007-17",
  "rules": [
   {
    "type": "mamaleboin",
    "at": {
     "t": 0
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 3000,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 30
    },
    "mag": 3000,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 33.33
    },
    "mag": 3000,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "t": 20
    },
    "count": 1
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 6.67
    },
    "count": 3,
    "delay": [
     33.33,
     36.67
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 60
    },
    "mag": 1200,
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 30
    },
    "mag": 200,
    "count": 5,
    "delay": [
     26.67,
     30
    ]
   }
  ]
 },
 {
  "n": 18,
  "name": "시리우스",
  "jp": "シリウス",
  "flag": "⭐",
  "bg": "deep",
  "hp": 415000,
  "max": 10,
  "xp": 6100,
  "width": 5500,
  "desc": "보스 거장 · 최대 3,000%",
  "source": "battlecats-db s03007-18",
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 10
    },
    "mag": 1400,
    "count": 5,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 10
    },
    "mag": 3000,
    "delay": [
     3.33,
     10
    ]
   },
   {
    "type": "eldersloth",
    "at": {
     "t": 10
    },
    "mag": 200,
    "count": 1,
    "boss": true
   },
   {
    "type": "cyberx",
    "at": {
     "t": 30
    },
    "mag": 700,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 50
    },
    "mag": 200,
    "count": 5,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 100
    },
    "mag": 3000,
    "delay": [
     6.67,
     10
    ]
   }
  ]
 },
 {
  "n": 19,
  "name": "카노푸스",
  "jp": "カノープス",
  "flag": "⭐",
  "bg": "deep",
  "hp": 365000,
  "max": 10,
  "xp": 6400,
  "width": 3800,
  "desc": "최대 1,200%",
  "source": "battlecats-db s03007-19",
  "rules": [
   {
    "type": "metalhippo",
    "at": {
     "t": 0
    },
    "mag": 200,
    "count": 3,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "hyppoh",
    "at": {
     "t": 36.67
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "ribbo",
    "at": {
     "t": 10
    },
    "count": 3,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 20
    },
    "mag": 200,
    "count": 3,
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
  "hp": 390000,
  "max": 15,
  "xp": 6700,
  "width": 4500,
  "desc": "보스 살의의 멍뭉이 · 최대 1,400%",
  "source": "battlecats-db s03007-20",
  "rules": [
   {
    "type": "sael",
    "at": {
     "t": 0.07
    },
    "mag": 1400,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 10
    },
    "mag": 1400,
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
    "mag": 400,
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
    "mag": 200,
    "firstDelay": 0.07,
    "count": 2,
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
    "mag": 200,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "hp": 99
    },
    "mag": 1400,
    "firstDelay": 0.07,
    "count": 10,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 10,
    "firstDelay": 16.67,
    "count": 1,
    "boss": true
   },
   {
    "type": "kidtappa",
    "at": {
     "hp": 99
    },
    "firstDelay": 0.07,
    "count": 1
   }
  ]
 },
 {
  "n": 21,
  "name": "알데바란",
  "jp": "アルデバラン",
  "flag": "⭐",
  "bg": "deep",
  "hp": 420000,
  "max": 10,
  "xp": 7000,
  "width": 3900,
  "desc": "최대 2,200%",
  "source": "battlecats-db s03007-21",
  "rules": [
   {
    "type": "redsnache",
    "at": {
     "t": 0.07
    },
    "mag": 200,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 16.67
    },
    "mag": 200,
    "count": 5,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "t": 16.67
    },
    "count": 2,
    "delay": [
     33.33,
     33.33
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 33.33
    },
    "mag": 2200,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 53.33
    },
    "mag": 200,
    "count": 2,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "shyboy",
    "at": {
     "t": 13.33
    },
    "mag": 800,
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
  "hp": 400000,
  "max": 10,
  "xp": 7300,
  "width": 3600,
  "desc": "보스 천사 하마양 · 최대 800%",
  "source": "battlecats-db s03007-22",
  "rules": [
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 0.07
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 6.67
    },
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 23.33
    },
    "mag": 200,
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
    "mag": 200,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 66.67
    },
    "mag": 200,
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
    "mag": 250,
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "firstDelay": 33.33,
    "count": 1
   },
   {
    "type": "gonzales",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "firstDelay": 0.07,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "hp": 99
    },
    "mag": 200,
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
    "mag": 200,
    "firstDelay": 0.07,
    "count": 1,
    "boss": true
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "hp": 99
    },
    "firstDelay": 0.07,
    "count": 3,
    "delay": [
     10,
     10
    ]
   }
  ]
 },
 {
  "n": 23,
  "name": "데네브",
  "jp": "デネブ",
  "flag": "⭐",
  "bg": "deep",
  "hp": 440000,
  "max": 8,
  "xp": 7600,
  "width": 4800,
  "desc": "보스 갤럭시 야옹마 · 최대 800%",
  "source": "battlecats-db s03007-23",
  "rules": [
   {
    "type": "madampoodle",
    "at": {
     "t": 10
    },
    "mag": 800,
    "count": 3,
    "delay": [
     16.67,
     20
    ]
   },
   {
    "type": "gregory",
    "at": {
     "t": 20
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "madampoodle",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "firstDelay": 10,
    "count": 5,
    "delay": [
     16.67,
     20
    ]
   },
   {
    "type": "alienbunbun",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 2,
    "delay": [
     33.33,
     33.33
    ]
   },
   {
    "type": "galaxynyandam",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1,
    "boss": true
   },
   {
    "type": "kidtappa",
    "at": {
     "hp": 99
    },
    "count": 1
   }
  ]
 },
 {
  "n": 24,
  "name": "과자 행성",
  "jp": "惑星スナック",
  "flag": "🍪",
  "bg": "deep",
  "hp": 415000,
  "max": 10,
  "xp": 7900,
  "width": 3000,
  "desc": "최대 2,200%",
  "source": "battlecats-db s03007-24",
  "rules": [
   {
    "type": "hyppoh",
    "at": {
     "t": 0.07
    },
    "mag": 1400,
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
    "mag": 800,
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
    "mag": 1400,
    "count": 5,
    "delay": [
     10,
     13.33
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 40
    },
    "mag": 250,
    "count": 2,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 43.33
    },
    "mag": 250,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 46.67
    },
    "mag": 800,
    "delay": [
     13.33,
     13.33
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 50
    },
    "mag": 1400,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 56.67
    },
    "mag": 800,
    "delay": [
     3.33,
     3.33
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 56.67
    },
    "mag": 1400,
    "count": 3,
    "delay": [
     3.33,
     3.33
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 60
    },
    "mag": 1400,
    "count": 6,
    "delay": [
     6.67,
     6.67
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 60
    },
    "mag": 2200,
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
  "hp": 445000,
  "max": 15,
  "xp": 8200,
  "width": 4000,
  "desc": "최대 2,000%",
  "source": "battlecats-db s03007-25",
  "rules": [
   {
    "type": "phace",
    "at": {
     "t": 23.33
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 1400,
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
    "mag": 1400,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "krabbe",
    "at": {
     "t": 16.67
    },
    "mag": 1400,
    "count": 3,
    "delay": [
     46.67,
     56.67
    ]
   },
   {
    "type": "mooth",
    "at": {
     "t": 0
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 33.33
    },
    "mag": 250,
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
    "mag": 250,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 93.33
    },
    "mag": 250,
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
    "mag": 250,
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
  "hp": 465000,
  "max": 4,
  "xp": 8500,
  "width": 3000,
  "desc": "최대 250%",
  "source": "battlecats-db s03007-26",
  "rules": [
   {
    "type": "mamaleboin",
    "at": {
     "t": 0.07
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 3.33
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "ribbo",
    "at": {
     "t": 16.67
    },
    "count": 1
   }
  ]
 },
 {
  "n": 27,
  "name": "대마젤란 성운",
  "jp": "大マゼラン星雲",
  "flag": "🌌",
  "bg": "alien",
  "hp": 440000,
  "max": 10,
  "xp": 8800,
  "width": 4800,
  "desc": "최대 2,200%",
  "source": "battlecats-db s03007-27",
  "rules": [
   {
    "type": "cyberx",
    "at": {
     "t": 5.33
    },
    "mag": 800,
    "count": 4,
    "delay": [
     26,
     26
    ]
   },
   {
    "type": "rhino",
    "at": {
     "t": 12
    },
    "mag": 2200,
    "count": 10,
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
    "mag": 2200,
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
    "mag": 1400,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 60
    },
    "mag": 1200,
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
  "hp": 460000,
  "max": 12,
  "xp": 9100,
  "width": 5000,
  "desc": "최대 1,400%",
  "source": "battlecats-db s03007-28",
  "rules": [
   {
    "type": "gregory",
    "at": {
     "t": 26.67
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 50
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 70
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 86.67
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 100
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 110
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 5
    },
    "count": 4,
    "delay": [
     43.33,
     43.33
    ]
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 1400,
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
    "mag": 1400,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 16.67
    },
    "mag": 800,
    "delay": [
     66.67,
     70
    ]
   }
  ]
 },
 {
  "n": 29,
  "name": "모스칸다그",
  "jp": "モスカンダグ",
  "flag": "🌟",
  "bg": "alien",
  "hp": 480000,
  "max": 10,
  "xp": 9400,
  "width": 4500,
  "desc": "최대 300%",
  "source": "battlecats-db s03007-29",
  "rules": [
   {
    "type": "captainmogu",
    "at": {
     "t": 13.33
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 40
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 60
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "t": 80
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 0.07
    },
    "mag": 200,
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
    "mag": 300,
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
    "mag": 300,
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
    "mag": 300,
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
  "hp": 515000,
  "max": 12,
  "xp": 9700,
  "width": 4000,
  "desc": "보스 스페이스맨 보그 · 최대 1,400%",
  "source": "battlecats-db s03007-30",
  "rules": [
   {
    "type": "starpeng",
    "at": {
     "t": 20
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 36.67
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 1400,
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
    "mag": 1400,
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
    "mag": 250,
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
    "mag": 250,
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
    "mag": 250,
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
    "mag": 250,
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
    "mag": 250,
    "count": 2,
    "delay": [
     63.33,
     66.67
    ]
   },
   {
    "type": "spaceborg",
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
  "hp": 480000,
  "max": 15,
  "xp": 10000,
  "width": 5200,
  "desc": "최대 3,000%",
  "source": "battlecats-db s03007-31",
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 10
    },
    "mag": 1400,
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
    "mag": 3000,
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
    "count": 3,
    "delay": [
     6.67,
     13.33
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 33.33
    },
    "count": 5,
    "delay": [
     13.33,
     20
    ]
   },
   {
    "type": "mamaleboin",
    "at": {
     "t": 40
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 50
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 70
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 86.67
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 100
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "lemurr",
    "at": {
     "t": 110
    },
    "mag": 1200,
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
  "hp": 540000,
  "max": 9,
  "xp": 10300,
  "width": 4800,
  "desc": "보스 샤이 보어 · 최대 2,400%",
  "source": "battlecats-db s03007-32",
  "rules": [
   {
    "type": "pigge",
    "at": {
     "t": 0
    },
    "mag": 2400,
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
    "mag": 2400,
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
    "mag": 2400,
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
    "mag": 300,
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
    "mag": 300,
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
    "mag": 2400,
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
    "mag": 250,
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
  "hp": 520000,
  "max": 10,
  "xp": 10600,
  "width": 3200,
  "desc": "최대 2,000%",
  "source": "battlecats-db s03007-33",
  "rules": [
   {
    "type": "eldersloth",
    "at": {
     "t": 53.33
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 0.07
    },
    "mag": 250,
    "count": 6,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "liz56",
    "at": {
     "t": 86.67
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "mooth",
    "at": {
     "t": 46.67
    },
    "mag": 2000,
    "count": 1
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 26.67
    },
    "mag": 800,
    "count": 2,
    "delay": [
     56.67,
     56.67
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 20
    },
    "count": 2,
    "delay": [
     66.67,
     66.67
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
  "hp": 490000,
  "max": 10,
  "xp": 10900,
  "width": 4000,
  "desc": "보스 쿠만츄 · 최대 1,400%",
  "source": "battlecats-db s03007-34",
  "rules": [
   {
    "type": "hyppoh",
    "at": {
     "t": 0.07
    },
    "mag": 1400,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 40
    },
    "mag": 250,
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
    "mag": 250,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 250,
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
    "firstDelay": 0.07,
    "count": 2,
    "delay": [
     33.33,
     33.33
    ]
   },
   {
    "type": "ursamajor",
    "at": {
     "hp": 99
    },
    "mag": 1400,
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
  "hp": 540000,
  "max": 15,
  "xp": 11200,
  "width": 4000,
  "desc": "보스 파괴생물 쿠오리넨 · 최대 750%",
  "source": "battlecats-db s03007-35",
  "rules": [
   {
    "type": "starpeng",
    "at": {
     "t": 16.67
    },
    "mag": 250,
    "count": 5,
    "delay": [
     16.67,
     20
    ]
   },
   {
    "type": "eldersloth",
    "at": {
     "t": 7.33
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "clione",
    "at": {
     "t": 0.67
    },
    "mag": 750,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "n": 36,
  "name": "우랄루",
  "jp": "ウラルー",
  "flag": "🌟",
  "bg": "alien",
  "hp": 565000,
  "max": 10,
  "xp": 11500,
  "width": 4400,
  "desc": "보스 불칸 보어 · 최대 1,400%",
  "source": "battlecats-db s03007-36",
  "rules": [
   {
    "type": "madampoodle",
    "at": {
     "t": 6.67
    },
    "mag": 800,
    "count": 3,
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
    "mag": 800,
    "count": 1,
    "boss": true
   },
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 1400,
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
  "hp": 590000,
  "max": 10,
  "xp": 11800,
  "width": 4800,
  "desc": "보스 엄마빠옹 · 최대 300%",
  "source": "battlecats-db s03007-37",
  "rules": [
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 3.33
    },
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 13.33
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     23.33,
     30
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "hp": 99
    },
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 300,
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
    "mag": 300,
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
  "hp": 560000,
  "max": 10,
  "xp": 12100,
  "width": 4200,
  "desc": "보스 게콕 · 최대 2,000%",
  "source": "battlecats-db s03007-38",
  "rules": [
   {
    "type": "kangaroo",
    "at": {
     "t": 6.67
    },
    "mag": 2000,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 10
    },
    "count": 1
   },
   {
    "type": "scissorman",
    "at": {
     "t": 33.33
    },
    "mag": 600,
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
    "mag": 2000,
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
    "mag": 600,
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
    "mag": 250,
    "count": 1
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
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
  "hp": 600000,
  "max": 20,
  "xp": 12400,
  "width": 5200,
  "desc": "보스 스페이스맨 보그 · 최대 800%",
  "source": "battlecats-db s03007-39",
  "rules": [
   {
    "type": "spaceborg",
    "at": {
     "t": 26.67
    },
    "mag": 300,
    "count": 1,
    "boss": true
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 6.67
    },
    "mag": 800,
    "count": 3,
    "delay": [
     30,
     33.33
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "t": 26.67
    },
    "mag": 600,
    "count": 3,
    "delay": [
     23.33,
     25.33
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 33.33
    },
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
  "hp": 540000,
  "max": 20,
  "xp": 12700,
  "width": 5500,
  "desc": "보스 샤이 보어 · 최대 2,400%",
  "source": "battlecats-db s03007-40",
  "rules": [
   {
    "type": "gabriel",
    "at": {
     "t": 6.67
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "hyppoh",
    "at": {
     "t": 13.33
    },
    "mag": 1300,
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
    "mag": 1300,
    "count": 1
   },
   {
    "type": "pigge",
    "at": {
     "t": 23.33
    },
    "mag": 2400,
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
    "mag": 2400,
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
    "mag": 300,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 66.67
    },
    "mag": 300,
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
    "mag": 1200,
    "count": 1
   },
   {
    "type": "sael",
    "at": {
     "hp": 99
    },
    "mag": 1300,
    "count": 1
   },
   {
    "type": "bore",
    "at": {
     "hp": 99
    },
    "mag": 300,
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
  "hp": 570000,
  "max": 10,
  "xp": 13000,
  "width": 5200,
  "desc": "보스 대머리군 · 최대 1,400%",
  "source": "battlecats-db s03007-41",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 6.67
    },
    "mag": 1400,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 43.33
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "maawth",
    "at": {
     "t": 3.33
    },
    "mag": 1000,
    "count": 1
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "phace",
    "at": {
     "hp": 99
    },
    "mag": 850,
    "count": 1,
    "boss": true
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 1
   }
  ]
 },
 {
  "n": 42,
  "name": "고릴라의 행성",
  "jp": "ゴリラの惑星",
  "flag": "🦍",
  "bg": "void",
  "hp": 640000,
  "max": 10,
  "xp": 13300,
  "width": 4400,
  "desc": "최대 2,400%",
  "source": "battlecats-db s03007-42",
  "rules": [
   {
    "type": "gory",
    "at": {
     "t": 0
    },
    "mag": 2400,
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
    "mag": 2400,
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
    "mag": 300,
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
    "mag": 2400,
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
    "mag": 300,
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
    "mag": 200,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 83.33
    },
    "mag": 300,
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
    "mag": 300,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "hp": 99
    },
    "mag": 300,
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
  "hp": 560000,
  "max": 50,
  "xp": 13600,
  "width": 5000,
  "desc": "최대 3,000%",
  "source": "battlecats-db s03007-43",
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 1400,
    "delay": [
     0.07,
     4
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 3000,
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
    "mag": 3000,
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
    "mag": 1400,
    "count": 20,
    "delay": [
     0.07,
     4
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 3000,
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
    "mag": 300,
    "count": 10,
    "delay": [
     2,
     10
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 16.67
    },
    "mag": 600,
    "count": 10,
    "delay": [
     2,
     10
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 16.67
    },
    "count": 5,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 20,
    "delay": [
     3.33,
     13.33
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 66.67
    },
    "mag": 300,
    "count": 10,
    "delay": [
     0.07,
     0.07
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 133.33
    },
    "mag": 600,
    "count": 10,
    "delay": [
     0.07,
     0.07
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
  "hp": 600000,
  "max": 10,
  "xp": 13900,
  "width": 5200,
  "desc": "최대 1,000%",
  "source": "battlecats-db s03007-44",
  "rules": [
   {
    "type": "stpigge",
    "at": {
     "t": 0
    },
    "mag": 1000,
    "count": 2,
    "delay": [
     36.67,
     36.67
    ]
   },
   {
    "type": "liz56",
    "at": {
     "t": 30
    },
    "mag": 1000,
    "count": 3,
    "delay": [
     23.33,
     26.67
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "t": 20
    },
    "mag": 1000,
    "count": 4,
    "delay": [
     50,
     50
    ]
   }
  ]
 },
 {
  "n": 45,
  "name": "N77 성운",
  "jp": "N77星雲",
  "flag": "🌌",
  "bg": "void",
  "hp": 590000,
  "max": 20,
  "xp": 13900,
  "width": 4000,
  "desc": "보스 거장 · 최대 3,000%",
  "source": "battlecats-db s03007-45",
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 1.33
    },
    "mag": 3000,
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
    "mag": 3000,
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
    "mag": 200,
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
    "mag": 200,
    "count": 2,
    "delay": [
     4,
     5.33
    ]
   },
   {
    "type": "metalcyborg",
    "at": {
     "t": 40
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "eldersloth",
    "at": {
     "t": 46.67
    },
    "mag": 300,
    "count": 1,
    "boss": true
   },
   {
    "type": "kroxo",
    "at": {
     "t": 50
    },
    "mag": 1350,
    "count": 3,
    "delay": [
     10,
     23.33
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 63.33
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 66.67
    },
    "mag": 200,
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
  "hp": 640000,
  "max": 10,
  "xp": 13900,
  "width": 5000,
  "desc": "보스 불칸 보어 · 최대 800%",
  "source": "battlecats-db s03007-46",
  "rules": [
   {
    "type": "darkdog",
    "at": {
     "t": 5
    },
    "mag": 600,
    "count": 3,
    "delay": [
     2,
     2
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "t": 14.67
    },
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 26.67
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 13.33
    },
    "mag": 131,
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
    "mag": 300,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "t": 40
    },
    "mag": 600,
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
    "mag": 300,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 600,
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
    "mag": 300,
    "delay": [
     13.33,
     26.67
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
    "count": 1
   },
   {
    "type": "kidtappa",
    "at": {
     "hp": 99
    },
    "firstDelay": 0.07,
    "count": 2,
    "delay": [
     16.67,
     16.67
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 300,
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
    "mag": 800,
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
  "hp": 690000,
  "max": 9,
  "xp": 14200,
  "width": 5000,
  "desc": "보스 스페이스맨 보그 · 최대 800%",
  "source": "battlecats-db s03007-47",
  "rules": [
   {
    "type": "darkdog",
    "at": {
     "t": 10
    },
    "mag": 800,
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
    "mag": 300,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "t": 66.67
    },
    "mag": 131,
    "count": 1
   },
   {
    "type": "darkdog",
    "at": {
     "t": 100
    },
    "mag": 800,
    "delay": [
     33.33,
     40
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 8,
    "delay": [
     10,
     16.67
    ]
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 2,
    "delay": [
     100,
     100
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
    "count": 1
   },
   {
    "type": "spaceborg",
    "at": {
     "hp": 99
    },
    "mag": 300,
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
  "hp": 950000,
  "max": 30,
  "xp": 14500,
  "width": 6000,
  "desc": "보스 신님(진심) · 최대 300%",
  "source": "battlecats-db s03007-48",
  "rules": [
   {
    "type": "kamisamaserious",
    "at": {
     "t": 6.67
    },
    "count": 1,
    "boss": true
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 10
    },
    "mag": 300,
    "count": 2,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 13.33
    },
    "count": 1
   },
   {
    "type": "ribbo",
    "at": {
     "t": 50
    },
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 53.33
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 66.67
    },
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 106.67
    },
    "mag": 300,
    "count": 2,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 120
    },
    "count": 2,
    "delay": [
     26.67,
     26.67
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "t": 160
    },
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 163.33
    },
    "mag": 300,
    "count": 2,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 166.67
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "ribbo",
    "at": {
     "t": 216.67
    },
    "count": 1
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 216.67
    },
    "mag": 300,
    "count": 2,
    "delay": [
     3.33,
     6.67
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 216.67
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 220
    },
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 280
    },
    "mag": 300,
    "delay": [
     23.33,
     23.33
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 280
    },
    "mag": 300,
    "delay": [
     53.33,
     60
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 283.33
    },
    "delay": [
     53.33,
     60
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 90
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 80
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 70
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 60
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 50
    },
    "mag": 300,
    "count": 1
   }
  ]
 }
];
