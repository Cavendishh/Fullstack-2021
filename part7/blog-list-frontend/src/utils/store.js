import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from '../reducers/authReducer'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  blogs: blogReducer,
  users: userReducer,
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
