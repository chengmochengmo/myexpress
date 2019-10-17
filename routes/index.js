var express = require('express');

var router = express.Router();

var indexRouter = require('./index/index');
var userRouter = require('./index/user');
var goodsRouter = require('./index/goods');

router.use('/', indexRouter);
router.use('/index/user', userRouter);
router.use('/index/goods', goodsRouter);

module.exports = router;
