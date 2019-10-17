var mongoose = require('mongoose')
var GoodsSchema = require('../schemas/goods') //拿到导出的数据集模块
var Goods = mongoose.model('Goods', GoodsSchema) // 编译生成Movie 模型

module.exports = Goods