"""Crop generated poses and package them; never repaint character artwork."""
from pathlib import Path
import json, statistics, ast
import numpy as np
from PIL import Image, ImageFilter
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/vermilion-motion'; OUT.mkdir(parents=True,exist_ok=True)
PREVIEW=ROOT/'work/vermilion-motion'; PREVIEW.mkdir(parents=True,exist_ok=True)
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
    source=ROOT/f'reference-sheets/vermilion-motion/vermilion-{form}-source.png'
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
    # The adjacent attack effect enters cell 5's gutter; select the character's right edge.
    for index in [5]:
        cell=cells[index];mask=np.array(cell.getchannel('A'))>100
        # A clear vertical gutter separates this foreign fragment from the character.
        density=mask.sum(axis=0);right=int(np.where(density>cell.height*.2)[0][-1])+4
        if right<cell.width:cells[index]=cell.crop((0,0,right,cell.height))
    # Align to the colored head, excluding black tools from the size estimate.
    heads=[]
    for cell in cells:
        rgba=np.array(cell);solid=(rgba[:,:,3]>100)&(rgba[:,:,0]>150)&(rgba[:,:,1]<140)&(rgba[:,:,2]<100)
        candidates=[]
        for y in range(round(cell.height*.18),round(cell.height*.55)):
            row=solid[y];edges=np.diff(np.r_[False,row,False].astype(int));starts=np.where(edges==1)[0];ends=np.where(edges==-1)[0]
            for left,right in zip(starts,ends):candidates.append((right-left,(left+right)/2,y))
        width,cx,cy=max(candidates)
        heads.append((width+8,cx))
    target=min(100,190/max(cx/w for c,(w,cx) in zip(cells,heads)),110/max((c.width-cx)/w for c,(w,cx) in zip(cells,heads)),245/max(c.height/w for c,(w,cx) in zip(cells,heads)))
    frames=[]
    for i,(cell,(width,cx)) in enumerate(zip(cells,heads)):
        scale=target/width
        cell=cell.resize((round(cell.width*scale),round(cell.height*scale)),Image.Resampling.LANCZOS)
        x=round(200-cx*scale);y=264-cell.height
        assert x>=2 and x+cell.width<=318 and y>=2,(form,i,'frame overflow',cell.size,x,y)
        frame=Image.new('RGBA',(320,288));frame.alpha_composite(cell,(x,y));frames.append(frame)
        details[i].update(headWidth=round(width,2),headCenter=round(cx,2),scale=round(scale,4),packed=[x,y,*cell.size])
    sheet=Image.new('RGBA',(1280,864))
    for i,frame in enumerate(frames):sheet.alpha_composite(frame,((i%4)*320,(i//4)*288))
    sheet.save(OUT/f'vermilion_{form}.webp',lossless=True)
    frames[8].save(OUT/f'vermilion_{form}-profile.webp',lossless=True)
    poses=[[i%4*320,i//4*288,320,288,200,24] for i in range(12)]
    atlases[f'vermilion_{form}']={'sheet':f'assets/vermilion-motion/vermilion_{form}.webp?v=1','scale':.5,'left':21,'flip':False,'groundAnchor':True,'bodyWidth':64,'walkStep':.12,'strike':2,'attackKeys':[[0,0],[5,1],[10.5,2],[17,3]],'continuousAttack':True,'walk':poses[:4],'attack':poses[4:8],'idle':poses[8:10],'idleStep':.65,'hurt':[poses[10]],'hurtRecovery':poses[11]}
    for name,indices,duration in [('walk',list(range(4)),130),('attack',list(range(4,8)),150),('idle',[8,9],650),('hurt',[10,11],220),('all',list(range(12)),150)]:
        previews=[]
        for i in indices:
            bg=Image.new('RGBA',(320,288),'#dbe3ec');bg.alpha_composite(frames[i]);previews.append(bg.convert('RGB'))
        previews[0].save(PREVIEW/f'vermilion-{form}-{name}.gif',save_all=True,append_images=previews[1:],duration=duration,loop=0,disposal=2)
    sheet.save(PREVIEW/f'contact-{form}.png')
    audit[form]={'source':str(source.relative_to(ROOT)),'poses':len(frames),'transparent':True,'sheet':[1280,864],'cellBounds':details}
(OUT/'atlases.json').write_text(json.dumps(atlases,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'vermilion-motion-atlases.js').write_text('const VERMILION_MOTION_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\n',encoding='utf-8')
(PREVIEW/'audit.json').write_text(json.dumps(audit,indent=2,default=lambda v:v.item()),encoding='utf-8')
print('Packed Vermilion: 2 forms, each 4 walk + 4 attack + 2 idle + hurt/recovery.')


