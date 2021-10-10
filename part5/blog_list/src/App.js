import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const setNewBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    setAllBlogs(sortedBlogs)
  }

  useEffect(() => blogService.getAll().then((blogs) => setNewBlogs(blogs)), [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setLoggedUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNotificationMsg = (type, message) => {
    setNotification({ type, message })

    setTimeout(() => {
      setNotification({ type: '', message: '' })
    }, 4000)
  }

  const onLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setLoggedUser(user)
    } catch (err) {
      setNotificationMsg('error', 'Username or password is invalid')
    }
  }

  const onLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setLoggedUser(null)
    setNotificationMsg('success', 'Succesfully logged out')
  }

  const onBlogCreate = (blog) => {
    blogService
      .create(blog)
      .then((res) => {
        setNewBlogs(allBlogs.concat(res))
        blogFormRef.current.toggleVisibility()

        setNotificationMsg('success', `You created a blog titled ${res.title}`)
      })
      .catch((err) => setNotificationMsg('error', 'You were not able to create a blog'))
  }

  const onBlogLike = (blog) => {
    blog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog)
      .then((res) => {
        const blogsArr = allBlogs.map((b) => {
          return b.id === res.id ? res : b
        })

        setNewBlogs(blogsArr)

        setNotificationMsg('success', `You liked a blog titled ${res.title}`)
      })
      .catch((err) => setNotificationMsg('error', 'You were not able to like a blog'))
  }

  const onBlogDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    blogService
      .remove(id)
      .then(() => {
        const arr = allBlogs.filter((b) => b.id !== id)
        setNewBlogs(arr)

        setNotificationMsg('success', `You deleted a blog`)
      })
      .catch((err) => setNotificationMsg('error', 'You were not able to delete a blog'))
  }

  if (loggedUser === null)
    return (
      <>
        <h2>Login page</h2>

        <Notification notification={notification} />

        <form onSubmit={onLogin}>
          <p>Username</p>
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />

          <p>Password</p>
          <input
            type='text'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type='submit'>Log in</button>
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

      <Notification notification={notification} />

      <Togglable buttonLabel='Create a blog' ref={blogFormRef}>
        <BlogForm onBlogCreate={onBlogCreate} />
      </Togglable>

      <div>
        {loggedUser &&
          allBlogs.map((blog) => (
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
