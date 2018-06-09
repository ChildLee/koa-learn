import * as fs from 'fs'
import * as path from 'path'
import * as jwt from 'jsonwebtoken'
import * as formidable from 'formidable'
import * as dateformat from 'dateformat'
import config from '../config'
import Utils from '../utils/utils'
import AdminDao from '../dao/AdminDao'

class AdminService {
    static login() {
        return jwt.sign({}, config.secret, {expiresIn: config.expiresIn})
    }

    static area() {
        return AdminDao.getAdmin([{code: 11}])
    }

    static file(req) {
        let form = new formidable.IncomingForm()
        let temp = path.join(__dirname, '../..', 'temp')
        let newPath = path.join(__dirname, '../..', 'static', 'img')
        Utils.mkdirSync(temp)
        Utils.mkdirSync(newPath)
        form.uploadDir = temp//临时目录
        form.encoding = 'utf-8'
        form.keepExtensions = true//保留后缀
        form.multiples = true//多文件上传

        form.parse(req, function (err, fields, files) {
            if (files['file']) {
                let multiples = files['file']['length']
                let fileSize = multiples || 1
                for (let i = 0; i < fileSize; i++) {
                    let rawPath = multiples ? files.file[i].path : files.file.path
                    let extname = path.extname(rawPath)
                    let newname = dateformat('yyyymmddHHMMss') + Utils.randomStr() + extname
                    fs.rename(rawPath, path.join(newPath, newname), function (e) {
                        if (err) err.error(e)
                    })
                }
            }
        })
        return true
    }
}

export default AdminService