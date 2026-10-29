import { test, expect } from "vitest";
import genDiff from "../src/genDiff.js";
import { getFixturePath } from "../src/getFixturePath.js";
import { readFileSync } from "node:fs";

test("genDiff", () => {
  const pathJSON1 = getFixturePath("file1.json");
  const pathJSON2 = getFixturePath("file2.json");
  const pathYML1 = getFixturePath("file1.yml");
  const pathYML2 = getFixturePath("file2.yml");
  const sample = readFileSync(getFixturePath("diffResult.txt"), "utf8").trim();
  expect(genDiff(pathJSON1, pathJSON2)).toBe(sample);
  expect(genDiff(pathYML1, pathYML2)).toBe(sample);
});
