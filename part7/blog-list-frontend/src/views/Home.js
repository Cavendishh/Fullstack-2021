import React, { useRef } from 'react'

import Blogs from '../components/Blogs'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Togglable buttonLabel='Create a blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <Blogs />
    </>
  )
}

export default Home
