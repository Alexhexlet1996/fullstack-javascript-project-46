import { load } from "js-yaml";
import { readFileSync } from "node:fs";

const parsing = (pathFile1, pathFile2) => {
  const extension = pathFile1.split(".").pop();

  if (extension === "yml" || extension === "yaml") {
    let file1 = load(readFileSync(pathFile1, "utf8"));
    let file2 = load(readFileSync(pathFile2, "utf8"));
    return { file1, file2 };
  }
  if (extension === "json") {
    let file1 = JSON.parse(readFileSync(pathFile1, "utf8"));
    let file2 = JSON.parse(readFileSync(pathFile2, "utf8"));
    return { file1, file2 };
  }
};

export { parsing };
