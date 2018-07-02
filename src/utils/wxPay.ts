import * as qs from 'qs'
import * as crypto from 'crypto'
import * as xml2js from 'xml2js'
import * as request from 'request'
import * as dateformat from 'dateformat'
import config from '../config'

const parser = new xml2js.Parser({
    //不获取根节点
    explicitRoot: false,
    //true始终将子节点放入数组中; false则只有存在多个数组时才创建数组。
    explicitArray: false
})
const builder = new xml2js.Builder({
    //根节点名称
    rootName: 'xml',
    //省略XML标题
    headless: true
})

//微信支付
class WxPay {
    private static unifiedOrderUrl: string = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    private static orderQueryUrl: string = 'https://api.mch.weixin.qq.com/pay/orderquery'

    //小程序支付
    static appletsPayment(data): Promise<any> {
        //交易类型
        data['trade_type'] = 'JSAPI'
        //用户标识
        data['openid'] = config.openid
        return this.getPrepay(data).then(res => {
            //判断请求是否成功
            if (res['return_code'] !== 'SUCCESS') {
                return res
            }
            //发起微信小程序支付参数
            const args = {
                appId: res['appid'],
                timeStamp: Date.now().toString(),
                nonceStr: res['nonce_str'],
                package: `prepay_id=${res['prepay_id']}`,
                signType: 'MD5'
            }
            args['paySign'] = getSign(args, config.mch_key)
            return args
        })
    }

    //生成Prepay
    static getPrepay(data): Promise<any> {
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
            trade_type: data.trade_type,
            //用户标识
            openid: data.openid
        }
        //参数签名
        param['sign'] = getSign(param, config.mch_key)
        //生成xml
        const xml = builder.buildObject(param)
        return new Promise((resolve, reject) => {
            //请求统一下单接口
            request.post({url: this.unifiedOrderUrl, body: xml}, (error, response, body) => {
                parser.parseString(body, (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
        })
    }
}

//生成签名
function getSign(data, mch_key): string {
    const param = {}
    for (const k of Object.keys(data).sort()) if (data[k]) param[k] = data[k]
    const key = decodeURIComponent(qs.stringify(param) + `&key=${mch_key}`)
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