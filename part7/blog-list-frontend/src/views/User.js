import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const allUsers = useSelector((state) => state.users)
  const match = useRouteMatch('/users/:id')

  const user = allUsers.find((u) => u.id === match.params.id)

  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>

      <h4>User created blogs</h4>
      {user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      ) : (
        <p>No blogs founds</p>
      )}
    </>
  )
}

export default User
