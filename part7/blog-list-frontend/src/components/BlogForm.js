import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const emptyBlogObj = {
  title: '',
  author: '',
  url: '',
}

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

  return (
    <form onSubmit={onSubmit} id='new-blog-form'>
      <div>
        Title
        <input
          id='title-input'
          type='text'
          value={newBlog.title}
          name='title'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <div>
        Author
        <input
          id='author-input'
          type='text'
          value={newBlog.author}
          name='author'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <div>
        Url
        <input
          id='url-input'
          type='text'
          value={newBlog.url}
          name='url'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>
      <button type='submit' id='create-blog-btn'>
        Create
      </button>
    </form>
  )
}

export default BlogForm
