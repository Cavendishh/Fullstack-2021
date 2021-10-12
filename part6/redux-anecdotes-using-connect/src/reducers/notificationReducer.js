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
    console.log('1')
    dispatch({ type: 'SET_NOTIFICATION', payload: message })

    setTimeout(() => {
      console.log('2')
      dispatch({ type: 'SET_NOTIFICATION', payload: '' })
    }, time * 1000)
  }
}

export default notificationReducer
