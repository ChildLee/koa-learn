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

  static async add() {
    return await User.create({name: '666'})
  }

  static async del(id) {
    return await User.destroy({where: {id}})
  }

  static async update() {
    return await User.update({name: 1}, {where: {id: 71}})
  }
}

export default AdminService
