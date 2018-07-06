import * as dateformat from 'dateformat'
import * as sharp from 'sharp'
import * as path from 'path'
import * as fs from 'fs'
import adminService from '../service/adminService'
import result from '../utils/result'
import Utils from '../utils/utils'
import config from '../config'

class AdminController {
    static async login(ctx) {
        ctx.body = result.success({token: adminService.login()})
    }

    static async area(ctx) {
        ctx.body = result.success(await adminService.area())
    }

    static async file(ctx) {
        const files = ctx.request.files || {}
        for (let key in files) {
            const file = files[key]
            if (Array.isArray(file)) {
                for (let i = 0; i < file.length; i++) {
                    writeFile(file[i])
                }
            } else {
                writeFile(file)
            }
        }
    }
}

//文件处理
function writeFile(file) {
    //打开缓存会导致删除文件报错
    sharp.cache(false)
    let image = sharp(file.path)
    const newPath = path.join(config.static, dateformat('yyyymmddHHMMss') + Utils.randomStr() + '.jpg')
    image.metadata().then(res => {
        //小于该值不打水印
        if (res.width > 400 && res.height > 100) {
            return image.overlayWith(config.watermark, {left: 10000, top: 10000})
        } else {
            return image
        }
    }).then(res => {
        return res.toFile(newPath)
    }).then(res => {
        if (res) delFile(file.path)
    })
}

//删除文件
function delFile(path) {
    fs.unlink(path, err => {
        if (err) console.log(err)
    })
}

export default AdminController