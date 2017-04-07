import jwt from 'jsonwebtoken'
import { SECRET } from '../../.env'

export default function () {
  return async function(ctx, next) {
    const token = ctx.request.headers['authorization']

    try {
      const decoded = jwt.verify(token, SECRET)
      ctx.state.uid = decoded.uid
    } catch (e) {
      ctx.throw(401, e)
    }

    await next()
  }
}
