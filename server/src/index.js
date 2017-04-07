require('babel-register')

import Koa from 'koa'
import cors from 'koa2-cors'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import mongoose from 'mongoose'

import error from './middlewares/error'
import logger from './middlewares/logger'
import route from './routes'
import { DATABASE, NODE_ENV, ALLOW_ORIGIN } from '../.env'

mongoose.Promise = global.Promise
mongoose.connect(DATABASE, {
  promiseLibrary: global.Promise,
  config: {
    autoIndex: NODE_ENV !== 'production'
  }
})

const app = new Koa()
const router = new Router()

app.use(error())
app.use(cors({ origin: ALLOW_ORIGIN }))
app.use(logger())
app.use(serve('assets'))
app.use(bodyParser())

route(router)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001)
