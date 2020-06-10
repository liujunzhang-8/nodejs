var http = require('http')

var server = http.createServer()

// request 请求事件处理函数，需要接收两个参数：
//      Request 请求对象
//          请求对象可以用来获取客户端的一些请求信息，例如请求路径
//      Response 响应对象
//          响应对象可以用来给客户端发送响应消息

server.on('request', function(request, response) {
    console.log('已收到客户端请求, 请求路径是: ' + request.url)

    // response 对象有一个方法：write 可以用来给客户端发送响应数据
    // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
    if(request.url === '/index') {
        response.write('hello Node.js')
    } else if (request.url === '/login') {
        response.write('登录')
    } else {
        response.write(' nodejs')
    }
    // response.write('hello')
    // response.write(' nodejs')
    response.end()

    // 请求不同的路径的时候返回不同的响应
    // 例如：
    // /index
    //  /login 登录
})

server.listen(3000, function() {
    console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 来进行访问')
})