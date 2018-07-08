import * as Sequelize from 'sequelize'
import area from './area'

const sequelize = new Sequelize({
  host: 'localhost',
  port: 3306,
  database: 'area',
  username: 'root',
  password: 'sa',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false,
  logging: false
})

export const Area = sequelize.import('area', area)
