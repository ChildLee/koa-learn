import * as bug from 'debug'
import * as path from 'path'
import * as Koa from 'koa'
import * as cors from 'koa2-cors'
import * as serve from 'koa-static'
import * as koaBody from 'koa-body'
import * as compose from 'koa-compose'
import config from './config/default'
import utils from './utils/utils'
import router from './router'
import middleware from './middleware'

const debug = bug('app')

const app = new Koa()

app.use(compose([middleware.error(), middleware.ms()]))
app.use(cors())//跨域
app.use(serve(path.join(__dirname, '..', 'static')))//静态文件目录

//app.use(jwt({secret: config.secret}).unless({path: [/^\/login/, /^\/wx/]}))//token验证


app.use(koaBody({
  multipart: true,//解析参数
  formidable: {
    uploadDir: config.uploadDir//文件上传临时目录
  }
}))

app.use(router.routes()).use(router.allowedMethods())//路由

console.log(process.env.port)
const port = process.env.port || 80
const server = app.listen(port, () => {
  //初始化目录
  utils.mkdirSync(config.uploadDir)
  utils.mkdirSync(config.static)
  debug('服务器启动成功!', `http://127.0.0.1:${port}`)
})

export default server
