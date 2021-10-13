const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const { comment } = req.body

  let blog = await Blog.findById(req.params.id)
  blog.comments.push(comment)

  const savedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) return res.json(blog)
  res.status(404).end()
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body

  if (!req.token) return res.status(401).json({ error: 'Token missing' })
  if (!body.title && !body.url) return res.status(400).end()

  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const savedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  if (!req.token) return res.status(401).json({ error: 'Token missing' })

  const user = req.user

  const blogToDelete = await Blog.findById(req.params.id)

  // Check if user created the blog by comparing id
  if (user._id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    return res.status(204).end()
  }

  return res.status(401).json({ error: 'Unauthorized to delete this blog' })
})

module.exports = blogsRouter
