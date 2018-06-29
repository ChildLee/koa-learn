import * as Router from 'koa-router'
import wxController from '../controller/wxController'

const router = new Router()
router.prefix('/wx')

router.post('/getOpenId', wxController.getOpenId)
router.post('/getPhoneNumber', wxController.getPhoneNumber)
router.post('/pay', wxController.pay)

export default router