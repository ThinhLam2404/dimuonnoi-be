var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
require("dotenv").config();
var cors = require("cors");
var app = express();

const fileUpload = require("express-fileupload");
var cors = require("cors");

var indexRouter = require("./routes/index");

var app = express();

app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload());

app.use("/", indexRouter);

module.exports = app;
