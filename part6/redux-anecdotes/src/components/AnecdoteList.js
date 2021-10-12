import { useSelector, useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }

    return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    dispatch(setNotification(`Voted anecdote '${anecdote}'`))
    dispatch(addVote(id))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const byVotes = (b1, b2) => b2.votes - b1.votes

  return (
    <>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
