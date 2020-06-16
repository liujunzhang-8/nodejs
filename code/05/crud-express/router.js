/* 
    router.js 路由模块
    职责：
        处理路由
        根据不同的请求方法 + 请求路径设置具体的请求处理函数
    模块职责要单一，不要乱写
    我们划分模块的目的就是为了增强项目代码的可维护性
    提升开发效率

*/

var fs = require('fs')
var Student = require('./student.js')

// Express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')

// 1、创建一个路由容器
var router = express.Router()

// 2、把路由都挂载到 router 路由容器中

router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
    // 1、获取表单数据
    // 2、处理
    //      将数据保存到 db.json 文件中用以持久化
    // 3、发送响应
    // 先读取出来，转成对象
    // 然后往对象中 push 数据
    // 然后把对象转为字符串
    // 然后把字符串再次写入文件
    // console.log(req.body)
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

/* 
    渲染编辑学生页面
*/
router.get('/students/edit', function (req, res) {
    /* 
        1、在客户端的列表页中处理链接问题（需要有 id 参数）
        2、获取要编辑的学生id
        3、渲染编辑页面
            根据 id 把学生信息查出来
            使用模板引擎渲染页面
    */
    // console.log(req.query.id)
    /* 
    replace
        字符串模式
            简单，但是不支持全局和忽略大小写问题
        正则表达式
            强大，支持全局和忽略大小写
    */
    Student.findById(req.query.id.replace(/"/g, ''), function (err, student) {
        if (err) {
            // console.log(err)
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

/* 
    处理编辑学生
*/
router.post('/students/edit', function (req, res) {
    /* 
        1、获取表单数据
            req.body
        2、更新
            student。update()
        3、发送响应
    */
    var id = req.body.id.replace(/"/g, '')
    Student.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})
/* 
    处理删除学生
*/
router.get('/students/delete', function (req, res) {
    /* 
        1、获取要删除的 id
        2、根据 id 执行删除操作
        3、根据操作结果发送响应数据
    */
    var id = req.query.id.replace(/"/g, '') 
    Student.findByIdAndRemove(id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

// 3、把 router 导出
module.exports = router