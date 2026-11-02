from pathlib import Path
from PIL import Image
import json
root=Path(__file__).resolve().parents[1];pre=root/'work/cyclones-81';pre.mkdir(exist_ok=True)
html='<!doctype html><html lang="ko"><meta charset="utf-8"><title>8.1 사이클론과 보상 아종</title><style>body{padding:24px;background:#e1e8ef;font:16px sans-serif;color:#223}section{background:white;padding:16px;margin:16px 0;border-radius:14px}.row{display:flex;flex-wrap:wrap;gap:12px}figure{margin:0;text-align:center}img{width:280px;max-width:100%}figcaption{padding:8px}</style><h1>8.1 사이클론 · 보상 아종</h1><p>고대·슈퍼 스페이스 원본 모션 / 탐사 민트시안·앵커 그레이 1·2진</p>'
for id,name in [('primevalcyclone','고대 사이클론'),('supercosmiccyclone','슈퍼 스페이스 사이클론')]:
 html+='<section><h2>'+name+'</h2><div class="row">'
 folder=root/'reference-sheets/cyclones-81/frames'/id;m=json.loads((folder/'modes.json').read_text())
 for mode,label in [('walk','이동'),('attack','공격')]:
  frames=[]
  for f in m[mode][::4 if mode=='walk' else 1]:
   im=Image.open(folder/f).convert('RGBA');im.thumbnail((420,330));bg=Image.new('RGBA',(420,330),'#dbe3ec');bg.alpha_composite(im,((420-im.width)//2,330-im.height));frames.append(bg.convert('RGB'))
  frames[0].save(pre/(id+'-'+mode+'.gif'),save_all=True,append_images=frames[1:],duration=267 if mode=='walk' else 67,loop=0)
  html+=f'<figure><img src="{id}-{mode}.gif"><figcaption>{label}</figcaption></figure>'
 html+='</div></section>'
for id,name in [('explorermintcyan','탐사 민트시안'),('anchorgrey','앵커 그레이')]:
 for f in [1,2]:
  html+=f'<section><h2>{name} {f}진</h2><div class="row">'
  for mode,label in [('idle','대기'),('walk','걷기'),('attack','공격'),('hurt','넉백')]:html+=f'<figure><img src="../cyclone-allies-81-motion/{id}_{f}-{mode}.gif"><figcaption>{label}</figcaption></figure>'
  html+='</div></section>'
(pre/'preview.html').write_text(html+'</html>',encoding='utf-8')
print('Preview ready')
