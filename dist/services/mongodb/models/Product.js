"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ProductSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  listPrice: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  compatibleWith: [{
    type: String
  }],
  category: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "category"
  },
  imageUrl: {
    type: String
  },
  stock: {
    type: Number,
    required: true
  } // reviews: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: "reviews",
  //   },
  // ],

});

var Product = _mongoose["default"].model("Product", ProductSchema);

var _default = Product;
exports["default"] = _default;