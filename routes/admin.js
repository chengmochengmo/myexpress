var express = require('express');

var router = express.Router();

var indexRouter = require('./admin/index');
var userRouter = require('./admin/user');
var loginRouter = require('./admin/login');
var countRouter = require('./admin/count');
var cateRouter = require('./admin/cate');
var goodsRouter = require('./admin/goods');
var slideRouter=require('./admin/slide')

router.use('/admin/login', loginRouter);
router.use(function (req,res,next) {
    if (req.session.username=="admin"){
        return next()
    }
    res.redirect("/admin/login/login")
})

router.use('/admin/index', indexRouter);
router.use('/admin/user', userRouter);
router.use('/admin/count', countRouter);
router.use('/admin/cate', cateRouter);
router.use('/admin/goods', goodsRouter);
router.use('/admin/slide', slideRouter);

module.exports = router;
