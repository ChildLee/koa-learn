import * as crypto from 'crypto'

class WxCrypt {
    private appId: string
    private sessionKey: string

    constructor(appId, sessionKey) {
        this.appId = appId
        this.sessionKey = sessionKey
    }

    decryptData(encryptedData: any, iv: any) {
        let sessionKey = Buffer.from(this.sessionKey, 'base64')
        encryptedData = Buffer.from(encryptedData, 'base64')
        iv = Buffer.from(iv, 'base64')

        //创建aes-128-cbc解码对象
        let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)

        //encryptedData是Buffer则忽略inputEncoding参数
        let decoded = decipher.update(encryptedData, 'base64', 'utf8')

        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

        if (decoded['watermark']['appid'] !== this.appId) {
            throw new Error('Decrypt Data Error')
        }

        return decoded
    }
}

export default WxCrypt