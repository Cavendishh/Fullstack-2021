import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { byLikes, initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)
  let allBlogs = useSelector((state) => state.blogs)

  console.log('allblogs', allBlogs)

  const [loggedUser, setLoggedUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => dispatch(initializeBlogs()), [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setLoggedUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLogin = (e) => {
    e.preventDefault()

    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user))

        setLoggedUser(user)
        dispatch(setNotification('success', 'Succesfully logged in', timeoutId))
      })
      .catch(() => {
        dispatch(setNotification('error', 'Username or password is invalid', timeoutId))
      })
  }

  const onLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setLoggedUser(null)
    dispatch(setNotification('success', 'Succesfully logged out', timeoutId))
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

  if (loggedUser === null)
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
        You are logged in as user <b>{loggedUser.username} </b>
        <button onClick={onLogout}>Log out</button>
      </p>

      <Notification />

      <Togglable buttonLabel='Create a blog' ref={blogFormRef}>
        <BlogForm onBlogCreate={onBlogCreate} />
      </Togglable>

      <div id='blogs-div'>
        {allBlogs.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={loggedUser}
            onLike={onBlogLike}
            onDelete={onBlogDelete}
          />
        ))}
      </div>
    </>
  )
}

export default App
