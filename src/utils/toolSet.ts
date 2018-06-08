/**
 * 获取值的原始类型字符串[object Object]
 * @type {() => string}
 * @private
 */
const _toString = Object.prototype.toString

export function isTrue(obj: any): boolean {
    return obj === true
}

export function isFalse(obj: any): boolean {
    return obj === false
}

export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object'
}

export function toRawType(obj: any): string {
    return _toString.call(obj).slice(8, -1)
}

export function promisify(fn: Function): any {
    return function () {
        let args = Array.prototype.slice.call(arguments)
        return new Promise((resolve, reject) => {
            args.push(function (err, result) {
                err ? reject(err) : resolve(result)
            })
            fn.apply(null, args)
        })
    }
}