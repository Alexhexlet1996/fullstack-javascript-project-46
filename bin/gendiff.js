#!/usr/bin/env node

import gendiff from './cli.js'

const program = gendiff();
program.parse(process.argv);