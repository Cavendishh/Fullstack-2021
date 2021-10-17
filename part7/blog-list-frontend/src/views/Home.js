import React, { useRef } from 'react'
import { Box } from '@mui/material'

import Blogs from '../components/Blogs'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Box mt={2}>
        <Togglable buttonLabel='Create a blog' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </Box>

      <Blogs />
    </>
  )
}

export default Home
