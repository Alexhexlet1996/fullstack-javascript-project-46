import { test, expect } from "vitest";
import { getFixturePath } from "../src/getFixturePath.js";

test("getFixturePath", () => {
  expect(getFixturePath("file1.json")).toBe(
    "/home/user/fullstack-javascript-project-46/__fixtures__/file1.json",
  );
});
