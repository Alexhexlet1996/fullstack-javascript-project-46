#!/usr/bin/env node

import { Command } from "commander";
import genDiff from "../src/genDiff.js";
import path from "node:path";

const program = new Command();

program
  .name("genDiff")
  .argument("filepath1")
  .argument("filepath2")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2) => {
    let pathFile1 = path.resolve(process.cwd(), filepath1);
    let pathFile2 = path.resolve(process.cwd(), filepath2);
    console.log(genDiff(pathFile1, pathFile2));
  });

program.parse(process.argv);
