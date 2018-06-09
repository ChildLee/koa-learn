import * as fs from 'fs'
import * as path from 'path'

class Utils {
    /**
     * 获取一定长度的随机字符串
     * @param {number} len 随机字符串长度
     * @returns {string}  随机字符串
     */
    static randomStr(len: number = 10): string {
        const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
        const strLength = str.length
        let data = ''
        for (let i = 0; i < len; i++) {
            data += str.charAt(Math.floor(Math.random() * strLength))
        }
        return data
    }

    /**
     * 递归创建目录
     * @param dirname
     * @returns {boolean}
     */
    static mkdirSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true
        } else {
            if (this.mkdirSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname)
                return true
            }
        }
    }
}

export default Utils