const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('./config')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  if (!auth?.toLowerCase()?.startsWith('bearer ')) {
    return res.status(401).json({ error: 'Bearer token missing' })
  }

  try {
    req.decodedToken = jwt.verify(auth.substring(7), SECRET)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Token invalid' })
  }

  next()
}

const blogFetcher = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)

  next()
}

const userFetcher = async (req, res, next) => {
  req.user = await User.findByPk(req.decodedToken.id)

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

module.exports = {
  tokenExtractor,
  blogFetcher,
  userFetcher,
  unknownEndpoint,
  errorHandler,
}
