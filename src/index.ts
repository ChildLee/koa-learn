import * as Koa from 'koa'
import router from './router'

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('服务器启动成功!')
    console.log('http://127.0.0.1:3000')
})