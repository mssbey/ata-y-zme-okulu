export async function optimizeImage(file: File): Promise<File> {
 if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type))throw Error('JPG, PNG, WebP veya GIF seçin.');
 if(file.size>30*1024*1024)throw Error('Kaynak görsel en fazla 30 MB olabilir.');
 if(file.type==='image/gif'){if(file.size>3*1024*1024)throw Error('Animasyonlu GIF en fazla 3 MB olmalı.');return file;}
 const bitmap=await createImageBitmap(file);try{
 const scale=Math.min(1,1920/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d')!.drawImage(bitmap,0,0,canvas.width,canvas.height);
 let blob:Blob|null=null;for(const quality of [.84,.7,.55,.4]){blob=await new Promise<Blob|null>(r=>canvas.toBlob(r,'image/webp',quality));if(blob&&blob.size<=2*1024*1024)break;}
 if(!blob)throw Error('Görsel işlenemedi.');const result=scale<1||blob.size<file.size?new File([blob],file.name.replace(/\.[^.]+$/,'.webp'),{type:blob.type}):file;
 if(result.size>3*1024*1024)throw Error('Görsel 3 MB altına indirilemedi. Daha küçük bir görsel seçin.');return result;
 }finally{bitmap.close();}
}
