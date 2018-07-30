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
    defaultValue: 1,
    comment: '资源类型：-1=root,0=menu,1=operations'
  },
  name: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '权限名称'
  },
  url: {
    type: STRING,
    allowNull: false,
    defaultValue: '',
    comment: '权限URL'
  },
  pid: {
    type: INTEGER,
    comment: '父权限ID'
  },
  order: {
    type: STRING(5),
    allowNull: false,
    defaultValue: '',
    comment: '排序'
  }
}, {
  tableName: 'sys_permission',
  comment: '权限表'
})
//菜单表-父菜单与主键关联
Permission.hasMany(Permission, {foreignKey: 'pid'})

//用户-角色表
const userRole = sequelize.define('user_role', {}, {
  tableName: 'sys_user_role',
  //不添加时间戳属性
  timestamps: false,
  comment: '用户-角色关联表'
})
User.belongsToMany(Role, {through: userRole})
Role.belongsToMany(User, {through: userRole})

//角色-权限表
const RolePermission = sequelize.define('role_permission', {}, {
  tableName: 'sys_role_permission',
  //不添加时间戳属性
  timestamps: false,
  comment: '角色-权限关联表'
})
Role.belongsToMany(Permission, {through: RolePermission})
Permission.belongsToMany(Role, {through: RolePermission})

it('init', async () => {
  await sequelize.sync({force: true})
  //菜单数据初始化
  await Permission.create({name: '权限'})
  //一级菜单
  const m1 = await Permission.create({name: '用户管理', pid: 1, type: 0, order: 97})//pid:2
  const m2 = await Permission.create({name: '角色管理', pid: 1, type: 0, order: 98})//pid:3
  const m3 = await Permission.create({name: '权限管理', pid: 1, type: 0, order: 99})//pid:4
  const m4 = await Permission.create({name: '商品管理', pid: 1, type: 0, order: 0})//pid:5
  //一级菜单按钮
  const b1 = await Permission.create({name: '文件管理', pid: 1, type: 1, order: 1})//pid:6
  //用户菜单
  const access4 = await Permission.create({name: '用户列表', pid: 2, url: '/user/list', type: 0})
  const access5 = await Permission.create({name: '添加用户', pid: 2, url: '/user/add', type: 0})
  const access6 = await Permission.create({name: '编辑用户', pid: 2, url: '/user/update', type: 0})
  const access7 = await Permission.create({name: '设置角色', pid: 2, url: '/user/role', type: 0})
  //角色菜单
  const access8 = await Permission.create({name: '角色列表', pid: 3, url: '/role/list', type: 0})
  const access9 = await Permission.create({name: '添加角色', pid: 3, url: '/role/add', type: 0})
  const access10 = await Permission.create({name: '编辑角色', pid: 3, url: '/role/update', type: 0})
  const access11 = await Permission.create({name: '设置权限', pid: 3, url: '/role/permission', type: 0})
  //权限菜单
  const access12 = await Permission.create({name: '权限列表', pid: 4, url: '/permission/list', type: 0})
  const access13 = await Permission.create({name: '添加权限', pid: 4, url: '/permission/add', type: 0})
  const access14 = await Permission.create({name: '编辑权限', pid: 4, url: '/permission/update', type: 0})
  //
  const access15 = await Permission.create({name: '商品列表', pid: 5, url: '/commodity/list', type: 0})
  //
  const btn1 = await Permission.create({name: 'logo上传', pid: 6, url: '/upload/logo', type: 1})
  //
  const user1 = await User.create({name: '用户一'})
  const user2 = await User.create({name: '用户二'})
  const user3 = await User.create({name: '用户三'})
  //
  const SuperRole = await Role.create({name: '超级管理员'})
  const role1 = await Role.create({name: 'Admin'})
  const role2 = await Role.create({name: 'SuperUser'})
  const role3 = await Role.create({name: 'User'})
  //
  await role1['addPermissions']([m1, m2, m3, access4, access5, access6, access7, access8, access9, access10, access11, access12, access13, access14])
  await role2['addPermissions']([m1, access4, access5, access6])
  await role3['addPermissions']([m4, b1, access15, btn1])
  //
  await user1['addRoles']([role1, role2])
  await user2['addRoles']([role2])
  await user3['addRoles']([role3])
})

//所有权限菜单
it('MenuAll', async () => {
  const menu = await Permission.findAll({
    attributes: ['id', 'name'],
    where: {pid: 1},
    order: ['order'],
    include: [{
      model: Permission,
      attributes: ['id', 'name', 'url']
    }]
  })
  console.log(JSON.parse(JSON.stringify(menu)))
})

//角色拥有的权限菜单
it('UserMenuAll', async () => {
  const menu = await Permission.findAll({
    include: [{
      model: Role,
      attributes: [],
      where: {id: 2}
    }, {
      model: Permission,
      attributes: ['id', 'name', 'url']
    }],
    attributes: ['id', 'name'],
    where: {pid: 1}
  })
  console.log(JSON.parse(JSON.stringify(menu)))
})

//用户菜单
it('Menus', async () => {
  //查询用户所有的角色
  const roles = await userRole.findAll({
    raw: true,
    attributes: ['role_id'],
    where: {user_id: 1}
  })
  //没有角色返回空数组
  if (!roles.length) {
    return []
  }
  const role = []
  for (let i = 0; i < roles.length; i++) {
    role.push(roles[i]['role_id'])
  }
  //查询所有角色菜单
  const menus = await Permission.findAll({
    attributes: ['id', 'name'],
    where: {type: 0, pid: 1},
    order: ['order'],
    include: [{
      model: Role,
      attributes: [],
      where: {
        id: {[Op.in]: role}
      }
    }, {
      model: Permission,
      attributes: ['id', 'name', 'url']
    }]
  })
  console.log(JSON.parse(JSON.stringify(menus)))
})

//url访问权限查询
it('Access', async () => {
  const access = await Role.findOne({
    attributes: [],
    include: [{
      model: User,
      attributes: [],
      where: {id: 3}
    }, {
      model: Permission,
      attributes: ['url'],
      where: {url: '/upload/logo'}
    }]
  })
  console.log(JSON.stringify(access, null, 2))
})

//封号
it('Banned Account', async () => {
  const status = await User.update({status: 0}, {where: {id: 1}})
  console.log(status)
}) 
