import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import { logout } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'

const LogoutButton = styled(Button)(() => ({
  marginLeft: 16,
}))

const Logout = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const timeoutId = useSelector((state) => state.notification.timeoutId)

  const onLogout = () => {
    try {
      dispatch(logout())

      dispatch(setNotification('success', 'Succesfully logged out', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'Logging out failed', timeoutId))
    }
  }

  return (
    <Box display='flex' alignItems='center'>
      <Typography color='black'>
        You are logged in as user <b>{auth.username} </b>
      </Typography>

      <LogoutButton variant='outlined' color='error' size='small' onClick={onLogout}>
        Log out
      </LogoutButton>
    </Box>
  )
}

export default Logout
