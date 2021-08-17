import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const NewPerson = (props) => {
  return (
    <Form onSubmit={props.addPerson}>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control value={props.newName} onChange={props.handleNoteChange} />
        <Form.Text className="text-muted">
          If the name is not unique the phone number will be updated
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Number:</Form.Label>
        <Form.Control value={props.newNumber} onChange={props.handleNumberChange} />
        <Form.Text className="text-muted">
          Phone number must be at least 8 digits long
        </Form.Text>
      </Form.Group>
      <Button variant='primary' type='submit' block>Add</Button>
    </Form>

  )
}

export default NewPerson