const fs=require('fs'),make=require('./full-harness.cjs'),e=make();
const black=e.stageList.findIndex((_,i)=>i>143&&e.spawnList[i]?.some(r=>r.type==='twocan'));
const red=e.stageList.findIndex((_,i)=>i>143&&e.spawnList[i]?.some(r=>e.units[r.type]?.trait==='red'));
const maps=[...new Set([black,red,498])].filter(i=>i>=0&&e.stageList[i]);
const base=['red','yellow','garnet','lapis','selenite','topaz','ribbonorange','cornflower','rainbow'],rows=[];
for(const i of maps)for(const policy of ['auto','smart2'])for(const [label,extra,third]of [['base',[],[]],['crisp',['crisp'],[]],['lava2',['lava'],[]],['lava3',['lava'],['lava']]]){
 e.setProfile({trueForms:third});const r=e.simulate(i,1,[...base,...extra],1,180,policy);rows.push({i,name:e.stageList[i].name,policy,label,...r});
}
fs.writeFileSync('docs/simulations/release-6.9.0-smoke-2026-10-22.json',JSON.stringify(rows,null,2));console.log(rows.map(r=>`${r.name} ${r.policy} ${r.label}: ${r.win?'win':r.timeout?'timeout':'loss'} ${r.seconds}s`).join('\n'));process.exit(0);
