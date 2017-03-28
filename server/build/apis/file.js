'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let upload = (() => {
  var _ref = _asyncToGenerator(function* (ctx) {
    var _ref2 = yield (0, _asyncBusboy2.default)(ctx.req);

    const files = _ref2.files,
          fields = _ref2.fields;

    const file = files[0];
    const bangumiTitle = fields.bangumiTitle,
          episode = fields.episode,
          aliases = fields.aliases,
          tags = fields.tags,
          nsfw = fields.nsfw;

    const aliasList = JSON.parse(aliases);
    const tagList = JSON.parse(tags);

    if (!bangumiTitle) {
      ctx.throw(400, 'Bangumi title cannot be empty.');
    }

    if (!episode) {
      ctx.throw(400, 'Episode cannot be empty.');
    }

    let bangumi = yield _Bangumi2.default.findOne({
      title: bangumiTitle
    }).exec();

    if (!bangumi) {
      bangumi = new _Bangumi2.default({
        title: bangumiTitle
      });
    }

    bangumi.aliases = (0, _lodash.union)(bangumi.aliases, aliasList);

    const filenames = {
      small: (0, _v2.default)() + '.jpg',
      medium: (0, _v2.default)() + '.jpg',
      large: (0, _v2.default)() + '.jpg',
      original: (0, _v2.default)() + _path2.default.extname(file.filename)
    };

    const fileOriginal = `${UPLOAD_PATH}/${filenames.original}`;

    try {
      yield writeFile(file, fileOriginal);
    } catch (e) {
      ctx.throw(500, e);
    }

    (0, _sharp2.default)(fileOriginal).resize(WIDTH_SMALL).toFile(`${UPLOAD_PATH}/${filenames.small}`);
    (0, _sharp2.default)(fileOriginal).resize(WIDTH_MEDIUM).toFile(`${UPLOAD_PATH}/${filenames.medium}`);
    (0, _sharp2.default)(fileOriginal).resize(WIDTH_LARGE).toFile(`${UPLOAD_PATH}/${filenames.large}`);

    const screenshot = new _Screenshot2.default({
      bangumi: bangumi._id,
      user: ctx.state.uid,
      episode: episode,
      file: {
        small: filenames.small,
        medium: filenames.medium,
        large: filenames.large,
        original: filenames.original
      },
      tags: tagList,
      nsfw: nsfw
    });

    bangumi.screenshots.push(screenshot);

    try {
      yield bangumi.save();
      yield screenshot.save();
      tagList.forEach(function (name) {
        return addTag(name, screenshot._id);
      });
    } catch (e) {
      ctx.throw(500, e);
    }

    ctx.status = 200;
  });

  return function upload(_x) {
    return _ref.apply(this, arguments);
  };
})();

let addTag = (() => {
  var _ref3 = _asyncToGenerator(function* (name, screenshotId) {
    const slug = (0, _utils.convertToSlug)(name);
    let tag = yield _Tag2.default.findOne({
      slug: slug
    }).exec();

    if (!tag) {
      tag = new _Tag2.default({
        name: name,
        slug: slug
      });
    }

    tag.screenshots.push(screenshotId);
    yield tag.save();
  });

  return function addTag(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
})();

var _asyncBusboy = require('async-busboy');

var _asyncBusboy2 = _interopRequireDefault(_asyncBusboy);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _Screenshot = require('../models/Screenshot');

var _Screenshot2 = _interopRequireDefault(_Screenshot);

var _Bangumi = require('../models/Bangumi');

var _Bangumi2 = _interopRequireDefault(_Bangumi);

var _Tag = require('../models/Tag');

var _Tag2 = _interopRequireDefault(_Tag);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const UPLOAD_PATH = 'assets/images';
const WIDTH_SMALL = 384;
const WIDTH_MEDIUM = 1152;
const WIDTH_LARGE = 1920;

function writeFile(input, output) {
  const writable = _fs2.default.createWriteStream(output);

  return new Promise((resolve, reject) => {
    input.pipe(writable);
    input.on('close', () => resolve());
    input.on('error', err => reject(err));
  });
}

exports.default = {
  upload
};