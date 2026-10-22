// 우주편 2장(宇宙編 第2章) 게임용 스테이지·출현표 데이터 초안을 만든다. 게임에는 연결하지 않는다(cosmos2-data.js는 html에서 불러오지 않음).
// 입력: reference-sheets/cosmos-2/{stages.json, stage-15.json, enemy-map.json}  (먼저 scripts/fetch-cosmos2.cjs)
// 시간은 30fps 프레임을 초로 바꾼다(소수 둘째 자리). 성 연동 100%는 at:{t}, 그 밖은 at:{hp:%}+firstDelay (우주편 1장·레전드 40장 빌더와 같은 규칙).
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'reference-sheets/cosmos-2');
const rd=f=>JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
const stages=rd('stages.json'),map=rd('enemy-map.json'),s15=rd('stage-15-wiki-rules.json');
const mk=require('./full-harness.cjs');
const e=mk({extraSetup:`globalThis.__d={COSMOS_STAGES,UNIT_NAMES,data}`});const D=globalThis.__d;delete globalThis.__d;
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
const NEW={'390':'ultrabaabaa','419':'kidtappa','420':'ribbo','421':'kamisamaserious'};// 신규 4종 임시 id (스탯 등록 때 확정)
const byDb={};for(const o of map)byDb[o.db]=o.isNew?NEW[o.db]:o.game;
const byEn={};for(const o of map)byEn[norm(o.en)]=byDb[o.db];
const sec=f=>Math.round(f/30*100)/100;
const pct=s=>parseInt(String(s).replace(/[^\d]/g,''),10);
const kor=id=>({ultrabaabaa:'울트라 메에메에',kidtappa:'마나부 군',ribbo:'게콕',kamisamaserious:'신님(진심)'}[id]||D.UNIT_NAMES[id]||id);
function rule(row){// DB 표 한 줄: [BOSS, '', 이름#번호, 배율, 출현수, 성연동, 첫등장F, 재등장F]
 const db=(row[2].split('#')[1])||'',jp=row[2].split('#')[0];
 if(db==='023')return null;// 표지판 아가씨: 900초 제한 적, 이전 장처럼 구현하지 않음
 const type=byDb[db];if(!type)throw Error('매핑 없음 '+row[2]);
 const link=pct(row[5]),first=Number(row[6]);
 const r={type,at:link===100?{t:sec(first)}:{hp:link},mag:pct(row[3])};
 if(link!==100&&first)r.firstDelay=sec(first);
 if(row[4]!=='無制限'&&row[4]!=='')r.count=Number(row[4]);
 if(row[7]&&row[7]!=='-'){const d=row[7].split('～').map(Number);r.delay=[sec(d[0]),sec(d[1]??d[0])]}
 if(row[0]==='BOSS')r.boss=true;
 if(r.mag===100)delete r.mag;
 return r;
}
function wikiRule(w){
 const type=byEn[norm(w.name)];if(!type)throw Error('위키 이름 매핑 없음 '+w.name);
 const r={type,at:{t:sec(w.firstF)}};const mag=pct(w.mag);if(mag!==100)r.mag=mag;
 if(w.count>1)r.count=w.count;
 if(w.delayF)r.delay=[sec(w.delayF[0]),sec(w.delayF[1]??w.delayF[0])];
 if(w.boss)r.boss=true;return r;
}
const out=[];
for(const s of stages){
 const meta=D.COSMOS_STAGES[s.n-1];
 let rules,hp=s.castleHp,max=s.max,xp=s.xp,width=s.width,source='battlecats-db s03007-'+String(s.n).padStart(2,'0');
 if(s.n===15){rules=s15.enemiesWiki.map(wikiRule);hp=s15.castleHp;max=s15.max;xp=s15.xp;width=s15.width;source='miraheze Egg Nebula (Cats of the Cosmos) Chapter 2'}
 else rules=s.enemies.map(rule).filter(Boolean);
 const boss=rules.find(r=>r.boss),maxMag=Math.max(100,...rules.map(r=>r.mag||100));
 const desc=`${boss?'보스 '+kor(boss.type)+' · ':''}최대 ${maxMag.toLocaleString('en-US')}%`;
 out.push({n:s.n,name:meta.name,jp:s.name,flag:meta.flag,bg:meta.bg,hp,max,xp,width,desc,source,rules});
}
// 검증
const known=new Set(Object.keys(D.data.units)),unknown=new Set();let total=0;
for(const s of out)for(const r of s.rules){total++;if(!known.has(r.type))unknown.add(r.type)}
const header=`// 우주편 2장 데이터 (v7.0.0). cosmos2.js가 스테이지 목록 맨 끝에 붙인다. 이 파일은 scripts/build-cosmos2.cjs가 만든다.\n// 출처: battlecats-db 宇宙編 第2章 s03007-01~48 (15번 알 성운은 miraheze 위키). 시간은 초(30fps 프레임÷30), 배율은 %.\n// 신규 적 4종(ultrabaabaa·kidtappa·ribbo·kamisamaserious)은 임시 id라 스탯 등록 때 확정한다.\n`;
fs.writeFileSync(path.join(root,'cosmos2-data.js'),header+'const COSMOS2_DATA='+JSON.stringify(out,null,1)+';\n');
console.log('스테이지',out.length,'출현 규칙',total,'게임에 없는 적 id',[...unknown].join(', ')||'없음');
console.log('보스 있는 스테이지',out.filter(s=>s.rules.some(r=>r.boss)).length,'· 최대 배율 10곳',out.map(s=>s.desc).slice(0,3).join(' | '));
process.exit(0);
