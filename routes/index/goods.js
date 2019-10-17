var express = require('express');
var Goods = require('../../models/goods');//导入模型数据模块

var router = express.Router();

/* GET home page. */
router.get('/detail', function (req, res, next) {
    res.render('index/goods/detail')
});

module.exports = router;
