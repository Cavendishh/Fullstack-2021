const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload

    case 'CLEAR_NOTIFICATION':
      return ''

    default:
      return state
  }
}

export const setNotification = (message) => {
  return { type: 'SET_NOTIFICATION', payload: message }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION', payload: '' }
}

export default notificationReducer
