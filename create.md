## 安装依赖
  1. ```npm i typescript ts-node tslib && npm i -D @types/node```
  2. ```npm i rollup rollup-plugin-typescript @rollup/plugin-commonjs @rollup/plugin-node-resolve```
  3. ```npm i argv listr2 &&  npm i -D @types/argv```


## 开发模式调试
  1. 全局安装ts-node: ```npm i  -g typescript ts-node tslib```
  2. 任意目录：```TS_NODE_PROJECT=./tsconfig.json  node --inspect-brk  --loader ts-node/esm /Users/xmly/Documents/shadow/Luban/src/index.ts```