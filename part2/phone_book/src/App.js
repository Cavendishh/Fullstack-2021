import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const person = { name: newName }
    setPersons(persons.concat(person))
    setNewName('')
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
