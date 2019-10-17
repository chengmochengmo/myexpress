var express = require('express');
var Cates = require('../../models/cates');//导入模型数据模块
var fs=require('fs');
var multiparty = require('multiparty');

var router = express.Router();

/* GET home page. */
router.get('/lists', function (req, res, next) {
    return Cates.find({},function (err,docs) {
        if (!err) {
            res.render('admin/cate/lists', {
                cate_list: docs
            });
        }
    })
})

router.get('/edit', function(req, res, next) {
    var id=req.query.id;
    Cates.findById(id).exec(function (err,docs) {
        return res.render('admin/cate/edit', {
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
            dbJson['icon']=files.pic[0].path
        }else {
            fs.unlink(files.pic[0].path, function (err) {
                console.log("临时文件删除成功")
            })
        }
        if (!dbJson.id) {
            Cates.create(dbJson,function (err) {
                if (!err) {
                    console.log("插入成功")
                }
            });
            return res.send("<script>alert('新增成功');window.location.href='/admin/cate/lists'</script>");
        }
        Cates.update({_id:dbJson.id}, dbJson, function (err,doc) {
            if (!err) {
                console.log("修改成功")
            }
        });
        return res.end("<script>alert('修改成功');window.location.href='/admin/cate/lists'</script>");
    });
});

router.get('/del', function(req, res, next) {
    var id=req.query.id;
    Cates.findByIdAndRemove(id,function (err,docs) {
        fs.unlink(docs.icon, function (err) {
            console.log("临时文件删除成功")
        });
        return res.end("<script>alert('删除成功');window.location.href='/admin/cate/lists'</script>");
    })
});

module.exports = router;
