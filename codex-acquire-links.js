// Acquisition links follow the same banner selection and daily rotation rules
// as the gacha screen itself.
function codexAcquisitionBanners(id){
 const exclusive=Object.entries(BUSTERS75_BANNERS)
  .filter(([,ids])=>ids.includes(id)).map(([name])=>({name,exclusive:true}));
 if(exclusive.length)return exclusive;
 const regular=Object.entries(SERIES_MEMBERS)
  .filter(([name,members])=>!GACHA_FESTIVALS[name]&&!BUSTERS75_BANNERS[name]&&members.some(u=>u.id===id))
  .map(([name])=>({name,exclusive:false}));
 if(regular.length)return regular;
 if([...GACHA_RARE,...GACHA_SR].some(u=>u.id===id)){
  return [{name:seriesRotation().series,exclusive:false}];
 }
 return [];
}
{
 const before=renderCodexExtra;
 renderCodexExtra=function(ally){
  before.apply(this,arguments);
  if(!ally)return;
  const banners=codexAcquisitionBanners(codexType);
  if(!banners.length)return;
  const row=document.createElement('div');
  row.className='codex-chips';
  for(const banner of banners){
   const button=document.createElement('button');
   button.type='button';
   const available=banner.exclusive||seriesRotation().series===banner.name;
   button.textContent=banner.name+(available?' 뽑기 바로가기':' · 로테이션 대기');
   button.disabled=!available||!gachaUnlocked();
   if(!gachaUnlocked())button.title='뽑기 해금 후 이동할 수 있습니다';
   button.onclick=()=>{
    // Recheck at click time because the Korean-midnight rotation can change
    // while the encyclopedia remains open.
    if(!gachaUnlocked())return;
    if(!banner.exclusive&&seriesRotation().series!==banner.name){
     renderCodexExtra(true);
     return;
    }
    if(!chooseBusters75(banner.exclusive?banner.name:null))return;
    closeCodex();
    openGacha();
   };
   row.append(button);
  }
  $('#codexExtra').append(row);
 };
}
