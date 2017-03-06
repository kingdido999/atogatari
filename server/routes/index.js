import auth from '../apis/auth'
import file from '../apis/file'
import bangumi from '../apis/bangumi'
import favorite from '../apis/favorite'
import screenshot from '../apis/screenshot'

export default function route (router) {
  router.get('/bangumi', bangumi.getBangumi)
  router.get('/bangumis', bangumi.getBangumis)
  router.get('/screenshots', screenshot.getScreenshots)

  router.post('/signup', auth.signup)
  router.post('/login', auth.login)
  router.post('/upload', file.upload)

  router.post('/favorites', favorite.getFavorites)
  router.post('/favorite', favorite.addFavorite)
  router.delete('/favorite', favorite.removeFavorite)
}
