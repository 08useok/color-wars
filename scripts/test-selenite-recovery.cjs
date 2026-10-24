const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('gacha.js','utf8'),progression=fs.readFileSync('progression.js','utf8');
// Run the real grant/recovery/finish functions and startup listener with a tiny save/UI adapter.
const logic=source.slice(source.indexOf('const EX_NAME='),source.indexOf('const _legendFinish='));
const duplicate=progression.slice(progression.indexOf('const _grantExProgression='),progression.indexOf('const _rankGrantProgression='));
const startup=source.slice(source.lastIndexOf("window.addEventListener('DOMContentLoaded'"));
function account(cleared=[],owned=[]){const listeners=[],saved={},c={cleared:[...cleared],gacha:{owned:[...owned]},MAIN_STAGE_COUNT:144,GACHA_OPEN_AT:0,GACHA_CFG:{specialChance:0},STAGES:Array.from({length:144},()=>({})),game:{ended:false},selectedStage:143,
 saveGacha(){saved.gacha=JSON.stringify(c.gacha)},gachaOwns:t=>c.gacha.owned.includes(t),document:{querySelector:()=>null},renderNewButtons(){},renderDeckButtons(){},renderGachaBadge(){},renderTraining(){},gachaToast(){},gachaTicketText:()=>'',gachaStageReward:()=>({t1:0,t10:1}),gachaGive(){c.ticketGrants++},ticketGrants:0,plusCalls:0,addPlusLevel(){c.plusCalls++;return true},plusLevel:()=>1,UNIT_NAMES:{selenite:'셀레나이트'},gachaUnlocked:()=>false,
 window:{addEventListener:(event,fn)=>listeners.push(fn)},finish(win){c.game.ended=true;if(win&&!c.cleared.includes(c.selectedStage))c.cleared.push(c.selectedStage)}};
 vm.createContext(c);vm.runInContext(logic+'\n'+duplicate+'\n'+startup,c);return {c,saved,start:()=>listeners.forEach(f=>f())};}
const old=account([143]);old.start();assert.deepEqual(old.c.gacha.owned,['selenite']);assert.equal(old.c.ticketGrants,0);assert.equal(old.c.plusCalls,0);assert.equal(JSON.parse(old.saved.gacha).owned[0],'selenite');old.start();assert.equal(old.c.plusCalls,0);
const reload=account([143],JSON.parse(old.saved.gacha).owned);reload.start();assert.equal(reload.c.plusCalls,0);assert.equal(reload.saved.gacha,undefined);
const fresh=account();fresh.start();assert.equal(fresh.c.gacha.owned.length,0);fresh.c.finish(false);assert.equal(fresh.c.gacha.owned.length,0);fresh.c.game.ended=false;fresh.c.finish(true);assert.deepEqual(fresh.c.gacha.owned,['selenite']);assert.equal(fresh.c.ticketGrants,1);fresh.c.game.ended=false;fresh.c.finish(true);assert.equal(fresh.c.ticketGrants,1);assert.equal(fresh.c.plusCalls,0);
const replay=account([143]);replay.c.finish(true);assert.deepEqual(replay.c.gacha.owned,['selenite']);assert.equal(replay.c.ticketGrants,0);
const noMoon=account([142]);noMoon.start();assert.equal(noMoon.c.gacha.owned.length,0);
console.log('PASS: old clear startup recovery, persisted ownership/reload, first clear, replay recovery, no duplicate +levels/tickets, no early grant.');
