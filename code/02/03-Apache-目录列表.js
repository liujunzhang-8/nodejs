import { fstat } from "fs"

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
            return res.end('404 Not Found.')
        }
        // 1、如何得到 wwwDir 目录列表中的文件名和目录名
        // 2、如何将得到的文件名和目录名替换到 template.html 中
        res.end(data)
    })
})

server.listen(3000, function () {
    console.log('running...')
})