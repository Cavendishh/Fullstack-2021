import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkAuth } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Logout from './components/Logout'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(initializeBlogs())
  }, [])

  if (auth === null)
    return (
      <>
        <Notification />

        <LoginForm />
      </>
    )

  return (
    <>
      <h2>Blogs</h2>
      <Logout />

      <Notification />

      <Togglable buttonLabel='Create a blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <Blogs />
    </>
  )
}

export default App
