import jwt from 'jsonwebtoken'
import config from '../config'

export default function tokenAuth () {
  return async function(ctx, next) {
    const token = ctx.request.headers['authorization']

    try {
      const decoded = jwt.verify(token, config.secret)
      ctx.state.uid = decoded.uid
    } catch (e) {
      ctx.throw(401, e)
    }

    await next()
  }
}
