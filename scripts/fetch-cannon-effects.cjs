// PONOS effect parts/rigs from the public BCU required asset bundle; no base/style art.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const dir=path.resolve(__dirname,'../reference-sheets/cannon-effects/raw');fs.mkdirSync(dir,{recursive:true});
(async()=>{const url='https://raw.githubusercontent.com/battlecatsultimate/bcu-assets/master/assets/000001.asset.bcuzip?cannon-effects=1';const response=await fetch(url);if(!response.ok)throw Error(response.status);const b=Buffer.from(await response.arrayBuffer());
 const decipher=crypto.createDecipheriv('aes-128-cbc',b.subarray(16,32),crypto.createHash('md5').update('battlecatsultimate').digest());decipher.setAutoPadding(false);const plain=decipher.update(b.subarray(36)),size=b.readUInt32LE(32),meta=JSON.parse(plain.subarray(0,size)),start=Math.ceil(size/16)*16;
 const files=meta.files.filter(f=>/\/castle\/001\/nyankoCastle_001_(00|01|03|05|06)_/.test(f.path));
 for(const f of files){const dec=crypto.createDecipheriv('aes-128-cbc',b.subarray(16,32),crypto.createHash('md5').update('battlecatsultimate').digest());dec.setAutoPadding(false);const from=36+start+f.offset,data=dec.update(b.subarray(from,from+Math.ceil(f.size/16)*16)).subarray(0,f.size);if(data.length!==f.size)throw Error('Truncated '+f.path);fs.writeFileSync(path.join(dir,path.basename(f.path)),data);}
 fs.writeFileSync(path.join(dir,'source.json'),JSON.stringify({url,files},null,2));console.log('Extracted',files.length,'effect files from',b.length,'bytes');
})().catch(e=>{console.error(e);process.exitCode=1;});
