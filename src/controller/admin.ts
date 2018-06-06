import * as fs from 'fs'
import * as path from 'path'
import * as formidable from 'formidable'
import DateUtil from '../utils/DateUtil'
import RandomUtil from '../utils/RandomUtil'
import AdminDao from '../dao/AdminDao'

class Controller {

}

class Admin extends Controller {
    static async test(ctx, next) {
        await AdminDao.getAdmin([11]).then(res => {
            ctx.body = res
        })
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
            if (files.file) {
                let multiples = files['file']['length']
                let fileSize = multiples || 1
                for (let i = 0; i < fileSize; i++) {
                    let rawPath = multiples ? files.file[i].path : files.file.path
                    let extname = path.extname(rawPath)
                    let newname = new DateUtil().format('YYYYMMDDHHmmss') + RandomUtil.randomStr() + extname
                    console.log(fs.renameSync(rawPath, path.join(__dirname, 'static', newname)))
                }
            }
        })
    }
}

export default Admin