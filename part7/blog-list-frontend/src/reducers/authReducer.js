import loginService from '../services/login'
import blogService from '../services/blogs'

const authReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.payload

    case 'CLEAR_AUTH':
      return null

    default:
      return state
  }
}

export const byLikes = (b1, b2) => b2.likes - b1.likes

export const login = (userObj) => {
  return async (dispatch) => {
    const auth = await loginService.login(userObj)

    window.localStorage.setItem('loggedUser', JSON.stringify(auth))

    dispatch({ type: 'SET_AUTH', payload: auth })
  }
}

export const checkAuth = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const auth = JSON.parse(loggedUserJSON)
      blogService.setToken(auth.token)

      dispatch({ type: 'SET_AUTH', payload: auth })
    }
  }
}
export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')

    dispatch({ type: 'CLEAR_AUTH' })
  }
}

export default authReducer
