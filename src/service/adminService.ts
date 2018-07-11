import * as jwt from 'jsonwebtoken'
import config from '../config/default'
import {Area, User} from '../model'

class AdminService {
  static async login() {
    return jwt.sign({}, config.secret, {expiresIn: config.expiresIn})
  }

  static async area() {
    return await User.findAll({include: [{model: Area}]})
  }
}

export default AdminService
