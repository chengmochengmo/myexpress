var express = require('express');
var Admincounts = require('../../models/admincounts');//导入模型数据模块

var router = express.Router();

/* GET home page. */
router.get('/lists', function (req, res, next) {
    return Admincounts.find(function (err,doc) {
        res.render("admin/count/lists",{
            lists:doc
        })
    })
});

module.exports = router;
