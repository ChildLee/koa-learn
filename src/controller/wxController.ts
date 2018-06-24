import wxService from '../service/wxService'
import {success} from '../utils/result'

class WxController {
    static async getOpenId(ctx) {
        let {code} = ctx.request.body
        let loginData = await wxService.getOpenId(code)
        ctx.body = success(JSON.parse(String(loginData)))
    }

    static getPhoneNumber(ctx) {
        let {code, encryptedData, iv} = ctx.request.body
        let phoneNumber = wxService.getPhoneNumber({code, encryptedData, iv})
        ctx.body = success(phoneNumber)
    }
}

export default WxController