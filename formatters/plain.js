import { isPlainObject } from "./stylish.js"

  const iter = (tree, key = '') => {
  let result = ''
  tree.forEach((item) => {
  if (Object.hasOwn(item, 'type')) {
    if (item.type === 'nested') {
      const children = item.children
      let string = (key === '') ? `${item.key}` : `${key}.${item.key}`
      let chain = iter(children, string)
      result += chain
    }
    if (item.type === 'removed') {
      let string = (key === '') ? `${item.key}` : `${key}.${item.key}`
      result += `Property ${string} was removed\n`
    }
    else if (item.type === 'added') {
      if (isPlainObject(item.value)){
        let string = (key === '') ? `${item.key}` : `${key}.${item.key}`
      result += `Property ${string} was added with value: [complex value]\n`
      }
      else {
        let string = (key === '') ? `${item.key}` : `${key}.${item.key}`
      result += `Property ${string} was added with value: ${item.value}\n`
     }
    }
    else if (item.type === 'changed') {
      if (isPlainObject(item.value2)){
      result += `Property ${key}.${item.key} was updated. From ${item.value1} to [complex value]\n`
      }
      else if ((isPlainObject(item.value1))) {
          result += `Property ${key}.${item.key} was updated. From [complex value] to ${item.value2}\n`
        }
        else{
      result += `Property ${key}.${item.key} was updated. From ${item.value1} to ${item.value2}\n`
     }
    }
  }
  })

    return result
  }

  const plain = (tree) => iter(tree).trimEnd()

  export { plain }