import adminService from '../service/adminService'

class AdminController {
    static async login(ctx) {
        let token = adminService.login()
        ctx.body = {token}
    }

    static async area(ctx) {
        ctx.body = await adminService.area()
    }

    static async file(ctx, next) {
        ctx.body = await adminService.file(ctx)
    }
}

export default AdminController