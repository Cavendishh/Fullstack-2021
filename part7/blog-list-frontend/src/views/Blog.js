import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const match = useRouteMatch('/blogs/:id')
  const history = useHistory()

  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)
  const auth = useSelector((state) => state.auth)
  const allBlogs = useSelector((state) => state.blogs)

  const blog = allBlogs.find((b) => b.id === match?.params.id)

  const onBlogLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))

      dispatch(setNotification('success', `You liked a blog titled ${blog.title}`, timeoutId))
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
      <p>Made by {blog.author}</p>
      {isBlogOwner && <button onClick={() => onBlogDelete(blog.id)}>Remove blog</button>}{' '}
    </>
  )
}

export default Blog
