const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')
const Umzug = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      required: true,
      rejectUnauthorized: false,
    },
  },
})

const migrationConf = {
  storage: 'sequelize',
  storageOptions: {
    sequelize,
    tableName: 'migrations',
  },
  migrations: {
    params: [sequelize.getQueryInterface()],
    path: `${process.cwd()}/migrations`,
    pattern: /\.js$/,
  },
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', { files: migrations.map((mig) => mig.file) })
}

const rollbackMigrations = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to DB . . .')
  } catch (err) {
    console.log('. . . Failed to connect to DB')
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDatabase, rollbackMigrations }
