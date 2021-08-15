const express = require('express')
const app = express()

app.use(express.json())

const persons = [
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

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
