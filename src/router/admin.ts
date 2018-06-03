import * as Router from 'koa-router'
import Admin from '../controller/admin'

const router = new Router({
    prefix: '/user'
})

router.get('/test', Admin.test)
router.post('/file', Admin.file)

export default router