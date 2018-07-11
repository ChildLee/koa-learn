export const user = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  })
}

export const area = (sequelize, DataTypes) => {
  return sequelize.define('area', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true
  })
}
