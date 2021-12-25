"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _Product = _interopRequireDefault(require("../services/mongodb/models/Product"));

var _Category = _interopRequireDefault(require("../services/mongodb/models/Category"));

var _expressValidator = require("express-validator");

var router = _express["default"].Router();
/*
type : GET
path : /api/v1/auth/product/all 
params: none
isProtected : false (PUBLIC ROUTE) 
*/


router.get("/all", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Product["default"].find({});

          case 3:
            products = _context.sent;
            res.json({
              products: products,
              message: "products fetched successfully"
            });
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0.message);
            res.status(500).json({
              product: [],
              message: "can't fetch products"
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
type : GET
path : /api/v1/auth/product/all 
params: none
isProtected : false (PUBLIC ROUTE) 
*/

router.get("/all", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var categoryId, products;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            categoryId = req.query.categoryId;
            _context2.next = 4;
            return _Product["default"].find({
              category: categoryId
            });

          case 4:
            products = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              products: products,
              message: "Successfully fetched products"
            }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0.message);
            return _context2.abrupt("return", res.status(500).json({
              products: [],
              message: "error fetching products"
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/*
type : POST
path : /api/v1/product/add
params : none
isProtected: true (admin)
*/

router.post("/add", (0, _expressValidator.body)("name").isLength({
  min: 1
}), (0, _expressValidator.body)("price").isNumeric(), (0, _expressValidator.body)("listPrice").isNumeric(), (0, _expressValidator.body)("stock").isNumeric(), (0, _expressValidator.body)("description").isLength({
  min: 4
}), (0, _expressValidator.body)("color").isLength({
  min: 1
}), (0, _expressValidator.body)("category").isLength({
  min: 5
}), (0, _expressValidator.body)("imageURL").isURL(), /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _validationResult, errors, category, product;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _validationResult = (0, _expressValidator.validationResult)(req), errors = _validationResult.errors;

            if (!(errors.length > 0)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(403).json({
              errors: errors,
              message: "Bad request"
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _Category["default"].findById(req.body.category);

          case 6:
            category = _context3.sent;

            if (category) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(300).json({
              product: null,
              message: "Invalid category"
            }));

          case 9:
            product = new _Product["default"](req.body);
            _context3.next = 12;
            return product.save();

          case 12:
            res.status(200).json({
              product: product,
              message: "product saved"
            });
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0.message);
            return _context3.abrupt("return", res.status(500).json({
              product: [],
              message: "error saving products"
            }));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 15]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/*
type : PUT
path : /api/v1/product/:id
params : id
isProtected: true (admin)
*/

router.put("/update/:id", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, category, product;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Category["default"].findById(req.body.category);

          case 4:
            category = _context4.sent;

            if (!req.body.category) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(300).json({
              product: null,
              message: "Invalid category"
            }));

          case 7:
            _context4.next = 9;
            return _Product["default"].findOneAndUpdate({
              _id: id
            }, req.body, {
              "new": true
            });

          case 9:
            product = _context4.sent;
            res.status(200).json({
              product: product,
              message: "Updated product in DB"
            });
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", res.status(500).json({
              product: null,
              message: "Unable to update product in DB"
            }));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 13]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
/*
type : DELETE
path : /api/v1/product/delete/:id
params : id
isProtected: private (admin)
*/

router["delete"]("/delete/:id", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Product["default"].findByIdAndRemove(id);

          case 4:
            category = _context5.sent;
            res.status(200).json({
              category: category,
              message: "deleted category in DB"
            });
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", res.status(500).json({
              category: null,
              message: "Unable to delete category in DB"
            }));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); // /*
// type : PUT
// path : /api/v1/product/updateStock/:id
// params : id
// isProtected: true (admin)
// */
// router.put('/updateStock/:id'
//     , async (req, res) => {
//         const { id } = req.params
//         try {
//             const category = await Product.findByIdAndRemove(id)
//             res.status(200).json({
//                 category, message: "deleted category in DB"
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 category: null,
//                 message: "Unable to delete category in DB"
//             })
//         }
//     })

var _default = router;
exports["default"] = _default;