import { get, put } from '@vercel/blob';
process.loadEnvFile('.env.vercel.local');
if (!await get('site/content.json',{access:'private',useCache:false})) { await put('site/content.json',JSON.stringify({texts:{},images:{},revision:0}),{access:'private',addRandomSuffix:false,contentType:'application/json'});console.log('Initial content store ready.'); } else console.log('Existing content preserved.');
