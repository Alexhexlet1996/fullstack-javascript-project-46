import { isPlainObject } from "./stylish.js";

const iter = (tree, key = "") => {
  let result = "";
  tree.forEach((item) => {
    let string = key === "" ? `${item.key}` : `${key}.${item.key}`;
    if (item.type === "nested") {
      const children = item.children;
      let chain = iter(children, string);
      result += chain;
    }
    if (item.type === "removed") {
      result += generator.removed(string);
    } else if (item.type === "added") {
      result += generator.added(string, item.value);
    } else if (item.type === "changed") {
      result += generator.changed(string, item.value1, item.value2);
    }
  });
  return result;
};

const plain = (tree) => iter(tree).trimEnd();

function formatValue(value) {
  const exceptions = [false, true, null];
  if (exceptions.includes(value) || typeof value === 'number') {
    return `${value}`;
  } else {
    return isPlainObject(value) ? "[complex value]" : `'${value}'`;
  }
}

const generator = {
  formatValue,
  added: function (string, value) {
    return `Property '${string}' was added with value: ${this.formatValue(value)}\n`;
  },
  changed: function (string, value1, value2) {
    return `Property '${string}' was updated. From ${this.formatValue(value1)} to ${this.formatValue(value2)}\n`;
  },
  removed: function (string) {
    return `Property '${string}' was removed\n`;
  },
};

export { plain };
