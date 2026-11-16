// Append-only chapters 19–21 and original enemies DB 498–500.
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..'),ref=path.join(root,'reference-sheets/true-legend86');
const source=fs.readFileSync(path.join(__dirname,'build-true-legend.cjs'),'utf8');
const map=new Function('require','__dirname',source.slice(0,source.indexOf('const KO='))+';return map;')(require,__dirname);
Object.assign(map,{'470':'zuche','471':'zthrillerz','479':'puffington','498':'fenrirurs','499':'waninator','500':'gobble'});
const chapters=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/true-legend/stages.json'))).slice(19,22),crowns=JSON.parse(fs.readFileSync(path.join(ref,'crowns.json')));
const ko=[['학교에 숨어든 악의','School of Malice',['학원 분쟁 유적','한 마리뿐인 수조','매점을 지배하는 오니','교장 선생님의 반역','종 마크를 모으는 자','교칙과 벌칙']],['우무 광맥','Jelly Vein',['털 많은 갱도','즐거운 강제 노동','가스 마시는 새','별을 비추는 지하수','대붕괴 패닉','삽 하나에 건 목숨']],['만취 제철소','Intoxicated Foundry',['프롤레타리아의 상자','쓰러지지 않았나 보는 일','부동의 컨베이어','VIP 창고','반란 스크랩','하늘로 솟는 굴뚝']]];
const data=[],subs=[];let key=433;
for(const [j,ch]of chapters.entries()){
 const [name,en,names]=ko[j];subs.push({name,en,jp:ch.title.replace('ステージデータ ',''),start:key,len:ch.stages.length,crowns:crowns[j+19]});
 for(const [i,s]of ch.stages.entries()){
  const rules=s.enemies.flatMap(r=>{const db=r[2].split('#')[1];if(db==='023')return [];const type=map[db];if(!type)throw Error('unmapped '+r[2]);const hp=parseInt(r[5]),first=Number(r[6]),rule={type,at:hp===100?{t:first/30}:{hp},mag:parseInt(r[3].replace(/[^\d]/g,''))};if(hp!==100&&first)rule.firstDelay=first/30;if(r[4]&&r[4]!=='無制限')rule.count=Number(r[4]);if(r[7]&&r[7]!=='-'){const d=r[7].split('～').map(Number);rule.delay=[d[0]/30,(d[1]??d[0])/30];}if(r[0]==='BOSS')rule.boss=true;return [rule];});
  const drop={};for(const r of s.drops||[]){const item=r[2]||'',p=parseFloat(r[3])/100;if(!Number.isFinite(p))continue;if(item.startsWith('XP+')){drop.xp=Number(item.replace(/[^\d]/g,''))/4;drop.xpChance=p;}if(item.includes('スピードアップ'))drop.speed=p;if(item.includes('ニャンピュータ'))drop.nyan=p;}
  data.push({sub:j,stage:{name:names[i],jp:s.name,flag:'🗺️',hp:s.castleHp,max:s.max,xp:s.xp,sky:'#bdcbd2',land:'#8c958b',drop,originalSchedule:true,originalWidth:s.width,source:'https://battlecats-db.com/stage/'+s.id+'.html',noContinue:s.name.includes('コンテニュー不可')},rules});key++;
 }
}
let registration=fs.readFileSync(path.join(__dirname,'true-legend-registration.txt'),'utf8').replaceAll('TRUELEGEND_','TRUELEGEND86_').replaceAll('BeforeTrue','BeforeTrue86').replace('TRUELEGEND86_K0=324','TRUELEGEND86_K0=433');
fs.writeFileSync(path.join(root,'true-legend86.js'),'// 8.6 local: original chapters 19–21, append-only keys 433–450. Korean names are provisional.\nconst TRUELEGEND86_DATA='+JSON.stringify(data,null,1)+';\nconst TRUELEGEND86_SUBS='+JSON.stringify(subs)+';\n'+registration);
const atlas=JSON.parse(fs.readFileSync(path.join(ref,'atlas.json'))),defs={
 fenrirurs:{db:498,name:'펜리르와 우르스',stats:{trait:'ancient',hp:750000,atk:35000,knockbacks:5,interval:156/30,speed:4*.5367,range:300*.034,zoneMin:0,zoneMax:500*.034,backRange:500*.034,area:true,reward:1400,windup:69/30,curseChance:1,curseDuration:4,atkDownChance:1,atkDownPct:.9,atkDownDuration:4},text:'고대종. 전후방 500을 범위 공격하며 4초 동안 공격력을 10%로 낮추고 고대의 저주를 건다. 신레전드 20장의 보스.'},
 waninator:{db:499,name:'메탈 아거',stats:{trait:'metal',hp:5,atk:800,knockbacks:1,interval:47/30,speed:12*.5367,range:110*.034,reward:150,windup:8/30},text:'체력 5의 메탈 적. 일반 타격은 1 피해로 줄이고 크리티컬은 그대로 받는다. 신레전드 20장부터 등장한다.'},
 gobble:{db:500,name:'터키',stats:{trait:'floating',hp:329000,atk:5000,knockbacks:3,interval:91/30,speed:8*.5367,range:200*.034,zoneMin:0,zoneMax:420*.034,backRange:320*.034,area:true,reward:800,windup:52/30,poisonChance:1,poisonPct:.35},text:'떠 있는 적. 앞 420·뒤 320의 전방위 범위 공격과 최대 체력 35%의 독 공격을 사용한다. 독 무효는 추가 피해를 막지만 기본 타격은 받는다.'}
};
let out='// Original DB 498–500: hp/atk unchanged, frames /30, distance *.034, speed *.5367.\n';for(const [id,d]of Object.entries(defs)){d.stats.attackDuration=Math.max(d.stats.windup,Math.min(d.stats.interval,atlas[id].attack.length*atlas[id].attackStep/30));out+='data.units.'+id+'='+JSON.stringify(d.stats)+';\nUNIT_NAMES.'+id+'='+JSON.stringify(d.name)+';ENEMY_ORDER.push('+JSON.stringify(id)+');\nNEW_ATLASES.'+id+'='+JSON.stringify(atlas[id])+';\nENEMY_TEXT.'+id+'='+JSON.stringify(d.text)+';\n';}
out+='{const before=codexTraitBadges;codexTraitBadges=function(d,ally){const b=before(d,ally);if(d.poisonPct)b.push(`독 공격(최대 체력 ${Math.round(d.poisonPct*100)}% · ${freqWord(d.poisonChance??1)})`);return b;};}\n';fs.writeFileSync(path.join(root,'enemies-86.js'),out);
console.log('Built 18 maps / 3 enemies, keys 433–450',subs.map(s=>s.crowns));
