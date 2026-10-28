import genDiff from "../src/genDiff.js";
import { parsing } from "../src/parsing.js";
import { getFixturePath } from "../src/getFixturePath.js";

import { readFileSync } from "node:fs";
import { test, expect } from "vitest";

test('getFixturePath', () => {
  expect(getFixturePath('file1.json')).toBe('/home/user/fullstack-javascript-project-46/__fixtures__/file1.json')
})

const testFile1 = getFixturePath('file1.json');
const testFile2 = getFixturePath('file2.json');

test("parsing", () => {
    const stringJSON1 = readFileSync(testFile1, "utf8")
    const stringJSON2 = readFileSync(testFile2, "utf8")
  expect(parsing(stringJSON1, stringJSON2)).toEqual({
      file1: {
        host: "hexlet.io",
        timeout: 50,
        proxy: "123.234.53.22",
        follow: false,
      },
      file2: {
        timeout: 20,
        verbose: true,
        host: "hexlet.io",
      },
    });
});

test("genDiff", () => {
    const stringJSON1 = readFileSync(testFile1, "utf8")
    const stringJSON2 = readFileSync(testFile2, "utf8")
  const sample = readFileSync(getFixturePath('diffResult.js'), "utf8").trim();
  expect(genDiff(stringJSON1, stringJSON2)).toBe(sample);
});


