var express = require('express')

// 1、创建 app
var app = express()

// 当以/public/开头的时候， 去 ./public/ 目录中找对应的资源
// app.use('/public/', express.static('./public/')) 推荐这种

// 省略第一个参数，可以通过省略 /public 的方式来
app.use(express.static('./public/'))


app.get('/', function (req, res) {
    res.send('hello world')
})

// 路由其实就是一张表
// 这个表里面有具体的映射关系


app.listen(3000, function () {
    console.log('express app is running ...')
})