import path, { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdir, access, constants } from 'fs/promises';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files');
  const err = new Error('FS operation failed');

  try {
    await access(filePath, constants.F_OK);
    const files = await readdir(filePath);

    const filenames = files.map((file) => path.parse(file).name);
    console.log(filenames);
  } catch {
    console.error(err.message);
  }
};

await list();
