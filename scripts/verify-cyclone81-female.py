from pathlib import Path
from PIL import Image
import json,hashlib
root=Path(__file__).resolve().parents[1];out=root/'assets/cyclone-allies-81-motion';meta=json.loads((out/'atlases.json').read_text());rows=[]
for id,m in meta.items():
 im=Image.open(root/m['sheet'].split('?')[0]).convert('RGBA');assert im.size==(1536,1024);assert im.getchannel('A').getextrema()[0]==0
 assert [len(m[k]) for k in ['idle','walk','attack','hurt']]==[4,4,7,1]
 for mode in ['idle','walk','attack','hurt']:
  for x,y,w,h,*_ in m[mode]:
   assert 0<=x<x+w<=im.width and 0<=y<y+h<=im.height
   box=im.crop((x,y,x+w,y+h)).getchannel('A').point(lambda v:255 if v>96 else 0).getbbox();assert box and box[0]>0 and box[1]>0 and box[2]<w and box[3]<h,(id,mode,box)
 assert '?v=2' in m['sheet'];rows.append({'id':id,'frames':16,'transparent':True,'bounds':True,'hash':hashlib.sha256((root/m['sheet'].split('?')[0]).read_bytes()).hexdigest()})
(root/'work/cyclone-allies-81-motion/female-validation.json').write_text(json.dumps(rows,indent=2),encoding='utf-8');print('PASS female 1/2 forms: 64 frames, alpha, bounds and v2 refs')
