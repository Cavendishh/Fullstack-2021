import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'ADD_VOTE', payload: id })
  }

  const addAnecdote = (e) => {
    e.preventDefault()

    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch({ type: 'NEW_ANECDOTE', payload: anecdote })
  }

  const byVotes = (b1, b2) => b2.votes - b1.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
