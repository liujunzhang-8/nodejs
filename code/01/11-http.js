// require
// 端口号

var http = require('http')

var server = http.createServer()

server.on('request', function(req, res) {
    // 在服务器端默认发送的数据，其实是utf8编码的内容
    // 但是浏览器不知道你是utf8编码的内容
    // 浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
    // 中文操作系统默认是gbk
    // 解决方法就是正确的告诉浏览器我给你发送的内容是什么编码的
    // 在http协议中。Content-type 就是用来告知对方我给你发送的数据内容是什么类型
    // res.setHeader('Content-Type', 'text/plain; charset = utf-8')
    // res.end('hello 世界')

    var url = req.url
    if(url === '/plain') {
        // text/plain 普通文本
        res.setHeader('Content-type', 'text/plain; charset=utf-8')
        res.end('hello 世界')
    } else if (url === '/html') {
        // 如果你发送的是html格式的字符串，则也要告诉浏览器我给你发送的是text/html格式的内容
        res.setHeader('Content-type', 'text/html; charset=utf-8')
        res.end('<p>hello html <a href="">点我</a></p>')
    }
})

server.listen(3000, function() {
    console.log('Server is running...')
})