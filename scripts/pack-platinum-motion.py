"""Crop generated poses and package them; never repaint character artwork."""
from pathlib import Path
import json, statistics, ast
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/platinum-motion'; OUT.mkdir(parents=True,exist_ok=True)
PREVIEW=ROOT/'work/platinum-motion'; PREVIEW.mkdir(parents=True,exist_ok=True)
atlases={}; audit={}
# Reuse the established transparent-gutter cropper without running its asset build.
module=ast.parse((ROOT/'scripts/pack-subspecies-motion.py').read_text(encoding='utf-8'))
node=next(n for n in module.body if isinstance(n,ast.FunctionDef) and n.name=='column_seam')
exec(compile(ast.Module(body=[node],type_ignores=[]),'<gutter-crop>','exec'))
def bounds(hist,n):
    total=len(hist);cuts=[0]
    for i in range(1,n):
        middle=total*i/n;lo=round(middle-total/n*.12);hi=round(middle+total/n*.12)
        cut=min(range(lo,hi),key=lambda k:(hist[k],abs(k-middle)))
        cuts.append(cut)
    return cuts+[total]
for form in [1,2]:
    source=ROOT/f'reference-sheets/platinum-motion/platinum-{form}-source.png'
    im=Image.open(source).convert('RGBA');alpha=im.getchannel('A')
    assert alpha.getextrema()==(0,255),'source must have real transparency'
    mask=alpha.point(lambda v:255 if v>40 else 0)
    pixels=np.array(im);a=pixels[:,:,3]
    horizontal=[np.zeros(im.width,dtype=int)]+[column_seam(a.T,r,3)[0] for r in range(1,3)]+[np.full(im.width,im.height,dtype=int)]
    cells=[];details=[]
    for row in range(3):
        top,bottom=horizontal[row],horizontal[row+1];y0=int(top.min());y1=int(bottom.max())
        band=pixels[y0:y1].copy();yy=np.arange(y0,y1)[:,None]
        band[(yy<top[None,:])|(yy>=bottom[None,:])]=0
        height,width=band.shape[:2]
        seams=[np.zeros(height,dtype=int)]+[column_seam(band[:,:,3],c)[0] for c in range(1,4)]+[np.full(height,width,dtype=int)]
        for col in range(4):
            left,right=seams[col],seams[col+1];x0=int(left.min());x1=int(right.max())
            region=band[:,x0:x1].copy();xx=np.arange(x0,x1)[None,:]
            region[(xx<left[:,None])|(xx>=right[:,None])]=0
            cell=Image.fromarray(region)
            box=cell.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox()
            assert box,(form,row,col,'empty')
            cells.append(cell.crop(box));details.append({'row':row,'col':col,'bounds':box})
    scale=180/statistics.median(c.height for c in cells[:4])
    frames=[]
    for cell in cells:
        cell=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.LANCZOS)
        assert cell.width<252 and cell.height<236,(form,'frame overflow',cell.size)
        frame=Image.new('RGBA',(256,256));frame.alpha_composite(cell,((256-cell.width)//2,240-cell.height));frames.append(frame)
    sheet=Image.new('RGBA',(1024,768))
    for i,frame in enumerate(frames):sheet.alpha_composite(frame,((i%4)*256,(i//4)*256))
    sheet.save(OUT/f'platinum_{form}.webp',lossless=True)
    frames[0].save(OUT/f'platinum_{form}-profile.webp',lossless=True)
    poses=[[i%4*256,i//4*256,256,256,128,16] for i in range(12)]
    atlases[f'platinum_{form}']={'sheet':f'assets/platinum-motion/platinum_{form}.webp?v=1','scale':.5,'left':21,'flip':False,'groundAnchor':True,'bodyWidth':64,'walkStep':.12,'strike':2,'continuousAttack':True,'walk':poses[:4],'attack':poses[4:10],'hurt':[poses[10]],'hurtRecovery':poses[11]}
    for name,indices,duration in [('walk',list(range(4)),130),('attack',list(range(4,10)),120),('hurt',[10,11],220),('all',list(range(12)),150)]:
        previews=[]
        for i in indices:
            bg=Image.new('RGBA',(256,256),'#dbe3ec');bg.alpha_composite(frames[i]);previews.append(bg.convert('RGB'))
        previews[0].save(PREVIEW/f'platinum-{form}-{name}.gif',save_all=True,append_images=previews[1:],duration=duration,loop=0,disposal=2)
    audit[form]={'source':str(source.relative_to(ROOT)),'poses':len(frames),'transparent':True,'sheet':[1024,768],'cellBounds':details}
(OUT/'atlases.json').write_text(json.dumps(atlases,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'platinum-motion-atlases.js').write_text('const PLATINUM_MOTION_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\n',encoding='utf-8')
(PREVIEW/'audit.json').write_text(json.dumps(audit,indent=2),encoding='utf-8')
print('Packed 24 poses: 2 forms x (4 walk + 6 attack + 2 hurt/recovery).')
