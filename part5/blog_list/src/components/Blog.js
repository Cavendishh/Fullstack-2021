import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
    <div style={blogStyle} id={`blog-post-${blog.id}`}>
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

export default Blog
