const isPlainObject = (val) => {
  return val !== null && typeof val === "object" && !Array.isArray(val);
};

const construction = (node, depth, indentation, sign = " ") => {
  let result = [];
  if (isPlainObject(node.value)) {
    result.push(".".repeat(indentation) + `${sign} ${node.key}: {`);
    result.push(print(node.value, depth + 1));
    result.push(".".repeat(indentation + 2) + `}`);
  } else {
    result.push(".".repeat(indentation) + `${sign} ${node.key}: ${node.value}`);
  }
  return result.join("\n");
};

const print = (obj, depth) => {
  let result = [];
  let moreDepth = depth * 4;
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (isPlainObject(obj[key])) {
      result.push(".".repeat(moreDepth) + `${key}: {`);
      result.push(print(obj[key], depth + 1));
      result.push(".".repeat(moreDepth) + `}`);
    } else {
      result.push(".".repeat(moreDepth) + `${key}: ${obj[key]}`);
    }
  });
  return result.join("\n");
};

const iter = (tree, depth = 1) => {
  const result = [];
  let indentation = depth * 4 - 2;
  tree.forEach((node) => {
    if (node.type === "removed") {
      result.push(construction(node, depth, indentation, "-"));
    } else if (node.type === "added") {
      result.push(construction(node, depth, indentation, "+"));
    } else if (node.type === "changed") {
      result.push(
        construction({ ...node, value: node.value1 }, depth, indentation, "-"),
      );
      result.push(
        construction({ ...node, value: node.value2 }, depth, indentation, "+"),
      );
    } else if (node.type === "unchanged") {
      result.push(construction(node, depth, indentation));
    } else if (node.type === "nested") {
      result.push(".".repeat(indentation + 2) + `${node.key}: {`);
      let y = iter(node.children, depth + 1).split("\n");
      y.forEach((item) => {
        result.push(item);
      });
      result.push(".".repeat(indentation + 2) + `}`);
    }
  });
  return result.join("\n");
};

const stylish = (tree) => `{\n${iter(tree)}\n}`;

export { stylish, isPlainObject };
