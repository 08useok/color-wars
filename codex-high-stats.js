// Presentation only: combat values and saved progress are never changed.
function codexHighStat(value,kind){
 const text=Math.round(value).toLocaleString('ko-KR');
 return value>(kind==='dps'?100000:1000000)?'<strong style="color:#e53935;font-weight:800" class="codex-high-stat">'+text+'</strong>':text;
}
(function(){
 const previous=renderCodexPreview;
 renderCodexPreview=function(){
  previous();
  if(codexTab==='stage')return;
  for(const dt of document.querySelectorAll('#codexStats dt')){
   const dd=dt.nextElementSibling;if(!dd)continue;
   const kind=/DPS/i.test(dt.textContent)?'dps':/체력|공격력|피해|데미지/.test(dt.textContent)?'stat':null;
   const value=Number(dd.textContent.replace(/,/g,''));
   if(kind&&Number.isFinite(value))dd.innerHTML=codexHighStat(value,kind);
  }
  if(codexTab!=='ally')return;
  const s=codexReviewStats(codexType,codexEvolved),m=allyComparisonMetrics(s),values=new Map();
  const add=(v,kind)=>{if(v>(kind==='dps'?100000:1000000))values.set(Math.round(v).toLocaleString('ko-KR'),kind)};
  add(s.hp,'hp');add(s.atk,'damage');add(m.effectiveHp,'hp');add(m.maximumDps,'dps');add(m.directDps,'dps');add(m.minimumTierDps,'dps');
  for(const t of Object.values(m.traits)){add(t.effectiveHp,'hp');add(t.dps,'dps')}
  for(const root of document.querySelectorAll('#codexDesc,#codexExtra')){
   const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
   while(walker.nextNode())nodes.push(walker.currentNode);
   for(const node of nodes){
    if(node.parentElement.closest('.codex-high-stat,.codex-rarity-standing'))continue;
    const tokens=[...node.textContent.matchAll(/\d[\d,]*(?:\.\d+)?/g)].filter(x=>values.has(x[0]));
    if(!tokens.length)continue;
    const fragment=document.createDocumentFragment();let last=0;
    for(const token of tokens){fragment.append(node.textContent.slice(last,token.index));const strong=document.createElement('strong');strong.className='codex-high-stat';strong.style.color='#e53935';strong.style.fontWeight='800';strong.textContent=token[0];fragment.append(strong);last=token.index+token[0].length}
    fragment.append(node.textContent.slice(last));node.replaceWith(fragment);
   }
  }
 };
})();
