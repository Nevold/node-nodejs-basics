import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { rename as renameFs, access, constants } from 'fs/promises';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = join(__dirname, 'files', 'properFilename.md');
  const err = new Error('FS operation failed');

  try {
    await access(oldPath, constants.F_OK);
    try {
      await access(newPath, constants.F_OK);
      throw err;
    } catch (error) {
      if (error.code === 'ENOENT') {
        await renameFs(oldPath, newPath);
      } else {
        console.error(err.message);
      }
    }
  } catch {
    console.error(err.message);
  }
};

await rename();
