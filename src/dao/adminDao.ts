import query from '../config/mysql'

class AdminDao {
  static getAdmin(param) {
    return query('select * from area_provinces where ?', param)
  }
}

export default AdminDao
