var mongoose = require('mongoose')
var ConfigsSchema = require('../schemas/configs') //拿到导出的数据集模块
var Configs = mongoose.model('Configs', ConfigsSchema) // 编译生成Movie 模型

module.exports = Configs