#!/usr/bin/env node
import program from 'commander';
import { getConfigDiff } from '..';

program
  .version('0.9.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfigPath> <secondConfigPath>')
  .option('-f, --format [type]', 'Output format: "plain", "json" or "complex" (default)')
  .action((firstConfigPath, secondConfigPath) => {
    console.log(getConfigDiff(firstConfigPath, secondConfigPath, program.format));
  })
  .parse(process.argv);
