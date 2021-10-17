import React from 'react'
import { Link } from 'react-router-dom'
import { Box, AppBar, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'

import Logout from './Logout'

const Nav = styled(AppBar)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  marginTop: '-8px',
}))

const Item = styled(Box)(() => ({
  margin: 8,
  textTransform: 'none',
}))

const Navigation = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav position='static'>
        <Toolbar display='flex'>
          <Item>
            <Link to='/blogs'>Home</Link>
          </Item>

          <Item>
            <Link to='/users'>Users</Link>
          </Item>
        </Toolbar>

        <Toolbar>
          <Item>
            <Logout />
          </Item>
        </Toolbar>
      </Nav>
    </Box>
  )
}

export default Navigation
