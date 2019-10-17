var mongoose = require('mongoose')
var AdmincountsSchema = require('../schemas/admincounts') //拿到导出的数据集模块
var Admincounts = mongoose.model('Admincounts', AdmincountsSchema) // 编译生成Movie 模型

module.exports = Admincounts