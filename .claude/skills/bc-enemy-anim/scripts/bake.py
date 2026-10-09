"""Bake an original enemy animation into one sprite sheet + frame table.

usage: python bake.py NAME WORK_DIR NNN [--step 2] [--ss 0.6] [--hurt-frame 0]

reads  WORK_DIR/NNN_e.json (wiki.py) and WORK_DIR/NNN_e.png
writes WORK_DIR/anim_NAME.png        packed frames (rows wrap at 4096 px)
       WORK_DIR/NAME.atlas.json      {walk, attack, hurt: [[x,y,w,h,ox,oy]...], walkLen, attackLen, partScale}
       WORK_DIR/NAME.preview.png     the sheet on a green background, to eyeball

ox/oy are the model's ground point inside each crop (ox from the crop's left edge, oy = how far the
crop's bottom sits above the ground point), which is exactly what NEW_ATLASES' 5th/6th values mean
when atlas.left is the ground point. Ground shadows (影 / かげ cuts or parts) are left out because
the game draws its own shadow.
"""
import json, os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bcanim import Model


def opt(name, default):
    return type(default)(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default


def is_shadow(s, cname, cut):
    # named a shadow AND drawn as a thin strip: some models label real body parts '影' (169 Hyppoh's body)
    return any(k in str(cname) + str(s['name']) for k in ('影', 'かげ')) and cut[3] <= max(8, cut[2] / 4)


def main():
    name, work, n = sys.argv[1], sys.argv[2], sys.argv[3].zfill(3)
    step, ss, hurt_f = opt('--step', 2), opt('--ss', 0.6), opt('--hurt-frame', 0)
    m = Model(f'{work}/{n}_e.json', f'{work}/{n}_e.png')
    Lw, La = m.length('Walk'), m.length('Attack')
    print('anims', list(m.anims), 'walk', Lw, 'attack', La)
    seq = [('walk', 'Walk', f) for f in range(0, max(Lw, 1), step)] + \
          [('attack', 'Attack', f) for f in range(0, La + 1, step)] + [('hurt', 'Knockback', hurt_f)]
    frames = []
    for st, an, f in seq:
        img, ox, oy = m.render(m.state(an, f), skip=is_shadow, ss=ss)
        bb = img.getbbox() or (0, 0, 1, 1); img = img.crop(bb)
        frames.append((st, img, round(ox - bb[0]), round(oy - bb[3])))
    rows, rw = [[]], 0
    for fr in frames:
        if rw + fr[1].width + 2 > 4096 and rows[-1]: rows.append([]); rw = 0
        rows[-1].append(fr); rw += fr[1].width + 2
    W = max(sum(i.width + 2 for _, i, _, _ in r) for r in rows); hs = [max(i.height for _, i, _, _ in r) for r in rows]
    sheet = Image.new('RGBA', (W, sum(h + 2 for h in hs))); ent = {'walk': [], 'attack': [], 'hurt': []}; y = 0
    for r, h in zip(rows, hs):
        x = 0
        for st, img, ox, lift in r:
            sheet.alpha_composite(img, (x, y + h - img.height))
            ent[st].append([x, y + h - img.height, img.width, img.height, ox, lift]); x += img.width + 2
        y += h + 2
    sheet.save(f'{work}/anim_{name}.png', optimize=True)
    # px of the original sheet per baked px: the biggest visible part scale x ss (bodies are often drawn at 1.79x)
    S0 = m.state('Walk', 0)
    def total(i):  # scale including every parent (a dummy root often carries the 1.79x)
        return abs(S0[i]['sx']) * (total(S0[i]['parent']) if S0[i]['parent'] != -1 else 1)
    part = max((total(s['id']) for s in S0 if not s['hidden'] and s['opacity'] > 0 and s['cut'] > 0), default=1)
    json.dump(dict(ent, walkLen=Lw, attackLen=La, partScale=part * ss, size=sheet.size), open(f'{work}/{name}.atlas.json', 'w'))
    bg = Image.new('RGBA', sheet.size, (200, 220, 200, 255)); bg.alpha_composite(sheet); bg.save(f'{work}/{name}.preview.png')
    print(f'{len(frames)} frames, sheet {sheet.size}, walk0 {ent["walk"][0]}, partScale {part * ss:.3f}')


if __name__ == '__main__':
    main()
