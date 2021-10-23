const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start()
