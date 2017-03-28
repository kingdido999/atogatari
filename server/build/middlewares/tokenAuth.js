'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokenAuth;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _env = require('../../.env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function tokenAuth() {
  return (() => {
    var _ref = _asyncToGenerator(function* (ctx, next) {
      const token = ctx.request.headers['authorization'];

      try {
        const decoded = _jsonwebtoken2.default.verify(token, _env.SECRET);
        ctx.state.uid = decoded.uid;
      } catch (e) {
        ctx.throw(401, e);
      }

      yield next();
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();
}