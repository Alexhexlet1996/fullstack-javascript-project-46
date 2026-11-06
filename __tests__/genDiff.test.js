import { test, expect } from "vitest";
import gendiff from "../src/gendiff.js";
import { obj } from "../__fixtures__/genDiffTest.js";

test("gendiff", () => {
  expect(gendiff(obj.pathJSON1, obj.pathJSON2, "stylish")).toBe(obj.sample);
  expect(gendiff(obj.pathYML1, obj.pathYML2, "stylish")).toBe(obj.sample);
  expect(gendiff(obj.recursJSON1, obj.recursJSON2, "stylish")).toBe(
    obj.stylish,
  );
  expect(gendiff(obj.recursYML1, obj.recursYML2, "stylish")).toBe(obj.stylish);
  expect(gendiff(obj.recursJSON1, obj.recursJSON2, "plain")).toBe(obj.plain);
  expect(gendiff(obj.recursJSON1, obj.recursJSON2, "json")).toBe(obj.json);
});
