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
    // 禁止修改表名
    freezeTableName: true,
    // 下划线命名
    underscored: true
  }
})

const {TINYINT, INTEGER, BIGINT, STRING, BOOLEAN, DATE, Op} = Sequelize

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
  type: {
    type: TINYINT,
    allowNull: false,
    defaultValue: -1,
    comment: '资源类型：-1=default,0=menu,1=button'
  },
  menu_id: {
    type: INTEGER,
    comment: '菜单ID'
  }
}, {
  comment: '权限表'
})

const Menu = sequelize.define('menu', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '菜单名称'
  },
  url: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '菜单URL'
  },
  pid: {
    type: INTEGER,
    comment: '父菜单ID'
  }
}, {
  comment: '菜单表'
})

//用户-角色表
// const UserRole = sequelize.define('user_role', {})
User.belongsToMany(Role, {through: 'user_role'})
Role.belongsToMany(User, {through: 'user_role'})

//角色-权限表
// const RoleAccess = sequelize.define('role_permission', {})
Role.belongsToMany(Permission, {through: 'role_permission'})
Permission.belongsToMany(Role, {through: 'role_permission'})

//权限-菜单关联
Permission.belongsTo(Menu)
Menu.hasOne(Permission)

Menu.hasMany(Menu, {foreignKey: 'pid'})
it('init', async () => {
  await sequelize.sync({force: true})
  await Menu.create({name: '菜单'})
  await Menu.create({name: '用户管理', pid: 1})
  await Menu.create({name: '课程管理', pid: 1})
  await Menu.create({name: '添加用户', pid: 2, url: '/user/add', permission: {type: 0}}, {include: [Permission]})
  await Menu.create({name: '删除用户', pid: 2, url: '/user/del', permission: {type: 0}}, {include: [Permission]})
  await Menu.create({name: '添加管理', pid: 3, url: '/course/add', permission: {type: 0}}, {include: [Permission]})
  await Menu.create({name: '删除管理', pid: 3, url: '/course/del', permission: {type: 0}}, {include: [Permission]})
  const user = await User.create({name: 'admin'})
  const role = await Role.create({name: 'SuperAdmin'})
  await user['addRoles'](role)
})

it('menu', function () {
  Menu.findAll({
    include: [{model: Menu}],
    raw: true
  }).then(res => {
    console.log(res)
    // res = JSON.parse(JSON.stringify(res))
    // console.log(res)
  })
})

it('findAll', function () {
  Menu.findAll().then(res => {
    res = JSON.parse(JSON.stringify(res))
    console.log(res)
  })
})
