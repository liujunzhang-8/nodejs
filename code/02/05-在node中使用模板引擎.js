// art-template
// art-template 不仅可以在浏览器使用，也可以在node中使用

// 安装：
    // npm install art-template
    // 该命令在哪儿执行就会把包下载到哪里。默认会下载到 node_modules 

// 在node中使用 art-template 模板引擎
// 模板引擎最早诞生于服务器领域，后来才发展到前端

// 1、安装 npm install art-template
// 2、在需要使用的文件模块中加载 art-template
//      只需要require方式加载
// 3、查文档，使用模板引擎的 api

var template = require('art-template')

// 不是浏览器
// template('script 标签 id', {对象})

var ret = template.render('hello {{name}}', {
    name: 'jack'
})
console.log(ret)

