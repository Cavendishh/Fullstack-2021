import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload

    case 'NEW_BLOG': {
      const blog = action.payload
      return [...state, blog]
    }

    case 'UPDATE_BLOG': {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    }

    case 'REMOVE_BLOG': {
      const deleteId = action.payload

      return state.filter((b) => b.id !== deleteId)
    }

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

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObj)

    dispatch({ type: 'NEW_BLOG', payload: blog })
  }
}

export const likeBlog = (blogObj) => {
  return async (dispatch) => {
    blogObj = { ...blogObj, likes: blogObj.likes + 1 }

    let blog = await blogService.update(blogObj)
    blog = { ...blog, user: { id: blog.user } } // Used to 'populate' the object to right format

    dispatch({ type: 'UPDATE_BLOG', payload: blog })
  }
}

export const commentBlog = (blogObj, comment) => {
  return async (dispatch) => {
    let blog = await blogService.comment(blogObj, comment)
    blog = { ...blog, user: { id: blog.user } } // Used to 'populate' the object to right format

    dispatch({ type: 'UPDATE_BLOG', payload: blog })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({ type: 'REMOVE_BLOG', payload: id })
  }
}

export default blogReducer
