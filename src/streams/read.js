import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'node:process';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToRead.txt');

  const readableStream = createReadStream(filePath, 'utf8');

  let data = '';

  const handleError = () => {
    console.log('FS operation failed');
    readableStream.destroy();
  };

  const getData = (chunk) => (data += chunk.toString());

  readableStream
    .on('data', getData)
    .on('error', handleError)
    .on('end', () => {
      stdout.write(data + '\n');
    });
};

await read();
