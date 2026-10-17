// Dedicated third-form art and profession profiles. Combat values remain in catfruit.js.
(()=>{
const atlases={"crystal":{"sheet":"assets/crystal_3.webp?v=1","scale":0.5,"left":21,"flip":false,"groundAnchor":true,"bodyWidth":64,"walkStep":0.125,"strike":3,"continuousAttack":true,"walk":[[0,0,187,209,107,0],[191,0,184,211,105,0],[379,0,184,210,105,0],[567,0,186,212,107,0],[757,0,184,217,106,0],[945,0,185,216,104,0],[1134,0,184,218,105,0],[1322,0,184,218,105,0]],"attack":[[1510,0,192,198,113,0],[1706,0,194,200,117,0],[0,222,221,201,133,0],[225,222,283,198,203,0],[512,222,227,207,149,0],[743,222,220,208,141,0],[967,222,175,214,94,0]],"hurt":[[1146,222,198,215,111,0]]},"indigo":{"sheet":"assets/indigo_3.webp?v=1","scale":0.5,"left":21,"flip":false,"groundAnchor":true,"bodyWidth":64,"walkStep":0.125,"strike":3,"continuousAttack":true,"walk":[[0,0,216,214,92,0],[220,0,204,214,89,0],[428,0,210,215,89,0],[642,0,203,214,84,0],[849,0,212,214,90,0],[1065,0,217,214,90,0],[1286,0,214,216,89,0],[1504,0,216,215,94,0]],"attack":[[1724,0,188,207,84,0],[0,220,244,209,136,0],[248,220,289,202,171,0],[541,220,299,184,194,0],[844,220,306,200,194,0],[1154,220,285,206,173,0],[1443,220,207,213,91,0]],"hurt":[[1654,220,234,204,122,0]]},"raspberry":{"sheet":"assets/raspberry_3.webp?v=1","scale":0.5,"left":21,"flip":false,"groundAnchor":true,"bodyWidth":64,"walkStep":0.125,"strike":3,"continuousAttack":true,"walk":[[0,0,213,216,125,0],[217,0,212,216,123,0],[433,0,210,213,121,0],[647,0,210,217,120,0],[861,0,209,211,115,0],[1074,0,197,214,107,0],[1275,0,216,213,127,0],[1495,0,204,215,112,0]],"attack":[[1703,0,254,202,164,0],[0,221,238,198,141,0],[242,221,255,204,154,0],[501,221,302,200,198,0],[807,221,267,220,151,0],[1078,221,228,215,134,0],[1310,221,210,220,120,0]],"hurt":[[1524,221,242,192,143,0]]}};
const jobs={crystal:'보석 감정가',indigo:'극작가',raspberry:'저격수'};
const descriptions={crystal:'보석 감정가. 루페로 결정의 결을 읽고 날카로운 크리스탈 조각을 골라낸다. 빛나는 보석 속에서 적의 빈틈까지 찾아낸다.',indigo:'극작가. 깃펜과 대본으로 전장의 한 장면을 써 내려간다. 극적인 순간, 떠있는 적의 움직임이 멈춘다.',raspberry:'저격수. 조준경이 달린 장총으로 먼 목표를 차분히 겨눈다. 거리를 벌려 급소를 노리는 라즈베리의 숙련된 모습.'};
for(const t of Object.keys(atlases)){
 // Raspberry's existing windup exceeds its .56s visual duration; fit every drawing into that existing duration.
 if(t==='raspberry')atlases[t].attackKeys=atlases[t].attack.map((_,i)=>[i*.56*30/7,i]);
 NEW_ATLASES[t].true=atlases[t];
 PROFILE_ART_TRUE[t]='assets/profile_'+t+'_3.webp?v=1';
 TRUE_NAME[t]=jobs[t]+' '+UNIT_NAMES[t];
 for(const map of [PROFILE_TEXT,PROFILE_TEXT_EVOLVED])if(!map[t].startsWith(jobs[t]+'.'))map[t]=jobs[t]+'. '+map[t];
}
const previousTraining=renderTraining;
renderTraining=function(){previousTraining.apply(this,arguments);for(const t of Object.keys(atlases))if(unitStats(t).trueForm){const copy=document.querySelector('.training-card[data-type="'+t+'"] .profile-copy');if(copy)copy.innerHTML='<strong>'+ROLES[t]+'</strong> · '+attackType(t)+' 공격<br>'+descriptions[t]+trainingAbilityLine(t)}};
const previousPreview=renderCodexPreview;
renderCodexPreview=function(){previousPreview.apply(this,arguments);if(codexTab==='ally'&&codexEvolved&&descriptions[codexType]&&unitStats(codexType).trueForm)document.getElementById('codexDesc').textContent=descriptions[codexType]+' (3진 강화: 기존 체력·공격력 배율 적용)'};
})();
