import * as Router from 'koa-router'
import * as formidable from 'formidable'
import * as fs from 'fs'
import * as path from 'path'
import * as dayjs from 'dayjs'

const router = new Router()

router.get('/a', async (ctx, next) => {

})
router.post('/c', async (ctx, next) => {
    let form = new formidable.IncomingForm()
    let p = path.join(__dirname, 'static')
    fs.existsSync(p) ? `` : fs.mkdirSync(p)
    form.uploadDir = p
    form.keepExtensions = true
    form.encoding = 'utf-8'
    form.multiples = true

    form.parse(ctx.req, function (err, fields, files) {
        if (files.file) {
            let multiples = files.file.size
            let fileSize = multiples || 1
            for (let i = 0; i < fileSize; i++) {
                let time = dayjs(Date.now()).format('YYYYMMDDHHmmss')
                let rawPath = multiples ? files.file[i].path : files.file.path
                let extname = path.extname(rawPath)
                let newname = time + randomStr() + extname
                fs.renameSync(rawPath, path.join(__dirname, 'static', newname))
            }
        }
    })
})

function randomStr(len = 10) {
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let data = ''
    for (let i = 0; i < len; i++) {
        data += str.charAt(Math.floor(Math.random() * str.length))
    }
    return data
}


export default router