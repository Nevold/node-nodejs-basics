import { access } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { cp, mkdir } from 'node:fs/promises';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files');
  const filePathCopy = join(__dirname, 'files-copy');
  const err = new Error('FS operation failed');

  async function makeDirectory() {
    mkdir(filePathCopy, { recursive: true });
  }

  access(filePath, async (er) => {
    if (!er) {
      access(filePathCopy, async (e) => {
        if (e) {
          try {
            await makeDirectory();
            await cp(filePath, filePathCopy, { recursive: true });
          } catch {
            console.error(err.message);
          }
        } else {
          console.error(err.message);
        }
      });
    } else {
      console.error(err.message);
    }
  });
};

await copy();
