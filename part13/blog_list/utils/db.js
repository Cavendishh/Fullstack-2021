const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      required: true,
      rejectUnauthorized: false,
    },
  },
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to DB . . .')
  } catch (err) {
    console.log('. . . Failed to connect to DB')
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDatabase }
