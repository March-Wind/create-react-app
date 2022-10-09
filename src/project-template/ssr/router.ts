import fs from 'node:fs'
import {resolve} from 'node:path';
import Router from "@koa/router";
import routeMap from "./project/routes";
import render2String from './render'
const router = new Router();
const routes = routeMap.routes.default;
console.log(routeMap)
debugger
Object.keys(routes).forEach((path) => {
  const Comp = routes[path];
  router.get(path,(ctx) => {
    const domString = render2String(Comp,ctx.req.url)
    console.log(domString);
    debugger
    const content = fs.readFileSync(resolve(__dirname,'../pack/spa/index.html'),{encoding:'utf-8'})
    const html = content.replace('<div id="root"></div>',`<div id="root">${domString}</div>`)
    ctx.set("Content-Type", "text/html");
    ctx.body = html;
  })
})

export default router;