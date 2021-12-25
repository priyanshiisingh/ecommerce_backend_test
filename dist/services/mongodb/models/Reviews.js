"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ReviewSchema = new _mongoose["default"].Schema({
  authorName: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

var Review = _mongoose["default"].model("Review", ReviewSchema);

var _default = Review;
exports["default"] = _default;