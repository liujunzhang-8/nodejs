function say () {
    console.log('hello world')
}

// TypeError: say(...) is not a function
say()

;(function () {
    console.log('hello')
})()

// `` 是ES6中新增的一种字符串包裹方式，叫做：模板字符串
// 它支持换行和非常方便拼接变量
// 当你采用了无分号的代码风格的时候，只需要注意以下情况就不会有上面的问题了：
//  当一行代码是以：（
                // [
                // `
                // 开头的时候，则在前面补上一个分号用以避免一些语法解析错误
//      所以你会发现在一些第三方的代码中能看到一上来就以一个 ; 开头
//      结论：
//          无论你的代码是否有分号，都建议如果一行代码是以（、[、` 开头的，则最好都在其前面补上分号