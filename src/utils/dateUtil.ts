class DateUtil {
    static format() {
        let data = new Date()
        let o = {
            'YYYY': data.getFullYear(),        //年
            'MM': data.getMonth() + 1,         //月
            'DD': data.getDate(),              //日
            'HH': data.getHours(),             //时
            'mm': data.getMinutes(),           //分
            'ss': data.getSeconds(),           //秒
            'SSS': data.getMilliseconds()      //毫秒
        }
        console.log(o)
    }
}


setInterval(function () {
    console.log(DateUtil.format())
}, 1000)
