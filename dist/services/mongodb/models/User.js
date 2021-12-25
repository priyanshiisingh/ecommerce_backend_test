"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var UserSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    "default": ""
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    "default": 0
  }
});

var User = _mongoose["default"].model("User", UserSchema);

var _default = User;
exports["default"] = _default;