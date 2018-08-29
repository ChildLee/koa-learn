import * as Router from 'koa-router'
import viewController from '../controller/viewController'

const router = new Router()

router.get('/', viewController.index)
router.get('/rest/:id', viewController.rest)

export default router
