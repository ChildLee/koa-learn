import adminService from '../service/adminService'
import {success} from '../utils/result'

class AdminController {
    static async login(ctx) {
        ctx.body = success({token: adminService.login()})
    }

    static async area(ctx) {
        ctx.body = success(await adminService.area())
    }

    static async file(ctx) {
        ctx.body = success(await adminService.file(ctx.req))
    }
}

export default AdminController