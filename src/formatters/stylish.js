const isPlainObject = (val) => {
  return val !== null && typeof val === "object" && !Array.isArray(val);
};

const construction = (node, depth, sign = " ") => {
  let result = [];
  let indentation = depth * 4 - 2;
  if (isPlainObject(node.value)) {
    result.push(" ".repeat(indentation) + `${sign} ${node.key}: {`);
    const keys = Object.entries(node.value);
    keys.forEach((item) => {
      let obj = { key: item[0], value: item[1] };
      result.push(construction(obj, depth + 1));
    });
    result.push(" ".repeat(indentation + 2) + `}`);
  } else {
    result.push(" ".repeat(indentation) + `${sign} ${node.key}: ${node.value}`);
  }
  return result.join("\n");
};

const iter = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    let selection = objType[node.type];
    return selection(node, depth);
  });
  return lines.join("\n");
};

const stylish = (tree) => `{\n${iter(tree)}\n}`;

const objType = {
  removed: (node, depth) => [construction(node, depth, "-")],
  added: (node, depth) => [construction(node, depth, "+")],
  changed: (node, depth) => [
    [construction({ ...node, value: node.value1 }, depth, "-")],
    [construction({ ...node, value: node.value2 }, depth, "+")],
  ],
  unchanged: (node, depth) => [construction(node, depth)],
  nested: (node, depth) => [
    " ".repeat(depth * 4) + `${node.key}: {`,
    iter(node.children, depth + 1),
    " ".repeat(depth * 4) + `}`,
  ],
};

export { stylish, isPlainObject };
