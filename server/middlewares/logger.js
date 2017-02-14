import morgan from 'koa-morgan'

export default function() {
  return async function(ctx, next) {
    morgan('combined')
    await next()
  }
}
