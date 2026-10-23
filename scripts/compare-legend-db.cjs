// 레전드 스토리 1~40장 전체를 원작(battlecats-db, scripts/fetch-legend-db.cjs로 받음)과 대조한다: 성 체력·출격 한도·XP·출현 규칙(적·배율·수·시각·간격·보스).
// 사용: node scripts/compare-legend-db.cjs  → docs/simulations/legend-compare-2026-10-23.json + 요약 출력
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const DB=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/legend-db/legend-db.json'),'utf8'));
const auto=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/legend-db/enemy-map-auto.json'),'utf8'));
const MAP={};for(const o of auto)if(o.game)MAP[o.db]=o.game;
Object.assign(MAP,{'014':'bear','041':'sloth','020':'face','035':'otta','025':'nyandam','026':'bunbun','055':'kurosawah','045':'hienergy','034':'ostrich','061':'metalseal','047':'wolfururun','056':'supermetalhippo','121':'sunfish','127':'sleipnir','151':'blackleboin','150':'lilnyandam','162':'hiyokoel','260':'redriding','187':'professor','312':'zcamelle','105':'ghostdog','107':'ghostbaa'});
const SKIP=new Set(['023']);// 표지판 아가씨(900초 제한 적)는 게임에서 구현하지 않는다
const mk=require('./full-harness.cjs');
const e=mk({extraSetup:`globalThis.__l={LS:LEGEND_SUBS,LST:LEGEND_STAGES,legendIdx,SP:STAGE_SPAWNS,data};`});
const L=globalThis.__l;
const r2=v=>Math.round(v*100)/100,pct=s=>parseInt(String(s).replace(/[^\d]/g,''),10);
function dbRule(r){const db=r[2].split('#')[1];if(SKIP.has(db))return null;const type=MAP[db];if(!type)return {unmapped:db+' '+r[2].split('#')[0]};
 const link=pct(r[5]),first=Number(r[6]);
 const at=link===100?'t'+r2(first/30):'hp'+link+(first?'+'+r2(first/30):'');
 const count=(r[4]==='無制限'||r[4]==='')?'∞':Number(r[4]);
 let delay='';if(r[7]&&r[7]!=='-'){const d=r[7].split('～').map(Number);delay=r2(d[0]/30)+'~'+r2((d[1]??d[0])/30)}
 return {key:[type,pct(r[3]),count,at,delay,r[0]==='BOSS'?'B':''].join('|'),type}}
function gameRule(x){const link=x.at.hp!==undefined?x.at.hp:100;const at=x.at.hp!==undefined?'hp'+x.at.hp+(x.firstDelay?'+'+r2(x.firstDelay):''):'t'+r2(x.at.t);
 const count=x.count===undefined?'∞':x.count;const delay=x.delay?r2(x.delay[0])+'~'+r2(x.delay[1]):'';
 return {key:[x.type,x.mag??100,count,at,delay,x.boss?'B':''].join('|'),type:x.type}}
const res=[];let k=0;
for(let n=0;n<L.LS.length;n++)for(let m=1;m<=L.LS[n].len;m++,k++){
 const d=DB.find(s=>s.sub===n&&s.stage===m),g=L.LST[k],rules=L.SP[L.legendIdx(k)]||[];
 const diff={sub:n+1,stage:m,k,name:g.name,en:g.en,jp:d.name};
 if(d.castleHp!==g.hp)diff.castle=[d.castleHp,g.hp];
 if(d.max!==g.max)diff.max=[d.max,g.max];
 if(d.xp!==g.xp)diff.xp=[d.xp,g.xp];
 const dr=d.enemies.map(dbRule).filter(Boolean),un=dr.filter(x=>x.unmapped).map(x=>x.unmapped),dk=dr.filter(x=>x.key).map(x=>x.key),gk=rules.map(gameRule).map(x=>x.key);
 const cnt=a=>{const m=new Map();a.forEach(x=>m.set(x,(m.get(x)||0)+1));return m};
 const dc=cnt(dk),gc=cnt(gk);const miss=[],extra=[];
 for(const [x,c] of dc)if((gc.get(x)||0)<c)miss.push(x+(c>1?' ×'+c:''));
 for(const [x,c] of gc)if((dc.get(x)||0)<c)extra.push(x+(c>1?' ×'+c:''));
 if(miss.length||extra.length)diff.rules={dbOnly:miss,gameOnly:extra};
 if(un.length)diff.unmapped=un;
 if(!d.enemies.length)diff.dbEmpty=true;
 res.push(diff);
}
fs.writeFileSync(path.join(root,'docs/simulations/legend-compare-2026-10-23.json'),JSON.stringify(res,null,1));
const bad=res.filter(x=>x.castle||x.max||x.xp||x.rules||x.unmapped||x.dbEmpty);
console.log('스테이지',res.length,'차이 있는 곳',bad.length);
console.log('성 체력 차이',res.filter(x=>x.castle).length,'· 출격 한도 차이',res.filter(x=>x.max).length,'· XP 차이',res.filter(x=>x.xp).length,'· 출현 규칙 차이',res.filter(x=>x.rules).length,'· 매핑 불가',res.filter(x=>x.unmapped).length,'· 원작 표 비어 있음',res.filter(x=>x.dbEmpty).length);
const bySub={};for(const x of bad)(bySub[x.sub]=bySub[x.sub]||[]).push(x.stage);
console.log('장별 차이 스테이지:',Object.entries(bySub).map(([s,a])=>s+'장:'+a.join(',')).join(' | '));
process.exit(0);
