import * as request from 'request'

class WxService {
    static getOpenId(code) {
        let appID = 'wxac71cf64ebc2da5c'
        let appSecret = 'e2b9eca2cb5fc2f7322b8bc567501c48'
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) reject(error)
                resolve(body)
            })
        })
    }
}

export default WxService