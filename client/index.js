const Koa = require('koa')
const serve = require('koa-static')
const send = require('koa-send')

const app = new Koa()

app.use(serve('./build'))

// Serve 'index.html' for any unknown paths
app.use(async function (ctx) {
  await send(ctx, '/index.html', { root: './build'});
})

app.listen(5000)
