import * as path from 'path'
import * as Koa from 'koa'
import * as jwt from 'koa-jwt'
import * as cors from 'koa2-cors'
import * as serve from 'koa-static'
import * as bodyParser from 'koa-bodyparser'
import config from './config'
import router from './router'

const app = new Koa()

app.use(jwt({secret: config.secret}).unless({path: ['/login']}))//token验证
app.use(cors())//跨域
app.use(bodyParser())//解析参数
app.use(serve(path.join(__dirname, '..', 'static')))//静态文件目录
app.use(router.routes()).use(router.allowedMethods())//路由

app.listen(3000, () => {
    console.log('服务器启动成功!')
    console.log('http://127.0.0.1:3000')
})