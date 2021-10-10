import { useState } from 'react'
import PropTypes from 'prop-types'

const emptyBlogObj = {
  title: '',
  author: '',
  url: '',
}

const BlogForm = ({ onBlogCreate }) => {
  const [newBlog, setNewBlog] = useState(emptyBlogObj)

  const onChangeNewBlog = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    onBlogCreate(newBlog)
    setNewBlog(emptyBlogObj)
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        Title
        <input
          type='text'
          value={newBlog.title}
          name='title'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <div>
        Author
        <input
          type='text'
          value={newBlog.author}
          name='author'
          onChange={(e) => onChangeNewBlog(e)}
        />
      </div>

      <div>
        Url
        <input type='text' value={newBlog.url} name='url' onChange={(e) => onChangeNewBlog(e)} />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  onBlogCreate: PropTypes.func.isRequired,
}

export default BlogForm
