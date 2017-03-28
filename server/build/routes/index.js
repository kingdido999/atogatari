'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = route;

var _auth = require('../apis/auth');

var _auth2 = _interopRequireDefault(_auth);

var _file = require('../apis/file');

var _file2 = _interopRequireDefault(_file);

var _user = require('../apis/user');

var _user2 = _interopRequireDefault(_user);

var _bangumi = require('../apis/bangumi');

var _bangumi2 = _interopRequireDefault(_bangumi);

var _screenshot = require('../apis/screenshot');

var _screenshot2 = _interopRequireDefault(_screenshot);

var _tokenAuth = require('../middlewares/tokenAuth');

var _tokenAuth2 = _interopRequireDefault(_tokenAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function route(router) {
  router.get('/bangumi', _bangumi2.default.getBangumi);
  router.get('/bangumis', _bangumi2.default.getBangumis);
  router.get('/screenshot', _screenshot2.default.getScreenshot);
  router.get('/screenshots', _screenshot2.default.getScreenshots);

  router.post('/signup', _auth2.default.signup);
  router.post('/login', _auth2.default.login);
  router.post('/upload', (0, _tokenAuth2.default)(), _file2.default.upload);

  router.post('/user/favorites', (0, _tokenAuth2.default)(), _user2.default.getUserFavorites);
  router.post('/user/favorite', (0, _tokenAuth2.default)(), _user2.default.toggleFavorite);
  router.post('/user/favoriteScreenshots', (0, _tokenAuth2.default)(), _user2.default.getFavoriteScreenshots);
  router.post('/user/uploadedScreenshots', (0, _tokenAuth2.default)(), _user2.default.getUploadedScreenshots);
}