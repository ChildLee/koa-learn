import * as Sequelize from 'sequelize'
import {area, user} from './area'

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'sa',
  database: 'test',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false,
  logging: function (log) {
    console.log(log)
  }
})

export const User = sequelize.import('user', user)
export const Area = sequelize.import('area', area)
User.hasOne(Area)
