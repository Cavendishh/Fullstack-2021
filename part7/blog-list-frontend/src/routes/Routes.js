import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../views/Home'
import Users from '../views/Users'
import User from '../views/User'
import Logout from '../components/Logout'

const Routes = () => {
  return (
    <>
      <h2>Blogs</h2>
      <Logout />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>

        <Route path='/users'>
          <Users />
        </Route>

        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default Routes
