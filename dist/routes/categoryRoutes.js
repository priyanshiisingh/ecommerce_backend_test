"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _Category = _interopRequireDefault(require("../services/mongodb/models/Category"));

var _expressValidator = require("express-validator");

var router = _express["default"].Router();
/*
type : GET
path : /api/v1/auth/category/all 
params: none
isProtected : false (PUBLIC ROUTE) 
*/


router.get("/all", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Category["default"].find({});

          case 3:
            categories = _context.sent;
            res.json({
              categories: categories,
              message: "categories fetched successfully"
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);
            res.status(500).json({
              category: [],
              message: "can't fetch categories"
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
path : /api/v1/auth/category/all 
params: none
isProtected : true (true) (private) 
*/

router.post("/add", (0, _expressValidator.body)("name").isLength({
  min: 1
}), (0, _expressValidator.body)("description").isLength({
  min: 10
}), /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _validationResult, errors, _req$body, name, description, category;

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
            _req$body = req.body, name = _req$body.name, description = _req$body.description;
            category = new _Category["default"]({
              name: name,
              description: description
            });
            _context2.next = 8;
            return category.save();

          case 8:
            res.status(200).json({
              category: category,
              message: "Saved category"
            });
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0.message);
            res.status(500).json({
              category: null,
              message: "Unable save category"
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/*
type : PUT
path : /api/v1/category/update/:id
params : id
isProtected: private (admin)
*/

router.put("/update/:id", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Category["default"].findOneAndUpdate({
              _id: id
            }, req.body, {
              "new": true
            });

          case 4:
            category = _context3.sent;
            res.status(200).json({
              category: category,
              message: "Updated category in DB"
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(500).json({
              category: null,
              message: "Unable to update category in DB"
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/*
type : DELETE
path : /api/v1/category/delete/:id
params : id
isProtected: private (admin)
*/

router["delete"]("/delete/:id", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Category["default"].findByIdAndRemove(id);

          case 4:
            category = _context4.sent;
            res.status(200).json({
              category: category,
              message: "deleted category in DB"
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(500).json({
              category: null,
              message: "Unable to delete category in DB"
            }));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;