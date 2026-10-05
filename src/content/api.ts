/** Read an API response without exposing native JSON parsing errors to the user. */
export async function readApiResponse(response: Response): Promise<Record<string, any>> {
  const raw = await response.text();
  if (!raw.trim()) throw new Error('Yönetim sunucusu boş yanıt verdi. Localde npm run dev ile başlatın. Yayındaki panel için içerik API’sinin çalışması gerekir.');
  const type = response.headers.get('content-type') ?? '';
  if (!type.includes('application/json')) throw new Error('Yönetim API’si bulunamadı. Localde npm run dev ile başlatın. Vercel gibi statik sunucular PHP API’sini çalıştırmaz.');
  let result: Record<string, any>;
  try { result = JSON.parse(raw); } catch { throw new Error('Yönetim sunucusu geçersiz yanıt verdi. API yapılandırmasını kontrol edin.'); }
  if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error('Yönetim sunucusunun yanıt biçimi geçersiz.');
  if (!response.ok) throw new Error(typeof result.error === 'string' ? result.error : 'İşlem tamamlanamadı.');
  return result;
}
