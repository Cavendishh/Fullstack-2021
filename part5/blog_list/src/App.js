import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [error, setError] = useState('')

  useEffect(() => blogService.getAll().then((blogs) => setAllBlogs(blogs)), [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setLoggedUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLogin = async (e) => {
    e.preventDefault()
    console.log('Logging in with credentials >> ', username, ' -- ', password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setLoggedUser(user)
    } catch (e) {
      console.log(e)
      setError('Username or password is invalid')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  const onLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setLoggedUser(null)
  }

  const onBlogCreate = (e) => {
    e.preventDefault()

    blogService.create(newBlog).then((res) => setAllBlogs(allBlogs.concat(res)))
  }

  const onChangeNewBlog = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  if (loggedUser === null)
    return (
      <>
        <h2>Login page</h2>
        {error}
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
      <form onSubmit={onBlogCreate}>
        <div>
          Title
          <input
            type='text'
            value={newBlog.title}
            name='title'
            onChange={(e) => onChangeNewBlog(e)}
          />
        </div>

        <div>
          Author
          <input
            type='text'
            value={newBlog.author}
            name='author'
            onChange={(e) => onChangeNewBlog(e)}
          />
        </div>

        <div>
          Url
          <input type='text' value={newBlog.url} name='url' onChange={(e) => onChangeNewBlog(e)} />
        </div>
        <button type='submit'>Create blog</button>
      </form>
      <div>
        {allBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default App
