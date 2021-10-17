import React from 'react'
import { useSelector } from 'react-redux'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

const Users = () => {
  const allUsers = useSelector((state) => state.users)

  if (!allUsers) return null

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <b>User</b>
          </TableCell>
          <TableCell>
            <b>Blogs created</b>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {allUsers.map((u) => (
          <TableRow key={u.id}>
            <TableCell>
              <a href={`/users/${u.id}`}>{u.username}</a>
            </TableCell>
            <TableCell>{u.blogs.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Users
