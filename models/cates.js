var mongoose = require('mongoose')
var CatesSchema = require('../schemas/cates') //拿到导出的数据集模块
var Cates = mongoose.model('Cates', CatesSchema) // 编译生成Movie 模型

module.exports = Cates