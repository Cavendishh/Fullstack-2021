import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload

    case 'ADD_VOTE':
      return state

    case 'NEW_BLOG':
      return [...state, action.payload]

    default:
      return state
  }
}

export const byLikes = (b1, b2) => b2.likes - b1.likes

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({ type: 'INIT_BLOGS', payload: blogs })
  }
}

// export const addVote = (anecdote) => {
//   return async (dispatch) => {
//     const anecdoteObj = await blogService.vote(anecdote)

//     dispatch({ type: 'ADD_VOTE', payload: anecdoteObj })
//   }
// }

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog)

    dispatch({ type: 'NEW_BLOG', payload: blog })
  }
}

export default blogReducer
