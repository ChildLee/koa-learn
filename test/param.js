const joi = require('joi')

describe('joi', function () {

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
})