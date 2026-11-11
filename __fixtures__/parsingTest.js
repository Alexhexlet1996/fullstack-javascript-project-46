import { getFixturePath } from "../__tests__/getFixturePath.js";
import { readFileSync } from "node:fs";
import path from "node:path";

const makeParameters = (name1, name2) => {
  const pathFile1 = path.resolve(process.cwd(), getFixturePath(name1));
  const pathFile2 = path.resolve(process.cwd(), getFixturePath(name2));
  return {
    extension: pathFile1.split(".").pop(),
    readFile1: readFileSync(pathFile1, "utf8"),
    readFile2: readFileSync(pathFile2, "utf8"),
  };
}

const parametersJSON = makeParameters("nestedFile1.json", "nestedFile2.json");
const parametersYML = makeParameters("nestedFile1.yml", "nestedFile2.yml")

export { parametersJSON, parametersYML };
