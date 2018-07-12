class ViewController {
  static async index(ctx) {
    ctx.state = {
      title: 'koa2'
    }
    await ctx.render('index')
  }
}

export default ViewController
