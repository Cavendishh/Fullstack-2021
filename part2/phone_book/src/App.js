import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const nameExists = persons.findIndex((r) => r.name === newName)

    if (nameExists === -1) {
      const person = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')

      return
    }

    alert(`Person '${newName}' is already added to phonebook . . .`)
  }

  const onNameChange = (e) => setNewName(e.target.value)
  const onNumberChange = (e) => setNewNumber(e.target.value)
  const onFilterChange = (e) => setNewFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={onFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={onSubmit}
        name={newName}
        number={newNumber}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
