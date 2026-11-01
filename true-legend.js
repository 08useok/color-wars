// 신레전드 0~15장 (8.0·8.1). scripts/build-true-legend.cjs가 만든다. 출처: battlecats-db s13000~s13015. 한국어 이름은 임시 번역.
// 출현 배율은 원작 그대로. 900초 제한 적(간판 아가씨)은 이전 장처럼 뺐다.
const TRUELEGEND_DATA=[
 {
  "sub": 0,
  "stage": {
   "name": "고대의 저주",
   "jp": "古代の呪い",
   "flag": "🏛️",
   "hp": 1200000,
   "max": 20,
   "xp": 7600,
   "sky": "#d7c9a8",
   "land": "#8b7a5a",
   "drop": {
    "xp": 95000,
    "xpChance": 0.1
   }
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 100,
    "delay": [
     60,
     80
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 30
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "delay": [
     50,
     60
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 15,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "truebunbun",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 1,
  "stage": {
   "name": "필라프 대초원",
   "jp": "ピラフ大草原",
   "flag": "🗺️",
   "hp": 600000,
   "max": 15,
   "xp": 6080,
   "sky": "#f2d9a3",
   "land": "#b58f55",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 10
    },
    "mag": 100,
    "delay": [
     6,
     10
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     10
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 40
    },
    "mag": 4000,
    "delay": [
     6,
     10
    ]
   },
   {
    "type": "gory",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 4,
    "delay": [
     10.666666666666666,
     23.333333333333332
    ]
   },
   {
    "type": "gory",
    "at": {
     "hp": 80
    },
    "mag": 4000,
    "count": 4,
    "delay": [
     2,
     6
    ]
   }
  ]
 },
 {
  "sub": 1,
  "stage": {
   "name": "냥달메시안",
   "jp": "ニャンダルメシアン",
   "flag": "🗺️",
   "hp": 500000,
   "max": 8,
   "xp": 6460,
   "sky": "#f2d9a3",
   "land": "#b58f55",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 20
    },
    "mag": 100,
    "delay": [
     6,
     10
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     10
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     10
    ]
   },
   {
    "type": "supermetalhippo",
    "at": {
     "t": 30
    },
    "mag": 300,
    "count": 1
   }
  ]
 },
 {
  "sub": 1,
  "stage": {
   "name": "안닌 고개",
   "jp": "アンニン峠",
   "flag": "🗺️",
   "hp": 750000,
   "max": 15,
   "xp": 6840,
   "sky": "#f2d9a3",
   "land": "#b58f55",
   "drop": {}
  },
  "rules": [
   {
    "type": "koraino",
    "at": {
     "t": 10
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 1,
  "stage": {
   "name": "아히요 고원",
   "jp": "アヒージョ高原",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 12,
   "xp": 6270,
   "sky": "#f2d9a3",
   "land": "#b58f55",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "shibalien",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 20
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "sael",
    "at": {
     "t": 0
    },
    "mag": 2400,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "liz56",
    "at": {
     "t": 40
    },
    "mag": 2400,
    "count": 1
   },
   {
    "type": "liz56",
    "at": {
     "t": 80
    },
    "mag": 2400,
    "count": 1
   },
   {
    "type": "liz56",
    "at": {
     "t": 116.66666666666667
    },
    "mag": 2400,
    "count": 1
   }
  ]
 },
 {
  "sub": 1,
  "stage": {
   "name": "파스타 사구",
   "jp": "パスタ砂丘",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 10,
   "xp": 6650,
   "sky": "#f2d9a3",
   "land": "#b58f55",
   "drop": {}
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 10
    },
    "mag": 100,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 40
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     0.6666666666666666,
     1.3333333333333333
    ]
   },
   {
    "type": "zroco",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "mastera",
    "at": {
     "hp": 99
    },
    "mag": 2400,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 1,
  "stage": {
   "name": "루러우 구릉",
   "jp": "ルーロウ丘陵",
   "flag": "🗺️",
   "hp": 1200000,
   "max": 12,
   "xp": 7600,
   "sky": "#f2d9a3",
   "land": "#b58f55",
   "drop": {}
  },
  "rules": [
   {
    "type": "nyandam",
    "at": {
     "t": 10
    },
    "mag": 2800,
    "count": 1,
    "boss": true
   },
   {
    "type": "koraino",
    "at": {
     "t": 20
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "koraino",
    "at": {
     "t": 73.33333333333333
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "koraino",
    "at": {
     "t": 120
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     2,
     6
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 20
    },
    "mag": 4000,
    "delay": [
     2,
     6
    ]
   }
  ]
 },
 {
  "sub": 2,
  "stage": {
   "name": "코사족 유적",
   "jp": "コサ民遺跡",
   "flag": "🗺️",
   "hp": 900000,
   "max": 12,
   "xp": 6650,
   "sky": "#bfe0b0",
   "land": "#5f8a4c",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "gabriel",
    "at": {
     "t": 20
    },
    "mag": 500,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "angelbutta",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "angelbutta",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "angelbutta",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 2,
  "stage": {
   "name": "덴지로 바다",
   "jp": "デンジロー海原",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 8,
   "xp": 6650,
   "sky": "#bfe0b0",
   "land": "#5f8a4c",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 2400,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 20
    },
    "mag": 2400,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 0
    },
    "mag": 1200,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "metalseal",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 3,
    "delay": [
     40,
     60
    ]
   }
  ]
 },
 {
  "sub": 2,
  "stage": {
   "name": "산적 흉내",
   "jp": "山賊かぶれ",
   "flag": "🗺️",
   "hp": 750000,
   "max": 12,
   "xp": 6270,
   "sky": "#bfe0b0",
   "land": "#5f8a4c",
   "drop": {}
  },
  "rules": [
   {
    "type": "rabbit",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     12
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     12
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "delay": [
     8,
     16
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "delay": [
     8,
     16
    ]
   },
   {
    "type": "pigge",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     8,
     16
    ]
   },
   {
    "type": "koraino",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 3,
    "delay": [
     0.6666666666666666,
     1.3333333333333333
    ]
   },
   {
    "type": "koraino",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 2,
  "stage": {
   "name": "동글동글 웅덩이",
   "jp": "くりくりくぼみ",
   "flag": "🗺️",
   "hp": 800000,
   "max": 18,
   "xp": 6270,
   "sky": "#bfe0b0",
   "land": "#5f8a4c",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "zoge",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     12,
     20
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     12,
     20
    ]
   },
   {
    "type": "zigge",
    "at": {
     "t": 60
    },
    "mag": 300,
    "count": 3,
    "delay": [
     40,
     60
    ]
   },
   {
    "type": "duche",
    "at": {
     "t": 40
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     53.333333333333336,
     53.333333333333336
    ]
   },
   {
    "type": "duche",
    "at": {
     "t": 40.333333333333336
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     53.333333333333336,
     53.333333333333336
    ]
   },
   {
    "type": "duche",
    "at": {
     "t": 40.666666666666664
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     53.333333333333336,
     53.333333333333336
    ]
   },
   {
    "type": "dagshund",
    "at": {
     "t": 42.666666666666664
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     53.333333333333336,
     53.333333333333336
    ]
   }
  ]
 },
 {
  "sub": 2,
  "stage": {
   "name": "스릴 넘치는 담소",
   "jp": "スリルの談笑",
   "flag": "🗺️",
   "hp": 750000,
   "max": 10,
   "xp": 6460,
   "sky": "#bfe0b0",
   "land": "#5f8a4c",
   "drop": {}
  },
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     4,
     8
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 20
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     0.6666666666666666,
     2
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "professor",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 1,
    "boss": true
   },
   {
    "type": "eldersloth",
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
  "sub": 2,
  "stage": {
   "name": "장 굴",
   "jp": "ジャン・グール",
   "flag": "🗺️",
   "hp": 999999,
   "max": 30,
   "xp": 7600,
   "sky": "#bfe0b0",
   "land": "#5f8a4c",
   "drop": {}
  },
  "rules": [
   {
    "type": "inglis",
    "at": {
     "t": 10
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "inglis",
    "at": {
     "t": 40
    },
    "mag": 100,
    "count": 4,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 80
    },
    "mag": 100,
    "count": 5,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 80.33333333333333
    },
    "mag": 100,
    "count": 4,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 113.33333333333333
    },
    "mag": 100,
    "count": 8,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 113.66666666666667
    },
    "mag": 100,
    "count": 8,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 140
    },
    "mag": 100,
    "count": 8,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 140.33333333333334
    },
    "mag": 100,
    "count": 8,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 140.66666666666666
    },
    "mag": 100,
    "count": 7,
    "delay": [
     0.6666666666666666,
     1.6666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 160
    },
    "mag": 100,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "bore",
    "at": {
     "t": 20
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "nimoy",
    "at": {
     "t": 60
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "bore",
    "at": {
     "t": 93.33333333333333
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "nimoy",
    "at": {
     "t": 120
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "bore",
    "at": {
     "t": 140
    },
    "mag": 200,
    "count": 1
   }
  ]
 },
 {
  "sub": 3,
  "stage": {
   "name": "마리네 타운",
   "jp": "マリネタウン",
   "flag": "🗺️",
   "hp": 800000,
   "max": 12,
   "xp": 6840,
   "sky": "#a9d8ec",
   "land": "#5e8ea3",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 20
    },
    "mag": 100,
    "delay": [
     8,
     12
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 100,
    "delay": [
     6,
     12
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 4
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "gory",
    "at": {
     "t": 10
    },
    "mag": 4000,
    "delay": [
     6,
     21.333333333333332
    ]
   },
   {
    "type": "gregory",
    "at": {
     "t": 53.333333333333336
    },
    "mag": 200,
    "count": 5,
    "delay": [
     12,
     21.333333333333332
    ]
   }
  ]
 },
 {
  "sub": 3,
  "stage": {
   "name": "떠도는 소라고둥",
   "jp": "さすらいのホラガイ",
   "flag": "🗺️",
   "hp": 690000,
   "max": 18,
   "xp": 6080,
   "sky": "#a9d8ec",
   "land": "#5e8ea3",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "zoge",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     10,
     30
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "t": 60
    },
    "mag": 300,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "blackleboin",
    "at": {
     "t": 20
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "zomboe",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     40,
     80
    ]
   },
   {
    "type": "zackiepeng",
    "at": {
     "t": 40
    },
    "mag": 300,
    "delay": [
     60,
     80
    ]
   }
  ]
 },
 {
  "sub": 3,
  "stage": {
   "name": "파르카치오 해구",
   "jp": "パルカッチョ海溝",
   "flag": "🗺️",
   "hp": 900000,
   "max": 15,
   "xp": 6460,
   "sky": "#a9d8ec",
   "land": "#5e8ea3",
   "drop": {}
  },
  "rules": [
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 0
    },
    "mag": 500,
    "count": 1
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 20
    },
    "mag": 500,
    "count": 1
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 21.333333333333332
    },
    "mag": 500,
    "count": 1
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 23.333333333333332
    },
    "mag": 500,
    "count": 1
   },
   {
    "type": "mrangel",
    "at": {
     "t": 40
    },
    "mag": 200,
    "delay": [
     6.666666666666667,
     20
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 60
    },
    "mag": 500,
    "delay": [
     6.666666666666667,
     20
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "delay": [
     26.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 10,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "bore",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 3,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "mrangel",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 3,
  "stage": {
   "name": "곰치 해저 화산",
   "jp": "ウツボボ海底火山",
   "flag": "🗺️",
   "hp": 880000,
   "max": 10,
   "xp": 6650,
   "sky": "#a9d8ec",
   "land": "#5e8ea3",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "kory",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "koraino",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "kory",
    "at": {
     "t": 80
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "koraino",
    "at": {
     "t": 106.66666666666667
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "berserkory",
    "at": {
     "t": 146.66666666666666
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "rabbit",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "delay": [
     3.3333333333333335,
     10
    ]
   }
  ]
 },
 {
  "sub": 3,
  "stage": {
   "name": "새벽 프론탈레",
   "jp": "暁フロンターレ",
   "flag": "🗺️",
   "hp": 600000,
   "max": 16,
   "xp": 6270,
   "sky": "#a9d8ec",
   "land": "#5e8ea3",
   "drop": {}
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 100,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 100,
    "delay": [
     0.06666666666666667,
     4
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 25,
    "delay": [
     2,
     6
    ]
   },
   {
    "type": "raind",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 2,
    "delay": [
     19.333333333333332,
     20
    ]
   },
   {
    "type": "raind",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 2,
    "delay": [
     19.333333333333332,
     20
    ]
   },
   {
    "type": "raind",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 2,
    "delay": [
     19.333333333333332,
     20
    ]
   },
   {
    "type": "sloth",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 3,
  "stage": {
   "name": "루츠보 소용돌이",
   "jp": "ルツボー渦",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 9,
   "xp": 7600,
   "sky": "#a9d8ec",
   "land": "#5e8ea3",
   "drop": {}
  },
  "rules": [
   {
    "type": "croco",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "delay": [
     10,
     16.666666666666668
    ]
   },
   {
    "type": "mooth",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "sleipnir",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 2,
    "delay": [
     20,
     26.666666666666668
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "supermayor",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 4,
  "stage": {
   "name": "팔딱팔딱 어장",
   "jp": "ビッチビチ漁場",
   "flag": "🗺️",
   "hp": 880000,
   "max": 16,
   "xp": 6650,
   "sky": "#b8e1f0",
   "land": "#c9b47c",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "strayguy",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     3,
     8
    ]
   },
   {
    "type": "strayguy",
    "at": {
     "t": 10
    },
    "mag": 300,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "strayguy",
    "at": {
     "t": 20
    },
    "mag": 300,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "supermetalhippo",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "painter",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "painter",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "painter",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 1
   }
  ]
 },
 {
  "sub": 4,
  "stage": {
   "name": "반항적 경제 수역",
   "jp": "反抗的経済水域",
   "flag": "🗺️",
   "hp": 700000,
   "max": 8,
   "xp": 6270,
   "sky": "#b8e1f0",
   "land": "#c9b47c",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "zomboe",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 10
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "zomboe",
    "at": {
     "t": 10
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "t": 60
    },
    "mag": 400,
    "delay": [
     26.666666666666668,
     40
    ]
   },
   {
    "type": "zomboe",
    "at": {
     "t": 60
    },
    "mag": 300,
    "count": 3,
    "delay": [
     26.666666666666668,
     40
    ]
   },
   {
    "type": "dagshund",
    "at": {
     "t": 40
    },
    "mag": 1000,
    "count": 3,
    "delay": [
     40,
     60
    ]
   }
  ]
 },
 {
  "sub": 4,
  "stage": {
   "name": "가마토로 방파제",
   "jp": "カマトロ防波堤",
   "flag": "🗺️",
   "hp": 770000,
   "max": 8,
   "xp": 6270,
   "sky": "#b8e1f0",
   "land": "#c9b47c",
   "drop": {}
  },
  "rules": [
   {
    "type": "capy",
    "at": {
     "t": 0
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "capy",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "capy",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "capy",
    "at": {
     "t": 60
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "supermayor",
    "at": {
     "t": 50
    },
    "mag": 100,
    "count": 1
   }
  ]
 },
 {
  "sub": 4,
  "stage": {
   "name": "괴수 쇼 암굴",
   "jp": "怪獣ショー岩窟",
   "flag": "🗺️",
   "hp": 800000,
   "max": 6,
   "xp": 6840,
   "sky": "#b8e1f0",
   "land": "#c9b47c",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "metaldoge",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "metaldoge",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "metaldoge",
    "at": {
     "t": 28
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "metaldoge",
    "at": {
     "t": 30
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "metaldoge",
    "at": {
     "t": 60
    },
    "mag": 300,
    "delay": [
     30,
     60
    ]
   },
   {
    "type": "metaldoge",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "metalcyborg",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     40,
     60
    ]
   },
   {
    "type": "bunbunblack",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1,
    "boss": true
   },
   {
    "type": "kurosawah",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1
   }
  ]
 },
 {
  "sub": 4,
  "stage": {
   "name": "해마 해변",
   "jp": "タツノコ浜",
   "flag": "🗺️",
   "hp": 840000,
   "max": 40,
   "xp": 7030,
   "sky": "#b8e1f0",
   "land": "#c9b47c",
   "drop": {}
  },
  "rules": [
   {
    "type": "inglis",
    "at": {
     "t": 10
    },
    "mag": 100,
    "count": 8,
    "delay": [
     4,
     8
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 40
    },
    "mag": 100,
    "count": 8,
    "delay": [
     3.3333333333333335,
     6.666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 46.666666666666664
    },
    "mag": 100,
    "count": 8,
    "delay": [
     3.3333333333333335,
     6.666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 80
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.6666666666666665,
     5.333333333333333
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 85
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.6666666666666665,
     5.333333333333333
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 90
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.6666666666666665,
     5.333333333333333
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 120
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.3333333333333335,
     4.666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 123.33333333333333
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.3333333333333335,
     4.666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 126.66666666666667
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.3333333333333335,
     4.666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 130
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2.3333333333333335,
     4.666666666666667
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 160
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 161.66666666666666
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 163.33333333333334
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 165
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 166.66666666666666
    },
    "mag": 100,
    "count": 8,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 100
    },
    "mag": 100,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "koraino",
    "at": {
     "t": 66.66666666666667
    },
    "mag": 100,
    "count": 1
   }
  ]
 },
 {
  "sub": 4,
  "stage": {
   "name": "멋진 오징어 곶",
   "jp": "イカス岬",
   "flag": "🗺️",
   "hp": 1200000,
   "max": 8,
   "xp": 7600,
   "sky": "#b8e1f0",
   "land": "#c9b47c",
   "drop": {}
  },
  "rules": [
   {
    "type": "seal",
    "at": {
     "t": 10
    },
    "mag": 4000,
    "count": 5,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "t": 50
    },
    "mag": 300,
    "count": 3,
    "delay": [
     3.3333333333333335,
     6.666666666666667
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "count": 10,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "zroco",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 10,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "zigge",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 2,
    "delay": [
     50,
     50
    ]
   },
   {
    "type": "blackotta",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 5,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "datemegane",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 3,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 5,
  "stage": {
   "name": "단단한 암흑 병기",
   "jp": "ガチガチ暗黒兵器",
   "flag": "🗺️",
   "hp": 700000,
   "max": 20,
   "xp": 6840,
   "sky": "#4b4a63",
   "land": "#3a3448",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 0
    },
    "mag": 1000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "delay": [
     0.06666666666666667,
     4
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "count": 30,
    "delay": [
     0.06666666666666667,
     2
    ]
   },
   {
    "type": "shyboy",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     13.333333333333334,
     16.666666666666668
    ]
   },
   {
    "type": "henry",
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
  "sub": 5,
  "stage": {
   "name": "귀여운 벽화",
   "jp": "かわいい壁画",
   "flag": "🗺️",
   "hp": 950000,
   "max": 4,
   "xp": 6460,
   "sky": "#4b4a63",
   "land": "#3a3448",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 10,
    "delay": [
     1,
     6
    ]
   },
   {
    "type": "mooth",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "inglis",
    "at": {
     "t": 40
    },
    "mag": 100,
    "delay": [
     6,
     18
    ]
   },
   {
    "type": "supermayor",
    "at": {
     "t": 60
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "jkbunbun",
    "at": {
     "t": 40
    },
    "mag": 500,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 5,
  "stage": {
   "name": "선샤인 동굴",
   "jp": "サンシャイン洞窟",
   "flag": "🗺️",
   "hp": 750000,
   "max": 16,
   "xp": 6460,
   "sky": "#4b4a63",
   "land": "#3a3448",
   "drop": {}
  },
  "rules": [
   {
    "type": "gorydark",
    "at": {
     "t": 10
    },
    "mag": 300,
    "count": 3,
    "delay": [
     25.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "t": 11.333333333333334
    },
    "mag": 300,
    "count": 3,
    "delay": [
     25.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 300,
    "count": 3,
    "delay": [
     25.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 20
    },
    "mag": 100,
    "count": 3,
    "delay": [
     16.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "delay": [
     12,
     24
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 8,
    "delay": [
     6,
     12
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 12,
    "delay": [
     4,
     16
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 24,
    "delay": [
     2,
     8
    ]
   },
   {
    "type": "koraino",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 2,
    "delay": [
     50,
     50
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 10,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 5,
  "stage": {
   "name": "종유석 일루미네이션",
   "jp": "鍾乳石イルミネーション",
   "flag": "🗺️",
   "hp": 999999,
   "max": 10,
   "xp": 6650,
   "sky": "#4b4a63",
   "land": "#3a3448",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "sunfish",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "gabriel",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 500,
    "count": 10,
    "delay": [
     10,
     16.666666666666668
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 133.33333333333334
    },
    "mag": 500,
    "delay": [
     16.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "sleipnir",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "datemegane",
    "at": {
     "t": 53.333333333333336
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "datemegane",
    "at": {
     "t": 100
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "datemegane",
    "at": {
     "t": 140
    },
    "mag": 100,
    "count": 1
   }
  ]
 },
 {
  "sub": 5,
  "stage": {
   "name": "핼쑥 성악설",
   "jp": "ゲッソリ性悪説",
   "flag": "🗺️",
   "hp": 600000,
   "max": 20,
   "xp": 6650,
   "sky": "#4b4a63",
   "land": "#3a3448",
   "drop": {}
  },
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 20
    },
    "mag": 4000,
    "delay": [
     2,
     10
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     2,
     10
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 0
    },
    "mag": 100,
    "count": 5,
    "delay": [
     6,
     12
    ]
   },
   {
    "type": "zomboe",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     32,
     48
    ]
   },
   {
    "type": "zackiepeng",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     40,
     56
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 5,
    "delay": [
     12,
     24
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 10,
    "delay": [
     0.6666666666666666,
     4
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     12,
     24
    ]
   },
   {
    "type": "camelle",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1,
    "boss": true
   },
   {
    "type": "assassinbear",
    "at": {
     "t": 450
    },
    "mag": 800,
    "delay": [
     0.06666666666666667,
     4
    ]
   },
   {
    "type": "assassinbear",
    "at": {
     "t": 450
    },
    "mag": 800,
    "count": 1
   }
  ]
 },
 {
  "sub": 5,
  "stage": {
   "name": "느긋한 지저호",
   "jp": "まったり地底湖",
   "flag": "🗺️",
   "hp": 990000,
   "max": 10,
   "xp": 7600,
   "sky": "#4b4a63",
   "land": "#3a3448",
   "drop": {}
  },
  "rules": [
   {
    "type": "kogaou",
    "at": {
     "t": 5
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "inglis",
    "at": {
     "t": 10
    },
    "mag": 100,
    "count": 5,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 60
    },
    "mag": 100,
    "count": 5,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 143.33333333333334
    },
    "mag": 100,
    "count": 5,
    "delay": [
     20,
     26.666666666666668
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 260
    },
    "mag": 100,
    "count": 5,
    "delay": [
     26.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "bore",
    "at": {
     "t": 66.66666666666667
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "bore",
    "at": {
     "t": 150
    },
    "mag": 300,
    "count": 1
   }
  ]
 },
 {
  "sub": 6,
  "stage": {
   "name": "리코펜의 밤",
   "jp": "リコピンの夜更け",
   "flag": "🗺️",
   "hp": 800000,
   "max": 8,
   "xp": 6460,
   "sky": "#9aa3b5",
   "land": "#5a5f6e",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "metaldoge",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 10,
    "delay": [
     12,
     30
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 40
    },
    "mag": 200,
    "count": 8,
    "delay": [
     12,
     30
    ]
   },
   {
    "type": "mamaleboin",
    "at": {
     "t": 53.333333333333336
    },
    "mag": 400,
    "count": 3,
    "delay": [
     40,
     66.66666666666667
    ]
   },
   {
    "type": "supermetalhippo",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "gregory",
    "at": {
     "t": 40
    },
    "mag": 400,
    "count": 3,
    "delay": [
     24,
     36
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 40
    },
    "mag": 400,
    "count": 5,
    "delay": [
     18,
     24
    ]
   },
   {
    "type": "mamaleboin",
    "at": {
     "hp": 90
    },
    "mag": 400,
    "count": 1
   }
  ]
 },
 {
  "sub": 6,
  "stage": {
   "name": "메트로폴리스 오아시스",
   "jp": "メトロポリスオアシス",
   "flag": "🗺️",
   "hp": 840000,
   "max": 12,
   "xp": 6650,
   "sky": "#9aa3b5",
   "land": "#5a5f6e",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "peng",
    "at": {
     "t": 10
    },
    "mag": 4000,
    "delay": [
     5.333333333333333,
     20
    ]
   },
   {
    "type": "celeboodle",
    "at": {
     "t": 20
    },
    "mag": 1000,
    "delay": [
     13.333333333333334,
     26.666666666666668
    ]
   },
   {
    "type": "mastera",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 2000,
    "count": 1
   },
   {
    "type": "professor",
    "at": {
     "t": 40
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "painter",
    "at": {
     "t": 53.333333333333336
    },
    "mag": 600,
    "count": 1
   }
  ]
 },
 {
  "sub": 6,
  "stage": {
   "name": "허울뿐인 마천루",
   "jp": "はりぼて摩天楼",
   "flag": "🗺️",
   "hp": 600000,
   "max": 12,
   "xp": 6460,
   "sky": "#9aa3b5",
   "land": "#5a5f6e",
   "drop": {}
  },
  "rules": [
   {
    "type": "rabbit",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     16.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "pigge",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     33.333333333333336,
     50
    ]
   },
   {
    "type": "zigge",
    "at": {
     "t": 10
    },
    "mag": 300,
    "count": 3,
    "delay": [
     3.3333333333333335,
     10
    ]
   },
   {
    "type": "zoge",
    "at": {
     "t": 50
    },
    "mag": 300,
    "count": 4,
    "delay": [
     30,
     40
    ]
   },
   {
    "type": "coffinzoge",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 2,
    "delay": [
     30,
     30
    ]
   },
   {
    "type": "zory",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 4,
    "delay": [
     20,
     26.666666666666668
    ]
   },
   {
    "type": "zroco",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 6,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 6,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "kogaou",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 6,
  "stage": {
   "name": "무법자의 황혼",
   "jp": "ならず者の黄昏",
   "flag": "🗺️",
   "hp": 960000,
   "max": 10,
   "xp": 7030,
   "sky": "#9aa3b5",
   "land": "#5a5f6e",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "peng",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "delay": [
     16,
     30
    ]
   },
   {
    "type": "pigge",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 4000,
    "delay": [
     16,
     30
    ]
   },
   {
    "type": "celeboodle",
    "at": {
     "t": 20
    },
    "mag": 1000,
    "delay": [
     16,
     30
    ]
   },
   {
    "type": "celeboodle",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "firstDelay": 20,
    "delay": [
     16,
     40
    ]
   },
   {
    "type": "mooth",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 10,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "datemegane",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "supermayor",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 6,
  "stage": {
   "name": "콘크리트 오션",
   "jp": "コンクリートオーシャン",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 12,
   "xp": 6840,
   "sky": "#9aa3b5",
   "land": "#5a5f6e",
   "drop": {}
  },
  "rules": [
   {
    "type": "otta",
    "at": {
     "t": 24
    },
    "mag": 800,
    "delay": [
     32,
     53.333333333333336
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 3,
    "delay": [
     26,
     34.666666666666664
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 3,
    "delay": [
     26,
     34.666666666666664
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 3,
    "delay": [
     26,
     34.666666666666664
    ]
   },
   {
    "type": "blackotta",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 3,
    "delay": [
     26,
     34.666666666666664
    ]
   },
   {
    "type": "blackotta",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 3,
    "delay": [
     26,
     34.666666666666664
    ]
   },
   {
    "type": "kangaroo",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "kangaroo",
    "at": {
     "t": 12
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     26,
     34.666666666666664
    ]
   },
   {
    "type": "capy",
    "at": {
     "hp": 99
    },
    "mag": 150,
    "count": 5,
    "delay": [
     17.333333333333332,
     26
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 6,
  "stage": {
   "name": "무인역의 결투",
   "jp": "無人駅の決闘",
   "flag": "🗺️",
   "hp": 1111111,
   "max": 9,
   "xp": 7980,
   "sky": "#9aa3b5",
   "land": "#5a5f6e",
   "drop": {}
  },
  "rules": [
   {
    "type": "squirrel",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "count": 20,
    "delay": [
     1,
     3
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 20
    },
    "mag": 100,
    "count": 10,
    "delay": [
     2,
     6
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 400,
    "count": 5,
    "delay": [
     3,
     9
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 10,
    "delay": [
     10,
     16.666666666666668
    ]
   },
   {
    "type": "eldersloth",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "firstDelay": 0.06666666666666667,
    "count": 2,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "oldree",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 7,
  "stage": {
   "name": "골풀 탑",
   "jp": "イグサ塔",
   "flag": "🗺️",
   "hp": 800000,
   "max": 6,
   "xp": 6080,
   "sky": "#e8c99a",
   "land": "#9a6d43",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "zoge",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 300,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 300,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 40
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "cadaverbear",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "bear",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 2,
    "delay": [
     66.66666666666667,
     66.66666666666667
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     6,
     12
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 5
    },
    "mag": 1000,
    "delay": [
     16.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "bear",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "firstDelay": 40,
    "count": 1
   }
  ]
 },
 {
  "sub": 7,
  "stage": {
   "name": "카우걸 감옥",
   "jp": "カウガール監獄",
   "flag": "🗺️",
   "hp": 880000,
   "max": 4,
   "xp": 6460,
   "sky": "#e8c99a",
   "land": "#9a6d43",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "stpigge",
    "at": {
     "t": 0
    },
    "mag": 1500,
    "count": 2,
    "delay": [
     23.333333333333332,
     23.333333333333332
    ]
   },
   {
    "type": "duche",
    "at": {
     "t": 40
    },
    "mag": 800,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "hp": 99
    },
    "mag": 1500,
    "count": 1
   },
   {
    "type": "liz56",
    "at": {
     "hp": 99
    },
    "mag": 1500,
    "count": 1
   },
   {
    "type": "angelbutta",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 10,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 7,
  "stage": {
   "name": "N.G. 목장",
   "jp": "N.G.牧場",
   "flag": "🗺️",
   "hp": 900000,
   "max": 10,
   "xp": 6840,
   "sky": "#e8c99a",
   "land": "#9a6d43",
   "drop": {}
  },
  "rules": [
   {
    "type": "gorydark",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 250,
    "count": 8,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "blackleboin",
    "at": {
     "t": 70
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "oldree",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 100,
    "count": 2,
    "delay": [
     36.666666666666664,
     36.666666666666664
    ]
   }
  ]
 },
 {
  "sub": 7,
  "stage": {
   "name": "헌팅 산",
   "jp": "ハンチング山",
   "flag": "🗺️",
   "hp": 700000,
   "max": 10,
   "xp": 6840,
   "sky": "#e8c99a",
   "land": "#9a6d43",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "dagshund",
    "at": {
     "t": 20
    },
    "mag": 1000,
    "count": 5,
    "delay": [
     30,
     54
    ]
   },
   {
    "type": "celeboodle",
    "at": {
     "t": 60
    },
    "mag": 1000,
    "delay": [
     14.666666666666666,
     25.333333333333332
    ]
   },
   {
    "type": "mrmole",
    "at": {
     "t": 50
    },
    "mag": 100,
    "count": 2,
    "delay": [
     50,
     50
    ]
   },
   {
    "type": "croakley",
    "at": {
     "t": 83.33333333333333
    },
    "mag": 100,
    "count": 1
   }
  ]
 },
 {
  "sub": 7,
  "stage": {
   "name": "벌벌 고원",
   "jp": "ビクビク高原",
   "flag": "🗺️",
   "hp": 750000,
   "max": 12,
   "xp": 7220,
   "sky": "#e8c99a",
   "land": "#9a6d43",
   "drop": {}
  },
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     4,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     4,
     20
    ]
   },
   {
    "type": "hippo",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     12,
     40
    ]
   },
   {
    "type": "gory",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     12,
     40
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 8,
    "delay": [
     6.666666666666667,
     54
    ]
   },
   {
    "type": "zomboe",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 5,
    "delay": [
     13.333333333333334,
     54
    ]
   },
   {
    "type": "zory",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     20,
     25.333333333333332
    ]
   },
   {
    "type": "zbore",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "bore",
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
  "sub": 7,
  "stage": {
   "name": "데드 리볼버 계곡",
   "jp": "デッドリボルバー渓谷",
   "flag": "🗺️",
   "hp": 999999,
   "max": 10,
   "xp": 7980,
   "sky": "#e8c99a",
   "land": "#9a6d43",
   "drop": {}
  },
  "rules": [
   {
    "type": "kogaou",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "daddy",
    "at": {
     "t": 0
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "kory",
    "at": {
     "t": 60
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "kory",
    "at": {
     "t": 113.33333333333333
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "pigeon",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     20,
     30
    ]
   }
  ]
 },
 {
  "sub": 8,
  "stage": {
   "name": "흰다랑어 해안",
   "jp": "シロマグロ海岸",
   "flag": "🗺️",
   "hp": 825000,
   "max": 15,
   "xp": 6840,
   "sky": "#bfe3e8",
   "land": "#8aa39b",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "dogebase",
    "at": {
     "t": 0
    },
    "mag": 55000,
    "count": 1
   },
   {
    "type": "walldoge",
    "at": {
     "t": 0
    },
    "mag": 600,
    "count": 20,
    "delay": [
     16.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "dolphina",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "count": 2,
    "delay": [
     16.666666666666668,
     16.666666666666668
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 200,
    "count": 5,
    "delay": [
     43.333333333333336,
     43.333333333333336
    ]
   },
   {
    "type": "nyandam",
    "at": {
     "t": 6
    },
    "mag": 2800,
    "count": 1,
    "boss": true
   },
   {
    "type": "dolphina",
    "at": {
     "t": 100
    },
    "mag": 200,
    "count": 2,
    "delay": [
     3.3333333333333335,
     10
    ]
   }
  ]
 },
 {
  "sub": 8,
  "stage": {
   "name": "궁극 병기 바다사자",
   "jp": "究極兵器トド",
   "flag": "🗺️",
   "hp": 800000,
   "max": 10,
   "xp": 6650,
   "sky": "#bfe3e8",
   "land": "#8aa39b",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "starpeng",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 5,
    "delay": [
     16.666666666666668,
     23.333333333333332
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "calamaria",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 3,
    "delay": [
     6.666666666666667,
     6.666666666666667
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 10,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 8,
  "stage": {
   "name": "미꾸라지 깨기",
   "jp": "ドジョウ破り",
   "flag": "🗺️",
   "hp": 99999,
   "max": 10,
   "xp": 5890,
   "sky": "#bfe3e8",
   "land": "#8aa39b",
   "drop": {}
  },
  "rules": [
   {
    "type": "koraino",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "bigsal",
    "at": {
     "t": 0
    },
    "mag": 200,
    "count": 5,
    "delay": [
     10,
     30
    ]
   }
  ]
 },
 {
  "sub": 8,
  "stage": {
   "name": "괭이갈매기 만",
   "jp": "ウミネコ湾岸",
   "flag": "🗺️",
   "hp": 780000,
   "max": 8,
   "xp": 6650,
   "sky": "#bfe3e8",
   "land": "#8aa39b",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "croco",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 10,
    "delay": [
     8,
     16
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     1,
     16
    ]
   },
   {
    "type": "zroco",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 300,
    "count": 3,
    "delay": [
     4,
     16
    ]
   },
   {
    "type": "zroco",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 9,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "rhino",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "seal",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     40,
     60
    ]
   },
   {
    "type": "zirzeal",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     30,
     30
    ]
   },
   {
    "type": "zcamelle",
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
  "sub": 8,
  "stage": {
   "name": "날름날름 늪",
   "jp": "べろべろ沼",
   "flag": "🗺️",
   "hp": 900000,
   "max": 8,
   "xp": 7410,
   "sky": "#bfe3e8",
   "land": "#8aa39b",
   "drop": {}
  },
  "rules": [
   {
    "type": "metalhippo",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 3,
    "delay": [
     10,
     40
    ]
   },
   {
    "type": "duche",
    "at": {
     "t": 0
    },
    "mag": 1000,
    "count": 1
   },
   {
    "type": "duche",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "delay": [
     30,
     40
    ]
   },
   {
    "type": "supermetalhippo",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 1,
    "boss": true
   },
   {
    "type": "tackey",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 3,
    "delay": [
     33.333333333333336,
     40
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 6,
    "delay": [
     10,
     16.666666666666668
    ]
   }
  ]
 },
 {
  "sub": 8,
  "stage": {
   "name": "보이스 피싱",
   "jp": "おれおれサギ",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 9,
   "xp": 7980,
   "sky": "#bfe3e8",
   "land": "#8aa39b",
   "drop": {}
  },
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 10,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "count": 10,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "mrangel",
    "at": {
     "t": 20
    },
    "mag": 200,
    "count": 10,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 6,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "oldree",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "mrangel",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 4,
    "delay": [
     20,
     26.666666666666668
    ]
   },
   {
    "type": "mrangel",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "heavenlyhippoe",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 6,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "sleipnir",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "clione",
    "at": {
     "hp": 99
    },
    "mag": 1600,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 9,
  "stage": {
   "name": "귀뚜라미 이데올로기",
   "jp": "コオロギイデオロギー",
   "flag": "🗺️",
   "hp": 999999,
   "max": 7,
   "xp": 6840,
   "sky": "#e3b8b0",
   "land": "#8a4d45",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "strayguy",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     1,
     2
    ]
   },
   {
    "type": "zomboe",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 300,
    "count": 3,
    "delay": [
     33.333333333333336,
     40
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 4,
    "delay": [
     30,
     40
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "t": 46.666666666666664
    },
    "mag": 300,
    "count": 3,
    "delay": [
     26.666666666666668,
     43.333333333333336
    ]
   },
   {
    "type": "shadowboxer",
    "at": {
     "t": 120
    },
    "mag": 300,
    "count": 2,
    "delay": [
     40,
     66.66666666666667
    ]
   },
   {
    "type": "kogaou",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 9,
  "stage": {
   "name": "굴속의 최고 권력자",
   "jp": "穴ぐらの最高権力者",
   "flag": "🗺️",
   "hp": 300000,
   "max": 10,
   "xp": 6460,
   "sky": "#e3b8b0",
   "land": "#8a4d45",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "koraino",
    "at": {
     "t": 2
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "rhino",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 4000,
    "count": 2,
    "delay": [
     30,
     30
    ]
   },
   {
    "type": "metalcyborg",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 300,
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "cyberx",
    "at": {
     "t": 60
    },
    "mag": 1200,
    "count": 1
   }
  ]
 },
 {
  "sub": 9,
  "stage": {
   "name": "인민과 당근",
   "jp": "人民とにんじん",
   "flag": "🗺️",
   "hp": 177777,
   "max": 7,
   "xp": 6840,
   "sky": "#e3b8b0",
   "land": "#8a4d45",
   "drop": {}
  },
  "rules": [
   {
    "type": "coffinzoge",
    "at": {
     "t": 0
    },
    "mag": 100,
    "count": 7,
    "delay": [
     3.3333333333333335,
     3.3333333333333335
    ]
   },
   {
    "type": "cadaverbear",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "assassinbear",
    "at": {
     "hp": 99
    },
    "mag": 5000,
    "firstDelay": 0.06666666666666667,
    "delay": [
     6.666666666666667,
     6.666666666666667
    ],
    "boss": true
   }
  ]
 },
 {
  "sub": 9,
  "stage": {
   "name": "밀고자 군단",
   "jp": "密告者軍団",
   "flag": "🗺️",
   "hp": 100000,
   "max": 10,
   "xp": 6460,
   "sky": "#e3b8b0",
   "land": "#8a4d45",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "hackey",
    "at": {
     "t": 0
    },
    "mag": 200,
    "count": 1,
    "boss": true
   },
   {
    "type": "henry",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "croakley",
    "at": {
     "t": 10
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "kidtappa",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "count": 5,
    "delay": [
     33.333333333333336,
     33.333333333333336
    ]
   },
   {
    "type": "ribbo",
    "at": {
     "t": 20
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "mamaleboin",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 1
   }
  ]
 },
 {
  "sub": 9,
  "stage": {
   "name": "망명 전야의 기습",
   "jp": "亡命前夜の奇襲",
   "flag": "🗺️",
   "hp": 100000,
   "max": 10,
   "xp": 6840,
   "sky": "#e3b8b0",
   "land": "#8a4d45",
   "drop": {}
  },
  "rules": [
   {
    "type": "cyberface",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 100,
    "count": 20,
    "delay": [
     0.6666666666666666,
     1.3333333333333333
    ]
   },
   {
    "type": "face",
    "at": {
     "t": 0
    },
    "mag": 500,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 9,
  "stage": {
   "name": "레드 캣 작전",
   "jp": "レッドキャット作戦",
   "flag": "🗺️",
   "hp": 1500000,
   "max": 1,
   "xp": 7980,
   "sky": "#e3b8b0",
   "land": "#8a4d45",
   "drop": {}
  },
  "rules": [
   {
    "type": "truebunbun",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "oldree",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "supermayor",
    "at": {
     "t": 0.06666666666666667
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 10,
  "stage": {
   "name": "용암 온욕",
   "jp": "溶岩温浴",
   "flag": "🗺️",
   "hp": 600000,
   "max": 8,
   "xp": 7220,
   "sky": "#f0c7b8",
   "land": "#7a4e45",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "hippo",
    "at": {
     "t": 30
    },
    "mag": 4000,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "pigge",
    "at": {
     "t": 60
    },
    "mag": 4000,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "peng",
    "at": {
     "t": 90
    },
    "mag": 4000,
    "delay": [
     20,
     40
    ]
   },
   {
    "type": "camelle",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "alpacky",
    "at": {
     "t": 20
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "zcamelle",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 1
   }
  ]
 },
 {
  "sub": 10,
  "stage": {
   "name": "음속 화쇄류",
   "jp": "音速火砕流",
   "flag": "🗺️",
   "hp": 999999,
   "max": 4,
   "xp": 6840,
   "sky": "#f0c7b8",
   "land": "#7a4e45",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "peng",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "seal",
    "at": {
     "t": 20
    },
    "mag": 4000,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "rabbit",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "razorback",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "boraphim",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "bore",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "rabbit",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 10,
  "stage": {
   "name": "재의 비, 사랑을 위해",
   "jp": "灰の雨、愛のため",
   "flag": "🗺️",
   "hp": 200000,
   "max": 3,
   "xp": 6080,
   "sky": "#f0c7b8",
   "land": "#7a4e45",
   "drop": {}
  },
  "rules": [
   {
    "type": "assassinbear",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 1000,
    "count": 100,
    "delay": [
     0.06666666666666667,
     0.6666666666666666
    ]
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 10
    },
    "mag": 1000,
    "count": 1
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 5
    },
    "mag": 1000,
    "count": 1
   },
   {
    "type": "metalhippo",
    "at": {
     "t": 0
    },
    "mag": 1000,
    "count": 1
   }
  ]
 },
 {
  "sub": 10,
  "stage": {
   "name": "정상의 대현자",
   "jp": "頂の大賢者",
   "flag": "🗺️",
   "hp": 800000,
   "max": 8,
   "xp": 6840,
   "sky": "#f0c7b8",
   "land": "#7a4e45",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "shyboy",
    "at": {
     "t": 0
    },
    "mag": 800,
    "count": 4,
    "delay": [
     1.6666666666666667,
     2
    ]
   },
   {
    "type": "shyboy",
    "at": {
     "t": 22
    },
    "mag": 800,
    "delay": [
     40,
     50
    ]
   },
   {
    "type": "bunbun",
    "at": {
     "t": 22
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "bunbun",
    "at": {
     "t": 22.666666666666668
    },
    "mag": 2000,
    "count": 1
   }
  ]
 },
 {
  "sub": 10,
  "stage": {
   "name": "폭군 칼데라",
   "jp": "暴虐カルデラ",
   "flag": "🗺️",
   "hp": 999999,
   "max": 10,
   "xp": 7600,
   "sky": "#f0c7b8",
   "land": "#7a4e45",
   "drop": {}
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "delay": [
     10,
     30
    ]
   },
   {
    "type": "kory",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 3,
    "delay": [
     16.666666666666668,
     20
    ]
   },
   {
    "type": "kory",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 2,
    "delay": [
     16.666666666666668,
     20
    ]
   },
   {
    "type": "kory",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 10,
  "stage": {
   "name": "슈퍼 볼케이노",
   "jp": "スーパーボルケーノ",
   "flag": "🗺️",
   "hp": 1200000,
   "max": 18,
   "xp": 8360,
   "sky": "#f0c7b8",
   "land": "#7a4e45",
   "drop": {}
  },
  "rules": [
   {
    "type": "cyberx",
    "at": {
     "t": 10
    },
    "mag": 1000,
    "count": 1
   },
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3.3333333333333335,
     10
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 30
    },
    "mag": 100,
    "count": 10,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "inglis",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 10,
    "delay": [
     13.333333333333334,
     16.666666666666668
    ]
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 3,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "koraino",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 8,
    "delay": [
     8.333333333333334,
     10
    ]
   },
   {
    "type": "koraino",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 4,
    "delay": [
     16.666666666666668,
     20
    ]
   },
   {
    "type": "koraino",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 11,
  "stage": {
   "name": "이상한 찬송가",
   "jp": "へんな讃美歌",
   "flag": "🗺️",
   "hp": 800000,
   "max": 7,
   "xp": 6840,
   "sky": "#c9c0de",
   "land": "#6e6488",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 0
    },
    "mag": 100,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "maawth",
    "at": {
     "hp": 99
    },
    "mag": 2400,
    "count": 2,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "supermayor",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   },
   {
    "type": "ancientdog",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 10,
    "delay": [
     2,
     6
    ]
   }
  ]
 },
 {
  "sub": 11,
  "stage": {
   "name": "연유 수도굴의 처녀",
   "jp": "練乳修洞窟の乙女",
   "flag": "🗺️",
   "hp": 750000,
   "max": 8,
   "xp": 6460,
   "sky": "#c9c0de",
   "land": "#6e6488",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "shibalienelite",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 50,
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
    "mag": 400,
    "count": 4,
    "delay": [
     14.666666666666666,
     22
    ]
   },
   {
    "type": "scissorman",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 4,
    "delay": [
     2,
     6
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 10,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 11,
  "stage": {
   "name": "흥겨운 기도",
   "jp": "良いノリの祈り",
   "flag": "🗺️",
   "hp": 900000,
   "max": 30,
   "xp": 7220,
   "sky": "#c9c0de",
   "land": "#6e6488",
   "drop": {}
  },
  "rules": [
   {
    "type": "twocan",
    "at": {
     "t": 10
    },
    "mag": 300,
    "count": 2,
    "delay": [
     36.666666666666664,
     36.666666666666664
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     1.6666666666666667,
     3.3333333333333335
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 100,
    "delay": [
     13.333333333333334,
     16.666666666666668
    ]
   },
   {
    "type": "inglis",
    "at": {
     "t": 80
    },
    "mag": 100,
    "count": 10,
    "delay": [
     6.666666666666667,
     10
    ]
   }
  ]
 },
 {
  "sub": 11,
  "stage": {
   "name": "르상티망의 숲",
   "jp": "ルサンチマンの森",
   "flag": "🗺️",
   "hp": 735000,
   "max": 9,
   "xp": 6840,
   "sky": "#c9c0de",
   "land": "#6e6488",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "metaldoge",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 8,
    "delay": [
     12,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 20
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "baa",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "supermetalhippo",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 1
   },
   {
    "type": "angelbutta",
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
  "sub": 11,
  "stage": {
   "name": "수다쟁이 은둔자",
   "jp": "おしゃべり世捨て人",
   "flag": "🗺️",
   "hp": 900000,
   "max": 12,
   "xp": 7220,
   "sky": "#c9c0de",
   "land": "#6e6488",
   "drop": {}
  },
  "rules": [
   {
    "type": "zoge",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 24,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "t": 0
    },
    "mag": 300,
    "count": 16,
    "delay": [
     12,
     20
    ]
   },
   {
    "type": "strayguy",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "painter",
    "at": {
     "t": 20
    },
    "mag": 400,
    "count": 8,
    "delay": [
     10,
     20
    ]
   }
  ]
 },
 {
  "sub": 11,
  "stage": {
   "name": "원시에 깃든 혼",
   "jp": "原始に宿る魂",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 20,
   "xp": 8360,
   "sky": "#c9c0de",
   "land": "#6e6488",
   "drop": {}
  },
  "rules": [
   {
    "type": "mooth",
    "at": {
     "t": 0.6666666666666666
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     6.666666666666667,
     10
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 500,
    "delay": [
     39.333333333333336,
     40
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 34
    },
    "mag": 500,
    "count": 3,
    "delay": [
     39.333333333333336,
     40
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 34.666666666666664
    },
    "mag": 500,
    "count": 6,
    "delay": [
     39.333333333333336,
     40
    ]
   },
   {
    "type": "redsnache",
    "at": {
     "t": 10
    },
    "mag": 500,
    "count": 5,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "blackotta",
    "at": {
     "t": 30
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "blackotta",
    "at": {
     "t": 60
    },
    "mag": 200,
    "delay": [
     83.33333333333333,
     83.33333333333333
    ]
   },
   {
    "type": "blackotta",
    "at": {
     "t": 63.333333333333336
    },
    "mag": 200,
    "count": 3,
    "delay": [
     83.33333333333333,
     83.33333333333333
    ]
   },
   {
    "type": "dogumaru",
    "at": {
     "t": 46.666666666666664
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "dogumaru",
    "at": {
     "t": 113.33333333333333
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "dogumaru",
    "at": {
     "t": 186.66666666666666
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "redsnache",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "count": 10,
    "delay": [
     3.3333333333333335,
     6.666666666666667
    ]
   },
   {
    "type": "blackotta",
    "at": {
     "hp": 90
    },
    "mag": 200,
    "count": 3,
    "delay": [
     6.666666666666667,
     6.666666666666667
    ]
   },
   {
    "type": "mooth",
    "at": {
     "hp": 80
    },
    "mag": 4000,
    "count": 2,
    "delay": [
     10,
     10
    ]
   }
  ]
 },
 {
  "sub": 12,
  "stage": {
   "name": "이와록 암초",
   "jp": "イワロック岩礁",
   "flag": "🗺️",
   "hp": 900000,
   "max": 6,
   "xp": 6840,
   "sky": "#9fc7cf",
   "land": "#4e6b70",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "rabbit",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 2500,
    "count": 5,
    "delay": [
     26.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 1200,
    "count": 5,
    "delay": [
     16.666666666666668,
     23.333333333333332
    ]
   },
   {
    "type": "gardeneels",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 1000,
    "count": 1
   },
   {
    "type": "professor",
    "at": {
     "t": 20
    },
    "mag": 200,
    "count": 1
   }
  ]
 },
 {
  "sub": 12,
  "stage": {
   "name": "앵무조개 무덤",
   "jp": "オウム貝の墓場",
   "flag": "🗺️",
   "hp": 750000,
   "max": 6,
   "xp": 6460,
   "sky": "#9fc7cf",
   "land": "#4e6b70",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "gravey",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 300,
    "count": 1,
    "boss": true
   },
   {
    "type": "mrmole",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 100,
    "count": 2,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "t": 23.333333333333332
    },
    "mag": 300,
    "delay": [
     26.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "zroco",
    "at": {
     "t": 20
    },
    "mag": 300,
    "delay": [
     23.333333333333332,
     30
    ]
   },
   {
    "type": "kangaroo",
    "at": {
     "t": 40
    },
    "mag": 4000,
    "count": 4,
    "delay": [
     53.333333333333336,
     53.333333333333336
    ]
   }
  ]
 },
 {
  "sub": 12,
  "stage": {
   "name": "바다에서 돌아온 망자",
   "jp": "海より還りし亡者",
   "flag": "🗺️",
   "hp": 850000,
   "max": 6,
   "xp": 6840,
   "sky": "#9fc7cf",
   "land": "#4e6b70",
   "drop": {}
  },
  "rules": [
   {
    "type": "face",
    "at": {
     "t": 0
    },
    "mag": 1000,
    "count": 1,
    "boss": true
   },
   {
    "type": "koraino",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "ministercyclone",
    "at": {
     "t": 26.666666666666668
    },
    "mag": 1000,
    "count": 5,
    "delay": [
     25.333333333333332,
     25.333333333333332
    ]
   }
  ]
 },
 {
  "sub": 12,
  "stage": {
   "name": "인면어의 물가",
   "jp": "人面魚の渚",
   "flag": "🗺️",
   "hp": 800000,
   "max": 8,
   "xp": 7220,
   "sky": "#9fc7cf",
   "land": "#4e6b70",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "kroxo",
    "at": {
     "t": 0
    },
    "mag": 2400,
    "delay": [
     10,
     20
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 20
    },
    "mag": 1200,
    "count": 6,
    "delay": [
     24,
     30
    ]
   },
   {
    "type": "gorydark",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "gonzales",
    "at": {
     "t": 60
    },
    "mag": 300,
    "count": 2,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "hiyokoel",
    "at": {
     "t": 60
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "blackleboin",
    "at": {
     "t": 0
    },
    "mag": 250,
    "count": 1
   }
  ]
 },
 {
  "sub": 12,
  "stage": {
   "name": "낙타 안벽",
   "jp": "らくだ岸壁",
   "flag": "🗺️",
   "hp": 900000,
   "max": 10,
   "xp": 7220,
   "sky": "#9fc7cf",
   "land": "#4e6b70",
   "drop": {}
  },
  "rules": [
   {
    "type": "ancientdog",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 100,
    "delay": [
     20,
     26.666666666666668
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "count": 10,
    "delay": [
     2.6666666666666665,
     6
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 20,
    "delay": [
     2.6666666666666665,
     6
    ]
   },
   {
    "type": "supermayor",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "firstDelay": 40,
    "count": 1
   },
   {
    "type": "shyboy",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "firstDelay": 40,
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "shyboy",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "firstDelay": 40,
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "kogaou",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "firstDelay": 40,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 12,
  "stage": {
   "name": "시야 없는 사해",
   "jp": "視界なき死海",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 10,
   "xp": 8360,
   "sky": "#9fc7cf",
   "land": "#4e6b70",
   "drop": {}
  },
  "rules": [
   {
    "type": "looper",
    "at": {
     "t": 10
    },
    "mag": 1000,
    "count": 2,
    "delay": [
     66.66666666666667,
     66.66666666666667
    ]
   },
   {
    "type": "lemurr",
    "at": {
     "t": 5
    },
    "mag": 2400,
    "count": 1
   },
   {
    "type": "zackiepeng",
    "at": {
     "t": 40
    },
    "mag": 300,
    "delay": [
     46.666666666666664,
     46.666666666666664
    ]
   },
   {
    "type": "zomboe",
    "at": {
     "t": 43.333333333333336
    },
    "mag": 300,
    "count": 3,
    "delay": [
     26.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "lemurr",
    "at": {
     "t": 66.66666666666667
    },
    "mag": 2400,
    "count": 2,
    "delay": [
     2,
     2
    ]
   }
  ]
 },
 {
  "sub": 13,
  "stage": {
   "name": "속죄 바캉스",
   "jp": "贖罪バカンス",
   "flag": "🗺️",
   "hp": 900000,
   "max": 20,
   "xp": 6840,
   "sky": "#bfeee0",
   "land": "#d9c08a",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     0.06666666666666667,
     6
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 2500,
    "count": 2,
    "delay": [
     10,
     16.666666666666668
    ]
   },
   {
    "type": "shibalienelite",
    "at": {
     "hp": 99
    },
    "mag": 2500,
    "firstDelay": 6.666666666666667,
    "count": 15,
    "delay": [
     13.333333333333334,
     26.666666666666668
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     46.666666666666664,
     46.666666666666664
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     46.666666666666664,
     46.666666666666664
    ]
   },
   {
    "type": "captainmogu",
    "at": {
     "hp": 99
    },
    "mag": 2500,
    "count": 3,
    "delay": [
     16.666666666666668,
     16.666666666666668
    ]
   },
   {
    "type": "sloth",
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
  "sub": 13,
  "stage": {
   "name": "프라이빗 열대우림",
   "jp": "プライベート熱帯雨林",
   "flag": "🗺️",
   "hp": 850000,
   "max": 15,
   "xp": 7220,
   "sky": "#bfeee0",
   "land": "#d9c08a",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "nyororon",
    "at": {
     "t": 0
    },
    "mag": 300,
    "delay": [
     16.666666666666668,
     30
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "walldoge",
    "at": {
     "t": 23.333333333333332
    },
    "mag": 600,
    "delay": [
     16.666666666666668,
     16.666666666666668
    ]
   },
   {
    "type": "brollow",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "delay": [
     26.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "cadaverbear",
    "at": {
     "t": 33.333333333333336
    },
    "mag": 300,
    "count": 2,
    "delay": [
     60,
     60
    ]
   },
   {
    "type": "brollow",
    "at": {
     "hp": 90
    },
    "mag": 200,
    "count": 3,
    "delay": [
     0.6666666666666666,
     0.6666666666666666
    ]
   },
   {
    "type": "brollow",
    "at": {
     "hp": 80
    },
    "mag": 200,
    "count": 3,
    "delay": [
     0.6666666666666666,
     0.6666666666666666
    ]
   },
   {
    "type": "brollow",
    "at": {
     "hp": 70
    },
    "mag": 200,
    "count": 3,
    "delay": [
     0.6666666666666666,
     0.6666666666666666
    ]
   }
  ]
 },
 {
  "sub": 13,
  "stage": {
   "name": "허물없는 나이트 비치",
   "jp": "無礼講ナイトビーチ",
   "flag": "🗺️",
   "hp": 900000,
   "max": 20,
   "xp": 6460,
   "sky": "#bfeee0",
   "land": "#d9c08a",
   "drop": {}
  },
  "rules": [
   {
    "type": "croakley",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "guys",
    "at": {
     "t": 10
    },
    "mag": 4000,
    "delay": [
     2,
     4
    ]
   },
   {
    "type": "hienergy",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 300,
    "count": 1,
    "boss": true
   },
   {
    "type": "otta",
    "at": {
     "t": 23.333333333333332
    },
    "mag": 800,
    "count": 2,
    "delay": [
     33.333333333333336,
     33.333333333333336
    ]
   }
  ]
 },
 {
  "sub": 13,
  "stage": {
   "name": "13번 홀의 주민",
   "jp": "13番ホールの住人",
   "flag": "🗺️",
   "hp": 800000,
   "max": 16,
   "xp": 6840,
   "sky": "#bfeee0",
   "land": "#d9c08a",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "croco",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     2,
     10
    ]
   },
   {
    "type": "zroco",
    "at": {
     "t": 20
    },
    "mag": 300,
    "count": 30,
    "delay": [
     2,
     10
    ]
   },
   {
    "type": "kroxo",
    "at": {
     "t": 40
    },
    "mag": 2400,
    "count": 15,
    "delay": [
     4,
     10
    ]
   },
   {
    "type": "henry",
    "at": {
     "t": 30
    },
    "mag": 150,
    "count": 1
   },
   {
    "type": "sael",
    "at": {
     "t": 0
    },
    "mag": 2400,
    "delay": [
     13.333333333333334,
     20
    ]
   }
  ]
 },
 {
  "sub": 13,
  "stage": {
   "name": "승천 스파 마사지",
   "jp": "昇天スパマッサージ",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 8,
   "xp": 7220,
   "sky": "#bfeee0",
   "land": "#d9c08a",
   "drop": {}
  },
  "rules": [
   {
    "type": "kurosawah",
    "at": {
     "t": 0
    },
    "mag": 400,
    "count": 1,
    "boss": true
   },
   {
    "type": "squirrel",
    "at": {
     "t": 120
    },
    "mag": 4000,
    "delay": [
     16,
     24
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 1000,
    "delay": [
     16,
     24
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 1000,
    "delay": [
     16,
     24
    ]
   },
   {
    "type": "boraphim",
    "at": {
     "t": 90
    },
    "mag": 100,
    "count": 1
   },
   {
    "type": "sleipnir",
    "at": {
     "t": 60
    },
    "mag": 250,
    "count": 1
   },
   {
    "type": "calamaria",
    "at": {
     "t": 30
    },
    "mag": 100,
    "count": 1
   }
  ]
 },
 {
  "sub": 13,
  "stage": {
   "name": "호텔 화조풍월",
   "jp": "ホテル花鳥風月",
   "flag": "🗺️",
   "hp": 1200000,
   "max": 10,
   "xp": 8360,
   "sky": "#bfeee0",
   "land": "#d9c08a",
   "drop": {}
  },
  "rules": [
   {
    "type": "owlbrow",
    "at": {
     "t": 10
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "pigeon",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 8,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "oldree",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 3,
    "delay": [
     40,
     40
    ]
   },
   {
    "type": "bigdream",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 14,
  "stage": {
   "name": "털가죽 튀김",
   "jp": "毛皮をかき揚げて",
   "flag": "🗺️",
   "hp": 770000,
   "max": 15,
   "xp": 7220,
   "sky": "#d6c6ea",
   "land": "#6f5f8a",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 40
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "sunfish",
    "at": {
     "t": 0
    },
    "mag": 150,
    "count": 1,
    "boss": true
   },
   {
    "type": "hiyokoel",
    "at": {
     "t": 20
    },
    "mag": 250,
    "count": 2,
    "delay": [
     66.66666666666667,
     66.66666666666667
    ]
   },
   {
    "type": "hiyokoel",
    "at": {
     "t": 20.333333333333332
    },
    "mag": 250,
    "count": 2,
    "delay": [
     66.66666666666667,
     66.66666666666667
    ]
   },
   {
    "type": "hiyokoel",
    "at": {
     "t": 20.666666666666668
    },
    "mag": 250,
    "count": 2,
    "delay": [
     66.66666666666667,
     66.66666666666667
    ]
   },
   {
    "type": "dagshund",
    "at": {
     "t": 22.666666666666668
    },
    "mag": 1000,
    "count": 2,
    "delay": [
     66.66666666666667,
     66.66666666666667
    ]
   },
   {
    "type": "gabriel",
    "at": {
     "t": 40
    },
    "mag": 500,
    "count": 10,
    "delay": [
     13.333333333333334,
     13.333333333333334
    ]
   }
  ]
 },
 {
  "sub": 14,
  "stage": {
   "name": "인어 앙카케",
   "jp": "マーメイドのあんかけ",
   "flag": "🗺️",
   "hp": 830000,
   "max": 10,
   "xp": 6840,
   "sky": "#d6c6ea",
   "land": "#6f5f8a",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "zoge",
    "at": {
     "t": 1.3333333333333333
    },
    "mag": 300,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "nyororon",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 300,
    "delay": [
     20,
     30
    ]
   },
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 1200,
    "count": 1
   },
   {
    "type": "ultrabaabaa",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 4,
    "delay": [
     13.333333333333334,
     26.666666666666668
    ]
   },
   {
    "type": "kidtappa",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 2,
    "delay": [
     26.666666666666668,
     26.666666666666668
    ]
   },
   {
    "type": "zory",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     33.333333333333336,
     33.333333333333336
    ]
   },
   {
    "type": "zbore",
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
  "sub": 14,
  "stage": {
   "name": "제왕의 교실",
   "jp": "帝王の教室",
   "flag": "🗺️",
   "hp": 900000,
   "max": 5,
   "xp": 6650,
   "sky": "#d6c6ea",
   "land": "#6f5f8a",
   "drop": {}
  },
  "rules": [
   {
    "type": "alienbunbun",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1
   },
   {
    "type": "phace",
    "at": {
     "hp": 99
    },
    "mag": 2400,
    "count": 1
   },
   {
    "type": "lilbunbun",
    "at": {
     "hp": 99
    },
    "mag": 1500,
    "count": 10,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "maawth",
    "at": {
     "hp": 99
    },
    "mag": 2400,
    "count": 1
   },
   {
    "type": "lilbunbun",
    "at": {
     "hp": 99
    },
    "mag": 1500,
    "count": 4,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "lilbunbun",
    "at": {
     "hp": 99
    },
    "mag": 1500,
    "count": 4,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "calamary",
    "at": {
     "hp": 99
    },
    "mag": 500,
    "count": 1
   },
   {
    "type": "lilbunbun",
    "at": {
     "hp": 99
    },
    "mag": 5,
    "count": 1,
    "boss": true
   },
   {
    "type": "lilbunbun",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 1500,
    "count": 3,
    "delay": [
     12,
     18
    ]
   }
  ]
 },
 {
  "sub": 14,
  "stage": {
   "name": "허둥지둥 대들보",
   "jp": "バタバタ大黒柱",
   "flag": "🗺️",
   "hp": 750000,
   "max": 12,
   "xp": 7600,
   "sky": "#d6c6ea",
   "land": "#6f5f8a",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     3,
     20
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "delay": [
     5.333333333333333,
     12
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "delay": [
     5.333333333333333,
     12
    ]
   },
   {
    "type": "tackey",
    "at": {
     "hp": 99
    },
    "mag": 200,
    "count": 4,
    "delay": [
     30,
     33.333333333333336
    ]
   },
   {
    "type": "mooth",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "mooth",
    "at": {
     "hp": 99
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "shyboy",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 2,
    "delay": [
     50,
     50
    ]
   },
   {
    "type": "shyboy",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 2,
    "delay": [
     50,
     50
    ]
   },
   {
    "type": "face",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 14,
  "stage": {
   "name": "결벽증 파수꾼",
   "jp": "潔癖症の番人",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 8,
   "xp": 6840,
   "sky": "#d6c6ea",
   "land": "#6f5f8a",
   "drop": {}
  },
  "rules": [
   {
    "type": "guys",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     2,
     8
    ]
   },
   {
    "type": "painter",
    "at": {
     "t": 0
    },
    "mag": 2500,
    "count": 1
   },
   {
    "type": "madampoodle",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     0.26666666666666666,
     0.6666666666666666
    ]
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 1
   },
   {
    "type": "otta",
    "at": {
     "hp": 99
    },
    "mag": 800,
    "count": 9,
    "delay": [
     14,
     26.666666666666668
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "count": 3,
    "delay": [
     26.666666666666668,
     33.333333333333336
    ]
   },
   {
    "type": "ministercyclone",
    "at": {
     "hp": 99
    },
    "mag": 1000,
    "count": 6,
    "delay": [
     13.333333333333334,
     16.666666666666668
    ]
   },
   {
    "type": "eldersloth",
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
  "sub": 14,
  "stage": {
   "name": "절대 근시 구역",
   "jp": "絶対近視区域",
   "flag": "🗺️",
   "hp": 1111111,
   "max": 10,
   "xp": 8550,
   "sky": "#d6c6ea",
   "land": "#6f5f8a",
   "drop": {}
  },
  "rules": [
   {
    "type": "metaldoge",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 300,
    "count": 10,
    "delay": [
     6.666666666666667,
     13.333333333333334
    ]
   },
   {
    "type": "ancientdog",
    "at": {
     "t": 13.333333333333334
    },
    "mag": 100,
    "count": 5,
    "delay": [
     10,
     16.666666666666668
    ]
   },
   {
    "type": "metaldoge",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "delay": [
     13.333333333333334,
     16.666666666666668
    ]
   },
   {
    "type": "supermetalhippo",
    "at": {
     "hp": 99
    },
    "mag": 300,
    "count": 3,
    "delay": [
     46.666666666666664,
     50
    ]
   },
   {
    "type": "datemegane",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 4,
    "delay": [
     30,
     30
    ]
   },
   {
    "type": "metalseal",
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
  "sub": 15,
  "stage": {
   "name": "두근두근 현관",
   "jp": "胸騒ぎ玄関",
   "flag": "🗺️",
   "hp": 720000,
   "max": 5,
   "xp": 6650,
   "sky": "#f3e3c4",
   "land": "#a88a6a",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     3,
     6.666666666666667
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 3,
    "delay": [
     3,
     6.666666666666667
    ]
   },
   {
    "type": "peng",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 4000,
    "count": 1
   },
   {
    "type": "cyberx",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 10,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "madampoodle",
    "at": {
     "hp": 99
    },
    "mag": 1200,
    "count": 10,
    "delay": [
     13.333333333333334,
     20
    ]
   },
   {
    "type": "supermayor",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 15,
  "stage": {
   "name": "뒹굴뒹굴 복도",
   "jp": "ごろ寝廊下",
   "flag": "🗺️",
   "hp": 750000,
   "max": 4,
   "xp": 6840,
   "sky": "#f3e3c4",
   "land": "#a88a6a",
   "drop": {
    "nyan": 0.01
   }
  },
  "rules": [
   {
    "type": "pigge",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "count": 2,
    "delay": [
     10,
     13.333333333333334
    ]
   },
   {
    "type": "ostrich",
    "at": {
     "hp": 99
    },
    "mag": 250,
    "count": 2,
    "delay": [
     20,
     23.333333333333332
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "stpigge",
    "at": {
     "hp": 99
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     20,
     20
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 1,
    "boss": true
   }
  ]
 },
 {
  "sub": 15,
  "stage": {
   "name": "술 취한 거실",
   "jp": "酔いどれリビング",
   "flag": "🗺️",
   "hp": 1000000,
   "max": 12,
   "xp": 7030,
   "sky": "#f3e3c4",
   "land": "#a88a6a",
   "drop": {}
  },
  "rules": [
   {
    "type": "nyandam",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 2800,
    "count": 1,
    "boss": true
   },
   {
    "type": "bigsal",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "looper",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 1000,
    "count": 2,
    "delay": [
     20,
     20
    ]
   }
  ]
 },
 {
  "sub": 15,
  "stage": {
   "name": "깔끔한 키친",
   "jp": "きちんとキッチン",
   "flag": "🗺️",
   "hp": 920000,
   "max": 12,
   "xp": 7220,
   "sky": "#f3e3c4",
   "land": "#a88a6a",
   "drop": {
    "speed": 0.01
   }
  },
  "rules": [
   {
    "type": "dog",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "snache",
    "at": {
     "t": 0
    },
    "mag": 4000,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "leboin",
    "at": {
     "t": 10
    },
    "mag": 8000,
    "count": 4,
    "delay": [
     60,
     66.66666666666667
    ]
   },
   {
    "type": "hippo",
    "at": {
     "t": 20
    },
    "mag": 4000,
    "count": 20,
    "delay": [
     6,
     20
    ]
   },
   {
    "type": "peng",
    "at": {
     "t": 40
    },
    "mag": 4000,
    "count": 12,
    "delay": [
     0.6666666666666666,
     4
    ]
   },
   {
    "type": "zackiepeng",
    "at": {
     "t": 40
    },
    "mag": 300,
    "count": 12,
    "delay": [
     0.6666666666666666,
     4
    ]
   },
   {
    "type": "starpeng",
    "at": {
     "t": 40
    },
    "mag": 2500,
    "count": 12,
    "delay": [
     0.6666666666666666,
     4
    ]
   },
   {
    "type": "spaceborg",
    "at": {
     "t": 60
    },
    "mag": 2500,
    "count": 1
   }
  ]
 },
 {
  "sub": 15,
  "stage": {
   "name": "매복 욕실",
   "jp": "まちぶせ風呂",
   "flag": "🗺️",
   "hp": 900000,
   "max": 12,
   "xp": 7410,
   "sky": "#f3e3c4",
   "land": "#a88a6a",
   "drop": {}
  },
  "rules": [
   {
    "type": "brollow",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "delay": [
     33.333333333333336,
     50
    ]
   },
   {
    "type": "squirrel",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 4000,
    "delay": [
     3.3333333333333335,
     10
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "brollow",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "count": 24,
    "delay": [
     1,
     3
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "brollow",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "count": 20,
    "delay": [
     2,
     6
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 2000,
    "count": 3,
    "delay": [
     0.06666666666666667,
     0.06666666666666667
    ]
   },
   {
    "type": "brollow",
    "at": {
     "t": 16.666666666666668
    },
    "mag": 200,
    "count": 16,
    "delay": [
     3,
     9
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 12
    },
    "mag": 2000,
    "count": 4,
    "delay": [
     0.6666666666666666,
     1.3333333333333333
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 11
    },
    "mag": 2000,
    "count": 4,
    "delay": [
     0.6666666666666666,
     1.3333333333333333
    ]
   },
   {
    "type": "croco",
    "at": {
     "t": 10
    },
    "mag": 2000,
    "count": 4,
    "delay": [
     0.6666666666666666,
     1.3333333333333333
    ]
   },
   {
    "type": "hackey",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 200,
    "count": 1
   },
   {
    "type": "hackey",
    "at": {
     "t": 3.3333333333333335
    },
    "mag": 200,
    "count": 1
   }
  ]
 },
 {
  "sub": 15,
  "stage": {
   "name": "어린 양의 침실",
   "jp": "子羊の寝室",
   "flag": "🗺️",
   "hp": 980000,
   "max": 10,
   "xp": 8550,
   "sky": "#f3e3c4",
   "land": "#a88a6a",
   "drop": {}
  },
  "rules": [
   {
    "type": "darkdog",
    "at": {
     "t": 7.333333333333333
    },
    "mag": 1000,
    "delay": [
     20,
     22
    ]
   },
   {
    "type": "darkdog",
    "at": {
     "t": 6.666666666666667
    },
    "mag": 1000,
    "delay": [
     20,
     22
    ]
   },
   {
    "type": "kangaroo",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "firstDelay": 10,
    "delay": [
     40,
     66.66666666666667
    ]
   },
   {
    "type": "dolphina",
    "at": {
     "hp": 99
    },
    "mag": 100,
    "count": 5,
    "delay": [
     23.333333333333332,
     26.666666666666668
    ]
   },
   {
    "type": "kory",
    "at": {
     "hp": 99
    },
    "mag": 600,
    "count": 1
   },
   {
    "type": "bunbunblack",
    "at": {
     "hp": 99
    },
    "mag": 400,
    "count": 1,
    "boss": true
   }
  ]
 }
];
const TRUELEGEND_SUBS=[{"name":"진·전설의 시작","en":"A New Legend","jp":"真・伝説のはじまり","start":324,"len":1,"crowns":[1,1.5,2,1]},{"name":"배부른 비경","en":"Gluttonous Wilds","jp":"まんぷく秘境","start":325,"len":6,"crowns":[1,1.5,2,1]},{"name":"어드벤 대삼림","en":"Adventure Forest","jp":"アドベン大森林","start":331,"len":6,"crowns":[1,1.5,2,1]},{"name":"철벅철벅 옛 바닷길","en":"Old Sea Road","jp":"じゃぶじゃぶ旧海道","start":337,"len":6,"crowns":[1,1.5,2,1]},{"name":"멍멍 만","en":"Doggy Bay","jp":"ワンワン湾","start":343,"len":6,"crowns":[1,1.5,2,1]},{"name":"심연을 들여다보는 자","en":"Abyss Watcher","jp":"深淵を覗く者","start":349,"len":6,"crowns":[1,1.5,2,1]},{"name":"데스 메가 시티","en":"Death Mega City","jp":"デスメガシティ","start":355,"len":6,"crowns":[1,1.5,2,1]},{"name":"무법지대의 규칙","en":"Lawless Code","jp":"無法地帯のオキテ","start":361,"len":6,"crowns":[1,1.5,2,1]},{"name":"파라리라 반도","en":"Paralira Peninsula","jp":"パラリラ半島","start":367,"len":6,"crowns":[1,1.5,2,1]},{"name":"캣 쿠데타","en":"Coup de Chat","jp":"キャットクーデター","start":373,"len":6,"crowns":[1,1.5,2,1]},{"name":"체리 섬","en":"Cherry Isles","jp":"桜んぼ島","start":379,"len":6,"crowns":[1,1.4,1.8,1]},{"name":"혼의 밑바닥에서의 귀화","en":"Return from the Soul","jp":"魂底からの帰化","start":385,"len":6,"crowns":[1,1.4,1.8,1]},{"name":"멸종 해양 타운","en":"Extinct Ocean Town","jp":"絶滅海洋タウン","start":391,"len":6,"crowns":[1,1.4,1.8,1]},{"name":"유배 리조트","en":"Exile Resort","jp":"島流しリゾート","start":397,"len":6,"crowns":[1,1.4,1.8,1]},{"name":"미혹의 마도로","en":"Bewildering Magic Road","jp":"まどいの魔道路","start":403,"len":6,"crowns":[1,1.4,1.8,1]},{"name":"천계 바르 골목","en":"Heavenly Bar Alley","jp":"天界バル横丁","start":409,"len":6,"crowns":[1,1.4,1.8,1]}];
// 등록: 다른 모든 스테이지 모듈 뒤에 붙인다(저장된 절대 번호 유지). 레전드 키 324~396, 서브챕터 49~61.
// 열림: 구레전드 49장(고대 연구소)을 ★1로 깨면 0장이 열리고, 이후 앞 장 ★1 완주로 다음 장이 열린다(game.js legendSubOpen의 순차 규칙 그대로, 사용자 10-31).
const TRUELEGEND_START=STAGES.length,TRUELEGEND_K0=324,TRUELEGEND_SUB0=LEGEND_SUBS.length,TRUELEGEND_KN=TRUELEGEND_K0+TRUELEGEND_DATA.length;
for(const [j,sc]of TRUELEGEND_SUBS.entries()){
 LEGEND_SUBS.push({name:sc.name,en:sc.en,jp:sc.jp,start:sc.start,len:sc.len});
 LEGEND_SUB_CROWN[TRUELEGEND_SUB0+j]=sc.crowns;
}
for(const [j,{stage,rules}]of TRUELEGEND_DATA.entries()){
 const t={...stage,desc:[...new Set(rules.map(r=>UNIT_NAMES[r.type]||r.type))].join(' · ')};
 LEGEND_STAGES.push(t);STAGES.push({...t,gap:4,wave:0,chapter:4,legend:{k:TRUELEGEND_K0+j},maxEnemies:t.max});
 STAGE_SPAWNS[TRUELEGEND_START+j]=rules;
}
const legendIdxBeforeTrue=legendIdx;
legendIdx=function(k){return k>=TRUELEGEND_K0&&k<TRUELEGEND_KN?TRUELEGEND_START+k-TRUELEGEND_K0:legendIdxBeforeTrue(k)};
// 왕관 배율: 원작 값 그대로(★4는 1배).
const legendCrownMultBeforeTrue=legendCrownMult;
legendCrownMult=function(c,sub){return sub>=TRUELEGEND_SUB0&&sub<TRUELEGEND_SUB0+TRUELEGEND_SUBS.length?LEGEND_SUB_CROWN[sub][c-1]:legendCrownMultBeforeTrue(c,sub)};
// 별 난이도: 원작 값을 구하지 못해, 각 장 스테이지의 적 구성 점수(stageStars와 같은 식)로 범위를 정한다.
for(const [j,sc]of TRUELEGEND_SUBS.entries()){
 const v=[];for(let k=sc.start;k<sc.start+sc.len;k++)v.push(Math.max(1,Math.min(12,Math.round(STAR_FIT.a*stageScore(legendIdx(k),1)+STAR_FIT.b))));
 LEGEND_STAR_RANGES[TRUELEGEND_SUB0+j]=[Math.min(...v),Math.max(...v)];
}
// 저장 복원: game.js가 레전드 진행도를 먼저 읽을 때는 이 범위를 몰라 걸러낸다. 추가된 키만 다시 합친다.
try{
 const saved=JSON.parse(localStorage.getItem('red-battle-legend-v1')||'{}');
 for(const c of [1,2,3,4])if(Array.isArray(saved[c]))for(const k of saved[c])
  if(Number.isInteger(k)&&k>=TRUELEGEND_K0&&k<TRUELEGEND_KN&&!legendProgress[c].includes(k))legendProgress[c].push(k);
}catch{}

