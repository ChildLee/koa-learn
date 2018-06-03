class DateUtil {
    static format(fmt) {
        let date = new Date()
        let reg = ['(Y+)', '(M+)', '(D+)', '(H+)', '(m+)', '(s+)', '(S+)']
        let replace = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ]

        for (let i = 0; i < reg.length; i++) {
            new RegExp(reg[i]).test(fmt) ?
                fmt = fmt.replace(RegExp.$1, replace[i]) : ``
        }
        new RegExp('(S+)').test(fmt) ? fmt = fmt.replace(RegExp.$1, replace[i]) : ``

        return fmt
    }
}


// let r = ['(Y+)']
//
// console.log(new RegExp(r[0]).test('YYYYY'))
// console.log(RegExp.$1)
// console.log(RegExp.$1.length)


console.log(DateUtil.format('YYYY-MM-DD HH:mm:ss SSS'))


// console.time('3')
// for (let i = 0; i < 99999; i++) {
//     let str2 = DateUtil.format('YYYY-MM-DD HH:mm:ss SSS')
// }
// console.timeEnd('3')
//
