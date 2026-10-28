import { test, expect } from "vitest";
import genDiff from "../src/genDiff.js";
import { getFixturePath } from "../src/getFixturePath.js";
import { readFileSync } from "node:fs";

test("genDiff", () => {
  const stringJSON1 = readFileSync(getFixturePath("file1.json"), "utf8");
  const stringJSON2 = readFileSync(getFixturePath("file2.json"), "utf8");
  const sample = readFileSync(getFixturePath("diffResult.txt"), "utf8").trim();
  expect(genDiff(stringJSON1, stringJSON2)).toBe(sample);
});
