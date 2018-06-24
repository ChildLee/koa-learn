import * as Router from 'koa-router'
import adminRouter from './adminRouter'
import wxRouter from './wxRouter'

const router = new Router()

router.use(adminRouter.routes())
router.use(wxRouter.routes())

export default router