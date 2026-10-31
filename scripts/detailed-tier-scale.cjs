const TOP=['OP','SSS+','SSS','SSS-','SS+','SS','SS-','S+','S','S-'];
function makeScale(rows){
 const upper={};for(const [base,lo,hi]of [['SSS',.79,.9],['SS',.72,.79],['S',.6,.72]]){
  const values=t=>rows.filter(r=>!r.coreMember&&r.tier===t).map(r=>r.score),plus=values(base+'+'),mid=values(base),minus=values(base+'-');
  upper[base]={lo,hi,plus:plus.length&&mid.length?(Math.min(...plus)+Math.max(...mid))/2:lo+(hi-lo)*2/3,mid:mid.length&&minus.length?(Math.min(...mid)+Math.max(...minus))/2:lo+(hi-lo)/3};
 }
 const entries=TOP.map((label,i)=>({id:'top_'+label.replace('+','plus').replace('-','minus'),label,order:i,group:'upper'}));
 for(let i=0;i<24;i++){const letter=String.fromCharCode(65+i),suffixes=i<16?['++','+','','-','--']:['+','','-'];for(const suffix of suffixes){const label=(letter==='S'?'하위 S':letter)+suffix;entries.push({id:'lower_'+letter+'_'+(suffix||'plain').replaceAll('+','plus').replaceAll('-','minus'),label,order:entries.length,group:i<16?'middle':'lower',letter,suffix,upper:.6-i*.025-suffixes.indexOf(suffix)*(.025/suffixes.length),lower:Math.max(0,.6-i*.025-(suffixes.indexOf(suffix)+1)*(.025/suffixes.length))});}}
 return {version:1,upper,entries};
}
function classify(score,scale){
 if(!Number.isFinite(score)||score<0||score>1)throw Error('Score must be in [0,1]');
 if(score>=.9)return 'OP';for(const base of ['SSS','SS','S']){const b=scale.upper[base];if(score>=b.lo)return base+(score>=b.plus?'+':score>=b.mid?'':'-');}
 const i=Math.min(23,Math.max(0,Math.floor((.6-score-1e-12)/.025))),letter=String.fromCharCode(65+i),suffixes=i<16?['++','+','','-','--']:['+','','-'],hi=.6-i*.025,width=.025/suffixes.length;
 const sub=Math.min(suffixes.length-1,Math.max(0,Math.floor((hi-score-1e-12)/width)));
 return (letter==='S'?'하위 S':letter)+suffixes[sub];
}
module.exports={makeScale,classify};
