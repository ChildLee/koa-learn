import * as jwt from 'jsonwebtoken'
import config from '../config'
import AdminDao from '../dao/AdminDao'

class AdminService {
    static login() {
        return jwt.sign({}, config.secret, {expiresIn: config.expiresIn})
    }

    static area() {
        return AdminDao.getAdmin([{code: 11}])
    }
}

export default AdminService