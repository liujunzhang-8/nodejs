var http = require('http')
var fs = require('fs')

// 1、创建Server
var server = http.createServer()

var wwwDir = '../01/resource'

server.on('request', function (req, res) {
    var url = req.url
    var filePath = '/index.html'
    if (url !== '/') {
        filePath = url
    }

    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            return res.end('404 Not Found')
        }
        res.end(data)
    })
    
})

// 3、绑定端口号，启动服务
server.listen(3000, function () {
    console.log('running...')
})