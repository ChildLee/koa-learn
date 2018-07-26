import * as Sequelize from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'sa',
  database: 'rbac',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  timezone: '+08:00',
  operatorsAliases: false,
  define: {
    //下划线命名
    underscored: true
  }
})
const {INTEGER, BIGINT, STRING, BOOLEAN, DATE} = Sequelize

const User = sequelize.define('user', {
  id: {
    type: BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '姓名'
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否是超级管理员'
  },
  status: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '封禁状态 1.有效 0:无效'
  }
}, {
  comment: '用户表'
})

const Role = sequelize.define('role', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: true,
    defaultValue: '',
    comment: '角色名'
  }
}, {
  comment: '角色表'
})

const Permission = sequelize.define('permission', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '权限名'
  },
  type: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '资源类型：menu,button'
  },
  url: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '访问url地址'
  },
  pid: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '父结点id'
  },
  level: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '节点层级'
  }
}, {
  comment: '权限表'
})

//用户-角色表
const UserRole = sequelize.define('user_role', {})
User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

//角色-权限表
const RoleAccess = sequelize.define('role_permission', {})
Role.belongsToMany(Permission, {through: RoleAccess})
Permission.belongsToMany(Role, {through: RoleAccess})

it('init', async () => {
  await sequelize.sync({force: true})
  await User.bulkCreate([{name: '超级管理员1'}])
  await Role.bulkCreate([{name: '超级角色1'}])
  await Permission.bulkCreate([{name: '超级权限'}])
})

it('ManyToMany', async () => {
  await UserRole.create({user_id: 2, role_id: 2})
  const userRoles = await UserRole.findAll()
  console.log(JSON.parse(JSON.stringify(userRoles)))
})

it('findAll', function () {
  Permission.findAll().then(res => {
    res = JSON.parse(JSON.stringify(res))
    console.log(res)
  })
})
