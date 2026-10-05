import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
for(const name of ['api','uploads']) { const target=path.resolve(root,name);if(!target.startsWith(root+path.sep))throw Error('Unsafe build path');fs.rmSync(target,{recursive:true,force:true}); }
