import * as Koa from 'koa'
import * as path from 'path'
import * as bug from 'debug'
import * as cors from 'koa2-cors'
import * as serve from 'koa-static'
import * as koaBody from 'koa-body'
import * as views from 'koa-views'
import * as compose from 'koa-compose'
import config from './config/default'
import utils from './utils/utils'
import view from './router/view'
import router from './router/router'
import middleware from './middleware'

const debug = bug('app')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(ctx.url)
  await next()
})

app.use(compose([middleware.ms(), middleware.error()]))

app.use(serve(path.join(__dirname, '..', 'static')))//静态文件目录
app.use(views(path.join(__dirname, '..', 'views'), {map: {html: 'ejs'}}))

app.use(koaBody({
  multipart: false,//全局默认不解析参数
  formidable: {
    uploadDir: config.uploadDir//文件上传临时目录
  }
}))

app.use(cors())//跨域

//app.use(jwt({secret: config.secret}).unless({path: [/^(?!\/api)/, /\/login$/]}))//token验证
app.use(view.routes()).use(view.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())//路由

const port = process.env.port || 80
const server = app.listen(port, () => {
  //初始化目录
  utils.mkdirSync(config.uploadDir)
  utils.mkdirSync(config.static)
  debug('服务器启动成功!', `http://127.0.0.1:${port}`)
})

export default server
