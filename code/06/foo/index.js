var fs = require('fs')

//  ./a.txt 相对于当前文件路径
//  ./a.txt 相对于执行 node 命令所处的终端路径
fs.readFile('./a.txt', 'utf8', function (err, data) {
    if (err) {
        throw err
    }
    console.log(data)
})