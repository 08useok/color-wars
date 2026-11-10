// Original image parts and animation rigs; IDs are battlecatsinfo IDs (DB minus 2).
const fs=require('fs'),path=require('path'),https=require('https');
const specs={zbore:428,zbrollow:527,zcamelle:310,zostrich:698,zdagshund:744,zthrillerz:469};
const dir=path.resolve(__dirname,'../reference-sheets/zombie-originals/raw');fs.mkdirSync(dir,{recursive:true});
function get(url){return new Promise((resolve,reject)=>https.get(url,r=>{if(r.statusCode!==200){r.resume();return reject(Error(url+' '+r.statusCode));}const a=[];r.on('data',x=>a.push(x));r.on('end',()=>resolve(Buffer.concat(a)));}).on('error',reject));}
(async()=>{for(const [name,id]of Object.entries(specs)){await Promise.all(['a','c.png'].map(async suffix=>{const file=path.join(dir,id+'-'+suffix);if(!fs.existsSync(file)){const b=await get(`https://battlecatsinfo.github.io/img/e/${id}/${suffix}`);if(suffix==='a')JSON.parse(b.toString());else if(b.subarray(1,4).toString()!=='PNG')throw Error('Not PNG');fs.writeFileSync(file,b);}}));console.log(name,id,'OK');}})().catch(e=>{console.error(e);process.exitCode=1;});
