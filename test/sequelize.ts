import * as Sequelize from 'sequelize'

const sequelize = new Sequelize({
  host: 'localhost',
  port: 3306,
  database: 'test',
  username: 'root',
  password: 'sa',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  query: {
    raw: true
  },
  operatorsAliases: false
})

const {INTEGER, STRING, DATE} = Sequelize
const Op = Sequelize.Op

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER
  },
  name: {
    type: STRING,
    allowNull: false
  }
}, {
  underscored: true
})

const Area = sequelize.define('area', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER
  },
  name: {
    type: STRING,
    allowNull: false
  },
  user_id: {
    type: INTEGER,
    allowNull: false
  }
}, {
  underscored: true
})

User.hasOne(Area, {
  onDelete: 'CASCADE',
  onUpdate: 'RESTRICT'
})

it('should sync', async () => {
  sequelize.sync({force: true}).then()
})

it('should add', async () => {
  console.time('1')
  User.create({name: '1', date: new Date()}).then(res => {
    console.log(res['dataValues'].id)
  })
  console.timeEnd('1')
})

it('should del', function () {
  User.destroy({where: {id: 3}}).then(res => {
    console.log(res)
  })
})

it('should update', function () {
  User.update({name: '2'}, {where: {id: 1}}).then(res => {
    console.log(res)
  })
})

it('should get', function () {
  User.findAll().then(res => {
    console.log(res)
  })
})

it('should gt', function () {
  User.findAll({where: {id: {[Op.gt]: 1}}}).then(res => {
    console.log(res)
  })
})

it('should page', function () {
  User.findAll({order: [['id', 'DESC']], offset: 0, limit: 5}).then(res => {
    console.log(res)
  })
})

it('should addref', function () {
  Area.create({name: '1', user_id: '1'}).then(res => {
    console.log(res)
  })
})
