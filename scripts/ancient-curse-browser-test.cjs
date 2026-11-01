// 8.0 엔진 점검(브라우저): ancient-curse.js가 실제 페이지에서 오류 없이 불러와지고, 저주 걸린 아군에 상태 아이콘·표시가 뜨고 만료되면 사라지며, 앞으로 워프가 화면에서 동작하는지.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[],bad=[];page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);
 await page.waitForFunction(()=>typeof game!=='undefined'&&typeof GAME_VERSION!=='undefined'&&!game.assetsLoading,null,{timeout:60000});
 const r=await page.evaluate(async()=>{
  const out={};
  out.traits=[TRAIT_NAMES.ancient,TRAIT_TARGET.ancient];
  cleared=STAGES.map((_,i)=>i);selectedStage=0;deck=['black'];game.running=false;reset();let g=0;while(game.assetsLoading&&g++<400)await new Promise(r=>setTimeout(r,25));
  game.running=true;game.paused=false;game.tutorial=99;game.money=1e9;game.spawnRules=[];
  game[cooldownKey('black')]=0;addUnit('black');
  const a=game.units.find(u=>u.ally&&u.type==='black');a.emerging=false;a.x=60;a.hp=a.max=a.stats.hp=1e12;
  const foeType=Object.keys(data.units).find(id=>!ALLIES.includes(id)&&traitsOf(data.units[id]).includes('black'));
  const from={type:foeType,ally:false,stats:{atk:1,curseChance:1,curseDuration:1}};
  const base=a.el.querySelector('.status-badges'),icon0=base?.querySelector('.st-curse');
  damage(a,1,from);for(let i=0;i<3;i++)update(1/30);
  const icon=a.el.querySelector('.st-curse');
  game.paused=true;const rc=a.el.getBoundingClientRect();out.rect={x:rc.left,y:rc.top,w:rc.width,h:rc.height};
  out.onClass=a.el.classList.contains('cursed');out.iconExists=!!icon;out.iconDisplay=icon?getComputedStyle(icon).display:null;out.iconBefore=!!icon0;
  const bf=data.units[foeType];a.kbTime=0;game.paused=false;
  // 저주 중 초뎀 봉인(화면 상태와 같은 시점)
  const foe=(()=>{addUnit(foeType);return game.units.find(u=>!u.ally&&u.type===foeType)})();foe.emerging=false;foe.x=20;foe.hp=foe.max=1e12;
  const cursedHit=(()=>{foe.kbTime=0;const h=foe.hp;damage(foe,1000,a);return h-foe.hp})();
  for(let i=0;i<40;i++)update(1/30);// 1초 뒤 만료
  out.offClass=a.el.classList.contains('cursed');
  const freeHit=(()=>{foe.kbTime=0;const h=foe.hp;damage(foe,1000,a);return h-foe.hp})();
  out.cursedHit=cursedHit;out.freeHit=freeHit;
  // 앞으로 워프
  a.hp=a.max;a.kbTime=0;a.x=60;damage(a,1,{type:foeType,ally:false,stats:{atk:1,warpChance:1,warpDistance:-5.1,warpDuration:.2}});
  out.warpHidden=a.el.style.visibility==='hidden';out.warpEnd=a.warpEnd;
  for(let i=0;i<10;i++)update(1/30);
  out.warpBack=a.el.style.visibility!=='hidden'&&game.units.includes(a);out.x=a.x;
  return out});
 if(process.env.SHOT){const rc=r.rect;await page.evaluate(()=>{game.paused=true});await page.screenshot({path:process.env.SHOT})}
 assert.deepEqual(r.traits,['고대종','고대종']);
 assert(r.onClass&&r.iconExists,'저주 중 cursed 클래스·아이콘 '+JSON.stringify(r));
 assert(r.iconDisplay&&r.iconDisplay!=='none','아이콘이 보임(플렉스 안이라 block으로 계산됨) '+r.iconDisplay);
 assert(!r.offClass,'만료되면 cursed 클래스 제거');
 assert(r.freeHit>r.cursedHit*2.5,'저주 중 초뎀 봉인 → 풀리면 복구 '+[r.cursedHit,r.freeHit]);
 assert(r.warpHidden&&Math.abs(r.warpEnd-54.9)<.01,'앞으로 워프 시작 '+r.warpEnd);assert(r.warpBack&&r.x<57,'워프 뒤 다시 보임 '+r.x);
 assert.deepEqual(errors,[],'페이지 오류 '+errors.join('|'));
 assert.deepEqual(bad.filter(x=>!/favicon/.test(x)),[],'불러오지 못한 파일 '+bad.join(' | '));
 console.log('PASS: ancient-curse.js 실제 페이지 — 속성 이름, 저주 아이콘·클래스 표시·만료, 저주 중 초뎀 봉인과 복구, 앞으로 워프, 페이지 오류·404 없음');
 }finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
