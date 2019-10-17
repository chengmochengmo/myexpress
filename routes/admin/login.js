var express = require('express');
var router = express.Router();
var Configs = require('../../models/configs');//导入模型数据模块
var Admincounts = require('../../models/admincounts');//导入模型数据模块

/* GET user listing. */
router.get("/login",function (req,res,next) {
    res.render("admin/login/login")
})
router.post("/login",function (req,res,next) {
    Configs.find({username:req.body.username,password:req.body.password},function (err,doc) {
        if (!err && doc.length) {
            req.session.username=req.body.username
            Admincounts.create({username:req.body.username},function (err) {
                console.log("插入成功")
            })
            return res.redirect("/admin/index/index")
        }
        return res.send("<script>alert('用户名或密码错误');window.location.href='/admin/login/login'</script>")
    })
})

module.exports = router;