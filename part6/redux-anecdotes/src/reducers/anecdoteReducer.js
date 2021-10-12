import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.payload

    case 'ADD_VOTE':
      const updatedAnecdote = state.find((a) => a.id === action.payload)
      updatedAnecdote.votes += 1
      const newState = state.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))

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

export const addVote = (id) => {
  return { type: 'ADD_VOTE', payload: id }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)

    dispatch({ type: 'NEW_ANECDOTE', payload: newAnecdote })
  }
}

export default anecdoteReducer
