import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { unlink, access, constants } from 'fs/promises';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToRemove.txt');
  const err = new Error('FS operation failed');

  try {
    await access(filePath, constants.F_OK);
    await unlink(filePath);
  } catch {
    console.error(err.message);
  }
};

await remove();
