"""Package generated walk/idle/one knockback pose with the approved attack."""
from pathlib import Path
import ast,json,statistics
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'assets/coral-3-concepts';PREVIEW=ROOT/'work/coral-3-motion'
node=next(n for n in ast.parse((ROOT/'scripts/pack-subspecies-motion.py').read_text(encoding='utf-8')).body if isinstance(n,ast.FunctionDef) and n.name=='column_seam')
exec(compile(ast.Module(body=[node],type_ignores=[]),'<gutter>','exec'))
im=Image.open(OUT/'coral-3-walk-idle-hurt-source-v1.png').convert('RGBA');pixels=np.array(im);a=pixels[:,:,3]
assert a.min()==0 and a.max()==255
rows=[np.zeros(im.width,dtype=int),column_seam(a.T,1,2)[0],np.full(im.width,im.height,dtype=int)];cells=[]
for row in range(2):
 top,bottom=rows[row:row+2];y0=int(top.min());y1=int(bottom.max());band=pixels[y0:y1].copy();yy=np.arange(y0,y1)[:,None]
 band[(yy<top[None,:])|(yy>=bottom[None,:])]=0
 h,w=band.shape[:2];seams=[np.zeros(h,dtype=int)]+[column_seam(band[:,:,3],c)[0] for c in range(1,4)]+[np.full(h,w,dtype=int)]
 for col in range(4):
  if row==1 and col==3:continue
  left,right=seams[col:col+2];x0=int(left.min());x1=int(right.max());region=band[:,x0:x1].copy();xx=np.arange(x0,x1)[None,:]
  region[(xx<left[:,None])|(xx>=right[:,None])]=0
  cell=Image.fromarray(region);box=cell.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox();assert box
  cells.append(cell.crop(box))
scale=190/statistics.median(c.height for c in cells[:6]);new=[]
for i,cell in enumerate(cells):
 cell=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.LANCZOS);assert cell.width<250 and cell.height<235
 frame=Image.new('RGBA',(256,256));frame.alpha_composite(cell,((256-cell.width)//2,240-cell.height-(10 if i==6 else 0)));new.append(frame)
old=Image.open(OUT/'coral-3-attack-v1.webp').convert('RGBA')
attack=[old.crop((i%4*256,i//4*256,i%4*256+256,i//4*256+256)) for i in range(8)]
frames=new[:4]+attack+new[4:6]+[new[6]]
sheet=Image.new('RGBA',(1024,1024))
for i,frame in enumerate(frames):
 b=frame.getchannel('A').getbbox();assert b and min(b[:2])>0 and max(b[2:])<256,(i,b)
 sheet.alpha_composite(frame,(i%4*256,i//4*256))
sheet.save(OUT/'coral-3-all-motion-v1.webp',lossless=True)
sheet.save(ROOT/'assets/coral_3.webp',lossless=True)
frames[12].save(ROOT/'assets/profile_coral_3.webp',lossless=True)
def pose(i):return [i%4*256,i//4*256,256,256,128,16]
atlas={'sheet':'assets/coral-3-concepts/coral-3-all-motion-v1.webp?v=1','scale':.5,'left':21,'flip':False,'groundAnchor':True,'bodyWidth':64,'walkStep':.13,'walk':[pose(i) for i in range(4)],'attack':[pose(i) for i in range(4,12)],'idle':[pose(12),pose(13)],'hurt':[pose(14)],'attackHitFrames':[2,5],'note':'Artwork preview only; combat hit timing and game integration are not set.'}
(OUT/'all-motion-atlas.json').write_text(json.dumps(atlas,ensure_ascii=False,indent=2),encoding='utf-8')
runtime={**atlas,'sheet':'assets/coral_3.webp?v=1','continuousAttack':True,'attackKeys':[[0,0],[6,1],[10.5,2],[13.5,3],[16.5,4],[19.5,5],[22,6],[23,7]]}
(ROOT/'coral-3-motion-atlas.js').write_text('const CORAL_THIRD_ATLAS='+json.dumps(runtime,separators=(',',':'))+';\n',encoding='utf-8')
for name,indices,timing in [('walk',range(4),130),('idle',[12,13],650),('attack',range(4,12),150)]:
 preview=[]
 for i in indices:
  bg=Image.new('RGBA',(256,256),'#dbe3ec');bg.alpha_composite(frames[i]);preview.append(bg.convert('RGB'))
 preview[0].save(PREVIEW/(name+'-preview.gif'),save_all=True,append_images=preview[1:],duration=timing,loop=0,disposal=2)
frames[14].save(OUT/'coral-3-knockback-v1.png')
bg=Image.new('RGBA',sheet.size,'#dbe3ec');bg.alpha_composite(sheet);bg.convert('RGB').save(PREVIEW/'all-motion-contact.png')
assert len(frames)==15 and len(atlas['hurt'])==1
assert Image.open(PREVIEW/'walk-preview.gif').n_frames==4
assert Image.open(PREVIEW/'idle-preview.gif').n_frames==2
print('PASS: walk4 + attack8 + idle2 + knockback1 = 15 transparent uncut poses.')
