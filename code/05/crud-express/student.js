var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/itcast', {useNewUrlParser: true})

var Schema = mongoose.Schema

var StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobbies: {
        type: String
    }
})

// 直接导出模型构造函数
module.exports = mongoose.model('Student', StudentSchema)