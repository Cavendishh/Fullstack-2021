require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const url = process.env.DATABASE_URL

const sequelize = new Sequelize(url, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

const main = async () => {
  try {
    await sequelize.authenticate()

    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    // console.log('Blogs: ', blogs)

    blogs.map((b) => console.log(`${b.author}: '${b.title}', ${b.likes} likes`))

    sequelize.close()
  } catch (err) {
    console.error('Unable to connect to the DB: ', err)
  }
}

main()
