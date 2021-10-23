const router = require('express').Router()

const { Blog } = require('../models')

const blogFetcher = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  console.log('Blogs >> ', JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.get('/:id', blogFetcher, async (req, res) => {
  if (req.blog) {
    console.log('Blog >> ', req.blog.toJSON())
    return res.json(req.blog)
  }

  res.status(404).end()
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
})

router.put('/:id', blogFetcher, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  }
})

router.delete('/:id', blogFetcher, async (req, res) => {
  if (req.blog) await req.blog.destroy()
  return res.status(204).end()
})

module.exports = router
