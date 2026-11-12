import _ from "lodash";
import { parsing } from "./parsers.js";
import { isPlainObject } from "./formatters/stylish.js";
import { choiceFormat } from "./formatters/index.js";
import { readFileSync } from "node:fs";

export default (pathFile1, pathFile2, format = "stylish") => {
  let parameters = {
    extension: pathFile1.split(".").pop(),
    readFile1: readFileSync(pathFile1, "utf8"),
    readFile2: readFileSync(pathFile2, "utf8"),
  };
  const { file1, file2 } = parsing(parameters);
  let resultDif = dif(file1, file2);
  let resultFormat = choiceFormat(format);
  return resultFormat(resultDif);
};

const dif = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const commonArray = _.sortBy(_.union(keysFile1, keysFile2));

  let collector = commonArray.map((key) => {
    if (!Object.hasOwn(file2, key)) {
      return { type: "removed", key: key, value: file1[key] };
    } else if (!Object.hasOwn(file1, key)) {
      return { type: "added", key: key, value: file2[key] };
    } else if (_.isEqual(file1[key], file2[key])) {
      return { type: "unchanged", key: key, value: file1[key] };
    } else if (isPlainObject(file1[key]) && isPlainObject(file2[key])) {
      return {
        type: "nested",
        key: key,
        value1: file1[key],
        value2: file2[key],
        children: dif(file1[key], file2[key]),
      };
    } else if (file1[key] !== file2[key]) {
      return {
        type: "changed",
        key: key,
        value1: file1[key],
        value2: file2[key],
      };
    }
  });
  return collector;
};
