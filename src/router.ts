import * as Router from 'koa-router'
import adminController from './controller/adminController'
import wxController from './controller/wxController'

const router = new Router()
router.prefix('/api/v1')

router.post('/getOpenId', wxController.getOpenId)
router.post('/phoneNumber', wxController.getPhoneNumber)
router.post('/pay', wxController.pay)
router.post('/orderQuery', wxController.orderQuery)

router.post('/login', adminController.login)
router.post('/area', adminController.area)
router.post('/file', adminController.file)

export default router
