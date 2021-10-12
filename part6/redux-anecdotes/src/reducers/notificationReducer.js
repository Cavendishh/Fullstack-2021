const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('BAYLOAD', action.payload)
      return action.payload

    default:
      return state
  }
}

export const setNotification = (message, time = 5, timeoutId) => {
  return async (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId)

    const newTimeoutId = setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: '', timeoutId: null } })
    }, time * 1000)

    dispatch({ type: 'SET_NOTIFICATION', payload: { message, timeoutId: newTimeoutId } })
  }
}

export default notificationReducer
