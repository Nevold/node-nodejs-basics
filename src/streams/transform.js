import { stdout, stdin } from 'node:process';
import { Transform } from 'stream';

const transform = async () => {
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

  const reverse = new Transform({
    transform(chunk, _, callback) {
      const reversedText = [...chunk.toString()].reverse().join('') + '\n';
      this.push(reversedText);
      callback();
    },
  });

  stdin
    .on('data', (chunk) => setExitCommand(chunk))
    .on('error', handleError)
    .pipe(reverse)
    .pipe(stdout);

  process.on('SIGINT', handleEnd.bind(null, 'Ctrl+C'));
};

await transform();
