import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  } else if (status === 'error') {
    return <Alert variant='danger'>{message}</Alert>
  } else {
    return <Alert variant='success'>{message}</Alert>
  }
}

export default Notification