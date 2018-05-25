import * as WebSocket from 'ws'
import * as http from 'http'
import * as Koa from 'koa'
import router from './router'

const app = new Koa()
const server = http.createServer()

const wss = new WebSocket.Server({noServer: true})

app.use(router.routes()).use(router.allowedMethods())

server.listen(3000, () => {
    console.log('服务器启动成功!')
    console.log('http://127.0.0.1:3000')
})