var mongoose = require('mongoose')
var OrdersSchema = require('../schemas/orders') //拿到导出的数据集模块
var Orders = mongoose.model('Orders', OrdersSchema) // 编译生成Movie 模型

module.exports = Orders