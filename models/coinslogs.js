var mongoose = require('mongoose')
var CoinslogsSchema = require('../schemas/coinslogs') //拿到导出的数据集模块
var Coinslogs = mongoose.model('Coinslogs', CoinslogsSchema) // 编译生成Movie 模型

module.exports = Coinslogs