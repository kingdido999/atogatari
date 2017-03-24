require('babel-register')

import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import mongoose from 'mongoose'

import logger from './middlewares/logger'
import route from './routes'
import env from '../.env'

mongoose.Promise = global.Promise
mongoose.connect(env.database, {
  promiseLibrary: global.Promise
})

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

if (process.env.NODE_ENV === 'production') {
  app.use(serve('../client/build'));
}

app.use(logger())
app.use(serve('assets'))
app.use(bodyParser())

route(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001)