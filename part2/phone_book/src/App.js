import React, { useState, useEffect } from 'react'
import SearchPerson from './components/SearchPerson'
import NewPerson from './components/NewPerson'
import RenderPerson from './components/RenderPerson'
import Notification from './components/Notification'
import personService from './services/persons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState(null)

  const handleNoteChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setShowPerson(event.target.value)
  const personsFiltered = persons.filter((person) => person.name.toLowerCase().includes(showPerson.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleRemovePerson = (name, id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(n => n.id !== id));
      })
      .catch(() => {
        setErrorMessage(`Information of ${newName} has already been removed from server`)
        setMessageStatus('error')
        setTimeout(() => {
          setErrorMessage(null)
          setMessageStatus(null)
        }, 3000)
        setPersons(persons.filter(n => n.id !== id));
      })
    setErrorMessage(`Removed ${name}`)
    setMessageStatus('success')
    setTimeout(() => {
      setErrorMessage(null)
      setMessageStatus(null)
      }, 3000)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {        
        const personFound = persons.find((person) => person.name === newName)

        personService
          .update(personFound.id, { ...personFound, number: newNumber })
          .then(response => {
            setPersons(persons.map(person => (person.name === newName ? response : person)))
          })
          .catch(() => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setMessageStatus('error')
              setTimeout(() => {
                setErrorMessage(null)
                setMessageStatus(null)
              }, 3000)
          })
        setErrorMessage(`Changed ${newName}'s phone number`)
        setMessageStatus('success')
        setTimeout(() => {
          setErrorMessage(null)
          setMessageStatus(null)
        }, 3000)        
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${newName}`)
          setMessageStatus('success')
          setNewName('')
          setNewNumber('')  
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setMessageStatus('error')
        })
      setTimeout(() => {
        setErrorMessage(null)
        setMessageStatus(null)
      }, 3000)
    }
  }

  return (
    <>
      <Container className='mt-3'>
        <Row className='justify-content-md-center'>
          <Col md={{ span: 5 }}>
            <Notification message={errorMessage} status={messageStatus} />
            <h1 className='mb-4'>Phonebook</h1>
            <h4>Add a new person</h4>
            <NewPerson
              addPerson={addPerson}
              newName={newName}
              newNumber={newNumber}
              handleNoteChange={handleNoteChange}
              handleNumberChange={handleNumberChange}
            />
            <SearchPerson
              showPerson={showPerson}
              handleFilterChange={handleFilterChange}
            />
          </Col>
        </Row>
        <Row className='mt-3'>
          <RenderPerson personsFiltered={personsFiltered} handleRemovePerson={handleRemovePerson}
          />
        </Row>
      </Container>
    </>
  )
}

export default App