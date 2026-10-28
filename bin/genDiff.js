#!/usr/bin/env node

import { Command } from "commander";
import genDiff from "../src/genDiff.js";
import { readFileSync } from "node:fs";
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
    let stringFile1 = readFileSync(
      path.resolve(process.cwd(), filepath1),
      "utf8",
    );
    let stringFile2 = readFileSync(
      path.resolve(process.cwd(), filepath2),
      "utf8",
    );
    console.log(genDiff(stringFile1, stringFile2));
  });

program.parse(process.argv);
