import { getFixturePath } from "../__tests__/getFixturePath.js";
import { readFileSync } from "node:fs";

const obj = {
  stylish: readFileSync(getFixturePath("stylish.txt"), "utf8").trim(),
  plain: readFileSync(getFixturePath("plain.txt"), "utf8").trim(),
  json: readFileSync(getFixturePath("JSON.txt"), "utf8").trim(),
};


export { obj };
