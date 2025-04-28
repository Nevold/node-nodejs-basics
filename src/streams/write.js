import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdout, stdin } from 'node:process';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = createWriteStream(filePath, { flags: 'a' });

  stdout.write('Please, enter text:\n');

  const handleError = () => {
    console.log('FS operation failed');
  };

  const handleEnd = (massage) => {
    console.log(`You entered the exit command:\x1b[33m ${massage}\x1b[0m`);
    process.exit();
  };

  const setExitCommand = (chunk) => {
    if (chunk.toString().trim() == 'exit') {
      handleEnd('Exit');
    }
  };
  stdin
    .on('data', (chunk) => setExitCommand(chunk))
    .on('error', handleError)
    .pipe(writeStream);

  process.on('SIGINT', handleEnd.bind(null, 'Ctrl+C'));
};

await write();
