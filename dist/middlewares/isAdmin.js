"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var isAdmin = function isAdmin(req, res, next) {
  var _req$headers$authoriz;

  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1];

  if (token) {
    var decodedToken = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

    var role = decodedToken.role;
    if (role == 1) next();else return res.json({
      message: "Access denied"
    });
  } else {
    return res.json({
      message: "UNAUTHORISED"
    });
  }
};

var _default = isAdmin;
exports["default"] = _default;