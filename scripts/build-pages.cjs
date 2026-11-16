// Publish committed runtime files only; local drafts and unrelated dirty files never enter the bundle.
const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto'),vm=require('vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.resolve(root,process.argv[2]||'_site');
assert(out.startsWith(root+path.sep)&&out!==root,'Output must stay inside the project');
assert(!fs.existsSync(out),'Use a new output directory');
const git=args=>cp.execFileSync('git',args,{cwd:root,maxBuffer:32*1024*1024});
const commit=git(['rev-parse','HEAD']).toString().trim();
const tree=git(['ls-tree','-r','-z','HEAD']).toString().split('\0').filter(Boolean).map(line=>{const [meta,file]=line.split('\t');const [mode,type,sha]=meta.split(' ');return {file,mode,type,sha};});
const entries=tree.filter(x=>x.file.startsWith('assets/')||(!x.file.includes('/')&&(/\.(?:js|css|png|webp|jpg|jpeg|gif|svg|ico|woff2?|ttf|mp3|ogg|wav)$/i.test(x.file)||['index.html','red-battle-doge.html','CNAME'].includes(x.file))));
fs.mkdirSync(out,{recursive:true});let bytes=0;
for(const entry of entries){
 assert(entry.type==='blob'&&['100644','100755'].includes(entry.mode),'Unsupported file '+entry.file);
 const src=path.join(root,entry.file),dst=path.join(out,entry.file);let data=fs.existsSync(src)?fs.readFileSync(src):null;
 const blobHash=b=>crypto.createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex');
 if(!data||blobHash(data)!==entry.sha)data=git(['show',commit+':'+entry.file]);
 fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,data);bytes+=data.length;
}
const html=fs.readFileSync(path.join(out,'red-battle-doge.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
 const url=match[1];if(/^(?:https?:|data:|mailto:)/.test(url))continue;
 const file=url.split(/[?#]/)[0];if(file)assert(fs.existsSync(path.join(out,file)),'Missing entry resource '+file);
}
for(const m of html.matchAll(/<script\s+src="([^"]+)"/g)){const file=m[1].split('?')[0];new vm.Script(fs.readFileSync(path.join(out,file),'utf8'),{filename:file});}
const version=fs.readFileSync(path.join(out,'notice.js'),'utf8').match(/GAME_VERSION='([^']+)'/)[1];
// Check release assets before uploading: an HTML-valid bundle can still omit dynamic images.
const {publishedResources}=require('./deployment-resources.cjs');
for(const file of publishedResources(version))assert(fs.existsSync(path.join(out,file)),'Missing release resource '+file);
if(publishedResources(version).includes('saffron-86.js')){
 const metaFile=path.join(out,'assets/saffron-parts/parts.json');assert(fs.existsSync(metaFile),'Missing Saffron parts manifest');const meta=JSON.parse(fs.readFileSync(metaFile,'utf8')),parts=Object.values(meta.forms).flatMap(form=>Object.values(form));assert.equal(parts.length,32,'Missing Saffron part definitions');
 for(const part of parts){assert(/^[12]\/[a-z-]+\.png$/.test(part.file),'Invalid Saffron part path');assert(fs.existsSync(path.join(out,'assets/saffron-parts',part.file)),'Missing Saffron part '+part.file);}
}
const manifest={commit,version,files:entries.length,bytes};
fs.writeFileSync(path.join(out,'.nojekyll'),'');fs.writeFileSync(path.join(out,'_deployment.json'),JSON.stringify(manifest,null,2));
console.log(JSON.stringify({...manifest,mebibytes:+(bytes/1048576).toFixed(2),output:path.relative(root,out)},null,2));
