const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Cavendishh:${password}@cluster0.am39c.mongodb.net/phonebook_2?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number,
})

if (name || number) {
  return person.save().then((res) => {
    console.log(`added ${name} number ${number} to phonebook!`)
    mongoose.connection.close()
  })
}

Person.find({}).then((r) => {
  r.forEach((p) => {
    console.log(p)
  })
  mongoose.connection.close()
})
