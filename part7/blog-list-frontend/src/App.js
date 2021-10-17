import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from '@mui/material'

import Routes from './routes/Routes'
import { checkAuth } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
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
      <Container>{userAuth ? <Routes /> : <LoginForm />}</Container>
    </Router>
  )
}

export default App
