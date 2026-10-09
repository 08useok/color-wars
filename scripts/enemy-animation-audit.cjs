const fs=require('fs'),path=require('path');
const {loadImage,createCanvas}=require('C:/Users/useok/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@napi-rs/canvas');
const h=fs.readFileSync(require.resolve('./battle-harness.cjs'),'utf8').replace('stageList:STAGES,','enemyOrder:ENEMY_ORDER,stageList:STAGES,');const m={exports:{}};new Function('require','module','__dirname',h)(require,m,__dirname);const e=m.exports({optimized:false});
for(const [t,sheet] of Object.entries({rabbit:'assets/elite_rabbit_sheet.png',kangaroo:'assets/kang_roo_sheet.png',mooth:'assets/mooth_sheet.png',face:'assets/face_sheet.png',...Object.fromEntries(['guys','hippo','pigge','peng','gory','baa','croco','seal'].map(t=>[t,'assets/'+t+'_dog-sprite.png']))}))if(e.atlases[t]&&!e.atlases[t].sheet)e.atlases[t].sheet=sheet;
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/enemy-animation-audit');fs.mkdirSync(out,{recursive:true});
(async()=>{const images=new Map(),issues=[],rows=[];
 for(const type of e.enemyOrder){const a=e.atlases[type];if(!a){rows.push({type,custom:true});continue}const r={type,walk:a.walk?.length||0,attack:(a.attackAtlas?.attack||a.attack)?.length||0,hurt:a.hurt?.length||0};rows.push(r);
  for(const mode of ['walk','attack','hurt']){const at=mode==='attack'&&a.attackAtlas?{...a,...a.attackAtlas}:a;const sheet=(at.sheet||(type==='face'?'assets/face_sheet.png':null))?.split('?')[0];if(!sheet){issues.push({type,mode,issue:'no sheet'});continue}if(!images.has(sheet))images.set(sheet,await loadImage(path.join(root,sheet)));const im=images.get(sheet);
   for(const [i,f] of (at[mode]||[]).entries()){const [x,y,w,h]=f;if(x<0||y<0||w<=0||h<=0||x+w>im.width||y+h>im.height)issues.push({type,mode,index:i,issue:'out of bounds',f,size:[im.width,im.height]});}
  }
 }
 console.log(JSON.stringify({issues}));
 for(let batch=0;batch<Math.ceil(rows.length/24);batch++){const slice=rows.slice(batch*24,batch*24+24),c=createCanvas(1200,slice.length*95),g=c.getContext('2d');g.fillStyle='#e3edf0';g.fillRect(0,0,c.width,c.height);g.font='14px sans-serif';
  for(const [i,r] of slice.entries()){g.fillStyle='#222';g.fillText(r.type,5,i*95+20);const a=e.atlases[r.type];if(!a){g.fillText('custom rig',150,i*95+40);continue}let col=0;for(const mode of ['walk','attack','hurt']){const at=mode==='attack'&&a.attackAtlas?{...a,...a.attackAtlas}:a,frames=at[mode]||a.walk;for(const idx of [...new Set([0,Math.floor(frames.length/2),frames.length-1])]){const [x,y,w,h]=frames[idx],im=images.get((at.sheet||(r.type==='face'?'assets/face_sheet.png':null)).split('?')[0]),k=Math.min(110/w,65/h);g.drawImage(im,x,y,w,h,150+col*115,i*95+75-h*k,w*k,h*k);g.fillText(mode+':'+idx,150+col*115,i*95+90);col++}}}
  fs.writeFileSync(path.join(out,'contact-'+batch+'.png'),c.toBuffer('image/png'));
 }
 fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify({rows,issues},null,2));console.log(JSON.stringify({count:rows.length,custom:rows.filter(r=>r.custom),issues,missingHurt:rows.filter(r=>!r.custom&&!r.hurt).map(r=>r.type)}));
})().catch(e=>{console.error(e);process.exitCode=1});
