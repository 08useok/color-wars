// 레전드 스토리 40장 전체(273 스테이지)의 원작(battlecats-db) 페이지를 받아 reference-sheets/legend-db/ 에 보관하고 표를 JSON으로 뽑는다.
// 사용: node scripts/fetch-legend-db.cjs   (이미 받은 파일은 건너뜀, 정리만 다시: REPARSE=1)
const fs=require('fs'),path=require('path'),https=require('https');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'reference-sheets/legend-db');fs.mkdirSync(dir,{recursive:true});
const LEN=[8,8,8,8,6,8,8,8,8,6,8,8,8,6,6,8,8,6,6,8,6,6,6,6,8,8,8,6,5,6,6,6,6,6,6,6,6,6,6,6];// 게임의 LEGEND_SUBS[n].len
const get=u=>new Promise((res,rej)=>https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},r=>{let b=[];r.on('data',c=>b.push(c));r.on('end',()=>res({code:r.statusCode,body:Buffer.concat(b).toString('utf8')}))}).on('error',rej));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const rowsOf=h=>[...h.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(c=>{const id=(c[1].match(/enemy\/(\d+)\.html/)||[])[1];return c[1].replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').trim()+(id?'#'+id:'')}));
const num=s=>Number(String(s).replace(/[^\d.]/g,''));
function parse(h){
 const rows=rowsOf(h),find=k=>rows.find(r=>r.includes(k));
 const head=rows.find(r=>/詳細/.test(r.join('')))||[],xp=find('獲得経験値')||[],hp=find('城体力')||[],max=find('出撃最大数')||[];
 const i0=rows.findIndex(r=>r.includes('敵キャラ'));
 const enemies=[];for(let i=i0+1;i<rows.length;i++){const r=rows[i];if(r.length<8||!/％/.test(r[3]||''))break;enemies.push(r)}
 const d0=rows.findIndex(r=>r.includes('ドロップ'));const drops=[];for(let i=d0+1;i<i0&&i>0;i++)if(rows[i].some(c=>/％/.test(c)))drops.push(rows[i].filter(Boolean));
 return {no:head[1],name:(head[2]||'').replace(' 詳細',''),xp:num(xp[1]),castleHp:num(hp[3]),max:num(max[1]),drops,enemies};
}
(async()=>{
 const out=[];
 for(let n=0;n<LEN.length;n++)for(let m=1;m<=LEN[n];m++){
  const tag=`${String(n).padStart(2,'0')}-${String(m).padStart(2,'0')}`,f=path.join(dir,`s000${String(n).padStart(2,'0')}-${String(m).padStart(2,'0')}.html`);
  if(!fs.existsSync(f)||fs.statSync(f).size<10000){if(process.env.REPARSE)throw Error('missing '+tag);const r=await get(`https://battlecats-db.com/stage/s000${String(n).padStart(2,'0')}-${String(m).padStart(2,'0')}.html`);if(r.code!==200)throw Error(tag+' http '+r.code);fs.writeFileSync(f,r.body);await sleep(350)}
  const p=parse(fs.readFileSync(f,'utf8'));out.push({sub:n,stage:m,...p});
 }
 fs.writeFileSync(path.join(dir,'legend-db.json'),JSON.stringify(out));
 const names=new Map();out.forEach(s=>s.enemies.forEach(r=>names.set(r[2].split('#')[1]||r[2],r[2].split('#')[0])));
 fs.writeFileSync(path.join(dir,'enemy-names.json'),JSON.stringify([...names].map(([db,jp])=>({db,jp}))));
 console.log('stages',out.length,'enemy kinds',names.size,'빈 표',out.filter(s=>!s.enemies.length).length);
})();
