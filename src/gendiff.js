import _ from "lodash";
import { parsing } from "./parsers.js";
import { isPlainObject } from "../formatters/stylish.js";
import { choiceFormat } from "../formatters/index.js";

export default (pathFile1, pathFile2, format = "stylish") => {
  const { file1, file2 } = parsing(pathFile1, pathFile2);
  let resultDif = dif(file1, file2);
  let resultFormat = choiceFormat(format);
  return resultFormat(resultDif);
};

const dif = (file1, file2) => {
  const collector = [];

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const commonArray = _.sortBy(_.union(keysFile1, keysFile2));

  commonArray.forEach((key) => {
    if (!Object.hasOwn(file2, key)) {
      collector.push({ type: "removed", key: key, value: file1[key] });
    } else if (!Object.hasOwn(file1, key)) {
      collector.push({ type: "added", key: key, value: file2[key] });
    } else if (file1[key] === file2[key]) {
      collector.push({ type: "unchanged", key: key, value: file1[key] });
    } else if (isPlainObject(file1[key]) && isPlainObject(file2[key])) {
      collector.push({
        type: "nested",
        key: key,
        value1: file1[key],
        value2: file2[key],
        children: [],
      });
    } else if (file1[key] !== file2[key]) {
      collector.push({
        type: "changed",
        key: key,
        value1: file1[key],
        value2: file2[key],
      });
    }
  });
  collector.forEach((node) => {
    if (node.type === "nested") {
      return (node.children = dif(node.value1, node.value2));
    }
  });
  return collector;
};
