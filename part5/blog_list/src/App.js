import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then((_blogs) => setBlogs(_blogs))
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()
    console.log('Logging in with credentials >> ', username, ' -- ', password)

    try {
      const _user = await loginService.login({
        username,
        password,
      })

      setUser(_user)
    } catch (e) {
      console.log(e)
    }
  }

  console.log(user)

  if (user === null)
    return (
      <>
        <h2>Login page</h2>
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
        You are logged in as user <b>{user.username}</b>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default App
