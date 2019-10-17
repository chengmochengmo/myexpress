var express = require('express');
var Users = require('../../models/users');//导入模型数据模块

var router = express.Router();

/* GET home page. */
router.get('/index', function (req, res, next) {
    res.render('admin/index/index');
});
router.get('/welcome', function (req, res, next) {
    res.render('admin/index/welcome');
});

module.exports = router;
