import user from '../apis/user'
import screenshot from '../apis/screenshot'
import tag from '../apis/tag'
import favorite from '../apis/favorite'
import search from '../apis/search'

import tokenAuth from '../middlewares/tokenAuth'

export default function route (router) {
  router.get('/screenshot', screenshot.getScreenshot)
  router.get('/screenshots', screenshot.getScreenshots)
  router.post('/screenshot/upload', tokenAuth(), screenshot.upload)
  router.post('/screenshot/download', screenshot.download)
  router.del('/screenshot/:id', tokenAuth(), screenshot.deleteScreenshot)

  router.get('/favorites', favorite.getFavorites)

  router.get('/tag', tag.getTag)
  router.post('/tag', tokenAuth(), tag.addTag)
  router.del('/tag/:name', tokenAuth(), tag.deleteTag)

  router.post('/user', tokenAuth(), user.getAuthedUser)
  router.post('/user/signup', user.signup)
  router.post('/user/login', user.login)
  router.post('/user/favorites', tokenAuth(), user.getUserFavorites)
  router.post('/user/toggleFavorite', tokenAuth(), user.toggleFavorite)

  router.get('/search', search.search)
}
