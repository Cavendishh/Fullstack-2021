import React from 'react'
import { useSelector } from 'react-redux'

import { byLikes } from '../reducers/blogReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blogs = () => {
  let allBlogs = useSelector((state) => state.blogs)

  return (
    <div id='blogs-div'>
      {allBlogs.sort(byLikes).map((blog) => (
        <div className='blog-post' style={blogStyle} id={`blog-post-${blog.id}`} key={blog.id}>
          <p>
            <a href={`/blogs/${blog.id}`}>{blog.title}</a>
          </p>
        </div>
      ))}
    </div>
  )
}

export default Blogs
