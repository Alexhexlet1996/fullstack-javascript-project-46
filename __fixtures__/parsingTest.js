import { getFixturePath } from "../src/getFixturePath.js";

const obj = {
  pathJSON1: getFixturePath("file1.json"),
  pathJSON2: getFixturePath("file2.json"),
  pathYML1: getFixturePath("file1.yml"),
  pathYML2: getFixturePath("file2.yml"),
  pathNestedFile1: getFixturePath("nestedFile1.json"),
  pathNestedFile2: getFixturePath("nestedFile2.json"),
};

export { obj };
