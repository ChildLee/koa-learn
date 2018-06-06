import * as path from 'path'
import * as Koa from 'koa'
import * as serve from 'koa-static'
import * as log4js from 'log4js'
import router from './router'


log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            filename: '',
        }
    },
    categories: {
        default: {appenders: ['out'], level: 'info'}
    }
})

let logger = log4js.getLogger()
logger.level = 'debug'
logger.debug('Some debug messages')

const app = new Koa()

app.use(serve(path.join(__dirname, '..', 'static')))
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('服务器启动成功!')
    console.log('http://127.0.0.1:3000')
})