'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getScreenshot = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    const id = ctx.request.query.id;


    const screenshot = yield _Screenshot2.default.findById(id).populate('bangumi favorites').exec();

    ctx.response.body = screenshot;

    ctx.status = 200;
  });

  return function getScreenshot(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getScreenshots = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    const query = ctx.request.query;


    const screenshots = yield _Screenshot2.default.find(query).populate('bangumi user favorites').exec();

    ctx.response.body = screenshots;

    ctx.status = 200;
  });

  return function getScreenshots(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var _Screenshot = require('../models/Screenshot');

var _Screenshot2 = _interopRequireDefault(_Screenshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  getScreenshot,
  getScreenshots
};