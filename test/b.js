class DateUtil {

    constructor(param) {
        this.init(param)
    }

    init(param) {
        return param ? this.$d = new Date(param) : this.$d = new Date()
    }

    format(param = 'YYYY-MM-DD HH:mm:ss') {
        let arr = [{
            reg: '(Y+)',
            replace: this.$d.getFullYear()
        }, {
            reg: '(M+)',
            replace: this.$d.getMonth() + 1
        }, {
            reg: '(D+)',
            replace: this.$d.getDate()
        }, {
            reg: '(H+)',
            replace: this.$d.getHours()
        }, {
            reg: '(m+)',
            replace: this.$d.getMinutes()
        }, {
            reg: '(s+)',
            replace: this.$d.getSeconds()
        }, {
            reg: '(S+)',
            replace: this.$d.getMilliseconds()
        }]
        const len = arr.length - 1
        //处理年份
        new RegExp(arr[0].reg).test(param) ?
            param = param.replace(RegExp.$1, String(arr[0].replace).substring(4 - RegExp.$1.length)) : null
        //处理月日时分秒
        for (let i = 1; i < len; i++) {
            new RegExp(arr[i].reg).test(param) ?
                RegExp.$1.length === 2 ?
                    param = param.replace(RegExp.$1, ('00' + arr[i].replace).substring(String(arr[i].replace).length))
                    : param = param.replace(RegExp.$1, arr[i].replace)
                : null
        }
        //处理毫秒
        new RegExp(arr[len].reg).test(param) ?
            param = param.replace(RegExp.$1, ('000' + arr[len].replace).substring(String(arr[len].replace).length).substring(3 - RegExp.$1.length))
            : null
        return param
    }
}

setInterval(function () {
    console.time('1')
    console.log(new DateUtil().format())
    console.timeEnd('1')
}, 1000)