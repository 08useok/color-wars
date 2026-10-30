// 8.0(우주편 3장 + 신레전드) 자료 확보: 원작 DB(battlecats-db) 페이지를 reference-sheets/ 에 보관하고 표를 JSON으로 뽑는다. 이미 받은 파일은 건너뛴다.
//   node scripts/fetch-80.cjs cosmos3        우주편 3장(s03008) 48맵 → reference-sheets/cosmos-3/
//   node scripts/fetch-80.cjs true-legend    신레전드(真レジェンド, s13000~) 49장·275맵 → reference-sheets/true-legend/
//   node scripts/fetch-80.cjs enemies        위 맵들에 나오는 적 중 번호 지도에 없는 적의 DB 페이지를 받아 게임 적과 능력치로 대조 → reference-sheets/enemies-80.json
// 우주편 2장·구레전드 41~49장과 같은 방식(fetch-cosmos2.cjs · fetch-legend-41-49.cjs)이다. 적 모션 그림 내려받기는 이 스크립트에 없다(적마다 사용자 승인 후 따로).
const fs=require('fs'),path=require('path'),https=require('https');
const root=path.resolve(__dirname,'..');
const get=u=>new Promise((res,rej)=>https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},r=>{let b=[];r.on('data',c=>b.push(c));r.on('end',()=>res({code:r.statusCode,body:Buffer.concat(b).toString('utf8')}))}).on('error',rej));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function page(u,f){if(fs.existsSync(f)&&fs.statSync(f).size>2000)return fs.readFileSync(f,'utf8');const r=await get(u);if(r.code!==200)throw Error(u+' http '+r.code);fs.writeFileSync(f,r.body);await sleep(110);return r.body}
const rowsOf=h=>[...h.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(c=>{const id=(c[1].match(/enemy\/(\d+)\.html/)||[])[1];return c[1].replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim()+(id?'#'+id:'')}));
const num=s=>Number(String(s).replace(/[^\d.]/g,''));
const text=h=>h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ');
function parseStage(h){// fetch-cosmos2.cjs와 같은 표 해석
 const rows=rowsOf(h),title=(h.match(/<title>([^<]*)<\/title>/)||[])[1]||'';
 const find=k=>rows.find(r=>r.includes(k));
 const head=rows.find(r=>/詳細/.test(r.join('')))||[];
 const xp=find('獲得経験値')||[],hp=find('城体力')||[],max=find('出撃最大数')||[],width=find('ステージ幅')||[];
 const i0=rows.findIndex(r=>r.includes('敵キャラ'));
 const enemies=[];for(let i=i0+1;i<rows.length;i++){const r=rows[i];if(r.length<8||!/％/.test(r[3]||''))break;enemies.push(r)}
 const drops=[];const d0=rows.findIndex(r=>r.includes('ドロップ'));for(let i=d0+1;i<i0&&i>0;i++)if(rows[i].length>3&&rows[i].some(c=>/％/.test(c)))drops.push(rows[i]);
 return {title:title.replace('にゃんこ大戦争DB ステージデータ詳細 ',''),no:head[1],name:(head[2]||'').replace(' 詳細',''),energy:num(head[4]),xp:num(xp[1]),castleHp:num(hp[3]),width:num(width[1]),max:num(max[1]),drops,enemies};
}
const mode=process.argv[2];
(async()=>{
 if(mode==='cosmos3'){
  const dir=path.join(root,'reference-sheets/cosmos-3');fs.mkdirSync(dir,{recursive:true});
  const out=[];
  for(let n=1;n<=48;n++){const nn=String(n).padStart(2,'0');const h=await page(`https://battlecats-db.com/stage/s03008-${nn}.html`,path.join(dir,`stage-${nn}.html`));const p=parseStage(h);out.push({n,...p});fs.writeFileSync(path.join(dir,`stage-${nn}.json`),JSON.stringify(p))}
  fs.writeFileSync(path.join(dir,'stages.json'),JSON.stringify(out));
  const bad=out.filter(s=>!s.enemies.length||!s.castleHp);
  console.log('우주편 3장',out.length,'맵 · 적 표가 비었거나 성 체력이 없는 맵',bad.map(s=>s.n).join(',')||'없음');
 }else if(mode==='true-legend'){
  const dir=path.join(root,'reference-sheets/true-legend');fs.mkdirSync(dir,{recursive:true});
  const idx=await page('https://battlecats-db.com/stage/index_true_legendstory.html',path.join(dir,'index.html'));
  const chap=[...new Set([...idx.matchAll(/href="(s13\d{3})\.html"/g)].map(m=>m[1]))];
  const out=[];let bad=[];
  for(const c of chap){
   const ch=await page(`https://battlecats-db.com/stage/${c}.html`,path.join(dir,`${c}.html`));
   const title=(ch.match(/<title>([^<]*)<\/title>/)||[])[1]||'';
   const links=[...new Set([...ch.matchAll(new RegExp(`href="(${c}-\\d+)\\.html"`,'g'))].map(m=>m[1]))];
   const stages=[];
   for(const l of links){const h=await page(`https://battlecats-db.com/stage/${l}.html`,path.join(dir,`${l}.html`));const p=parseStage(h);stages.push({id:l,...p});if(!p.enemies.length||!p.castleHp)bad.push(l)}
   out.push({chapter:c,title:title.replace('にゃんこ大戦争DB ',''),stages});
  }
  fs.writeFileSync(path.join(dir,'stages.json'),JSON.stringify(out));
  console.log('신레전드 장',out.length,'맵',out.reduce((a,c)=>a+c.stages.length,0),'· 적 표가 비었거나 성 체력이 없는 맵',bad.join(',')||'없음');
 }else if(mode==='enemies'){
  // 1) 두 묶음에 나오는 DB 적 번호와 장(처음 나온 곳)
  const used=new Map();// id → {jp, first, chapters:Set}
  const c3=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/cosmos-3/stages.json'),'utf8'));
  const tl=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/true-legend/stages.json'),'utf8'));
  const add=(row,where)=>{const [jp,id]=String(row[2]||'').split('#');if(!id)return;const k=id.padStart(3,'0');if(!used.has(k))used.set(k,{db:k,jp,where:new Set()});used.get(k).where.add(where)};
  c3.forEach(s=>s.enemies.forEach(r=>add(r,'우주편3-'+s.n)));
  tl.forEach((c,ci)=>c.stages.forEach(s=>s.enemies.forEach(r=>add(r,'신레전드'+ci+'장'))));
  // 2) 이미 번호가 확인된 적(지난 작업의 번호 지도)
  const known={};
  const walk=d=>{for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);if(f.isDirectory())walk(p);else if(f.name.endsWith('.json')){try{const j=JSON.parse(fs.readFileSync(p,'utf8'));if(Array.isArray(j))for(const o of j)if(o&&typeof o==='object'&&o.db&&(o.game||o.isNew))known[String(o.db).padStart(3,'0')]=o.game||o.isNew}catch{}}}};
  walk(path.join(root,'reference-sheets'));
  for(const id of ['357','377','381','389','407','390','419','420','421'])known[id]=known[id]||'(7.x에서 추가한 신규 적)';
  // 3) 번호 지도에 없는 적의 DB 페이지를 받아 능력치를 뽑는다
  const dir=path.join(root,'reference-sheets/enemies-80');fs.mkdirSync(dir,{recursive:true});
  const stats={};
  for(const [id,o] of used){
   if(known[id])continue;
   const h=await page(`https://battlecats-db.com/enemy/${id}.html`,path.join(dir,`enemy-${id}.html`));const t=text(h);
   const g=re=>{const m=t.match(re);return m?m[1]:null};
   stats[id]={db:id,jp:o.jp,hp:num(g(/体力\s*([\d,]+)/)||0),kb:num(g(/KB\s*(\d+)/)||0),atk:num(g(/攻撃力\s*([\d,]+)/)||0),interval:num(g(/攻撃頻度F\s*(\d+)/)||0),speed:num(g(/速度\s*(\d+)/)||0),range:num(g(/射程\s*(\d+)/)||0),money:num(g(/お金\s*([\d,]+)/)||0),traits:g(/特性\s*(.*?)\s*(?:解説|タグ)/),note:g(/解説\s*(.*?)\s*タグ/)?.slice(0,80),ver:g(/(Ver[\d.]+追加)/)};
  }
  // 4) 게임 적과 능력치(체력·공격력·넉백)로 대조
  const mk=require('./full-harness.cjs');
  const e=mk({extraSetup:'globalThis.__d={ALLIES,data,UNIT_NAMES};'});const D=globalThis.__d;delete globalThis.__d;
  const gameEnemies=Object.entries(D.data.units).filter(([id])=>!D.ALLIES.includes(id));
  const result=[];
  for(const [id,s] of Object.entries(stats)){
   const m=gameEnemies.filter(([gid,u])=>u.hp===s.hp&&u.atk===s.atk);
   const m2=m.length>1?m.filter(([gid,u])=>u.knockbacks===s.kb):m;
   const kind=m2.length===1?'hp+atk 일치':m2.length>1?'모호':m.length===1?'hp+atk 일치':'신규';
   result.push({...s,where:[...used.get(id).where].slice(0,3),game:m2.length===1?m2[0][0]:null,candidates:m2.length>1?m2.map(x=>x[0]):undefined,kind});
  }
  fs.writeFileSync(path.join(root,'reference-sheets/enemies-80.json'),JSON.stringify({known,result},null,1));
  const by=k=>result.filter(r=>r.kind===k);
  console.log('두 묶음에 나오는 적',used.size,'종 · 번호 지도에 있던 것',used.size-result.length,'· 새로 대조한 것',result.length);
  console.log('  능력치로 게임 적과 일치',by('hp+atk 일치').length,'· 모호',by('모호').length,'· **게임에 없는 신규**',by('신규').length);
  console.log('신규 적:');by('신규').forEach(r=>console.log('  ',r.db,r.jp.padEnd(14),'체력',r.hp,'공격',r.atk,'넉백',r.kb,'|',r.where[0],(r.where.length>1?'외 '+(r.where.length-1):''),'|',(r.traits||'').slice(0,40)));
  if(by('모호').length){console.log('모호한 적:');by('모호').forEach(r=>console.log('  ',r.db,r.jp,r.candidates.join(',')))}
 }else console.log('사용: node scripts/fetch-80.cjs cosmos3|true-legend|enemies');
})().catch(e=>{console.error(e);process.exitCode=1});
