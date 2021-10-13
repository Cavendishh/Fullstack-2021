const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload

    case 'CLEAR_NOTIFICATION':
      return { type: '', message: '', timeoutId: null }

    default:
      return state
  }
}

export const setNotification = (type, message, timeoutId, time = 5) => {
  return async (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId)

    const newTimeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, time * 1000)

    dispatch({ type: 'SET_NOTIFICATION', payload: { type, message, timeoutId: newTimeoutId } })
  }
}

export default notificationReducer
