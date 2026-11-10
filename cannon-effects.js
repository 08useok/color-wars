// Original PONOS cannon effects only; combat, cannon bodies and charging are unchanged.
function cannonEffectImageUrls(kind=equippedCannon){
 const kinds=kind==='breaker'?['breaker','breakerExtra']:[kind];
 return kinds.map(id=>CANNON_EFFECT_ATLASES[id]?.sheet).filter(Boolean);
}
function clearCannonEffects(){
 for(const fx of game.cannonVisuals||[])fx.el.remove();
 game.cannonVisuals=[];
}
function placeCannonEffect(fx){
 const a=CANNON_EFFECT_ATLASES[fx.kind],f=a.frames[Math.min(a.frames.length-1,Math.floor(fx.time*a.fps))],s=a.scale;
 fx.el.style.left=fx.x+'%';
 Object.assign(fx.sprite.style,{width:f[2]*s+'px',height:f[3]*s+'px',left:f[4]*s+'px',bottom:f[5]*s+'px',backgroundImage:`url("${a.sheet}")`,backgroundSize:a.size[0]*s+'px '+a.size[1]*s+'px',backgroundPosition:-f[0]*s+'px '+(-f[1]*s)+'px'});
}
function spawnCannonEffect(kind,x,wave=null){
 const el=document.createElement('span'),sprite=document.createElement('i');el.className='cannon-original-fx';el.dataset.effect=kind;el.append(sprite);unitsEl.append(el);
 const fx={kind,x,wave,el,sprite,time:0};(game.cannonVisuals??=[]).push(fx);placeCannonEffect(fx);return fx;
}
{const before=fireCannon;fireCannon=function(){
 const kind=equippedCannon,targets=game.units.filter(v=>!v.ally&&v.hp>0&&!v.emerging&&
  (kind==='thunder'?!v.stats?.immune?.freeze:kind==='breaker'?v.stats?.barrier&&!v.barrierBroken:kind==='holy'?hasTrait(v.stats||data.units[v.type],'zombie'):true)).map(v=>v.x);
 const fired=before.apply(this,arguments);if(!fired)return fired;
 if(kind==='basic')spawnCannonEffect('basic',data.bases.ally.frontX,game.cannonWaves[game.cannonWaves.length-1]);
 else if(kind==='slow')spawnCannonEffect('slow',data.bases.ally.frontX);
 else{
  const positions=targets.length?targets:[data.bases.ally.frontX-20];
  for(const x of positions){spawnCannonEffect(kind,x);if(kind==='breaker')spawnCannonEffect('breakerExtra',x);}
 }
 return fired;
};}
{const before=updateCannon;updateCannon=function(dt){
 before.apply(this,arguments);if(game.paused||!game.running||game.ended)return;
 for(const fx of [...(game.cannonVisuals||[])]){
  fx.time+=dt;const a=CANNON_EFFECT_ATLASES[fx.kind];
  if(fx.time>=a.frames.length/a.fps){fx.el.remove();game.cannonVisuals.splice(game.cannonVisuals.indexOf(fx),1);continue;}
  if(fx.wave)fx.x=fx.wave.x;placeCannonEffect(fx);
 }
};}
{
 const style=document.createElement('style');style.textContent='.cannon-beam{visibility:hidden}.cannon-original-fx{position:absolute;bottom:15%;width:0;height:0;z-index:9;pointer-events:none}.cannon-original-fx>i{position:absolute;display:block;background-repeat:no-repeat;pointer-events:none}';document.head.append(style);
}
