import Koa from 'koa';
import dom from 'koa-dom'
import {resolve} from 'node:path'
import router from './router';
const app = new Koa();
debugger
// const layout = dom(resolve(__dirname + '../pack/spa/index.html'))


app.use(router.routes())
.use(router.allowedMethods())
// .use(layout);
// app.use(async (ctx) => {
  // ctx.body = 'hello world!'/;
// })

app.listen(8082);