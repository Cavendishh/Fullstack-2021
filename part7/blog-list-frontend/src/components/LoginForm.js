import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button, TextField, InputAdornment, Stack } from '@mui/material'
import {
  AccountCircle as AccountCircle,
  LockOpen as LockOpenIcon,
  Login as LoginIcon,
} from '@mui/icons-material'

import Notification from '../components/Notification'
import { login } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async (e) => {
    e.preventDefault()

    try {
      await dispatch(login({ username, password }))

      dispatch(setNotification('success', 'Succesfully logged in', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'Username or password is invalid', timeoutId))
    }
  }

  return (
    <>
      <Notification />
      <Grid container direction='column' alignItems='center'>
        <Typography variant='h4' component='h2' mb={3}>
          Login page
        </Typography>

        <form onSubmit={onLogin} id='login-form'>
          <Stack spacing={3} sx={{ width: 400 }}>
            <TextField
              id='username-input'
              label='Username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id='password-input'
              label='Password'
              onChange={({ target }) => setPassword(target.value)}
              required
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockOpenIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type='submit'
              variant='contained'
              id='login-button'
              startIcon={<LoginIcon />}
              sx={{ width: '100%' }}
            >
              Log in
            </Button>
          </Stack>
        </form>
      </Grid>
    </>
  )
}

export default LoginForm
