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
  },

  logging: (sql) => {
    console.log(sql)
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
  tableName: 'sys_user',
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
  tableName: 'sys_role',
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
  tableName: 'sys_permission',
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
  tableName: 'sys_menu',
  comment: '菜单表'
})

//菜单表-父菜单与主键关联
Menu.hasMany(Menu, {foreignKey: 'pid'})

const Operation = sequelize.define('operation', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false,
    defaultValue: ''
  },
  method: {
    type: STRING,
    allowNull: false,
    defaultValue: ''
  },
  url: {
    type: STRING,
    allowNull: false,
    defaultValue: ''
  }
}, {
  tableName: 'sys_operation',
  comment: '操作权限'
})


//用户-角色表
// const UserRole = sequelize.define('user_role', {})
User.belongsToMany(Role, {through: 'sys_user_role'})
Role.belongsToMany(User, {through: 'sys_user_role'})

//角色-权限表
// const RoleAccess = sequelize.define('role_permission', {})
Role.belongsToMany(Permission, {through: 'sys_role_permission'})
Permission.belongsToMany(Role, {through: 'sys_role_permission'})

//权限-菜单关联
Permission.belongsTo(Menu)
Menu.hasOne(Permission)

//权限-操作关联
Permission.belongsTo(Operation)
Operation.hasOne(Permission)
it('init', async () => {
  await sequelize.sync({force: true})
  //菜单数据初始化
  const type = 0//类型为菜单
  await Menu.create({name: '菜单'})
  //一级菜单
  await Menu.create({name: '用户管理', pid: 1, permission: {type}}, {include: [Permission]})
  await Menu.create({name: '角色管理', pid: 1, permission: {type}}, {include: [Permission]})
  await Menu.create({name: '权限管理', pid: 1, permission: {type}}, {include: [Permission]})
  //用户菜单
  await Menu.create({name: '用户列表', pid: 2, url: '/user/list', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '添加用户', pid: 2, url: '/user/add', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '编辑用户', pid: 2, url: '/user/update', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '设置角色', pid: 2, url: '/user/role', permission: {type}}, {include: [Permission]})
  //角色菜单
  await Menu.create({name: '角色列表', pid: 3, url: '/role/list', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '添加角色', pid: 3, url: '/role/add', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '编辑角色', pid: 3, url: '/role/update', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '设置权限', pid: 3, url: '/role/permission', permission: {type}}, {include: [Permission]})
  //权限菜单
  await Menu.create({name: '权限列表', pid: 4, url: '/permission/list', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '添加权限', pid: 4, url: '/permission/add', permission: {type}}, {include: [Permission]})
  await Menu.create({name: '编辑权限', pid: 4, url: '/permission/update', permission: {type}}, {include: [Permission]})
  //
  const user = await User.create({name: 'admin'})
  const role = await Role.create({name: 'SuperAdmin'})
  await user['addRoles'](role)
})

it('menu', async () => {
  //菜单生成
  const menu = await Menu.findAll({
    where: {pid: 1},
    include: [{
      model: Menu,
      attributes: ['id', 'name', 'url']
    }],
    attributes: ['id', 'name']
  })
  console.log(JSON.stringify(menu, null, 2))
})

it('findAll', function () {
  Menu.findAll().then(res => {
    res = JSON.parse(JSON.stringify(res))
    console.log(res)
  })
})
