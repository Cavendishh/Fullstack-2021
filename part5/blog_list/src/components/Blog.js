import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, onLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const fullBlog = () => (
    <>
      <p>{blog.url}</p>
      <p>
        {blog.likes} <button onClick={() => onLike(blog)}>like</button>
      </p>
      <p>{blog.author}</p>
    </>
  )

  return (
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </p>

      {showDetails && fullBlog()}
    </div>
  )
}

export default Blog
