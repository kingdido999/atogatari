'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSend = require('koa-send');

var _koaSend2 = _interopRequireDefault(_koaSend);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('./middlewares/logger');

var _logger2 = _interopRequireDefault(_logger);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _env = require('../.env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-register');

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_env.DATABASE, {
  promiseLibrary: global.Promise,
  config: {
    autoIndex: _env.NODE_ENV !== 'production'
  }
});

const app = new _koa2.default();
const router = new _koaRouter2.default({
  prefix: '/api'
});

app.use((0, _logger2.default)());
app.use((0, _koaStatic2.default)('assets'));
app.use((0, _koaBodyparser2.default)());

(0, _routes2.default)(router);
app.use(router.routes());
app.use(router.allowedMethods());

if (_env.NODE_ENV === 'production') {
  app.use((0, _koaStatic2.default)('../client/build'));

  // Serve 'index.html' for any unknown paths
  app.use((() => {
    var _ref = _asyncToGenerator(function* (ctx) {
      yield (0, _koaSend2.default)(ctx, '/index.html', { root: '../client/build' });
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })());
}

app.listen(3001);