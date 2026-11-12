import { getFixturePath } from "../__tests__/getFixturePath.js";
import { readFileSync } from "node:fs";

const obj = {
  file1PathJSON: getFixturePath('nestedFile1.json'),
  file2PathJSON: getFixturePath('nestedFile2.json'),
  file1PathYML:  getFixturePath('nestedFile1.yml'),
  file2PathYML:  getFixturePath('nestedFile2.yml'),
  stylish: readFileSync(getFixturePath("stylish.txt"), "utf8").trim(),
  plain: readFileSync(getFixturePath("plain.txt"), "utf8").trim(),
  json: readFileSync(getFixturePath("JSON.txt"), "utf8").trim(),
};


export { obj };
