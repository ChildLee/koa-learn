import * as qs from 'qs'
import * as crypto from 'crypto'
import * as xml2js from 'xml2js'
import * as request from 'request'
import * as dateformat from 'dateformat'
import config from '../config'

const parser = new xml2js.Parser()
const builder = new xml2js.Builder()

//微信支付
class WxPay {
    private static unifiedOrderUrl: string = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    private static orderQueryUrl: string = 'https://api.mch.weixin.qq.com/pay/orderquery'

    //生成prepay_id
    static getPrepay(data) {
        let param = {
            //小程序ID
            appid: config.appID,
            //商户号
            mch_id: config.mch_id,
            //随机字符串
            nonce_str: randomString(),
            //商品描述
            body: data.body,
            //商户订单号
            out_trade_no: dateformat('yyyymmddHHMMss') + randomNumber(),
            //标价金额
            total_fee: data.total_fee,
            //终端IP
            spbill_create_ip: '123.12.12.123',
            //通知地址
            notify_url: 'http://127.0.0.1',
            //交易类型
            trade_type: 'JSAPI',
            //用户标识
            openid: config.openid
        }
        //参数签名
        let sign = getSign(param, config.mch_key)
        //生成xml
        const xml = builder.buildObject(Object.assign(param, {sign}))
        return new Promise((resolve, reject) => {
            //请求统一下单接口
            request.post(this.unifiedOrderUrl, {body: xml}, function (err, res, body) {
                //解析返回的xml数据成对象
                parser.parseString(body, function (err, res) {
                    if (err) reject(err)
                    resolve(res.xml)
                })
            })
        }).then(res => {
            //取出对象的值
            for (let key in res) res[key] = res[key][0]
            //判断请求是否成功
            if (res['return_code'] !== 'SUCCESS') {
                return res
            }
            //发起微信支付参数
            const options = {
                appId: res['appid'],
                timeStamp: (Date.now() / 1000).toString(),
                nonceStr: res['nonce_str'],
                package: `prepay_id=${res['prepay_id']}`,
                signType: 'MD5'
            }
            options['paySign'] = getSign(options, config.mch_key)
            return options
        })
    }
}

//生成签名
function getSign(param, mch_key) {
    const data = Object.create(null)
    for (const k of Object.keys(param).sort()) data[k] = param[k]
    const key = decodeURIComponent(qs.stringify(data) + `&key=${mch_key}`)
    return crypto.createHash('md5').update(key, 'utf8').digest('hex').toUpperCase()
}

//生成随机字符串
function randomString(len: number = 32): string {
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const strLength = str.length
    let data = ''
    for (let i = 0; i < len; i++) {
        data += str.charAt(Math.floor(Math.random() * strLength))
    }
    return data
}

//生成随机数字
function randomNumber(len: number = 18): string {
    const str = '0123456789'
    const strLength = str.length
    let data = ''
    for (let i = 0; i < len; i++) {
        data += str.charAt(Math.floor(Math.random() * strLength))
    }
    return data
}

export default WxPay