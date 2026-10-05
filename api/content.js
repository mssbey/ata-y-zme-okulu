import { createHmac, timingSafeEqual, randomBytes, createHash } from 'node:crypto';
import { get, put, BlobPreconditionFailedError } from '@vercel/blob';
const CONTENT='site/content.json';
const attempts=new Map();
const empty=()=>({texts:{},images:{},revision:0});
function same(a,b){const x=Buffer.from(a??''),y=Buffer.from(b??'');return x.length===y.length&&timingSafeEqual(x,y);}
function secret(){return createHash('sha256').update((process.env.ADMIN_PASSWORD??'')+':'+(process.env.BLOB_READ_WRITE_TOKEN??'')).digest();}
function signature(value){return createHmac('sha256',secret()).update(value).digest('base64url');}
function token(data){const value=Buffer.from(JSON.stringify(data)).toString('base64url');return value+'.'+signature(value);}
function session(req){try{const cookie=(req.headers.cookie??'').split(';').map(s=>s.trim()).find(s=>s.startsWith('ata_admin='));if(!cookie)return null;const [value,mac]=cookie.slice(10).split('.');if(!value||!same(mac,signature(value)))return null;const data=JSON.parse(Buffer.from(value,'base64url').toString());return data.exp>Date.now()&&typeof data.csrf==='string'?data:null;}catch{return null;}}
function cookie(res,value,maxAge){res.setHeader('Set-Cookie',`ata_admin=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);}
function json(res,status,data){res.status(status).json(data);}
async function read(){const blob=await get(CONTENT,{access:'private',useCache:false});if(!blob)return {data:empty(),etag:null};return {data:await new Response(blob.stream).json(),etag:blob.blob.etag};}
function validImage(value){return typeof value==='string'&&(/^\/api\/media\?name=[a-f0-9]{32}\.(jpg|png|webp|gif)$/.test(value)||/^\/(img\/[a-z0-9-]+\.webp|assets\/[a-z0-9.-]+|favicon-64\.png|apple-touch-icon\.png|og-image\.jpg)$/.test(value));}
function imageType(buffer){if(buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))return ['png','image/png'];if(buffer[0]===255&&buffer[1]===216&&buffer[2]===255)return ['jpg','image/jpeg'];if(['GIF87a','GIF89a'].includes(buffer.subarray(0,6).toString()))return ['gif','image/gif'];if(buffer.subarray(0,4).toString()==='RIFF'&&buffer.subarray(8,12).toString()==='WEBP')return ['webp','image/webp'];return null;}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 try{
 const action=req.query.action??'content';
 if(action==='content'&&req.method==='GET'){if(!process.env.BLOB_READ_WRITE_TOKEN)return json(res,200,empty());return json(res,200,(await read()).data);}
 const auth=session(req);
 if(action==='session'&&req.method==='GET')return json(res,200,{authenticated:!!auth,csrf:auth?.csrf??'',configured:!!process.env.ADMIN_PASSWORD});
 if(req.method!=='POST')return json(res,405,{error:'Geçersiz yöntem.'});
 const body=typeof req.body==='string'?JSON.parse(req.body):req.body??{};
 if(action==='login'){
  if(!process.env.ADMIN_PASSWORD)return json(res,503,{error:'Yönetici şifresi sunucuda tanımlanmamış.'});
  const ip=String(req.headers['x-forwarded-for']??'unknown').split(',')[0];const now=Date.now();const last=attempts.get(ip);
  if(last&&now-last<3000)return json(res,429,{error:'Lütfen birkaç saniye sonra tekrar deneyin.'});
  attempts.set(ip,now);if(attempts.size>10000)attempts.clear();
  if(typeof body.password!=='string'||!same(body.password,process.env.ADMIN_PASSWORD))return json(res,401,{error:'Şifre hatalı.'});
  const csrf=randomBytes(32).toString('hex');cookie(res,token({csrf,exp:now+8*60*60*1000}),8*60*60);return json(res,200,{authenticated:true,csrf});
 }
 if(!auth)return json(res,401,{error:'Lütfen giriş yapın.'});
 if(!same(auth.csrf,req.headers['x-csrf-token']))return json(res,403,{error:'Oturum doğrulanamadı. Tekrar giriş yapın.'});
 if(action==='logout'){cookie(res,'',0);return json(res,200,{ok:true});}
 if(!process.env.BLOB_READ_WRITE_TOKEN)return json(res,503,{error:'Kalıcı içerik deposu sunucuda tanımlanmamış.'});
 if(action==='upload'){
  if(typeof body.image!=='string'||body.image.length>4*1024*1024||!(/^[A-Za-z0-9+/]*={0,2}$/.test(body.image)))return json(res,422,{error:'En fazla 3 MB boyutunda bir görsel seçin.'});
  const buffer=Buffer.from(body.image,'base64');const type=imageType(buffer);
  if(!type||!buffer.length||buffer.length>3*1024*1024)return json(res,422,{error:'En fazla 3 MB JPG, PNG, WebP veya GIF görseli seçin.'});
  const name=randomBytes(16).toString('hex')+'.'+type[0];await put('uploads/'+name,buffer,{access:'private',addRandomSuffix:false,contentType:type[1]});return json(res,200,{url:'/api/media?name='+name});
 }
 if(action==='save'){
  for(const kind of ['texts','images']){if(!body[kind]||typeof body[kind]!=='object'||Array.isArray(body[kind])||Object.keys(body[kind]).length>2000)return json(res,422,{error:'İçerik biçimi geçersiz.'});for(const [key,value]of Object.entries(body[kind]))if(key.length>200||typeof value!=='string'||value.length>20000||(kind==='images'&&!validImage(value)))return json(res,422,{error:'İçerik değeri geçersiz.'});}
  const previous=await read();if(body.revision!==previous.data.revision)return json(res,409,{error:'İçerik başka bir oturumda değişti. Sayfayı yenileyin.'});
  const data={texts:body.texts,images:body.images,revision:previous.data.revision+1,updatedAt:new Date().toISOString()};
  await put(CONTENT,JSON.stringify(data),{access:'private',addRandomSuffix:false,allowOverwrite:!!previous.etag,contentType:'application/json',...(previous.etag?{ifMatch:previous.etag}:{})});return json(res,200,data);
 }
 return json(res,404,{error:'İşlem bulunamadı.'});
 }catch(error){if(error instanceof BlobPreconditionFailedError)return json(res,409,{error:'İçerik başka bir oturumda değişti. Sayfayı yenileyin.'});console.error('Admin API:',error.name);return json(res,500,{error:'Yönetim işlemi tamamlanamadı. Lütfen tekrar deneyin.'});}
}
