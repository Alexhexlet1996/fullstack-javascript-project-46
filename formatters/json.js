import { isPlainObject } from "./stylish.js"

const json = (tree, depth = 1) => {
  return JSON.stringify(tree, null, 2)
}


export { json }