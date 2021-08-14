import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1231244' }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((r) => (
          <li key={r.name}>
            {r.name} {r.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
