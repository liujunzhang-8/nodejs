// 浏览器中的JavaScript是没有文件操作的能力的
// 但是 Node 中的 JavaScript具有文件操作的能力

// fs 是 file-sysyem 的简写，就是文件系统的意思
// 在Node中如果想要进行文件操作，就必须引入fs这个核心模块
// 在fs这个核心模块中，就提供了所有的文件操作相关的api
// 例如：fs.readFile 就是用来读取文件的

// 1、使用 require 方法加载 fs 核心模块
var fs = require('fs')

// 2、读取文件
    // 第一个参数就是要读取的文件路径
    // 第二个参数是一个回调函数
        // 成功
            // data 数据
            // error null
        // 失败
            // data undefined 没有数据
            // error 错误对象
fs.readFile('./data/o.txt', function (error, data) {
    // <Buffer 68 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73 >
    // 为什么看到的不是0和1呢，是因为二进制转为十六进制了
    // console.log(error)
    // 在这里就可以通过判断error是否为null
    if(error) {
        console.log('读取文件失败了')
    } else {
        console.log(data.toString())
    }
})