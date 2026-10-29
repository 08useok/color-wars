const fs=require('fs'),vm=require('vm');
const context=vm.createContext({codexReviewAssessment:()=>({}),allyReview:()=>'',codexReviewStats:()=>({}),THIRD_FORM_72_NAMES:{},codexReviewNumber:String});
vm.runInContext(fs.readFileSync('four-third-form-reviews.js','utf8')+'\nglobalThis.assessments=THIRD72_ASSESSMENTS;',context);
vm.runInContext(fs.readFileSync('cheer-dandelion-review.js','utf8')+'\nglobalThis.cheer=CHEER_DANDELION_ASSESSMENT;',context);
const rows=[['플로럴 라벤더 · 3진',context.assessments.lavender],['빅웨이브 애저 · 3진',context.assessments.azure],['마린 아쿠아 · 3진',context.assessments.aqua],['클럽 베이비 블루 · 3진',context.assessments.babyblue],['응원단 민들레 / 치어리더 민들레 · 1·2진',context.cheer]];
const text='# 7.2 신규 캐릭터·3진 총평\n\n도감의 강점·약점·편성 판단과 같은 원문이다. 티어 등급이나 전체 순위는 총평에 넣지 않는다. 공체 변화·능력 수치는 도감의 3진 변화/특징 항목을 함께 참고한다.\n\n'+rows.map(([name,r])=>'## '+name+'\n\n'+r.strength+'\n\n'+r.weakness+'\n\n'+r.use+'\n').join('\n');
fs.mkdirSync('docs/총평',{recursive:true});fs.writeFileSync('docs/총평/7.2-신규-총평-2026-10-29.md',text);console.log('Exported five role-based reviews matching codex assessments.');
