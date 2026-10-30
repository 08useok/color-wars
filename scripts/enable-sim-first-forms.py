from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'scripts/full-harness.cjs';s=p.read_text(encoding='utf-8')
old='function setProfile(p={}){maxIncomeStart=!!p.maxIncome;'
new=old+"for(const t of ALLIES){delete training.forms[t];if(typeof ALLY_FORM_CHOICE!=='undefined')delete ALLY_FORM_CHOICE[t];if(p.forms?.[t]===1)training.forms[t]=1;else if(p.forms?.[t]===2&&typeof ALLY_FORM_CHOICE!=='undefined')ALLY_FORM_CHOICE[t]=2;}"
if 'if(p.forms?.[t]===1)' not in s:
 assert old in s;s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
