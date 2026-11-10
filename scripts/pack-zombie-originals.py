"""8.0 신규 적 13종: bake-80-enemies.cjs가 만든 프레임(2프레임 간격)을 시트(assets/anim_<키>.webp)와 atlas.json으로 묶는다.
모델 원점(지면 기준점)을 보존한다(groundAnchor). 용량을 줄이려고 적마다 OPT로 다음을 고른다.
  walk/attack : 프레임을 k개에 하나만 쓴다(walkStep = 2k/30초, attackStep = 2k). 걷기 루프가 원작에서 504프레임까지 가는 적이 있다.
  res         : 그림을 이 비율로 줄이고 scale을 그만큼 키운다(화면 크기는 같다). 화면 가득한 보스만 쓴다.
  손실 webp(quality 90, alpha 100)로 저장한다. 산출: reference-sheets/puffington/atlas.json, work/enemies-80/enemies.png(미리보기)
"""
from pathlib import Path
from PIL import Image, ImageDraw
import json
ROOT = Path(__file__).resolve().parents[1]
REF = ROOT / 'reference-sheets/zombie-originals'
names = ['zbore','zbrollow','zcamelle','zostrich','zdagshund','zthrillerz']
OPT = {
    'truebunbun': {'walk': 2},
    'supermayor': {'attack': 2},
    'ministercyclone': {'walk': 2},
    'gardeneels': {'attack': 2},
    'looper': {'attack': 2},
    'finalgod': {'res': .5, 'walk': 2, 'attack': 3},
    'dogumaru': {'walk': 3, 'attack': 2},
}
SCALE = .833
metadata = {}
preview = Image.new('RGB', (1900, 560), '#d4e3eb')
draw = ImageDraw.Draw(preview)
for i, name in enumerate(names):
    folder = REF / 'frames' / name
    modes = json.loads((folder / 'modes.json').read_text())
    OX, OY = modes.pop('origin', [500, 800])
    opt = OPT.get(name, {})
    res = opt.get('res', 1)
    sheet = Image.new('RGBA', (4096, 8192))
    x = y = rowh = 0
    meta = {'sheet': f'assets/anim_{name}.webp?v=1', 'scale': round(SCALE / res, 4), 'left': 21, 'groundAnchor': True}
    for mode, files in modes.items():
        k = opt.get(mode, 1)
        files = files[::k]
        if mode == 'walk': meta['walkStep'] = round(2 * k / 30, 5)
        if mode == 'attack': meta['attackStep'] = 2 * k
        rects = []
        for file in files:
            im = Image.open(folder / file).convert('RGBA')
            b = im.getbbox()
            assert b and b[0] > 0 and b[1] > 0 and b[2] < im.width and b[3] < im.height, (name, file, b)
            crop = im.crop(b)
            ox, oy = OX - b[0], OY - b[3]
            if res != 1:
                crop = crop.resize((max(1, round(crop.width * res)), max(1, round(crop.height * res))), Image.LANCZOS)
                ox, oy = round(ox * res), round(oy * res)
            if x + crop.width + 2 > 4096: x = 0; y += rowh + 2; rowh = 0
            assert y + crop.height < 8192, (name, 'sheet too tall')
            sheet.paste(crop, (x, y))
            rects.append([x, y, crop.width, crop.height, ox, oy])
            x += crop.width + 2
            rowh = max(rowh, crop.height)
        meta[mode] = rects
    meta['bodyWidth'] = round(meta['walk'][0][2] * meta['scale'], 1)
    meta['walkLen'] = len(meta['walk'])
    sheet = sheet.crop((0, 0, 4096, y + rowh))
    # 오른쪽 빈 열을 잘라 시트 폭을 줄인다
    bb = sheet.getbbox()
    sheet = sheet.crop((0, 0, bb[2], sheet.height))
    out = ROOT / f'assets/anim_{name}.webp'
    sheet.save(out, quality=90, alpha_quality=100, method=6)
    meta['sheetSize'] = list(sheet.size)
    metadata[name] = meta
    print(f'{name:16s} walk {len(meta["walk"]):3d} attack {len(meta["attack"]):3d} sheet {sheet.size} {out.stat().st_size // 1024} KB')
    first = Image.open(folder / modes['walk'][0])
    tile = first.crop(first.getbbox())
    tile.thumbnail((140, 200))
    cx, cy = (i % 13) * 146, 240
    preview.paste(tile, (cx + (146 - tile.width) // 2, cy - tile.height), tile)
    draw.text((cx + 6, cy + 6), name, fill='black')
(REF / 'atlas.json').write_text(json.dumps(metadata), encoding='utf-8')
out = ROOT / 'work/zombie-originals'
out.mkdir(parents=True, exist_ok=True)
preview.save(out / 'enemies.png')
print('Packed', len(metadata), 'original enemy atlases')

(ROOT/'zombie-original-atlases.js').write_text('const ZOMBIE_ORIGINAL_ATLASES='+json.dumps(metadata,separators=(',',':'))+';\n',encoding='utf-8')
