import { appendFile, access } from 'node:fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = join(__dirname, 'files', 'fresh.txt');
  const err = new Error('FS operation failed');

  access(filePath, (er) => {
    if (er) {
      appendFile(filePath, 'I am fresh and young', (e) => {
        if (e) throw err;
      });
    } else {
      console.error(err.message);
    }
  });
};

await create();
