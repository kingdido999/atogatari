'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const screenshotSchema = new Schema({
  bangumi: {
    type: Schema.Types.ObjectId,
    ref: 'Bangumi'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  episode: {
    type: Number,
    required: true
  },
  timestamp: {
    type: String,
    required: false
  },
  nsfw: {
    type: Boolean
  },
  file: {
    small: {
      type: String,
      required: true
    },
    medium: {
      type: String,
      required: true
    },
    large: {
      type: String,
      required: true
    },
    original: {
      type: String,
      required: true
    }
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Favorite'
  }],
  tags: {
    type: [String],
    index: true
  }
});

exports.default = _mongoose2.default.model('Screenshot', screenshotSchema);