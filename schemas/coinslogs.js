var mongoose = require('mongoose');

var datenow = new Date();
var date = datenow.getFullYear()+"-"+((datenow.getMonth()-0)+1)+"-"+datenow.getDate()+" "+datenow.getHours()+":"+datenow.getMinutes()+":"+datenow.getSeconds()
var timestamp = Date.parse(datenow)

//申明一个mongoons对象 第二个参数传{versionKey: false}即可去掉版本号
var CoinslogsSchema = new mongoose.Schema({
    uid:String,
    coins:Number,
    remarks:String,
    time:{
        type: String,
        default: date
    },
    timestamp:{
        type: String,
        default: timestamp
    }
})

//暴露出去的方法
module.exports = CoinslogsSchema