// 8.0 신규 적 13종의 원본 모션 데이터(원작 애니메이션 정보 'a'와 부품 시트 'c.png', 출처 battlecatsinfo.github.io)를 reference-sheets/enemies-80/raw/ 에 받는다. 이미 받은 파일은 건너뛴다.
// 사용: node scripts/fetch-80-motion.cjs   (적 DB 번호 − 2 = 모션 번호, 구레전드 41~49장과 같은 규칙)
const fs=require('fs'),path=require('path'),https=require('https');
const dir=path.resolve(__dirname,'..','reference-sheets/enemies-80/raw');fs.mkdirSync(dir,{recursive:true});
const IDS=[408,409,414,415,416,422,425,426,445,446,447,448,452];
const get=u=>new Promise((ok,no)=>https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},r=>{if(r.statusCode>=300&&r.statusCode<400){r.resume();get(new URL(r.headers.location,u).href.replace(/^http:/,'https:')).then(ok,no);return}if(r.statusCode!==200){r.resume();no(Error(u+' http '+r.statusCode));return}let b=[];r.on('data',x=>b.push(x));r.on('end',()=>ok(Buffer.concat(b)))}).on('error',no));
(async()=>{let total=0;
 for(const id of IDS){const n=id-2;
  for(const [u,f] of [[`https://battlecatsinfo.github.io/img/e/${n}/a`,`${n}-a`],[`https://battlecatsinfo.github.io/img/e/${n}/c.png`,`${n}-c.png`]]){
   const p=path.join(dir,f);if(!fs.existsSync(p)||fs.statSync(p).size<100){const b=await get(u);fs.writeFileSync(p,b);await new Promise(r=>setTimeout(r,120))}
   total+=fs.statSync(p).size}
  console.log(id,'→',n,'a',fs.statSync(path.join(dir,`${n}-a`)).size,'B · c.png',fs.statSync(path.join(dir,`${n}-c.png`)).size,'B')}
 console.log('합계',(total/1024).toFixed(0),'KB, 파일',IDS.length*2,'개');
})().catch(e=>{console.error(e);process.exitCode=1});
