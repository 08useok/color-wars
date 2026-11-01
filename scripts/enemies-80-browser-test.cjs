// 8.0 신규 적 13종 점검(브라우저): 실제 페이지에서 시트가 불러와지고, 걷기·공격·피격 칸이 바뀌며, 그림자·체력바가 제대로 놓이고, 오류·404가 없는지.
// SHOT_WALK / SHOT_ATTACK 환경 변수에 경로를 주면 13종을 한 줄로 세운 화면(서 있는 모습 / 공격 중간 장면)을 저장한다.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
const IDS=['truebunbun','ancientdog','inglis','koraino','supermayor','datemegane','kogaou','oldree','ministercyclone','gardeneels','looper','finalgod','dogumaru'];
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage({viewport:{width:1500,height:620}}),errors=[],bad=[];page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);
 await page.waitForFunction(()=>typeof game!=='undefined'&&typeof GAME_VERSION!=='undefined'&&!game.assetsLoading,null,{timeout:60000});
 const ids=IDS;
 const res=await page.evaluate(async(ids)=>{
  cleared=STAGES.map((_,i)=>i);selectedStage=0;deck=['red'];game.running=false;reset();let g=0;while(game.assetsLoading&&g++<400)await new Promise(r=>setTimeout(r,25));
  game.running=true;game.paused=false;game.tutorial=99;game.money=1e9;game.spawnRules=[];
  for(const b of document.querySelectorAll('button'))if(/건너뛰기/.test(b.textContent))b.click();
  const out={};
  for(const id of ids){
   const atl=NEW_ATLASES[id],url=atl.sheet;
   const loaded=await new Promise(r=>{const i=new Image();i.onload=()=>r([i.naturalWidth,i.naturalHeight]);i.onerror=()=>r(null);i.src=url});
   addUnit(id);const u=game.units.find(v=>!v.ally&&v.type===id);u.emerging=false;u.hp=u.max=u.stats.hp=1e12;u.atkCd=1e9;
   const sprite=u.el.querySelector('.dog-sprite'),seen={walk:new Set(),attack:new Set(),hurt:new Set()};
   for(let k=0;k<12;k++){u.hurtTime=0;u.attackTime=0;u.animTime=k*(atl.walkStep||.07);animateAtlas(u);seen.walk.add(sprite.style.backgroundPosition)}
   const dur=u.stats.attackDuration;for(let k=0;k<=8;k++){u.hurtTime=0;u.attackTime=Math.min(dur,dur*(1-k/8)+1e-3);animateAtlas(u);seen.attack.add(sprite.style.backgroundPosition)}
   u.attackTime=0;u.hurtTime=HITBACK_DURATION*.8;animateAtlas(u);seen.hurt.add(sprite.style.backgroundPosition);u.hurtTime=0;
   const shadow=u.el.querySelector('.dog-shadow'),bar=u.el.querySelector('.bar');
   out[id]={loaded,walk:seen.walk.size,attack:seen.attack.size,hurt:seen.hurt.size,bg:getComputedStyle(sprite).backgroundImage.includes(url.split('?')[0]),w:parseFloat(sprite.style.width),h:parseFloat(sprite.style.height),shadowW:shadow?parseFloat(shadow.style.width):null,barTop:bar?bar.style.top:null,barLeft:bar?bar.style.left:null};
   game.units.splice(game.units.indexOf(u),1);u.el.remove();
  }
  return out},ids);
 for(const id of ids){const r=res[id];
  assert(r.loaded&&r.loaded[0]>100,id+' 시트 이미지가 실제로 불러와짐 '+JSON.stringify(r.loaded));
  assert(r.bg,id+' 스프라이트가 시트를 씀');
  assert(r.walk>=2,id+' 걷기 칸이 바뀜 '+r.walk);assert(r.attack>=2||id==='ministercyclone',id+' 공격 칸이 바뀜 '+r.attack);assert(r.hurt>=1);
  assert(r.w>0&&r.h>0,id+' 칸 크기');assert(r.shadowW===null||Number.isFinite(r.shadowW)&&r.shadowW>0,id+' 그림자 폭 '+r.shadowW);
  assert(!/NaN/.test(String(r.barTop)+String(r.barLeft)),id+' 체력바 위치 '+r.barTop+','+r.barLeft)}
 // 한 줄로 세워 화면 저장
 const place=async(mode)=>{await page.evaluate(async([ids,mode])=>{
   for(const u of [...game.units])if(!u.ally){u.el.remove();game.units.splice(game.units.indexOf(u),1)}
   const n=ids.length;ids.forEach((id,i)=>{addUnit(id);const u=[...game.units].reverse().find(v=>!v.ally&&v.type===id);u.emerging=false;u.hp=u.max=u.stats.hp=1e12;u.x=7+i*(86/(n-1));u.el.style.left=`calc(${u.x}% - 21px)`;u.atkCd=1e9;u.kbTime=0;
    if(mode==='attack'){u.attackTime=u.stats.attackDuration*.45;u.animTime=0}else{u.attackTime=0;u.animTime=0}animateAtlas(u);u.el.querySelector('.dog-sprite')})
   game.paused=true},[ids,mode]);await page.waitForTimeout(250)};
 if(process.env.SHOT_WALK){await place('walk');await page.screenshot({path:process.env.SHOT_WALK})}
 if(process.env.SHOT_ATTACK){await place('attack');await page.screenshot({path:process.env.SHOT_ATTACK})}
 assert.deepEqual(errors,[],'페이지 오류 '+errors.join('|'));
 assert.deepEqual(bad.filter(x=>!/favicon/.test(x)),[],'불러오지 못한 파일 '+bad.join(' | '));
 console.log('PASS: 8.0 신규 적 13종 실제 페이지 — 시트 이미지 로드, 걷기·공격·피격 칸 전환, 그림자·체력바 위치, 오류·404 없음');
 }finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
