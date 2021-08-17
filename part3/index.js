require('dotenv').config()
const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('object', function (req) {
  if (req.method === 'POST') return JSON.stringify(req.body)
  else return null
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :object'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`<p>Phonebook has info for ${persons.length} people.<br><br>${new Date()}</p>`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person.toJSON())
      else res.status(404).end()
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'Person`s name is missing',
    })
  } else if (!body.number) {
    return res.status(400).json({
      error: 'Person`s number is missing',
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint',
  })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
