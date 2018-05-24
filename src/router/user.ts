import * as Router from 'koa-router'

const router = new Router()

router.get('/b', async (ctx, next) => {
    ctx.body = {b: 2}
})

export default router