import wxService from '../service/wxService'
import {error, success} from '../utils/result'

/**
 * 小程序接口
 */
class WxController {
    /**
     * 获取openid、session_key
     */
    static async getOpenId(ctx) {
        let {code} = ctx.request.body
        if (!code) {
            return ctx.body = error(1001)
        }
        let loginData = wxService.getOpenId(code)
        ctx.body = success(JSON.parse(String(loginData)))
    }

    /**
     * 获取用户手机号
     */
    static async getPhoneNumber(ctx) {
        let {code, encryptedData, iv} = ctx.request.body
        if (!code || !encryptedData || !iv) {
            return ctx.body = error(1001)
        }
        let phoneNumber = await wxService.getPhoneNumber(ctx, {code, encryptedData, iv})
        ctx.body = success(phoneNumber)
    }

    /**
     * 微信支付
     */
    static async pay(ctx) {
        let {total_fee, body} = ctx.request.body
        total_fee = parseInt(String(total_fee * 100))
        if (!total_fee || !body) {
            return ctx.body = error(1001)
        }
        let payment = await wxService.pay({total_fee, body})
        ctx.body = success(payment)
    }
}

export default WxController