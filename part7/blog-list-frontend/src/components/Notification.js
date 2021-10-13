import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification?.message) return null
  const { type, message } = notification

  return <div className={type}>{message}</div>
}

export default Notification
