import { spawn } from 'node:child_process';
const children = [];
let stopping = false;
function stop(code = 0) { if (stopping) return; stopping = true; for (const child of children) child.kill(); process.exitCode = code; }
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
function start(command, args) {
  const child = spawn(command, args, { stdio: 'inherit', windowsHide: true });
  children.push(child);
  child.on('error', error => { console.error(`Başlatılamadı: ${command}. PHP 8+ kurulu ve PATH içinde olmalı. ${error.message}`); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code ?? 1); });
  return child;
}
async function backendReady() {
  try { const response = await fetch('http://127.0.0.1:8081/api/content.php?action=session', { signal: AbortSignal.timeout(1000) }); const data = await response.json(); return response.ok && typeof data.authenticated === 'boolean'; } catch { return false; }
}
if (!(await backendReady())) {
  start('php', ['-S', '127.0.0.1:8081', '-t', 'public']);
  for (let attempt = 0; attempt < 30 && !stopping; attempt++) { if (await backendReady()) break; await new Promise(resolve => setTimeout(resolve, 100)); }
  if (!(await backendReady())) { console.error('Yönetim API’si başlatılamadı. PHP kurulumu ve 8081 portunu kontrol edin.'); stop(1); }
}
if (!stopping) start(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0', ...process.argv.slice(2)]);
