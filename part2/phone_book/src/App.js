import { useState, useEffect } from 'react'

import personService from './services/persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const [notification, setNotification] = useState({
    message: '',
    status: '',
  })

  useEffect(() => {
    personService.getAll().then((r) => setPersons(r))
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    let person = {
      name: newName,
      number: newNumber,
    }

    if (persons.findIndex((r) => r.name === newName) === -1) {
      personService
        .create(person)
        .then((r) => {
          console.log(r)
          setPersons(r)
          setNewName('')
          setNewNumber('')

          setNotification({
            message: 'Person created',
            status: 'success',
          })
        })
        .catch(() => {
          setNotification({
            message: 'Something went wrong...',
            status: 'error',
          })
        })

      return resetNotification()
    }

    if (!window.confirm(`${newName} is already added, replace the old number with new?`)) return

    person = persons.find((r) => r.name === newName)
    person.number = newNumber

    personService
      .update(person)
      .then((r) => {
        setPersons(persons.map((p) => (p.id !== person.id ? p : r)))

        setNotification({
          message: 'Person updated',
          status: 'success',
        })
      })
      .catch(() => {
        setNotification({
          message: `Information of ${newName} has already been removed from server`,
          status: 'error',
        })

        setPersons([...persons].filter((n) => n.id !== person.id))
      })

    resetNotification()
  }

  const onDelete = (e) => {
    if (!window.confirm('Do you really want to delete this person?')) return

    const id = parseInt(e.target.value)

    personService
      .remove(id)
      .then((r) => {
        setPersons([...persons].filter((p) => p.id !== id))

        setNotification({
          message: 'Person deleted',
          status: 'success',
        })
      })
      .catch(() => {
        setNotification({
          message: `Information of ${newName} has already been removed from server`,
          status: 'error',
        })

        setPersons([...persons].filter((n) => n.id !== id))
      })

    resetNotification()
  }

  const resetNotification = () => {
    setTimeout(() => {
      setNotification({
        message: '',
        status: '',
      })
    }, 3000)
  }

  const onNameChange = (e) => setNewName(e.target.value)
  const onNumberChange = (e) => setNewNumber(e.target.value)
  const onFilterChange = (e) => setNewFilter(e.target.value)

  return (
    <>
      <Notification notification={notification} />
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
    </>
  )
}

export default App
