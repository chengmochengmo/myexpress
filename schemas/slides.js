var mongoose = require('mongoose');

//申明一个mongoons对象 第二个参数传{versionKey: false}即可去掉版本号
var SlidesSchema = new mongoose.Schema({
    name: String,
    slidepic:String,
})

//暴露出去的方法
module.exports = SlidesSchema