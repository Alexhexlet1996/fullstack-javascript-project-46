import { parsing } from "./parsers.js";
import _ from "lodash"

export default (pathFile1, pathFile2) => {
  const { file1, file2 } = parsing(pathFile1, pathFile2);
  let a = dif(file1, file2)
  let b = formatter(a)
  return `{\n${b}\n}`
};


const isPlainObject = (val) => {
  return val !== null 
    && typeof val === 'object' 
    && !Array.isArray(val);
};



const dif = (file1, file2) => {
  const collector = [];

  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);

  const commonArray = _.sortBy(_.union(keysFile1, keysFile2))

  commonArray.forEach((key) => {
    if (!Object.hasOwn(file2, key)) {
      collector.push({type: 'removed', key: key, value: file1[key]})
    }
    else if (!Object.hasOwn(file1, key)) {
      collector.push({type: 'added', key: key, value: file2[key]})
    }
    else if (file1[key] === file2[key]) {
      collector.push({type: 'unchanged', key: key, value: file1[key]})
    }
    else if (isPlainObject(file1[key]) && isPlainObject(file2[key])) {
      collector.push({type: 'nested', key: key, value1: file1[key], value2: file2[key], children: []})
    }
    else if (file1[key] !== file2[key]) {
      collector.push({type: 'changed', key: key, value1: file1[key], value2: file2[key]})
    }
  })
  collector.forEach((node) => {
    if(node.type === 'nested') {
      return node.children = dif(node.value1, node.value2)
    }
  })
  return collector
}


const print = (obj, depth) => {
  let result = []
  let moreDepth = depth * 4 
  const keys = Object.keys(obj)
  keys.forEach((key) => {
    if(isPlainObject(obj[key])){
      result.push('.'.repeat(moreDepth)+`${key}: {`)
      result.push(print(obj[key], depth + 1))
      result.push('.'.repeat(moreDepth)+`}`)
    }
    else {
      result.push('.'.repeat(moreDepth)+`${key}: ${obj[key]}`)
  }
  })
  return result.join('\n')
} 

const formatter = (tree, depth = 1) => {
  const result = []
  let indentation = depth * 4 - 2
  tree.forEach((node) => {
    if(node.type === 'removed') {
      if(isPlainObject(node.value)) {
      
        result.push('.'.repeat(indentation)+`- ${node.key}: {`)
        result.push(print(node.value, depth + 1))
        result.push('.'.repeat(indentation + 2)+`}`)
      }
      else {
        result.push('.'.repeat(indentation)+`- ${node.key}: ${node.value}`)
      }
    }
    else if(node.type === 'added') {
      if(isPlainObject(node.value)) {
        let plusDepth = (depth + 1) * 4 - 2
        result.push('.'.repeat(indentation)+`+ ${node.key}: {`)
        result.push(print(node.value, depth + 1))
        result.push('.'.repeat(indentation + 2)+`}`)
      }
      else {
        result.push('.'.repeat(indentation)+`+ ${node.key}: ${node.value}`)
      }
    }
    else if(node.type === 'changed') {
      if(isPlainObject(node.value1)) {
        let plusDepth = (depth + 1) * 4 - 2
        result.push('.'.repeat(indentation)+`- ${node.key}: {`)
        result.push(print(node.value1, depth + 1))
        result.push('.'.repeat(indentation + 2)+`}`)
      }
      else {
        result.push('.'.repeat(indentation)+`- ${node.key}: ${node.value1}`)
      }
      if(isPlainObject(node.value2)) {
        let plusDepth = (depth + 1) * 4 - 2
        result.push('.'.repeat(indentation)+`+ ${node.key}: {`)
        result.push(print(node.value2, depth))
        result.push('.'.repeat(indentation + 2)+`}`)
      }
      else {
        result.push('.'.repeat(indentation)+`+ ${node.key}: ${node.value2}`)
      }
    }
    else if (node.type === 'unchanged') {
      result.push('.'.repeat(indentation + 2)+`${node.key}: ${node.value}`)
    }
    else if(node.type === 'nested') {
      result.push('.'.repeat(indentation + 2)+`${node.key}: {`)
      let y = (formatter(node.children, depth + 1)).split('\n')
      y.forEach((item) => {
        result.push(item)
      })
      result.push('.'.repeat(indentation + 2)+`}`)
    }
  })
  return result.join('\n')
}

