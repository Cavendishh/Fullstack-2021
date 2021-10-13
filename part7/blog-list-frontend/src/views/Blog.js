import React, { useState } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, commentBlog, removeBlog } from '../reducers/blogReducer'

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
      <p>
        url: <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        likes: {blog.likes}&nbsp;{' '}
        <button onClick={() => onBlogLike(blog)} id='like-btn'>
          like
        </button>
      </p>
      <p>Written by {blog.author}</p>

      <h3>Comments</h3>
      <input
        type='text'
        value={newComment}
        onChange={({ target }) => setNewComment(target.value)}
      />
      <button onClick={addComment}>add</button>
      <ul>
        {blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      {isBlogOwner && <button onClick={() => onBlogDelete(blog.id)}>Remove blog</button>}
    </>
  )
}

export default Blog
