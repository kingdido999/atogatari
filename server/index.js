import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import mongoose from 'mongoose'

import logger from './middlewares/logger'
import route from './routes'
import config from './config'

mongoose.Promise = global.Promise
mongoose.connect(config.database.dev, {
  promiseLibrary: global.Promise
})

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

app.use(logger())
app.use(serve('assets'))
app.use(bodyParser())

route(router)
app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3001)
