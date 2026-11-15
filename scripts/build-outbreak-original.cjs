const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
const source=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/zombie-outbreak-original/sources.json'),'utf8'));
if(source.stages.length!==336)throw Error('Expected 7 x 48 stages');
const stages=source.stages.map(s=>{
 const chapterFactor=s.chapter===2?1.5:s.chapter===3?4:1;
 return {chapter:s.chapter,order:s.order,name:s.name,hp:s.hp,max:s.max,limit:s.limit,width:s.width,source:s.source,rules:s.rows.map(r=>{
  const type=source.enemyMap[r.enemy];if(!type)throw Error('Unknown enemy '+r.enemy);
  return {type,mag:r.mag/chapterFactor,at:r.hp===100?{t:r.first/30}:{hp:r.hp},...(r.hp!==100&&r.first?{firstDelay:r.first/30}:{}),...(r.count!==undefined?{count:r.count}:{}),...(r.delay?{delay:r.delay.map(f=>f/30)}:{}),...(r.boss?{boss:true}:{})};
 })};
});
fs.writeFileSync(path.join(root,'zombie-outbreak-original-data.js'),'// Original 336 outbreak schedules. EoC 2/3 multipliers normalize the engine chapter bonus.\n// Sources and raw 30 FPS frame values: reference-sheets/zombie-outbreak-original/sources.json\nconst ZOMBIE_OUTBREAK_ORIGINAL_DATA='+JSON.stringify(stages)+';\n');
console.log('Built',stages.length,'original outbreaks;',stages.reduce((n,s)=>n+s.rules.length,0),'rules');
