// ip地址用来定位计算机
// 端口号用来定位具体的应用程序
// 一切需要联网通信的软件都会占用一个端口号
// 端口号的范围从0 ~ 65536  之间

var http = require('http')

var server = http.createServer()

server.on('request', function(req, res) {
    console.log('收到请求了，请求路径是：' + req.url)
    console.log('请求我的客户端的地址是：', req.socket.remoteAddress,req.socket.remotePort)

    res.end('hello nodejs')
})

server.listen(5000, function () {
    console.log('服务器启动成功，可以访问了...')
})