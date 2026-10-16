// X requires affirmative evidence of no niche, not merely a low composite.
const BANDS=[['OP',.90],['SSS',.79],['SS',.72],['S',.60],['A',.50],['B',.40],['C',.30],['D',.22],['E',.15],['F',-Infinity],['X',-Infinity]];
const qualifiedX=new Set();
function bandOf(score,id){return score<.08&&qualifiedX.has(id)?'X':BANDS.find(([n,t])=>n!=='X'&&score>=t)[0]}
function labels(res){const out={};for(const [n]of BANDS){const a=Object.entries(res).filter(([id,o])=>bandOf(o.comp,id)===n).sort((a,b)=>b[1].comp-a[1].comp||a[0].localeCompare(b[0]));const k=['OP','X'].includes(n)?0:Math.round(a.length/3);a.forEach(([id],i)=>out[id]=n+(i<k?'+':i>=a.length-k?'-':''))}return out}
module.exports={BANDS,bandOf,labels,qualifiedX};
