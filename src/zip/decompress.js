import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { unlink, access, constants } from 'fs/promises';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const outputPath = join(__dirname, 'files', 'archive.gz');
  const inputPath = join(__dirname, 'files', 'fileToCompress.txt');

  const readableStream = createReadStream(outputPath);
  const writeStream = createWriteStream(inputPath);
  const gzip = createGunzip();
  const err = new Error('FS operation failed');

  try {
    await pipeline(readableStream, gzip, writeStream);
    await access(outputPath, constants.F_OK);
    await unlink(outputPath);
  } catch {
    console.error(err.message);
  }
};

await decompress();
