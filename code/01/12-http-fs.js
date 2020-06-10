var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
    // index.html
    var url = req.url
    if(url === '/') {
        // 我们发送的是文件中内容
        fs.readFile('./resource/index.html', function(err, data) {
            if(err) {
                res.setHeader('Content-type', 'text/plain; charset=utf-8')
                res.end('文件读取失败，请稍候重试！')
            } else {
                // data 默认是二进制数据，可以通过  .toString 转为能识别的字符串
                // res.end() 支持两种数据类型，一种是二进制，一种是字符串
                res.setHeader('Content-type', 'text/html; charset=utf-8')
                res.end(data)
            }
        })
    }else if (url === '/a') {
        // url: 统一资源定位符
        // 一个url 最终其实是要对应到一个资源的
        fs.readFile('./resource/timg.jpg', function (err, data) {
            if (err) {
                res.setHeader('Content-type', 'text/plain; charset=utf-8')
                res.end('文件读取失败，请稍候重试！')
            } else {
                // data 默认是二进制数据，可以通过  .toString 转为能识别的字符串
                // res.end() 支持两种数据类型，一种是二进制，一种是字符串
                // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
                res.setHeader('Content-type', 'image/jpeg')
                res.end(data)
            }
        })
    }

})

server.listen(3000, function () {
    console.log('Server is running...')
})