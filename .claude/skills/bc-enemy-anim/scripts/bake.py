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
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bcanim import Model


def opt(name, default):
    return type(default)(sys.argv[sys.argv.index(name) + 1]) if name in sys.argv else default


def is_shadow(s, cname, cut):
    # named a shadow AND drawn as a thin strip: some models label real body parts '影' (169 Hyppoh's body)
    return any(k in str(cname) + str(s['name']) for k in ('影', 'かげ')) and cut[3] <= max(8, cut[2] / 4)


def strip_baked_shadows(m, max_rows=5, dark=90):
    """Old sheets (000-048) draw the ground shadow into the pose itself, under the feet: an opaque dark strip wider
    than the feet (002 Those Guys), see-through black (008 Sir Seal) or a separate ellipse under a jump (014).
    Reference = the lowest row with body fill (bright pixels). Below it (at most max_rows rows) clear dark pixels
    outside the reference row's span and see-through dark pixels; a strip cut off from the body by an empty row
    is cleared whole. Cuts without bright fill near the bottom (all-black enemies) are left alone."""
    a = np.array(m.sheet); hit = 0
    for cut in m.cuts:
        x, y, w, h = cut[:4]
        if w < 8 or h < 8: continue
        c = a[y:y + h, x:x + w]; op = c[:, :, 3] > 20
        isdark = op & (c[:, :, :3].max(2) < dark); bright = (c[:, :, 3] > 128) & (c[:, :, :3].max(2) >= 200)
        bottom = h - 1
        while bottom >= 0 and not op[bottom].any(): bottom -= 1
        top = bottom
        while top > 0 and op[top - 1].any(): top -= 1
        if 0 < bottom - top + 1 <= max_rows and op[:top].any() and not (op[top:bottom + 1] & ~isdark[top:bottom + 1]).any():
            c[top:bottom + 1, :, 3] = 0; hit += 1; continue                  # detached ellipse under a jump
        ref = bottom
        while ref >= 0 and ref > bottom - max_rows - 3 and bright[ref].sum() < 3: ref -= 1
        if ref < 0 or bright[ref].sum() < 3 or ref == bottom: continue
        below = list(range(ref + 1, bottom + 1))
        if len(below) > max_rows: continue
        cols = np.where(op[ref])[0]; inside = np.zeros(w, bool); inside[max(0, cols.min() - 1):cols.max() + 2] = True
        changed = False
        for q in below:
            clear = isdark[q] & (~inside | (c[q, :, 3] < 200))
            if clear.any(): c[q, clear, 3] = 0; changed = True
        hit += changed
    m.sheet = Image.fromarray(a)
    return hit


def main():
    name, work, n = sys.argv[1], sys.argv[2], sys.argv[3].zfill(3)
    step, ss, hurt_f = opt('--step', 2), opt('--ss', 0.6), opt('--hurt-frame', 0)
    m = Model(f'{work}/{n}_e.json', f'{work}/{n}_e.png')
    if '--keep-baked-shadows' not in sys.argv: print('baked shadows stripped from', strip_baked_shadows(m), 'cuts')
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
