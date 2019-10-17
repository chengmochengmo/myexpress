var mongoose = require('mongoose');

//申明一个mongoons对象 第二个参数传{versionKey: false}即可去掉版本号
var UsersSchema = new mongoose.Schema({
    nickname: String,
    age: Number,
    address:String,
    sex:String,
    tel:Number,
    thumb:String,
    username:String, //账号
    password:String,
    coins:{
        type:Number,
        default:1000
    }
})

//暴露出去的方法
module.exports = UsersSchema