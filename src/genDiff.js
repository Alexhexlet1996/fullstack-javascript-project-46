import _ from "lodash";
import { parsing } from "./parsing.js";

export default (pathFile1, pathFile2) => {
  const { file1, file2 } = parsing(pathFile1, pathFile2);

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const common = _.intersection(keysFile1, keysFile2);

  const collector = [];

  common.map((item) => {
    if (file1[item] === file2[item]) {
      collector.push(`  ${item}: ${file1[item]}`);
    } else {
      collector.push(`- ${item}: ${file1[item]}`);
      collector.push(`+ ${item}: ${file2[item]}`);
    }
  });

  keysFile2
    .filter((item) => {
      if (!keysFile1.includes(item)) {
        return true;
      }
    })
    .forEach((item) => {
      collector.push(`+ ${item}: ${file2[item]}`);
    });

  keysFile1
    .filter((item) => {
      if (!keysFile2.includes(item)) {
        return true;
      }
    })
    .forEach((item) => {
      collector.push(`- ${item}: ${file1[item]}`);
    });

  const result = collector
    .sort((a, b) => {
      let nameA = extractName(a);
      let nameB = extractName(b);

      if (nameA === nameB) {
        return a[0] === "-" ? -1 : 1;
      } else {
        return nameA.localeCompare(nameB);
      }
    })
    .join("\n");

  return `{\n${result}\n}`;
};

const extractName = (str) => {
  const comparator = ["+", "-"];
  return comparator.includes(str[0])
    ? str.split(":")[0].slice(2).trim()
    : str.split(":")[0].trim();
};
