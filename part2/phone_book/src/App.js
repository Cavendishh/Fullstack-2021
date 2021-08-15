import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((r) => setPersons(r.data))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    const nameExists = persons.findIndex((r) => r.name === newName)

    if (nameExists === -1) {
      const person = {
        name: newName,
        number: newNumber,
      }

      personService.create(person).then((r) => {
        setPersons(persons.concat(r.data))
        setNewName('')
        setNewNumber('')
      })

      return
    }

    alert(`Person '${newName}' is already added to phonebook . . .`)
  }

  const onDelete = (e) => {
    if (!window.confirm('Do you really want to delete this person?')) return

    const id = parseInt(e.target.value)
    console.log(id)
    personService.remove(id).then((r) => {
      setPersons([...persons].filter((p) => p.id !== id))
    })
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
      <Persons persons={persons} newFilter={newFilter} onDelete={onDelete} />
    </div>
  )
}

export default App
