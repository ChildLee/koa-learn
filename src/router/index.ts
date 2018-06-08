import * as Router from 'koa-router'
import adminRouter from './adminRouter'

const router = new Router()

router.use(adminRouter.routes())

export default router