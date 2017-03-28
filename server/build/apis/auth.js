'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let signup = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    var _ctx$request$body = ctx.request.body;
    const email = _ctx$request$body.email,
          password = _ctx$request$body.password,
          username = _ctx$request$body.username;


    let user = yield _User2.default.findOne({
      $or: [{ email }, { username }]
    }).exec();

    if (user) {
      ctx.throw(400, 'User with this email or username already exists.');
    }

    const salt = (0, _utils.getRandomString)(16);
    const hash = (0, _utils.sha512)(password, salt);

    user = new _User2.default({ email, username, salt, hash });

    try {
      yield user.save();
    } catch (e) {
      ctx.throw(500, e);
    }

    ctx.response.body = {
      userId: user._id,
      token: (0, _utils.generateToken)(user._id, _env.SECRET, TOKEN_EXPIRES_IN)
    };

    ctx.status = 201;
  });

  return function signup(_x) {
    return _ref.apply(this, arguments);
  };
})();

let login = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    var _ctx$request$body2 = ctx.request.body;
    const email = _ctx$request$body2.email,
          password = _ctx$request$body2.password;


    const user = yield _User2.default.findOne({
      $or: [{ email: email }, { username: email }]
    });

    if (!user) {
      ctx.throw(400, 'Invalid email/username or password.');
    }

    const actualHash = (0, _utils.sha512)(password, user.salt);
    const expectedHash = user.hash;

    if (actualHash !== expectedHash) {
      ctx.throw(400, 'Invalid email/username or password.');
    }

    ctx.response.body = {
      userId: user._id,
      token: (0, _utils.generateToken)(user._id, _env.SECRET, TOKEN_EXPIRES_IN)
    };

    ctx.status = 200;
  });

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var _env = require('../../.env');

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const TOKEN_EXPIRES_IN = '7 days';

exports.default = {
  signup,
  login
};