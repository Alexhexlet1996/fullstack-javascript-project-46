#!/usr/bin/env node

import gendiff from './cli.js'

const program = gendiff();
program.parse(process.argv);

if (process.argv[1] === new URL(import.meta.url).pathname) {
  program.parse(process.argv);
}