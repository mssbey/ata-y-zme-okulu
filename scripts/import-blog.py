"""Import the authorized Ata Yüzme blog archive and its original media."""
import concurrent.futures, hashlib, html, json, re, time, urllib.request, urllib.parse
from pathlib import Path
from bs4 import BeautifulSoup

BASE = 'https://www.yakacikyuzmehavuzu.com'
ROOT = Path(__file__).resolve().parents[1]
def fetch(url):
    url = urllib.parse.quote(url, safe=':/?&=%+#')
    for attempt in range(4):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=60).read()
        except Exception:
            if attempt == 3: raise
            time.sleep(attempt + 1)
def api(path): return json.loads(fetch(BASE + '/wp-json/wp/v2/' + path))
def plain(value): return BeautifulSoup(html.unescape(value), 'html.parser').get_text(' ', strip=True)

cats = api('categories?per_page=100&_fields=id,name,slug,parent,count')
blog_id = next(c['id'] for c in cats if c['slug'] == 'blog')
ids = {blog_id}
while True:
    expanded = ids | {c['id'] for c in cats if c['parent'] in ids}
    if expanded == ids: break
    ids = expanded
categories = [{'id': c['id'], 'name': plain(c['name']), 'slug': c['slug']} for c in cats if c['id'] in ids and c['id'] != blog_id]
request = urllib.request.urlopen(BASE + f'/wp-json/wp/v2/posts?categories={blog_id}&per_page=100&_fields=id')
total = int(request.headers['X-WP-Total'])
pages = int(request.headers['X-WP-TotalPages'])
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    batches = list(pool.map(lambda page: api(f'posts?categories={blog_id}&per_page=100&page={page}&_embed'), range(1, pages + 1)))
posts = [p for batch in batches for p in batch]
assert len(posts) == total and len({p['id'] for p in posts}) == total
media = {}
def media_path(url):
    url = html.unescape(url)
    if url.startswith('//'): url = 'https:' + url
    if not url.startswith('http'): url = BASE + '/' + url.lstrip('/')
    if '/wp-content/uploads/' not in url: return url
    ext = Path(url.split('?')[0]).suffix.lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.pdf']: ext = '.jpg'
    local = '/assets/blog/' + hashlib.sha256(url.encode()).hexdigest()[:20] + ext
    media[url] = local
    return local

result = []
for p in posts:
    soup = BeautifulSoup(p['content']['rendered'], 'html.parser')
    for el in soup.find_all(['script', 'style', 'form', 'input', 'button', 'object', 'embed']): el.decompose()
    for el in soup.find_all(True):
        for attr in list(el.attrs):
            if attr.lower().startswith('on') or attr in ['style', 'srcdoc']: del el[attr]
        if el.name == 'img':
            src = el.get('data-src') or el.get('src')
            if src: el['src'] = media_path(src)
            for attr in ['srcset', 'sizes', 'data-src', 'data-srcset', 'width', 'height']: el.attrs.pop(attr, None)
            el['loading'] = 'lazy'
            el['alt'] = el.get('alt', '')
        if el.name == 'a':
            href = el.get('href', '')
            if href.lower().startswith(('javascript:', 'data:')): del el['href']
            elif '/wp-content/uploads/' in href: el['href'] = media_path(href)
            el['rel'] = 'noopener noreferrer'
        if el.name == 'iframe':
            if not re.match(r'https?://(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)/', el.get('src', '')): el.decompose()
            else: el['loading'] = 'lazy'; el['title'] = plain(p['title']['rendered'])
    featured = p.get('_embedded', {}).get('wp:featuredmedia', [{}])[0]
    image = featured.get('source_url', '')
    text = plain(str(soup))
    result.append({'id': p['id'], 'slug': p['slug'], 'title': plain(p['title']['rendered']), 'date': p['date'], 'modified': p['modified'], 'source': p['link'], 'categories': [c for c in p['categories'] if c in ids and c != blog_id], 'excerpt': plain(p['excerpt']['rendered']).removesuffix(' […]'), 'html': str(soup), 'text': text, 'image': media_path(image) if image else '', 'imageAlt': plain(featured.get('alt_text', '')), 'minutes': max(1, round(len(text.split()) / 200))})
if not categories:
    categories = [{'id': 1001, 'name': 'Yüzme Teknikleri', 'slug': 'yuzme-teknikleri'}, {'id': 1002, 'name': 'Sağlık & Beslenme', 'slug': 'saglik-beslenme'}, {'id': 1003, 'name': 'Yüzme Eğitimi', 'slug': 'yuzme-egitimi'}, {'id': 1004, 'name': 'Kulüp & Havuz', 'slug': 'kulup-havuz'}]
    for p in result:
        title = p['title'].lower()
        cat = 1002 if any(w in title for w in ['fayda', 'kilo', 'beslen', 'sağlık']) else 1001 if any(w in title for w in ['teknik', 'stil', 'nefes', 'kelebek', 'sırtüstü', 'kurbağalama', 'serbest']) else 1003 if any(w in title for w in ['ders', 'kurs', 'öğren', 'korku', 'eğitim']) else 1004
        p['categories'] = [cat]
slugs = {p['source'].rstrip('/'): '/blog/' + p['slug'] for p in result}
for p in result:
    soup = BeautifulSoup(p['html'], 'html.parser')
    for a in soup.find_all('a', href=True):
        href = a['href'].rstrip('/')
        if href in slugs: a['href'] = slugs[href]
    p['html'] = str(soup)

def download(item):
    url, local = item
    target = ROOT / 'public' / local.lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists(): target.write_bytes(fetch(url))
    return local
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    futures = {pool.submit(download, item): item for item in media.items()}
    errors = []
    for future in concurrent.futures.as_completed(futures):
        try: future.result()
        except Exception as exc: errors.append({'url': futures[future][0], 'error': str(exc)})
if errors:
    (ROOT / 'qa/blog-media-errors.json').write_text(json.dumps(errors, ensure_ascii=False, indent=2), encoding='utf8')
    raise RuntimeError(f'{len(errors)} media downloads failed; rerun to retry')
(ROOT / 'src/data/blog.json').write_text(json.dumps({'categories': categories, 'posts': result}, ensure_ascii=False), encoding='utf8')
(ROOT / 'src/data/blog-redirects.json').write_text(json.dumps([{'path': urllib.parse.urlparse(p['source']).path.strip('/'), 'slug': p['slug']} for p in result], ensure_ascii=False), encoding='utf8')
(ROOT / 'qa/blog-import-report.json').write_text(json.dumps({'source': BASE + '/category/blog/', 'posts': len(result), 'categories': len(categories), 'editorialCategories': True, 'media': len(media), 'failedMedia': errors, 'emptyPosts': [p['slug'] for p in result if not p['text']]}, ensure_ascii=False, indent=2), encoding='utf8')
print(f'Imported {len(result)} posts, {len(categories)} categories, {len(media)} media files.')
