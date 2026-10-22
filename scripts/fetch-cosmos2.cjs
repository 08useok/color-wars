// 우주편 2장(宇宙編 第2章, battlecats-db s03007) 48개 스테이지와 신규 적 4종 원본 페이지를 받아 reference-sheets/cosmos-2/ 에 보관하고 표를 JSON으로 뽑는다.
// 사용: node scripts/fetch-cosmos2.cjs   (이미 받은 파일은 건너뜀, 정리만 다시: REPARSE=1)
const fs=require('fs'),path=require('path'),https=require('https');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'reference-sheets/cosmos-2');fs.mkdirSync(dir,{recursive:true});
const get=u=>new Promise((res,rej)=>https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},r=>{let b=[];r.on('data',c=>b.push(c));r.on('end',()=>res({code:r.statusCode,body:Buffer.concat(b).toString('utf8')}))}).on('error',rej));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const rowsOf=h=>[...h.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(c=>{const id=(c[1].match(/enemy\/(\d+)\.html/)||[])[1];return c[1].replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim()+(id?'#'+id:'')}));
const num=s=>Number(String(s).replace(/[^\d.]/g,''));
function parse(h){
 const rows=rowsOf(h),title=(h.match(/<title>([^<]*)<\/title>/)||[])[1]||'';
 const find=k=>rows.find(r=>r.includes(k));
 const head=rows.find(r=>/詳細/.test(r.join('')))||[];
 const xp=find('獲得経験値')||[],hp=find('城体力')||[],max=find('出撃最大数')||[],width=find('ステージ幅')||[];
 const i0=rows.findIndex(r=>r.includes('敵キャラ'));
 const enemies=[];for(let i=i0+1;i<rows.length;i++){const r=rows[i];if(r.length<8||!/％/.test(r[3]||''))break;enemies.push(r)}
 const drops=[];const d0=rows.findIndex(r=>r.includes('ドロップ'));for(let i=d0+1;i<i0&&i>0;i++)if(rows[i].length>3&&rows[i].some(c=>/％/.test(c)))drops.push(rows[i]);
 return {title:title.replace('にゃんこ大戦争DB ステージデータ詳細 ',''),no:head[1],name:(head[2]||'').replace(' 詳細',''),energy:num(head[4]),xp:num(xp[1]),castleHp:num(hp[3]),width:num(width[1]),max:num(max[1]),drops,enemies};
}
(async()=>{
 const out=[];
 for(let n=1;n<=48;n++){
  const nn=String(n).padStart(2,'0'),f=path.join(dir,`stage-${nn}.html`);
  if(!fs.existsSync(f)||fs.statSync(f).size<10000){if(process.env.REPARSE)throw Error('missing '+nn);const r=await get(`https://battlecats-db.com/stage/s03007-${nn}.html`);if(r.code!==200)throw Error(nn+' http '+r.code);fs.writeFileSync(f,r.body);await sleep(400)}
  const p=parse(fs.readFileSync(f,'utf8'));out.push({n,...p});
  fs.writeFileSync(path.join(dir,`stage-${nn}.json`),JSON.stringify(p));
 }
 for(const id of ['390','419','420','421']){const f=path.join(dir,`enemy-${id}.html`);if(!fs.existsSync(f)){const r=await get(`https://battlecats-db.com/enemy/${id}.html`);if(r.code!==200)throw Error('enemy '+id+' '+r.code);fs.writeFileSync(f,r.body);await sleep(400)}}
 fs.writeFileSync(path.join(dir,'stages.json'),JSON.stringify(out,null,1));
 const names=new Map();out.forEach(s=>s.enemies.forEach(r=>{const k=r[2];names.set(k,(names.get(k)||0)+1)}));
 fs.writeFileSync(path.join(dir,'enemy-names.json'),JSON.stringify([...names].map(([k,c])=>({jp:k.split('#')[0],db:k.split('#')[1]||null,stages:c})).sort((a,b)=>Number(a.db)-Number(b.db)),null,1));
 console.log('stages',out.length,'enemy kinds',names.size);
 console.log('빈 스테이지(적 0):',out.filter(s=>!s.enemies.length).map(s=>s.n).join(',')||'없음');
 console.log('성 체력/XP 이상:',out.filter(s=>!s.castleHp||!s.xp).map(s=>s.n).join(',')||'없음');
})();
