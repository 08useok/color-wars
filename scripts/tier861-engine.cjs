const make=require('./full-harness.cjs');
const setup=`
for(const ev of READVENT_EVENTS)if(!cycloneClears.includes(ev.id))cycloneClears.push(ev.id);
const ancientTrial={id:'ancient',name:'고대종',index:STAGES.length,types:['ancientdog','inglis','fenrirurs'],mags:[300,150,100]};
TIER_ARENA_GROUPS.push(ancientTrial);STAGES.push({name:'티어 시험 · 고대종',tierArena:'ancient',chapter:'special',hp:3000000,maxEnemies:12,gap:4,wave:0});
STAGE_SPAWNS[ancientTrial.index]=ancientTrial.types.map((type,k)=>({type,mag:ancientTrial.mags[k],at:{t:[5,15,40][k]},count:[12,5,1][k],delay:[[5,5],[12,12],[40,40]][k]}));
selectedStage=TIER_ARENA_GROUPS[0].index;
const tier861Support={},tier861Original=unitStats;
for(const id of ['red','yellow','blue','purple']){const alias='bench'+id;tier861Support[alias]=JSON.parse(JSON.stringify(unitStats(id,30,2)));data.units[alias]={...data.units[id]};ALLIES.push(alias);GENERIC_CD_TYPES.push(alias);training.levels[alias]=30;}
unitStats=function(id,...args){return tier861Support[id]?JSON.parse(JSON.stringify(tier861Support[id])):tier861Original(id,...args);};
globalThis.__tier861={maps:TIER_ARENA_GROUPS.map(g=>({i:g.index,id:g.id,name:STAGES[g.index].name,rules:STAGE_SPAWNS[g.index]})),support:tier861Support,talents:talent81,spec:TALENT81_SPEC,stats:unitStats};
`;
module.exports=function(sourceRoot){const engine=make({sourceRoot,extraSetup:setup}),hooks=globalThis.__tier861;delete globalThis.__tier861;return{engine,hooks};};
