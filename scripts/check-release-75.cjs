const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const html=fs.readFileSync('red-battle-doge.html','utf8'),scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
for(const s of scripts){assert(fs.existsSync(s),s);new Function(fs.readFileSync(s,'utf8'));}
assert.equal(new Set(scripts).size,scripts.length,'duplicate script');
for(const file of ['busters-75-allies.js','busters-75-gacha.js','busters-75-reviews.js','verdigris-third-form.js','verdigris-third-review.js','release-75-measured-reviews.js'])assert(scripts.includes(file));
assert(scripts.indexOf('busters-75-allies.js')<scripts.indexOf('uber-series.js'));assert(scripts.indexOf('busters-75-gacha.js')>scripts.indexOf('gacha-exchange.js'));assert(scripts.indexOf('verdigris-third-form.js')>scripts.indexOf('strike-hits.js'));
assert(fs.readFileSync('notice.js','utf8').includes("const GAME_VERSION='7.5.0'"));
for(const dir of ['heliotrope-motion','busters-remaining-motion','verdigris-3-motion-v2']){
 const meta=JSON.parse(fs.readFileSync('assets/'+dir+'/atlases.json'));
 for(const [id,a]of Object.entries(meta)){if(id.startsWith('lightrainbow'))continue;assert(fs.existsSync(a.sheet.split('?')[0]));for(const mode of ['idle','walk','attack','hurt'])assert(a[mode]?.length,id+mode);}
}
const grades=require('../docs/simulations/tier-arena-detailed-grades-2026-10-31.json'),results=require('../docs/simulations/release-75-tier-2026-10-31.json');assert.equal(grades.rows.length,275);assert.equal(results.raw.length,540);assert.equal(results.baselineChecks,54);assert(!results.raw.some(r=>r.error));
const browser=require('../docs/simulations/release-75-browser-2026-10-31.json');assert.equal(browser.battle.sprites.length,9);assert(browser.battle.reload);assert(browser.acquisition.allScriptsOK);assert(browser.acquisition.noLightRainbow);
console.log('PASS release 7.5.0 scripts, loading order, atlas paths, 275 tiers, 540 battles, 9 browser forms');
