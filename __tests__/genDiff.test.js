import { test, expect } from "vitest";
import genDiff from "../src/genDiff.js";
import { obj } from "../__fixtures__/genDiffTest.js";

test("genDiff", () => {
  expect(genDiff(obj.pathJSON1, obj.pathJSON2, "stylish")).toBe(obj.sample);
  expect(genDiff(obj.pathYML1, obj.pathYML2, "stylish")).toBe(obj.sample);
  expect(genDiff(obj.recursJSON1, obj.recursJSON2, "stylish")).toBe(
    obj.stylish,
  );
  expect(genDiff(obj.recursYML1, obj.recursYML2, "stylish")).toBe(obj.stylish);
  expect(genDiff(obj.recursJSON1, obj.recursJSON2, "plain")).toBe(obj.plain);
  expect(genDiff(obj.recursJSON1, obj.recursJSON2, "json")).toBe(obj.json);
});
