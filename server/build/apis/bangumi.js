'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getBangumis = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    const search = ctx.request.query.search;

    const criteria = search ? { title: new RegExp((0, _utils.escapeRegex)(search), 'gi') } : {};

    const bangumis = yield _Bangumi2.default.find(criteria).populate({
      path: 'screenshots',
      populate: {
        path: 'user favorites'
      }
    }).exec();

    ctx.response.body = bangumis;

    ctx.status = 200;
  });

  return function getBangumis(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getBangumi = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    const id = ctx.request.query.id;


    const bangumi = yield _Bangumi2.default.findById(id).populate({
      path: 'screenshots',
      populate: {
        path: 'user favorites'
      }
    }).exec();

    ctx.response.body = bangumi;

    ctx.status = 200;
  });

  return function getBangumi(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var _Bangumi = require('../models/Bangumi');

var _Bangumi2 = _interopRequireDefault(_Bangumi);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  getBangumis,
  getBangumi
};