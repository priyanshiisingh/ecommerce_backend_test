"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _connectDB = _interopRequireDefault(require("./services/mongodb/connectDB"));

var _cors = _interopRequireDefault(require("cors"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _categoryRoutes = _interopRequireDefault(require("./routes/categoryRoutes"));

var _productsRoutes = _interopRequireDefault(require("./routes/productsRoutes"));

_dotenv["default"].config("../.env");

var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;
(0, _connectDB["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json()); //route to handle auth request

app.use("/api/v1/auth", _authRoutes["default"]);
app.use("/api/v1/category", _categoryRoutes["default"]);
app.use("/api/v1/product", _productsRoutes["default"]);
console.log("hi");
app.get("/", function (req, res) {
  res.send("server listening to PORT ".concat(PORT));
});
app.listen(PORT, function (req, res) {
  console.log("Server listening to PORT ".concat(PORT));
});