const req = require('supertest')
const app = require('../dist/src/app').default

describe('moduleName', function () {
    it('info', async () => {
        let token = ''

        await req(app.listen()).post('/login')
            .expect(200)
            .then(res => {
                token = 'Bearer ' + res.body.data.token
            })

        await req(app.listen()).get('/area')
            .set('authorization', token)
            .expect(200)
            .then(res => {
                console.log(res.body)
            })
    })
}) 