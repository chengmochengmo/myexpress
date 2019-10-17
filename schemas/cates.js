var mongoose = require('mongoose');

//申明一个mongoons对象 第二个参数传{versionKey: false}即可去掉版本号
var CatesSchema = new mongoose.Schema({
    name: String,
    isindexshow:{
        type:Number,
        default:0 //0不选中
    },
    describe:String,
    icon:String,
    sort:{
        type:Number,
        default:0 //数字越大 越靠前
    }
})

//暴露出去的方法
module.exports = CatesSchema