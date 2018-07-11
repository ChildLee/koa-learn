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
  }
}, {
  underscored: true
})

User.hasOne(Area)

it('should sync', async () => {
  await sequelize.sync({force: true})
  await User.create({name: '1'})
  await Area.create({name: '1', user_id: '1'})
})

it('should auto-transaction', async () => {
  await sequelize.transaction(async (t) => {
    await User.create({name: '111'}, {transaction: t})
    await User.create({name: '222'}, {transaction: t})
    await User.create({name: '333'}, {transaction: t})
    throw new Error()
  })
})

it('should transaction', async () => {
  const t = await sequelize.transaction()
  await User.create({name: '111'}, {transaction: t})
  await User.create({name: '222'}, {transaction: t})
  await User.create({name: '333'}, {transaction: t})
  await t.commit()
})

it('should include findAll ', function () {
  setInterval(function () {
    console.time('1')
    User.findAll({include: [{model: Area}]}).then(user => {
      console.timeEnd('1')
    })
  }, 1111)
})
