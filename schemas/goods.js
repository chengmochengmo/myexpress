var mongoose = require('mongoose');

//申明一个mongoons对象 第二个参数传{versionKey: false}即可去掉版本号
var GoodsSchema = new mongoose.Schema({
    name: String,
    goodspic:String,
    describe:String,
    detail:String,
    price:Number,
    cateid:String,
    sort:{
        type:Number,
        default:0 //数字越大 越靠前
    }
})

//暴露出去的方法
module.exports = GoodsSchema