var express = require("express");
var router = express.Router();
const discountRoute = require("./discount");
const productRouter = require("./product");
const sizeRouter = require("./size");
const voucherRouter = require("./voucher");
var feedbackRouter = require("./feedback");

var accountRouter = require("./accountRouter");
var adminRouter = require("./adminRouter");
var accountRouter = require("./accountRouter");

/* GET home page. */
router.use("/discount", discountRoute);
router.use("/product", productRouter);
router.use("/size", sizeRouter);
router.use("/account", accountRouter);
router.use("/voucher", voucherRouter);

router.use("/feedback", feedbackRouter);
router.use("/admin", adminRouter);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
