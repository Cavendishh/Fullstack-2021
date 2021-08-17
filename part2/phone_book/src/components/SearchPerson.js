import React from 'react'
import Form from 'react-bootstrap/Form'

const SearchPerson = (props) => {
  return (
    <Form className='mt-3'>
      <Form.Label>Search for person(s):</Form.Label>
      <Form.Control value={props.showPerson} onChange={props.handleFilterChange} />
    </Form>
  )
}

export default SearchPerson;
