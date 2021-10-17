import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { byLikes } from '../reducers/blogReducer'

const StyledTypography = styled(Typography)(() => ({
  marginTop: 16,
  marginBottom: 16,
}))

const Content = styled(Box)(() => ({
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}))

const BlogTitle = styled(Typography)(() => ({
  padding: 8,
  paddingLeft: 16,
}))

const Blogs = () => {
  let allBlogs = useSelector((state) => state.blogs)

  return (
    <div id='blogs-div'>
      <StyledTypography variant='h4' component='h2'>
        Blogs
      </StyledTypography>

      {allBlogs.sort(byLikes).map((blog) => (
        <Content className='blog-post' id={`blog-post-${blog.id}`} key={blog.id}>
          <BlogTitle>
            <a href={`/blogs/${blog.id}`}>
              <b>{blog.title}</b>
            </a>{' '}
            by {blog.author}
          </BlogTitle>
        </Content>
      ))}
    </div>
  )
}

export default Blogs
