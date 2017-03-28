'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let getUserFavorites = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    const favorites = yield _Favorite2.default.find({
      user: ctx.state.uid
    }).populate('user screenshot').exec();

    ctx.response.body = favorites;

    ctx.status = 200;
  });

  return function getUserFavorites(_x) {
    return _ref.apply(this, arguments);
  };
})();

let toggleFavorite = (() => {
  var _ref2 = _asyncToGenerator(function* (ctx) {
    const screenshotId = ctx.request.body.screenshotId;


    const screenshot = yield _Screenshot2.default.findById(screenshotId).exec();

    if (!screenshot) {
      ctx.throw(400);
    }

    const user = yield _User2.default.findById(ctx.state.uid);

    let favorite = yield _Favorite2.default.findOne({
      user: ctx.state.uid,
      screenshot: screenshotId
    }).exec();

    if (favorite) {
      yield favorite.remove();

      yield _User2.default.update({ _id: ctx.state.uid }, {
        $pull: { favorites: favorite._id }
      });

      yield _Screenshot2.default.update({ _id: screenshotId }, {
        $pull: { favorites: favorite._id }
      });

      ctx.status = 202;
    } else {
      favorite = new _Favorite2.default({
        user: ctx.state.uid,
        screenshot: screenshotId
      });

      user.favorites.push(favorite);
      screenshot.favorites.push(favorite);

      yield favorite.save();
      yield user.save();
      yield screenshot.save();

      ctx.status = 201;
    }

    ctx.response.body = favorite;
  });

  return function toggleFavorite(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let getFavoriteScreenshots = (() => {
  var _ref3 = _asyncToGenerator(function* (ctx) {
    const favorites = yield _Favorite2.default.find({
      user: ctx.state.uid
    }).exec();

    const screenshots = yield _Screenshot2.default.find().where('_id').in(favorites.map(function (favorite) {
      return favorite.screenshot;
    })).populate('favorites').exec();

    ctx.response.body = screenshots;

    ctx.status = 200;
  });

  return function getFavoriteScreenshots(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

let getUploadedScreenshots = (() => {
  var _ref4 = _asyncToGenerator(function* (ctx) {
    const screenshots = yield _Screenshot2.default.find({
      user: ctx.state.uid
    }).populate('favorites').exec();

    ctx.response.body = screenshots;

    ctx.status = 200;
  });

  return function getUploadedScreenshots(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Favorite = require('../models/Favorite');

var _Favorite2 = _interopRequireDefault(_Favorite);

var _Screenshot = require('../models/Screenshot');

var _Screenshot2 = _interopRequireDefault(_Screenshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  getUserFavorites,
  toggleFavorite,
  getFavoriteScreenshots,
  getUploadedScreenshots
};