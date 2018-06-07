import * as path from 'path'
import * as Koa from 'koa'
import * as serve from 'koa-static'
import router from './router'

const app = new Koa()

app.use(serve(path.join(__dirname, '..', 'static')))
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('服务器启动成功!')
    console.log('http://127.0.0.1:3000')
})