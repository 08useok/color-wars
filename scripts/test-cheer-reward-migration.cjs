const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync(require.resolve('./full-harness.cjs'),'utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const folder='work/cheer-dandelion-motion';fs.mkdirSync(folder,{recursive:true});
for(const done of [false,true]){
 const path=folder+'/migration-fixture-'+done+'.js';
 fs.writeFileSync(path,"cycloneClears=['zombie'];gachaOwns=t=>gacha.owned.includes(t);"+(done?"localStorage.setItem('red-battle-cheer-reward-migration-v1','done');":''));
 const list=addons.flatMap(s=>s==='cheer-dandelion.js'?[path,s]:[s]);
 make({addons:list,extraSetup:"globalThis.__reward={owned:gacha.owned.filter(t=>t==='cheerdandelion').length,marker:localStorage.getItem('red-battle-cheer-reward-migration-v1')};"});
 assert.equal(globalThis.__reward.owned,done?0:1);assert.equal(globalThis.__reward.marker,'done');delete globalThis.__reward;
}
console.log('PASS: prior XP-only clear granted once; completed migration cannot convert later missed drops into ownership.');process.exit(0);
