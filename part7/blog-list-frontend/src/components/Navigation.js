import React from 'react'
import { Link } from 'react-router-dom'

import Logout from './Logout'

const linkStyle = {
  margin: 8,
}

const Navigation = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={linkStyle}>
        <Link to='/blogs'>Home</Link>
      </div>

      <div style={linkStyle}>
        <Link to='/users'>Users</Link>
      </div>

      <div style={linkStyle}>
        <Logout />
      </div>
    </div>
  )
}

export default Navigation
