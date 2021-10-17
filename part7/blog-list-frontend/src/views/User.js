import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, List, ListItem } from '@mui/material'

const User = () => {
  const allUsers = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')

  const user = allUsers.find((u) => u.id === match.params.id)

  if (!user) return null

  return (
    <>
      <Typography mt={2} variant='h4'>
        {user.name}
      </Typography>

      <Typography mt={2} variant='h5'>
        User created blogs
      </Typography>
      {user.blogs.length > 0 ? (
        <List>
          {user.blogs.map((b) => (
            <ListItem key={b.id}>- {b.title}</ListItem>
          ))}
        </List>
      ) : (
        <Typography>No blogs founds</Typography>
      )}
    </>
  )
}

export default User
