import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
