class ViewController {
  static async index(ctx) {
    ctx.state = {
      title: 'koa2'
    }
    await ctx.render('index')
  }

  static async rest(ctx) {
    console.log(ctx.params.id)
    ctx.body = ctx.query.id
  }
}

export default ViewController
