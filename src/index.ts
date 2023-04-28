import { Listr } from 'listr2'
import { execaSync } from 'execa'
import fs from 'fs';
import { getCurrentFilePath } from './utils';
import path from 'node:path';

const { dirname } = getCurrentFilePath();
interface Ctx {
  /* some variables for internal use */
}
const tasks = new Listr<Ctx>([

  {
    title: 'npm init',
    task() {
      execaSync('npm', ['init'],
        {
          stdio: 'inherit',
          shell: true,
        })
    },
    options: { persistentOutput: true }
  }, {
    title: 'install dependencies',
    task() {
      execaSync('npm', ['i', '-D',
        'react@18.2.0',
        'react-dom@18.2.0',
        'react-router-dom@6.10.0',
        'redux@4.2.1',
        "react-redux@8.0.5",
        'redux-thunk@2.4.2',
        "@reduxjs/toolkit@1.9.3"
      ]);
    }
  }, {
    title: 'set .gitignore',
    task: () => {
      const data = `/node_modules\n/lib\n/dist\n.DS_Store`
      fs.writeFileSync(path.resolve(process.cwd(), '.gitignore'), data)
    }
  }, {
    title: 'create tsconfig.json',
    task() {
      execaSync('cp', ['-rf', path.resolve(dirname, './template/tsconfig.json'), process.cwd()])
    }
  }, {
    title: 'create demo files',
    task() {
      execaSync('cp', ['-rf', path.resolve(dirname, './template/src'), process.cwd()])
    },
  }, {
    title: 'create index.html file',
    task() {
      execaSync('cp', ['-rf', path.resolve(dirname, './template/index.html'), process.cwd()])
    },
  }, {
    title: 'Setup command',
    task() {
      const packagePath = path.resolve(process.cwd(), './package.json');
      const configString = fs.readFileSync(packagePath, { encoding: 'utf8' });
      let configObj: any = {};
      try {
        configObj = JSON.parse(configString);
      } catch (error) {
        throw new Error('package.json 解析错误！')
      }
      configObj.scripts = {
        "dev": "node ./node_modules/h5-pack/index.mjs --mode=dev:web --config=./h5-pack.dev.js"
      }
      // configObj.main = "./dist/index.js";
      configObj.type = "module";
      // configObj.files = [
      //   "dist/*",
      //   "*.md",
      //   "package.json"
      // ]
      fs.writeFileSync(packagePath, JSON.stringify(configObj, null, 4), { encoding: 'utf-8' });
    },
  }
])


tasks.run()
