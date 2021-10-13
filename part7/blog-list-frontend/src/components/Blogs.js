import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { setNotification } from '../reducers/notificationReducer'
import { byLikes, likeBlog, removeBlog } from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const timeoutId = useSelector((state) => state.notification.timeoutId)
  const auth = useSelector((state) => state.auth)
  let allBlogs = useSelector((state) => state.blogs)

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
    } catch (err) {
      dispatch(setNotification('error', 'You were not able to delete a blog', timeoutId))
    }
  }

  return (
    <div id='blogs-div'>
      {allBlogs.sort(byLikes).map((blog) => (
        <Blog key={blog.id} blog={blog} user={auth} onLike={onBlogLike} onDelete={onBlogDelete} />
      ))}
    </div>
  )
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const isOwner = blog.user.id === user.id || blog.user === user.id

  const fullBlog = () => (
    <>
      <p>url: {blog.url}</p>
      <p>
        likes: {blog.likes}&nbsp;
        <button onClick={() => onLike(blog)} id='like-btn'>
          like
        </button>
      </p>
      {isOwner && <button onClick={() => onDelete(blog.id)}>Remove blog</button>}
    </>
  )

  return (
    <div className='blog-post' style={blogStyle} id={`blog-post-${blog.id}`}>
      <p>
        <b>{blog.title}</b> written by {blog.author}&nbsp;
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </p>

      {showDetails && fullBlog()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Blogs
