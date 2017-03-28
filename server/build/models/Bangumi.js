'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const bangumiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  aliases: {
    type: [String],
    index: true
  },
  screenshots: [{
    type: Schema.Types.ObjectId,
    ref: 'Screenshot'
  }]
});

exports.default = _mongoose2.default.model('Bangumi', bangumiSchema);