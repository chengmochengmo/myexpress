var express = require('express');
var Slides = require('../../models/slides');//导入模型数据模块
var Cates = require('../../models/cates');//导入模型数据模块
var Goods = require('../../models/goods');//导入模型数据模块

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    Slides.find({},function (err,docs) {
        Cates.find({},function (_err,_docs) {
            Goods.find({},function (__err,__docs) {
                res.render('index/index/index',{
                    slide_list:docs,
                    cate_list:_docs,
                    goods_list:__docs
                })
            })
        })
    })
});

module.exports = router;
