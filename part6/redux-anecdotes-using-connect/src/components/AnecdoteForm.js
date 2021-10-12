import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault()

    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''

    props.setNotification(`Created new anecdote '${anecdote}'`, 3)
    props.createAnecdote(anecdote)
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

const mapDispatchToProps = (dispatch) => {
  return {
    setNotification: (message, time) => {
      dispatch(setNotification(message, time))
    },
    createAnecdote: (anecdote) => {
      dispatch(createAnecdote(anecdote))
    },
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
