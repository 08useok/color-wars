from pathlib import Path
root=Path(__file__).resolve().parents[1]
for src,dst in [('pack-ocean-sea-motion.py','pack-third74-motion.py'),('verify-ocean-sea-motion.py','verify-third74-motion.py')]:
    text=(root/'scripts'/src).read_text(encoding='utf-8')
    text=text.replace('ocean-sea-motion','third-form-74-motion').replace('OCEAN_SEA_MOTION_ATLASES','THIRD_FORM_74_MOTION_ATLASES')
    text=text.replace("['ocean_1','ocean_2','sea_1','sea_2']","['lilac_3','babypink_3','magenta_3','fusioncream_3']")
    (root/'scripts'/dst).write_text(text,encoding='utf-8')
