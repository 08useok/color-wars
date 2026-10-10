// Preserve the original Clover forms; advent allies are registered in subspecies.js.
NEW_ATLASES.clover.true=CLOVER_VARIANT_ATLASES.clover3;
TRUE_NAME.clover='럭키 클로버';
// Capture saved subspecies values before later startup reward hooks can save training.
let SUBSPECIES_SAVED_TRAINING={};
try{SUBSPECIES_SAVED_TRAINING=JSON.parse(localStorage.getItem('red-battle-training-v1')||'{}')}catch{}
