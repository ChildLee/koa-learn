const qs = require('qs')
const crypto = require('crypto')
const request = require('request')
const dateformat = require('dateformat')
const req = require('supertest')
const xml2js = require('xml2js')
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

    it('should request post', function () {
        request.post('http://127.0.0.1:3000/login', {
            form: {
                'user': 'username',
                'pass': 'password'
            }
        }, function (error, response, body) {
            console.log(body)
        })
    })

    it('should xml2js builder', function () {
        console.time('xml2js builder')
        const builder = new xml2js.Builder({
            //根节点名称
            rootName: 'xml',
            //省略XML标题
            headless: true
        })

        let pay = {
            return_code: 'SUCCESS',
            return_msg: 'OK',
            appid: 'wx6e564de8b33a0a78',
            mch_id: '1501796621',
            nonce_str: 'qOgvb2qGVpARyLoR',
            sign: '25752B3B2FAE49B88508215D1E01FC0D',
            result_code: 'SUCCESS',
            prepay_id: 'wx25200645892095edc8a256401981036227',
            trade_type: 'JSAPI'
        }
        const data = Object.create(null)
        //用于获取对象自身所有的可枚举的属性值，但不包括原型中的属性，然后返回一个由属性名组成的数组
        //console.log(Object.keys(pay))//[ 'return_code','return_msg','appid','mch_id','nonce_str','sign','result_code','prepay_id','trade_type' ]
        //console.log(Object.keys(pay).sort())//排序
        for (const k of Object.keys(pay).sort()) {
            data[k] = pay[k]
        }
        console.log(data)
        console.log(builder.buildObject(data))
        console.timeEnd('xml2js builder')
    })

    it('should xml2js parser', function () {
        console.time('xml2js parser')
        const parser = new xml2js.Parser({
            //不获取根节点
            explicitRoot: false,
            //true始终将子节点放入数组中; false则只有存在多个数组时才创建数组。
            explicitArray: false
        })
        let xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
                    <xml>
                      <return_code>SUCCESS</return_code>
                      <return_msg>OK</return_msg>
                      <appid>wx6e564de8b33a0a78</appid>
                      <mch_id>1501796621</mch_id>
                      <nonce_str>qOgvb2qGVpARyLoR</nonce_str>
                      <sign>25752B3B2FAE49B88508215D1E01FC0D</sign>
                      <result_code>SUCCESS</result_code>
                      <prepay_id>wx25200645892095edc8a256401981036227</prepay_id>
                      <trade_type>JSAPI</trade_type>
                    </xml>`
        parser.parseString(xml, (err, data) => {
            console.log(data)
            console.timeEnd('xml2js parser')
        })
    })

})

//生成签名
function getSign(param, mch_key) {
    const data = Object.create(null)
    for (const k of Object.keys(param).sort()) data[k] = param[k]
    const key = decodeURIComponent(qs.stringify(data) + `&key=${mch_key}`)
    return crypto.createHash('md5').update(key).digest('hex').toUpperCase()
}

function randomNumber(len = 18) {
    const str = '0123456789'
    const strLength = str.length
    let data = ''
    for (let i = 0; i < len; i++) {
        data += str.charAt(Math.floor(Math.random() * strLength))
    }
    return data
}
