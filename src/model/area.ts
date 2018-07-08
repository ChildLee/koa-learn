export default (sequelize, DataTypes) => {
  return sequelize.define('area_province', {
    code: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
}
