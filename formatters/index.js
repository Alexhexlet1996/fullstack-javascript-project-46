import { stylish } from "../formatters/stylish.js";
import { plain } from "../formatters/plain.js";
import { json } from "../formatters/json.js";

const choiceFormat = (format) => {
  let resultFormat;
  if (format === "stylish") {
    resultFormat = stylish;
  } else if (format === "plain") {
    resultFormat = plain;
  } else if (format === "json") {
    resultFormat = json;
  }
  return resultFormat;
};

export { choiceFormat };
