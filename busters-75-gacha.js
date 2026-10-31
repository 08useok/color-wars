// Always-selectable exclusive banners; existing KST daily rotation is unchanged.
const BUSTERS75_BANNERS={
 '레드 바스터즈':['heliotrope','almondblossom'],
 '블랙 바스터즈':['wisteria','almondblossom'],
 '에이리언 바스터즈':['wisteria'],
 '천사 바스터즈':['blossom'],
 '떠적 바스터즈':['heliotrope']
};
let busters75Selection=null;
for(const [name,ids]of Object.entries(BUSTERS75_BANNERS)){
 SERIES_MEMBERS[name]=ids.map(id=>({id,name:BUSTERS75[id].name}));
 const saved=BUSTERS75_SAVED_PITY[name];gacha.pityS[name]=Number.isInteger(saved)&&saved>=0?Math.min(SERIES_GACHA.pity-1,saved):0;
}
for(const [id,s]of Object.entries(BUSTERS75)){if(!GACHA_UBER.some(u=>u.id===id))GACHA_UBER.push({id,name:s.name});ACQUIRE_TEXT[id]=Object.entries(BUSTERS75_BANNERS).filter(([,ids])=>ids.includes(id)).map(([name])=>name).join(' · ')+' 전용';}
saveGacha();
{const before=syncGachaRotation;syncGachaRotation=function(...args){const changed=before.apply(this,args);if(busters75Selection)gachaBanner=busters75Selection;return changed;};}
function chooseBusters75(name){if(name!==null&&!BUSTERS75_BANNERS[name])return false;busters75Selection=name;syncGachaRotation();$('#gachaResults').innerHTML='';renderGacha();return true;}
{const before=gachaUberPool;gachaUberPool=function(){return busters75Selection?SERIES_MEMBERS[busters75Selection]:before().filter(u=>!BUSTERS75[u.id]);};}
{const before=renderGachaBanners;renderGachaBanners=function(){
 const box=$('#gachaBanners');if(!busters75Selection)before();else{box.innerHTML='';const label=document.createElement('b');label.textContent='바스터즈 전용: '+busters75Selection;box.append(label);}
 const row=document.createElement('div');row.className='gacha-banners';const daily=document.createElement('button');daily.type='button';daily.textContent='오늘의 시리즈';daily.className=busters75Selection?'':'active';daily.onclick=()=>chooseBusters75(null);row.append(daily);
 for(const name of Object.keys(BUSTERS75_BANNERS)){const b=document.createElement('button');b.type='button';b.textContent=name;b.className=busters75Selection===name?'active':'';b.onclick=()=>chooseBusters75(name);row.append(b);}box.append(row);
};}
if(gachaOpen())renderGacha();
