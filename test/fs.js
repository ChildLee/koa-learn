const fs = require('fs')
const path = require('path')


//递归创建目录 同步方法
function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}


let p = path.join(__dirname, 'static', 'static', 'static')
fs.existsSync(p) ? `` : mkdirSync(p)
