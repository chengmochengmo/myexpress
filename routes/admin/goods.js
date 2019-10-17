var express = require('express');
var Goods = require('../../models/goods');//导入模型数据模块
var Cates = require('../../models/cates');
var fs=require('fs');
var multiparty = require('multiparty');

var router = express.Router();

/* GET home page. */
router.get('/lists', function (req, res, next) {
    Goods.find().populate({
        path:'cateid',
        select:'name -_id',
        model:'Cates'
    }).exec(function (err,docs) {
        return res.render('admin/goods/lists', {
            title: 'Express',
            goods_list: docs
        });
    })
})

router.get('/edit', function(req, res, next) {
    var id=req.query.id;
    Goods.findById(id).exec(function (err,docs) {
        Cates.find({},function (_err,_docs) {
            return res.render('admin/goods/edit', {
                id:id===undefined?"":id,
                info:docs===null?{}:docs,
                catelists:_docs
            });
        })
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
            dbJson['goodspic']=files.pic[0].path
        }else {
            fs.unlink(files.pic[0].path, function (err) {
                console.log("临时文件删除成功")
            })
        }
        if (!dbJson.id) {
            Goods.create(dbJson,function (err) {
                if (!err) {
                    console.log("插入成功")
                }
            });
            return res.send("<script>alert('新增成功');window.location.href='/admin/goods/lists'</script>");
        }
        Goods.update({_id:dbJson.id}, dbJson, function (err,doc) {
            if (!err) {
                console.log("修改成功")
            }
        });
        return res.end("<script>alert('修改成功');window.location.href='/admin/goods/lists'</script>");
    });
});

router.get('/del', function(req, res, next) {
    var id=req.query.id;
    Goods.findByIdAndRemove(id,function (err,docs) {
        fs.unlink(docs.goodspic, function (err) {
            console.log("临时文件删除成功")
        });
        return res.end("<script>alert('删除成功');window.location.href='/admin/goods/lists'</script>");
    })
});

module.exports = router;
