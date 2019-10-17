var express = require('express');
var Users = require('../../models/users');//导入模型数据模块
var Coinslogs = require('../../models/coinslogs');//导入模型数据模块
var router = express.Router();
var fs=require('fs');

/* GET user listing. */
router.get('/lists', function (req, res, next) {
    return Users.find({},function (err,docs) {
        if (!err) {
            res.render('admin/user/lists', {
                user_list: docs
            });
        }
    })
})

router.get('/del', function(req, res, next) {
    var id=req.query.id;
    Users.findByIdAndRemove(id,function (err,doc) {
        fs.unlink(doc.thumb, function (err) {
            console.log("临时文件删除成功")
        });
        return res.end("<script>alert('删除成功');window.location.href='/admin/user/lists'</script>");
    })
});

router.get('/addcoin',function (req, res, next) {
    var id=req.query.id;
    Users.findById(id,function (err,doc) {
        return res.render('admin/user/addcoin',{
            userinfo:doc
        })
    })
})

router.post('/addcoin',function (req, res, next) {
    var id=req.body.id;
    var coins=req.body.coins
    Users.findById(id,function (err,doc) {
        coins=parseInt(doc.coins)+parseInt(coins)
        Users.updateOne({_id:id},{ $set: {coins: coins}},function (err,doc) {
            Coinslogs.create({uid:id,coins:req.body.coins,remarks:req.body.remarks},function (err,doc) {
                return res.end("<script>alert('添加成功');window.location.href='/admin/user/lists'</script>");
            })
        })
    })
})


module.exports = router;