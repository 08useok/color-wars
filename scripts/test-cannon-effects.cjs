const assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const e=make({extraSetup:'globalThis.cannonFxQA={equip:equipCannon,fire:fireCannon,tick:updateCannon,charge:cannonChargeTime,ready:cannonReady,images:cannonEffectImageUrls};'}),h=globalThis.cannonFxQA;delete globalThis.cannonFxQA;
for(const kind of ['basic','thunder','slow','breaker','holy']){
 e.reset();const g=e.getGame();g.assetsLoading=false;h.equip(kind);g.running=true;g.tutorial=99;
 e.addUnit(kind==='holy'?'zoge':kind==='breaker'?'gregory':'dog');const v=g.units[g.units.length-1];v.emerging=false;v.x=60;v.hp=v.max=1e9;
 h.ready();assert(!h.fire());assert(!g.cannonVisuals?.length);g.cannonCharge=h.charge();assert(h.fire());assert(g.cannonVisuals.some(x=>x.kind===kind));
 if(kind==='breaker')assert(g.cannonVisuals.some(x=>x.kind==='breakerExtra'));
 const fx=g.cannonVisuals[0];g.paused=true;h.tick(.1);assert.equal(fx.time,0);g.paused=false;h.tick(.1);assert(fx.time>0);assert(fx.sprite.style.backgroundImage.includes('/cannon-effects/'));
 for(let i=0;i<90;i++)h.tick(1/30);assert.equal(g.cannonVisuals.length,0,'finished effects removed');
}
assert.equal(h.images('breaker').length,2);assert(h.images('breaker').some(u=>u.includes('breakerExtra')));
assert.deepEqual(h.images('thunder'),['assets/cannon-effects/thunder.webp?v=1']);
const g=e.getGame();g.cannonCharge=h.charge();assert(h.fire());assert(g.cannonVisuals.length);g.ended=true;assert(h.equip('basic'));assert.equal(g.cannonVisuals.length,0,'swapping removes old effects');
console.log('PASS five original cannon effects: spawn only on fire, matching sheet, pause, frame update, cleanup, selected preload URLs and swap cleanup');process.exit(0);
