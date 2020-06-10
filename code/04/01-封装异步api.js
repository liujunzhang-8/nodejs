function fn () {
    setTimeout(function () {
        var data = 'hello'
        return data
    }, 1000)
}

// 调用fn， 得到内部的data
fn()