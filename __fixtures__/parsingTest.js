import { getFixturePath } from "../src/getFixturePath.js";

const obj = {
  pathNestedFile1: getFixturePath("nestedFile1.json"),
  pathNestedFile2: getFixturePath("nestedFile2.json"),
};

export { obj };
