#!/usr/bin/env node
import program from 'commander';
import { getConfigDiff } from '..';

program
  .version('0.7.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(getConfigDiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
