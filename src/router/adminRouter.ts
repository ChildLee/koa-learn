import * as Router from 'koa-router'
import adminController from '../controller/adminController'

const router = new Router()

router.post('/login', adminController.login)
router.get('/area', adminController.area)
router.post('/file', adminController.file)

export default router