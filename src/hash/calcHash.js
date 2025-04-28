import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'node:process';
import { createHash } from 'crypto';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const readableStream = createReadStream(filePath);
  const hash = createHash('sha256');

  const handleError = () => {
    console.log('FS operation failed');
    readableStream.destroy();
  };

  const getData = (chunk) => hash.update(chunk);

  readableStream
    .on('data', getData)
    .on('error', handleError)
    .on('end', () => {
      stdout.write(hash.digest('hex') + '\n');
    });
};

await calculateHash();
