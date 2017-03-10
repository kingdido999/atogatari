import auth from '../apis/auth'
import file from '../apis/file'
import bangumi from '../apis/bangumi'
import favorite from '../apis/favorite'
import screenshot from '../apis/screenshot'

import tokenAuth from '../middlewares/tokenAuth'

export default function route (router) {
  router.get('/bangumi', bangumi.getBangumi)
  router.get('/bangumis', bangumi.getBangumis)
  router.get('/screenshots', screenshot.getScreenshots)
  router.get('/favorites', favorite.getFavorites)

  router.post('/signup', auth.signup)
  router.post('/login', auth.login)
  router.post('/upload', file.upload)

  router.post('/user/screenshots', tokenAuth(), screenshot.getScreenshots)
  router.post('/user/favorites', tokenAuth(), favorite.getFavorites)
  // router.post('/user/favorite', tokenAuth(), favorite.addFavorite)
  // router.delete('/user/favorite', tokenAuth(), favorite.removeFavorite)
  router.post('/user/favorite', tokenAuth(), favorite.toggleFavorite)
}
