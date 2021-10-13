import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { login, logout, checkAuth } from './reducers/authReducer'
import { setNotification } from './reducers/notificationReducer'
import { byLikes, initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)
  const auth = useSelector((state) => state.auth)
  let allBlogs = useSelector((state) => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(initializeBlogs())
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()

    try {
      await dispatch(login({ username, password }))

      dispatch(setNotification('success', 'Succesfully logged in', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'Username or password is invalid', timeoutId))
    }
  }

  const onLogout = () => {
    try {
      dispatch(logout())

      dispatch(setNotification('success', 'Succesfully logged out', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'Logging out failed', timeoutId))
    }
  }

  const onBlogCreate = async (blog) => {
    try {
      await dispatch(createBlog(blog))

      blogFormRef.current.toggleVisibility()
      dispatch(setNotification('success', `You created a blog titled ${blog.title}`, timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to create a blog', timeoutId))
    }
  }

  const onBlogLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))

      dispatch(setNotification('success', `You liked a blog titled ${blog.title}`, timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to like a blog', timeoutId))
    }
  }

  const onBlogDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      await dispatch(removeBlog(id))

      dispatch(setNotification('success', 'You deleted a blog', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to delete a blog', timeoutId))
    }
  }

  if (auth === null)
    return (
      <>
        <h2>Login page</h2>

        <Notification />

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

  return (
    <>
      <h2>blogs</h2>
      <p>
        You are logged in as user <b>{auth.username} </b>
        <button onClick={onLogout}>Log out</button>
      </p>

      <Notification />

      <Togglable buttonLabel='Create a blog' ref={blogFormRef}>
        <BlogForm onBlogCreate={onBlogCreate} />
      </Togglable>

      <div id='blogs-div'>
        {allBlogs.sort(byLikes).map((blog) => (
          <Blog key={blog.id} blog={blog} user={auth} onLike={onBlogLike} onDelete={onBlogDelete} />
        ))}
      </div>
    </>
  )
}

export default App
