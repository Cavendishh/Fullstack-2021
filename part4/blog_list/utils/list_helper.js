const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const obj = blogs.reduce((prev, current) => (prev.likes > current.likes ? prev : current), {})

  return cleanBlogObj(obj)
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((prev, current) => {
    let authorObj = prev.find((r) => r.author === current.author)
    if (!authorObj) return prev.concat({ author: current.author, blogs: 1 })

    authorObj.blogs++
    return prev
  }, [])

  return authors.reduce((prev, current) => (prev.blogs > current.blogs ? prev : current))
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
  mostBlogs,
}
