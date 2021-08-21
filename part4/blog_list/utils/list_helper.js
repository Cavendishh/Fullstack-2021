const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const obj = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current
  }, {})

  return cleanBlogObj(obj)
}

const cleanBlogObj = (blog) => {
  delete blog.__v
  delete blog._id
  delete blog.url
  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
