import React, { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextField, List, ListItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, commentBlog, removeBlog } from '../reducers/blogReducer'

const StyledTypography = styled(Typography)(() => ({
  marginTop: 24,
}))

const Blog = () => {
  const match = useRouteMatch('/blogs/:id')
  const history = useHistory()

  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)
  const auth = useSelector((state) => state.auth)
  const allBlogs = useSelector((state) => state.blogs)

  const [newComment, setNewComment] = useState('')

  const blog = allBlogs.find((b) => b.id === match?.params.id)

  const onBlogLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))

      dispatch(setNotification('success', 'You liked the blog', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to like a blog', timeoutId))
    }
  }

  const onBlogDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return

    try {
      await dispatch(removeBlog(id))

      dispatch(setNotification('success', 'You deleted a blog', timeoutId))
      history.push('/')
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to delete a blog', timeoutId))
    }
  }

  const addComment = async () => {
    try {
      await dispatch(commentBlog(blog, newComment))

      dispatch(setNotification('success', 'You commented the blog', timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to comment the blog', timeoutId))
    }
  }

  if (!blog) return null

  const isBlogOwner = blog.user.id === auth.id

  return (
    <>
      <StyledTypography>
        url:{' '}
        <a href={blog.url}>
          <b>{blog.url}</b>
        </a>
      </StyledTypography>

      <StyledTypography>
        likes: <b>{blog.likes}</b>&nbsp;
        <Button variant='contained' onClick={() => onBlogLike(blog)} id='like-btn'>
          like
        </Button>
      </StyledTypography>

      <StyledTypography>
        Written by <b>{blog.author}</b>
      </StyledTypography>

      <StyledTypography variant='h5'>Comment section</StyledTypography>

      <Box display='flex'>
        <TextField
          label='Write a comment'
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <Button variant='contained' onClick={addComment}>
          add
        </Button>
      </Box>

      <List>
        {blog.comments.map((c, i) => (
          <ListItem key={i}>- {c}</ListItem>
        ))}
      </List>

      {isBlogOwner && (
        <Button color='error' variant='contained' onClick={() => onBlogDelete(blog.id)}>
          Remove blog
        </Button>
      )}
    </>
  )
}

export default Blog
