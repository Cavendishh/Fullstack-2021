import { useSelector, useDispatch } from 'react-redux'

import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => dispatch(addVote(id))

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

      <AnecdoteForm />
    </div>
  )
}

export default App
