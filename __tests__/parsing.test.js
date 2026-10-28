import { test, expect } from "vitest";
import { readFileSync } from "node:fs";
import { parsing } from "../src/parsing.js";
import { getFixturePath } from "../src/getFixturePath.js";

test("parsing", () => {
  const stringJSON1 = readFileSync(getFixturePath("file1.json"), "utf8");
  const stringJSON2 = readFileSync(getFixturePath("file2.json"), "utf8");
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
