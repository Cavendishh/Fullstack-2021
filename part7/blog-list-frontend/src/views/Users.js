import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const allUsers = useSelector((state) => state.users)

  console.log(allUsers)

  if (!allUsers) return null

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>

      <tbody>
        {allUsers.map((u) => (
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
