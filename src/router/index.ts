import * as Router from 'koa-router'
import admin from './admin'
import user from './user'

const router = new Router()

router.use('', admin.routes(), admin.allowedMethods())
router.use('/user', user.routes(), admin.allowedMethods())

export default router