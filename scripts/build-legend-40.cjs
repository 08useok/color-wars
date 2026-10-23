// Build from archived battlecats-db spawn tables, preserving their 30fps timing.
const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const ids={'ゴマさま':'seal','ゴマサーマン':'sael','ブチゴマさま':'zirzeal','破壊生物クオリネン':'clione','ツバメンズ':'brollow','イルカ娘':'dolphina','ブラックマ':'assassinbear','イカ天':'calamaria','カルピンチョ':'capy','ウサ銀':'rabbit','わんこ':'dog','にょろ':'snache','カバちゃん':'hippo','カ・ンガリュ':'kangaroo','スカルボクサー':'zangroo','ダディ':'daddy','はぐれたヤツ':'strayguy','わんこの城':'dogebase','ミスターエンジェル':'mrangel','ド鳩・サブ・レー':'pigeon','ちびぶんぶん':'lilbunbun'};
const names=['통통한 숨은 항구','로맨스 그레이 하이웨이','만취 마사지사','감옥의 사랑 늪','페로몬 문','천공 비보의 저택'];
const jp=['むっちり隠れ港','ロマンスグレーハイウェイ','泥酔マッサージャー','豚箱恋愛沼','フェロモン門','天空秘宝の館'];
const hp=[400000,666666,1000000,500000,750000,900000],max=[11,10,9,15,50,10],xp=[2660,2850,2660,2850,2945,3135];
const data=names.map((name,i)=>{
 const table=JSON.parse(fs.readFileSync(path.join(root,`reference-sheets/legend-40/stage-${i+1}.json`),'utf8'));
 const rules=table.filter(c=>c[5]?.endsWith('％')&&/^\d+$/.test(c[6])).flatMap(c=>{
  // Signboard Girl is an unimplemented 900-second timeout enemy, as in prior chapters.
  if(c[2]==='カンバン娘')return [];
  if(!ids[c[2]])throw Error('unknown enemy '+c[2]);
  const threshold=parseInt(c[5]),r={type:ids[c[2]],at:threshold===100?{t:Number(c[6])/30}:{hp:threshold},mag:parseInt(c[3])};
  if(threshold!==100&&Number(c[6]))r.firstDelay=Number(c[6])/30;
  if(c[4]!=='無制限')r.count=Number(c[4]);
  if(c[7]!=='-'){const d=c[7].split('～').map(Number);r.delay=[d[0]/30,(d[1]??d[0])/30];}
  if(c[0]==='BOSS')r.boss=true;return [r];
 });
 const drop={xp:xp[i]*25,xpChance:.1};if([0,3].includes(i))drop.nyan=.01;if(i===1)drop.speed=.01;
 return {stage:{name,jp:jp[i],flag:'🏝️',hp:hp[i],max:max[i],xp:xp[i],sky:'#b4dfe8',land:'#d3c28c',drop},rules};
});
const header=`// 6.9 draft: SoL 40 Windless Island. Korean titles are provisional translations.\n// Source: https://battlecats-db.com/stage/s00039.html and six stage detail pages.\nconst LEGEND40_DATA=`;
const code=header+JSON.stringify(data,null,2)+`;\n`+fs.readFileSync(path.join(root,'scripts/legend-40-registration.txt'),'utf8');
fs.writeFileSync(path.join(root,'legend-40.js'),code);console.log('Built six stages with '+data.reduce((n,d)=>n+d.rules.length,0)+' spawn rules.');
