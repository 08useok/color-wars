// Representative release resources checked after Pages reports deployment success.
function publishedResources(version){
 const files=['red-battle-doge.html','notice.js','cannon-loadout.js','cannon-effects.js','zombie-original-motion.js','assets/cannon-effects/thunder.webp','assets/anim_zbore.webp'];
 const [major,minor]=version.split('.').map(Number);
 if(major>8||major===8&&minor>=6)files.push('primeval-readvent-86.js','talents-86.js','third-forms-86.js','reviews-third86.js','explorer-mint86-review.js','saffron-86.js','saffron-86-review.js','enemies-86.js','true-legend86.js','assets/explorermintcyan-3-motion/atlas.js','assets/explorermintcyan-3-motion/sheet.png','assets/explorermintcyan-3-motion/profile.png','assets/third-form-86-motion/atlas.js',...['crimson','chartreuse','mint','black'].flatMap(id=>['assets/third-form-86-motion/'+id+'.png','assets/third-form-86-motion/'+id+'-profile.png']),'assets/saffron-parts/parts.js','assets/saffron-parts/saffron-rig.js','assets/saffron-parts/game-atlas.js',...['1','2'].flatMap(form=>['assets/saffron-parts/saffron_'+form+'.png','assets/saffron-parts/saffron_'+form+'-profile.webp']),...['fenrirurs','waninator','gobble'].map(id=>'assets/anim_'+id+'.webp'));
 if(major>8||major===8&&minor>=7)files.push('third-forms-87.js','reviews-third87.js','assets/third-form-87-motion/atlas.js',...['aquamarine','cobalt','brown','brick'].flatMap(id=>['assets/third-form-87-motion/'+id+'.webp','assets/third-form-87-motion/'+id+'-profile.png']));
 return files;
}
module.exports={publishedResources};
