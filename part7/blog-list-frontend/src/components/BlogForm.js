import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const emptyBlogObj = {
  title: '',
  author: '',
  url: '',
}

const StyledTextField = styled(TextField)(() => ({
  marginTop: 16,
  width: 250,
}))

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)

  const [newBlog, setNewBlog] = useState(emptyBlogObj)

  const onChangeNewBlog = ({ target }) => setNewBlog({ ...newBlog, [target.name]: target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    onBlogCreate(newBlog)
    setNewBlog(emptyBlogObj)
  }

  const onBlogCreate = async (blog) => {
    try {
      await dispatch(createBlog(blog))

      blogFormRef.current.toggleVisibility()
      dispatch(setNotification('success', `You created a blog titled ${blog.title}`, timeoutId))
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to create a blog', timeoutId))
    }
  }

  const onCancel = (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={onSubmit} id='new-blog-form'>
      <div>
        <StyledTextField
          label='Title'
          id='title-input'
          type='text'
          value={newBlog.title}
          name='title'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <div>
        <StyledTextField
          label='Author'
          id='author-input'
          type='text'
          value={newBlog.author}
          name='author'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <div>
        <StyledTextField
          label='Url'
          id='url-input'
          type='text'
          value={newBlog.url}
          name='url'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <Box display='flex' mt={2} width={'250px'} justifyContent='space-around'>
        <Button variant='contained' color='error' onClick={onCancel}>
          Cancel
        </Button>

        <Button variant='contained' type='submit' id='create-blog-btn'>
          Create
        </Button>
      </Box>
    </form>
  )
}

export default BlogForm
