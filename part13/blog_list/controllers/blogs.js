const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log('Blogs >> ', JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    console.log('Blog >> ', blog.toJSON())
    return res.json(blog)
  }

  res.status(404).end()
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (err) {
    return res.status(400).json({ err })
  }
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    // console.log('Body', req.body)
    // console.log('Blog', blog)
    blog.likes = req.body.likes
    // console.log('Blog', blog)
    await blog.save()
    res.json(blog)
  }
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) await blog.destroy()

  return res.status(204).end()
})

module.exports = router
