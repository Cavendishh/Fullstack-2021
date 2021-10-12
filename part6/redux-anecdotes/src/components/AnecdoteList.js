import { useSelector, useDispatch } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const timeoutId = useSelector((state) => state.notification.timeoutId)
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }

    return state.anecdotes
  })

  const vote = (anecdote) => {
    console.log('here', timeoutId)
    dispatch(setNotification(`Voted anecdote '${anecdote.content}'`, 5, timeoutId))
    dispatch(addVote(anecdote))
  }

  const byVotes = (b1, b2) => b2.votes - b1.votes

  return (
    <>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
