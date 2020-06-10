// 0、安装
// 1、引包
var express = require('express')

// 2、创建你服务器应用程序
//      也就是原来的 http.createServer
var app = express()

// 模板引擎，在 Express 中开放资源就是一个 API 的事
// 公开指定目录
// 只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
app.use('/public/', express.static('./public/'))

// 当服务器收到 get 请求 / 的时候，执行回调处理函数
app.get('/', function (req, res) {
    res.send('hello express!')
})

app.get('/about', function (req, res) {
    // 在 Express 中可以直接 req.query 来获取查询字符串参数
    // 在 Express 中使用模板引擎有更好的方式：res.render('文件名'， {模板对象})
    // 可以自己去看 art-template 官方文档：如何让 art-template 结合 Express 来使用
    console.log(req.query)
    res.send('你好，我是express!')
})

// 相当于 server.listen
app.listen(3000, function () {
    console.log('app is running at port 3000.')
})