// app application 应用程序
// 当前模块所有的依赖项都声明在文件模块最上面
// 为了目录结构保持统一清晰，把所有的HTML文件都放在views
// 为了方便统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public
// 哪些资源呢个被访问，哪些资源不能被访问，现在可以通过代码来进行非常灵活的控制
// /index.html
// /public 整个 public 目录中的资源都允许被访问

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
    {
        name: '张三1',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]

// /pinglun?name=sdfgsdfg&meaasge=fsdgfdgdsg
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 

http
//  简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
    .createServer(function (req, res) {
        var parseObj = url.parse(req.url, true)

        // 单独获取不包含查询字符串的路径部分（该路径不包含 ？ 之后的内容）
        var pathname = parseObj.pathname
        if (pathname === '/') {
            fs.readFile('./views/index.html', function(err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                res.end(htmlStr)
            })
        } else if (pathname === '/post') {
            // 其他页面都处理成 404 找不到
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })

        } else if (pathname.indexOf('/public/') === 0) {
            // 统一处理
            //      如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
            //      所以我们就直接把请求路径当作文件路径来直接进行读取
            fs.readFile('.' + pathname, function (err, data) {
                if(err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if (pathname === '/pinglun') {
            // 注意：这个时候无论/pinglun?xxx 之后是什么，都不用担心，因为 pathname 是不包含 ？ 之后的路径
            // 一个请求对应一次响应,响应结束这次请求也就结束了
            // res.end(JSON.stringify(parseObj.query))
            // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串解析成一个对象了
            // 所以接下来：
            //      1、获取表单提交的数据
            //      2、生成日期到数据对象中，然后存储到数组中
            //      3、让用户重定向跳转到首页 /
            //          当用户重新请求 / 的时候，数组中的数据已经发生变化了，所以用户看到的是添加后的数组
            var comment = parseObj.query
            comment.dateTime = '2017-6-7 13:18:22'
            comments.unshift(comment)
            // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了
            
            // 如何通过服务器让客户端重定向？
            //      1、状态码设置为 302 临时重定向
            //          statusCode
            //      2、在响应头中通过 Location 告诉客户端往哪儿重定向
            //          setHeader
            //      如果客户端发现服务器的响应的状态码是 302 就会自动去响应头中找 location， 然后对该地址发起新的请求
            //      所以你看到客户端自动跳转了
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()

        } else {
            // 其他页面都处理成 404 找不到
            fs.readFile('./views/404.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running...')
    })

// Node 不适合从来没有接触过服务端的人学习
// 如果想要真正的学习服务端,还是老牌的 Java、PHP这些平台
// Node 不是特别适合入门服务端，但不代表 Node 不强大
// Node 很厉害，具有经验的人可以玩的非常的牛
// 不适合新手的原因就在于比较偏底层、而且太灵活
// Java、PHP 好入门的原因在于：这些平台屏蔽了一些底层
// res.redirect('重定向')

// 1、/index.html
// 2、开放 public 目录中的静态资源
//      当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
// 3、/post post.html
// 4、/pinglun
//      4.1 接收表单提交数据
//      4.2 存储表单提交的数据
//      4.3 让表单重定向到 /
//          statusCode
//          setHeader