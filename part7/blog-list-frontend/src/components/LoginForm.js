import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
      <h2>Login page</h2>

      <form onSubmit={onLogin} id='login-form'>
        <p>Username</p>
        <input
          type='text'
          value={username}
          name='username'
          id='username-input'
          onChange={({ target }) => setUsername(target.value)}
        />

        <p>Password</p>
        <input
          type='text'
          value={password}
          name='password'
          id='password-input'
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit' id='login-button'>
          Log in
        </button>
      </form>
    </>
  )
}

export default LoginForm
