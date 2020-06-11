# 异步编程

## 回调函数

不成立的情况：

```javascript
function add (x, y) {
    console.log(1)
    setTimeout(function () {
        console.log(2)
        var ret = x + y
        return ret
    }, 1000)
    console.log(3)
    // 到这里执行就结束了，不会等到前面的定时器，所以直接就返回了默认值 undefined
}
console.log(add(10, 20)) // => undefined
```

不成立的情况：

```javascript
function add (x, y) {
    var ret
    console.log(1)
    setTimeout(function () {
        console.log(2)
        ret = x + y
    }, 1000)
    console.log(3)
    return ret
}
console.log(add(10, 20)) // => undefined
```

回调函数：

```javascript
function add (x, y, callback) {
	// callback 就是回调函数
	// var x = 10
	// var y = 20
	// var callback = function (ret) { console.log(ret) }
    console.log(1)
    setTimeout(function () {
        var ret = x + y
        callback(ret)
    }, 1000)
}

add(10, 20, function (ret) {
	// 我现在拿到这个结果可以做任何操作
    // ret 才是我们得到的结果
    console.log(ret)
})
```

基于原生XMLHTTPRequest 封装 get 方法：

```js
        function get() {
            var oReq = new XMLHttpRequest();
            // 当请求加载成功之后要调用指定的函数
            oReq.onload = function () {
                // 现在需要得到这里的 oReq.responseText
                callback(oReq.responseText)
            }
            oReq.open('get', 'url', true)
            oReq.send()
        }
        get('data.json', function (data) {
            console.log(data)
        })
```

在 Node 这个环境中对 JavaScript 进行了特殊的模块化支持 CommonJS

JavaScript 天生不支持模块化

- require
- exports
- Node.js 才有的

在浏览器中也可以像在 Node 中的模块一样来进行编程

- `<script>`标签来引用加载， 而且你还必须考虑加载的顺序问题

- require.js  第三方库 AMD
- sea.js         第三方库 CMD

无论是 CommonJS、AMD、CMD、UMD、EcmaScript 6 Modules 官方规范

- 都是为了解决 Javascript 的模块化问题
- CommonJS、AMD、CMD都是民间搞出来的
- EcmaScript 是官方规范定义
- EcmaScript 在 2015 年发布了 EcmaScript 2016 官方标准
- Node 只在 8.5 版本之后才对 EcmaScript 6 Module 进行了支持

### package.json 和 package-lock.json

npm5 以前是不会有`package-lock.json` 这个文件的

npm5 以后才加入这个文件

当你安装包的时候，npm 都会生成或者更新 `package-lock.json` 这个文件

- npm5 以后的版本安装包不需要加 `--save` 参数，它会自动保存依赖信息
- 当你安装包的时候，会自动创建或者是更新`package-lock.json` 这个文件
- `package-lock.json` 这个文件会保存`node_module` 中所有包的信息（版本，下载地址）
  - 这样的话重新`npm install` 的时候就可以提升速度
- 从文件来看，有一个`lock`  称之为锁
  - 这个`lock` 是用来锁定版本的
  - 如果项目依赖了`1.1.1` 版本
  - 如果你重新Install 其实会下载最新版本，而不是1.1.1
  - 我们的目的是希望锁住1.1.1 这个版本
  - 所以这个`package-lock.json` 这个文件的另一个作用就是锁定版本，防止自动升级

# MongoDB

## 关系型数据库和非关系型数据库

表就是关系

或者说表与表之间存在关系

- 所有的关系型数据库都需要通过`sql`语言来操作
- 所有的关系型数据库在操作之前都需要设计表机构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空
- 非关系型数据库非常灵活
- 有的非关系型数据库就是 key - value 对儿
- 但是 MongoDB 是长得最像关系型数据库的非关系型数据库
  - 数据库 —> 数据库
  - 数据表 —> 集合（数组）
  - 表记录 —> (文档对象)
- MongoDB 不需要设计表结构
- 也就是说你可以任意的往里面存数据，没有结构性这么一说