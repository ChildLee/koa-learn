import * as Router from 'koa-router'
import admin from './admin'

const router = new Router({
    prefix: '/v1'
})

router.use(admin.routes(), admin.allowedMethods())

export default router