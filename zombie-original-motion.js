// Replace the nine legacy recolors with original zombie animations; stats stay intact.
const ZOMBIE_ORIGINAL_REPLACEMENTS={zbear:'cadaverbear',zcapy:'zapy',zduche:'zuche'};
for(const [id,atlas]of Object.entries(ZOMBIE_ORIGINAL_ATLASES))NEW_ATLASES[id]={...atlas};
for(const [id,source]of Object.entries(ZOMBIE_ORIGINAL_REPLACEMENTS))NEW_ATLASES[id]={...NEW_ATLASES[source]};
{
 const style=document.createElement('style');
 style.textContent=[...Object.keys(ZOMBIE_ORIGINAL_ATLASES),...Object.keys(ZOMBIE_ORIGINAL_REPLACEMENTS)].map(id=>`.unit.${id} .dog-sprite{filter:none}`).join('');
 document.head.append(style);
}
