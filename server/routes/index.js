import auth from '../apis/auth'
import file from '../apis/file'
import bangumi from '../apis/bangumi'
import favorite from '../apis/favorite'
import screenshot from '../apis/screenshot'

import tokenAuth from '../middlewares/tokenAuth'

export default function route (router) {
  router.get('/bangumi', bangumi.getBangumi)
  router.get('/bangumis', bangumi.getBangumis)

  router.post('/signup', auth.signup)
  router.post('/login', auth.login)
  router.post('/upload', file.upload)

  router.post('/screenshots', tokenAuth(), screenshot.getScreenshots)
  router.post('/favorites', tokenAuth(), favorite.getFavorites)
  router.post('/favorite', tokenAuth(), favorite.addFavorite)
  router.delete('/favorite', tokenAuth(), favorite.removeFavorite)
}
