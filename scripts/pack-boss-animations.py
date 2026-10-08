from pathlib import Path
from PIL import Image,ImageDraw
import json,math
import numpy as np
def keep_largest_alpha(im):
 pixels=np.array(im);mask=pixels[:,:,3]>0;parent=[];runs=[];previous=[]
 def root(i):
  while parent[i]!=i:parent[i]=parent[parent[i]];i=parent[i]
  return i
 for y,row in enumerate(mask):
  changes=np.diff(np.r_[False,row,False].astype(np.int8));starts=np.where(changes==1)[0];ends=np.where(changes==-1)[0];current=[]
  for a,b in zip(starts,ends):
   i=len(parent);parent.append(i)
   for c,d,j in previous:
    if a<d and b>c:parent[root(i)]=root(j)
   current.append((int(a),int(b),i));runs.append((y,int(a),int(b),i))
  previous=current
 counts={}
 for y,a,b,i in runs:r=root(i);counts[r]=counts.get(r,0)+b-a
 largest=max(counts,key=counts.get)
 for y,a,b,i in runs:
  if root(i)!=largest:pixels[y,a:b,3]=0
 return Image.fromarray(pixels)
ROOT=Path(__file__).resolve().parents[1]
CONFIG={
 'bunbun':{'ref':0,'height':243*.5,'left':-49+27*.5,'lift':0},
 'face':{'ref':43,'height':127*.62,'left':-25,'lift':34*.62,'cut':740},
 'nyandam':{'ref':0,'height':190*.55,'left':-70,'lift':0}
}
def pack(name):
 cfg=CONFIG[name]; files=sorted((ROOT/f'exports/boss-animation/{name}-transparent/frames').glob('frame_*.png'))
 if not files: return
 images=[]
 for p in files:
  im=Image.open(p).convert('RGBA')
  if cfg.get('cut'):
   im=keep_largest_alpha(im)
  images.append(im)
 ref=images[cfg['ref']].getbbox(); ratio=min(1,max(.3,cfg['height']*2/(ref[3]-ref[1])));scale=cfg['height']/(ref[3]-ref[1])/ratio
 atlas=Image.new('RGBA',(4096,4096));x=y=rowh=0;frames=[]
 for im in images:
  b=im.getbbox();assert b[0]>0 and b[1]>0 and b[2]<im.width and b[3]<im.height,(name,b);crop=im.crop(b);crop=crop.resize((max(1,round(crop.width*ratio)),max(1,round(crop.height*ratio))),Image.Resampling.LANCZOS)
  if x+crop.width+2>4096:x=0;y+=rowh+2;rowh=0
  if y+crop.height>atlas.height:raise ValueError('Atlas too tall')
  atlas.paste(crop,(x,y));frames.append([x,y,crop.width,crop.height,round((ref[0]-b[0])*ratio,2),round((ref[3]-b[3])*ratio,2)])
  x+=crop.width+2;rowh=max(rowh,crop.height)
 atlas=atlas.crop((0,0,4096,y+rowh));output=ROOT/f'assets/boss_{name}_attack.webp';atlas.save(output,lossless=True,method=6)
 meta={'sheet':f'assets/boss_{name}_attack.webp','scale':round(scale,6),'left':cfg['left'],'lift':round(cfg['lift']/scale,4),'attackStep':1,'attack':frames}
 (ROOT/f'exports/boss-animation/{name}-atlas.json').write_text(json.dumps(meta),encoding='utf8')
 print(name,len(frames),atlas.size,output.stat().st_size,'reference',ref)
for name in CONFIG:pack(name)
