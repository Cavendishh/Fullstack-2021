import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const timeoutId = useSelector((state) => state.notification.timeoutId)

  const addAnecdote = async (e) => {
    e.preventDefault()
    console.log('here', timeoutId)

    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch(setNotification(`Created new anecdote '${anecdote}'`, 5, timeoutId))
    dispatch(createAnecdote(anecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
