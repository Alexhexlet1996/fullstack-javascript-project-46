import { isPlainObject } from "./stylish.js";

const iter = (tree, key = "") => {
  let result = tree
    .filter((item) => item.type !== "unchanged")
    .flatMap((item) => {
      let string = key === "" ? `${item.key}` : `${key}.${item.key}`;
      return generator[item.type](string, item);
    });
  return result.join("\n");
};

const plain = (tree) => iter(tree).trimEnd();

function formatValue(value) {
  const exceptions = [false, true, null];
  if (exceptions.includes(value) || typeof value === "number") {
    return `${value}`;
  } else {
    return isPlainObject(value) ? "[complex value]" : `'${value}'`;
  }
}

const generator = {
  formatValue,
  added: function (string, item) {
    return `Property '${string}' was added with value: ${this.formatValue(item.value)}`;
  },
  changed: function (string, item) {
    return `Property '${string}' was updated. From ${this.formatValue(item.value1)} to ${this.formatValue(item.value2)}`;
  },
  removed: function (string) {
    return `Property '${string}' was removed`;
  },
  nested: function (string, item) {
    const children = item.children;
    return iter(children, string);
  },
};

export { plain };
