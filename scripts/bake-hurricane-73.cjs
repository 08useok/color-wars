// Original rigs rendered with battlecatsinfo/battlecats-animation-typescript (MIT).
const fs=require('fs'),path=require('path'),{stripTypeScriptTypes}=require('module');
const root=path.resolve(__dirname,'..'),ref=path.join(root,'reference-sheets/hurricane-73'),src=path.join(root,'reference-sheets/legend-26-27/renderer/src');
const canvas=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const modules=new Map();
function load(file){file=path.resolve(file);if(modules.has(file))return modules.get(file).exports;const module={exports:{}};modules.set(file,module);
 let source=fs.readFileSync(file,'utf8');if(file.endsWith('ModelPart.ts'))source=source.replace(/import \{ MaModel \} from "\.\/MaModel";/,'');
 let code=stripTypeScriptTypes(source,{mode:'transform'}),names=[];
 code=code.replace(/import \{([^}]+)\} from ["']([^"']+)["'];?/g,(_,n,p)=>`const {${n.replace(/ as /g,':')}}=require(${JSON.stringify(p)});`).replace(/import \* as (\w+) from ["']([^"']+)["'];?/g,(_,n,p)=>`const ${n}=require(${JSON.stringify(p)});`);
 code=code.replace(/export (class|function|const|let|var) (\w+)/g,(_,kind,n)=>{names.push(n);return kind+' '+n;});
 new Function('require','module','exports',code+'\n'+names.map(n=>`exports.${n}=${n};`).join('\n'))(p=>p==='#canvas'?{...canvas,createBitmap:async b=>canvas.loadImage(Buffer.from(await b.arrayBuffer()))}:load(path.resolve(path.dirname(file),p+'.ts')),module,module.exports);return module.exports;
}
const {AnimUnit}=load(path.join(src,'AnimUnit.ts')),{StrLineStream}=load(path.join(src,'StrLineStream.ts')),{ImgCut}=load(path.join(src,'ImgCut.ts')),{MaModel}=load(path.join(src,'MaModel.ts')),{MaAnim}=load(path.join(src,'MaAnim.ts')),{Canvas2DGraphics}=load(path.join(src,'canvas2d/Canvas2DGraphics.ts'));
const specs={hurricanecyclone:236};
(async()=>{for(const [name,id] of Object.entries(specs)){
 const data=JSON.parse(fs.readFileSync(path.join(ref,'raw',id+'-a'),'utf8')),c=canvas.createCanvas(1400,1100),g=new Canvas2DGraphics(c),img=await g.buildImg(new Blob([fs.readFileSync(path.join(ref,'raw',id+'-c.png'))]));
 g.drawBG=()=>g.clearWindow();g.translate(500,800);g.scale(.6,.6);
 const unit=new AnimUnit(g,ImgCut.load(new StrLineStream(data[0])),img,MaModel.load(new StrLineStream(data[1])),data.slice(2).map(s=>MaAnim.load(new StrLineStream(s))));
 const dir=path.join(ref,'frames',name);fs.mkdirSync(dir,{recursive:true});const modes={};
 for(const [label,mode] of [['walk',0],['attack',2],['hurt',3]]){unit.switchMode(mode);modes[label]=[];const len=label==='hurt'?1:unit.length();for(let frame=0;frame<len;frame+=(label==='walk'?8:2)){unit.drawFrame(frame);const file=label+'-'+String(frame).padStart(3,'0')+'.png';fs.writeFileSync(path.join(dir,file),c.toBuffer('image/png'));modes[label].push(file);}}
 fs.writeFileSync(path.join(dir,'modes.json'),JSON.stringify(modes));console.log(name,Object.fromEntries(Object.entries(modes).map(([k,v])=>[k,v.length])));
}})().catch(e=>{console.error(e);process.exitCode=1});
