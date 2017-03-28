'use strict';

let run = (() => {
  var _ref = _asyncToGenerator(function* () {
    yield purge();
    yield seed();
    process.exit();
  });

  return function run() {
    return _ref.apply(this, arguments);
  };
})();

let purge = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    console.log('Removing current data...');

    yield _Tag2.default.remove({});
    yield _User2.default.remove({});
    yield _Bangumi2.default.remove({});
    yield _Favorite2.default.remove({});
    yield _Screenshot2.default.remove({});
  });

  return function purge() {
    return _ref2.apply(this, arguments);
  };
})();

let seed = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    console.log('Seeding new data...');

    const userList = [];

    for (let i = 0; i < NUM_USER; i++) {
      const user = createUser();
      yield user.save();
      userList.push(user);
    }

    for (let i = 0; i < NUM_BANGUMI; i++) {
      const bangumi = createBangumi();

      for (let j = 0; j < NUM_BANGUMI_SCREENSHOT; j++) {
        const user = _faker2.default.random.arrayElement(userList);
        const tags = createRandomTags(_faker2.default.random.number(10));
        const screenshot = createScreenshot(bangumi, user, tags);
        yield screenshot.save();

        tags.forEach(function (tag) {
          return createTag(tag, screenshot._id);
        });

        user.screenshots.push(screenshot);
        yield user.save();
        bangumi.screenshots.push(screenshot);
      }

      yield bangumi.save();
    }
  });

  return function seed() {
    return _ref3.apply(this, arguments);
  };
})();

let createTag = (() => {
  var _ref4 = _asyncToGenerator(function* (name, screenshotId) {
    const tag = new _Tag2.default({
      name: name,
      slug: (0, _utils.convertToSlug)(name)
    });

    tag.screenshots.push(screenshotId);
    yield tag.save();
  });

  return function createTag(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
})();

var _utils = require('../utils');

var _Screenshot = require('../models/Screenshot');

var _Screenshot2 = _interopRequireDefault(_Screenshot);

var _Favorite = require('../models/Favorite');

var _Favorite2 = _interopRequireDefault(_Favorite);

var _Bangumi = require('../models/Bangumi');

var _Bangumi2 = _interopRequireDefault(_Bangumi);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _Tag = require('../models/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _env = require('../../.env');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const NUM_USER = 5;
const NUM_BANGUMI = 10;
const NUM_BANGUMI_SCREENSHOT = 100;

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_env.DATABASE, {
  promiseLibrary: global.Promise
});

run();

function createRandomTags(count) {
  const tags = [];

  for (let i = 0; i < count; i++) {
    tags.push(_faker2.default.hacker.noun());
  }

  return tags;
}

function createUser() {
  const salt = (0, _utils.getRandomString)(16);
  const hash = (0, _utils.sha512)(_faker2.default.internet.password(), salt);

  return new _User2.default({
    email: _faker2.default.internet.email(),
    username: _faker2.default.internet.userName(),
    salt: salt,
    hash: hash
  });
}

function createBangumi() {
  return new _Bangumi2.default({
    title: _faker2.default.lorem.words()
  });
}

function createScreenshot(bangumi, user, tags) {
  return new _Screenshot2.default({
    bangumi: bangumi._id,
    user: user._id,
    episode: _faker2.default.random.number(24),
    file: {
      small: 'small.jpg',
      medium: 'medium.jpg',
      large: 'large.jpg',
      original: 'original.png'
    },
    tags: tags
  });
}