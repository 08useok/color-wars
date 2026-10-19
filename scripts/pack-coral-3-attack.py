"""Crop generated eight-pose combo without repainting artwork."""
from pathlib import Path
import ast,json,statistics
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
node=next(n for n in ast.parse((ROOT/'scripts/pack-subspecies-motion.py').read_text(encoding='utf-8')).body if isinstance(n,ast.FunctionDef) and n.name=='column_seam')
exec(compile(ast.Module(body=[node],type_ignores=[]),'<gutter>','exec'))
im=Image.open(ROOT/'assets/coral-3-concepts/coral-3-two-hit-source-v1.png').convert('RGBA');pixels=np.array(im);a=pixels[:,:,3]
assert a.min()==0 and a.max()==255
rows=[np.zeros(im.width,dtype=int),column_seam(a.T,1,2)[0],np.full(im.width,im.height,dtype=int)]
cells=[]
for row in range(2):
 top,bottom=rows[row:row+2];y0=int(top.min());y1=int(bottom.max());band=pixels[y0:y1].copy();yy=np.arange(y0,y1)[:,None]
 band[(yy<top[None,:])|(yy>=bottom[None,:])]=0
 h,w=band.shape[:2];seams=[np.zeros(h,dtype=int)]+[column_seam(band[:,:,3],c)[0] for c in range(1,4)]+[np.full(h,w,dtype=int)]
 for col in range(4):
  left,right=seams[col:col+2];x0=int(left.min());x1=int(right.max());region=band[:,x0:x1].copy();xx=np.arange(x0,x1)[None,:]
  region[(xx<left[:,None])|(xx>=right[:,None])]=0
  cell=Image.fromarray(region);box=cell.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox();assert box
  cells.append(cell.crop(box))
scale=190/statistics.median(c.height for c in cells);frames=[];sheet=Image.new('RGBA',(1024,512))
for i,cell in enumerate(cells):
 cell=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.LANCZOS);assert cell.width<250 and cell.height<235
 frame=Image.new('RGBA',(256,256));frame.alpha_composite(cell,((256-cell.width)//2,240-cell.height));sheet.alpha_composite(frame,((i%4)*256,i//4*256));frames.append(frame)
out=ROOT/'assets/coral-3-concepts';preview=ROOT/'work/coral-3-motion';preview.mkdir(parents=True,exist_ok=True)
sheet.save(out/'coral-3-attack-v1.webp',lossless=True)
backgrounds=[]
for frame in frames:
 bg=Image.new('RGBA',frame.size,'#dbe3ec');bg.alpha_composite(frame);backgrounds.append(bg.convert('RGB'))
backgrounds[0].save(preview/'two-hit-preview.gif',save_all=True,append_images=backgrounds[1:],duration=[160,160,200,120,140,200,120,220],loop=0,disposal=2)
contact=Image.new('RGBA',sheet.size,'#dbe3ec');contact.alpha_composite(sheet);contact.convert('RGB').save(preview/'contact.png')
(out/'attack-frames.json').write_text(json.dumps({'sheet':'coral-3-attack-v1.webp','attack':[[i%4*256,i//4*256,256,256,128,16] for i in range(8)],'hitFrames':[2,5],'note':'Visual draft only. Timing and combat integration not yet implemented.'},indent=2),encoding='utf-8')
assert Image.open(preview/'two-hit-preview.gif').n_frames==8
print('PASS 8 transparent attack poses; card hit frame3, whistle hit frame6; animated preview saved.')
