// 위키 맨 앞 탭 '초보자 공략' (세계편 1장·2장·뽑기·3장). 근거: docs/기획-시험/초보자-1장-플레이-2026-10-21.md, 초보자-2장-뽑기-2026-10-21.md (새 계정으로 사이트에서 직접 해 본 결과).
// 위키 모드(codexWiki)에서만 보이는 탭이고, 세계편 1장 달(마지막 스테이지)을 아직 못 깬 계정이 위키를 열면 이 탭이 먼저 열린다.
(function(){
 const ROLE=t=>(typeof ROLES!=='undefined'&&ROLES[t])||'';
 const ally=[['red','처음부터','기본 근접'],['orange','중국 클리어','중거리 범위'],['yellow','필리핀 클리어','방어형 전기'],['green','일본 클리어','왕복 부메랑'],['cyan','두바이 클리어','초장거리 저격'],['blue','마다가스카르 클리어','고속 연속 공격'],['purple','사하라사막 클리어','근접 빨간 적 특화'],['pink','브라질 클리어','근거리 광역']];
 const name=t=>(typeof UNIT_NAMES!=='undefined'&&UNIT_NAMES[t])||t;
 const CH=[
  {group:'세계편 1장',title:'1. 처음 해 보기',html:()=>`
   <p>왼쪽의 <b>적 성</b>을 부수면 이기고, 오른쪽이 내 성입니다. 아래 버튼으로 아군을 만들면 알아서 싸웁니다.</p>
   <ul>
    <li><b>돈</b>은 시간이 지나면 자동으로 모이고, 적을 쓰러뜨려도 얻습니다. 아군을 만들 때 돈이 듭니다.</li>
    <li>처음에는 <b>레드만 계속</b> 뽑으면 됩니다. 한국은 46초쯤 걸립니다.</li>
    <li>왼쪽 아래 <b>수입 업그레이드</b>는 돈 모으는 속도를 올려 줍니다. 레드가 <b>3마리 정도 쌓인 뒤</b>에 누르세요. 방어가 비었을 때 먼저 누르면 순식간에 질 수 있습니다.</li>
    <li>적이 내 성 가까이 오면(위기) <b>싼 아군부터</b>, 아니면 돈을 모아 <b>비싼 아군</b>을 뽑는 게 좋습니다.</li>
   </ul>`},
  {title:'2. 레드로 충분한 구간',html:()=>`
   <p><b>한국부터 마다가스카르까지 16곳</b>은 레벨 1 레드만 계속 뽑아도 깹니다. 서두르지 말고 레드를 꾸준히 뽑으세요.</p>
   <p>깰 때마다 <b>XP</b>를 받습니다. 한국 400, 이후 한 스테이지마다 100씩 늘어서 마다가스카르까지 모두 깨면 약 18,000 XP가 쌓입니다. 이 XP로 아군을 강하게 만듭니다(다음 장).</p>
   <p class="wg-note">새 아군이 해금돼도 이 구간은 레드만으로 충분합니다. 해금 안내는 4장에 있습니다.</p>`},
  {title:'3. 캐릭터 강화 (XP 쓰기)',html:()=>`
   <p>XP는 <b>스테이지 선택 화면 맨 아래의 '캐릭터 강화'</b>에서 아군 레벨을 올리는 데 씁니다. 그 위에는 기지 강화·보물·지갑 같은 다른 메뉴도 있으니 아래로 내려가 보세요.</p>
   <table class="wg-table"><thead><tr><th>레드 레벨업</th><th>비용(XP)</th></tr></thead><tbody>
    <tr><td>Lv.1 → 2</td><td>110</td></tr><tr><td>Lv.2 → 3</td><td>220</td></tr><tr><td>Lv.3 → 4</td><td>350</td></tr><tr><td>Lv.9 → 10</td><td>1,310</td></tr><tr><td>Lv.10까지 합계</td><td>5,950</td></tr></tbody></table>
   <ul>
    <li><b>Lv.10이 되면 2진으로 자동 진화</b>합니다.</li>
    <li>Lv.11~20은 <b>세계편 2장 마지막 스테이지</b>를 깨야 열립니다. 1장에서는 Lv.10이 상한입니다.</li>
    <li>XP가 남으면 <b>지갑·돈 생산력·기지 강화</b> 같은 영구 강화에 쓰세요.</li>
   </ul>`},
  {title:'4. 새 아군과 덱 세팅',html:()=>`
   <p>아군은 해당 스테이지를 <b>깨면 해금</b>되고, <b>다음 스테이지부터</b> 쓸 수 있습니다. 그런데 해금된 아군은 <b>덱에 자동으로 들어가지 않습니다.</b> 스테이지 선택 화면의 <b>덱 세팅</b>에서 직접 넣어야 전투에 나옵니다. 덱은 최대 10칸입니다.</p>
   <table class="wg-table"><thead><tr><th>아군</th><th>해금</th><th>역할</th></tr></thead><tbody>
    ${ally.map(([t,when,desc])=>`<tr><td>${name(t)}</td><td>${when}</td><td>${ROLE(t)||desc}</td></tr>`).join('')}
   </tbody></table>
   <p class="wg-note">덱 세팅을 안 하고 레드만 쓰면 뉴욕까지는 가지만 <b>할리우드</b>에서 막힙니다(레드만으로는 15분을 해도 못 깸). 덱에 아군을 넣으면 81초에 깹니다.</p>`},
  {title:'5. 남아프리카부터',html:()=>`
   <p><b>남아프리카</b>(17번째 스테이지)부터는 레드 레벨 1로는 안 됩니다. <b>덱 전원을 Lv.4 이상</b>으로 올려 두세요. 덱 전원을 같은 레벨로 올리고 여러 번 도전한 결과입니다.</p>
   <table class="wg-table"><thead><tr><th>덱 전원 레벨</th><th>결과</th></tr></thead><tbody>
    <tr><td>Lv.1</td><td>25초 만에 패</td></tr><tr><td>Lv.2</td><td>2승 3패</td></tr><tr><td>Lv.3</td><td>3승 1패</td></tr><tr><td><b>Lv.4</b></td><td><b>5승 0패</b></td></tr></tbody></table>
   <p>이때쯤이면 XP가 이미 충분히 쌓여 있습니다. 쓰기만 하면 됩니다. 수입 업그레이드는 방어가 3마리 이상 쌓인 뒤에 올리세요.</p>`},
  {title:'6. 막혔을 때 점검표',html:()=>`
   <table class="wg-table"><thead><tr><th>증상</th><th>원인</th><th>해결</th></tr></thead><tbody>
    <tr><td>적 성에 피해를 하나도 못 준다<br><small>예: 남아프리카</small></td><td>덱 레벨이 낮다</td><td>캐릭터 강화에서 덱 전원 <b>Lv.4 이상</b></td></tr>
    <tr><td>계속 싸우는데 안 끝난다<br><small>예: 할리우드</small></td><td>새 아군을 덱에 안 넣었다</td><td><b>덱 세팅</b>에서 해금된 아군을 모두 넣는다</td></tr>
    <tr><td>시작하자마자 순식간에 진다<br><small>예: 알래스카</small></td><td>수입 업그레이드를 먼저 해서 방어를 못 뽑았다</td><td><b>방어(레드·오렌지)를 먼저</b> 뽑고, 수입은 3마리 이상 쌓인 뒤에</td></tr>
    <tr><td>돈이 계속 모자란다</td><td>수입을 안 올렸다</td><td>위기가 아닐 때 수입 업그레이드. 안 올리면 마지막 달이 훨씬 오래 걸린다</td></tr>
    <tr><td>XP가 남는데 쓸 곳이 없다</td><td>캐릭터가 Lv.10 상한이다</td><td>지갑·돈 생산력·기지 강화 같은 영구 강화에 쓴다</td></tr></tbody></table>`},
  {title:'7. 1장 끝내고',html:()=>`
   <p>마지막 스테이지 <b>달</b>은 3분쯤 걸리는 보스전입니다. 전투 중에 수입을 계속 올리세요. 깨면 <b>세계편 1장 보물</b>이 완성되고 <b>2장</b>이 열립니다.</p>
   <p>2장부터는 아군 레벨 상한이 Lv.20까지 열리고, 새 아군과 뽑기가 더 중요해집니다. 2장 공략은 준비 중입니다.</p>
   <p class="wg-note">이 공략은 새 계정으로 1장을 직접 해 보고 쓴 것입니다. 사람마다 걸리는 시간은 다를 수 있습니다.</p>`},
  {group:'세계편 2장',title:'8. 2장이 열렸다',html:()=>`
   <p>1장 마지막 스테이지 <b>달</b>을 깨면 <b>세계편 2장</b>이 열립니다. 스테이지 이름이 한국부터 달까지 <b>한 번 더</b> 나오지만 2장 스테이지이고, 적 성 체력이 2,000에서 200,000까지로 훨씬 큽니다.</p>
   <p>1장 달을 깬 보상으로 <b>1장 보물</b>이 영구로 적용됩니다. 장마다 이런 효과를 얻어서 2장은 1장보다 오히려 쉽게 느껴집니다.</p>
   <ul>
    <li>아군 공격력·체력 +50%, 자연 수입 +100%, 지갑 +1,000원</li>
    <li>적 처치 수입·XP +50%, 생산 대기시간 −1초</li>
    <li>성 체력 +7,000, 냥코 대포 위력 +500·충전 −5초</li>
   </ul>
   <p class="wg-note">캐릭터 레벨 상한은 <b>2장 마지막 스테이지(달)를 깰 때까지 Lv.10</b>입니다. 그동안 덱 전원을 Lv.10으로 맞춰 두세요.</p>`},
  {title:'9. 2장 새 아군',html:()=>{
   const n=[['crimson','중국','근거리 강타'],['gold','일본','분열 광역형'],['ivory','인도','원거리 · 움직임을 느리게 한다'],['chartreuse','케냐','중거리 연사형'],['mint','사하라사막','중거리 · 움직임을 멈춘다'],['azure','러시아','돌진 광역형'],['crystal','스페인','관통 크리티컬형'],['lavender','노르웨이','장거리 · 공격력 다운'],['salmon','뉴욕','초장거리 끌어오기'],['raspberry','브라질','초장거리 저격형'],['onyx','달(마지막)','근접 광역 강타 · 보스에 강함 (EX)']];
   return `<p>2장에서도 스테이지를 깨면 아군이 해금되고 <b>덱에 직접 넣어야</b> 합니다. 덱은 10칸이라 새 아군을 넣으려면 누군가를 빼야 합니다.</p>
   <table class="wg-table"><thead><tr><th>아군</th><th>해금(2장)</th><th>역할</th></tr></thead><tbody>
    ${n.map(([t,when,desc])=>`<tr><td>${name(t)}</td><td>${when} 클리어</td><td>${ROLE(t)||desc}</td></tr>`).join('')}
   </tbody></table>
   <p class="wg-note">2장은 덱 전원이 Lv.10이면 어떤 조합이든 깰 수 있습니다. 역할이 겹치지 않게 <b>방어(옐로우) + 딜러 + 느리게/멈추게 하는 아군</b>을 섞으세요. 뽑기로 얻은 캐릭터가 있다면 먼저 넣어 보세요(뽑기는 아래 장).</p>`}},
  {title:'10. 2장 진행 팁',html:()=>`
   <p>1장 보물 덕분에 2장은 순조롭습니다. 새 계정으로 덱 10명을 전원 Lv.10으로 맞추고 사이트에서 직접 해 본 결과, <b>2장 48스테이지를 모두 첫 시도에 깼습니다.</b></p>
   <ul>
    <li>한 스테이지는 20~70초, 마지막 <b>달은 약 2분 30초</b>(적 성 체력 200,000)였습니다.</li>
    <li>2장 일반 스테이지를 <b>처음 깰 때마다 확정권 1장</b>, 달을 깨면 <b>10장</b>을 받습니다(2장 전체로 57장). 보관함에 쌓이니 뽑기 화면에서 '모두 받기'를 누르세요.</li>
    <li>수입 업그레이드는 계속 올리고, 위기가 아닐 때 올리는 것이 안전합니다.</li>
   </ul>
   <p><b>2장 달</b>을 깨면: 2장 보물 완성, <b>오닉스(EX) 해금</b>, <b>레벨 상한이 Lv.20으로 확장</b>, 확정권 10장이 들어옵니다. 레드 기준 Lv.11~20은 레벨당 1,500~3,710 XP(합계 25,450 XP)가 듭니다. 2장을 깨는 동안 XP가 수십만 쌓여 있으니 덱을 Lv.20까지 올릴 수 있습니다.</p>`},
  {title:'11. 2장 추천 덱 10명 (기본 캐릭터만)',html:()=>{
   const core=[['red','처음부터','싼 방어. 계속 뽑아 앞을 채웁니다.'],['yellow','필리핀(1장)','방어형. 레드 뒤에서 버팁니다.'],['orange','중국(1장)','중거리 범위 공격.']];
   const add=[['chartreuse','케냐','중거리 연사. 2장 달이 가장 많이 빨라집니다(−116초).'],['raspberry','브라질','초장거리 저격. 달 −116초.'],['salmon','뉴욕','초장거리로 적을 끌어옵니다. 달 −100초.'],['gold','일본','분열 광역형. 달 −94초.'],['ivory','인도','원거리로 적을 느리게 합니다. 달 −93초.'],['azure','러시아','돌진 광역형. 일반 스테이지에서도 빠릅니다.'],['blue','마다가스카르(1장)','고속 연속 공격. 일반 스테이지에서 가장 빠르게 깹니다.']];
   const row=(t,when,memo)=>`<tr><td><b>${name(t)}</b><br><small>${ROLE(t)}</small></td><td>${when}</td><td>${memo}</td></tr>`;
   return `<p>뽑기 없이 <b>기본 등급 아군만</b>으로 2장을 깰 때의 추천 덱입니다. 레드·옐로우·오렌지 세 명에 한 명씩 더해 2장 어려운 스테이지(덴마크·라스베이거스·하와이·달)를 깨는 시간을 재서 효과가 큰 아군을 골랐습니다.</p>
   <h3>기본 3명 (처음부터 쓰던 아군)</h3>
   <table class="wg-table"><thead><tr><th>아군</th><th>해금</th><th>역할</th></tr></thead><tbody>${core.map(r=>row(...r)).join('')}</tbody></table>
   <h3>2장에서 더할 7명</h3>
   <table class="wg-table"><thead><tr><th>아군</th><th>해금</th><th>한마디</th></tr></thead><tbody>${add.map(r=>row(...r)).join('')}</tbody></table>
   <ul>
    <li>달 단축은 레드·옐로우·오렌지만 쓸 때(287초)와 비교한 값입니다.</li>
    <li>이 10명 덱은 2장 6곳(덴마크·그리스·버뮤다·라스베이거스·하와이·달)을 평균 <b>65초</b>에 깼고, 해금 순서대로 앞 10명(레드·오렌지·옐로우·그린·시안·블루·퍼플·핑크·크림슨·골드)을 넣은 덱은 평균 73초(달은 143초 대 107초)였습니다.</li>
    <li>뺀 아군: 그린·핑크·퍼플·시안·크림슨은 위 덱에서 효과가 작았고, 크리스탈·민트·라벤더는 쓸 만하지만 10칸이 차서 뺐습니다.</li>
   </ul>
   <p class="wg-note"><b>방어(레드·옐로우)를 꼭 넣으세요.</b> 효과가 큰 순서대로 아군 10명만 골랐을 때는 2장 달을 4번 모두 졌습니다. 앞을 막아 주는 아군이 없기 때문입니다. 2장은 어떤 덱으로도 깰 수 있어서 차이는 작고, 달에서 가장 크게 납니다.</p>`}},
  {group:'뽑기',title:'12. 뽑기 시작하기',html:()=>`
   <p><b>일본</b>(7번째 스테이지)을 처음 깨면 <b>뽑기</b>가 열립니다. 스테이지 선택 화면의 <b>뽑기</b> 버튼(또는 '뽑기 하러 가기')으로 들어갑니다.</p>
   <ul>
    <li>뽑기에는 <b>확정권</b>만 씁니다. <b>1회 뽑기는 확정권 1장, 10회 뽑기는 10장</b>입니다.</li>
    <li><b>모든 뽑기는 레어 이상 확정</b>입니다. 꽝이나 기본 캐릭터는 나오지 않습니다.</li>
    <li>나오는 캐릭터는 <b>레어·슈퍼 레어·울트라 슈퍼 레어(울슈레)</b>입니다. 울슈레가 가장 강한 등급입니다.</li>
    <li>같은 등급 안에서는 <b>아직 못 가진 캐릭터가 먼저</b> 나옵니다.</li>
    <li>뽑은 캐릭터는 <b>덱 세팅에서 직접 넣어야</b> 전투에 나옵니다.</li>
   </ul>`},
  {title:'13. 확정권 얻는 법',html:()=>`
   <table class="wg-table"><thead><tr><th>방법</th><th>확정권</th></tr></thead><tbody>
    <tr><td>매일 접속(일일 보상)</td><td>1장 (7일 연속이면 10장 추가)</td></tr>
    <tr><td>1장 마지막 스테이지(달) 첫 클리어</td><td>10장</td></tr>
    <tr><td>2장 일반 스테이지 첫 클리어</td><td>스테이지마다 1장</td></tr>
    <tr><td>2장 마지막 스테이지(달) 첫 클리어</td><td>10장</td></tr>
    <tr><td>화·금 스페셜 스테이지 클리어</td><td>확률로 10장</td></tr>
    <tr><td>이미 깬 레전드 스테이지 반복</td><td>낮은 확률로 1장</td></tr></tbody></table>
   <p>받은 확정권은 바로 지급되지 않고 <b>보관함</b>에 쌓입니다. 뽑기 화면 위의 <b>'모두 받기'</b>를 눌러야 쓸 수 있습니다. 1장에서는 달을 깨기 전까지 일반 스테이지 보상이 없어서, 1장이 끝나면 확정권이 약 10장입니다.</p>`},
  {title:'14. 배너와 확률',html:()=>`
   <p>뽑기는 <b>시리즈 배너</b>입니다. 한국 시간 <b>매일 00시에 시리즈가 하나씩 바뀝니다.</b> 화면 위에 오늘의 시리즈와 다음 시리즈가 나옵니다.</p>
   <ul>
    <li>시리즈 8개(글라스 군단·LGBT·인스톨 연합·아이언즈·복싱즈·스위츠·가든즈·워터즈)와 <b>축제 2일</b>(울트라·하이퍼 고양이 축제)이 10일 주기로 돕니다.</li>
    <li>일반 시리즈 날: 레어 약 64%, 슈퍼 레어 약 23%, <b>그 시리즈의 울슈레 약 13%</b>.</li>
    <li><b>축제 날: 울슈레 20%</b>(전체 울슈레가 나오고 축제 전용 캐릭터는 없음), 레어 59%, 슈퍼 레어 21%.</li>
    <li><b>천장 50회:</b> 같은 시리즈에서 50회를 뽑는 동안 울슈레가 안 나오면 확정됩니다. 시리즈가 돌아와도 횟수가 유지됩니다.</li>
    <li>뽑기로 얻는 캐릭터는 모두 <b>45명</b>(컬렉션 화면에서 확인).</li>
   </ul>
   <p class="wg-note">울슈레를 노린다면 <b>축제 날</b>에 확정권을 쓰는 게 가장 유리합니다. 평소에는 모아 두세요.</p>`},
  {title:'15. 중복과 환전소',html:()=>`
   <p>이미 가진 캐릭터가 또 나오면 <b>+레벨 +1</b>이 쌓입니다(캐릭터당 최대 +10). 상한을 넘으면 XP로 바뀝니다. 레벨 상한과 별도로 강해지니 중복도 헛되지 않습니다.</p>
   <p>뽑기 화면 아래 <b>환전소</b>에서는 남는 확정권을 바꿉니다.</p>
   <ul>
    <li>확정권 1장 → <b>XP 3,000</b></li>
    <li>확정권 1장 → 고른 캐릭터 <b>+레벨 +1</b> (가진 캐릭터만)</li>
   </ul>
   <p class="wg-note">보관함에 든 확정권은 먼저 '모두 받기'로 받아야 바꿀 수 있습니다.</p>`},
  {title:'16. 뽑기 활용 팁',html:()=>`
   <ul>
    <li><b>1장 달을 깨면 확정권 10장</b>이 들어옵니다. 이때 바로 10회를 뽑아 덱에 넣으면 2장이 한층 편해집니다. 이후 매일 1장씩 모입니다.</li>
    <li>울슈레를 원하면 <b>축제 날</b>까지 확정권을 모으세요(10일에 한 번 이틀 연속).</li>
    <li>사이트에서 확정권 60장을 뽑아 봤더니 레어 39번·슈퍼 레어 15번·울슈레 6번이 나와 <b>새 캐릭터 26명</b>을 모았습니다. 중복은 +레벨로 쌓였습니다.</li>
    <li>뽑은 캐릭터는 <b>덱 세팅에서 넣고 XP로 레벨업</b>해야 제 힘을 냅니다.</li>
    <li>확정권은 XP나 +레벨로 바꿀 수 있어서, 당장 쓸 곳이 없어도 낭비가 아닙니다.</li>
   </ul>`},
  {group:'세계편 3장',title:'17. 3장이 열렸다',html:()=>{
   const rare=[['black','몽골'],['white','중국'],['maroon','일본'],['brown','인도'],['tan','케냐'],['beige','남아프리카'],['cream','이집트'],['olive','러시아'],['clover','이탈리아'],['indigo','스페인'],['lilac','프랑스'],['hotpink','영국'],['ruby','뉴욕'],['hacienda','멕시코']];
   return `<p>2장 마지막 스테이지(달)를 깨면 <b>세계편 3장</b>(스테이지 48개)이 열립니다. 이름이 또 한국부터 달까지 나오고, 적 성 체력이 3,000에서 시작해 마지막 달은 <b>900,000</b>입니다.</p>
   <ul>
    <li>일반 스테이지를 처음 깰 때마다 <b>XP 20,000</b>(스테이지마다 200씩 늘어남)과 <b>확정권 1장</b>.</li>
    <li>3장 달: <b>XP 29,400</b>, 확정권 10장, <b>EX 셀레나이트</b>, 3장 보물(세계편 보물 3개 완성).</li>
    <li>3장 전체로 받는 확정권은 <b>57장</b>입니다(일반 47곳 + 달 10장).</li>
   </ul>
   <h3>3장에서 해금되는 레어 14명</h3>
   <p>스테이지를 깨면 해금되고, 2장처럼 <b>덱 세팅에서 직접 넣어야</b> 합니다.</p>
   <table class="wg-table"><thead><tr><th>아군</th><th>해금(3장)</th><th>역할</th></tr></thead><tbody>
    ${rare.map(([t,when])=>`<tr><td><b>${name(t)}</b></td><td>${when} 클리어</td><td>${ROLE(t)}</td></tr>`).join('')}
   </tbody></table>
   <p class="wg-note">레어 아군은 검은 적·천사·떠 있는 적처럼 <b>특정 상대에게 강한 특화형</b>이 많습니다. 시험에서는 이 14명 각각을 더해도 3장 클리어 시간이 2~10초 빨라지는 정도였습니다. 3장 자체가 쉽기 때문입니다.</p>`}},
  {title:'18. 3장 진행 팁',html:()=>`
   <p>2장을 끝낸 상태(레벨 상한 Lv.20, 보물 2개)로 사이트에서 직접 해 본 결과, <b>3장 48스테이지를 모두 첫 시도에 깼습니다.</b></p>
   <ul>
    <li>한 스테이지는 <b>15~30초</b>, 마지막 달(적 성 체력 900,000)은 <b>61초</b>였습니다. 아군 성이 한 번도 안 맞았습니다.</li>
    <li>덱은 10명 전원 <b>Lv.20</b>이었습니다(레드·옐로우·블루·골드·오닉스·샤르트뢰즈·라즈베리·살몬·아이보리·블랙). 2장을 깨는 동안 쌓인 XP로 올릴 수 있습니다. 레벨 상한이 20으로 늘어난 것을 꼭 활용하세요.</li>
    <li>시험 도구에서는 <b>레드·옐로우·오렌지만으로도</b> 3장 달을 약 100초에 깼습니다. 어떤 아군을 더해도 차이는 몇 초뿐이었습니다. 3장에서는 덱 고민을 덜 해도 됩니다.</li>
    <li>수입 업그레이드는 계속 올리세요. 성 체력은 보물 2개로 15,000까지 늘어 있습니다.</li>
   </ul>
   <p class="wg-note">3장에서 막히면 <b>덱 전원 레벨</b>부터 확인하세요(막혔을 때 점검표). 레벨을 안 올린 상태로 3장을 해 보지는 않았습니다.</p>`},
  {title:'19. 3장을 끝내고',html:()=>`
   <p>3장 달을 깨면 <b>144개 세계편 스테이지를 모두 정복</b>한 것이고, <b>미래편</b>이 열립니다. 세계편 보물 3개가 모두 완성됩니다.</p>
   <ul>
    <li><b>EX 셀레나이트</b>와 확정권 10장을 받습니다(보관함에서 '모두 받기').</li>
    <li><b>3진 진화</b>가 열립니다. 레벨 20인 아군을 <b>개다래 열매 1개 + 씨앗 3개 + XP 30,000</b>(살몬·골드 기준)으로 진화시킵니다. 개다래는 <b>'개다래 축제' 스페셜 스테이지</b>에서 얻는데, 이 스테이지는 <b>미래편 1장을 깬 뒤</b>에 열립니다.</li>
    <li>미래편에서는 새로운 적(에이리언 등)이 나옵니다. 3장 공략은 여기까지입니다.</li>
   </ul>`},
  {group:'미래편',title:'20. 미래편이 열렸다',html:()=>{
   const rows=Object.entries(typeof UNLOCK_AT!=='undefined'?UNLOCK_AT:{}).filter(([t,v])=>typeof FUTURE_START!=='undefined'&&v>=FUTURE_START&&v<FUTURE_END).sort((a,b)=>a[1]-b[1]);
   return `<p>3장 달을 깨면 <b>미래편</b>이 열립니다. 미래편은 <b>1장·2장·3장</b>으로 나뉘고, 장마다 스테이지 <b>48개</b>입니다. 3장을 깨면 우주편이 열립니다.</p>
   <ul>
    <li>일반 스테이지를 처음 깰 때마다 <b>확정권 1장</b>, 각 장의 마지막 스테이지는 <b>확정권 10장</b>. 장마다 57장입니다.</li>
    <li>미래편 3개 장을 모두 깨면 <b>미래편 보물 3개</b>가 완성됩니다: 성 체력 +21,000, 대포 위력 +1,500, 대포 충전 −30초, 빨강·검정·천사·떠 있는 적 대상 능력 강화, 일반 에일 억제기 자동 완성.</li>
    <li>미래편 1장을 깨면 <b>개다래 축제</b> 스페셜 스테이지가 열려 3진 진화 재료(개다래 열매·씨앗)를 얻을 수 있습니다.</li>
   </ul>
   <h3>미래편 1장에서 해금되는 아군 ${rows.length}명</h3>
   <p>스테이지를 깨면 해금되고, 이전과 같이 <b>덱 세팅에서 직접 넣어야</b> 합니다.</p>
   <table class="wg-table"><thead><tr><th>아군</th><th>해금 스테이지</th><th>역할</th></tr></thead><tbody>
    ${rows.map(([t,v])=>`<tr><td><b>${name(t)}</b></td><td>미래편 1장 ${(STAGES[v]||{}).name||''}</td><td>${ROLE(t)}</td></tr>`).join('')}
   </tbody></table>`}},
  {title:'21. 미래편 추천 아군 (뽑기 없이)',html:()=>`
   <p>미래편은 레벨 20 덱 10명을 채우면 어려운 곳 없이 깹니다. 뽑기 캐릭터 없이, <b>스테이지로 얻는 아군만</b>으로 짠 추천 덱을 사이트에서 직접 해 봤습니다.</p>
   <h3>추천 덱 (전원 Lv.20)</h3>
   <p><b>레드·옐로우·오렌지</b>(앞에서 버티는 기본) + <b>아이보리·민트·라벤더</b>(적을 느리게 하거나 멈추거나 약하게 하는 지원) + <b>화이트·네이비</b>(딜러, 네이비는 에일리언에 강함) + <b>민들레·피치</b>(미래편 1장에서 해금되는 특화형)</p>
   <h3>사이트에서 직접 깬 결과</h3>
   <table class="wg-table"><thead><tr><th>스테이지</th><th>클리어 시간</th></tr></thead><tbody>
    <tr><td>미래편 1장 달</td><td>35초</td></tr>
    <tr><td>미래편 2장 부유대륙</td><td>50초</td></tr>
    <tr><td>미래편 3장 일본</td><td>19초</td></tr>
    <tr><td>미래편 3장 이스터섬</td><td>38초</td></tr>
    <tr><td>미래편 3장 알래스카</td><td>40초</td></tr>
    <tr><td>미래편 3장 멕시코</td><td>44초</td></tr>
    <tr><td>미래편 3장 달</td><td>51초</td></tr>
    <tr><td>미래편 3장 버뮤다</td><td>61초</td></tr>
    <tr><td>미래편 3장 부유대륙</td><td>68초</td></tr>
   </tbody></table>
   <ul>
    <li>아군 성이 한 번도 맞지 않았습니다. 수입·지갑 업그레이드는 최대 상태였습니다.</li>
    <li><b>2장 추천 덱을 그대로 써도</b> 가장 어려운 미래편 3장 부유대륙을 82초에 깼습니다. 새로 덱을 짜지 않아도 됩니다.</li>
    <li>막히는 경우는 <b>덱을 덜 채웠을 때</b>입니다. 레드·옐로우·오렌지 3명만으로 부유대륙(3장)에 들어가면 200초 안에 지고 성이 무너졌습니다. 덱 10칸을 채우고 전원 레벨을 올리세요.</li>
    <li>미래편 새 아군은 에일리언·빨강·검정·천사·떠 있는 적 같은 <b>특정 상대에 특화</b>되어 있습니다. 시험 도구에서 3명 덱에 한 명 더할 때 가장 크게 도운 건 아이보리·민트·라벤더(지원형)와 네이비였습니다.</li>
    <li>뽑기 캐릭터(울슈레)로 짠 덱도 전 스테이지를 깼습니다. 이 표는 뽑기 없이 잰 것이며 울슈레와의 비교는 하지 않았습니다.</li>
   </ul>
   <p class="wg-note">전원 Lv.20, 수입·지갑 최대 상태에서 한 번씩 해 본 결과입니다. 레벨이 낮거나 업그레이드가 덜 된 상태는 해 보지 않았습니다.</p>`},
  {title:'22. 미래편 진행 결과',html:()=>`
   <p>세계편 3장을 끝내고 뽑기 캐릭터까지 쓴 덱(전원 <b>Lv.20</b>)으로 사이트에서 직접 해 본 결과, <b>미래편 1·2·3장 144스테이지를 모두 첫 시도에 깼습니다.</b></p>
   <ul>
    <li>뽑기를 연 뒤 보관함의 확정권으로 울슈레를 모아 덱 10명(레드·옐로우·프리즘·앰버·나이트·사파이어·아쿠아마린·퓨샤·오키드·라임)을 짰습니다. 수입은 끝까지 올렸습니다.</li>
    <li>세계편 3장에서 받은 XP가 충분해서 레벨 때문에 막힌 적은 없었습니다. <b>레벨이 낮은 상태로 미래편에 들어가면 어떻게 되는지는 해 보지 않았습니다.</b></li>
    <li>미래편은 일반 스테이지만 깨도 확정권이 매번 들어옵니다. 뽑기는 위키 뽑기 장을 참고하세요.</li>
   </ul>
   <p class="wg-note">막히면 <b>덱 전원 레벨</b>과 <b>수입 업그레이드</b>부터 점검하세요(막혔을 때 점검표). 미래편 스테이지별 클리어 시간은 기록하지 못했습니다.</p>`},
  {group:'우주편',title:'23. 우주편 1장',html:()=>`
   <p>미래편 3장 마지막 스테이지를 깨면 <b>우주편 1장</b>(스테이지 48개)이 열립니다. 우주편은 1장 다음에 <b>2장</b>이 이어집니다(v7.0.0).</p>
   <ul>
    <li>같은 덱(전원 Lv.20)으로 사이트에서 <b>48스테이지를 모두 첫 시도에 깼습니다.</b> 마지막 스테이지 '빅뱅'은 <b>40초</b>였습니다.</li>
    <li>일반 스테이지 <b>확정권 1장</b>, 마지막 스테이지 <b>확정권 10장</b>.</li>
    <li><b>우주편 보물 1/3</b>이 완성됩니다: 클리어 XP +25%, 메탈·좀비·에일 대상 능력 강화, 별 에일 보물 5세트, 신님 가면.</li>
   </ul>
   <p class="wg-note">우주편 1장 빅뱅을 깨면 <b>우주편 2장</b>(48스테이지)이 열립니다. 2장은 이 공략에서 직접 해 보지 않았습니다. 별 에이리언의 베리어가 크니 한 방이 센 아군과 베리어 브레이커를 준비하세요.</p>`},
  {group:'레전드 스토리',title:'24. 레전드 스토리 ★1',html:()=>`
   <p><b>세계편 1장 달</b>을 깨면 열리는 별도 스테이지 묶음입니다. 서브챕터 <b>40개</b>, 스테이지 <b>273개</b>(40장은 v6.9.0에서 추가됐고 6스테이지). 스테이지 선택 화면의 '레전드'에서 들어갑니다.</p>
   <ul>
    <li>앞 서브챕터를 <b>★1로 모두 깨야</b> 다음 서브챕터가 열립니다. 서브챕터 안에서는 스테이지를 하나 깰 때마다 다음이 열립니다.</li>
    <li>한 서브챕터의 ★1을 다 깨면 같은 서브챕터의 <b>★2</b> 난이도가 열립니다(★3, ★4도 순서대로). ★4는 EX·레어만 낼 수 있습니다.</li>
    <li>보상: 스테이지를 처음 깰 때 <b>XP와 확정권 ★n장</b>, 서브챕터를 다 깨면 <b>확정권 10장</b>. ★1 전체는 확정권 약 <b>673장</b>입니다(스테이지 273 + 서브챕터 40×10).</li>
    <li>'탈옥터널'의 <b>대탈주</b>를 처음 깨면 EX <b>옵시디언</b>을 얻습니다. '전설의 시작' ★2를 모두 깨면 EX 토파즈입니다.</li>
   </ul>`},
  {title:'25. 레전드 ★1 시험 결과',html:()=>`
   <p>세계편·미래편·우주편 1장을 끝내고(전원 Lv.20 울슈레 덱, 수입 최대) 사이트에서 <b>레전드 1~39장 ★1 267스테이지를 모두 첫 시도에 깼습니다.</b> 40장(6스테이지)은 그 뒤 추가돼 해 보지 않았습니다.</p>
   <ul>
    <li>스테이지 하나는 <b>24~87초</b>, 대부분 30~50초입니다. 가장 오래 걸린 곳은 이베리코 평야(87초), 무기력 코스터(77초), 하이테크 다시마잡이(75초)였습니다.</li>
    <li>이 시험이 끝났을 때 확정권 <b>885장</b>이 보관함에 남았고, 뽑기 캐릭터는 47종이었습니다.</li>
    <li>★2~★4와 레벨이 낮은 계정은 해 보지 않았습니다. ★1은 덱이 강하면 어렵지 않습니다.</li>
   </ul>
   <p class="wg-note">레전드 ★1은 XP와 확정권을 함께 주기 때문에, 확정권을 모으는 가장 큰 통로입니다(서브챕터 40개 × 10장 + 스테이지 273장).</p>`}
 ];
 // 스테이지 탭에서 보이는 한 줄 팁(스테이지 번호 → 팁)
 const TIPS={143:'세계편 마지막 보스(약 1분). 깨면 EX 셀레나이트, 확정권 10장, 3장 보물, 미래편이 열립니다.',6:'깨면 그린이 해금되고 뽑기가 열립니다.',47:'1장 마지막 보스. 깨면 1장 보물, 확정권 10장, 2장이 열립니다.',95:'2장 마지막 보스(약 2분 30초). 깨면 오닉스(EX) 해금, 레벨 상한 Lv.20, 확정권 10장.',2:'레드만으로 깰 수 있습니다. 깨면 오렌지가 해금됩니다.',16:'여기부터 캐릭터 강화가 필요합니다. 덱 전원 Lv.4 이상으로 올리세요.',33:'레드만으로도 깰 수 있지만 2~9분 걸립니다. 아군을 덱에 넣으면 훨씬 빠릅니다.',44:'덱 세팅이 필수입니다. 레드만으로는 깰 수 없습니다.',45:'시작하자마자 다람쥐 20마리가 몰려옵니다. 수입 업그레이드보다 방어를 먼저 뽑으세요.',47:'마지막 보스전(약 3분). 전투 중 수입을 계속 올리세요.'};

 const style=document.createElement('style');
 style.textContent=`
 #wikiGuide{margin-top:20px;display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start}
 #wikiGuide.hidden{display:none}
 .wg-toc{flex:0 0 220px;display:flex;flex-direction:column;gap:8px}
 .wg-group{margin-top:6px;font-size:12px;font-weight:800;color:#e6a735;letter-spacing:.5px}
 .wg-toc button{background:#233149;color:#b9c8dd;border:1px solid #4d6685;border-radius:10px;padding:10px 12px;cursor:pointer;font-weight:800;text-align:left}
 .wg-toc button.active{background:#e86e44;color:#fff;border-color:#e86e44}
 .wg-body{flex:1 1 360px;min-width:0;background:#1a2a42;border:1px solid #445b7c;border-radius:16px;padding:20px 22px;line-height:1.65;color:#e8eef8}
 .wg-body h2{margin:0 0 12px;font-size:22px}
 .wg-body p{margin:10px 0}
 .wg-body ul{margin:10px 0;padding-left:20px}
 .wg-body li{margin:6px 0}
 .wg-note{background:#233149;border-left:4px solid #e6a735;padding:10px 12px;border-radius:6px;font-size:14px}
 .wg-table{width:100%;border-collapse:collapse;margin:12px 0;font-size:14px}
 .wg-table th,.wg-table td{border:1px solid #445b7c;padding:7px 9px;text-align:left;vertical-align:top}
 .wg-table th{background:#233149}
 .wg-nav{display:flex;justify-content:space-between;gap:10px;margin-top:18px}
 .wg-nav button{background:#30435f;color:#fff;border:1px solid #7286a1;border-radius:10px;padding:9px 14px;cursor:pointer;font-weight:800}
 .wg-nav button:disabled{opacity:.35;cursor:default}
 .codex-guide-tip{margin:12px 0 0;padding:10px 12px;background:#233149;border-left:4px solid #e6a735;border-radius:6px;font-size:14px;line-height:1.5}
 @media(max-width:700px){.wg-toc{flex:1 1 100%;flex-direction:row;flex-wrap:wrap}}`;
 document.head.append(style);

 const tabs=document.querySelector('#codexMenu .codex-tabs'),panel=document.querySelector('#codexMenu .codex-panel');
 const tab=document.createElement('button');tab.id='codexGuideTab';tab.type='button';tab.className='codex-tab hidden';tab.textContent='초보자 공략';tabs.prepend(tab);
 const guide=document.createElement('div');guide.id='wikiGuide';guide.className='hidden';panel.append(guide);
 let current=0;
 function renderGuide(){
  guide.innerHTML='';
  const toc=document.createElement('div');toc.className='wg-toc';
  let lastGroup='';
  CH.forEach((c,i)=>{if(c.group&&c.group!==lastGroup){const h=document.createElement('div');h.className='wg-group';h.textContent=c.group;toc.append(h);lastGroup=c.group}const b=document.createElement('button');b.type='button';b.textContent=c.title;b.className=i===current?'active':'';b.onclick=()=>{current=i;renderGuide()};toc.append(b)});
  const body=document.createElement('div');body.className='wg-body';
  body.innerHTML=`<h2>${CH[current].title}</h2>${CH[current].html()}`;
  const nav=document.createElement('div');nav.className='wg-nav';
  const prev=document.createElement('button');prev.type='button';prev.textContent='← 이전';prev.disabled=current===0;prev.onclick=()=>{current--;renderGuide()};
  const next=document.createElement('button');next.type='button';next.textContent='다음 →';next.disabled=current===CH.length-1;next.onclick=()=>{current++;renderGuide()};
  nav.append(prev,next);body.append(nav);
  guide.append(toc,body);
 }
 const HIDE=['.codex-body','#codexGradeTabs','#codexStageGroups','#codexGrid'];
 function setGuide(on){
  for(const s of HIDE){const el=document.querySelector('#codexMenu '+s);if(el)el.style.display=on?'none':''}
  guide.classList.toggle('hidden',!on);
  if(on)for(const t of document.querySelectorAll('#codexMenu .codex-heading .codex-tab'))t.classList.toggle('active',t===tab);
  else tab.classList.remove('active');
  tab.classList.toggle('hidden',!codexWiki);
 }
 const baseOpen=openCodex;
 openCodex=function(t){
  if(t==='guide'){baseOpen('ally');setGuide(true);renderGuide()}
  else{baseOpen(t);setGuide(false)}
 };
 tab.onclick=()=>openCodex('guide');
 // 위키 버튼: 1장 마지막 스테이지(달)를 아직 못 깼으면 공략 탭이 먼저 열린다.
 const wikiBtn=document.querySelector('#wikiBtn');
 if(wikiBtn)wikiBtn.onclick=()=>{codexWiki=true;codexGrade='all';openCodex(cleared.includes(CHAPTER1_LEN-1)?'ally':'guide')};
 // 스테이지 탭: 막히기 쉬운 스테이지에 한 줄 팁
 const baseStagePreview=renderCodexPreview;
 renderCodexPreview=function(){
  baseStagePreview.apply(this,arguments);
  if(codexTab!=='stage')return;
  const tip=TIPS[codexType];const ex=document.querySelector('#codexExtra');
  if(!tip||!ex)return;
  ex.querySelector('.codex-guide-tip')?.remove();
  const p=document.createElement('p');p.className='codex-guide-tip';p.innerHTML='<b>공략 팁</b> '+tip;ex.append(p);
 };
})();
