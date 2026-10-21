// 미래편 추천 덱 비교(뽑기 캐릭터 없이). 어려운 미래편 스테이지에서 덱별 클리어 시간. 사용: SEEDS=4 node scripts/w4-deck.cjs
const fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'w4-rank.cjs'),'utf8');
const mk=require('./full-harness.cjs');const root=path.resolve(__dirname,'..');
const m=src.match(/const HUMAN=`[\s\S]*?`;/)[0];eval(m.replace('const HUMAN','var HUMAN'));
const SEEDS=+(process.env.SEEDS||4);
const e=mk({fresh:true,extraSetup:HUMAN});const B=globalThis.__w2;
for(let i=0;i<=506;i++)B.cleared.push(i);
for(const t of B.ALLIES)B.training.levels[t]=20;
const decks={
 '2장 추천 덱':'red,yellow,orange,chartreuse,raspberry,salmon,gold,ivory,azure,blue',
 'A 방해형 중심':'red,yellow,orange,ivory,mint,lavender,white,navy,blue,onyx',
 'B 방해형+기본 딜러':'red,yellow,orange,ivory,mint,lavender,chartreuse,salmon,azure,blue',
 'C 방해형+레어 특화':'red,yellow,orange,ivory,mint,lavender,white,navy,peach,dandelion',
 'D 방해형만 추가':'red,yellow,orange,ivory,mint,lavender',
};
const stages=(process.env.ST||'206,505,503,498,495,491,399,506').split(',').map(Number);
const secOf=(deck,i,seed)=>{const r=e.simulate(i,1,deck,seed,600,'human');return r.win?r.seconds:600};
const res={};
console.log('스테이지:',stages.map(i=>i+' '+B.STAGES[i].name).join(' / '));
for(const [n,d] of Object.entries(decks)){const dk=d.split(',');const row=[];for(const i of stages){let s=0,w=0;for(let k=1;k<=SEEDS;k++){const r=e.simulate(i,1,dk,k,600,'human');if(r.win){w++;s+=r.seconds}}row.push(w===SEEDS?Math.round(s/SEEDS)+'s':w+'/'+SEEDS+'승'+(w?'('+Math.round(s/w)+'s)':''))}res[n]=row;console.log(n.padEnd(14),row.join('  '))}
fs.writeFileSync(path.join(root,'docs/simulations/w4-deck-2026-10-21.json'),JSON.stringify({seeds:SEEDS,stages,decks,res},null,1));
process.exit(0);
