#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.4.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const result = genDiff(firstConfig, secondConfig, program.format);
    console.log(result);
  })
  .parse(process.argv);

export default genDiff;
