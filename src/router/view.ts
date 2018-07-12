import * as Router from 'koa-router'
import viewController from '../controller/viewController'

const router = new Router()

router.get('/', viewController.index)

export default router
