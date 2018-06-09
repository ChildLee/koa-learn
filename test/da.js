const path = require('path')
const fs = require('fs')

//删除文件
fs.unlink(path.join(__dirname, '..', 'static/img'), function (err, res) {
    console.log(err)
    console.log(res)
})