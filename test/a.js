let dayjs = require('dayjs')

// console.log(new Date().toLocaleTimeString())

// let myDate = new Date()//获取系统当前时间
//
// console.log(myDate.getFullYear()) //获取完整的年份(4位,1970-????)
// console.log(myDate.getMonth() + 1) //获取当前月份(0-11,0代表1月)
// console.log(myDate.getDate()) //获取当前日(1-31)
// console.log(myDate.getHours()) //获取当前小时数(0-23)
// console.log(myDate.getMinutes()) //获取当前分钟数(0-59)
// console.log(myDate.getSeconds()) //获取当前秒数(0-59)
//
//
// console.log(myDate.toLocaleString('zh-cn').replace(/(-|\s|:)/g, '')) //获取日期与时间


console.time('1')
for (let i = 0; i <99999; i++) {
    let myDate = new Date()
    let str = myDate.getFullYear() + '' + (myDate.getMonth() + 1) + ''
        + myDate.getDate() + '' + myDate.getHours() + ''
        + myDate.getMinutes() + '' + myDate.getSeconds()
}
console.timeEnd('1')


console.time('2')
for (let i = 0; i < 99999; i++) {
    let str2 = dayjs().format('YYYY-MM-DD HH:mm:ss')
}
console.timeEnd('2')


let format = function (fmt) {
    let date=new Date()
    let o = {
        'M+': date.getMonth() + 1,               //月
        'd+': date.getDate(),                    //日
        '(H|h)+': date.getHours(),                   //时
        'm+': date.getMinutes(),                 //分
        's+': date.getSeconds(),                 //秒
        'SSS': date.getMilliseconds()              //毫秒
    }
    if (/(y+|Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr((''+o[k]).length))
        }
    }
    return fmt
}

console.time('3')
for (let i = 0; i < 99999; i++) {
    let str2=format('yyyyMMddhhmmss')
}
console.timeEnd('3')