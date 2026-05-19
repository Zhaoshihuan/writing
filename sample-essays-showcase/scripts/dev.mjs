import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const backendDir = path.join(__dirname, '..', 'sample-essays-backend');
const frontendDir = path.join(__dirname, '..', 'sample-essays-frontend');

console.log('🚀 Starting Sample Essays Showcase...\n');

// Start backend
const backend = spawn('npm', ['run', 'dev'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true,
});

// Start frontend (after a short delay to avoid conflicts)
setTimeout(() => {
  const frontend = spawn('npm', ['run', 'watch:css'], {
    cwd: frontendDir,
    stdio: 'inherit',
    shell: true,
  });
}, 1000);

process.on('exit', () => {
  backend.kill();
});
