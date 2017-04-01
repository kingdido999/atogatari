import auth from '../apis/auth'
import file from '../apis/file'
import user from '../apis/user'
import bangumi from '../apis/bangumi'
import screenshot from '../apis/screenshot'
import tag from '../apis/tag'
import favorite from '../apis/favorite'
import search from '../apis/search'

import tokenAuth from '../middlewares/tokenAuth'

export default function route (router) {
  router.get('/bangumi', bangumi.getBangumi)
  router.get('/bangumis', bangumi.getBangumis)
  router.get('/screenshot', screenshot.getScreenshot)
  router.get('/screenshots', screenshot.getScreenshots)
  router.get('/tag', tag.getTag)
  router.get('/favorites', favorite.getFavorites)
  router.get('/search', search.search)

  router.post('/signup', auth.signup)
  router.post('/login', auth.login)
  router.post('/upload', tokenAuth(), file.upload)

  router.post('/user', tokenAuth(), user.getAuthedUser)
  router.post('/user/favorites', tokenAuth(), user.getUserFavorites)
  router.post('/user/favorite', tokenAuth(), user.toggleFavorite)
  router.post('/user/favoriteScreenshots', tokenAuth(), user.getFavoriteScreenshots)
  router.post('/user/uploadedScreenshots', tokenAuth(), user.getUploadedScreenshots)
}
