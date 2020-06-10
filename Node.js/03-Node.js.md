# 	node.js 第三天笔记

## 知识点

- 增删改查
- 登录
- 注册
- 头像
  - 服务端图片
  - 水印
  - 图片水印
- 找回密码
- 密码修改

- Node 中的模块系统

  ### 什么是模块化

  - 文件作用域
  - 通信规则
    - 加载 require
    - 导出

  ### CommonJS 模块规范

  在 Node 中的 JavaScript 还有一个很重要的概念，模块系统。

  - 模块作用域
  - 使用 require 方法用来加载模块
  - 使用 exports 接口对象用来导出模块中的成员

  加载 `require`

  ​	语法：

  ​			`var 自定义变量名称 = require('模块')`

  ​	两个作用：

  ​			1、执行被加载模块中的代码

  ​			2、得到被加载模块中的 exports 导出接口对象

  导出 `exports`

  	- Node 中是模块作用域，默认文件中所有的成员在当前文件模块有效
  	- 对于希望可以被其他模块访问的成员，我们就需要把这些公开的成员都挂载到 `exports` 接口对象中就可以了

  导出多个成员（必须在对象中）：

  ```	javascript
  exports.a = 123
  exports.b = 'hello'
  exports.c = function () {
      console.log('ccc')
  }
  
  exports.d = function () {
      foo: 'bar'
  }
  ```

  导出单个成员（拿到的就是：函数、字符串）

  ```javascript
  module.exports = 'hello'
  ```

  以下情况会覆盖

  ```
  module.exports = 'hello'
  
  // 以这个为准，后者会覆盖前者
  module.exports = function (x, y) {
  	return x + y
  }
  ```

  也可以这样来导出多个成员：

  ```
  module.exports = {
      add: function () {
  
      },
      str: 'hello'
  }
  ```

  exports 和 module.exports 的区别

  - 每个模块中都有一个 `module` 对象
  - `module` 对象中有一个 exports 对象
  - 我们可以把需要导出的成员都挂载到 `module.exports` 接口对象中
  - 也就是： `module.exports.xxx = xxx` 的方式
  - 但是每次都 `module.exports.xxx = xxx` 很麻烦，点儿的太多了
  - 所以Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
  - `exports === module.exports` 结果为 `true`
  - 所以对于：`module.exports.xxx = xxx` 的方式，完全可以：`exports.xxx = xxx`
  - 当一个模块需要导出单个成员的时候，这个时候必须使用： `module.exports === xxx` 的方式
  - 不要使用 `exports = xxx` 不管用
  - 因为每个模块最终向外 `return` 的是 `module.exoorts`
  - 而 `exports` 只是 `module.exports`  的一个引用
  - 所以即便你为 `exports = xxx` 重新赋值，也不会影响 `module.exports`
  - 但是有一种赋值比较特殊： `exports = module.exports` 这个用来重新建立引用关系的

  ### 原理解析

  ​	`exports` 和 `module.exports` 的一个引用：

  ```
  exports.foo = 'bar'
  
  // 等价于
  module.exports.foo = 'bar'
  ```

  

  - 使用 Node 编写应用程序主要就是在使用EcmaScript 语言
    - 和浏览器不一样，在 Node 中没有BOM、ＤＯＭ
    - 核心模块
      - 文件操作 fs
      - http 服务的 http
      - url 路径操作模块
      - path 路径处理模块
      - os 操作系统信息
    - 第三方模块
      - art-template
      - 必须通过 npm 来下载才可以使用
    - 自己写的模块
      - 自己创建的文件
    - 加载规则以及加载机制
    - 循环加载

### require 方法加载规则

如果想要了解更多底层细节，参考《深入浅出Node.js》

- 核心模块
  - 模块名
- 第三方模块
  - 模块名
- 自己写的
  - 路径
- 优先从缓存加载
- 判断模块标识
  - 核心模块
  - 第三方模块
  - 自己写的模块

### npm

 - npm 网站
   	- npmjs.com
- npm 命令行工具
  - npm 的第二层含义就是一个命令行工具，只要你安装了 node 就已经安装了 npm
  - npm 也有版本这个概念
  - 可以通过命令行中输入：

```
npm --version
```

升级npm(自己升级自己):

```
npm install --global npm
```

- 常用命令
  - npm init 
    - npm init -y 可以跳过向导，快速生成
  - npm install
    - 一次性把 dependencies 选项中的依赖项全部安装
    - npm i
  - npm install 包名
    - 只下载
    - npm i 包名
  - npm install --save 包名
    - 下载并且保存依赖项 （package.json文件中的dependencies 选项）
    - npm  i  -S 包名
  - npm uninstall 包名
    - 只删除，如果有依赖项会依然保存
    - npm un 包名
  - npm  uninstall --save 包名
    - 删除的同时也会把依赖信息也去除
    - npm  un  -S  包名
  - npm help
    - 查看npm 使用帮助
  - npm  命令  --help
    - 查看指定命令的使用帮助
  - 解决 npm 被墙问题
    - npm 存储包文件的服务器在国外，有时候会被墙，速度很慢，所以我们需要解决这个问题
    - http://npm.taobao.org/ 淘宝的开发团队把npm 在国内做了一个备份
    - 安装淘宝的 cnpm

```
# 在任意目录执行都可以
# --global 表示安装到全局，而非当前目录
# --global 不能省略，否则不管用
npm install --global cnpm
```

接下来你安装包的时候把之前的`npm` 替换成 `cnpm`

如果不想安装`cnpm` 又想使用淘宝的服务器来下载：

```
npm install jquery --registry=https://registry.npm.taobao.org
```

但是每一次手动这样加参数很麻烦，所以我们可以把这个选项加入配置文件中：

```
npm config set registry https://registry.npm.taobao.org
# 查看 npm 配置信息
npm config list
```

只要经过上面命令的配置，则以后所有的`npm install` 都会默认通过服务器来下载

​	node package manager

### package.json

​	我们建议每一个项目都有一个 `package.json` 文件 （包描述文件，就像产品的说明书一样），给人踏实的感觉

​	这个文件可以通过`npm init` 的方式来自动初始化出来

```
C:\Users\Gorgio_Liu\Desktop\汇总\nodejs\code\npm-demo>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (npm-demo)
version: (1.0.0)
description: 这是一个测试项目
entry point: (index.js) main.js
test command:
git repository:
keywords:
author: Gorgio
license: (ISC)
About to write to C:\Users\Gorgio_Liu\Desktop\汇总\nodejs\code\npm-demo\package.json:

{
  "name": "npm-demo",
  "version": "1.0.0",
  "description": "这是一个测试项目",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Gorgio",
  "license": "ISC"
}


Is this OK? (yes) yes

C:\Users\Gorgio_Liu\Desktop\汇总\nodejs\code\npm-demo>npm install --save jquery
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN npm-demo@1.0.0 No repository field.

+ jquery@3.5.1
added 1 package from 1 contributor and audited 1 package in 1.23s
found 0 vulnerabilities
```

对于咱们来讲，最有用的就是那个 dependencies 选项，可以用来帮我们保存第三方包的依赖信息

如果 `node_modules` 删除了也不用担心，只需要`npm install` 就会自动把 `package.json`  中的 `dependencies` 中所有的依赖项都下载回来

	- 建议每个项目下都有一个 `package.json` 文件
	- 建议执行 `npm install`  包名时都加上 `--save` 这个选项，目的是用来保存依赖项信息

### Express

原生的http在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架加快我们的开发效率，框架的效率就是为了提高效率，让我们的代码更高度统一

在Node中，有很多web开发框架，我们这里以学习`express` 为主

- 第三方 web 开发框架

- 高度封装了 http 模块

- 更加专注于业务， 而非底层细节

- 知其所以然

  

- 增删改查
  - 使用文件来保存数据 （锻炼异步编码）

- MongoDB
  - （所有方法都封装好了）

## 复习

- 网站开发模型

  - 黑盒子、哑巴

    - PHP + Apache （默认帮你封装好了很多底层细节操作）

    - 但是在 Node 比较偏底层，很多东西需要你亲自写代码来实现

    - 在 Node 中，我们开启的Web服务是一个完全的黑盒子，它不像php，php中无论是代码还是网页，都可以直接通过 web url 路径来访问

    - 在 Node 中开启的服务器，默认是黑盒子，所有资源都不允许用户来访问，用户可以访问哪些资源由具体的开发人员编写设计的代码为准

    - 哑巴：

      - /index.html
      - /post post.html

      在 Node 中就可以很方便的来自定义这个  url 地址，Node天生就可以把url 地址处理的非常的精简而漂亮，优雅而艺术

  - 写代码让它变得更智能

  - 按照你设计好的套路供用户使用

- 在Node中使用 art-template 模板引擎
  - 安装
  - 加载
  - template.render()
- 客户端渲染和服务端渲染的区别
  - 最少两次请求，发起 ajax 在客户端使用模板引擎渲染
  - 客户端拿到的就是服务端已经渲染好的
- 处理留言本案例首页数据列表渲染展示
- 处理留言本案例发表留言功能
  - 路径
  - 设计好的请求路径
  - $GET 直接或查询字符串数据
  - Node 中需要咱们自己动手来解析
    - url.parse()
- 掌握如何解析请求路径中的查询字符串
  - url.parse()
- 如何在 Node 中实现服务器重定向
  - header('location')
    - 301 永久重定向 浏览器会记住
      - a.com  b.com
      - a 浏览器不会请求 a 了
      - 直接去跳到 b 了
    - 302 临时重定向 浏览器不记忆
      - a.com  b.com
      - a.com 还会请求 a
      - a 告诉浏览器你往 b
- Node 中的 Console（REPL）使用

## 总结

- jQuery 的 each 和  原生的 JavaScript 方法 forEach
  - EcmaScript5 提供的
    - 不兼容 IE8
  - jQuery 的 each 由 jQuery 这个第三方库提供
    - jQuery 2 以下的版本是兼容 IE8 的
    - 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）
    - 同时它也可以作为低版本浏览器中 forEach 替代品
    - jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用
    - `[].slice.call(jQuery实例对象)`
- 模块中导出多个成员和导出单个成员
- 301 和 302 状态码区别
  - 301 永久重定向，浏览器会记住
  - 302 临时重定向
- exports 和 module.exports 的区别
  - 每个模块中都有一个 `module` 对象
  - `module` 对象中有一个 exports 对象
  - 我们可以把需要导出的成员都挂载到 `module.exports` 接口对象中
  - 也就是： `module.exports.xxx = xxx` 的方式
  - 但是每次都 `module.exports.xxx = xxx` 很麻烦，点儿的太多了
  - 所以Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
  - `exports === module.exports` 结果为 `true`
  - 所以对于：`module.exports.xxx = xxx` 的方式，完全可以：`exports.xxx = xxx`
  - 当一个模块需要导出单个成员的时候，这个时候必须使用： `module.exports === xxx` 的方式
  - 不要使用 `exports = xxx` 不管用
  - 因为每个模块最终向外 `return` 的是 `module.exoorts`
  - 而 `exports` 只是 `module.exports`  的一个引用
  - 所以即便你为 `exports = xxx` 重新赋值，也不会影响 `module.exports`
  - 但是有一种赋值比较特殊： `exports = module.exports` 这个用来重新建立引用关系的
- Node 是一个比肩Java、PHP的一个平台
- require 方法加载规则
  - 优先从缓存加载
  - 核心模块
  - 路径形式的模块
  - 第三方模块
    - node_modules
  - package.json 包描述文件
    - dependencies 选项的作用
  - npm常用命令
    - npm init
  - Express 基本使用
    - 使用Express 把之前留言本改造一下

 