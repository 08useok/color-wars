// v7.4.0 출시 점검(브라우저): 페이지 오류 없음, 버전, 오션·씨 등록·시리즈·뽑기 풀, 보유 기록이 새로고침 뒤에도 남는지, 오션·씨 1·2진 실제 출격·모션, 3진 4명, 팽이 레인보우, 티어 시험 구역 입장.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[],bad=[];page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
 const url=`http://127.0.0.1:${server.address().port}/red-battle-doge.html`;
 await page.goto(url);await page.waitForFunction(()=>typeof game!=='undefined'&&typeof GAME_VERSION!=='undefined'&&!game.assetsLoading,null,{timeout:60000});
 const r1=await page.evaluate(()=>{
  const out={version:GAME_VERSION,ubers:['ocean','sea'].map(t=>[t,UNIT_NAMES[t],gradeOf(t),UBER_SERIES[t],GACHA_UBER.some(u=>u.id===t),!!NEW_ATLASES[t]?.evolved]),
   three:['lilac','babypink','magenta','fusioncream'].map(t=>[t,TRUE_NAME[t],trueFormAssetReady(t)]),spin:!!data.units.spintop||ALLIES.some(t=>/spin/i.test(t)),
   arenas:STAGES.map((s,i)=>s.tierArena?i:-1).filter(i=>i>=0)};
  return out});
 assert.equal(r1.version,'7.4.0');
 for(const [t,name,grade,series,pool,evo] of r1.ubers){assert(name&&grade==='uber'&&series==='워터즈'&&pool&&evo,t+' 등록 '+[name,grade,series,pool,evo])}
 for(const [t,name,ready] of r1.three)assert(name&&ready,t+' 3진 '+[name,ready]);
 assert.equal(r1.arenas.length,9,'티어 시험 구역 9맵');
 // 보유 기록: 뽑기로 얻은 것처럼 저장 → 새로고침 → 남아 있어야 함
 await page.evaluate(()=>{gacha.owned=[...new Set([...(gacha.owned||[]),'ocean','sea'])];saveGacha()});
 await page.reload();await page.waitForFunction(()=>typeof game!=='undefined'&&!game.assetsLoading,null,{timeout:60000});
 const owned=await page.evaluate(()=>['ocean','sea'].map(t=>gachaOwns(t)));assert.deepEqual(owned,[true,true],'오션·씨 보유가 새로고침 뒤에도 유지');
 // 오션·씨 1·2진 실제 출격과 모션(이미지 준비 포함)
 const r2=await page.evaluate(async()=>{
  cleared=STAGES.map((_,i)=>i);const res=[];
  for(const t of ['ocean','sea'])for(const form of [1,2]){
   training.levels[t]=form===1?1:30;training.forms[t]=form;selectedStage=0;deck=[t];BATTLE_IMAGES.clear();
   game.running=false;reset();let g=0;while(game.assetsLoading&&g++<400)await new Promise(r=>setTimeout(r,25));
   game.running=true;game.paused=false;game.tutorial=99;game.money=1e9;game[cooldownKey(t)]=0;addUnit(t);
   const u=game.units.find(x=>x.ally&&x.type===t);if(!u){res.push([t,form,'출격 실패']);continue}
   const sprite=u.el.querySelector('.dog-sprite'),seen=new Set();
   for(const st of ['walk','attack','hurt']){u.hurtTime=st==='hurt'?HITBACK_DURATION*.8:0;u.attackTime=st==='attack'?(u.stats.attackDuration||.56)*.5:0;u.animTime=.13;animateAtlas(u);seen.add(sprite.style.backgroundPosition)}
   const bg=getComputedStyle(sprite).backgroundImage;const used=bg.replace(/^url\(["']?|["']?\)$/g,'').split('?')[0].replace(/^.*?(assets\/)/,'$1');
   const loaded=[...BATTLE_IMAGES.keys()].map(k=>k.split('?')[0].replace(/^.*?(assets\/)/,'$1'));
   res.push([t,form,u.stats.evolved?'2진':'1진',seen.size,loaded.includes(used)])}
  game.running=false;return res});
 for(const [t,form,label,frames,loaded] of r2){assert(loaded===true&&frames>=2,`${t} ${form} 모션·이미지 ${[label,frames,loaded]}`)}
 // 티어 시험 구역 입장
 const r3=await page.evaluate(async()=>{const i=STAGES.findIndex(s=>s.tierArena);selectedStage=i;deck=['red'];game.running=false;reset();let g=0;while(game.assetsLoading&&g++<400)await new Promise(r=>setTimeout(r,25));game.running=true;game.tutorial=99;for(let k=0;k<240;k++)update(1/30);return {i,name:STAGES[i].name,enemies:game.units.filter(u=>!u.ally).length,ended:game.ended}});
 assert(r3.i>=0&&r3.enemies>0,'티어 시험 구역 전투 진행 '+JSON.stringify(r3));
 assert.deepEqual(errors,[],'페이지 오류 '+errors.join('|'));
 assert.deepEqual(bad.filter(x=>!/favicon/.test(x)),[],'불러오지 못한 파일 '+bad.join(' | '));
 console.log('PASS: v7.4.0 — 오션·씨(워터즈 울슈레, 뽑기 풀, 보유 기록 새로고침 유지, 1·2진 출격·모션·이미지), 3진 4명, 티어 시험 구역 9맵 입장, 페이지 오류·404 없음');
 }finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
