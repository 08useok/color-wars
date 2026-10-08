// Retain decoded images, share in-flight requests and load only the current roster.
const BATTLE_IMAGES=new Map();
function loadBattleImage(url){
 if(BATTLE_IMAGES.has(url))return BATTLE_IMAGES.get(url);
 const promise=new Promise((resolve,reject)=>{
  const img=new Image(),timer=setTimeout(()=>{img.onload=img.onerror=null;reject(Error(url))},20000);
  img.onload=async()=>{try{if(img.decode)await img.decode();clearTimeout(timer);resolve(img)}catch(e){clearTimeout(timer);reject(e)}};
  img.onerror=()=>{clearTimeout(timer);reject(Error(url))};img.src=url;
 });
 BATTLE_IMAGES.set(url,promise);promise.catch(()=>{if(BATTLE_IMAGES.get(url)===promise)BATTLE_IMAGES.delete(url)});return promise;
}
function battleImageUrls(){
 const roster=new Set([...deck.filter(allyUnlocked),...stageEnemies(selectedStage),'red']),urls=new Set();
 for(const type of roster){
  const base=NEW_ATLASES[type];if(!base)continue;
  const stats=ALLIES.includes(type)?unitStats(type):null,atlas=stats?.trueForm&&base.true?base.true:stats?.evolved&&base.evolved?base.evolved:base;
  for(const url of [base.sheet,atlas.sheet,atlas.attackAtlas?.sheet])if(url)urls.add(url);
 }
 // Include CSS-backed legacy sprites, shadows, held items and shared effects.
 function readRules(rules){for(const rule of rules){
  if(rule.cssRules){readRules(rule.cssRules);continue}
  if(!rule.style)continue;
  const types=[...(rule.selectorText||'').matchAll(/\.([a-z][a-z0-9]*)\b/g)].map(m=>m[1]).filter(t=>data.units[t]);
  if(types.length&&!types.some(t=>roster.has(t)))continue;
  for(const m of rule.style.cssText.matchAll(/url\(["']?([^\s"')]+)["']?\)/g))urls.add(m[1]);
 }}
 for(const sheet of document.styleSheets){try{readRules(sheet.cssRules)}catch{}}
 return [...urls];
}
const IMAGE_LOADING=document.createElement('section');IMAGE_LOADING.className='overlay hidden';IMAGE_LOADING.setAttribute('role','status');IMAGE_LOADING.style.cssText='z-index:10010;align-items:center;justify-content:center';
const IMAGE_LOADING_PANEL=document.createElement('div');IMAGE_LOADING_PANEL.style.cssText='background:#172438;padding:24px;border-radius:16px;text-align:center';IMAGE_LOADING.append(IMAGE_LOADING_PANEL);$('#game').append(IMAGE_LOADING);
let battleImageLoadToken=0;
async function prepareBattleImages(){
 const token=++battleImageLoadToken,battle=game,urls=battleImageUrls();battle.assetsLoading=true;IMAGE_LOADING.classList.remove('hidden');let done=0,failed=0,next=0;
 const show=()=>{if(token===battleImageLoadToken)IMAGE_LOADING_PANEL.textContent=`전투 그림 준비 중… ${done} / ${urls.length}`};show();
 await Promise.all(Array.from({length:Math.min(6,urls.length)},async()=>{while(next<urls.length){const url=urls[next++];try{await loadBattleImage(url)}catch{failed++}done++;show()}}));
 if(token!==battleImageLoadToken||game!==battle)return;
 if(failed){IMAGE_LOADING_PANEL.textContent='그림을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.';const retry=document.createElement('button');retry.textContent='다시 준비';retry.onclick=prepareBattleImages;IMAGE_LOADING_PANEL.append(document.createElement('br'),retry);return}
 battle.assetsLoading=false;last=0;IMAGE_LOADING.classList.add('hidden');
}
const resetBeforeImages=reset;
reset=function(){resetBeforeImages();prepareBattleImages()};
$('#restartBtn').onclick=reset;
prepareBattleImages();
