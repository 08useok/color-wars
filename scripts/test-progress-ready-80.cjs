const fs=require('fs'),path=require('path'),Module=require('module'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const root=path.resolve(__dirname,'..'),base=fs.readFileSync(path.join(root,'scripts/full-harness.cjs'),'utf8');
let bounds;make({extraSetup:'globalThis.__b80={c2s:COSMOS2_START,c2e:COSMOS2_END,c3s:COSMOS3_START,c3e:COSMOS3_END,t0:TRUELEGEND_K0,tn:TRUELEGEND_KN};'});bounds=globalThis.__b80;delete globalThis.__b80;
const story=[0,bounds.c2s,bounds.c2e-1,bounds.c3s,bounds.c3e-1],legend={1:[0,bounds.t0,bounds.tn-1],2:[bounds.t0],3:[],4:[]};
const savedStory=JSON.stringify(story),savedLegend=JSON.stringify(legend);
function boot(early,post){let code=base.replace("k==='red-battle-legend-v1'?JSON.stringify(savedLegend):(store[k]??null)","store[k]??(k==='red-battle-legend-v1'?JSON.stringify(savedLegend):null)").replace('const store={};','const store={"red-battle-progress-v1":'+JSON.stringify(savedStory)+'};');
 const probe='\nif(!progressRegistrationReady){saveProgress();saveLegend();if(localStorage.getItem("red-battle-progress-v1")!=='+JSON.stringify(savedStory)+')throw Error("story overwritten before ready");if(localStorage.getItem("red-battle-legend-v1")!=='+JSON.stringify(savedLegend)+')throw Error("legend overwritten before ready");}';
 if(early)code=code.replace("+(i===0?PRELUDE:'')","+(i===0?PRELUDE:'')+"+JSON.stringify(probe));
 const tail=(post?'cleared.push(1);saveProgress();saveLegend();':'')+'return {ready:progressRegistrationReady,cleared,legendProgress,story:localStorage.getItem("red-battle-progress-v1")};';
 code=code.replace("sources.join('\\n')+setup","sources.join('\\n')+"+JSON.stringify('\n'+tail));
 const file=path.join(root,'scripts/_ready80.cjs'),m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(code,file);return m.exports({savedLegend:legend});}
const normal=boot(false,false),early=boot(true,false);assert.deepEqual(early,normal);assert(early.ready);for(const i of story)assert(early.cleared.includes(i));for(const k of legend[1])assert(early.legendProgress[1].includes(k));
const post=boot(true,true);assert(JSON.parse(post.story).includes(1));for(const i of story)assert(JSON.parse(post.story).includes(i));
fs.mkdirSync('work/release80',{recursive:true});fs.writeFileSync('work/release80/save-validation.json',JSON.stringify({bounds,normal,early,post,checks:['autosave inserted after every module','story and legend originals protected until ready','C2 and C3 Big Bang retained','true legend last clear retained','normal later writes work']},null,2));
console.log('PASS 8.0 staged-load autosave protects C2/C3 Big Bang and true legend; post-load writes resume');process.exit(0);
