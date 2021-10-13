import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer,
})

export const store = createStore(reducer, composeWithDevTools(appliyMiddleware(thunk)))
