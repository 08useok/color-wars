// 신레전드 0~12장(真レジェンド s13000~s13012, 73맵) → true-legend.js. 구레전드 41~49장 빌더와 같은 규칙:
// 프레임/30 → 초, 성 연동 100%는 at:{t}, 그 밖은 at:{hp}+firstDelay, 023 간판 아가씨(900초 제한 적) 제외, XP 드롭은 ÷4(레전드가 ×4로 지급).
// 난이도(사용자 10-30): 기존 적의 출현 배율 ×1.3, 8.0 신규 13종은 능력치에 이미 ×1.3이라 원작 배율 그대로.
// 왕관 배율은 battlecats-db ?star=2~4 페이지 비교(reference-sheets/true-legend/crowns.json). 한국어 장·스테이지 이름은 임시 번역.
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..'),dir=path.join(root,'reference-sheets/true-legend');
const chapters=JSON.parse(fs.readFileSync(path.join(dir,'stages.json'),'utf8')).slice(0,13);
const crowns=JSON.parse(fs.readFileSync(path.join(dir,'crowns.json'),'utf8'));
const NEW80={'408':'truebunbun','409':'ancientdog','414':'inglis','415':'koraino','416':'supermayor','422':'datemegane','425':'kogaou','426':'oldree','445':'ministercyclone','446':'gardeneels','447':'looper','448':'finalgod','452':'dogumaru'};
const NEW80_KEYS=new Set(Object.values(NEW80));
const auto=JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/legend-db/enemy-map-auto.json'),'utf8'));
const map=Object.fromEntries(auto.filter(x=>x.game).map(x=>[x.db,x.game]));
const legendSrc=fs.readFileSync(path.join(__dirname,'build-legend-41-49.cjs'),'utf8');
for(const [,db,id] of legendSrc.split('Object.assign(map,')[1].split('});')[0].matchAll(/'(\d{3})':'(\w+)'/g))map[db]=id;
// 지도에 없던 기존 적: 체력·공격 일치로 맞춘 표(reference-sheets/enemies-80.json result[].game, 예: 429 クマンケン → cadaverbear)
for(const r of JSON.parse(fs.readFileSync(path.join(root,'reference-sheets/enemies-80.json'),'utf8')).result)if(r.game&&!map[String(r.db).padStart(3,'0')])map[String(r.db).padStart(3,'0')]=r.game;
Object.assign(map,{'390':'ultrabaabaa','419':'kidtappa','420':'ribbo','421':'kamisamaserious'},NEW80);
const KO=[
 ['진·전설의 시작','A New Legend','#d7c9a8','#8b7a5a',['고대의 저주']],
 ['배부른 비경','Gluttonous Wilds','#f2d9a3','#b58f55',['필라프 대초원','냥달메시안','안닌 고개','아히요 고원','파스타 사구','루러우 구릉']],
 ['어드벤 대삼림','Adventure Forest','#bfe0b0','#5f8a4c',['코사족 유적','덴지로 바다','산적 흉내','동글동글 웅덩이','스릴 넘치는 담소','장 굴']],
 ['철벅철벅 옛 바닷길','Old Sea Road','#a9d8ec','#5e8ea3',['마리네 타운','떠도는 소라고둥','파르카치오 해구','곰치 해저 화산','새벽 프론탈레','루츠보 소용돌이']],
 ['멍멍 만','Doggy Bay','#b8e1f0','#c9b47c',['팔딱팔딱 어장','반항적 경제 수역','가마토로 방파제','괴수 쇼 암굴','해마 해변','멋진 오징어 곶']],
 ['심연을 들여다보는 자','Abyss Watcher','#4b4a63','#3a3448',['단단한 암흑 병기','귀여운 벽화','선샤인 동굴','종유석 일루미네이션','핼쑥 성악설','느긋한 지저호']],
 ['데스 메가 시티','Death Mega City','#9aa3b5','#5a5f6e',['리코펜의 밤','메트로폴리스 오아시스','허울뿐인 마천루','무법자의 황혼','콘크리트 오션','무인역의 결투']],
 ['무법지대의 규칙','Lawless Code','#e8c99a','#9a6d43',['골풀 탑','카우걸 감옥','N.G. 목장','헌팅 산','벌벌 고원','데드 리볼버 계곡']],
 ['파라리라 반도','Paralira Peninsula','#bfe3e8','#8aa39b',['흰다랑어 해안','궁극 병기 바다사자','미꾸라지 깨기','괭이갈매기 만','날름날름 늪','보이스 피싱']],
 ['캣 쿠데타','Coup de Chat','#e3b8b0','#8a4d45',['귀뚜라미 이데올로기','굴속의 최고 권력자','인민과 당근','밀고자 군단','망명 전야의 기습','레드 캣 작전']],
 ['체리 섬','Cherry Isles','#f0c7b8','#7a4e45',['용암 온욕','음속 화쇄류','재의 비, 사랑을 위해','정상의 대현자','폭군 칼데라','슈퍼 볼케이노']],
 ['혼의 밑바닥에서의 귀화','Return from the Soul','#c9c0de','#6e6488',['이상한 찬송가','연유 수도굴의 처녀','흥겨운 기도','르상티망의 숲','수다쟁이 은둔자','원시에 깃든 혼']],
 ['멸종 해양 타운','Extinct Ocean Town','#9fc7cf','#4e6b70',['이와록 암초','앵무조개 무덤','바다에서 돌아온 망자','인면어의 물가','낙타 안벽','시야 없는 사해']]
];
const sec=f=>f/30;
const data=[];
for(const [ci,ch] of chapters.entries()){
 const [,,sky,land,names]=KO[ci];if(names.length!==ch.stages.length)throw Error('name count '+ci);
 for(const [si,s] of ch.stages.entries()){
  const rules=s.enemies.flatMap(r=>{
   const db=r[2].split('#')[1];if(db==='023')return [];
   const type=map[db];if(!type)throw Error('unmapped '+r[2]);
   const threshold=parseInt(r[5]),first=Number(r[6]),src=parseInt(String(r[3]).replace(/[^\d]/g,''));
   const rule={type,at:threshold===100?{t:sec(first)}:{hp:threshold},mag:NEW80_KEYS.has(type)?src:Math.round(src*1.3)};
   if(threshold!==100&&first)rule.firstDelay=sec(first);
   if(r[4]&&r[4]!=='無制限')rule.count=Number(r[4]);
   if(r[7]&&r[7]!=='-'){const d=r[7].split('～').map(Number);rule.delay=[sec(d[0]),sec(d[1]??d[0])];}
   if(r[0]==='BOSS')rule.boss=true;return [rule];
  });
  const drop={};
  for(const r of s.drops||[]){const item=r[2]||'',chance=parseFloat(r[3])/100;if(!Number.isFinite(chance))continue;
   if(item.startsWith('XP+')){drop.xp=Number(item.replace(/[^\d]/g,''))/4;drop.xpChance=chance}
   if(item.includes('スピードアップ'))drop.speed=chance;if(item.includes('ニャンピュータ'))drop.nyan=chance;}
  data.push({sub:ci,stage:{name:names[si],jp:s.name.replace('コンテニュー不可',''),flag:ci===0?'🏛️':'🗺️',hp:s.castleHp,max:s.max,xp:s.xp,sky,land,drop},rules});
 }
}
let k=324;const subs=KO.map(([name,en],i)=>{const jp=chapters[i].title.replace('ステージデータ ',''),len=data.filter(s=>s.sub===i).length,s={name,en,jp,start:k,len,crowns:crowns[i]};k+=len;return s});
const out=['// 신레전드 0~12장 (8.0). scripts/build-true-legend.cjs가 만든다. 출처: battlecats-db s13000~s13012. 한국어 이름은 임시 번역.',
 '// 기존 적의 출현 배율은 원작 ×1.3(새 스테이지 난이도), 8.0 신규 13종은 능력치에 이미 ×1.3. 900초 제한 적(간판 아가씨)은 이전 장처럼 뺐다.',
 `const TRUELEGEND_DATA=${JSON.stringify(data,null,1)};`,`const TRUELEGEND_SUBS=${JSON.stringify(subs)};`,
 fs.readFileSync(path.join(__dirname,'true-legend-registration.txt'),'utf8')];
fs.writeFileSync(path.join(root,'true-legend.js'),out.join('\n')+'\n');
console.log('Built',data.length,'stages,',data.reduce((n,s)=>n+s.rules.length,0),'rules, keys 324~'+(k-1),'subs',subs.length);
