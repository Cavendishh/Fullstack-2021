const express = require('express')
const app = express()

app.use(express.json())

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
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 5,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 6,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 7,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 8,
  },
]

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
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people.<br><br>${new Date()}</p>`)
})

// * POST * //
app.post('/api/persons', (req, res) => {
  const body = req.body
  console.log(body)

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
const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
