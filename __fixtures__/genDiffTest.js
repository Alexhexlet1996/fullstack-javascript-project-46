import { getFixturePath } from "../src/getFixturePath.js";
import { readFileSync } from "node:fs";

const obj = {
  pathJSON1: getFixturePath("file1.json"),
  pathJSON2: getFixturePath("file2.json"),
  pathYML1: getFixturePath("file1.yml"),
  pathYML2: getFixturePath("file2.yml"),
  recursJSON1: getFixturePath("nestedFile1.json"),
  recursJSON2: getFixturePath("nestedFile2.json"),
  recursYML1: getFixturePath("nestedFile1.yml"),
  recursYML2: getFixturePath("nestedFile2.yml"),
  sample: readFileSync(getFixturePath("diffResult.txt"), "utf8").trim(),
  stylish: readFileSync(getFixturePath("stylish.txt"), "utf8").trim(),
  plain: readFileSync(getFixturePath("plain.txt"), "utf8").trim(),
  json: readFileSync(getFixturePath("JSON.txt"), "utf8").trim(),
};

export { obj };
