import * as joi from 'joi'
import wxService from '../service/wxService'
import result from '../utils/result'

/**
 * 小程序接口
 */
class WxController {
  /**
   * 获取openid、session_key
   */
  static async getOpenId(ctx) {
    let {code} = ctx.request.body
    const {error} = joi.validate(code, joi.string().required())
    if (error) return ctx.body = result.error(1001)

    let loginData = wxService.getOpenId(code)
    ctx.body = result.success(JSON.parse(String(loginData)))
  }

  /**
   * 获取用户手机号
   */
  static async getPhoneNumber(ctx) {
    const schema = joi.object().keys({
      code: joi.string().required(),
      encryptedData: joi.string().required(),
      iv: joi.string().required()
    })
    //验证参数
    const {error} = joi.validate(ctx.request.body, schema, {allowUnknown: true})
    if (error) return ctx.body = result.error(1001)

    let {code, encryptedData, iv} = ctx.request.body
    let phoneNumber = await wxService.getPhoneNumber(ctx, {code, encryptedData, iv})
    ctx.body = result.success(phoneNumber)
  }

  /**
   * 微信支付
   */
  static async pay(ctx) {
    const schema = joi.object().keys({
      total_fee: joi.number().min(0.01).required(),
      body: joi.string().required()
    })
    //验证参数
    const {error} = joi.validate(ctx.request.body, schema, {allowUnknown: true})
    if (error) return ctx.body = result.error(1001)

    let {total_fee, body} = ctx.request.body
    let payment = await wxService.pay({total_fee, body})
    ctx.body = result.success(payment)
  }

  /**
   * 查询订单
   */
  static async orderQuery(ctx) {
    const schema = joi.object().keys({
      transaction_id: joi.string().allow(''),
      out_trade_no: joi.string().allow('')
    }).or('transaction_id', 'out_trade_no')
    //验证参数
    const {error} = joi.validate(ctx.request.body, schema, {allowUnknown: true})
    if (error) return ctx.body = result.error(1001)

    let {transaction_id, out_trade_no} = ctx.request.body
    let payment = await wxService.orderQuery({transaction_id, out_trade_no})
    ctx.body = result.success(payment)
  }
}

export default WxController
