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
  unknownEndpoint,
  errorHandler,
}
