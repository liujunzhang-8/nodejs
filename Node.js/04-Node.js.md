# Node.js 第四天

## 知识点

- 复习

  - jQuery 的 each 和原生的 JavaScript 方法 forEach
  - 301 和 302 的区别
  - 模块中导出单个成员和导出多个成员的方式
    - `module.exports = xxx`
    - 通过多次：`exports.xxx = xxx`
    - 导出多个也可以： `module,export = {多个成员}`
  - module.exports 和 exports 的区别
    - exports 只是 module.exports 的一个引用而已，目的只是为了简化写法
    - 每个模块最终 return 的是 module.exports
  - require 方法加载规则
    - 优先从缓存加载
    - 核心模块
    - 路径形式的模块
      - `./xxx`
      - `../xxx`
      - `/xxx`  / 在这里表示的是磁盘根路径
      - `c:/xx`
    - 第三方模块
      - 第三方模块的标识就是第三方模块的名称 （不可能有第三方模块和核心模块的名字一致）
  - package.json 包描述文件
    - 产品的说明书
    - dependencies 属性， 用来保存项目的第三方包依赖项信息
    - 建议每个项目都要有且只有一个 package.json (存放在项目的根目录)
    - 我们可以通过 `npm  init [---yes]` 来生成 package.json文件
  - npm 常用命令
    - 开发人员可以把写好的框架、库发布到 npm 上
    - 使用者通过 npm 下载
  - Express基本使用

- 文件操作路径和模块路径

  文件操作路径：

  ```
  // 在文件操作的相对路径中
  //  ./data/a.txt 相对于当前目录
  //  data/a.txt  相对于当前目录
  //  /data/a.txt 绝对路径，当前文件模块所处磁盘根目录
  //     c:/xx/xx...  绝对路径
  // fs.readFile('./data/a.txt', function (err, data) {
  //     if (err) {
  //         console.log(err)
  //         return console.log('读取失败')
  //     }
  //     console.log(data.toString())
  // })
  ```

  模块操作路径：

  ```
  // 这里如果忽略了，则也是磁盘目录
  require('/data/foo')
  
  // 相对路径
  require('./data/foo.js')
  
  // 模块加载的路径中的相对路径不能省略 ./
  
  ```

- 修改完代码自动重启

  - 使用一个第三方命令行工具：nodemon 来帮助我们解决频繁修改代码重启服务器问题

  - `nodemon` 是一个基于node.js 开发的一个第三方命令行工具，我们使用的时候需要独立安装：

  - 在任意目录执行该命令都可以

  - 也就是说，所有需要 --global 来安装的包都可以在任意目录执行

  - `npm install --global nodemon`

  - 安装完毕之后，使用：

  - ```
    node app.js
    
    # 使用 nodemon.js
    nodemon app.js
    ```

  - 只要通过`nodemon app.js` 启动的服务，则它会监视你的文件变化，当文件发生变化的时候，自动帮你重启服务器

- Express

  - 起步

    - 安装

      - `npm  install  --save  express`

      - ### hello world:

      - ```
        const express = require('express')
        const app = express()
        
        app.get('/', (req, res) => res.send('hello world'))
        
        app.listen(3000, () => console.log('express app is running ...'))
        ```

      - 基本路由

      路由器

      - 请求方法
      - 请求路径

       - get

       - ```
         // 当你以GET 方法请求 / 的时候，执行对应的处理函数
         app.get('/', function (req, res) {
         	res.send('Hello World!')
         })
         ```

       - post

       - ```
         // 当你以 POST 方法请求 / 的时候，指定对应的处理函数
         app.post('/', function (req, res) {
         	res.send('Got a POST request')
         })
         ```

      	- 静态服务

      ```
      // public 资源
      app.use(express.static('public'))
      
      // files 资源
      app.use(express.static('files'))
      
      // /public/xxx
      app.use('/public', express.static('public'))
      
      // /static/xxx
      app.use('/static', express.static('public'))
      
      app.use('/static', express.static(path.join(__dirname, 'public')))
      ```

      ### 在 Express 中配置使用 art-template 模板引擎

      + 安装

        ```
        npm install art-template --save
        npm install express-art-template --save
        ```

      + 配置

      ```
      app.engine('html', require('express-art-template'));
      ```

      + 使用

      ````
      app.get('/', function (req, res) {
      	// express 默认会去项目中的 views 目录找 index.html
          res.render('index.html', {
              title: 'hello world'
          })
      })
      ````

      如果希望修改默认的`views` 视图渲染存储目录，可以：

      ```
      // 注意： 第一个参数 views 千万不要写错
      app.set('views', 目录路径)
      ```

      ### 在Express 中获取表单 GET 请求参数

      Express 内置了一个 API ，可以直接通过 `req,query` 来获取

      ```
      req.query
      ```

      

      

      ### 在Express 获取表单POST 请求体数据

      ​	在Express中没有内置获取表单POST请求体的API，这里需要一个第三方包： `body-parser`

      安装：

      ```
      npm install --save body-parser
      ```

      配置

      ```
      var express = require('express')
      
      // 0、引包
      ```

      自己编写的步骤：

      	- 处理模板
      	- 配置开放静态资源
      	- 配置模板引擎
      	- 简单路由： /students 渲染静态页出来
      	- 路由设计
      	- 提取路由模块
      	- 由于接下来一系列的业务操作都需要处理文件数据，所以我们需要封装 student.js
       - 先写好 student.js 文件结构
         	- 查询所有学生列表的 api find
         	- findByid
         	- save
         	- updateByid
         	- deleteByid
      - 实现具体功能
        - 通过路由收到请求
          - 接收请求中的数据（get, post）
            - req.query
            - req.body
          - 调用数据操作API　处理数据
          - 根据操作结果给客户端发送响应
      - 业务功能顺序
        - 列表
        - 添加
        - 编辑
        - 删除

- MongoDB

- 基于文件做的一套 CRUD