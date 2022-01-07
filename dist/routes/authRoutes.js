"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../services/mongodb/models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _isAdmin = _interopRequireDefault(require("../middlewares/isAdmin"));

var _expressValidator = require("express-validator");

var router = _express["default"].Router();

/*
type : GET
path : /api/v1/auth/users 
params: none
isProtected : true (admin) 
*/
router.get("/users", _isAdmin["default"], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].find({});

          case 3:
            users = _context.sent;
            res.json({
              users: users
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);
            res.status(500).json({
              users: []
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/*
type : POST
path : /api/v1/auth/signup
params: none
isProtected : false (admin) 
*/

router.post("/signup", (0, _expressValidator.body)("firstName").isLength({
  min: 5
}), (0, _expressValidator.body)("email").isEmail(), (0, _expressValidator.body)("password").isLength({
  min: 5
}), /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _validationResult, errors, _req$body, firstName, lastName, email, password, salt, hashedPassword, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _validationResult = (0, _expressValidator.validationResult)(req), errors = _validationResult.errors;

            if (!(errors.length > 0)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              errors: errors,
              message: "Bad request"
            }));

          case 3:
            _context2.prev = 3;
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;
            _context2.next = 7;
            return _bcryptjs["default"].genSalt(5);

          case 7:
            salt = _context2.sent;
            _context2.next = 10;
            return _bcryptjs["default"].hash(password, salt);

          case 10:
            hashedPassword = _context2.sent;
            console.log(hashedPassword);
            user = new _User["default"]({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashedPassword
            });
            _context2.next = 15;
            return user.save();

          case 15:
            res.json({
              user: user
            });
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0.message);
            res.status(500).json({
              users: []
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 18]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/*
type : POST
path : /api/v1/auth/login
params: none
isProtected : false (admin) 
*/

router.post("/login", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, email, password, user, isVerified, _id, role, token;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; //find the user

            _context3.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context3.sent;

            if (!user) {
              _context3.next = 16;
              break;
            }

            _context3.next = 8;
            return _bcryptjs["default"].compare(password, user.password);

          case 8:
            isVerified = _context3.sent;

            if (!isVerified) {
              _context3.next = 15;
              break;
            }

            _id = user._id, role = user.role;
            token = _jsonwebtoken["default"].sign({
              _id: _id,
              role: role
            }, process.env.JWT_SECRET, {
              expiresIn: "1h"
            });
            return _context3.abrupt("return", res.json({
              token: token
            }));

          case 15:
            return _context3.abrupt("return", res.json({
              token: null,
              message: "Unauthorised"
            }));

          case 16:
            return _context3.abrupt("return", res.json({
              token: nul,
              message: "User doesn't exists"
            }));

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0.message);
            res.status(500).json({
              token: null
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;