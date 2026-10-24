// 전투 그림 준비(asset-loader.js)가 전투에서 실제로 쓰는 시트를 빠짐없이 받는지, 그리고 쓰지 않는 형태의 시트는 받지 않는지 확인한다.
// 아군 한 명씩 × 1진·2진·3진(그림이 있는 경우)마다: 이미지 캐시를 비우고 전투 그림을 준비 → 출격 → 스프라이트 배경·공격 그림·공격 애니메이션이 쓰는 시트가 모두 준비돼 있어야 한다.
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)});});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(`http://127.0.0.1:${server.address().port}/red-battle-doge.html`);await page.waitForFunction(()=>typeof game!=='undefined'&&!game.assetsLoading,null,{timeout:60000});
 const result=await page.evaluate(async()=>{
  const norm=u=>String(u).replace(/^url\(["']?|["']?\)$/g,'').split('?')[0].replace(/^.*?(assets\/)/,'$1');
  cleared=STAGES.map((_,i)=>i);allyUnlocked=()=>true;
  const rows=[];let combos=0,saved=0,missing=[];
  const types=ALLIES.filter(t=>NEW_ATLASES[t]&&NEW_ATLASES[t].sheet);
  for(const type of types){
   const a=NEW_ATLASES[type];
   const forms=[['1진',{level:1,form:1,tf:false}]];
   if(a.evolved)forms.push(['2진',{level:30,form:2,tf:false}]);
   if(a.true)forms.push(['3진',{level:30,form:2,tf:true}]);
   for(const [label,f] of forms){
    training.levels[type]=f.level;training.forms[type]=f.form;trueForms.length=0;if(f.tf)trueForms.push(type);
    selectedStage=0;deck=[type];BATTLE_IMAGES.clear();
    game.running=false;reset();let guard=0;while(game.assetsLoading&&guard++<400)await new Promise(r=>setTimeout(r,25));
    if(game.assetsLoading){missing.push(type+' '+label+' 준비가 끝나지 않음');continue}
    game.running=true;game.paused=false;game.tutorial=99;game.money=1e9;game[cooldownKey(type)]=0;addUnit(type);
    const u=game.units.find(x=>x.ally&&x.type===type);if(!u){missing.push(type+' '+label+' 출격 실패');continue}
    const used=new Set(),sprite=u.el.querySelector('.dog-sprite');
    const bg=sprite&&getComputedStyle(sprite).backgroundImage;if(bg&&bg!=='none')used.add(norm(bg));
    if(u.attackImage?.src)used.add(norm(u.attackImage.src));
    // 공격·피격·걷기 모션이 바꾸는 배경까지 본다
    for(const st of ['walk','attack','hurt']){u.hurtTime=st==='hurt'?HITBACK_DURATION*.8:0;u.attackTime=st==='attack'?(u.stats.attackDuration||.56)*.5:0;u.animTime=.13;try{animateAtlas(u)}catch(e){}const b2=sprite&&sprite.style.backgroundImage;if(b2)used.add(norm(b2))}
    const loaded=new Set([...BATTLE_IMAGES.keys()].map(norm));
    for(const s of used)if(!loaded.has(s))missing.push(type+' '+label+' → '+s);
    // 쓰지 않는 형태 시트가 받아져 있지 않은지(진화형·3진인데 1진 시트까지 받는 낭비)
    const wasteful=label!=='1진'&&a.sheet&&loaded.has(norm(a.sheet))&&!used.has(norm(a.sheet));
    if(wasteful)saved--;else if(label!=='1진')saved++;
    combos++;
    rows.push([type,label,used.size,wasteful?'낭비':'']);
   }
  }
  game.running=false;
  return {combos,types:types.length,missing,saved,waste:rows.filter(r=>r[3]).map(r=>r[0]+' '+r[1])};
 });
 assert.deepEqual(result.missing,[],'전투에서 쓰는데 준비되지 않은 시트: '+JSON.stringify(result.missing.slice(0,10)));
 assert.deepEqual(result.waste,[],'쓰지 않는 1진 시트를 받음: '+result.waste.join(', '));
 assert.deepEqual(errors,[],'페이지 오류 '+errors.join('|'));
 console.log(`PASS: 아군 ${result.types}명 × 형태 ${result.combos}가지 모두 전투에서 쓰는 시트가 준비됨 · 진화형·3진에서 쓰지 않는 1진 시트는 받지 않음`);
 }finally{await browser.close();server.close()}})().catch(e=>{console.error(e);server.close();process.exitCode=1});
