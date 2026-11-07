import { getFixturePath } from "../src/getFixturePath.js";
import { readFileSync } from "node:fs";

const obj = {
  recursJSON1: getFixturePath("nestedFile1.json"),
  recursJSON2: getFixturePath("nestedFile2.json"),
  recursYML1: getFixturePath("nestedFile1.yml"),
  recursYML2: getFixturePath("nestedFile2.yml"),
  stylish: readFileSync(getFixturePath("stylish.txt"), "utf8").trim(),
  plain: readFileSync(getFixturePath("plain.txt"), "utf8").trim(),
  json: readFileSync(getFixturePath("JSON.txt"), "utf8").trim(),
};

export { obj };
