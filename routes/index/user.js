var express = require('express');
var Users = require('../../models/users');//导入模型数据模块
var Coinslogs = require('../../models/coinslogs');//导入模型数据模块
var router = express.Router();
var fs=require('fs');

var multiparty = require('multiparty');

/* GET home page. */
router.get('/index', function (req, res, next) {
    var id=req.cookies.token
    Users.findById(id).exec(function (err,doc) {
        res.render("index/user/index",{
            userinfo:doc===null?{}:doc
        })
    })
});
router.get('/coinslogs', function (req, res, next) {
    var id=req.cookies.token
    Coinslogs.find({uid:id},function (err,docs) {
        console.log(docs)
        res.render("index/user/coinslogs",{
            coinslogs:docs
        })
    })
});
router.get('/reg', function (req, res, next) {
    res.render("index/user/reg")
});
router.post('/reg', function (req, res, next) {
    Users.create(req.body,function (err,doc) {
        Coinslogs.create({uid:doc._id,coins:1000,remarks:'注册赠送'},function (err,doc) {
            return res.send("<script>alert('注册成功');window.location.href='/index/user/index'</script>")
        })
    })
});
router.get('/login', function (req, res, next) {
    res.render("index/user/login")
});
router.post('/login', function (req, res, next) {
    Users.findOne(req.body,function (err,doc) {
        if (doc){
            res.cookie('token',doc._id,{ expires: new Date(Date.now() + 7*24*60*60*1000)})
            return res.send("<script>alert('登录成功');window.location.href='/index/user/index'</script>")
        }
        return res.send("<script>alert('用户名或密码不正确');window.location.href='/index/user/login'</script>")
    })
});
router.get('/edit', function (req, res, next) {
    var id=req.cookies.token;
    if (!id){
        return res.redirect('/index/user/login')
    }
    Users.findById(id).exec(function (err,docs) {
        return res.render('index/user/edit', {
            id:id===undefined?"":id,
            info:docs===null?{}:docs
        });
    })
});
router.post('/edit', function (req, res, next) {
    var form = new multiparty.Form();
    form.uploadDir='public/uploads';
    form.parse(req, function(err, fields, files) {
        var dbJson={};
        for (let i in fields) {
            dbJson[i]=fields[i][0]
        }
        if (files.pic[0].originalFilename){
            dbJson['thumb']=files.pic[0].path
        }else {
            fs.unlink(files.pic[0].path, function (err) {
                console.log("临时文件删除成功")
            })
        }
        Users.update({_id:dbJson.id}, dbJson, function (err,doc) {
            if (!err) {
                console.log("修改成功")
            }
        });
        return res.end("<script>alert('修改成功');window.location.href='/index/user/index'</script>");
    });
});
module.exports = router;
