const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

mongoose.connect(process.argv.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  id: (Math.round(Math.random() * 9999 + 1)),
  name: name,
  number: number || '',
})

if (name === undefined) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(person.name + ' ' + person.number)
      })
      mongoose.connection.close()
    })
} else {
  person
    .save()
    .then(response => {
      console.log(`added ${response.name} ${response.number} to phonebook`)
      mongoose.connection.close()
    })
}