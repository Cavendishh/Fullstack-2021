const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
morgan.token('object', function (req, res) {
  return console.log(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :object'))
// app.use(morgan('tiny'))

// * GET * //
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) return res.json(person)

  res.status(404).end()
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((p) => res.json(p))
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people.<br><br>${new Date()}</p>`)
})

// * POST * //
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) return res.status(400).json({ error: `Person's name is missing` })
  if (!body.number) return res.status(400).json({ error: `Person's number is missing` })
  if (persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase()))
    return res.status(400).json({ error: 'Person already exists' })

  const person = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random() * 99999),
  }

  persons = persons.concat(person)

  res.json(persons)
})

// * DELETE * //
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)

  res.status(204).end()
})

// * CONFIG * //
const port = process.env.PORT

app.listen(port)
console.log(`Server running on port ${port}`)

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]
