import AdminDao from '../dao/AdminDao'

class AdminService {
    static async test() {
        return await AdminDao.getAdmin([{code: 11}])
    }
}

export default AdminService