import * as fs from 'fs'
import DateUtil from '../utils/DateUtil'
import * as formidable from 'formidable'
import * as path from 'path'
import RandomUtil from '../utils/RandomUtil'

class Admin {
    static async test(ctx, next) {
        ctx.body = {a: 1}
    }

    static async file(ctx, next) {
        let form = new formidable.IncomingForm()
        let p = path.join(__dirname, 'static')
        fs.existsSync(p) ? `` : fs.mkdirSync(p)
        form.uploadDir = p
        form.keepExtensions = true
        form.encoding = 'utf-8'
        form.multiples = true

        form.parse(ctx.req, function (err, fields, files) {
            console.log(fields)
            if (files.file) {
                let multiples = files.file.size
                let fileSize = multiples || 1
                for (let i = 0; i < fileSize; i++) {
                    let rawPath = multiples ? files.file[i].path : files.file.path
                    let extname = path.extname(rawPath)
                    let newname = new DateUtil().format('YYYYMMDDHHmmss') + RandomUtil.randomStr() + extname
                    fs.renameSync(rawPath, path.join(__dirname, 'static', newname))
                }
            }
        })
    }
}

export default Admin