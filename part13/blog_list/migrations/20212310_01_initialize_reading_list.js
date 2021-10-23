const { DataTypes } = require('sequelize')
const Sequelize = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('reading_list', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('reading_list')
  },
}
