//restful匹配
it('restful', function () {
  let url = '/a/:b/:c'
  url = url.replace(/:\w+/g, '\\w+')
  const reg = RegExp(url)
  console.log(url)
  console.log(reg.test('/a/bbb/ccc'))
})
