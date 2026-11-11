import { load } from "js-yaml";
import { readFileSync } from "node:fs";



const parsing = (parameters) => {
  if (parameters.extension === "yml" || parameters.extension === "yaml") {
    let file1 = load(parameters.readFile1);
    let file2 = load(parameters.readFile2);
    return { file1, file2 };
  }
  if (parameters.extension === "json") {
    let file1 = JSON.parse(parameters.readFile1);
    let file2 = JSON.parse(parameters.readFile2);
    return { file1, file2 };
  }
};

export { parsing };


