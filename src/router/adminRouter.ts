import * as Router from 'koa-router'
import adminController from '../controller/adminController'

const router = new Router()

router.post('/test', adminController.test)
router.post('/file', adminController.file)

export default router