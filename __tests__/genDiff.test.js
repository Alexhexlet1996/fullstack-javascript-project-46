import { test, expect } from "vitest";
import gendiff from "../src/gendiff.js";
import { obj } from "../__fixtures__/genDiffTest.js";
import { parametersJSON, parametersYML } from "../__fixtures__/parsingTest.js";

test("gendiff", () => {
  expect(gendiff(parametersJSON, "stylish")).toBe(obj.stylish);
  expect(gendiff(parametersYML, "stylish")).toBe(obj.stylish);
  expect(gendiff(parametersJSON, "plain")).toBe(obj.plain);
  expect(gendiff(parametersJSON, "json")).toBe(obj.json);
});
