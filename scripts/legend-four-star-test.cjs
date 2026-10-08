const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'..','game.js'),'utf8');
function fn(name){const start=source.indexOf(`function ${name}(`);for(let end=source.indexOf('\n',start);end>=0;end=source.indexOf('\n',end+1)){const code=source.slice(start,end);try{new vm.Script(code);return code}catch{}}throw Error(name)}
const grades={red:'basic',cream:'rare',plum:'sr',garnet:'ex',prism:'uber'};
const c={LEGEND_CROWN_MULT:[1,1.5,2,3],STAGES:[{legend:{k:0}},{chapter:1}],selectedStage:0,legendCrown:4,gradeOf:t=>grades[t],ALLIES:Object.keys(grades),game:{ended:false,running:true,paused:false,tutorial:6,units:[],money:1000,level:0},data:{units:Object.fromEntries(Object.keys(grades).map(t=>[t,{}])),bases:{ally:{x:100},enemy:{x:0}},income:[{cost:null}]},deck:Object.keys(grades),allyUnlocked:()=>true,allyDeployFull:()=>false,unitCooldown:()=>0,unitCost:()=>100,unitStats:()=>({hp:100,atk:10,cooldown:5}),cooldownKey:t=>t+'Cd',drawUnit:u=>{u.el={style:{}}},render(){},incomeRate:()=>0,walletMax:()=>1000};
vm.createContext(c);const start=source.indexOf('const LEGEND_SUB_CROWN=');vm.runInContext(source.slice(start,source.indexOf(';',start)+1),c);for(const name of ['legendCrownMult','legendFourStar','allyStageAllowed','comboAttackMultiplier','applyAllyComboStats','addUnit','autoDeploy'])vm.runInContext(fn(name),c);
for(let sub=0;sub<25;sub++)assert.equal(c.legendCrownMult(4,sub),c.legendCrownMult(3,sub));
for(const t of ['red','plum','prism']){c.addUnit(t);assert.equal(c.game.units.length,0);assert.equal(c.game.money,1000)}
c.autoDeploy();assert.deepEqual(c.game.units.map(u=>u.type),['cream','garnet']);assert.equal(c.game.money,800);
for(const crown of [1,2,3]){c.legendCrown=crown;for(const t of Object.keys(grades))assert(c.allyStageAllowed(t))}
c.legendCrown=4;c.selectedStage=1;for(const t of Object.keys(grades))assert(c.allyStageAllowed(t));
console.log('PASS: all 25 subchapters use star-3 magnification for star 4; manual and automatic deployment reject basic/SR/uber without spending money; EX/rare and other stages remain usable.');
