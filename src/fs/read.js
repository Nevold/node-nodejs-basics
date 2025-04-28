import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile, access, constants } from 'fs/promises';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToRead.txt');
  const err = new Error('FS operation failed');

  try {
    await access(filePath, constants.F_OK);
    const content = await readFile(filePath, { encoding: 'utf8' });
    console.log(content);
  } catch {
    console.error(err.message);
  }
};

await read();
