## Node.js介绍

### 为什么要学习Node.js

- 企业需要
    + 具有服务端开发经验更好
    + front - end
    + back - end
    + 全栈开发工程师
    + 基本的网站开发能力
        * 服务端
        * 前端
        * 运维部署
    + 多人社区

### Node.js是什么？
    . Node.js is a JavaScript runtime built on Chrome`s V8 JavaScript engine.
        Node.js不是一门语言
        Node.js不是库、不是框架
        Node.js是一个JavaScript运行时环境
        简单点来讲就是Node.js可以解析和执行JavaScript代码
        以前只有浏览器可以解析执行JavaScript代码
        也就是说现在的JavaScript可以完全脱离浏览器来运行，一切都归功于：Node.js
    . 浏览器中的JavaScript
        EcmaScript
            基本语法
            if
            var
            function
            Object
            Array
        BOM
        DOM
    Node.js中的JavaScript
        没有BOM、DOM
        EcmaScript
        在Node这个JavaScript执行环境中为Javascript提供了一些服务器级别的操作API
            例如文件读写
            网络服务的构建
            网络通信
            http服务器
            等处理
        构建于Chrome的V8引擎之上
            代码只是具有特定格式的字符串而已
            引擎可以认识它， 引擎可以帮你去解析和执行
            Google Chrome的V8引擎是目前公认的解析执行JavaScript代码最快的
            Node.js的作者把Google Chrome中的V8引擎移植了出来，开发了一个独立的Javascript运行时环境
    Node.js uses an event-driven,non-blocking I/O model that makes it lightweight and efficient
        event-driven 事件驱动
        non-blocking I/O model 非阻塞IO模型（异步）
        lightweight and efficient 轻量和高效
        随着学习慢慢体会什么是事件驱动、非阻塞IO模型
    Node.js package ecosystem， npm is the largest ecosystem of open source libraries in the world.
        npm 是世界上最大的开源库生态系统
        绝大多数JavaScript相关的包都存放在了npm上，这样做的目的是为让开发人员更方便的去下载使用
        npm install jquery

### Node.js能做什么？
    Web服务器后台
    命令行工具
        npm
        git （C语言开发）
        hexo
    对于前端开发工程师来讲，接触node最多的是它的命令行工具
        自己写的很少，主要是使用别人第三方的
        webpack
        gulp
        npm

### 预备知识
    HTML
    CSS
    Javascript
    简单的命令行操作
        cd
        dir
        ls
        mkdir
        rm
    具有服务端开发经验更佳

### 学习资源
    《深入浅出Node.js》
        朴灵
        偏理论，几乎没有任何实战性内容
        理解原理
    《Node.js权威指南》

### 你能学到啥
    B/S编程模型
        Browser - Server
        back - end
        任何服务端技术这种BS编程模型都是一样，和语言无关
        Node只是作为我们学习BS编程模型的一个工具而已
    模块化编程
        RequireJS
        SeaJS
        @import('文件路径')
        以前认知的JavaScript只能通过script标签来加载
        在Node中可以像@import一样来引用加载JavaScript脚本文件
    Node常用API
    异步编程
        回调函数
        Promise
        async
        generator
    Express开发框架
    EcmaScript 6
    ...

# 起步
    安装Node环境
        查看当前node环境的版本号
        下载: https://node.js.org/en/download
        安装
            傻瓜式的一路next就可以了
            对于已经装过的，重新安装就会升级
        确认Node环境是否安装成功
            打开命令行，输入node --version
            或者node -v
        环境变量
    Hello World
        1、创建编写JavaScript脚本文件
        2、打开终端、定位到脚本文件所属目录
        3、输入node文件名执行对应的文件
        注意：文件名不要使用node.js来命名，也就是说除了node这个名字你随便起，而且最好也不要使用中文
    
        解析执行JavaScript
        读写文件
        http

### Node 中的Javascript
    EcmaScript
        没有DOM、BOM
        变量
        方法
        数据类型
        内置对象
        Array
        Object
        Date
        Math
    模块系统
        Node 为 Javascript提供了很多服务器级别的API，这些API绝大多数都被包装到了
        在 Node 中没有全局作用域概念
        在 Node 中，只能通过require方法来加载执行多个JavaScript脚本文件
        require加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
            - 模块完全是封闭的
            - 外部无法访问内部
            - 内部也无法访问外部
        模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
        但是某些情况下，模块与模块是需要进行通信的
        在每个模块中，都提供了一个对象：‘exports’
        该对象默认是一个空对象
        你要做的就是把需要被外部访问使用的成员手动挂载到 ’exports‘接口对象中
        然后谁来’require‘这个模块，谁就可以得到模块内部的’exports‘接口对象
        还有其他的一些规则，具体后面讲，以及如何在项目中去使用这中编程方式，会通过后面的案例去讲解
    核心模块
        核心模块是由Node提供的一个个的具名的模块，他们都有自己特殊的名称标识，例如
            -fs 文件操作模块
            -http 网络服务构建模块
            -os 操作系统信息模块
            -path 路径处理模块
        所有核心模块在使用的时候都必须手动的先使用’require‘方法来加载，然后才可以使用，例如
            -’var fs = require('fs')‘
    -http
        require
        端口号
            + ip 地址定位计算机
            + 端口号定位具体的应用程序
        Content-type
            服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
            不同的资源对应的 Content-Type 是不一样的
            对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
        通过网络发送文件
            发送的并不是文件，本质上来讲发送的是文件内容
            当浏览器收到服务器响应内容之后，就会根据你的 Content-type 进行对应的解析处理
    第三方模块
    用户自定义模块

### Ip地址与端口号
    ip地址用来定位计算机
    端口号用来定位具体的应用程序
    一切需要联网的

+ 服务端渲染
  	+ 说白了就是在服务端使用模板引擎
  	+ 模板引擎最早诞生于服务端，后来才发展到前端
+ 服务端渲染和客户端渲染的区别
  + 客户端渲染不利于SEO搜索引擎优化
  + 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  + 真正的网站既不是纯异步也不是纯服务端渲染出来的
  + 而是两者结合来做的
  + 例如京东的商品列表就采用的是服务端渲染，目的为了SEO搜索引擎优化
  + 而它的商品评论列表为了用户体验，而且也不需要SEO优化，所以采用的是客户端渲染
  + 