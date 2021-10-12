import React from 'react'
import { useSelector } from 'react-redux'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 16,
}

const Notification = () => {
  const notification = useSelector((state) => state.notification.message)

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
