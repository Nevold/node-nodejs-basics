import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { unlink, access, constants } from 'fs/promises';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const inputPath = join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = join(__dirname, 'files', 'archive.gz');

  const readableStream = createReadStream(inputPath, 'utf8');
  const writeStream = createWriteStream(outputPath, { flags: 'a' });
  const gzip = createGzip();
  const err = new Error('FS operation failed');

  try {
    await pipeline(readableStream, gzip, writeStream);
    await access(inputPath, constants.F_OK);
    await unlink(inputPath);
  } catch {
    console.error(err.message);
  }
};

await compress();
