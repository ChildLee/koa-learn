const qs = require('qs')
const crypto = require('crypto')
const request = require('request')
const dateformat = require('dateformat')
const req = require('supertest')
const xml2js = require('xml2js')
const wxCrypt = require('./wxCrypt')
// const app = require('../dist/src/app').default

const parser = new xml2js.Parser()
const builder = new xml2js.Builder()

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

    it('should xml2js', function () {
        let parseString = require('xml2js').parseString
        let xml = '<root>Hello xml2js!</root>'
        parseString(xml, function (err, result) {
            console.dir(result)
        })
    })

    it('should js2xml', function () {
        console.time('1')
        let param = {
            //小程序ID
            appid: '1',
            //商户号
            mch_id: '2',
            //随机字符串
            nonce_str: '3',
            //商品描述
            body: '4',
            //商户订单号
            out_trade_no: '5',
            //标价金额
            total_fee: '6',
            //终端IP
            spbill_create_ip: '7',
            //通知地址
            notify_url: '8',
            //交易类型
            trade_type: 'JSAPI',
            //用户标识
            openid: '9'
        }
        console.log(builder.buildObject(param))
        console.timeEnd('1')
    })

    it('should ASCII', function () {
        console.time('1')
        let param = {
            //小程序ID
            appid: '1',
            //商户号
            mch_id: '2',
            //随机字符串
            nonce_str: '3',
            //商品描述
            body: '{"a": 1}',
            //商户订单号
            out_trade_no: '5',
            //标价金额
            total_fee: '6',
            //终端IP
            spbill_create_ip: '7',
            //通知地址
            notify_url: '8',
            //交易类型
            trade_type: 'JSAPI',
            //用户标识
            openid: '9'
        }
        let sign = getSign(param, 'mch_key')
        let a = builder.buildObject(Object.assign(param, {sign}))
        console.log(a)

        console.timeEnd('1')
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

    it('should dateformat', function () {
        console.log(32 - 'yyyymmddHHMMss'.length)
        console.log(dateformat('yyyymmddHHMMss'))

        console.log(randomNumber().length)
    })

    it('should payid', function () {
        let pay = {
            return_code: ['SUCCESS'],
            return_msg: ['OK'],
            appid: ['wx6e564de8b33a0a78'],
            mch_id: ['1501796621'],
            nonce_str: ['qOgvb2qGVpARyLoR'],
            sign: ['25752B3B2FAE49B88508215D1E01FC0D'],
            result_code: ['SUCCESS'],
            prepay_id: ['wx25200645892095edc8a256401981036227'],
            trade_type: ['JSAPI']
        }

        for (let key in pay) {
            pay[key] = pay[key][0]
        }


        console.log(pay)
    })


    it('should json', function () {
        console.time('1')
        console.log(!Number(parseInt(String('0' * 100))))
        console.timeEnd('1')
    })

    it('should a', function () {
        console.time('1')

        console.timeEnd('1')
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
