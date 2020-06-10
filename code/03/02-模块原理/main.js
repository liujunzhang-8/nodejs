var fooExports = require('./foo')

console.log(fooExports)

// 如果实在分不清 exports 和 module.exports
// 可以忘记 exports
// 而只使用 module.exports 也没问题

// module.exports.xxx = xxx
// module.exports = {}