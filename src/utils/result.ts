class Result {
    /**
     * 请求成功
     * @param {object | boolean} data 返回参数
     * @returns {{code: number; msg: string; data: object | boolean}}
     */
    static success(data: object | boolean) {
        return {
            code: 0,
            msg: 'success',
            data: data
        }
    }

    /**
     * 请求错误
     * @param {number} status 状态码
     * @param {string} message 状态信息
     * @returns {{code: number; msg: string; data: null}}
     */
    static error(status: number, message?: string) {
        function err(code: number, msg: string) {
            return {
                code: code,
                msg: msg,
                data: null
            }
        }

        if (status && message) return err(status, message)
        if (status && !message) {
            switch (status) {
                //参数相关
                case 1001:
                    return err(1001, '参数错误')
                //授权相关
                case 2001:
                    return err(2001, '无访问权限')
                case 2002:
                    return err(2002, 'token已过期')
                //用户相关
                case 3001:
                    return err(3001, '未登录')
                case 3002:
                    return err(3002, '用户信息错误')
                case 3003:
                    return err(3003, '用户不存在')
                default:
                    return err(-1, '服务器内部错误')
            }
        }
    }
}

export const success = Result.success
export const error = Result.error