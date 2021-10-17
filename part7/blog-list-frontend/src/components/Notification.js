import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledAlert = styled(Alert)(() => ({
  marginTop: 16,
}))

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification?.message) return null
  const { type, message } = notification

  return <StyledAlert severity={type}>{message}</StyledAlert>
}

export default Notification
