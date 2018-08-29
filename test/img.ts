const Jimp = require('jimp')

it('should jimp', function () {

  Jimp.read('b.jpg').then(image => {
    image.composite( Jimp.read('sy.png'), 100, 0, Jimp.BLEND_MULTIPLY, 0.5, 0.9);
  })
})
