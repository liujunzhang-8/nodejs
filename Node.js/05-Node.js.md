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

回调函数

	+ 异步编程
	+ 如果需要得到一个函数内部异步操作的结果，这是时候必须通过回调函数来获取
	+ 在调用的位置传递一个函数进来
	+ 在封装的函数内部调用传递进来的函数

find、findIndex、forEach

+ 数组的遍历方法，都是对函数作为参数的一种运用
+ every
+ some
+ includes
+ map
+ reduce

package-lock.json 文件的作用

+ 下载速度快了
+ 锁定版本

JavaScript 模块化

+ Node 中的 CommonJS
+ 浏览器中的
  + AMD require.js
  + CMD sea.js
+ EcmaScript 官方在 EcmaScript 6 中增加了官方支持
+ EcmaScript 6
+ 后面学习编译工具

### promise

```js
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function(err, data) {
    // body...
    if(err) {
        // return console.log('读取失败')
        // 抛出异常
        //  1、阻止程序的执行
        //  2、把错误消息打印到控制台
        throw err
    }
    console.log(data)
    fs.readFile('./data/b.txt', 'utf8', function (err, data) {
        // body...
        if (err) {
            // return console.log('读取失败')
            // 抛出异常
            //  1、阻止程序的执行
            //  2、把错误消息打印到控制台
            throw err
        }
        console.log(data)

        fs.readFile('./data/c.txt', 'utf8', function (err, data) {
            // body...
            if (err) {
                // return console.log('读取失败')
                // 抛出异常
                //  1、阻止程序的执行
                //  2、把错误消息打印到控制台
                throw err
            }
            console.log(data)
        })
    })
})
```

为了解决以上编码方式带来的问题（回调地狱嵌套）, 所以在 EcmaScript 6 中新增了一个API：`Promise`

- Promise 的英文就是承诺，保证的意思 （I promise you）

Promise 基本语法：

```js
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
    }, function (err) {
        console.log('读取文件失败了', err)
    })
```

封装 Promise 版本的 `readFile` :

```js
var fs = require('fs')

function pReadFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then(function (data) {
        console.log(data)
        return pReadFile('./data/b.txt')
    })
    .then(function (data) {
        console.log(data)
        return pReadFile('./data/c.txt')
    })
    .then(function (data) {
        console.log(data)
    })
```



MongoDB 数据库

# MongoDB

## 关系型数据库和非关系型数据库

表就是关系

或者说表与表之间存在关系

- 所有的关系型数据库都需要通过`sql`语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
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

### 安装

- 下载
- 安装
- 配置环境变量
- 最后输入 `mongod --version` 测试

### 启动和关闭数据库

启动：

```shell
# mongodb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录
# 所以在第一次执行该命令之前先自己手动新建一个 /data/db
mongod
```

如果想要修改默认的存储目录，可以：

```
mongod --dbpath=数据存储目录路径
```

停止：

```
在开启服务的控制台，直接 ctrl + c 即可停止
或者直接关闭开启服务的控制台也可以
```

### 连接数据库

连接：

```shell
# 该命令默认连接本机的 MongoDB 服务
mongo
```

退出：

```she
# 在连接状态输入 exit 退出连接
exit
```

基本命令

+ `shou dbs`
  + 查看显示所有数据库
+ `db`
  + 查看当前操作的数据库
+ `use 数据库名称`
  + 切换到指定的数据（如果没有会新建）

+ 插入数据

### 在Node中如何操作 MongoDB 数据

#### 使用官方的 `MongoDB` 包来操作

#### 使用第三方 mongoose 来操作 MongoDB数据库

第三方包： `mongoose` 基于 MongoDB 

## 1、MongoDB 数据库的基本概念

+ 数据库
+ 一个数据库中可以有多个集合（表）
+ 一个集合中可以有多个文档（表记录）
+ 文档结构很灵活，没有任何限制
+ MongoDB 非常灵活，不需要像 MySQL 一样先创建数据库、表、设计表结构
  + 在这里只需要：当你需要插入数据的时候，只需要指定往哪个数据库的哪个集合操作就可以了
  + 一切都由MongoDB来帮你自动完成建库建表这件事

```javascript
{
    qq: {
       users: [
           {name: '张三', age: 15},
           {name: '李四', age: 13},
           {name: '王五', age: 10}，
           {name: '狗蛋', age: 15}
       ],
       products: [
           
       ],
       ...
    },
    taobao: {
        
    },
   	baidu: {
        
    }
}
```

### 官方指南

#### 1.1、设计Scheme 发布 Model

```javascript
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// 1、连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/test')

// 2、设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username: {
        type: String,
        required: true // 必须有
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
}) 

// 3、将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为 model
/* 
    第一个参数： 传入一个大写名词单数字符串用来表示你的数据库的名称
                mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
                例如这里的 User 最终会变为 users 集合名称
    第二个参数： 架构 Schema
    返回值：模型构造函数
*/

var User = mongoose.model('User', userSchema);

// 4、当我们有了模型构造函数之后，就可以使用这个构造函数对 user 集合中的数据为所欲为了

```

#### 1.2、增加数据

```javasc
var admin = new User({
    username: 'admin',
    password: '123456',
    email: 'admin@admin.com'
})
admin.save(function (err, ret) {
    if (err) {
        console.log('保存失败')
    } else {
        console.log('保存成功')
        console.log(ret)
    }
})
```

#### 1,3、查询数据

查询所有：

```js
User.find(function (err,ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})
```

按条件查询所有：

```js
User.find({
    username: 'zs'
}, function (err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})
```

按条件查询单个：

```javascript
User.findOne({
    username: 'zs',
    password: '123456'
}, function (err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})
```

#### 1.4、删除数据

```js
User.remove({
    username: 'zs'}, function (err, ret) {
    if (err) {
        console.log('删除失败')
    } else {
        console.log('删除成功')
        console.log(ret)
    }
})
```

#### 1.5、更新数据

```js
User.findByIdAndUpdate(
    '5ee3b9580653f2194c990866',
    {password: '123'},
function (err, ret) {
    if (err) {
        console.log('更新失败')
    } else {
        console.log('更新成功')
        console.log(ret)
    }
}) 
```

- MongoDB 数据库
  + MongoDB 的数据存储结构
    + 数据库
    + 集合（表）
    + 文档 （表记录）
  + MongoDB 官方有一个 mongodb 的包可以用来操作 MongoDB 数据库
    + 这个确实强大，但是比较原始，麻烦，不使用它
  + mongoose
    + 真正的开发，使用的是 mongoose 这个第三方包
    + 它是基于 MongoDB 官方的 MongoDB 包进一步做了封装
    + 可以提高开发效率
    + 让你操作 MongoDB 数据库更方便
  + 掌握使用 Mongoose 对数据集合进行基本的 CRUD
  + 把之前的 crud 案例改为了 MongoDB 数据库版本
  + 使用  Node 操作 mysql 数据库

