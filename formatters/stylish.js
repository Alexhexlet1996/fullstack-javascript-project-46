const isPlainObject = (val) => {
  return val !== null && typeof val === "object" && !Array.isArray(val);
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
      if (isPlainObject(node.value)) {
        result.push(".".repeat(indentation) + `- ${node.key}: {`);
        result.push(print(node.value, depth + 1));
        result.push(".".repeat(indentation + 2) + `}`);
      } else {
        result.push(".".repeat(indentation) + `- ${node.key}: ${node.value}`);
      }
    } else if (node.type === "added") {
      if (isPlainObject(node.value)) {
        result.push(".".repeat(indentation) + `+ ${node.key}: {`);
        result.push(print(node.value, depth + 1));
        result.push(".".repeat(indentation + 2) + `}`);
      } else {
        result.push(".".repeat(indentation) + `+ ${node.key}: ${node.value}`);
      }
    } else if (node.type === "changed") {
      if (isPlainObject(node.value1)) {
        result.push(".".repeat(indentation) + `- ${node.key}: {`);
        result.push(print(node.value1, depth + 1));
        result.push(".".repeat(indentation + 2) + `}`);
      } else {
        result.push(".".repeat(indentation) + `- ${node.key}: ${node.value1}`);
      }
      if (isPlainObject(node.value2)) {
        result.push(".".repeat(indentation) + `+ ${node.key}: {`);
        result.push(print(node.value2, depth));
        result.push(".".repeat(indentation + 2) + `}`);
      } else {
        result.push(".".repeat(indentation) + `+ ${node.key}: ${node.value2}`);
      }
    } else if (node.type === "unchanged") {
      result.push(".".repeat(indentation + 2) + `${node.key}: ${node.value}`);
    } else if (node.type === "nested") {
      result.push(".".repeat(indentation + 2) + `${node.key}: {`);
      let y = iter(node.children, depth + 1).split("\n");
      y.forEach((item) => {
        result.push(item);
      });
      result.push(".".repeat(indentation + 2) + `}`);
      
    }
  });
  return result.join('\n')
};

const stylish = (tree) => `{\n${iter(tree)}\n}`

export { stylish, isPlainObject };