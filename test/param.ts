import * as captcha from 'svg-captcha'
import * as sharp from 'sharp'
import * as joi from 'joi'

it('should joi', function () {
  console.time('time')

  const schema = joi.object().keys({
    a: joi.number().min(0.01).required(),
    b: joi.string().required()
  }).or('a', 'b')

  const {error} = joi.validate({a: '0.01', b: '1'}, schema, {allowUnknown: true})
  console.log(error)

  console.timeEnd('time')
})

it('should svg-captcha', function () {
  console.time('1')
  let code = captcha.create()
  console.log(code)
  sharp(Buffer.from(code.data))
    .toFile(__dirname + '/a.png')
    .then(res => {

    })
  console.timeEnd('1')
})
