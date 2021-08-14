import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    const nameExists = persons.findIndex((r) => r.name === newName)

    if (nameExists === -1) {
      setPersons(persons.concat({ name: newName }))
      setNewName('')

      return
    }

    alert(`Person '${newName}' is already added to phonebook . . .`)
  }

  const onNameChange = (e) => setNewName(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((r) => (
          <li key={r.name}>{r.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
