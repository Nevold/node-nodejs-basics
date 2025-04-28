const parseArgs = () => {
  const args = process.argv.slice(2);

  const result = args
    .map((arg, i) => {
      if (arg.startsWith('--')) {
        const propName = arg.slice(2);
        const value = args[i + 1];
        return `${propName} is ${value}`;
      }
    })
    .filter((arg) => arg)
    .join(', ');

  console.log(result);
};

parseArgs();
