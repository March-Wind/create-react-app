import path from "path";
import { copyFile, copyFileSync, fstat,mkdirSync,readdirSync, readFileSync, statSync } from "fs"
import util from 'node:util'

/**
 * 判断是否有文件
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
const isFile = (path:string):boolean => {
  const state = statSync(path);
  return state.isFile()
  
}
/**
 * 判断是否有文件夹
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
const isDirectory =  (path:string):boolean => {
  const state = statSync(path)
  return state.isDirectory()
}

/**
 * 读取文件内容，如果不存在返回undefined
 *
 * @param {string} path
 * @param {Parameters<typeof readFileSync>[1]} options
 * @return {*} 
 */
const _readFileSnyc = (path:string, options?:Parameters<typeof readFileSync>[1]) => {
  const existence = isFile(path);
  if(existence){
    return readFileSync(path,options);
  }
}

/**
 * 读取js文件内容，不存在的话返回undefined
 *
 * @param {string} path
 * @return {*} 
 */
const readJsFileSnyc = (path:string) => {
  let content
  try {
     content = require(path)
  } catch (error) {
    
  }
  return content;
}

interface DFSTree {
  value?: any;
  children?: DFSTree[];
}
interface DFSOptons {
  getChildrenFn?:(tree:any) => any[];
  traverse?:(node:any) => boolean;
  handleNode?:(node:any) => void;
}
// 深度优先遍历
function DFS (tree:any, options:DFSOptons)
function DFS (tree:DFSTree)
function DFS (tree:DFSTree |any,options?:DFSOptons){
  const defaultOptions:DFSOptons = {
    getChildrenFn: (node) => {
      return node.children
    },
    traverse:(node) => {
      return !!node.children
       
    },
    handleNode:(node) => {
      return;
    }
  }
  const _options = {
    ...defaultOptions,
    ...options
  }
  const {getChildrenFn, traverse, handleNode} = _options;
  const children = getChildrenFn(tree);
  const len = children.length;
  for(let i = 0; i <len; i++){
    const node = children[i];
    // 针对节点进行业务处理
    handleNode(node);
    // 逻辑控制：是否继续遍历自己的孩子
    if(traverse(node)){
      DFS(node,options);
    }
  }
}

const _fsCopy = (source:string,destination:string) => {
  const options:DFSOptons = {
    getChildrenFn(node) {
        return readdirSync(node);
    },
    traverse(node){
      return isDirectory(node)
    },
    handleNode(node) {
      if(isFile(node)){
        copyFileSync(node,destination) 
      }
      if(isDirectory(node)){
        const dir = (node as string).replace(source,'');
        const _dest = path.resolve(destination,dir)
        mkdirSync(_dest,{recursive:true});
      }
    },

  }
  DFS(source,options)
}


// 递归copy文件到某个目录下
const fsCopy = (source:string,destination:string) => {
  // 深度优先遍历
  const recursive = (src:string, dest:string) => {
    const files = readdirSync(src);
    for(let i =0; i < files.length; i++){
      const _src = src + '/' + files[i];
      const _dest = dest + '/' + files[i];
      if(isFile(_src)){
        debugger
       copyFileSync(_src,_dest) 
      }
      if(isDirectory(_src)){
        mkdirSync(_dest,{recursive:true});
        recursive(_src,_dest);
      }
    }
    
  }
 recursive(source,destination);
}

export {
  isFile,
  isDirectory,
  _readFileSnyc,
  readJsFileSnyc,
  fsCopy
}