# Battle Cats model animation player, ported from The Battle Cats Wiki AnimationViewer gadget
# (MediaWiki:Gadget-AnimationViewer.js: createSprite / showFrame / modify / updateSprites / drawFrame).
# Renders frames of an enemy (imgcut + mamodel + maanim JSON + NNN_e.png) with PIL.
import json, math, copy
import numpy as np
from PIL import Image

class Model:
    def __init__(self, json_path, sheet_path):
        d = json.load(open(json_path, encoding='utf-8-sig'))
        self.sheet = Image.open(sheet_path).convert('RGBA')
        ic = d['imgcut']
        # [imgcut] header, id, file name, then the cut count; some files carry dev notes after the cuts, so read exactly that many
        cnt = next((r[0] for r in ic[3:4] if len(r) == 1 and isinstance(r[0], int)), None)
        self.cuts = ic[4:4 + cnt] if cnt is not None else [r for r in ic if len(r) >= 4]
        mam = d['mamodel']
        self.parts = [r for r in mam if len(r) >= 13]
        self.maxv = mam[3 + mam[2][0]]
        self.anims = {a['name']: a for a in d['maanim']}
        self.base = [self._sprite(j) for j in range(len(self.parts))]

    def _sprite(self, j):
        r = self.parts[j]; ms, ma, mo = self.maxv[0], self.maxv[1] / 360, self.maxv[2]
        cut = self.cuts[r[2]] if r[1] != -1 and r[2] < len(self.cuts) else [0, 0, 0, 0]
        return dict(id=j, parent=r[0], cut=r[2], z=r[3], x=0 if j == 0 else r[4], y=0 if j == 0 else r[5],
                    px=r[6], py=r[7], sx=r[8] / ms, sy=r[9] / ms, angle=r[10] / ma, opacity=r[11] / mo, glow=r[12],
                    fx=1, fy=1, hidden=r[1] == -1, name=r[13] if len(r) > 13 else '')

    def length(self, name):
        if name == 'Knockback': return 24
        m = self.anims[name]['data']; mx = 0
        for k in range(len(m)):
            if len(m[k]) >= 5 and m[k + 1][0] != 0:
                v = m[k + 2][0] + (m[k + m[k + 1][0] + 1][0] - m[k + 2][0]) * (m[k][2] if m[k][2] >= 2 else 1)
                mx = max(mx, v)
        return mx

    def _modify(self, S, pid, mod, ch):
        b = self.base[pid]; s = S[pid]; ms, ma, mo = self.maxv[0], self.maxv[1] / 360, self.maxv[2]
        if mod == 0: s['parent'] = ch
        elif mod == 2: s['cut'] = ch
        elif mod == 3: s['z'] = ch
        elif mod == 4: s['x'] = b['x'] + ch
        elif mod == 5: s['y'] = b['y'] + ch
        elif mod == 6: s['px'] = b['px'] + ch
        elif mod == 7: s['py'] = b['py'] + ch
        elif mod == 8: c = ch / ms; s['sx'] = c * b['sx']; s['sy'] = c * b['sy']
        elif mod == 9: s['sx'] = ch / ms * b['sx']
        elif mod == 10: s['sy'] = ch / ms * b['sy']
        elif mod == 11: s['angle'] = b['angle'] + ch / ma
        elif mod == 12: s['opacity'] = ch / mo * b['opacity']
        elif mod == 13: s['fx'] = 1 if ch == 0 else -1
        elif mod == 14: s['fy'] = 1 if ch == 0 else -1

    def _show(self, S, frame, m):
        i = 0; n = len(m)
        while i < n:
            row = m[i]
            if len(row) >= 5:
                pid, mod = row[0], row[1]; cnt = m[i + 1][0]
                if cnt == 0: i += 1; continue
                fn = frame
                if frame == 0:
                    first = m[i + 2]
                    if first[0] == 0 or (cnt == 1 and first[0] <= 0):
                        self._modify(S, pid, mod, first[1]); i += cnt + 2; continue
                if row[2] != 1:
                    fmin = m[i + 2][0]; fmax = m[i + cnt + 1][0]
                    if fmax != fmin: fn = (frame - fmin) % (fmax - fmin) + fmin
                if cnt == 1:
                    if fn == m[i + 2][0]: self._modify(S, pid, mod, m[i + 2][1])
                    i += cnt + 2; continue
                last = i + cnt
                if fn >= m[last + 1][0]:
                    self._modify(S, pid, mod, m[last + 1][1])
                else:
                    for k in range(i + 2, last + 1):
                        r0, r1 = m[k], m[k + 1]; f, nf = r0[0], r1[0]
                        if f <= fn < nf:
                            if mod == 0: self._modify(S, pid, 0, r0[1]); break
                            c, nc, ease = r0[1], r1[1], r0[2]
                            if ease == 0: step = c + math.trunc((nc - c) / (nf - f) * (fn - f))
                            elif ease == 1: step = nc if fn == nf else c
                            elif ease == 2:
                                p = r0[3]; x = (fn - f) / (nf - f)
                                step = c + math.trunc((nc - c) * ((1 - math.sqrt(1 - x ** p)) if p >= 0 else math.sqrt(1 - (1 - x) ** (-p))))
                            elif ease == 3:
                                pts = []
                                for a in range(k, i + 1, -1):
                                    fr = m[a]
                                    if fr[2] != 3: break
                                    pts.append((fr[0], fr[1]))
                                for b2 in range(k + 1, i + cnt + 2):
                                    fr = m[b2]; pts.append((fr[0], fr[1]))
                                    if fr[2] != 3: break
                                step = 0
                                for j, (xj, yj) in enumerate(pts):
                                    prod = yj
                                    for l, (xl, _) in enumerate(pts):
                                        if l != j: prod *= (fn - xl) / (xj - xl)
                                    step += prod
                                step = math.trunc(step)
                            else: step = c
                            if mod == 2: step = math.ceil(step) if nc - c < 0 else math.floor(step)
                            elif mod in (13, 14): step = c
                            self._modify(S, pid, mod, step); break
                i += cnt + 2
            else:
                i += 1

    def state(self, name, frame):
        """sprite states at `frame`, replaying every frame from 0 so one-time changes are kept (like the viewer)"""
        S = copy.deepcopy(self.base); m = self.anims[name]['data']
        for f in range(frame + 1): self._show(S, f, m)
        return S

    def _tot(self, S, i, key, cache):
        if i == -1: return 0 if key == 'angle' else 1
        c = cache[i]
        if key in c: return c[key]
        s = S[i]
        if key == 'angle': v = s['angle'] * self._tot(S, i, 'fx', cache) * self._tot(S, i, 'fy', cache) + self._tot(S, s['parent'], 'angle', cache)
        elif key in ('sx', 'sy', 'opacity', 'fx', 'fy'): v = s[key] * self._tot(S, s['parent'], key, cache)
        c[key] = v; return v

    def render(self, S, skip=lambda s, cutname: False, ss=1.0):
        """draw a state; returns (RGBA image, origin_x, origin_y) where origin = model (0,0) = the ground point"""
        cache = [dict() for _ in S]
        # positions (y-up), replicating updateSprites
        pos = []
        for i in range(len(S)):
            vec = []; d = S[i]
            while d['parent'] != -1:
                p = S[d['parent']]
                a = math.radians(p['angle']) * self._tot(S, p['id'], 'fx', cache) * self._tot(S, p['id'], 'fy', cache)
                c, s_ = math.cos(a), math.sin(a)
                vec.insert(0, [[d['x'], -d['y']], [p['sx'] * p['fx'], 0, 0, p['sy'] * p['fy']], [c, s_, -s_, c]])
                d = p
            ap = lambda mm, v: [mm[0] * v[0] + mm[1] * v[1], mm[2] * v[0] + mm[3] * v[1]]
            for j in range(len(vec)):
                for k in range(j, len(vec)): vec[k][0] = ap(vec[j][1], vec[k][0])
            P = [0, 0]
            for j in range(len(vec)):
                for l in range(j, len(vec)): vec[l][0] = ap(vec[j][2], vec[l][0])
                P = [P[0] + vec[j][0][0], P[1] + vec[j][0][1]]
            pos.append(P)
        draws = []
        for s in sorted(S, key=lambda t: t['z']):
            i = s['id']; op = self._tot(S, i, 'opacity', cache)
            if s['hidden'] or op <= 0 or s['cut'] < 0 or s['cut'] >= len(self.cuts): continue
            cut = self.cuts[s['cut']]; cname = cut[4] if len(cut) > 4 else ''
            if cut[2] <= 0 or cut[3] <= 0 or skip(s, cname): continue
            ang = math.radians(self._tot(S, i, 'angle', cache))
            sx = self._tot(S, i, 'sx', cache) * self._tot(S, i, 'fx', cache); sy = self._tot(S, i, 'sy', cache) * self._tot(S, i, 'fy', cache)
            c, sn = math.cos(ang), math.sin(ang)
            # y-up mapping of local (lx, ly): X = sx*c*lx + sy*sn*ly + posX ; Y = -sx*sn*lx + sy*c*ly + posY
            M = (sx * c, sy * sn, pos[i][0], -sx * sn, sy * c, pos[i][1])
            draws.append((s, cut, M, op))
        if not draws: return Image.new('RGBA', (1, 1)), 0, 0
        # bounds in screen space (y-down: Y_screen = -Y)
        pts = []
        for s, cut, M, op in draws:
            for u, v in ((0, 0), (cut[2], 0), (0, cut[3]), (cut[2], cut[3])):
                lx, ly = u - s['px'], s['py'] - v
                X = M[0] * lx + M[1] * ly + M[2]; Y = M[3] * lx + M[4] * ly + M[5]
                pts.append((X, -Y))
        minx = math.floor(min(p[0] for p in pts)) - 2; maxx = math.ceil(max(p[0] for p in pts)) + 2
        miny = math.floor(min(p[1] for p in pts)) - 2; maxy = math.ceil(max(p[1] for p in pts)) + 2
        W, H = int((maxx - minx) * ss), int((maxy - miny) * ss)
        acc = np.zeros((H, W, 4), np.float32)  # premultiplied
        for s, cut, M, op in draws:
            src = self.sheet.crop((cut[0], cut[1], cut[0] + cut[2], cut[1] + cut[3]))
            # screen = A * (u,v) + t : X = M0*(u-px) + M1*(py-v) + M2 ; Ys = -(M3*(u-px) + M4*(py-v) + M5)
            a, b, tx = M[0], -M[1], M[0] * -s['px'] + M[1] * s['py'] + M[2]
            c2, d2, ty = -M[3], M[4], -(M[3] * -s['px'] + M[4] * s['py'] + M[5])
            # to canvas pixels
            a, b, tx = a * ss, b * ss, (tx - minx) * ss; c2, d2, ty = c2 * ss, d2 * ss, (ty - miny) * ss
            det = a * d2 - b * c2
            if abs(det) < 1e-9: continue
            ia, ib, ic, id_ = d2 / det, -b / det, -c2 / det, a / det
            inv = (ia, ib, -(ia * tx + ib * ty), ic, id_, -(ic * tx + id_ * ty))
            warped = np.asarray(src.transform((W, H), Image.AFFINE, inv, resample=Image.BILINEAR), np.float32) / 255
            al = warped[:, :, 3:4] * op; rgb = warped[:, :, :3] * al
            if s['glow']:
                # additive blend: black adds nothing, so the coverage it gives is its brightness, not its alpha
                acc[:, :, :3] += rgb; acc[:, :, 3:4] = np.clip(np.maximum(acc[:, :, 3:4], rgb.max(axis=2, keepdims=True)), 0, 1)
            else:
                acc[:, :, :3] = rgb + acc[:, :, :3] * (1 - al); acc[:, :, 3:4] = al + acc[:, :, 3:4] * (1 - al)
        A = np.clip(acc[:, :, 3:4], 1e-6, 1)
        out = np.concatenate([np.clip(acc[:, :, :3] / A, 0, 1), np.clip(acc[:, :, 3:4], 0, 1)], 2)
        img = Image.fromarray((out * 255).round().astype(np.uint8), 'RGBA')
        return img, -minx * ss, -miny * ss
