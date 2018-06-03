class RandomUtil {
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
}

export default RandomUtil