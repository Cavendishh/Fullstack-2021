import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes/Routes'
import { checkAuth } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  return (
    <Router>
      <Notification />

      {userAuth ? <Routes /> : <LoginForm />}
    </Router>
  )
}

export default App
