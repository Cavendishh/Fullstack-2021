const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload

    default:
      return state
  }
}

export const setNotification = (message, time = 3) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })

    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: '' })
    }, time * 1000)
  }
}

export default notificationReducer
