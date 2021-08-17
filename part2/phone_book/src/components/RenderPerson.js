import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

const RenderPerson = (props) => {
  return (
    props.personsFiltered.map((person) =>
      <Col xs={6} md={4} lg={3} xl={3}>
        <Card.Body key={person.name}>
          <Card.Title>
            {person.name}
          </Card.Title>
          <Card.Text>
            {person.number}
          </Card.Text>
          <Button variant='danger' onClick={() => props.handleRemovePerson(person.name, person.id)}>
            Remove
        </Button>
        </Card.Body>
      </Col>
    )
  )
}

export default RenderPerson