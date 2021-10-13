import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const allUsers = useSelector((state) => state.users)

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
            <td>
              <a href={`/users/${u.id}`}>{u.username}</a>
            </td>
            <td>{u.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
