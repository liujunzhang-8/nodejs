var express = require('express')

var path = require('path')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

// 在 Node 中，有很多第三方模块引擎可以使用，不是只有 art-tempkate
// ejs、jade(pug)、handlebars、numjacks
app.get('/', function (req, res) {
    res.send('index.html', {
        name: 张三
    })
})

app.listen(5000, function () {
    console.log('running...')
})