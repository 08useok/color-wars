"""Pack the approved basic ally poses into the existing battle atlas format."""
import json
from pathlib import Path
from PIL import Image

SOURCE = Path('work/basic-redesign-motion')
OUT = Path('assets/basic-redesign-motion')
OUT.mkdir(exist_ok=True)
IDS = ['red','green','blue','orange','yellow','purple','pink','cyan']
W,H = 256,192


def cell(sheet,index,columns,rows):
    x,y=index%columns,index//columns
    return sheet.crop((round(x*sheet.width/columns),round(y*sheet.height/rows),
                       round((x+1)*sheet.width/columns),round((y+1)*sheet.height/rows)))


def frame(pose,form):
    result=Image.new('RGBA',(W,H))
    # Ignore faint generation residue when measuring the pose's visible bounds.
    visible=pose.getchannel('A').point(lambda value:255 if value>200 else 0).getbbox()
    pose=pose.crop(visible or pose.getbbox())
    pose.thumbnail((180,110 if form==1 else 150),Image.Resampling.LANCZOS)
    result.alpha_composite(pose,(128-pose.width//2,H-pose.height))
    return result


idle=Image.open(SOURCE/'idle-master.png').convert('RGBA')
atlases={}
for column,id in enumerate(IDS):
    for form in [1,2]:
        name=f'{id}-{form}'
        poses=[]
        if name=='red-1':
            walk=Image.open(SOURCE/'red-1-walk.png').convert('RGBA')
            attack=Image.open(SOURCE/'red-1-attack-hurt.png').convert('RGBA')
            poses=[cell(walk,i,6,1) for i in range(6)]+[cell(attack,i,4,1) for i in range(4)]
        else:
            file=SOURCE/(name+'-clean.png')
            if not file.exists():
                file=SOURCE/(name+'-motion.png')
            sheet=Image.open(file).convert('RGBA')
            poses=[cell(sheet,i,5,2) for i in range(10)]
        idle_pose=cell(idle,column+(form-1)*8,8,2)
        motions={'idle':[frame(idle_pose,form)],'walk':[frame(p,form) for p in poses[:6]],
                 'attack':[frame(p,form) for p in poses[6:9]],'hurt':[frame(poses[9],form)]}
        atlas=Image.new('RGBA',(W*6,H*2))
        meta=dict(sheet=f'assets/basic-redesign-motion/{id}_{form}.webp?v=1',
                  scale=.6,left=21,flip=False,groundAnchor=True,bodyWidth=64,
                  walkStep=.1,idleStep=1,continuousAttack=True,strike=1)
        index=0
        for mode,frames in motions.items():
            meta[mode]=[]
            for pose in frames:
                x,y=index%6*W,index//6*H
                atlas.paste(pose,(x,y))
                meta[mode].append([x,y,W,H,128,0])
                index+=1
        atlas.save(OUT/f'{id}_{form}.webp',lossless=True)
        portrait=motions['idle'][0].crop(motions['idle'][0].getbbox())
        portrait.save(OUT/f'{id}_{form}-profile.webp',lossless=True)
        atlases[f'{id}_{form}']=meta
(OUT/'motion-atlases.js').write_text('const BASIC_REDESIGN_ATLASES='+json.dumps(atlases,separators=(',',':'))+';\n',encoding='utf-8')
