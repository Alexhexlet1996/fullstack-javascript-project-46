import { test, expect } from "vitest";
import gendiff from "../src/gendiff.js";
import { obj } from "../__fixtures__/genDiffTest.js";

test("gendiff", () => {
  expect(gendiff(obj.file1PathJSON, obj.file2PathJSON, "stylish")).toBe(
    obj.stylish,
  );
  expect(gendiff(obj.file1PathYML, obj.file2PathYML, "stylish")).toBe(
    obj.stylish,
  );
  expect(gendiff(obj.file1PathJSON, obj.file2PathJSON, "plain")).toBe(
    obj.plain,
  );
  expect(gendiff(obj.file1PathJSON, obj.file2PathJSON, "json")).toBe(obj.json);
});
