import { test, expect } from "vitest";
import genDiff from "../src/genDiff.js";
import { obj } from "../__fixtures__/genDiffTest.js";

test("genDiff", () => {
  expect(genDiff(obj.pathJSON1, obj.pathJSON2)).toBe(obj.sample);
  expect(genDiff(obj.pathYML1, obj.pathYML2)).toBe(obj.sample);
  expect(genDiff(obj.recursJSON1, obj.recursJSON2)).toBe(obj.sampleRecurs);
  expect(genDiff(obj.recursYML1, obj.recursYML2)).toBe(obj.sampleRecurs);
});
