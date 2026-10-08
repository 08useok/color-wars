const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'..','game.js'),'utf8');
function fn(name){const start=source.indexOf(`function ${name}(`);for(let end=source.indexOf('\n',start);end>=0;end=source.indexOf('\n',end+1)){const code=source.slice(start,end);try{new vm.Script(code);return code}catch{}}throw Error(name)}
const c={NEW_ATLASES:{},data:{units:{}},RARE_STRIKE:{},GLOW_FLASH:new Set(),FACE_SHEET:'assets/face_sheet.png?v=2',target:()=>null,game:{ended:false},HITBACK_DISTANCE:5,HITBACK_DURATION:20/30};vm.createContext(c);
for(const name of ['face','bunbun','nyandam']){
 const def=source.match(new RegExp(`data\\.units\\.${name}=([^;]+);`))[0];vm.runInContext(def,c);
 const line=source.split('\n').find(l=>l.startsWith(name+':{scale:'));vm.runInContext(`NEW_ATLASES.${name}=`+line.slice(name.length+1).split('//')[0].replace(/,\s*$/,'')+';',c);
 vm.runInContext(source.match(new RegExp(`NEW_ATLASES\\.${name}\\.attackAtlas=[^\\n]+`))[0],c);
}
for(const name of ['animateAtlas','attack','startHitback'])vm.runInContext(fn(name),c);c.animateUnit=c.animateAtlas;
for(const [name,hit,total] of [['face',34,44],['bunbun',20,31],['nyandam',104,133]]){
 const stats=c.data.units[name],atlas=c.NEW_ATLASES[name],style={},u={type:name,stats,hp:1,kbTime:0,x:50,ally:false,animTime:0,hurtTime:0,el:{dataset:{},classList:{add(){}},querySelector:()=>({style})}};
 c.attack(u);assert.equal(u.pendingAttack.remaining,hit/30);assert.equal(u.attackTime,total/30);assert.equal(atlas.attackAtlas.attack.length,total);
 for(let frame=0;frame<total;frame++){
  u.attackTime=(total-frame)/30;c.animateAtlas(u);const expected=atlas.attackAtlas.attack[frame];assert.equal(style.backgroundPosition,`-${expected[0]}px -${expected[1]}px`,`${name} frame ${frame}`);assert.equal(style.backgroundImage,`url(${atlas.attackAtlas.sheet})`);
 }
 u.attackTime=0;c.animateAtlas(u);assert.equal(style.backgroundImage,`url(${atlas.sheet||c.FACE_SHEET})`);assert.equal(u.el.dataset.animation,'walk');
 c.attack(u);c.startHitback(u);assert.equal(u.pendingAttack,null);assert.equal(u.attackTime,0);assert.equal(u.el.dataset.animation,'hurt');
}
assert(!source.includes("face:{beam:'shout-beam'"));console.log('PASS: all 208 original attack frames, damage windups, walk sheet restoration, knockback cancellation, Face beam removed.');
