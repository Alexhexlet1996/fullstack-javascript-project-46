import { stylish } from "../formatters/stylish.js";
import { plain } from "../formatters/plain.js";
import { json } from "../formatters/json.js";

const choice = {
  stylish,
  plain,
  json,
};

const choiceFormat = (format) => {
  return choice[format];
};

export { choiceFormat };
