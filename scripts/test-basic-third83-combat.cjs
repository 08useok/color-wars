const assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const ids=['red','green','blue','orange','yellow','purple','pink','cyan'];
const e=make({extraSetup:'globalThis.__b83c={fire,launchBoomerang,setRand:f=>Math.random=f,sel:i=>selectedStage=i,idx:CLIONEL_EVENT.index};'}),h=globalThis.__b83c;delete globalThis.__b83c;
e.setProfile({level:30,trueForms:ids});h.sel(h.idx);
function arena(id,list){
 e.reset();const g=e.getGame();g.running=true;g.paused=false;g.tutorial=99;g.money=1e9;g.spawnRules=[];e.addUnit(id);
 const u=g.units.find(v=>v.type===id);u.x=70;u.emerging=false;u.hp=u.max=1e9;u.stats.knockbacks=1;u.stats.speed=0;u.atkCd=999;
 const foes=list.map(([type,x])=>{e.addUnit(type);const v=g.units.at(-1);v.x=x;v.emerging=false;v.hp=v.max=1e9;v.stats={...v.stats,atk:0,speed:0,knockbacks:1};return v;});return {g,u,foes};
}
h.setRand(()=>0);
{const {g,u,foes:[red,black]}=arena('purple',[['pigge',68],['darkdog',67]]);h.fire(u,red);assert(red.cursedUntil>g.elapsed&&red.atkDownUntil>g.elapsed);assert(!(black.cursedUntil>g.elapsed)&&!(black.atkDownUntil>g.elapsed));}
{const {g,u,foes:[red]}=arena('pink',[['pigge',68]]);h.fire(u,red);assert(red.freezeUntil>g.elapsed&&red.slowUntil>g.elapsed);}
{const {g,u,foes:[floating,red]}=arena('cyan',[['owlbrow',68],['pigge',67]]);h.fire(u,floating);assert(floating.freezeUntil>g.elapsed);assert(!(red.freezeUntil>g.elapsed));}
{const {g,u,foes:[boss]}=arena('yellow',[['clionel',68]]);boss.stats.slowChance=1;boss.stats.slowDuration=4;g.inWave=true;const hp=u.hp;e.damage(u,100,boss);assert.equal(u.hp,hp);g.inWave=false;e.damage(u,100,boss);assert(u.hp<hp&&!(u.slowUntil>g.elapsed));}
{const {g,u,foes:[red]}=arena('blue',[['pigge',68]]);red.stats.atkDownChance=1;red.stats.atkDownPct=.5;red.stats.atkDownDuration=5;e.damage(u,1,red);assert(!(u.atkDownUntil>g.elapsed));u.hp=20;e.damage(u,100,red);assert.equal(u.hp,1);e.damage(u,100,red);assert(!g.units.includes(u),'survive is one-use');}
{const {u,foes:[red]}=arena('green',[['pigge',68]]);e.damage(red,1,u);assert(red.kbTime>0&&red.kbKind==='push');}
h.setRand(()=>.999);
{const {u,foes}=arena('green',[['pigge',68],['darkdog',67]]);h.launchBoomerang(u);for(let f=0;f<38;f++)e.update(1/30);assert(foes.every(v=>v.hp<1e9),'both enemies hit by boomerang');}
console.log('PASS basic third83 combat: red-only weaken/curse, pink slow/freeze, floating-only cyan freeze, yellow wave/slow immunity, blue weaken immunity/one-use survival, green push and multi-target boomerang');process.exit(0);
