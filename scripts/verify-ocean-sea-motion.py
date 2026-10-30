from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets/ocean-sea-motion';PRE=ROOT/'work/ocean-sea-motion'
meta=json.loads((OUT/'atlases.json').read_text());ids=['ocean_1','ocean_2','sea_1','sea_2'];assert set(meta)==set(ids)
poster=Image.new('RGB',(1536,288),'#dbe3ec');draw=ImageDraw.Draw(poster);checks=[]
for j,id in enumerate(ids):
 a=meta[id];im=Image.open(OUT/(id+'.webp')).convert('RGBA');assert im.size==(1536,1024);assert im.getchannel('A').getextrema()[0]==0
 assert [len(a[k]) for k in ['idle','walk','attack','hurt']]==[4,4,7,1]
 for mode in ['idle','walk','attack','hurt']:
  for x,y,w,h,*_ in a[mode]:
   assert x>=0 and y>=0 and x+w<=im.width and y+h<=im.height
   b=im.crop((x,y,x+w,y+h)).getchannel('A').point(lambda v:255 if v>96 else 0).getbbox()
   assert b and b[0]>0 and b[1]>0 and b[2]<w and b[3]<h,(id,mode,b)
  gif=Image.open(PRE/(id+'-'+mode+'.gif'));assert gif.n_frames>=1
 assert Image.open(PRE/(id+'-walk.gif')).n_frames==4
 tile=Image.open(OUT/(id+'-profile.webp')).convert('RGBA');bg=Image.new('RGBA',(384,256),'#dbe3ec');bg.alpha_composite(tile);poster.paste(bg.convert('RGB'),(j*384,0));draw.text((j*384+15,266),id,fill='#203c50')
 checks.append({'id':id,'frames':16,'transparent':True,'bounds':True,'walkGifFrames':4,'sha256':hashlib.sha256((OUT/(id+'.webp')).read_bytes()).hexdigest()})
poster.save(PRE/'overview.png');(PRE/'validation.json').write_text(json.dumps({'forms':4,'frames':64,'gifs':16,'checks':checks},indent=2),encoding='utf-8')
print('PASS 4 forms / 64 frames / 16 GIFs; alpha, bounds, four-step walking and preview files')
