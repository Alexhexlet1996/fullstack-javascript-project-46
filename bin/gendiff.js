#!/usr/bin/env node

import { Command } from "commander";
import path from "node:path";
import diff from "../src/gendiff.js";
import { readFileSync } from "node:fs";

  const program = new Command();

  program
    .name("gendiff")
    .argument("<filepath1>")
    .argument("<filepath2>")
    .description("Compares two configuration files and shows a difference.")
    .version("1.0.0")
    .option("-f, --format [type]", "output format", "stylish")
    .action((filepath1, filepath2, options) => {
      let pathFile1 = path.resolve(process.cwd(), filepath1);
      let pathFile2 = path.resolve(process.cwd(), filepath2);
      const parameters = {
        extension: pathFile1.split(".").pop(),
        readFile1: readFileSync(pathFile1, "utf8"),
        readFile2: readFileSync(pathFile2, "utf8")
      }
      console.log(diff({...parameters}, options.format));
    });

  program.parse(process.argv);
