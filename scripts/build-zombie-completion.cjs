const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const ids={'天使ガブリエル':'gabriel','エイリワン':'shibalien','殺意のわんこ':'darkdog','カーバチャン':'hyppoh','メタルカバちゃん':'metalhippo','カバタリアン':'zomboe','ゾンビワン':'zoge','ゴリ・ンジュ':'zory','天使カバちゃん':'heavenlyhippoe','ジャッキー・ペンZ':'zackiepeng','スカルボクサー':'zangroo','ワニボン':'zroco','クマンケン':'cadaverbear','シノシシ':'zbore','墓手太郎':'gravey','サイバーX':'cyberx','メェメェ':'baa','ブラッゴリ':'gorydark','カヲルさん':'phace','プドール夫人':'madampoodle','スリラーズ':'zthrillerz','ハサミーマン':'scissorman','チキランラン':'zuche','墓手花子':'misshaka','エリザベス56世':'liz56','パオン':'leboin','にょろろん':'nyororon','レディ・ガ':'maawth','例のヤツ':'guys','メタルわんこ':'metaldoge','トンシー':'zigge','天使ゴンザレス':'gonzales','ブラッコ':'blackotta','ミニアンデッドサイクロン':'lilzyclone','ワーニック':'kroxo','トロリンチョ':'zapy','ガガガガ':'mooth','リッスントゥミー':'squirrel','クマンチュー':'ursamajor','スター・ペン':'starpeng','エリートエイリワン':'shibalienelite','ブチゴマさま':'zirzeal','シャドウボクサー':'shadowboxer','グレゴリー将軍':'gregory','ハハパオン':'mamaleboin','キャプテン・モグー':'captainmogu','一角くん':'rhino','ウサ銀':'rabbit','赤毛のにょろ':'redsnache','スペースマンボルグ':'spaceborg','巨匠':'eldersloth','イノヴァルカン':'nimoy','神さま':'kamisama'};
const raw=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/zombie-completion/parsed.json'),'utf8'));
const manual={
 9:{hp:240000,max:12,limit:5,rules:[{type:'zroco',mag:250,at:{t:2},count:2,delay:[2,4]},{type:'gregory',mag:100,at:{t:200/30},count:3,delay:[500/30,20]},{type:'zroco',mag:250,at:{t:1000/30},count:5,delay:[20,800/30]}]},
 10:{hp:180000,max:10,limit:10,rules:[{type:'zomboe',mag:250,at:{t:0},count:2,delay:[1000/30,1000/30]},{type:'metalhippo',mag:300,at:{t:10},count:3,delay:[200/30,10]},{type:'shibalienelite',mag:100,at:{t:30},count:3,delay:[500/30,20]},{type:'zackiepeng',mag:250,at:{t:1600/30},count:1}]},
 16:{hp:195000,max:10,limit:5,rules:[{type:'darkdog',mag:800,at:{t:200/30},delay:[400/30,20]},{type:'zoge',mag:250,at:{t:500/30},count:3,delay:[400/30,500/30]},{type:'shibalienelite',mag:200,at:{t:1000/30},count:6,delay:[10,500/30]}]},
 35:{hp:360000,max:15,limit:15,rules:[{type:'starpeng',mag:300,at:{t:20},count:5,delay:[25,30]},{type:'mamaleboin',mag:300,at:{t:20/30},count:1},{type:'eldersloth',mag:300,at:{t:20/30},count:1},{type:'zapy',mag:100,at:{t:40},count:1}]}
};
const data=raw.map(st=>{
 if(!st.rows.length){if(st.c!==8||!manual[st.order])throw Error('missing source '+st.i);return {chapter:st.c,order:st.order,name:st.name,...manual[st.order],source:'DB overview + wiki battleground'};}
 const source=fs.readFileSync(path.join(root,`reference-sheets/zombie-completion/${st.c}-${String(st.order).padStart(2,'0')}.html`),'utf8').replace(/<[^>]+>/g,' ');
 const max=Number(source.match(/出撃最大数\s*([\d,]+)/)?.[1].replace(/,/g,'')),limit=Number(source.match(/出撃数制限\s*(\d+)体/)?.[1])||50;
 if(!max)throw Error('missing enemy cap '+st.i);
 const rules=st.rows.filter(c=>c[2]!=='カンバン娘').map(c=>{
  if(!ids[c[2]])throw Error('unknown enemy '+c[2]);const threshold=parseInt(c[5]),r={type:ids[c[2]],mag:parseInt(c[3]),at:threshold===100?{t:Number(c[6])/30}:{hp:threshold}};
  if(threshold!==100&&Number(c[6]))r.firstDelay=Number(c[6])/30;
  if(c[4]!=='無制限')r.count=Number(c[4]);if(c[7]!=='-'){const d=c[7].split('～').map(Number);r.delay=[d[0]/30,(d[1]??d[0])/30];}if(c[0]==='BOSS')r.boss=true;return r;
 });
 return {chapter:st.c,order:st.order,name:st.name,hp:st.hp,max,limit,rules,source:`https://battlecats-db.com/stage/s${st.map}z-${String(st.order).padStart(2,'0')}.html`};
});
fs.writeFileSync(path.join(root,'zombie-outbreak-data.js'),'// Missing outbreak stages only; do not replace previously available maps.\nconst ZOMBIE_COMPLETION_DATA='+JSON.stringify(data,null,2)+';\n');
console.log('Built',data.length,'outbreak stages and',data.reduce((n,d)=>n+d.rules.length,0),'spawn rules.');
