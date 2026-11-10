const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'red-battle-doge.html'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
for(const file of scripts){assert(fs.existsSync(path.join(root,file)),file);new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});}
for(const file of ['cannon-loadout.js','cannon-effect-atlases.js','cannon-effects.js','zombie-original-atlases.js','zombie-original-motion.js'])assert(scripts.includes(file),file);
assert(scripts.indexOf('cannon-effects.js')<scripts.indexOf('asset-loader.js'));
assert(scripts.indexOf('zombie-original-motion.js')>scripts.indexOf('zombie-completion.js'));
assert(/GAME_VERSION='8\.4\.\d+'/.test(fs.readFileSync(path.join(root,'notice.js'),'utf8')));
console.log('PASS v8.4.x entry: '+scripts.length+' scripts exist/parse; effect preload and zombie replacement load order correct');
