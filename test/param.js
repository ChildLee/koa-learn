const dateformat = require('dateformat')
const sharp = require('sharp')
const path = require('path')
const captcha = require('svg-captcha')

const joi = require('joi')
const os = require('os')


it('should joi', function () {
    console.time('time')

    const schema = joi.object().keys({
        a: joi.number().min(0.01).required(),
        b: joi.string().required()
    }).or('a', 'b')
    //验证参数
    const {error} = joi.validate({a: '0.01', b: '1'}, schema, {allowUnknown: true})
    console.log(error)

    console.timeEnd('time')
})

it('should a', function () {
    console.log(os.tmpdir())
})

it('should b', function () {
    console.time('b')
    let param = {a: 1}
    for (let key in param) {
        console.log(key)
    }
    console.timeEnd('b')
})

describe('isArr', function () {
    it('should isArr', function () {
        console.time('isArr')
        console.log(Object.prototype.toString.call([]) === '[object Array]')
        console.timeEnd('isArr')
    })

    it('should isArr', function () {
        console.time('isArr1')
        console.log(Array.isArray([]))
        console.timeEnd('isArr1')
    })
})

it('should length', function () {
    console.time('length')
    console.log([].length)
    console.timeEnd('length')
})

it('should date', function () {
    console.log(dateformat('yyyymmddHHMMss'))
})

it('should svg-captcha', function () {
    console.time('1')
    let code = captcha.create()
    console.log(code)
    sharp(Buffer.from(code.data))
        .toFile(__dirname+'/a.png')
    console.timeEnd('1')
})