import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navigation from '../components/Navigation'
import Notification from '../components/Notification'
import Home from '../views/Home'
import Users from '../views/Users'
import User from '../views/User'
import Blog from '../views/Blog'

const Routes = () => {
  return (
    <>
      <Navigation />

      <Notification />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/blogs/:id'>
          <Blog />
        </Route>

        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default Routes
