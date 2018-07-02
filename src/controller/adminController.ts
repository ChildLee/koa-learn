import adminService from '../service/adminService'
import result from '../utils/result'

class AdminController {
    static async login(ctx) {
        ctx.body = result.success({token: adminService.login()})
    }

    static async area(ctx) {
        ctx.body = result.success(await adminService.area())
    }

    static async file(ctx) {
        ctx.body = result.success(await adminService.file(ctx.req))
    }
}

export default AdminController