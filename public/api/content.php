<?php
// Configure ADMIN_PASSWORD with your hosting environment, or create config.php beside this file.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$config = is_file(__DIR__.'/config.php') ? require __DIR__.'/config.php' : [];
$password = getenv('ADMIN_PASSWORD') ?: ($config['password'] ?? '');
$storage = __DIR__.'/private';
$file = $storage.'/content.json';
function reply(array $data, int $status = 200): never { http_response_code($status); echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES); exit; }
function readContent(): array { global $file; return is_file($file) ? (json_decode(file_get_contents($file), true) ?: ['texts'=>[], 'images'=>[], 'revision'=>0]) : ['texts'=>[], 'images'=>[], 'revision'=>0]; }
$action = $_GET['action'] ?? 'content';
if ($action === 'content' && $_SERVER['REQUEST_METHOD'] === 'GET') reply(readContent());
session_set_cookie_params(['httponly'=>true, 'secure'=>!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS']!=='off', 'samesite'=>'Strict', 'path'=>'/']);
session_start();
if ($action === 'session') reply(['authenticated'=>!empty($_SESSION['admin']), 'csrf'=>$_SESSION['csrf'] ?? '', 'configured'=>$password !== '']);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(['error'=>'Geçersiz yöntem.'],405);
$input = json_decode(file_get_contents('php://input'), true) ?: [];
if ($action === 'login') {
 if (!$password) reply(['error'=>'Sunucuda yönetici şifresi henüz tanımlanmamış. README dosyasındaki kurulumu uygulayın.'],503);
 if (time() < ($_SESSION['next_attempt'] ?? 0)) reply(['error'=>'Lütfen birkaç saniye sonra tekrar deneyin.'],429);
 $_SESSION['next_attempt']=time()+3;
 if (!hash_equals($password, (string)($input['password'] ?? ''))) reply(['error'=>'Şifre hatalı.'],401);
 session_regenerate_id(true); $_SESSION['admin']=true; $_SESSION['csrf']=bin2hex(random_bytes(32)); reply(['authenticated'=>true,'csrf'=>$_SESSION['csrf']]);
}
if (empty($_SESSION['admin'])) reply(['error'=>'Lütfen giriş yapın.'],401);
if (!hash_equals($_SESSION['csrf'], $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '')) reply(['error'=>'Oturum doğrulanamadı. Tekrar giriş yapın.'],403);
if ($action === 'logout') { $_SESSION=[]; session_destroy(); reply(['ok'=>true]); }
if ($action === 'upload') {
 if (isset($input['image'])) {
  $bytes = is_string($input['image']) ? base64_decode($input['image'], true) : false;
  if (!$bytes || strlen($bytes) > 3*1024*1024) reply(['error'=>'En fazla 3 MB boyutunda bir görsel seçin.'],422);
  $mime=(new finfo(FILEINFO_MIME_TYPE))->buffer($bytes);
  $extensions=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];
  if (!isset($extensions[$mime]) || !getimagesizefromstring($bytes)) reply(['error'=>'JPG, PNG, WebP veya GIF görseli seçin.'],422);
  $dir=dirname(__DIR__).'/uploads'; if (!is_dir($dir)) mkdir($dir,0755,true);
  $name=bin2hex(random_bytes(16)).'.'.$extensions[$mime];
  if (file_put_contents($dir.'/'.$name,$bytes)===false) reply(['error'=>'Görsel kaydedilemedi.'],500);
  reply(['url'=>'/uploads/'.$name]);
 }
 $upload=$_FILES['image'] ?? null;
 if (!$upload || $upload['error'] !== UPLOAD_ERR_OK || $upload['size'] > 8*1024*1024) reply(['error'=>'En fazla 8 MB boyutunda bir görsel seçin.'],422);
 $mime=(new finfo(FILEINFO_MIME_TYPE))->file($upload['tmp_name']);
 $extensions=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp','image/gif'=>'gif'];
 if (!isset($extensions[$mime]) || !getimagesize($upload['tmp_name'])) reply(['error'=>'JPG, PNG, WebP veya GIF görseli seçin.'],422);
 $dir=dirname(__DIR__).'/uploads'; if (!is_dir($dir)) mkdir($dir,0755,true);
 $name=bin2hex(random_bytes(16)).'.'.$extensions[$mime];
 if (!move_uploaded_file($upload['tmp_name'], $dir.'/'.$name)) reply(['error'=>'Görsel kaydedilemedi.'],500);
 reply(['url'=>'/uploads/'.$name]);
}
function validBlogs($blogs): bool {
 if (!is_array($blogs) || count($blogs)>1000) return false;
 $index=json_decode(file_get_contents(__DIR__.'/blog-index.json'),true);
 $slugs=array_column($index['posts'],'slug','id');
 foreach ($blogs as $key=>$p) {
  if (!is_array($p) || !is_int($p['id']??null) || $p['id']<1 || (string)$p['id']!==(string)$key || !is_string($p['title']??null) || !trim($p['title']) || strlen($p['title'])>2000 || !is_string($p['slug']??null) || strlen($p['slug'])>200 || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/',$p['slug'])) return false;
  foreach (['excerpt','html','text','image','imageAlt','modified','source'] as $field) if (!is_string($p[$field]??null) || strlen($p[$field])>(in_array($field,['html','text'])?800000:20000)) return false;
  if (!is_string($p['date']??null) || !preg_match('/^\d{4}-\d{2}-\d{2}(?:T.*)?$/',$p['date']) || strtotime($p['date'])===false || !is_array($p['categories']??null) || !$p['categories'] || array_diff($p['categories'],$index['categories']) || !is_int($p['minutes']??null) || $p['minutes']<1 || $p['minutes']>1000) return false;
  if ($p['image'] && !preg_match('~^(https?://|/(?!/))[^\s<>"\']+$~i',$p['image'])) return false;
  if (preg_match('~<(script|iframe|object|embed|form|input|button|link|meta|base|svg|math)\b|\bon[a-z]+\s*=|(?:javascript|vbscript|data)\s*:~i',$p['html'])) return false;
  $slugs[$p['id']]=$p['slug'];
 }
 return count(array_unique($slugs))===count($slugs);
}
if ($action === 'save') {
 if (isset($input['blogs']) && !validBlogs($input['blogs'])) reply(['error'=>'Blog bilgileri geçersiz. Başlık, benzersiz URL, tarih, kategori ve içerik alanlarını kontrol edin.'],422);
 if (!is_array($input['texts'] ?? null) || !is_array($input['images'] ?? null)) reply(['error'=>'İçerik biçimi geçersiz.'],422);
 foreach (['texts','images'] as $kind) foreach ($input[$kind] as $key=>$value) {
  if (!is_string($key) || !is_string($value) || strlen($value)>20000) reply(['error'=>'İçerik değeri geçersiz.'],422);
  if ($kind==='images' && !preg_match('~^/(uploads/[a-f0-9]{32}\.(jpg|png|webp|gif)|img/[a-z0-9-]+\.webp|assets/[a-z0-9.-]+)$~', $value)) reply(['error'=>'Görsel adresi geçersiz.'],422);
 }
 if (!is_dir($storage) && !mkdir($storage,0700,true)) reply(['error'=>'İçerik klasörü oluşturulamadı.'],500);
 $lock=fopen($storage.'/write.lock','c'); if (!$lock || !flock($lock,LOCK_EX)) reply(['error'=>'Kayıt kilidi alınamadı.'],500);
 $old=readContent(); if (($input['revision'] ?? -1)!==($old['revision'] ?? 0)) reply(['error'=>'İçerik başka bir oturumda değişti. Sayfayı yenileyin.'],409);
 $data=['texts'=>(object)$input['texts'],'images'=>(object)$input['images'],'blogs'=>$input['blogs']??$old['blogs']??new stdClass(),'revision'=>($old['revision']??0)+1,'updatedAt'=>gmdate('c')];
 $tmp=tempnam($storage,'content-'); if (file_put_contents($tmp,json_encode($data,JSON_UNESCAPED_UNICODE))===false || !rename($tmp,$file)) reply(['error'=>'İçerik kaydedilemedi.'],500);
 flock($lock,LOCK_UN); fclose($lock); reply($data);
}
reply(['error'=>'İşlem bulunamadı.'],404);
