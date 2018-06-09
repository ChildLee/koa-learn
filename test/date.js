let dateformat = require('dateformat')


setInterval(function () {
    console.time(1)
    dateformat('yyyymmddHHMMss')
    console.timeEnd(1)
}, 1000)

