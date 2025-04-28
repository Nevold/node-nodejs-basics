import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout, stdin } from 'node:process';
import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'script.js');

  const child = spawn('node', [filePath, ...args], {
    stdio: ['pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    stdout.write(data);
  });

  stdin.on('data', (data) => {
    child.stdin.write(data);
  });

  return child;
};

spawnChildProcess(['arg1', 'arg2', 'arg3', 'arg4', 'arg5', 'arg6']);
