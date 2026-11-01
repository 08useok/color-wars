// Run real module initialization with isolated storage; no user save is read.
const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('node:assert/strict'),root=path.resolve(__dirname,'..');
const base=fs.readFileSync(path.join(root,'scripts/full-harness.cjs'),'utf8'),all=JSON.parse(base.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"')),addons=[...all.slice(0,all.indexOf('cosmos2.js')+1),'progress-ready.js'];
function boot(saved,early,post=false){
 let code=base.replace('const store={};','const store={"red-battle-progress-v1":'+JSON.stringify(saved)+'};');
 const injected=early?'\nconst earlyProgressBefore=localStorage.getItem("red-battle-progress-v1");saveAll();saveProgress();if(localStorage.getItem("red-battle-progress-v1")!==earlyProgressBefore)throw Error("early save overwrote progress");':'';
 code=code.replace("+(i===0?PRELUDE:'')","+(i===0?PRELUDE+"+JSON.stringify(injected)+":'')");
 const tail=(post?'cleared.push(1);saveProgress();':'')+'return {cleared,stored:localStorage.getItem("red-battle-progress-v1"),start:COSMOS2_START,end:COSMOS2_END,bigbang:cleared.includes(COSMOS2_END-1)};';
 code=code.replace("sources.join('\\n')+setup","sources.join('\\n')+"+JSON.stringify('\n'+tail));
 const file=path.join(root,'scripts/_cosmos_save_test.cjs'),m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(code,file);return m.exports({addons});
}
const initial=boot('[]',false),saved=[0,initial.start,initial.start+23,initial.end-1],json=JSON.stringify(saved);
const normal=boot(json,false),early=boot(json,true);assert.deepEqual(early,normal);assert(early.bigbang);assert.deepEqual(JSON.parse(early.stored),saved);
const post=boot(json,true,true);assert(post.bigbang);assert(JSON.parse(post.stored).includes(1));assert(JSON.parse(post.stored).includes(initial.end-1));
const reload=boot(post.stored,true);assert(reload.bigbang);assert.deepEqual([...reload.cleared].sort((a,b)=>a-b),[...post.cleared].sort((a,b)=>a-b));
const malformed=boot('{bad',true);assert.deepEqual(malformed.cleared,[]);assert.equal(malformed.stored,'{bad');
const invalid=boot(JSON.stringify([0,-1,'693',1e9,null,initial.end-1]),true);assert.deepEqual(invalid.cleared,[0,initial.end-1]);assert(invalid.bigbang);
fs.mkdirSync(path.join(root,'work/cosmos-save-fix'),{recursive:true});fs.writeFileSync(path.join(root,'work/cosmos-save-fix/validation.json'),JSON.stringify({normal,early,post,reload,checks:['no early overwrite','Big Bang and suppressor retained','post-load new clear saved','reload retained','malformed storage not overwritten early','invalid entries not granted']},null,2));
console.log('PASS cosmos2 progress: early autosave, normal boot, subsequent save, reload, malformed and invalid input');process.exit(0);
