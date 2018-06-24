import * as Router from 'koa-router'
import wxController from '../controller/wxController'

const router = new Router()
router.prefix('/wx')

router.get('/getOpenId', wxController.getOpenId)

export default router