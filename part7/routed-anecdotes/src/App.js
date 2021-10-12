import { useState } from 'react'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'

import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }

  return (
    <>
      <Link style={padding} to='/'>
        Anecdotes
      </Link>
      <Link style={padding} to='/new'>
        Create new
      </Link>
      <Link style={padding} to='/about'>
        About
      </Link>
    </>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => {
        const { id, content } = anecdote

        return (
          <li key={id}>
            <Link to={`/anecdotes/${id}`}>{content}</Link>
          </li>
        )
      })}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an incident. Occasionally
      humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
      laughter but to reveal a truth more general than the brief tale itself, such as to
      characterize a person by delineating a specific quirk or trait, to communicate an abstract
      idea about a person, place, or thing through the concrete details of a short narrative. An
      anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can find the best and add
      more.
    </p>
  </div>
)

const Anecdote = ({ anecdote: { content, author, info, votes } }) => {
  return (
    <>
      <h2>
        {content} by {author}
      </h2>
      <p>has {votes} votes</p>
      <p>
        for more info see <a href={info}>{info}</a>
      </p>
    </>
  )
}

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>. See{' '}
    <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification }) => {
  const history = useHistory()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    history.push('/')
    setNotification(`A new anecdote ${content.value} created!`)

    setTimeout(() => {
      setNotification('')
    }, 10 * 1000)
  }

  const onReset = (e) => {
    e.preventDefault()

    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>

        <div>
          author
          <input {...author} />
        </div>

        <div>
          url for more info
          <input {...info} />
        </div>

        <button style={{ marginRight: 16 }}>create</button>
        <button onClick={onReset}>reset</button>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  if (!message) return null

  return <p style={{ border: '1px solid red', padding: 16 }}>{message}</p>
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const match = useRouteMatch('/anecdotes/:id')

  console.log(match)
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <>
      <Menu />
      <Notification message={notification} />

      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>

        <Route path='/new'>
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </>
  )
}

export default App
