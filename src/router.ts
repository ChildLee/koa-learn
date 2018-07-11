import * as Router from 'koa-router'
import adminController from './controller/adminController'
import wxController from './controller/wxController'

const router = new Router()
router.prefix('/api/v1/')

router.post('/wx/getOpenId', wxController.getOpenId)
router.post('/wx/phoneNumber', wxController.getPhoneNumber)
router.post('/wx/pay', wxController.pay)
router.post('/wx/orderQuery', wxController.orderQuery)

router.post('/admin/login', adminController.login)
router.post('/admin/add', adminController.add)
router.post('/admin/del', adminController.del)
router.post('/admin/update', adminController.update)
router.post('/admin/area', adminController.area)
router.post('/admin/file', adminController.file)

export default router
