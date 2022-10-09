#!/usr/bin/env ts-node-script
import {createRequire} from 'module'
import { mkdirSync, rmSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import {exec} from "child_process";
import { Listr } from "listr2";
import { fsCopy } from "./tool/index.js";

const require = createRequire(import.meta.url);

const root_dir = process.cwd();
const template_dir = join(root_dir,'src/project-template');
const packageJson_path = resolve(template_dir,'package.json');
const projectName = process.argv.slice(2,3)[0];
const project_dir = join(root_dir,projectName);
const task = new Listr<{}>([
  {
    title: 'clear dir',
    task(ctx, task) {
      rmSync(project_dir,{recursive:true})
    },
  },
  {
    title: 'copy project template', // 复制模板项目
    async task(ctx, task) {
      // 1. 创建项目名的文件夹  
      mkdirSync(project_dir);
      // 2. 把项目模板copy到文件夹
      // 2.1 package.json 修改项目名
      const packageJson = require(packageJson_path)
      packageJson.name = projectName;
      writeFileSync(packageJson_path, JSON.stringify(packageJson, null, 2), {encoding:'utf-8'})
      // 2.2 将project-template下的文件复制到项目文件夹下
      fsCopy(template_dir, project_dir);
    },
  },
  {
    title:'install dependencies',
    task(ctx, task) {
      exec(`cd ${project_dir} && npm i`);
    },
  }
])


await task.run();