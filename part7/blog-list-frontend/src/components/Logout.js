import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    <p>
      You are logged in as user <b>{auth.username} </b>
      <button onClick={onLogout}>Log out</button>
    </p>
  )
}

export default Logout
