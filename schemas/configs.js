var mongoose = require('mongoose');

//申明一个mongoons对象 第二个参数传{versionKey: false}即可去掉版本号
var ConfigsSchema = new mongoose.Schema({
    username:String,
    password:String
})

//暴露出去的方法
module.exports = ConfigsSchema