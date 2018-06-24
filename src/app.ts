import * as bug from 'debug'
import * as path from 'path'
import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as cors from 'koa2-cors'
import * as serve from 'koa-static'
import * as bodyParser from 'koa-bodyparser'
import config from './config'
import router from './router'
import Middleware from './config/middleware'

const debug = bug('app')

const app = new Koa()

app.use(Middleware.error())
app.use(Middleware.ms())
app.use(cors())//跨域
app.use(serve(path.join(__dirname, '..', 'static')))//静态文件目录

app.use(jwt({secret: config.secret}).unless({path: [/^\/login/, /^\/wx(\/?\w*)*/]}))//token验证

app.use(bodyParser())//解析参数
app.use(router.routes()).use(router.allowedMethods())//路由


app.listen(3000, () => {
    debug('服务器启动成功!', 'http://127.0.0.1:3000')
})

export default app