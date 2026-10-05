import { get } from '@vercel/blob';
import { Readable } from 'node:stream';
export default async function handler(req,res){
 res.setHeader('X-Content-Type-Options','nosniff');
 if(req.method!=='GET')return res.status(405).json({error:'Geçersiz yöntem.'});
 const name=req.query.name;
 if(typeof name!=='string'||!(/^[a-f0-9]{32}\.(jpg|png|webp|gif)$/.test(name)))return res.status(404).json({error:'Görsel bulunamadı.'});
 try{const blob=await get('uploads/'+name,{access:'private'});if(!blob)return res.status(404).json({error:'Görsel bulunamadı.'});res.setHeader('Content-Type',blob.blob.contentType);res.setHeader('Cache-Control','public, max-age=31536000, immutable');Readable.fromWeb(blob.stream).pipe(res);}catch{return res.status(404).json({error:'Görsel bulunamadı.'});}
}
