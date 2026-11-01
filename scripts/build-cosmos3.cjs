// 우주편 3장(宇宙編 第3章, s03008) 게임용 스테이지·출현표 데이터를 만든다 → cosmos3-data.js (등록은 cosmos3.js).
// 입력: reference-sheets/cosmos-3/stages.json (scripts/fetch-80.cjs). 규칙은 우주편 2장 빌더와 같다:
// 30fps 프레임 → 초(소수 둘째 자리), 성 연동 100%는 at:{t}, 그 밖은 at:{hp:%}+firstDelay, 023 간판 아가씨(900초 제한 적)는 뺀다.
// 난이도(사용자 10-30): 새 스테이지는 원작보다 체력·공격 ×1.3. 8.0 신규 적 13종은 능력치에 이미 ×1.3이 들어 있으므로
// 그 적의 출현 규칙은 원작 배율 그대로 두고, 기존 적의 규칙만 mag ×1.3 한다(이중 적용 금지).
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'reference-sheets/cosmos-3');
const stages=JSON.parse(fs.readFileSync(path.join(dir,'stages.json'),'utf8'));
const mk=require('./full-harness.cjs');
mk({extraSetup:`globalThis.__d={COSMOS_STAGES,UNIT_NAMES,data}`});const D=globalThis.__d;delete globalThis.__d;
const NEW80={'408':'truebunbun','409':'ancientdog','414':'inglis','415':'koraino','416':'supermayor','422':'datemegane','425':'kogaou','426':'oldree','445':'ministercyclone','446':'gardeneels','447':'looper','448':'finalgod','452':'dogumaru'};
const NEW80_KEYS=new Set(Object.values(NEW80));
// DB 번호 → 게임 적 키: 레전드 공용 자동 지도 + 41~49장 빌더의 보정 + 우주편 2장 신규 4종 + 8.0 신규 13종
const auto=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/legend-db/enemy-map-auto.json'),'utf8'));
const map=Object.fromEntries(auto.filter(x=>x.game).map(x=>[x.db,x.game]));
const legendSrc=fs.readFileSync(path.join(__dirname,'build-legend-41-49.cjs'),'utf8');
for(const [,db,id] of legendSrc.split('Object.assign(map,')[1].split('});')[0].matchAll(/'(\d{3})':'(\w+)'/g))map[db]=id;
// 지도에 없던 기존 적: 체력·공격 일치로 맞춘 표(reference-sheets/enemies-80.json result[].game, 예: 429 クマンケン → cadaverbear)
for(const r of JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80.json'),'utf8')).result)if(r.game&&!map[String(r.db).padStart(3,'0')])map[String(r.db).padStart(3,'0')]=r.game;
Object.assign(map,{'390':'ultrabaabaa','419':'kidtappa','420':'ribbo','421':'kamisamaserious'},NEW80);
const sec=f=>Math.round(f/30*100)/100;
const pct=s=>parseInt(String(s).replace(/[^\d]/g,''),10);
function rule(row){// DB 표 한 줄: [BOSS, '', 이름#번호, 배율, 출현수, 성연동, 첫등장F, 재등장F]
 const db=(row[2].split('#')[1])||'';
 if(db==='023')return null;
 const type=map[db];if(!type)throw Error('매핑 없음 '+row[2]);
 const link=pct(row[5]),first=Number(row[6]);
 const srcMag=pct(row[3]),mag=NEW80_KEYS.has(type)?srcMag:Math.round(srcMag*1.3);
 const r={type,at:link===100?{t:sec(first)}:{hp:link},mag};
 if(link!==100&&first)r.firstDelay=sec(first);
 if(row[4]!=='無制限'&&row[4]!=='')r.count=Number(row[4]);
 if(row[7]&&row[7]!=='-'){const d=row[7].split('～').map(Number);r.delay=[sec(d[0]),sec(d[1]??d[0])]}
 if(row[0]==='BOSS')r.boss=true;
 if(r.mag===100)delete r.mag;
 return r;
}
const out=[];
for(const s of stages){
 const meta=D.COSMOS_STAGES[s.n-1];
 const rules=s.enemies.map(rule).filter(Boolean);
 const boss=rules.find(r=>r.boss),maxMag=Math.max(100,...rules.map(r=>r.mag||100));
 const desc=`${boss?'보스 '+(D.UNIT_NAMES[boss.type]||boss.type)+' · ':''}최대 ${maxMag.toLocaleString('en-US')}%`;
 out.push({n:s.n,name:meta.name,jp:s.name,flag:meta.flag,bg:meta.bg,hp:Math.round(s.castleHp),max:s.max,xp:s.xp,width:s.width,desc,source:'battlecats-db s03008-'+String(s.n).padStart(2,'0'),rules});
}
const known=new Set(Object.keys(D.data.units)),unknown=new Set();let total=0;
for(const s of out)for(const r of s.rules){total++;if(!known.has(r.type))unknown.add(r.type)}
const header='// 우주편 3장 데이터 (8.0). cosmos3.js가 스테이지 목록 맨 끝에 붙인다. 이 파일은 scripts/build-cosmos3.cjs가 만든다.\n'+
 '// 출처: battlecats-db 宇宙編 第3章 s03008-01~48. 기존 적의 출현 배율은 원작 ×1.3(새 스테이지 난이도), 8.0 신규 13종은 능력치에 이미 ×1.3.\n';
fs.writeFileSync(path.join(root,'cosmos3-data.js'),header+'const COSMOS3_DATA='+JSON.stringify(out,null,1)+';\n');
console.log('스테이지',out.length,'출현 규칙',total,'게임에 없는 적 id',[...unknown].join(', ')||'없음');
console.log('보스',out.filter(s=>s.rules.some(r=>r.boss)).length,'곳 ·',out[0].desc,'|',out[47].desc);
process.exit(0);
