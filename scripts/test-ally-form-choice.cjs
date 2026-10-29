const fs=require('fs'),assert=require('node:assert/strict'),make=require('./full-harness.cjs');
const source=fs.readFileSync('./scripts/full-harness.cjs','utf8'),addons=JSON.parse(source.match(/const DEFAULT_ADDONS=(\[[^;]+\]);/)[1].replace(/'/g,'"'));
const api=`globalThis.__forms={set:setForm,owns:t=>trueForms.includes(t),saved:()=>JSON.parse(localStorage.getItem(ALLY_FORM_CHOICE_KEY)||'{}')};`;
const e=make({extraSetup:api}),p=globalThis.__forms;delete globalThis.__forms;e.setProfile({level:30,trueForms:['lavender']});
assert(e.unitStats('lavender').trueForm);
assert(p.set('lavender',1));assert(!e.unitStats('lavender').evolved);
assert(p.set('lavender',2));assert(e.unitStats('lavender').evolved&&!e.unitStats('lavender').trueForm);assert(p.owns('lavender'));assert.equal(p.saved().lavender,2);
const chosen=JSON.stringify(p.saved());assert.equal(p.set('red',3),false);assert.equal(JSON.stringify(p.saved()),chosen);
assert(p.set('lavender',3));assert(e.unitStats('lavender').trueForm);assert(p.owns('lavender'));
assert(p.set('lavender',2));
// A fresh engine reads the separately saved active-form choice without changing ownership.
const fixture='work/ally-form-choice-reload-fixture.js';fs.mkdirSync('work',{recursive:true});fs.writeFileSync(fixture,"localStorage.setItem('red-battle-active-form-v1',JSON.stringify({lavender:2}));");
const list=addons.flatMap(f=>f==='ally-form-choice.js'?[fixture,f]:[f]);
const reload=make({addons:list,extraSetup:api});reload.setProfile({level:30,trueForms:['lavender']});assert(!reload.unitStats('lavender').trueForm&&reload.unitStats('lavender').evolved);assert(globalThis.__forms.owns('lavender'));delete globalThis.__forms;
console.log('PASS: owned third form, 1 -> 2 stays second, 2 -> 3 explicit, ownership retained, unavailable third rejected, saved second restored.');process.exit(0);
