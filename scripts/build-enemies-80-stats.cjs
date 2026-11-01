// 8.0 신규 적 13종: 원작 DB 수치(reference-sheets/enemies-80-stats.json)를 게임 수치로 바꾼다 → reference-sheets/enemies-80-game.json.
//   node scripts/build-enemies-80-stats.cjs
// 변환은 41~49장(build-legend-41-49.cjs)과 같다: 속도 ×.5367, 사거리·구간 ×.034, 프레임/30 = 초. 체력·공격은 원작 그대로(MULT=1; 11-01 사용자가 '새 적·스테이지 ×1.3' 규칙을 삭제했다. 10-31까지는 1.3이었다).
// 공격 모션 길이는 baked 시트(reference-sheets/enemies-80/atlas.json)의 공격 칸 수 × attackStep 이다.
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const db=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80-stats.json'),'utf8'));
const atlas=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80/atlas.json'),'utf8'));
const MULT=1,S=.034,SPEED=.5367,r1=v=>Math.round(v*100)/100,sec=f=>+(f/30).toFixed(4);
// [DB번호, 키, 한글 이름, 속성, 구간/능력(원작 수치 그대로)]
const SPEC=[
 ['408','truebunbun','신 레전드 맴매',{traits:['ancient'],area:true,zone:[0,300],back:300,curse:[1,300]}],
 ['409','ancientdog','고대 멍뭉이',{traits:['ancient'],area:true,curse:[.35,100]}],
 ['414','inglis','잉글릭스',{traits:['ancient'],curse:[1,150]}],
 ['415','koraino','고대 보어',{traits:['ancient'],area:true,curse:[1,300]}],
 ['416','supermayor','난나나난이장',{traits:['floating','ancient'],area:true,zone:[0,440],back:440,curse:[1,60]}],
 ['422','datemegane','선글래숭이',{traits:['ancient'],area:true,zone:[500,800],curse:[1,150]}],
 ['425','kogaou','미남왕',{traits:['floating','ancient'],area:true,curse:[1,300]}],
 ['426','oldree','올드 타조',{traits:['ancient'],area:true,curse:[1,150],blow:1,slow:[1,150]}],
 ['445','ministercyclone','미니스타 사이클론',{traits:['alien'],starred:true,area:true,warp:{chance:1,dist:-150,frames:100}}],
 ['446','gardeneels','붕장어 5형제',{traits:['alien'],starred:true,area:true,zone:[1700,1950],warp:{chance:1,dist:-1375,frames:1}}],
 ['447','looper','루퍼좀씨',{traits:['alien'],starred:true,area:true,wave:{level:10,reach:2267.5},barrier:10000}],
 ['448','finalgod','파이널 기가 그랜드 신',{traits:[],area:true,hits:[[90,3999],[120,3999],[150,65999]],first:{wave:{level:12,reach:2667.5},warp:{chance:1,dist:1500,frames:90}}}],
 ['452','dogumaru','토우전사 도그마루',{traits:['ancient'],area:true,zone:[0,700],back:500,curse:[1,600]}]
];
const out={};
for(const [id,key,name,sp] of SPEC){
 const d=db[id],a=atlas[key],animF=a.attack.length*a.attackStep,dur=Math.min(d.interval,animF);
 const u={hp:Math.round(d.hp*MULT),atk:Math.round(d.atk*MULT),knockbacks:d.kb,interval:sec(d.interval),speed:r1(d.speed*SPEED),range:r1(d.range*S),windup:sec(d.windup),attackDuration:sec(dur),reward:d.money};
 if(sp.traits.length===1)u.trait=sp.traits[0];else if(sp.traits.length>1)u.traits=sp.traits;
 if(sp.starred)u.starred=true;
 if(sp.area)u.area=true;
 if(sp.zone){u.zoneMin=r1(sp.zone[0]*S);u.zoneMax=r1(sp.zone[1]*S);
  // 사거리(449)가 타격 구간 시작(500)보다 짧은 원작 선글래숭이는 엔진이 맨 앞 목표가 사거리 안이면 공격을 시작하고 구간 안만 맞히도록 고쳐져(55886c4) 따로 손볼 것이 없다.
 }
 if(sp.back)u.backRange=r1(sp.back*S);
 if(sp.curse){u.curseChance=sp.curse[0];u.curseDuration=sec(sp.curse[1])}
 if(sp.blow){u.blowChance=1;u.blowDistance=14}
 if(sp.slow){u.slowChance=sp.slow[0];u.slowDuration=sec(sp.slow[1])}
 if(sp.warp)u.warp={chance:sp.warp.chance,distance:r1(sp.warp.dist*S),duration:sec(sp.warp.frames)};
 if(sp.wave)u.wave={chance:1,level:sp.wave.level,reach:r1(sp.wave.reach*S)};
 if(sp.barrier)u.barrier=sp.barrier;
 if(sp.hits){const tot=sp.hits.reduce((s,h)=>s+h[1],0);u.atk=Math.round(tot*MULT);u.hits=sp.hits.map(([f,dmg],i)=>({at:sec(f),share:Math.round(dmg/tot*100000)/100000}));
  u.hits[0].abilities={wave:{chance:1,level:sp.first.wave.level,reach:r1(sp.first.wave.reach*S)},warp:{chance:1,distance:r1(sp.first.warp.dist*S),duration:sec(sp.first.warp.frames)}}}
 out[key]={db:id,name,original:{hp:d.hp,atk:d.atk,interval:d.interval,speed:d.speed,range:d.range,windup:d.windup,animFrames:animF},game:u};
}
fs.writeFileSync(path.join(root,'reference-sheets/enemies-80-game.json'),JSON.stringify(out,null,1));
for(const [k,v] of Object.entries(out)){const g=v.game;console.log(v.db,k.padEnd(16),v.name.padEnd(12),'hp',String(g.hp).padStart(8),'atk',String(g.atk).padStart(6),'kb',g.knockbacks,'int',g.interval,'spd',g.speed,'rng',g.range,'wu',g.windup,'dur',g.attackDuration)}
