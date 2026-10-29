import { test, expect } from "vitest";
import { parsing } from "../src/parsing.js";
import { getFixturePath } from "../src/getFixturePath.js";

test("parsing", () => {
  const pathJSON1 = getFixturePath("file1.json");
  const pathJSON2 = getFixturePath("file2.json");
  const pathYML1 = getFixturePath("file1.yml");
  const pathYML2 = getFixturePath("file2.yml");
  expect(parsing(athJSON1, pathJSON2)).toEqual({
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
  expect(parsing(pathYML1, pathYML2)).toEqual({
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
