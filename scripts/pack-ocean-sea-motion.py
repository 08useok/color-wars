"""Crop/align generated transparent poses into runtime atlases; never repaint designs."""
from pathlib import Path
from PIL import Image, ImageDraw
import ast, json, statistics, sys
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
REF=ROOT/'reference-sheets/ocean-sea-motion';OUT=ROOT/'assets/ocean-sea-motion';PRE=ROOT/'work/ocean-sea-motion'
OUT.mkdir(parents=True,exist_ok=True);PRE.mkdir(parents=True,exist_ok=True)
tree=ast.parse((ROOT/'scripts/pack-subspecies-motion.py').read_text(encoding='utf-8'))
fn=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='column_seam')
exec(compile(ast.Module(body=[fn],type_ignores=[]),'<seam>','exec'))
ids=sys.argv[1:] or ['ocean_1','ocean_2','sea_1','sea_2']
combined=json.loads((OUT/'atlases.json').read_text()) if (OUT/'atlases.json').exists() else {}
audit={}
for id in ids:
 source=REF/(id+'-source.png')
 im=Image.open(source).convert('RGBA');p=np.array(im);alpha=p[:,:,3]
 # Some generated PNGs have opaque ink at alpha 252–254, which is valid RGBA.
 assert alpha.min()==0 and alpha.max()>=240,(id,'transparent background required')
 rows=[np.zeros(im.width,dtype=int)]+[column_seam(alpha.T,r,4)[0] for r in range(1,4)]+[np.full(im.width,im.height,dtype=int)]
 cells=[];crossings=[]
 for row in range(4):
  top,bottom=rows[row:row+2];y0=int(top.min());y1=int(bottom.max());band=p[y0:y1].copy();yy=np.arange(y0,y1)[:,None]
  band[(yy<top[None,:])|(yy>=bottom[None,:])]=0
  h,w=band.shape[:2];seams=[np.zeros(h,dtype=int)]
  for col in range(1,4):
   seam,cross=column_seam(band[:,:,3],col);seams.append(seam);crossings.append(cross)
  seams.append(np.full(h,w,dtype=int))
  for col in range(4):
   left,right=seams[col:col+2];x0=int(left.min());x1=int(right.max());q=band[:,x0:x1].copy();xx=np.arange(x0,x1)[None,:]
   q[(xx<left[:,None])|(xx>=right[:,None])]=0
   cell=Image.fromarray(q);box=cell.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox();assert box
   cell=cell.crop(box);cells.append(cell)
 target=120 if id.endswith('_1') else 180
 scale=min(target/statistics.median(c.height for c in cells[:4]),226/max(c.height for c in cells),344/max(c.width for c in cells))
 frames=[];placements=[];anchor=192
 for i,cell in enumerate(cells):
  a=np.array(cell);rgb=a[:,:,:3].astype(float)/255;hi=rgb.max(axis=2);lo=rgb.min(axis=2);r,g,b=[rgb[:,:,k] for k in range(3)]
  typ=id.split('_')[0]
  mask=(hi-lo>.20)&(hi>.25)
  mask&=a[:,:,3]>150;mask[round(cell.height*.8):]=False
  counts=mask.sum(axis=1);peak=int(counts.argmax());sel=mask[max(0,peak-8):min(cell.height,peak+9)]
  xs=np.where(sel)[1];headx=float(np.median(xs)) if len(xs)>15 else cell.width/2
  size=(max(1,round(cell.width*scale)),max(1,round(cell.height*scale)));q=cell.resize(size,Image.Resampling.LANCZOS)
  x=round(anchor-headx*scale);x=max(12,min(372-q.width,x));y=240-q.height
  assert x>=2 and y>=2 and x+q.width<383,(id,i,x,y,size)
  frame=Image.new('RGBA',(384,256));frame.alpha_composite(q,(x,y));frames.append(frame);placements.append([x,y,*size])
 sheet=Image.new('RGBA',(1536,1024))
 for i,frame in enumerate(frames):sheet.alpha_composite(frame,((i%4)*384,(i//4)*256))
 sheet.save(OUT/(id+'.webp'),lossless=True);frames[0].save(OUT/(id+'-profile.webp'),lossless=True)
 poses=[[i%4*384,i//4*256,384,256,anchor,16] for i in range(16)]
 combined[id]={'sheet':f'assets/ocean-sea-motion/{id}.webp?v=1','scale':.5,'left':21,'flip':False,'groundAnchor':True,'bodyWidth':64,'walkStep':.14,'attackStep':2,'strike':2,'continuousAttack':True,'idle':poses[:4],'idleStep':.4,'walk':poses[4:8],'attack':poses[8:15],'hurt':[poses[15]]}
 for mode,indices,ms in [('idle',range(4),400),('walk',range(4,8),140),('attack',range(8,15),140),('hurt',[15],400)]:
  gif=[]
  for i in indices:
   bg=Image.new('RGBA',(384,256),'#dbe3ec');bg.alpha_composite(frames[i]);gif.append(bg.convert('RGB'))
  gif[0].save(PRE/(id+'-'+mode+'.gif'),save_all=True,append_images=gif[1:],duration=ms,loop=0,disposal=2)
 sheet.save(PRE/(id+'-contact.png'));audit[id]={'source':str(source.relative_to(ROOT)),'sourceSize':list(im.size),'frames':16,'alpha':True,'scale':scale,'placements':placements,'gutterCrossings':crossings}
 print(id,'PASS: 4 idle / 4 walk / 7 attack-recovery / 1 knockback')
(OUT/'atlases.json').write_text(json.dumps(combined,indent=2),encoding='utf-8')
(OUT/'motion-atlases.js').write_text('const OCEAN_SEA_MOTION_ATLASES='+json.dumps(combined,separators=(',',':'))+';\n',encoding='utf-8')
old=json.loads((PRE/'audit.json').read_text()) if (PRE/'audit.json').exists() else {};old.update(audit);(PRE/'audit.json').write_text(json.dumps(old,indent=2),encoding='utf-8')
