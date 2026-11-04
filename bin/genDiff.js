#!/usr/bin/env node

import { Command } from "commander";
import path from "node:path";
import genDiff from "../src/genDiff.js";
import { stylish } from "../formatters/stylish.js";
import { plain } from '../formatters/plain.js'
import { json } from '../formatters/json.js'

const program = new Command();

program
  .name("genDiff")
  .argument("filepath1")
  .argument("filepath2")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "output format", null, 'stylish')
  .action((filepath1, filepath2, options) => {
    let pathFile1 = path.resolve(process.cwd(), filepath1);
    let pathFile2 = path.resolve(process.cwd(), filepath2);
    const formatters = { stylish, plain, json };
    const formatterFn = formatters[options.format] ?? formatters.stylish;
    console.log(genDiff(pathFile1, pathFile2, formatterFn));
  });

program.parse(process.argv);
