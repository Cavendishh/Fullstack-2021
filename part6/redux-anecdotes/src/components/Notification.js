import React from 'react'
import { useSelector } from 'react-redux'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 16,
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return <div style={style}>{notification}</div>
}

export default Notification
