var mongoose = require('mongoose')
var SlidesSchema = require('../schemas/slides') //拿到导出的数据集模块
var Slides = mongoose.model('Slides', SlidesSchema) // 编译生成Movie 模型

module.exports = Slides