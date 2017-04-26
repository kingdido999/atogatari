import user from '../apis/user'
import screenshot from '../apis/screenshot'
import tag from '../apis/tag'
import favorite from '../apis/favorite'
import search from '../apis/search'

import tokenAuth from '../middlewares/tokenAuth'

export default function route(router) {
  router.get('/screenshot/:id', screenshot.getScreenshot)
  router.get('/screenshots', screenshot.getScreenshots)
  router.post('/screenshot/upload', tokenAuth(), screenshot.upload)
  router.post('/screenshot/download', screenshot.download)
  router.del('/screenshot/:id', tokenAuth(), screenshot.deleteScreenshot)

  router.get('/favorites', favorite.getFavorites)
  router.post('/favorite', tokenAuth(), favorite.addFavorite)
  router.del('/favorite', tokenAuth(), favorite.removeFavorite)

  router.get('/tag/:name', tag.getTag)
  router.get('/tag/:name/screenshots', tag.getTagScreenshots)
  router.get('/tags', tag.getTags)
  router.post('/tag', tokenAuth(), tag.addTag)
  router.put('/tag/:name', tokenAuth(), tag.updateTag)
  router.del('/tag/:name', tokenAuth(), tag.deleteTag)

  router.get('/user/:id', user.getUser)
  router.get('/user/:id/screenshots', user.getScreenshots)
  router.get('/user/:id/favoriteScreenshots', user.getFavoriteScreenshots)
  router.post('/user', tokenAuth(), user.getAuthedUser)
  router.post('/user/signup', user.signup)
  router.post('/user/login', user.login)

  router.get('/search', search.search)
}
