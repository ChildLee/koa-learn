import wxService from '../service/wxService'
import {success} from '../utils/result'

class WxController {
    static async getOpenId(ctx) {
        let {code} = ctx.query
        let openId = await wxService.getOpenId(code)
        ctx.body = success(JSON.parse(String(openId)))
    }
}

export default WxController