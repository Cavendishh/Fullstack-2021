import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.payload

    case 'ADD_VOTE':
      const anecdote = action.payload
      const newState = state.map((a) => (a.id === anecdote.id ? anecdote : a))

      return newState

    case 'NEW_ANECDOTE':
      return [...state, action.payload]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({ type: 'INIT_ANECDOTES', payload: anecdotes })
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteObj = await anecdoteService.vote(anecdote)

    dispatch({ type: 'ADD_VOTE', payload: anecdoteObj })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch({ type: 'NEW_ANECDOTE', payload: newAnecdote })
  }
}

export default anecdoteReducer
