import user from '../apis/user'
import screenshot from '../apis/screenshot'
import tag from '../apis/tag'
import favorite from '../apis/favorite'
import search from '../apis/search'

import tokenAuth from '../middlewares/tokenAuth'

export default function route (router) {
  router.get('/screenshot', screenshot.getScreenshot)
  router.get('/screenshots', screenshot.getScreenshots)
  router.get('/tag', tag.getTag)
  router.get('/favorites', favorite.getFavorites)
  router.get('/search', search.search)

  router.post('/signup', user.signup)
  router.post('/login', user.login)
  router.post('/screenshot/upload', tokenAuth(), screenshot.upload)

  router.post('/user', tokenAuth(), user.getAuthedUser)
  router.post('/user/favorites', tokenAuth(), user.getUserFavorites)
  router.post('/user/favorite', tokenAuth(), user.toggleFavorite)
  router.post('/user/favoriteScreenshots', tokenAuth(), user.getFavoriteScreenshots)
  router.post('/user/uploadedScreenshots', tokenAuth(), user.getUploadedScreenshots)

  router.post('/tag', tokenAuth(), tag.addTag)
  router.del('/tag/:name', tokenAuth(), tag.deleteTag)

  router.del('/screenshot/:id', tokenAuth(), screenshot.deleteScreenshot)
}
