import { useState } from 'react'

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
      filter shown with: <input value={newFilter} onChange={onFilterChange} />
      <h3>add a new</h3>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((r) => r.name.toLowerCase().includes(newFilter.toLowerCase()))
          .map((r) => (
            <li key={r.name}>
              {r.name} {r.number}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
