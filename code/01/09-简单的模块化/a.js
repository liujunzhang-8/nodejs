// require 是一个方法
// 它的作用就是用来加载模块的
// 在 Node 中,模块有三种：
//      具名的核心模块，例如 fs、http
//      用户自己编写的文件模块
//          相对路径必须加 ./
            // 可以省略后缀名
            // 相对路径中的 ./ 不能省略，否则报错
// 在node中没有全局作用域，只有模块作用域
//      外部访问不到内部，内部也访问不到外部
//  既然是模块作用域，那如何让模块之间进行通信
//  有时候加载文件模块的目的不是为了简简单单的执行里面的代码，更是为了使用里面的
var foo = 'aaa'

console.log('a start')

function add(x, y) {
    return x + y
}

require('./b')

console.log('a end')

console.log('foo 的值是：', foo)
