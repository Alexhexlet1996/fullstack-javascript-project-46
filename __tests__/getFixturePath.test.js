import { test, expect } from "vitest";
import { getFixturePath } from "../src/getFixturePath.js";

test("getFixturePath", () => {
  expect(getFixturePath("nestedFile1.json")).toBe(
    "/home/user/fullstack-javascript-project-46/__fixtures__/nestedFile1.json",
  );
});
