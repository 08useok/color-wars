from pathlib import Path
root=Path(__file__).resolve().parents[1]
p=root/'scripts/full-harness.cjs';s=p.read_text(encoding='utf-8')
if 'let maxIncomeStart=false;' not in s:
 s=s.replace(" function simulate(index,crown,types,seed,limit=300,pol='auto',mods=null){"," let maxIncomeStart=false;\n function simulate(index,crown,types,seed,limit=300,pol='auto',mods=null){")
 s=s.replace('deploymentCounts={};reset();game.running=true;', 'deploymentCounts={};reset();if(maxIncomeStart)game.level=data.income.length-1;game.running=true;')
 s=s.replace('function setProfile(p={}){','function setProfile(p={}){maxIncomeStart=!!p.maxIncome;')
p.write_text(s,encoding='utf-8')
p=root/'scripts/compare-74.cjs';s=p.read_text(encoding='utf-8').replace('profile:{level:30,trueForms:', 'profile:{level:30,maxIncome:true,trueForms:');p.write_text(s,encoding='utf-8')
