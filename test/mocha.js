const request = require('request')
const req = require('supertest')
const wxCrypt = require('./wxCrypt')
// const app = require('../dist/src/app').default

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

    it('should req', function () {
        request.get('https://cnodejs.org/api/v1/topics', function (err, res, body) {
            console.log(body)
        })
    })

    it('should crypto', function () {
        let appId = 'wx4f4bc4dec97d474b'
        let sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
        let encryptedData =
            'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
            'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
            '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
            '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
            'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
            'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
            '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
            'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
            '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
            '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
            'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
            '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
            '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
            'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
            'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
            '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
            'Db/XcxxmK01EpqOyuxINew=='
        let iv = 'r7BXXKkLb8qrSNn05n0qiA=='

        let wx = new wxCrypt(appId, sessionKey)
        let data = wx.decryptData(encryptedData, iv)
        console.log(data)
    })
}) 