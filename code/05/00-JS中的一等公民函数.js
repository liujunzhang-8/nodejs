/* 
    1、一种数据类型
    2、参数
    3、函数太灵活，无所不能
    4、一般情况下，把函数作为参数的目的就是为了获取函数内部的异步操作结果
    JavaScript 事件循环、单线程、
    function add (x, y) {
        return x + y
    }
    add(10, 20)
*/

// 不会等待
// setTimeout(function () {
//     console.log(2)
//     console.log('hello')
// }, 0)
//     console.log(3)

// function add (x, y) {
//     console.log(1)
//     setTimeout(function () {
//         console.log(2)
//         var ret = x + y
//         return ret
//     }, 1000)
//     console.log(3)
//     // 到这里执行就结束了，不会等到前面的定时器，所以直接就返回了默认值 undefined
// }

function add (x, y, callback) {
    console.log(1)
    setTimeout(function () {
        var ret = x + y
        callback(ret)
    }, 1000)
}

add(10, 20, function (ret) {
    console.log(ret)
})

// 注意：凡是需要得到一个函数内部异步操作的结果
// setTimeout
// readFile
// writeFile
// ajax
// 这种情况必须通过：回调函数
