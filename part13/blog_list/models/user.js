const Sequelize = require('sequelize')
const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: Sequelize.DATE(3),
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE(3),
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user',
  }
)

module.exports = User
