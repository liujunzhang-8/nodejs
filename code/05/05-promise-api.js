var fs = require('fs')

// 在 ES6 中新增了一个 API Promise
// Promise 是一个构造函数

// 创建 Promise 容器
// 1、给别人一个承诺
//      Promise 容器一旦创建，就开始之星里面的代码
var p1 = new Promise(function (resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', function (err, data) {
        if (err) {
            // 失败了，承诺容器中的任务失败了
            // console.log(err)
            // 把容器的 Pending 状态变为 Rejected

            // 调用 reject 就相当于调用了 then 方法的第二个参数函数
            reject(err)
        } else {
            // 承诺容器中的任务成功了
            // console.log(data)
            // 把容器的 Pending 状态改为成功 Resolved
            // 也就是说这里调用的 resolve 方法实际上就是 then 方法传递的那个 function
            resolve(data)
        }
    })
})

// p1 就是那个承诺
// 当 p1 成功了 然后（then）做指定的操作
// then 方法接收的 function 就是容器中的 resolve 函数
p1
    .then(function (data) {
        console.log(data)
        // 当 p1 读取成功的时候，
        // 当前函数中 return 的结果就可以在后面的 then 中 function 接收到
        // 当你 return 123  后面就接收到 123
            // return 'hello' 后面就接收到 ‘hello’
            // 没有 return 后面收到的就是 undefined
        // 上面那些 return 的数据没什么卵用
        // 真正有用的是：我们可以 return 一个 Promise 对象
        // 当 return 一个 Promise 对象的时候，后续的 then 中的 方法的第一个参数会作为 p2 de 
    }, function (err) {
        console.log('读取文件失败了', err)
    })