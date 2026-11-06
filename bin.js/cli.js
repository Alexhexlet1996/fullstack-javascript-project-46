
import { Command } from "commander";
import path from "node:path";
import gendiff from "../src/gendiff.js";


export default () => {
const program = new Command()

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
    console.log(gendiff(pathFile1, pathFile2, options.format));
  });

 return program
}
