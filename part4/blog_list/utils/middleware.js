const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('--------------------------------------------------')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req['token'] = authorization.substring(7)
  }

  next()
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Malformatted id' })
  }

  if (err.name === 'ValidationError') return res.status(400).json({ error: err.message })

  if (err.name === 'JsonWebTokenError') return res.status(401).json({ error: 'Invalid token' })

  if (err.name === 'TokenExpiredError') return res.status(401).json({ error: 'Token expired' })

  next(err)
}

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler,
  unknownEndpoint,
}
