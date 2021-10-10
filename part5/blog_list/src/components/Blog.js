import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  console.log(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const fullBlog = () => (
    <>
      <p>{blog.url}</p>
      <p>
        {blog.likes} <button>like</button>
      </p>
      <p>{blog.author}</p>
    </>
  )

  return (
    <div style={blogStyle}>
      <p>
        {blog.title}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'}
        </button>
      </p>

      {showDetails && fullBlog()}
    </div>
  )
}

export default Blog
