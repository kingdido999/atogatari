import auth from '../apis/auth'
import file from '../apis/file'

export default function route (router) {
  router.post('/api/signup', auth.signup)
  router.post('/api/login', auth.login)
  router.post('/api/upload', file.upload)
}
