import * as request from 'request'
import WxCrypt from '../utils/wxCrypt'
import config from '../config'
import wxPay from '../utils/wxPay'

class WxService {
    /**
     * 获取openid、session_key
     */
    static async getOpenId(code) {
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appID}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) reject(error)
                resolve(body)
            })
        })
    }

    /**
     * 获取用户手机号
     */
    static async getPhoneNumber(ctx, data) {
        let loginData = await this.getOpenId(data.code)
        let sessionKey = JSON.parse(String(loginData)).session_key
        if (!sessionKey) {
            ctx.throw('session_key is null')
        }

        //解码
        let wxCrypt = new WxCrypt(config.appID, sessionKey)
        return wxCrypt.decryptData(data.encryptedData, data.iv)
    }

    /**
     * 微信支付
     */
    static async pay(data) {
        return await wxPay.getPrepay(data)
    }
}

export default WxService