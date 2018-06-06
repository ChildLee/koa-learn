const util = require('util')
const path = require('path')
const fs = require('fs')


function promisify(fn) {
    return function () {
        let args = Array.prototype.slice.call(arguments)
        return new Promise((resolve, reject) => {
            args.push(function (err, result) {
                err ? reject(err) : resolve(result)
            })
            fn.apply(null, args)
        })
    }
}

let fsPath = path.join(__dirname, '..', 'static', 't.json')

let stat = promisify(fs.stat)

stat(fsPath).then((res) => {
    console.log(res)
})